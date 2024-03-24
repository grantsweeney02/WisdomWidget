chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.action === "toggleSidebar") {
		handleSidebarVisibility(message.visible)
	}
})

function handleSidebarVisibility(shouldBeVisible) {
	let iframe = document.getElementById("my-extension-sidebar")
	let toggleButton = document.getElementById("my-extension-toggle-btn")
	if (shouldBeVisible) {
		if (!iframe) {
			const link = document.createElement("link")
			link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
			link.rel = "stylesheet"
			document.head.appendChild(link)

			iframe = document.createElement("iframe")
			iframe.id = "my-extension-sidebar"
			iframe.style.height = "100vh"
			iframe.style.width = "30px"
			iframe.style.position = "fixed"
			iframe.style.top = "0"
			iframe.style.left = "auto"
			iframe.style.right = "0"
			iframe.style.zIndex = "1000"
			iframe.style.border = "none"
			iframe.style.backgroundColor = "grey"
			iframe.style.transition = "width 0.3s ease-in-out"
			iframe.src = chrome.runtime.getURL("./index.html")
			document.body.appendChild(iframe)

			toggleButton = document.createElement("button")
			toggleButton.id = "my-extension-toggle-btn"
			toggleButton.textContent = "Tog"
			toggleButton.style.position = "fixed"
			toggleButton.style.top = "20px"
			toggleButton.style.right = "0px"
			toggleButton.style.zIndex = "1001"
			toggleButton.style.transition = "right 0.3s ease-in-out"
			document.body.appendChild(toggleButton)

			toggleButton.addEventListener("click", () => {
				const isOpen = iframe.style.width === "450px"
				chrome.storage.local.set({ sidebarVisible: !isOpen })
				iframe.style.width = isOpen ? "30px" : "450px"
				toggleButton.style.right = isOpen ? "0px" : "420px"
			})
		}

		// Set initial visibility based on the shouldBeVisible flag
		iframe.style.width = shouldBeVisible ? "450px" : "30px"
		toggleButton.style.right = shouldBeVisible ? "420px" : "10px"
	} else {
		if (iframe) {
			iframe.remove()
			toggleButton.remove()
		}
	}
}
