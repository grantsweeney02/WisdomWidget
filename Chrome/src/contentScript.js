chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getPageInfo") {
    const pageInfo = {
      url: window.location.href,
      source: document.documentElement.outerHTML, // This gets the page's HTML source
    };
    sendResponse(pageInfo);
  }
});

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

// Immediately-invoked function to check conditions as soon as possible
(function() {
  const userDataLocal = localStorage.getItem('userData');
  const userDataParsed = userDataLocal ? JSON.parse(userDataLocal) : null;

  if (userDataParsed) {
    console.log('Local userData:', userDataParsed);
    chrome.storage.sync.get('userData', (result) => {
      if (result.userData) {
        console.log('Sync userData already set.');
      } else {
        console.log('Setting sync userData...');
        chrome.storage.sync.set({ userData: userDataParsed }, () => {
          console.log('UserData saved to sync storage.');
        });
      }
    });
  } else {
    console.log('No userData found in local storage.');
    // Additional logic for when userData isn't found
  }
})();



function getSelectionCoordinates() {
  const selection = window.getSelection();
  if (!selection.rangeCount) return false; // Exit if no selection
  const range = selection.getRangeAt(0).getBoundingClientRect();
  return {
    x: (range.right + range.left) / 2 + window.scrollX - 55,
    y: range.bottom + window.scrollY // Use `bottom` to position below the selection
  };
}


function showActionButtons(x, y, selectedText) {

  const coords = getSelectionCoordinates();
  if (!coords) return; // Don't proceed if there's no selection
  
  // Remove existing menu if it exists
  const existingMenu = document.getElementById('custom-action-menu');
  if (existingMenu) {
      existingMenu.remove();
  }

  // Create a new menu
  const actionMenu = document.createElement('div');
  actionMenu.id = 'custom-action-menu';
  actionMenu.style.position = 'absolute';
  actionMenu.style.display = 'flex';
  actionMenu.style.left = `${coords.x}px`;
  actionMenu.style.top = `${coords.y}px`;
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

const actions = [
  { name: 'note', icon: 'fas fa-pen-to-square' },
  { name: 'explain', icon: 'fas fa-book' },
  { name: 'search', icon: 'fas fa-magnifying-glass' }
];

  // Add buttons to the menu
  actions.forEach(action => {
      const button = document.createElement('button');
      const icon = document.createElement('i');
      icon.className = `${action.icon} fa-1x`;
      icon.style = `color: #B197FC`;
      icon.addEventListener('mouseenter', function () {
        this.style.color = '#5a3db3'; // Change to your preferred hover color
      });
      icon.addEventListener('mouseleave', function () {
        this.style.color = '#B197FC'; // Reset to default color
      });
      button.appendChild(icon);
      button.style.borderRadius = '2px';
      button.style.background = 'grey';
      button.style.border = 'none';
      button.style.cursor = 'pointer';
      button.style.margin = '1px';
      button.style.display = 'flex';
      button.style.alignItems = 'center';
      button.style.justifyContent = 'center';
      button.style.height = '35px';
      button.style.width = '35px';
      button.addEventListener('click', function() {
        actionMenu.remove(); // Remove the action menu
  
        // Send a message to the background script or React app
        chrome.runtime.sendMessage({
            type: "textAction",
            action: action.name, // The name of the action button clicked
            text: selectedText // The selected text
        });

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

for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  const value = localStorage.getItem(key);
  console.log(`${key}: ${value}`);
}