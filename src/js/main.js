"use strict";

//let urlMenu = "http://localhost/173%20project/webservice/site-api.php";
let urlMenu = "https://nataliesalomons.com/miun/dt173g/project/webservice/site-api.php";
let urlBookings = "https://nataliesalomons.com/miun/dt173g/project/webservice/bookings-admin.php";

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
        // .then(data => console.log(data))
        .then(data => writeBookings(data))
        .catch(err => console.log(err))
    })
}

// write out bookings to webpage
function writeBookings(bookings) {
    // console.log(bookings);

    // Separate out bookings for today
    // var today = new Date();// Get today's date

    const todayEl = document.getElementById("bookings-list-today");
    // const laterEl = document.getElementById("bookings-list-later");
    if (todayEl !== null) {
        todayEl.innerHTML = "";
        bookings.forEach(booking =>  {
             todayEl.innerHTML +=
            `<tr class="item"><td id="${booking.id}" class="centered">${booking.id}</td>
            <td class="centered" id="date-${booking.id}">${booking.dateOfBooking}</td>
            <td class="centered" id="time-${booking.id}">${booking.timeOfBooking}</td>
            <td class="centered" id="nrP-${booking.id}">${booking.nrPeople}</td>
            <td class="centered" id="name-${booking.id}">${booking.fullName}</td>
            <td class="centered" id="tel-${booking.id}">${booking.telephone}</td>
            <td class="centered" id="email-${booking.id}">${booking.email}</td>
            <td class="centered">
            <span id="deleteBtn" onClick="deleteBooking('${booking.id}')">Radera</span>
            </td></tr>`
        });
    }

}

/* <span data-id=${booking.id} class="editBtn">Redigera</span>
            </td>
            <td class="centered">
            <span data-id=${booking.id} class="deleteBtn">Radera</span>
let updateBtn = document.getElementsByClassName("editBtn");
let deleteBtn = document.getElementsByClassName("deleteBtn");

for(let i = 0; i < deleteBtn.length; i++){
    deleteBtn[i].addEventListener("click", deleteBooking);
    updateBtn[i].addEventListener("click", updateBooking);
} */

// Add a menu item
function updateBooking(event) {
    event.preventDefault(); // prevents default to reload page
    id = event.target.dataset.id
    
    // document.getElementById("date-" + id).value; 
    // document.getElementById("time-" + id).value; 
    // document.getElementById("nrP-" + id).value; 
    // document.getElementById("name-" + id).value; 
    // document.getElementById("tel-" + id).value; 
    // document.getElementById("email-" + id).value;

    
    let newDate = document.getElementById("date-" + id).value;
    let newTime = document.getElementById("time-" + id).value; 
    let newNrP = document.getElementById("nrP-" + id).value; 
    let newName = document.getElementById("name-" + id).value; 
    let newTel = document.getElementById("tel-" + id).value; 
    let newEmail = document.getElementById("email-" + id).value;


    // console.log(newName + "<br>" + desc + "<br>" + dagens + "<br>" + category + "<br>" + img);

    let jsonStr = JSON.stringify({
        id : id,
        dateOfBooking : newDate,
        timeOfBooking : newTime,
        nrPeople : newNrP,
        fullName : newName,
        telephone : newTel,
        email: newEmail
    });

    // console.log(jsonStr);
    // console.log(urlMenu);

    fetch(urlMenu, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: jsonStr
    })

    .then(response => response.json())
    // .then(response => console.log(response))
    .then(event => getBookings())
    .catch(err => console.log(err))
}




// Delete an item
function deleteBooking(id) {
    // let id = event.target.dataset.id;
    // console.log("delete item" + id);
    fetch(urlBookings + "?id=" + id, {
        method: "DELETE"
    })
    .then(response => response.json())
    .then(data => getBookings())
    .catch(err => console.log(err))
}

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
let newNameEl = document.getElementById('nameInput');
let descEl = document.getElementById('descInput');
let categoryEl = document.getElementById('categoryInput');
let imgEl = document.getElementById('imgInput');
let responseEl = document.getElementById('response');

