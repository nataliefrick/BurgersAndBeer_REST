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
        <select id="img" name="img">
            <?php echo $thelist; ?>
        </select>
        
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

// Bookings ---------------------------
function getBookings() {
    fetch(urlBookings)
    .then(response => {
        if(response.status != 200) {
            // console.log("status!200")
            return
        }
        return response.json()
        // .then(data => console.log(response))
        .then(data => writeBookings(data))
        .catch(err => console.log(err))
    })
}

// write out bookings to webpage
function writeBookings(bookings) {
    // console.log(bookings);

// Separate out bookings for today, tomorrow, overmorrow and later

    // get dates
    let idag = new Date();// Get today's date
    let imorgon= new Date(idag);
    let iovermorgon= new Date(idag);

    imorgon.setDate(imorgon.getDate() + 1);
    iovermorgon.setDate(iovermorgon.getDate() + 2);

    // convert dates to usable format yyyy-mm-dd
    idag = idag.getFullYear() + '-' + String(idag.getMonth() + 1).padStart(2, '0') + '-' + String(idag.getDate()).padStart(2, '0');
    imorgon= imorgon.getFullYear() + '-' + String(imorgon.getMonth() + 1).padStart(2, '0') + '-' + String(imorgon.getDate()).padStart(2, '0');
    iovermorgon= iovermorgon.getFullYear() + '-' + String(iovermorgon.getMonth() + 1).padStart(2, '0') + '-' + String(iovermorgon.getDate()).padStart(2, '0');

    // const dd = String(today.getDate()).padStart(2, '0');
    // const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    // const yyyy = today.getFullYear();
    // today = yyyy + '-' + mm + '-' + dd;

// PRINT OUT todays bookings------------------------------
    // get nr bookings for today
    let todays_count = 0;
    bookings.forEach(booking =>  {
        if(booking.dateOfBooking == idag){
            todays_count++;
        }})
    const todayEl = document.getElementById("bookings-list-today");
    if (todayEl !== null) {
        todayEl.innerHTML = "";
        if(todays_count>0){
            todayEl.innerHTML += `
            <thead>
                <tr>
                    <th class="centered">Id</th>
                    <th class="centered">Datum</th>
                    <th class="centered">Tid</th>
                    <th class="centered desc">Antal P</th>
                    <th class="centered">Namn</th>
                    <th class="centered">Telefon</th>
                    <th class="centered">Epost</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>`;           

            bookings.forEach(booking =>  { if(booking.dateOfBooking == idag){
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
                }

                todayEl.innerHTML += `</tbody>`;
            })
        } else {
            todayEl.innerHTML += `<p>Inga bokningar för idag (${idag})</p>`
        }
    }

// PRINT OUT tomorrows bookings------------------------------
    // get nr bookings
    let tomorrows_count = 0;

    bookings.forEach(booking =>  {
        if(booking.dateOfBooking == imorgon){
            tomorrows_count++;
        }})
    const tomorrowEl = document.getElementById("bookings-list-tomorrow");
    if (tomorrowEl !== null) {
        tomorrowEl.innerHTML = "";
        if(tomorrows_count>0){
            tomorrowEl.innerHTML += `
            <thead>
                <tr>
                    <th class="centered">Id</th>
                    <th class="centered">Datum</th>
                    <th class="centered">Tid</th>
                    <th class="centered desc">Antal P</th>
                    <th class="centered">Namn</th>
                    <th class="centered">Telefon</th>
                    <th class="centered">Epost</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>`; 

            bookings.forEach(booking =>  { if(booking.dateOfBooking == imorgon){
                tomorrowEl.innerHTML +=
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
                }
                tomorrowEl.innerHTML += `</tbody>`;
            })
        } else {
            tomorrowEl.innerHTML += `<p>Inga bokningar än (${imorgon})</p>`
        }
    }

// PRINT OUT the day after tomorrows bookings------------------------------
    // get nr bookings
    let third_count = 0;

    bookings.forEach(booking =>  {
        if(booking.dateOfBooking == iovermorgon){
            third_count++;
        }})
    const thirdEl = document.getElementById("bookings-list-third");
    if (thirdEl !== null) {
        thirdEl.innerHTML = "";
        if(third_count>0){
            thirdEl.innerHTML += `
            <thead>
                <tr>
                    <th class="centered">Id</th>
                    <th class="centered">Datum</th>
                    <th class="centered">Tid</th>
                    <th class="centered desc">Antal P</th>
                    <th class="centered">Namn</th>
                    <th class="centered">Telefon</th>
                    <th class="centered">Epost</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>`; 
            bookings.forEach(booking =>  { if(booking.dateOfBooking == iovermorgon){
                thirdEl.innerHTML +=
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
                }
                thirdEl.innerHTML += `</tbody>`;
            })
        } else {
            thirdEl.innerHTML += `<p>Inga bokningar än (${iovermorgon}).</p>`
        }
    }

    
// PRINT OUT all other bookings------------------------------
    // get nr bookings
    let senare_count = 0;

    bookings.forEach(booking =>  {
        if(booking.dateOfBooking > iovermorgon){
            senare_count++;
        }})
    const senareEl = document.getElementById("bookings-list-later");
    if (senareEl !== null) {
        senareEl.innerHTML = "";
        if(senare_count>0){
            senareEl.innerHTML += `
            <thead>
                <tr>
                    <th class="centered">Id</th>
                    <th class="centered">Datum</th>
                    <th class="centered">Tid</th>
                    <th class="centered desc">Antal P</th>
                    <th class="centered">Namn</th>
                    <th class="centered">Telefon</th>
                    <th class="centered">Epost</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>`; 
            bookings.forEach(booking =>  { if(booking.dateOfBooking > iovermorgon){
                senareEl.innerHTML +=
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
                }
                senareEl.innerHTML += `</tbody>`;
            })
        } else {
            senareEl.innerHTML += `<p class="centered"p>Inga senare bokningar än</p>`
        }
    }
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


/* Hamburger Menu -----------------------*/
/* Open when someone clicks on the span element */
function openNav() {
    document.getElementById("myNav").style.width = "50%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}