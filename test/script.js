// sdk.js
(function () {
	// Get customization options from data attributes

	// Variable to check if the chat widget is open

	// Create the chat widget HTML
	const widgetHTML = `
		
        <div id="chatbox">
			<div class="chat-body">
				<h2>Chatbox</h2>
				<p>This is a draggable chatbox.</p>
			</div>
			<button id="techvill-widget-fab-close" class="techvill-widget-fab-close-button" style="background-color: #2c2c2c"> -</button>
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
        #chatbox {
			position: absolute;
			bottom: 10px;
			right: 10px;
			cursor: move;
			height: 300px;
			width: 300px;
		}

		#chatbox .chat-body {
			height: calc(100% - 120px);
			background-color: #fff;
			padding: 20px;
			border-radius: 5px;
			box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
			
		}
			
        .techvill-widget-fab-close-button {
			position: absolute;
			right: 0;
			bottom: 10px;
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
    `;

	// Inject HTML and CSS
	document.body.insertAdjacentHTML("beforeend", widgetHTML);
	document.head.appendChild(style);

	// Variables declaration
	const fabButton = document.getElementById("techvill-widget-fab");

	// Add JavaScript interactivity
	const chatbox = document.getElementById("chatbox");

	let offsetX,
		offsetY,
		isDragging = false;

	// Event listener for mouse down
	chatbox.addEventListener("mousedown", (e) => {
		isDragging = true;
		offsetX = e.clientX - chatbox.getBoundingClientRect().left;
		offsetY = e.clientY - chatbox.getBoundingClientRect().top;
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

			// Ensure the chatbox stays within the viewport
			const maxX = window.innerWidth - chatbox.offsetWidth;
			const maxY = window.innerHeight - chatbox.offsetHeight;

			chatbox.style.left = `${Math.min(maxX, Math.max(0, x))}px`;
			chatbox.style.top = `${Math.min(maxY, Math.max(0, y))}px`;
		}
	});
})();
