
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let count = document.getElementById('count');
let category = document.getElementById('category');
let createBtn = document.getElementById('createBtn');
let total = document.getElementById('total');

let mod = 'create';
let temp;
let searchMod = 'title';
let search = document.getElementById("search");



//get total price
function getTotal(){
    if(price.value != ""){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#0d57a0';
    }
    else{
        total.innerHTML = ''
        total.style.background = '#a00d12';
    }
}

//creat ptoduct
let dataProduct;
if(localStorage.product != null){
    dataProduct = JSON.parse(localStorage.product);
}
else{
    dataProduct = [];
}

showInTable();

createBtn.onclick = function(){
    let newProduct = {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
    }

    if(title.value !="" && price.value != "" && category.value != "" && newProduct.count <= 100){
        if(mod === 'create'){
            if(newProduct.count > 1){
                for(let i = 0; i < newProduct.count; i++){
                    dataProduct.push(newProduct);
                }
            }
            else{
                dataProduct.push(newProduct);
            }
    }
        else{
            dataProduct[temp] = newProduct;
            mod = 'create';
            createBtn.innerHTML = "Create";
            count.style.display = 'block';
            clearData();
        }
    }

    localStorage.setItem('product', JSON.stringify(dataProduct));
    showInTable();
}

//clear inputs
function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    count.value = '';
    category.value = '';
    total.innerHTML = '';
}

//read in table
function showInTable(){
    
    let table = '';
    for(let i = 0; i < dataProduct.length; i++){
        table += `<tr>
                        <td>${i+1}</td>
                        <td>${dataProduct[i].title}</td>
                        <td>${dataProduct[i].price}</td>
                        <td>${dataProduct[i].taxes}</td>
                        <td>${dataProduct[i].ads}</td>
                        <td>${dataProduct[i].discount}</td>
                        <td>${dataProduct[i].total}</td>
                        <td>${dataProduct[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>`;
    }
    document.getElementById("tBody").innerHTML = table;

    let deleteBtn = document.getElementById("deleteAll");
    if(dataProduct.length > 0){
        deleteBtn.innerHTML = `<button onclick="deleteAll()">Delete All (${dataProduct.length})</button>`;
    }
    else{
        deleteBtn.innerHTML = '';
    }
    getTotal();
}


//delete item
function deleteData(item){
    dataProduct.splice(item,1);
    localStorage.product = JSON.stringify(dataProduct);
    showInTable();
}

//delete Alll
function deleteAll(){
    localStorage.clear();
    dataProduct.splice(0);
    showInTable();
}

//update
function updateData(item){
    title.value = dataProduct[item].title;
    price.value = dataProduct[item].price;
    taxes.value = dataProduct[item].taxes;
    ads.value = dataProduct[item].ads;
    category.value = dataProduct[item].category;
    discount.value = dataProduct[item].discount;
    getTotal();
    count.style.display = 'none';
    createBtn.innerHTML = 'Update';
    mod = 'Update';
    temp = item;
    scroll({
        top:0,
        behavior:"smooth",
    })
}

//search
function getSearchMod(id){
    if(id == 'searchTitle'){
        searchMod = 'title';
    }
    else{
        searchMod = 'category';
    }
    search.placeholder = 'search By ' + searchMod ;
    search.focus();
    search.value = '';
    showInTable();
}

function searchBy(value){
    table = '';
    for(let i = 0; i < dataProduct.length; i++){
    if(searchMod == 'title'){
            if(dataProduct[i].title.includes(value)){
                table += `<tr>
                        <td>${i+1}</td>
                        <td>${dataProduct[i].title}</td>
                        <td>${dataProduct[i].price}</td>
                        <td>${dataProduct[i].taxes}</td>
                        <td>${dataProduct[i].ads}</td>
                        <td>${dataProduct[i].discount}</td>
                        <td>${dataProduct[i].total}</td>
                        <td>${dataProduct[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>` 
            }
        
    }
    else{
            if(dataProduct[i].category.includes(value)){
                table += `<tr>
                        <td>${i+1}</td>
                        <td>${dataProduct[i].title}</td>
                        <td>${dataProduct[i].price}</td>
                        <td>${dataProduct[i].taxes}</td>
                        <td>${dataProduct[i].ads}</td>
                        <td>${dataProduct[i].discount}</td>
                        <td>${dataProduct[i].total}</td>
                        <td>${dataProduct[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>` 
            }
        
    }
    }
    document.getElementById("tBody").innerHTML = table;

}