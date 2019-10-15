const form = document.querySelector('form');
const list = document.querySelector('.list');
const clearButton = document.querySelector('#clear');
const input = document.querySelector('#item');
let itemsArray = [];

// retrieve items from localStorage and parse
const data = JSON.parse(localStorage.getItem('items')) || [] ;

// addItem function appends li 
const addItem = item => {
    const li = document.createElement('li');
    li.textContent = item;
    list.appendChild(li);
}

form.addEventListener('submit', function (e) {
    e.preventDefault() // prevent the form from sending to a server

    itemsArray.push(input.value);

    // store item in localStorage as a string
    localStorage.setItem('items', JSON.stringify(itemsArray));

    addItem(input.value);
    this.reset();
})

// display local Storage items on front-end list
data.forEach(item => {
    addItem(item);
})

clearButton.addEventListener('click', function () {
    localStorage.clear();
    list.innerHTML = '';
})