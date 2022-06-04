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
