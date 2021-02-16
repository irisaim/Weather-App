let addItem = document.querySelector('#addItem');
let items = document.getElementById('items');
btn = document.getElementById('btn');


 addItem.addEventListener('keydown', addNewItem);
   function addNewItem(e) {
       let addItemValue = e.target;
     if(e.keyCode === 13) {
        let table = document.querySelector('th');
        // let table = document.querySelector('.types');
        let tr = document.createElement('tr');
        tr.textContent = addItem.value;
        let appendedItem = table.appendChild(tr);
        for(let i = 0; i < appendedItem.length; i++) {
          appendedItem[i];
          } 
        addItem.value = '';
     }
 };

 btn.addEventListener('click', () => {
    let table = document.querySelector('th');
    // let table = document.querySelector('.types');
    let tr = document.createElement('tr');
    tr.textContent = addItem.value;
    let appendedItem = table.appendChild(tr);
    for(let i = 0; i < appendedItem.length; i++) {
      appendedItem[i];
      } 
    addItem.value = '';
  });


      function Item(item, markAsBuyedButton) {
        this.item = item;
        this.markAsBuyedButton = markAsBuyedButton;
      }

      let addNewItems = document.getElementById('addItem');
      let markAsBuyedButton = createNewButton();

      let newItem = new Item(item, markAsBuyedButton);
      let newItems = document.getElementById('items');

      const output = `<tr>
      <td>${item.item}</td>
      <td><button>Mark as buyed</button></td>
  </tr>`
  newItems.innerHTML = newItems.innerHTML + output;

  function createNewButton() {
    var btn = document.createElement('button');
    btn.value = "Mark as Buyed";
    return btn;
  }
    





  
  

