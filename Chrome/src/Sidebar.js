import React, { useState, useEffect } from 'react';


function Sidebar() {
    const [url, setUrl] = useState("");
    const [source, setSource] = useState("");

    useEffect(() => {
        const messageListener = (message, sender, sendResponse) => {
          if (message.type === "textAction") {
            console.log(`Action: ${message.action}, Text: ${message.text}`);
            // Here, you can handle the action, such as updating state or calling an API
            handleTextAction(message.action, message.text);
            sendResponse({status: "Action received"});
          }
        };
      
        // Add the message listener
        chrome.runtime.onMessage.addListener(messageListener);
      
        // Clean up the listener when the component unmounts
        return () => {
          chrome.runtime.onMessage.removeListener(messageListener);
        };
      }, []); // Empty dependency array means this effect runs once on mount

    const handleButtonClick = () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "getPageInfo"}, (response) => {
                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError.message);
                    return;
                }
                setUrl(response.url);
                setSource(response.source);
            })
        });
        handleCreateNote();
    };

    const handleCreateNote = async () => {
        const dataToSend = {
          url: url,
          source: source,
        };
      
        try {
          const response = await fetch("http://localhost:8000/createNote", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          const data = await response.json();
          console.log("Success:", data);
          // Handle success - update UI
        } catch (error) {
          console.error("Error:", error);
        }
      };

      const handleTextAction = async (action, text) => {
        const dataToSend = {
          action: action,
          text: text,
        };
        try {
          const response = await fetch("http://localhost:8000/textAction", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          const data = await response.json();
          console.log("Success:", data);
          // Handle success - update UI
        } catch (error) {
          console.error("Error:", error);
        }
      };
      
      
    return (
        <div>
            <h1>Sidebar Content</h1>
            <button onClick={handleButtonClick}>Get Page Info</button>
        </div>
    );
}

export default Sidebar;
