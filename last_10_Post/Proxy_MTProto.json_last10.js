/*
–––––––––––––––––]]]] TELEGRAM SCRAPER [[[[––––––––––––––––

            COPY AND PASTE IN THE BROWSER CONSOLE
*/

function getLast10Posts() {
  const messages = document.getElementsByClassName(
    "message spoilers-container"
  );
  const posts = [];

  if (messages.length === 0) {
    posts.push("NO POST");
  } else {
    const start = Math.max(messages.length - 10, 0);
    for (let i = start; i < messages.length; i++) {
      posts.push(messages[i].textContent);
    }
  }

  return posts;
}

function downloadPostsAsJSON() {
  const posts = getLast10Posts();
  const data = { posts };
  const url = window.location.href;
  const channelTitle = url.substring(url.lastIndexOf("/") + 1);

  const json = JSON.stringify(data);
  const blob = new Blob([json], { type: "application/json" });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = channelTitle + "_last_10_posts.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function appendButton() {
  let button = document.createElement("button");
  button.innerHTML = "DOWNLOAD LAST 10 POSTS";
  button.onclick = downloadPostsAsJSON;
  button.style.backgroundColor = "#3fef0f";
  button.style.borderRadius = "4px";
  button.style.color = "#36395a";
  button.style.cursor = "pointer";
  button.style.fontFamily = '"JetBrains Mono", monospace';
  button.style.fontSize = "18px";
  button.style.padding = "16px";
  button.style.textAlign = "center";

  let body = document.getElementsByTagName("div")[1];
  body.appendChild(button);
}

appendButton();
