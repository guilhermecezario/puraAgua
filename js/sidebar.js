var button = document.querySelector('#sidebarButton');
var wrapper = document.querySelector('#wrapper');
var card = document.querySelector('.card');
var table = document.querySelector('table');
var inputSearch = document.querySelector('.navSearch');

button.addEventListener("click", function (e) {
  e.preventDefault();
  if (wrapper.className === 'closedSidebar') {
    wrapper.classList.remove('closedSidebar');
    wrapper.classList.add('openedSidebar');
    table.style.width = "84.5vw";
    card.style.width = "84.5vw";
    inputSearch.style.marginRight = "15rem";
  } else {
    wrapper.classList.remove('openedSidebar');
    wrapper.classList.add('closedSidebar');
    table.style.width = "98vw";
    card.style.width = "98vw";
    inputSearch.style.marginRight = "0.5rem"
  }
});