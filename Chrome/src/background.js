chrome.action.onClicked.addListener((tab) => {
  chrome.storage.local.get({sidebarVisible: false}, (result) => {
      const shouldBeVisible = !result.sidebarVisible;
      chrome.storage.local.set({sidebarVisible: shouldBeVisible}, () => {
          // Directly send a message to the content script to toggle the sidebar visibility
          chrome.tabs.sendMessage(tab.id, {action: "toggleSidebar", visible: shouldBeVisible});
      });
  });
  chrome.storage.sync.get('userData', (result) => {
    if (result.userData) {
      // If uid is found, send it to the React app
      chrome.runtime.sendMessage({type: "getUser", uid: result.uid, displayName: result.displayName, email: result.displayName});
    } else {
      // If no uid, open or focus the web app to initiate login
      chrome.tabs.create({ url: 'http://localhost:5173/' });
    }
  });
});
