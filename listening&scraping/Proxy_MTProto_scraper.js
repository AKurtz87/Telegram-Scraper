/*
–––––––––––––––––]]]] TELEGRAM SCRAPER [[[[––––––––––––––––

            COPY AND PASTE IN THE BROWSER CONSOLE
*/

const posts = [];

function appendButton() {
  let button = document.createElement("button");
  button.innerHTML = "DOWNLOAD JSON";
  button.setAttribute("onclick", "jsonConvertDownload()");
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

function jsonConvertDownload() {
  getLastPost().then((posts) => {
    const data = { posts };
    const url = window.location.href;
    const channelTitle = url.substring(url.lastIndexOf("/") + 1);

    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: "application/json" });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = channelTitle + "_posts.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
}

// Add this function to clear the database at the beginning of the script
function clearDatabase() {
  const openRequest = indexedDB.open("myDatabase", 1);

  openRequest.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction(["post"], "readwrite");
    const objectStore = transaction.objectStore("post");

    const clearRequest = objectStore.clear();

    clearRequest.onsuccess = (event) => {
      console.log("Database cleared successfully!");
    };

    clearRequest.onerror = (event) => {
      console.error("Error clearing the database.");
    };
  };

  openRequest.onerror = (event) => {
    console.error("Error opening the database.");
  };
}

function savePost(post) {
  var openRequest = indexedDB.open("myDatabase", 1);

  openRequest.onupgradeneeded = function (event) {
    var db = event.target.result;
    var objectStore = db.createObjectStore("post", {
      keyPath: "id",
      autoIncrement: true,
    });
  };

  openRequest.onsuccess = function (event) {
    var db = event.target.result;
    var transaction = db.transaction(["post"], "readwrite");
    var objectStore = transaction.objectStore("post");

    objectStore.clear().onsuccess = function () {
      objectStore.add({ data: post });
    };
  };
}

function getLastPost() {
  return new Promise((resolve, reject) => {
    let openRequest = indexedDB.open("myDatabase", 1);
    openRequest.onsuccess = (event) => {
      let db = event.target.result;
      let transaction = db.transaction(["post"], "readonly");
      let objectStore = transaction.objectStore("post");

      let cursorRequest = objectStore.openCursor(null, "prev");
      cursorRequest.onsuccess = (event) => {
        let cursor = event.target.result;
        if (cursor) {
          resolve(cursor.value.data);
        } else {
          resolve([]);
        }
      };
      cursorRequest.onerror = () => {
        reject("Error retrieving data");
      };
    };
    openRequest.onerror = (event) => {
      reject("Error opening the database.");
    };
  });
}

function checkAndSavePost() {
  console.log("checking for new post...");

  getLastPost().then((oldPost) => {
    let selection = document.getElementsByClassName(
      "message spoilers-container"
    );
    let post;
    if (selection.length === 0) {
      post = "NO POST";
    } else {
      post = selection[selection.length - 1].textContent;
    }

    if (!Array.isArray(oldPost)) {
      oldPost = [oldPost];
    }

    if (oldPost.includes(post)) {
      console.log("no news!");
    } else {
      oldPost.push(post);
      savePost(oldPost);
      console.log("NEW POST!");
    }
  });
}

function executeEvery10Seconds() {
  clearDatabase();
  setInterval(checkAndSavePost, 10000);
}

executeEvery10Seconds();
