# Artifism Chatbot Widget

This repository contains the script and instructions to integrate the Artifism chatbot into your web application. The chatbot provides an interactive and user-friendly way to engage with visitors on your site.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Customization](#customization)
- [License](#license)

## Installation

To include the Artifism chatbot widget on your website, follow these steps:

1. **Download the Script:**
   Download `chatbot-sdk.clean.js` and host it on your server or use the provided script tag to include it in your HTML.

2. **Include the Script Tag:**
   Add the following script tag to the HTML file where you want the chatbot to appear.

   ```html
   <script
     src="./chatbot-sdk.clean.js"
     data-iframe-src="http://localhost:5173/chatbot/embed/chatbot_code=13ded7e855f248c/welcome"
     data-fab-bg-color="#0078d4"
     data-fab-icon="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm09sUIc7f6qJOCrrEH8vGsEGOG2TkWwb0JA&s"
     data-iframe-height="532"
     data-iframe-width="400"
   ></script>
   ```

## Configuration

The script tag can be customized using the following attributes:

- `data-iframe-src`: The URL of the chatbot iframe that will be embedded in the page.
