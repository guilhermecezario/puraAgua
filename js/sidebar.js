var button = document.querySelector('#sidebarButton');
var wrapper = document.querySelector('#wrapper');
var card = document.querySelectorAll('.card');
var inputSearch = document.querySelector('.navSearch');

console.log(card)

button.addEventListener("click", function (e) {
  e.preventDefault();

  if (wrapper.className === 'closedSidebar') {
    wrapper.classList.add('openedSidebar');
    for (c = 0; c < card.length; c++) {
      card[c].style.width = "86vw";
    }
    
    inputSearch.style.marginRight = "15rem";

    
  } else {
    wrapper.classList.remove('openedSidebar');
    for (c = 0; c < card.length; c++) {
      card[c].style.width = "98vw";
    }
    inputSearch.style.marginRight = "0.5rem"
  }
});