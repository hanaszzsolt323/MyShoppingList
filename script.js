const itemInput = document.querySelector('.addItem');
const submitButton = document.querySelector('.itemSubmit');
const list = document.querySelector('.items');
const form = document.querySelector('.form-menu');
const clearButton = document.querySelector('.clear-button');
const itemFilter = document.querySelector('.item-filter');


const addItem = (e) => {
  e.preventDefault();
  if(itemInput.value) {
    const newItem = document.createElement('li');
    const text = document.createTextNode(itemInput.value);
    const newButton = createButton('delete');
    
    newItem.appendChild(text);
    newItem.appendChild(newButton);
    list.appendChild(newItem);

    itemInput.value = '';
  }

  UI()
};

const createButton = (classes) => {
  const newButton = document.createElement('button');
  newButton.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  newButton.appendChild(icon);
  return newButton;
};

const createIcon = (classes) => {
  const newIcon = document.createElement('i');
  newIcon.className = classes;
  return newIcon;
};

const removeElement = (e) => {
  e.target.parentElement.className === 'delete' ? e.target.parentElement.parentElement.remove() : '';

  UI();
};

const clearAll = () => {
  document.querySelectorAll('.items li').forEach(item => item.remove());

  UI();
};

const filterItems = (e) => {
  const items = document.querySelectorAll('.items li');
  const text = e.target.value.toLowerCase();

  items.forEach(item => {
    const itemName = item.firstChild.textContent.toLowerCase();

    if(itemName.indexOf(text) != -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  })

  UI();
};

const UI = () => {
  if (list.children.length === 0) {
    clearButton.style.display = 'none';
    /* list.style.display = 'none'; */
  } else {
    clearButton.style.display = 'block';
    /* list.style.display = 'grid' */
  }
}






form.addEventListener('submit', addItem);
list.addEventListener('click', removeElement);
clearButton.addEventListener('click', clearAll);
itemFilter.addEventListener('input', filterItems);

UI();
