// sdk.js
(function () {
	// Get customization options from data attributes
	const scriptTag = document.currentScript;
	const fabBgColor = scriptTag.getAttribute("data-fab-bg-color") || "#333333";
	// const fabIcon = scriptTag.getAttribute("data-fab-icon");
	const fabIcon = "/assets/robot-face.svg";
	const fabCloseIcon = scriptTag.getAttribute("data-fab-close-icon");
	const iframeSrc = scriptTag.getAttribute("data-iframe-src") || "";
	const iframeWidth = scriptTag.getAttribute("data-iframe-width") || 320;
	const iframeHeight = scriptTag.getAttribute("data-iframe-height") || 532;

	// Variable to check if the chat widget is open
	let isOpen = false;

	// Check if the iframe source is set
	if (!iframeSrc) {
		console.error("Techvillage Talk SDK: iframe source is not set");
		return;
	}

	// Create the chat widget HTML
	const widgetHTML = `
        <div class="techvill-widget-fab-container">
            <button id="techvill-widget-fab" class="techvill-widget-fab-button" style="background-color: ${fabBgColor}"></button>
        </div>
        <div id="techvill-widget-chat-modal" class="techvill-widget-chat-modal">
            <div class="techvill-widget-chat-body">
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
						id="techvill-widget-iframe"
						onload="window.parent.postMessage('techvill-widget-iframe-loaded', '*')"
						name="techvill-widget-iframe"
                    ></iframe>`
										: `<div class="techvill-widget-notfound-iframe">
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
        .techvill-widget-fab-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
        }
        .techvill-widget-fab-button {
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
        .techvill-widget-fab-icon {
            height: 35px;
            width: 35px;
        }
        .techvill-widget-chat-modal {
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
        .techvill-widget-notfound-iframe {
            min-height: 532px;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        .techvill-widget-notfound-iframe p{
            margin: 0;
            padding: 0;
            color: #000;
        }
    `;

	// Inject HTML and CSS
	document.body.insertAdjacentHTML("beforeend", widgetHTML);
	document.head.appendChild(style);

	// Variables declaration
	const fabButton = document.getElementById("techvill-widget-fab");

	// Add JavaScript interactivity
	const fabImg = document.createElement("img");
	fabImg.className = "techvill-widget-fab-icon";
	fabImg.id = "techvill-widget-icon";
	fabImg.src = fabIcon;
	fabImg.alt = "open";
	fabButton.appendChild(fabImg);

	// Initialize default icon
	if (!fabIcon && !isOpen) {
		fabButton.innerHTML = `
		<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 46 46" fill="none">
		<path fill-rule="evenodd" clip-rule="evenodd" d="M12.3477 3.83331H33.661C38.5162 3.99995 42.3217 8.06263 42.171 12.9183V25.415C42.2432 27.7601 41.3777 30.0372 39.7661 31.7423C38.1545 33.4474 35.9298 34.4399 33.5844 34.5H15.3377C14.075 34.5261 12.8775 35.066 12.0219 35.995L7.47937 40.8441C7.09452 41.2639 6.55376 41.5065 5.98437 41.515C5.39629 41.5 4.83861 41.2506 4.43543 40.8222C4.03226 40.3938 3.81705 39.822 3.8377 39.2341V12.9183C3.68699 8.06263 7.49254 3.99995 12.3477 3.83331ZM33.661 31.625C36.9288 31.4596 39.448 28.6834 39.296 25.415V12.9183C39.448 9.64986 36.9288 6.87366 33.661 6.70831H12.3477C9.07989 6.87366 6.56075 9.64986 6.7127 12.9183V37.4516L9.83686 34.04C11.2656 32.5202 13.2519 31.6481 15.3377 31.625H33.661Z" fill="#FFA500"/>
		<path d="M15.8169 16.7708H25.4002C26.1941 16.7708 26.8377 16.1272 26.8377 15.3333C26.8377 14.5394 26.1941 13.8958 25.4002 13.8958H15.8169C15.023 13.8958 14.3794 14.5394 14.3794 15.3333C14.3794 16.1272 15.023 16.7708 15.8169 16.7708Z" fill="#FFA500"/>
		<path d="M30.1919 21.5625H15.8169C15.023 21.5625 14.3794 22.2061 14.3794 23C14.3794 23.7939 15.023 24.4375 15.8169 24.4375H30.1919C30.9858 24.4375 31.6294 23.7939 31.6294 23C31.6294 22.2061 30.9858 21.5625 30.1919 21.5625Z" fill="#FFA500"/>
		</svg>`;
	}

	fabButton.addEventListener("click", function () {
		if (!isOpen) {
			document.getElementById("techvill-widget-chat-modal").style.display =
				"block";
			if (!fabCloseIcon) {
				fabButton.innerHTML = `
				<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none">
					<path d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="#FCCA19" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>`;
			} else {
				fabImg.src = fabCloseIcon;
				fabImg.alt = "Close";
			}
		} else {
			document.getElementById("techvill-widget-chat-modal").style.display =
				"none";
			if (!fabIcon) {
				fabButton.innerHTML = `
				<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 46 46" fill="none">
					<path fill-rule="evenodd" clip-rule="evenodd" d="M12.3477 3.83331H33.661C38.5162 3.99995 42.3217 8.06263 42.171 12.9183V25.415C42.2432 27.7601 41.3777 30.0372 39.7661 31.7423C38.1545 33.4474 35.9298 34.4399 33.5844 34.5H15.3377C14.075 34.5261 12.8775 35.066 12.0219 35.995L7.47937 40.8441C7.09452 41.2639 6.55376 41.5065 5.98437 41.515C5.39629 41.5 4.83861 41.2506 4.43543 40.8222C4.03226 40.3938 3.81705 39.822 3.8377 39.2341V12.9183C3.68699 8.06263 7.49254 3.99995 12.3477 3.83331ZM33.661 31.625C36.9288 31.4596 39.448 28.6834 39.296 25.415V12.9183C39.448 9.64986 36.9288 6.87366 33.661 6.70831H12.3477C9.07989 6.87366 6.56075 9.64986 6.7127 12.9183V37.4516L9.83686 34.04C11.2656 32.5202 13.2519 31.6481 15.3377 31.625H33.661Z" fill="#FFA500"/>
					<path d="M15.8169 16.7708H25.4002C26.1941 16.7708 26.8377 16.1272 26.8377 15.3333C26.8377 14.5394 26.1941 13.8958 25.4002 13.8958H15.8169C15.023 13.8958 14.3794 14.5394 14.3794 15.3333C14.3794 16.1272 15.023 16.7708 15.8169 16.7708Z" fill="#FFA500"/>
					<path d="M30.1919 21.5625H15.8169C15.023 21.5625 14.3794 22.2061 14.3794 23C14.3794 23.7939 15.023 24.4375 15.8169 24.4375H30.1919C30.9858 24.4375 31.6294 23.7939 31.6294 23C31.6294 22.2061 30.9858 21.5625 30.1919 21.5625Z" fill="#FFA500"/>
				</svg>`;
			} else {
				fabImg.src = fabIcon;
				fabImg.alt = "Open";
			}
		}
		isOpen = !isOpen;
	});
})();
