// sdk.js
(function () {
	// Get customization options from data attributes
	const scriptTag = document.currentScript;
	const fabBgColor = scriptTag.getAttribute("data-fab-bg-color") || "#333333";
	const fabIcon = scriptTag.getAttribute("data-fab-icon");
	const fabCloseIcon = scriptTag.getAttribute("data-fab-close-icon");
	const iframeSrc = scriptTag.getAttribute("data-iframe-src") || "";
	const iframeWidth = scriptTag.getAttribute("data-iframe-width") || "100%";
	const iframeHeight = scriptTag.getAttribute("data-iframe-height") || "100%";

	// Variable to check if the chat widget is open

	// Create the chat widget HTML
	const widgetHTML = `
	    <div class="techvill__widget-FAB__container">
            <button class="techvill__widget-FAB" style="background-color: ${fabBgColor}">Oepn</button>
        </div>
        <div id="techvill__widget-container">
			<div class="techvill__widget-header">

			</div>
			<div class="techvill__widget-body">
				${
					iframeSrc
						? `<iframe 
                        src="${iframeSrc}"
                        height=${iframeHeight}
                        width=${iframeWidth}
						class="techvill__widget-iframe"
                        title="Techvillage support chat"
                        frameborder="0" 
                        allowfullscreen="true" 
                        allowtransparency="true" 
                        allow="encrypted-media"
                    ></iframe>`
						: `<div class="techvill-widget-notfound-iframe">
                        <h1>Chat widget</h1>
                        <p>iframe source is not set</p>
                    </div>`
				}
			</div>
			<button class="techvill__widget-FAB__close" style="background-color: #2c2c2c">Close</button>
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
        #techvill__widget-container {
			position: absolute;
			bottom: 20px;
			right: 20px;
			height: 650px;
			width: 375px;
			display: block;
			z-index: 1000;
		}
		.techvill__widget-header {
			cursor: move;
			height: 20px;
			background-color: #f5a623;
			border-top-left-radius: 10px;
			border-top-right-radius: 10px;
		}
		#techvill__widget-container .techvill__widget-body {
			height: calc(100% - 95px);
			background-color: #fff;
			box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
			border-bottom-left-radius: 10px;
			border-bottom-right-radius: 10px;
			overflow: hidden;
		}
    `;

	// Inject HTML and CSS
	document.body.insertAdjacentHTML("beforeend", widgetHTML);
	document.head.appendChild(style);

	// Variables declaration
	const chatWidgetContainer = document.getElementById(
		"techvill__widget-container"
	);
	const widgetOpenFAB = document.querySelector(".techvill__widget-FAB");
	const widgetCloseFAB = document.querySelector(".techvill__widget-FAB__close");
	const widgetHeader = document.querySelector(".techvill__widget-header");

	let offsetX,
		offsetY,
		isDragging = false;

	// Add JavaScript interactivity
	widgetOpenFAB.addEventListener("click", () => {
		chatWidgetContainer.style.display = "block";
		widgetOpenFAB.style.display = "none";
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
	});

	// Event listener for mouse up
	document.addEventListener("mouseup", () => {
		isDragging = false;
	});

	// Event listener for mouse up
	document.addEventListener("mouseup", () => {
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
})();
