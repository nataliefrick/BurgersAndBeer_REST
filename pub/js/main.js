"use strict";

//let urlMenu = "http://localhost/173%20project/webservice/site-api.php";
let urlMenu = "https://nataliesalomons.com/miun/dt173g/project/webservice/site-api.php";
let urlBookings = "https://nataliesalomons.com/miun/dt173g/project/webservice/bookings.php";


// category: "lättöl"
// created: "2022-05-30 16:56:20"
// dagensLunch: ""
// id: "25"
// img: ""
// itemDesc: ""
// itemName: "Carlsberg"

window.onload = init;

function init() {
    // fetch data from database
    getMenu(); 
    getBookings();
}


// Bookings ---------------------------
function getBookings() {
    fetch(urlBookings)
    .then(response => {
        if(response.status != 200) {
            return
        }
        return response.json()
        //.then(data => console.log(data))
        .then(data => writeBookings(data))
        .catch(err => console.log(err))
    })
}

// created: "2022-06-11 14:04:24"
// dateOfBooking: "2022-06-07"
// email: "natalie.salomons@gmail.com"
// fullName: "Natalie Frick"
// id: "1"
// nrPeople: "2"
// telephone: "0730 12 34 56"
// timeOfBooking: "14:00"


// write out bookings to webpage
function writeBookings(bookings) {
    // console.log(bookings);

    // Separate out bookings for today
    var today = new Date();// Get today's date

    const todayEl = document.getElementById("bookings-list-today");
    // const laterEl = document.getElementById("bookings-list-later");
    if (todayEl !== null) {
        todayEl.innerHTML = "";
        bookings.forEach(booking =>  {
             todayEl.innerHTML +=
            `<tr class="item"><td class="centered">${booking.id}</td>
            <td class="centered" >${booking.dateOfBooking}</td>
            <td class="centered" >${booking.timeOfBooking}</td>
            <td class="centered" >${booking.nrPeople}</td>
            <td class="centered">${booking.fullName}</td>
            <td class="centered" >${booking.telephone}</td>
            <td class="centered" >${booking.email}</td>
            <td class="centered">
           
            </td></tr>`
        });
    }

}
//<span id="editBtn" onClick="showModal('${booking.id}')">Redigera</span><br><span id="deleteBtn" onClick="deleteItem('${booking.id}')">Radera</span>
// const submitBtn = document.getElementById("submit");
// submitBtn.addEventListener("click", addItem);


// MENU ---------------------------
function getMenu() {
    fetch(urlMenu)
    .then(response => {
        if(response.status != 200) {
            return
        }
        return response.json()
        //.then(data => console.log(data))
        .then(data => writeMenus(data))
        .catch(err => console.log(err))
    })
}

// write burgers to webpage
function writeMenus(menu) {

    // write out options
    const menuAltEl = document.getElementById("menu-list");
    if (menuAltEl !== null) {
        menuAltEl.innerHTML = "";
        menu.forEach(option =>  {
             menuAltEl.innerHTML +=
            `<tr class="item"><td class="centered">${option.id}</td>
            <td class="centered" >${option.itemName}</td>
            <td class="centered" >${option.category}</td>
            <td class="desc" >${option.itemDesc}</td>
            <td class="centered">${option.img}</td>
            <td class="centered" >${option.dagensLunch}</td>
            <td class="centered">
            <span id="editBtn" onClick="showModal('${option.id}')">Redigera</span><br>
            <span id="deleteBtn" onClick="deleteItem('${option.id}')">Radera</span>
            </td></tr>`
            
        });
      }

}

const submitBtn = document.getElementById("submit-addnew");
submitBtn.addEventListener("click", addItem);

// Add a menu item
function addItem(event) {
    event.preventDefault(); // prevents default to reload page
    let name = nameInput.value;
    let desc = descInput.value;
    let category = categoryInput.value;
    let img = imgInput.value;

    let jsonStr = JSON.stringify({
        itemName : name,
        itemDesc : desc,
        category : category,
        img : img
    });

    fetch(urlMenu, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: jsonStr
    })

    .then(response => console.log(response))
    .then(response => response.json())
    .then(data => clearForm())
    .catch(err => console.log(err))
}

// clear the form
function clearForm() {
    nameInput = "";
    descInput = "";
    categoryInput = "";
    imgInput = "";
    
    getMenu();
}

// Delete an item
function deleteItem(id) {
    // let id = event.target.dataset.id;
    // console.log("delete item" + id);
    fetch(urlMenu + "?id=" + id, {
        method: "DELETE"
    })
    .then(response => response.json())
    .then(data => getMenu())
    .catch(err => console.log(err))
}

// MODAL-----------------------------------
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close-button");
const modalEl = document.getElementById("modal");

closeBtn.addEventListener("click", hideModal);

// hides modal on click of close btn
function hideModal(){
    modal.classList.toggle("show-modal");
}

// toggles popup with form to edit course
function showModal(id) {
    fetch(urlMenu + "?id=" + id, {
        method: "GET"
    })
    .then(response => response.json())
    .then(data => sendToForm(data)) // send data to form in modal
    .catch(err => console.log(err))
}

// prepares form with content
function sendToForm(data) {
 

    modalEl.innerHTML = `<div>
    <label for="id">ID:</label><br>
    <input type="text" name="code" id="id" value="${data.id}" readonly><br>
    </div><div>
    <label for="itemName">Namn:</label><br>
    <input type="text" name="itemName" id="itemName" value="${data.itemName}"><br>
    </div><div>
    <label for="itemDesc">Beskrivningen</label><br>
    <input type="text" name="itemDesc" id="itemDesc" value="${data.itemDesc}"><br>
    </div><div>
    <label for="category">Kategori:</label><br>
    <input type="text" name="category" id="category" value="${data.category}"><br>
    </div><div>
    <label for="img">Bild Filnamn:</label><br>
    <input type="text" name="img" id="img" value="${data.img}"><br>
    </div>
    <input class="btn" type="submit" id="saveBtn" value="Uppdatera"></input>`;

    modal.classList.toggle("show-modal");
    
    const saveBtn = document.querySelector("#saveBtn");
    saveBtn.addEventListener("click", saveChanges);
}

// Save changes to a menu item
function saveChanges() {
    
    const idModal = document.getElementById("id");
    const nameModal = document.getElementById("name");
    const descModal = document.getElementById("desc");
    const imgModal = document.getElementById("img");
    const categoryModal = document.getElementById("category");
    const dagensModal = document.getElementById("dagens");
    let id = idModal.value;
    let name = nameModal.value;
    let desc = descModal.value;
    let img = imgModal.value;
    let category = categoryModal.value;
    let dagens = dagensModal.value;

    let jsonStr = JSON.stringify({
        id : id,
        itemName : name,
        itemDesc : desc,
        img : img,
        category : category,
        dagensLunch : dagens
    });

    fetch(urlMenu, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: jsonStr
    })
    // .then(response => console.log(jsonStr))
    .then(response => response.json())
    .then(data => getMenu()) 
    .catch(err => console.log(err))

    
}





/* Hamburger Menu -----------------------*/
/* Open when someone clicks on the span element */
function openNav() {
    document.getElementById("myNav").style.width = "50%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}