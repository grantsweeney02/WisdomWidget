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
        sendResponse({ status: "Action received" });
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
      chrome.tabs.sendMessage(tabs[0].id, { action: "getPageInfo" }, (response) => {
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
      if (text === 'search') {
        handleTextActionSearch();
      } else if (text === 'note') {
        handleTextActionNote();
      } else if (text === 'explain') {
        handleTextActionExplain();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleTextActionNote = () => {

  }

  const handleTextActionSearch = () => {

  }

  const handleTextActionExplain = () => {

  }

  return (
    <div>
      <span>
        <button>Home</button>
        <button>Login</button>
        <button>Dashboard</button>
      </span>
      <select name="classes" id="classes">
        <option value="CS4640">CS 4640</option>
        <option value="CS1001">CS 1001</option>
        <option value="APMA1223">APMA 1233</option>
        <option value="APMA2332">APMA 2332</option>
      </select>
      <select name="assignments" id="assignments">
        <option value="Assignment1">Assignment 1</option>
        <option value="Assignment2">Assignment 2</option>
        <option value="Assignment3">Assignment 3</option>
        <option value="Assignment4">Assignment 4</option>
      </select>
      <button onClick={handleButtonClick}>Make A Note</button>
    </div>
  );
}

export default Sidebar;
