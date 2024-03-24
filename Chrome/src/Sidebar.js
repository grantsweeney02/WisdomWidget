import React, { useState, useEffect } from 'react';
import HomePage from './HomePage';
import TextNote from './TextNote';
import TextExplain from './TextExplain';
import TextSearch from './TextSearch';


function Sidebar() {
  const [url, setUrl] = useState("");
  const [source, setSource] = useState("");
  const [textExplain, setTextExplain] = useState(false);
  const [textSearch, setTextSearch] = useState(false);
  const [textNote, setTextNote] = useState(false);
  const [homePage, setHomePage] = useState(true);

  useEffect(() => {
    const messageListener = (message, sender, sendResponse) => {
      if (message.type === "textAction") {
        console.log(`Action: ${message.action}, Text: ${message.text}`);
        // Here, you can handle the action, such as updating state or calling an API
        handleTextAction(message.action, message.text);
        sendResponse({ status: "Action received" });
      }
      if (message.type === "getUser") {
        console.log(uid);
        handleGetUser(message.uid, message.displayName, message.email);
        sendResponse({ status: "Action reveived" });
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

  const handleGetUser = async (uid, displayName, email) => {
    const dataToSend = {
      uid: uid,
      displayName: displayName,
      email: email,
    };

    try {
      const response = await fetch("http://localhost:8000/users/retrieveUserData", {
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
  }

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
    if (action === 'search') {
      handleTextActionSearch();
    } else if (action === 'note') {
      handleTextActionNote();
    } else if (action === 'explain') {
      handleTextActionExplain();
    }
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
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleTextActionNote = () => {
    setTextNote(true);
    setTextExplain(false);
    setTextSearch(false);
    setHomePage(false);
  }

  const handleTextActionSearch = () => {
    setTextNote(false);
    setTextExplain(false);
    setTextSearch(true);
    setHomePage(false);
  }

  const handleTextActionExplain = () => {
    setTextNote(false);
    setTextExplain(true);
    setTextSearch(false);
    setHomePage(false);
  }

  const handleHomeClick = () => {
    setTextNote(false);
    setTextExplain(false);
    setTextSearch(false);
    setHomePage(true);
  }

  return (
    <div>
      <span>
        <button onClick={handleHomeClick}>Home</button>
        <button>Login</button>
        <button>Dashboard</button>
      </span>

      {homePage ? <HomePage/> : ""}

      {textNote ? <TextNote/> : ""}

      {textExplain ? <TextExplain/> : ""}

      {textSearch ? <TextSearch/> : ""}

    </div>
  );
}

export default Sidebar;
