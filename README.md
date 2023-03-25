# Telegram-Scraper

This repository contains a Telegram Channel Scraper script and an HTML Server script that allow you to automatically scrape posts from Telegram channels and then display them on a local server.

## WHAT IS A SCRAPER

A scraper, in general, is a tool or software that extracts information from websites or other sources by simulating user interactions or fetching web pages and parsing the HTML content. Scrapers can collect a wide variety of data, such as texts, images, links, and metadata, depending on the specific requirements of the task. In the context of monitoring Telegram channels, a scraper can be used to regularly check for new messages, posts, or updates in one or multiple channels. By automating this process, users can keep track of new content without needing to manually visit each channel. This is particularly useful for those who want to collect, archive, or analyze the information shared in Telegram channels, such as researchers, marketers, or enthusiasts interested in a specific topic. A well-designed scraper can help users stay informed about the latest updates, enabling them to respond more quickly to new information or identify trends and patterns in the data.

## @ProxyMTProto

@ProxyMTProto is a Telegram channel that provides users with proxy servers or MTProto proxies for the Telegram messaging application. These proxy servers help users bypass restrictions and access blocked content in regions where Telegram might be blocked or restricted. The channel shares updates and information about the latest working proxy servers to ensure users have access to a reliable and secure connection to the Telegram platform. Please note that the content of this channel may have changed since my last update, so it is recommended to verify the current status of the channel before using it.

**The scraper is written to scrape this channel** 


## Getting Started

These instructions will guide you through the process of setting up the scraper to monitor specific Telegram channels and display the scraped data using the provided HTML Server.

## Prerequisites

- Node.js installed on your system

## Installation

Clone this repository to your local machine:

> git clone https://github.com/yourusername/telegram-channel-scraper.git

Navigate to the project folder:

> cd telegram-channel-scraper

## Usage

Open the Telegram web application in your browser and navigate to the channel you want to monitor.
Open the browser's developer console (usually by pressing F12 or Ctrl+Shift+I).
Copy the contents of the scraper.js file and paste it into the console, then press Enter.

<img width="412" alt="image" src="https://user-images.githubusercontent.com/91114967/227712821-f6f3fbd1-9620-47da-b14c-7123a72ab6af.png">

The scraper will now check for new posts every 10 seconds and save them to an IndexedDB database in your browser. A "DOWNLOAD JSON" button will also appear, allowing you to download the scraped data in JSON format.

<img width="631" alt="image" src="https://user-images.githubusercontent.com/91114967/227712888-71dc30da-b66d-4ab7-8c83-07b8c1914369.png">

### HTML Server

- Make sure you have a JSON file containing the scraped data from the Telegram channel (either downloaded using the scraper or created manually).
- Place the JSON file in the project folder.
 -Run the following command in the terminal to process the JSON file and create an index.html file:

> node server.js

The HTML Server will start running on port 3000. Open your browser and navigate to http://localhost:3000 to view the scraped posts.

<img width="448" alt="image" src="https://user-images.githubusercontent.com/91114967/227712855-5d073349-aaba-4a25-849f-5c907b483099.png">

## FOCUS ON THE SCRIPTS

### SCRAPER:

The Telegram Scraper script is a browser console script that helps users scrape posts from a Telegram channel and save them in JSON format. The script creates a "Download JSON" button, which, when clicked, downloads the scraped posts as a JSON file. To use the script, users should copy and paste it into their browser console while browsing the desired Telegram channel.

The script works by first appending the "Download JSON" button to the page. It then defines a jsonConvertDownload function that retrieves the latest posts from the IndexedDB database, converts them into JSON format, and initiates a download of the JSON file. The database is cleared at the start of the script using the clearDatabase function to ensure that only the latest posts are considered.

The savePost function is responsible for saving posts to the database. Before saving a post, it clears the object store to ensure there is only one entry in the database. The getLastPost function retrieves the latest post from the database and returns it as a Promise.

The checkAndSavePost function checks for new posts on the Telegram channel by comparing the latest post on the channel with the latest post in the database. If a new post is found, it updates the database with the new post.

Finally, the executeEvery10Seconds function clears the database at the beginning and sets an interval to run the checkAndSavePost function every 10 seconds, continuously checking for new posts and updating the database accordingly.

### HTML SERVER

The script is a Node.js server-side application that generates an HTML page based on JSON data, specifically from posts scraped from a Telegram channel, and serves the generated HTML page on a local server. The script uses the "http" and "fs" modules to create an HTTP server and perform file operations, respectively.

The createPost function reads a JSON file, parses its contents, and creates an HTML page using a template literal. The template features styling and dynamically generated elements based on the JSON data, such as containers displaying the posts with different background colors and other style properties. The generated HTML content is saved as "index.html".

The processJSONFiles function scans the current directory for JSON files and calls the createPost function on the first JSON file found. This function is executed immediately after its definition.

The script then creates an HTTP server that listens for incoming requests. When a request is received, the server reads the "index.html" file and sends its contents as the response. If the file is not found, it returns a 404 Not Found error.

The server listens on port 3000, and when it starts successfully, it logs a message to the console indicating the server's address.

