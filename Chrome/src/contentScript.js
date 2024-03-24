chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getPageInfo") {
    const pageInfo = {
      url: window.location.href,
      source: document.documentElement.outerHTML, // This gets the page's HTML source
    };
    sendResponse(pageInfo);
  }
});

const style = document.createElement('style');
style.textContent = `
    #custom-action-menu button {
        color: red;
        background-color: blue;
        padding: 2px;
    }
`;
document.head.appendChild(style);

document.addEventListener('mouseup', function (e) {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText.length > 0) {
    // User has selected text, show the action buttons
    showActionButtons(e.clientX, e.clientY, selectedText);
  } else {
    const existingMenu = document.getElementById('custom-action-menu');
    if (existingMenu) {
      existingMenu.remove();
    }
  }
});

function showActionButtons(x, y, selectedText) {
  // Remove existing menu if it exists
  const existingMenu = document.getElementById('custom-action-menu');
  if (existingMenu) {
      existingMenu.remove();
  }

  // Create a new menu
  const actionMenu = document.createElement('div');
  actionMenu.id = 'custom-action-menu';
  actionMenu.style.position = 'absolute';
  actionMenu.style.left = `${x + window.scrollX}px`;
  actionMenu.style.top = `${y + window.scrollY}px`;
  actionMenu.style.backgroundColor = 'white';
  actionMenu.style.border = '1px solid black';
  actionMenu.style.padding = '3px';
  actionMenu.style.zIndex = '10000'; // Ensure it appears above other page content

  actionMenu.addEventListener('mousedown', function(event) {
    event.stopPropagation();
});
actionMenu.addEventListener('mouseup', function(event) {
    event.stopPropagation();
});
actionMenu.addEventListener('click', function(event) {
    event.stopPropagation();
});

  // Add buttons to the menu
  ['explain', 'note', 'search'].forEach(functionName => {
      const button = document.createElement('button');
      button.textContent = functionName;
      button.addEventListener('click', function() {
        actionMenu.remove(); // Remove the action menu
  
        // Send a message to the background script or React app
        chrome.runtime.sendMessage({
            type: "textAction",
            action: functionName, // The name of the action button clicked
            text: selectedText // The selected text
        });
    
        console.log(`"${selectedText}" - ${functionName}`);

        if (window.getSelection) {
          if (window.getSelection().empty) {  // Chrome
              window.getSelection().empty();
          }
        }
    });
      actionMenu.appendChild(button);
  });

  document.body.appendChild(actionMenu);
}