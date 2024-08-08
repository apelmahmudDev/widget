# Widget

This repository contains the script and instructions to integrate your beautiful idea into your web application like messaging, chatbot, website, etc. The widget provides an interactive and user-friendly way to engage with visitors on your site.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)

## Installation

To include the widget on your website, follow these steps:

1. **Download the Script:**
   Download `widget.min.js` and host it on your server or use the provided script tag to include it in your HTML.

2. **Include the Script Tag:**
   Add the following script tag to the HTML file where you want the widget to appear.

   ```html
   <script
     src="https://cdn.jsdelivr.net/widget.min.js"
     data-iframe-src="https://yourwebsite/chatbot"
     data-fab-bg-color="#0078d4"
     data-fab-icon="https://yourwebsite/icon.png"
     data-iframe-height="532"
     data-iframe-width="400"
   ></script>
   ```

## Configuration

The script tag can be customized using the following attributes:

- `data-iframe-src`: The URL of the widget iframe that will be embedded in the page. Replace `https://yourwebsite/chatbot` with the actual URL of your widget.
- `data-fab-bg-color`: The background color of the floating action button (FAB). For example, `#0078d4`.
- `data-fab-icon`: The URL of the icon to be used in the FAB. Provide a direct link to the image.
- `data-iframe-height`: The height of the widget iframe in pixels. Example: `532`.
- `data-iframe-width`: The width of the widget iframe in pixels. Example: `400`.

## Usage

To integrate the chatbot widget into your web application, copy and paste the script tag into the HTML file where you want the chatbot or your website view to appear. Customize the attributes as needed to fit your design requirements.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Web App</title>
  </head>
  <body>
    <script
      src="https://cdn.jsdelivr.net/widget.min.js"
      data-iframe-src="https://yourwebsite/chatbot"
      data-fab-bg-color="#0078d4"
      data-fab-icon="https://yourwebsite/icon.png"
      data-iframe-height="532"
      data-iframe-width="400"
    ></script>
  </body>
</html>
```
