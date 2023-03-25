const http = require("http");
const fs = require("fs");

function createPost(jsonFile) {
  fs.readFile(jsonFile, (err, data) => {
    if (err) throw err;

    const jsonData = JSON.parse(data);
    const today = new Date();
    const dateToday = today.toLocaleDateString();

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Proxy MTProxy</title>
          <style>
            body {
              background-color: #333;
              color: white;
              font-family: Arial, sans-serif;
            }
            .post {
              margin: 10px;
              padding: 10px;
              border-radius: 10px;
              box-shadow: 0px 0px 10px #555;
              font-size: 26px;
              background-color: rgba(111, 220, 252, 0.7);
              height: 30px;
              color: black;
              display: inline-block;
              text-align: center;
            }
            .post:nth-child(odd) {
              background-color: #555;
            }
            .post p {
              color: #fff;
              font-size: 18px;
              line-height: 1.5;
            }
            .title {
              text-align: center;
              font-size: 40px;
              font-weight: bold;
              margin: 20px 0;
            }
            #pageTitle {
              color: #F8FB33;
            }
            .lastFiveChars {
                background-color: rgba(237, 240, 42, 0.9);
                width: 50px;
                margin: 10px;
                padding: 10px;
                border-radius: 10px;
                box-shadow: 0px 0px 10px #555;
                font-size: 20px;
                color: black;
              }
              
              .container {
                background-color: rgba(200, 233, 242, 0.2); /* 50% transparency */
                border-radius: 10px;
                box-shadow: 0px 0px 20px #555;
                padding: 20px;
                margin-bottom: 20px; /* Add distance between container elements */
              }
              .container:last-child {
                background-color: rgba(241, 255, 25, 0.85); /* Set a different background color transparency for the last container */
              }
          </style>
        </head>
        <body>
          <div class="title" id="pageTitle">Proxy MTProxy</div>
          <div class="title" id="pageDate">${dateToday}</div>
          ${jsonData.posts
            .map(
              (post) =>
                `<div class="container">
                <div class="lastFiveChars">${post.slice(
                  -5
                )}</div><div class="post">${
                  post.split("@ProxyMTProto")[0]
                }</div>
                </div>`
            )
            .join("")}
        </body>
      </html>
    `;

    fs.writeFile("index.html", htmlContent, (err) => {
      if (err) throw err;
    });
  });
}

function processJSONFiles() {
  fs.readdir("./", (err, files) => {
    if (err) throw err;

    const jsonFiles = files.filter((file) => file.endsWith(".json"));
    if (jsonFiles.length > 0) {
      createPost(jsonFiles[0]);
    }
  });
}

processJSONFiles();

const server = http.createServer((req, res) => {
  fs.readFile("index.html", (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      return res.end("404 Not Found");
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    return res.end();
  });
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
