// sdk.js
(function () {
	// Get customization options from data attributes
	const scriptTag = document.currentScript;
	const fabBgColor = scriptTag.getAttribute("data-fab-bg-color") || "#333333";
	const fabCloseIcon = scriptTag.getAttribute("data-fab-close-icon");
	const fabIcon = scriptTag.getAttribute("data-fab-icon");
	const iframeSrc = scriptTag.getAttribute("data-iframe-src") || "";
	const iframeWidth = scriptTag.getAttribute("data-iframe-width") || "100%";
	const iframeHeight = scriptTag.getAttribute("data-iframe-height") || "100%";

	// Variable to check if the chat widget is open
	let isOpen = false;
	let isFullScreen = false;

	// Check if the iframe source is set and log an error if not
	if (!iframeSrc) {
		console.error("Techvillage Talk SDK: iframe source is not set");
	}

	// Create the chat widget HTML
	const widgetHTML = `
	    <div class="techvill__widget-FAB__container">
            <button class="techvill__widget-FAB" style="background-color: ${fabBgColor}"></button>
        </div>
        <div id="techvill__widget-container">
			<div class="techvill__widget-header"></div>
			<div class="techvill__widget-body">
				${
					iframeSrc
						? `<iframe 
                        src="${iframeSrc}"
                        height=${iframeHeight}
                        width=${iframeWidth}
						class="techvill__widget-iframe"
                        title="Techvillage widget"
                        frameborder="0" 
                        allowfullscreen="true" 
                        allowtransparency="true" 
                        allow="encrypted-media"
                    ></iframe>`
						: `
						<div class="techvill-widget__notfound-iframe">
							<h2>Techvill Chat Widget</h2>
							<p>
								Please set the <strong>data-iframe-src</strong> attribute to the iframe source and enjoy conversations with a pretty widget.
							</p>
                    	</div>
					`
				}
			</div>
			<button class="techvill__widget-FAB__close" style="background-color: #2c2c2c"></button>
			<button id="techvill__widget-full__screen-btn">Full Screen</button>
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
		.techvill__widget-FAB__container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
        }
		.techvill__widget-FAB {
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
		.techvill__widget-FAB__close {
			position: absolute;
			right: 0;
			bottom: 0px;
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
        #techvill__widget-container {
			position: absolute;
			bottom: 20px;
			right: 20px;
			height: 650px;
			width: 375px;
			display: none;
			z-index: 1000;
		}
		.techvill__widget-header {
			cursor: move;
			user-select: none;
			height: 20px;
			background-color: #ffcf4b ;
			border-top-left-radius: 10px;
			border-top-right-radius: 10px;
		}
		#techvill__widget-container .techvill__widget-body {
			height: calc(100% - 95px);
			background-color: #fff;
			box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
			border-bottom-left-radius: 10px;
			border-bottom-right-radius: 10px;
			user-select: none;
			overflow: hidden;
		}
		#techvill__widget-full__screen-btn {
			background-color: #fff;
			box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
			cursor: pointer;
			border: none;
			border-radius: 5px;
		}
		.techvill-widget__notfound-iframe {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			height: 100%;
			text-align: center;
			padding: 0 20px;
		}
    `;

	// Inject HTML and CSS
	document.body.insertAdjacentHTML("beforeend", widgetHTML);
	document.head.appendChild(style);

	// Variables declaration
	const chatWidgetContainer = document.getElementById("techvill__widget-container");
	const widgetOpenFAB = document.querySelector(".techvill__widget-FAB");
	const widgetCloseFAB = document.querySelector(".techvill__widget-FAB__close");
	const widgetHeader = document.querySelector(".techvill__widget-header");
	const fullScreenBtn = document.getElementById("techvill__widget-full__screen-btn");

	let offsetX, offsetY, isDragging = false;

	// Add JavaScript interactivity
	const fabImg = document.createElement("img");
	fabImg.className = "techvill-widget-fab-icon";
	fabImg.id = "techvill-widget-icon";
	fabImg.src = fabIcon;
	fabImg.alt = "open";
	widgetOpenFAB.appendChild(fabImg);
	widgetCloseFAB.appendChild(fabImg);

	// Initialize default icon
	if (!fabIcon && !isOpen) {
		widgetOpenFAB.innerHTML = `
		<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 46 46" fill="none">
		<path fill-rule="evenodd" clip-rule="evenodd" d="M12.3477 3.83331H33.661C38.5162 3.99995 42.3217 8.06263 42.171 12.9183V25.415C42.2432 27.7601 41.3777 30.0372 39.7661 31.7423C38.1545 33.4474 35.9298 34.4399 33.5844 34.5H15.3377C14.075 34.5261 12.8775 35.066 12.0219 35.995L7.47937 40.8441C7.09452 41.2639 6.55376 41.5065 5.98437 41.515C5.39629 41.5 4.83861 41.2506 4.43543 40.8222C4.03226 40.3938 3.81705 39.822 3.8377 39.2341V12.9183C3.68699 8.06263 7.49254 3.99995 12.3477 3.83331ZM33.661 31.625C36.9288 31.4596 39.448 28.6834 39.296 25.415V12.9183C39.448 9.64986 36.9288 6.87366 33.661 6.70831H12.3477C9.07989 6.87366 6.56075 9.64986 6.7127 12.9183V37.4516L9.83686 34.04C11.2656 32.5202 13.2519 31.6481 15.3377 31.625H33.661Z" fill="#FFA500"/>
		<path d="M15.8169 16.7708H25.4002C26.1941 16.7708 26.8377 16.1272 26.8377 15.3333C26.8377 14.5394 26.1941 13.8958 25.4002 13.8958H15.8169C15.023 13.8958 14.3794 14.5394 14.3794 15.3333C14.3794 16.1272 15.023 16.7708 15.8169 16.7708Z" fill="#FFA500"/>
		<path d="M30.1919 21.5625H15.8169C15.023 21.5625 14.3794 22.2061 14.3794 23C14.3794 23.7939 15.023 24.4375 15.8169 24.4375H30.1919C30.9858 24.4375 31.6294 23.7939 31.6294 23C31.6294 22.2061 30.9858 21.5625 30.1919 21.5625Z" fill="#FFA500"/>
		</svg>`;
	}

	widgetOpenFAB.addEventListener("click", () => {
		chatWidgetContainer.style.display = "block";
		widgetOpenFAB.style.display = "none";
		if (!fabCloseIcon) {
			widgetCloseFAB.innerHTML = `
				<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none">
					<path d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="#FCCA19" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>`;
		} else {
			fabImg.src = fabCloseIcon;
			fabImg.alt = "Close";
		}
	});
	widgetCloseFAB.addEventListener("click", () => {
		chatWidgetContainer.style.display = "none";
		widgetOpenFAB.style.display = "block";
	});

	// START: Dragging functionality
	
	// Event listener for mouse down
	// chatWidgetContainer.addEventListener("mousedown", (e) => {
	// 	isDragging = true;
	// 	offsetX = e.clientX - chatWidgetContainer.getBoundingClientRect().left;
	// 	offsetY = e.clientY - chatWidgetContainer.getBoundingClientRect().top;
	// });

	// drag enable just for header otherwise when we drag on iframe it will not work
	widgetHeader.addEventListener("mousedown", (e) => {
		isDragging = true;
		offsetX = e.clientX - chatWidgetContainer.getBoundingClientRect().left;
		offsetY = e.clientY - chatWidgetContainer.getBoundingClientRect().top;

		// Prevent default dragging of selected content
		e.preventDefault();
	});

	// Event listener for mouse up
	document.addEventListener("mouseup", () => {
		isDragging = false;
	});

	// Disable drag when mouse leaves the header
	chatWidgetContainer.addEventListener("mouseleave", () => {
		isDragging = false;
	});

	// Event listener for mouse move
	document.addEventListener("mousemove", (e) => {
		if (isDragging) {
			const x = e.clientX - offsetX;
			const y = e.clientY - offsetY;

			// Ensure the chatWidgetContainer stays within the viewport
			const maxX = window.innerWidth - chatWidgetContainer.offsetWidth;
			const maxY = window.innerHeight - chatWidgetContainer.offsetHeight;

			chatWidgetContainer.style.left = `${Math.min(maxX, Math.max(0, x))}px`;
			chatWidgetContainer.style.top = `${Math.min(maxY, Math.max(0, y))}px`;
		}
	});
	// END: Dragging functionality

	// START: full screen toggle functionality
	
	// fullScreenBtn.addEventListener("click", () => {
	// 	if (chatWidgetContainer.requestFullscreen) {
	// 		chatWidgetContainer.requestFullscreen();
	// 	} else if (chatWidgetContainer.webkitRequestFullscreen) {
	// 		/* Safari */
	// 		chatWidgetContainer.webkitRequestFullscreen();
	// 	} else if (chatWidgetContainer.msRequestFullscreen) {
	// 		/* IE11 */
	// 		chatWidgetContainer.msRequestFullscreen();
	// 	}
	// });

	// open chat widget on full screen mode with another tab
	// fullScreenBtn.addEventListener("click", () => {
	// 	window.open(iframeSrc);
	// });

	// open chat widget on full screen with tab
	fullScreenBtn.addEventListener("click", () => {
		if (!isFullScreen) {
			chatWidgetContainer.style.height = "100%";
			chatWidgetContainer.style.width = "100%";
			chatWidgetContainer.style.borderRadius = "0px";
			chatWidgetContainer.style.top = "0px";
			chatWidgetContainer.style.left = "0px";
			chatWidgetContainer.style.bottom = "0px";
			chatWidgetContainer.style.right = "0px";
			chatWidgetContainer.style.zIndex = "1000";
			chatWidgetContainer.style.position = "fixed";
			chatWidgetContainer.style.display = "block";
			widgetOpenFAB.style.display = "none";
			widgetHeader.style.display = "none";
			isFullScreen = true;
		} else {
			chatWidgetContainer.style.height = "650px";
			chatWidgetContainer.style.width = "375px";
			chatWidgetContainer.style.borderRadius = "10px";
			chatWidgetContainer.style.top = "auto";
			chatWidgetContainer.style.left = "auto";
			chatWidgetContainer.style.bottom = "20px";
			chatWidgetContainer.style.right = "20px";
			chatWidgetContainer.style.zIndex = "1000";
			chatWidgetContainer.style.position = "absolute";
			chatWidgetContainer.style.display = "block";
			widgetOpenFAB.style.display = "none";
			widgetHeader.style.display = "block";
			isFullScreen = false;
		}
	});
	// END: full screen toggle functionality
})();
