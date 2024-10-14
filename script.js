const form = document.querySelector('.form-menu');
const submitBtn = form.querySelector('.itemSubmit');
const input = document.querySelector('.add-item');
const ul = document.querySelector('.items');
const clearBtn = document.querySelector('.clear-button');
const itemFilter = document.querySelector('.item-filter');

let isEditMode = false;


const addItem = (e) => {
  e.preventDefault();

  let arr;

  if (localStorage.getItem('items') === null) {
    arr = []
  } else {
    arr = JSON.parse(localStorage.getItem('items'));
  }

  if (isEditMode) {
    const listItems = document.querySelectorAll('.items li');
    listItems.forEach(item => {
      if (item.className === 'edit-mode') {
        item.remove();
        pushItem(arr);
      }
    })

    submitBtn.value = '+ Add Item';
    submitBtn.classList.remove('upgrade-item');
    input.value = '';
    isEditMode = false;
  } else {
    pushItem(arr)
  }
  
  
}

const pushItem = (arr) => {
  if (input.value === '') {
    alert('Hi');
    return;
  } else {
    arr.push(input.value);
    
    localStorage.setItem('items', JSON.stringify(arr));
    
    displayItem(input.value)
    input.value = '';
  }
}

const displayItem = (text) => {
  const li = document.createElement('li');
  const button = newButton('delete');
  li.textContent = text;
  li.appendChild(button);
  ul.appendChild(li)
}

const newButton = (classes) => {
  const button = document.createElement('button');
  button.className = classes;
  const icon = newIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}

const newIcon = (classes) => {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}


const displayAllItems = () => {
  const arr = JSON.parse(localStorage.getItem('items'));

  if (arr) {
    arr.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      const button = newButton('delete');
      li.appendChild(button);
      ul.appendChild(li);
    })
  } else {
    return;
  }
}

const clearAll = () => {
  const list = document.querySelectorAll('.items li');
  list.forEach(item => item.remove());
  localStorage.clear();
}

const deleteItem = (e) => {
  const storedItems = JSON.parse(localStorage.getItem('items'));
  const text = e.target.parentElement.parentElement.textContent;
  const index = storedItems.indexOf(text);

  if (e.target.parentElement.className === 'delete') {
    storedItems.splice(index, 1);
    localStorage.setItem('items', JSON.stringify(storedItems));
    e.target.parentElement.parentElement.remove();
  } else {
    editMode(e.target)
  }
}

const filterItems = (e) => {
  const items = document.querySelectorAll('.items li')
  const text = e.target.value.toLowerCase();

  items.forEach(item => {
    const itemText = item.textContent.toLowerCase();
    
    if(itemText.indexOf(text) !== -1) {
      item.style.display = 'flex'
    } else {
      item.style.display = 'none'
    }
  })
}

const editMode = (target) => {
  const storedItems = JSON.parse(localStorage.getItem('items'));
  const index = storedItems.indexOf(target.textContent);

  if (target.nodeName === 'LI') {
    isEditMode = true;
    target.classList.add('edit-mode');
    input.value = target.textContent;
    submitBtn.value = 'Upgrade Item';
    submitBtn.classList.add('upgrade-item');
    storedItems.splice(index, 1);
    localStorage.setItem('items', JSON.stringify(storedItems));
  }
}

displayAllItems();

form.addEventListener('submit', addItem);
clearBtn.addEventListener('click', clearAll);
ul.addEventListener('click', deleteItem);
itemFilter.addEventListener('input', filterItems);

