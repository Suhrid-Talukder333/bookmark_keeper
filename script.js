const modal = document.getElementById("modal");
const closeModal = document.getElementById("close-modal");
const showModal = document.getElementById("show-modal");
const bookmarkForm = document.getElementById("bookmark-form");
const websiteName = document.getElementById("website-name");
const websiteUrl = document.getElementById("website-url");

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
