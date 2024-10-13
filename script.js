const itemForm = document.querySelector('.form');
const itemInput = document.querySelector('.add-item');
const itemList = document.querySelector('.items');
const deleteAll = document.querySelector('.clear-button');
const itemFilter = document.querySelector('.item-filter');

const onAddItemSubmit = (e) => {
  e.preventDefault();

  if (itemInput.value === '') {
    alert('Add an item');
    return;
  }

  addItemToDOM(itemInput.value);

  // Add item to localStorage
  addItemToStorage(itemInput.value)

  itemInput.value = '';


  clearUI();
}

// Add ItemToDom
const addItemToDOM = (item) => {
  const newItem = document.createElement('li');
  const text = document.createTextNode(item);
  newItem.appendChild(text);
  
  const newButton = createButton('delete');
  
  newItem.appendChild(newButton);
  
  itemList.appendChild(newItem);
}


// Create Button
const createButton = (classes) => {
  const newButton = document.createElement('button');
  const icon = createIcon('fa-solid fa-xmark');
  newButton.className = classes;
  newButton.appendChild(icon);
  return newButton;
} 

// Create Icon
const createIcon = (classes) => {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

// Add item to localStorage
const addItemToStorage = (item) => {
  let itemsFromStorage;

  if(localStorage.getItem('items') === null) {
    itemsFromStorage = []
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }

  itemsFromStorage.push(item);

  // Convert to JSON String and set to localStorage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

// Get Items from storage
const getItemsFromStorage = () => {
  const items = JSON.parse(localStorage.getItem('items'));
  if (localStorage.getItem('items') !== null) {
    displayItemsFromStorage(items);
  } 
}

const displayItemsFromStorage = (items) => {
  items.forEach(item => {
    const newItem = document.createElement('li');
    const text = document.createTextNode(item);
    newItem.appendChild(text);
  
    const newButton = createButton('delete');
  
    newItem.appendChild(newButton);
  
    itemList.appendChild(newItem);
  })

  clearUI()
}

// Remove Item
const removeItem = (e) => {
  e.target.className === 'fa-solid fa-xmark' ? (e.target.parentElement.parentElement.remove(), deleteFromStorage(e.target.parentElement.parentElement.innerText), clearUI()) : '';
}

// Delete Item from localStorage
const deleteFromStorage = (item) => {
  const items = JSON.parse(localStorage.getItem('items'));
  const index = items.indexOf(item);
  items.splice(index, 1);

  localStorage.setItem('items', JSON.stringify(items))
}

// Delete all
const deleteAllItems = () => {
  document.querySelectorAll('.items li').forEach(item => item.remove());

  localStorage.clear();

  clearUI();
}

// Filter Items
const filterItems = (e) => {
  const items = document.querySelectorAll('li');
  items.forEach(item => {
    const text = item.innerText.toLowerCase();
    if(text.indexOf(e.target.value.toLowerCase()) !== -1) {
      item.style.display = 'flex'
    } else {
      item.style.display = 'none'
    }
  })
}

// Clear UI
const clearUI = () => {
  if(!document.querySelectorAll('.items li').length) {
    deleteAll.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    deleteAll.style.display = 'block';
    itemFilter.style.display = 'block';
  }
}

// Events
itemForm.addEventListener('submit', onAddItemSubmit);
itemList.addEventListener('click', removeItem);
deleteAll.addEventListener('click', deleteAllItems);
itemFilter.addEventListener('input', filterItems)

clearUI();
getItemsFromStorage();

