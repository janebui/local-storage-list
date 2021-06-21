const form = document.querySelector('form');
const input = document.querySelector('#item');
const list = document.querySelector('.list');
const clearButton = document.querySelector('#clear');
const itemsToRemove = document.querySelectorAll('.remove');
let itemsArray = JSON.parse(localStorage.getItem('items')) || [];
// retrieve items from localStorage and parse, or empty array if nothing in localStorage yet

// add an item from the input
function addItem(e) {
    e.preventDefault();
    const item = input.value;
    itemsArray.push(item);

    populateList(itemsArray, list);

    localStorage.setItem('items', JSON.stringify(itemsArray));

    this.reset();
}

// populate the list using what's in localStorage
function populateList(itemsArray = [], list) {
    list.innerHTML = itemsArray.map((item, i) => {
        return `
            <li data-index="${i}">
                ${item}
                <i class="far fa-times-circle remove"></i>
            </li>
        `;
    }).join(''); // need to join bc map returns an array, but innerHtml needs a string
}

// remove an item from the list when clicking X
function removeItem(e) {
    if (!e.target.matches('.remove')) return; // user clicks on list but not the remove icon
    const li = e.target.parentNode;
    const index = li.dataset.index;
    itemsArray.splice(index, 1);
    localStorage.setItem('items', JSON.stringify(itemsArray)); // update the localStorage
    populateList(itemsArray, list); // repopulate list with updated items
}

// remove all items from the list
function clearAll() {
    localStorage.clear();
    list.innerHTML = '';
}

// listen to submit event, works with clicking the button or hitting Enter
form.addEventListener('submit', addItem);

// remove an item from the list when clicking X
list.addEventListener('click', removeItem);

// clear all items from the list when clicking the Clear All button
clearButton.addEventListener('click', clearAll);

// populate the list on page load
populateList(itemsArray, list);

//
