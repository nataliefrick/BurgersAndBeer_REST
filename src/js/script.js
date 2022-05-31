"use strict";

let url = "http://localhost/173%20project/webservice/site-api.php";
//let url = "https://nataliesalomons.com/miun/dt173g/project/site-api.php";


// category: "lättöl"
// created: "2022-05-30 16:56:20"
// dagensLunch: ""
// id: "25"
// img: ""
// itemDesc: ""
// itemName: "Carlsberg"

window.onload = init;
document.getElementById("main").addEventListener("load", init);

function init() {
    // fetch data from database
    getMenu();
}


// MENU ---------------------------
function getMenu() {
    fetch(url)
    .then(response => {
        if(response.status != 200) {
            return
        }
        return response.json()
        // .then(data => console.log(data))
        .then(data => writeMenus(data))
        .catch(err => console.log(err))
    })
}


// write burgers to webpage
function writeMenus(menu) {

    // write out burger options
    const burgersEl = document.getElementById("burger-list");
    if (burgersEl !== null) {
        burgersEl.innerHTML = "";
        menu.forEach(burger =>  {
            if (burger.category == "burger") {
            burgersEl.innerHTML +=
            `<tr class="item"><td class="centered">${burger.id}</td>
            <td class="centered">${burger.itemName}</td>
            <td class="desc">${burger.itemDesc}</td>
            <td class="centered">${burger.img}</td>
            <td class="centered">${burger.dagensLunch}</td>
            <td scope="row" class="centered"><span id="editBtn" onClick="showModal('${burger.id}')">Edit</span></td>
            <td scope="row" class="centered"><span id="deleteBtn" onClick="deleteCourse('${burger.id}')">Delete</span></td>
            </tr>`
            }
        });
      }


    // write out beer options
    const beerEl = document.getElementById("beer-list");
    if (beerEl !== null) {
        beerEl.innerHTML = "";
        menu.forEach(beer =>  {
            if (beer.category == "beer") {
            beerEl.innerHTML +=
            `<tr class="item"><td class="centered">${beer.id}</td>
            <td class="centered">${beer.itemName}</td>
            <td class="desc">${beer.itemDesc}</td>
            <td class="centered">${beer.img}</td>
            <td scope="row" class="centered"><span id="editBtn" onClick="showModal('${beer.id}')">Edit</span></td>
            <td scope="row" class="centered"><span id="deleteBtn" onClick="deleteCourse('${beer.id}')">Delete</span></td>
            </tr>`
            }
        });
    }

    // write out sides options
    const optionsEl = document.getElementById("options-list");
    if (optionsEl !== null) {
        optionsEl.innerHTML = "";
        menu.forEach(options =>  {
            if (options.category == "sides" || options.category == "läsk" || options.category == "efterrätt" || options.category == "lättöl" ) {
            optionsEl.innerHTML +=
            `<tr class="item"><td class="centered">${options.id}</td>
            <td class="centered">${options.itemName}</td>
            <td class="centered">${options.category}</td>
            <td scope="row" class="centered"><span id="editBtn" onClick="showModal('${options.id}')">Edit</span></td>
            <td scope="row" class="centered"><span id="deleteBtn" onClick="deleteCourse('${options.id}')">Delete</span></td>
            </tr>`
            }
        });
    }
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