// Add a menu item
function addItem(event) {
    event.preventDefault(); // prevents default to reload page
    let newName = newNameEl.value;
    let desc = descEl.value;
    let category = categoryEl.value;
    let img = imgEl.value;
    let dagens = "";

    // console.log(newName + "<br>" + desc + "<br>" + dagens + "<br>" + category + "<br>" + img);

    let jsonStr = JSON.stringify({
        itemName : newName,
        itemDesc : desc,
        dagensLunch : dagens,
        category : category,
        img : img
    });

    // console.log(jsonStr);
    // console.log(urlMenu);

    fetch(urlMenu, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: jsonStr
    })

    .then(response => response.json())
    // .then(response => console.log(response))
    .then(event => refreshScreen())
    .catch(err => console.log(err))
}

// clear the form
function refreshScreen() {
    newNameEl.value = "";
    descEl.value = "";
    categoryEl.value = "";
    imgEl.value = "";

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
    let categories = ["burgare", "beer", "sides", "läsk", "lättöl", "efterrätt"];
    let dagensDagar = ["måndag", "tisdag", "onsdag", "torsdag", "fredag", "lördag"];
    let categoryDD = "";
    categories.forEach(category =>  {
        if (category == data.category) {
            categoryDD +=
            `<option value="${category}" selected="selected">${category}</option>`
        } else {
            categoryDD +=
            `<option value="${category}" >${category}</option>`
        }
    });

    let dagensDD = "";
    dagensDagar.forEach(dag =>  {
        if (dag == data.dagensLunch) {
            dagensDD +=
            `<option value="${dag}" selected="selected">${dag}</option>`
        } else {
            dagensDD +=
            `<option value="${dag}" >${dag}</option>`
        }
    });






    if(data.category == "burger") {
        modalEl.innerHTML = `<div>
        <label for="id">ID:</label><br>
        <input type="text" name="code" id="id" value="${data.id}" readonly><br>
        </div><div>
        <label for="itemName">Namn:</label><br>
        <input type="text" name="itemName" id="itemName" value="${data.itemName}"><br>
        </div><div>
        <label for="itemDesc">Beskrivningen</label>
        <input type="text" name="itemDesc" id="itemDesc" value="${data.itemDesc}"><br>
        </div><div class="dropdown">
        <label for="category">Kategori:</label>
        <select id="category" name="category">
            ${categoryDD}
        </select><br>
        </div><div>
        <label for="img">Bild Filnamn:</label><br>
        <input type="text" name="img" id="img" value="${data.img}"><br>
        </div><div class="dropdown">
        <label for="dagensLunch">Dagens Lunch:</label>
        <select id="dagensLunch" name="dagensLunch">
            ${dagensDD}
        </select><br>
        </div>
        <input class="btn" type="submit" id="saveBtn" value="Uppdatera"></input>`;
    } else {
        modalEl.innerHTML = `<div>
        <label for="id">ID:</label><br>
        <input type="text" name="code" id="id" value="${data.id}" readonly><br>
        </div><div>
        <label for="itemName">Namn:</label><br>
        <input type="text" name="itemName" id="itemName" value="${data.itemName}"><br>
        </div><div>
        <label for="itemDesc">Beskrivningen</label><br>
        <input type="text" name="itemDesc" id="itemDesc" value="${data.itemDesc}"><br>
        </div><div class="dropdown">
        <label for="category">Kategori:</label>
        <select id="category" name="category">
            ${categoryDD}
        </select><br>
        </div><div>
        <label for="img">Bild Filnamn:</label><br>
        <input type="text" name="img" id="img" value="${data.img}"><br>
        </div><div>
        <label for="dagensLunch">Dagens Lunch:</label><br>
        <input type="text" name="dagensLunch" id="dagensLunch" value="ej möjligt" readonly><br>
        </div>
        <input class="btn" type="submit" id="saveBtn" value="Uppdatera"></input>`;
    }
    modal.classList.toggle("show-modal");

    const saveBtn = document.querySelector("#saveBtn");
    saveBtn.addEventListener("click", saveChanges);
}

// Save changes to a menu item
function saveChanges() {

    const idModal = document.getElementById("id");
    // const nameModal = document.getElementById("name");// wrong name
    const nameModal = document.getElementById("itemName");// wrong name
    // const descModal = document.getElementById("desc");// wrong name
    const descModal = document.getElementById("itemDesc");// wrong name
    const imgModal = document.getElementById("img");
    const categoryModal = document.getElementById("category");
    const dagensModal = document.getElementById("dagensLunch"); // wrong name - add dagens to popup
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