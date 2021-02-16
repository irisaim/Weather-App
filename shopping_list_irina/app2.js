    let addItem = document.querySelector('#addItem');
    let items = document.getElementById('items');
    let btn = document.getElementById('btn');
    let tableBody = document.querySelector('#content');
    let statusBtn = document.querySelector('#content');

    addItem.addEventListener('keydown', (e) => {
        if(e.keyCode === 13) {
            addNewItemToTable();
        }
    });

    btn.addEventListener('click', () => {
        addNewItemToTable();
    });


    function Item(itemDescription) {
        this.itemDescription = itemDescription;
        this.markAsBuyedButton = '<button class="statusBtn">Mark as buyed</button>';
    }
    
  
    function createTableElement(item){
    
        return `
            <tr class="row">
                <td class="types">${item.itemDescription}</td>
                <td class="types">${item.markAsBuyedButton}</td>
            </tr>
        `
    }
    
    let addItemError = document.getElementById('addItemError');
    function addNewItemToTable(){ 
        let tableBody = document.querySelector('#content');
        let description = document.querySelector('#addItem').value;
        let newItem = new Item(description); 
        if(addItem.value === '') {
            var alert = document.getElementById('addItemError').style.display = 'block';
        setTimeout(function(){
        document.getElementById("addItemError").innerHTML="";
        }, 2000);
      } else {
        tableBody.innerHTML += createTableElement(newItem);  
    }
    document.getElementById("addItem").value = "";
    }

        let content = document.querySelector('#content');
        let markAsBuyedButton =  statusBtn.className;  

    tableBody.addEventListener('click', markTheItem);
    function markTheItem(e) {
        if(e.target.classList.contains("statusBtn")) {
                let listItem = e.target.parentNode.previousElementSibling;
                    listItem.classList.toggle('lineThrough');
            }
            console.log(markTheItem);
        }
    