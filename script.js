const modal = document.getElementById("modal");
const closeModal = document.getElementById("close-modal");
const showModal = document.getElementById("show-modal");
const bookmarkForm = document.getElementById("bookmark-form");
const websiteName = document.getElementById("website-name");
const websiteUrl = document.getElementById("website-url");
const bookmarsContainer = document.getElementById("bookmarks-container");

let bookmarks = [];

const modalShowFunction = () => {
  modal.classList.add("show-modal");
  websiteName.focus();
};

const modalCloseFunction = () => {
  modal.classList.remove("show-modal");
};

showModal.addEventListener("click", modalShowFunction);
closeModal.addEventListener("click", modalCloseFunction);
window.addEventListener("click", (event) =>
  event.target === modal ? modalCloseFunction() : false
);

function validate(url) {
  const exp =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  const regex = new RegExp(exp);
  if (url.match(regex)) {
    return true;
  } else {
    return false;
  }
}

const storeBookmark = (event) => {
  event.preventDefault();
  const name = websiteName.value;
  let url = websiteUrl.value;
  if (!url.includes("http://", "https://")) {
    url = "https://" + url;
  }
  if (!validate(url)) {
    if (!document.getElementById("error-message")) {
      const parent = websiteUrl.parentElement;
      const error_message = document.createElement("h6");
      error_message.id = "error-message";
      error_message.textContent = "Please Enter Valid Address";
      error_message.style.color = "red";
      parent.appendChild(error_message);
    }
  }
  const bookmark = {
    name: websiteName.value,
    url: url,
  };
  bookmarks.push(bookmark);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarks();
  modalCloseFunction();
};

bookmarkForm.addEventListener("submit", storeBookmark);
websiteUrl.addEventListener("focus", () => {
  if (document.getElementById("error-message")) {
    document.getElementById("error-message").remove();
  }
});

const deleteBookmark = (url) => {
  bookmarks.forEach((bookmark, i) => {
    if (bookmark.url == url) {
      bookmarks.splice(i, 1);
    }
  });
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarks();
};

const buildBookmarks = () => {
  bookmarsContainer.textContent = "";
  bookmarks.forEach((bookmark) => {
    const { url, name } = bookmark;
    const item = document.createElement("div");
    item.classList.add("item");
    const closeIcon = document.createElement("i");
    closeIcon.classList.add("fas", "fa-times-circle");
    closeIcon.setAttribute("title", "delete");
    closeIcon.setAttribute("onClick", `deleteBookmark('${url}')`);
    const linkInfo = document.createElement("div");
    linkInfo.classList.add("name");
    const favicon = document.createElement("img");
    favicon.setAttribute(
      "src",
      `https://s2.googleusercontent.com/s2/favicons?domain=${url}`
    );
    favicon.setAttribute("alt", "favicon");
    const link = document.createElement("a");
    link.setAttribute("href", `${url}`);
    link.setAttribute("target", "_blank");
    link.textContent = name;
    linkInfo.append(favicon, link);
    item.append(closeIcon, linkInfo);
    bookmarsContainer.appendChild(item);
  });
};

const fetchBookmarks = () => {
  if (localStorage.getItem("bookmarks")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  } else {
    bookmarks = [
      {
        name: "Your Bookmark",
        url: "https://bookmarkeeper.netlify.app/",
      },
    ];
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
  buildBookmarks();
};

fetchBookmarks();
