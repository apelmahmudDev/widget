// sdk.js
(function () {
	// Get customization options from data attributes
	const scriptTag = document.currentScript;
	const fabBgColor = scriptTag.getAttribute("data-fab-bg-color") || "#007bff";
	const fabIcon = scriptTag.getAttribute("data-fab-icon") || "+";
	const fabCloseIcon = scriptTag.getAttribute("data-fab-close-icon") || "x";
	const iframeSrc = scriptTag.getAttribute("data-iframe-src") || "";
	const iframeWidth = scriptTag.getAttribute("data-iframe-width") || "100%";
	const iframeHeight = scriptTag.getAttribute("data-iframe-height") || "100%";

	// Variable to check if the chat widget is open
	let isOpen = false;

	// Check if the iframe source is set
	if (!iframeSrc) {
		console.error("Techvillage Talk SDK: iframe source is not set");
		return;
	}

	// Create the chat widget HTML
	const widgetHTML = `
        <div class="fab-container">
            <button id="fab" class="fab-button" style="background-color: ${fabBgColor}">
                <img src=${fabIcon} alt="open-icon" class="fab-icon" id="icon" />
            </button>
        </div>
        
        <div id="chat-modal" class="chat-modal">
            <div class="chat-body">
                <!-- Chat content goes here -->
                ${
					iframeSrc
						? `<iframe 
                        src="${iframeSrc}"
                        height=${iframeHeight}
                        width=${iframeWidth}
                        title="Techvillage support chat"
                        frameborder="0" 
                        allowfullscreen="true" 
                        allowtransparency="true" 
                        allow="encrypted-media" 
                        sandbox="allow-same-origin allow-scripts"
                    ></iframe>`
						: `<div class="notfound-iframe">
                        <h1>Chat widget</h1>
                        <p>iframe source is not set</p>
                    </div>`
				}
            </div>
        </div>
    `;

	// Create the style element with CSS
	const style = document.createElement("style");
	style.textContent = `
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
        }


	

        .fab-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
        }

        .fab-button {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            color: #fff;
            border: none;
            cursor: pointer;
            box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
        }

        .fab-icon {
            height: 35px;
            width: 35px;
        }

        .chat-modal {
            display: none;
            position: fixed;
            bottom: 90px;
            right: 15px;
            background-color: #fff;
            z-index: 1000;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3); 
            transition: all 0.3s;
        }

        .chat-body {
            // height: auto;
			// width: 100%;
        }

        .notfound-iframe {
            min-height: 532px;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        .notfound-iframe p{
            margin: 0;
            padding: 0;
            color: #000;
        }
    `;

	// Inject HTML and CSS
	document.body.insertAdjacentHTML("beforeend", widgetHTML);
	document.head.appendChild(style);

	// Add JavaScript interactivity
	document.getElementById("fab").addEventListener("click", function () {
		if (!isOpen) {
			document.getElementById("chat-modal").style.display = "block";
			document.getElementById("icon").src = fabCloseIcon;
		} else {
			document.getElementById("chat-modal").style.display = "none";
			document.getElementById("icon").src = fabIcon;
		}
		isOpen = !isOpen;
	});
})();
