chrome.action.onClicked.addListener((tab) => {
  chrome.storage.local.get({sidebarVisible: false}, (result) => {
      const shouldBeVisible = !result.sidebarVisible;
      chrome.storage.local.set({sidebarVisible: shouldBeVisible}, () => {
          // Directly send a message to the content script to toggle the sidebar visibility
          chrome.tabs.sendMessage(tab.id, {action: "toggleSidebar", visible: shouldBeVisible});
      });
  });
});
