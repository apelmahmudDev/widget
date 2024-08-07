// sdk.js
(function () {
	// Get customization options from data attributes
	const scriptTag = document.currentScript;
	const fabBgColor = scriptTag.getAttribute("data-fab-bg-color") || "#24E186CC";
	// const fabIcon = scriptTag.getAttribute("data-fab-icon");
	const fabIcon = "https://i.ibb.co/CthkwCV/img-robot-face.png";
	const fabCloseIcon = "";
	const iframeSrc = scriptTag.getAttribute("data-iframe-src") || "";
	const iframeWidth = scriptTag.getAttribute("data-iframe-width") || 375;
	const iframeHeight = scriptTag.getAttribute("data-iframe-height") || 532;

	// get chatbot details --------------------start
	// http://localhost:5173/chatbot/embed/chatbot_code=13ded7e855f248c/welcome

	let chatbotCode = iframeSrc.split("chatbot_code=")[1].split("/")[0];
	let chatbot = {};

	const getChatbotDetails = async () => {
		const response = await fetch(
			`http://localhost/artifism/api/v2/visitor/widget/chatbots/details/${chatbotCode}`
		);
		const data = await response.json();
		chatbot = data?.data;
	};

	getChatbotDetails();

	// get chatbot details --------------------end

	// Variable to check if the chat widget is open
	let isOpen = true;

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
            right: 21px;
            z-index: 1500;
        }
        .techvill-widget-fab-button {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            color: #fff;
            border: none;
            cursor: pointer;
			background-color: #24E186CC;
            box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
			transition: all 0.1s ease-in-out;
        }
        .techvill-widget-fab-icon {
            height: 47px;
            width: 47px;
        }
        .techvill-widget-chat-modal {
            visibility: hidden;
			opacity: 0;
            position: fixed;
            bottom: 70px;
            right: 21px;
            background-color: #fff;
            z-index: 1000;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3); 
            transition: all 0.2s ease-in-out;
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

	// active chatbot
	if (!chatbot.status) {
		fabButton.style.display = "none";
	}

	fabButton.innerHTML = `<img src="${fabIcon}" alt="open"/>`;

	fabButton.addEventListener("click", function () {
		if (isOpen) {
			document.getElementById("techvill-widget-chat-modal").style.visibility =
				"visible";
			document.getElementById("techvill-widget-chat-modal").style.bottom =
				"110px";
			document.getElementById("techvill-widget-chat-modal").style.opacity = "1";

			fabButton.innerHTML = `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path fill-rule="evenodd" clip-rule="evenodd" d="M0.536971 0.536971C1.25293 -0.17899 2.41373 -0.17899 3.1297 0.536971L11 8.40728L18.8703 0.536971C19.5863 -0.17899 20.7471 -0.17899 21.463 0.536971C22.179 1.25293 22.179 2.41373 21.463 3.1297L13.5927 11L21.463 18.8703C22.179 19.5863 22.179 20.7471 21.463 21.463C20.7471 22.179 19.5863 22.179 18.8703 21.463L11 13.5927L3.1297 21.463C2.41373 22.179 1.25293 22.179 0.536971 21.463C-0.17899 20.7471 -0.17899 19.5863 0.536971 18.8703L8.40728 11L0.536971 3.1297C-0.17899 2.41373 -0.17899 1.25293 0.536971 0.536971Z" fill="white"/>
			</svg>`;

			// fabButton svg show zoom in animation
			fabButton.style.transform = "rotate(90deg)";
			fabButton.style.transition = "all 0.2s ease-in-out";
		} else {
			fabButton.innerHTML = `<img id="chat-icon" src="${fabIcon}" alt="open"/>`;
			document.getElementById("techvill-widget-chat-modal").style.visibility =
				"hidden";
			document.getElementById("techvill-widget-chat-modal").style.bottom =
				"70px";
			document.getElementById("techvill-widget-chat-modal").style.opacity = "0";
			fabButton.style.transform = "rotate(0deg)";
			fabButton.style.transition = "all 0.08s ease-in-out";
		}
		isOpen = !isOpen;
	});
})();
