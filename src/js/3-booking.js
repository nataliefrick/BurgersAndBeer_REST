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
            })
        } else {
            todayEl.innerHTML += `<tr class="item"><td class="centered" colspan="8">Inga bokningar för idag (${idag})</td></tr>`
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
            })
        } else {
            tomorrowEl.innerHTML += `<tr class="item"><td class="centered" colspan="8">Inga bokningar än (${imorgon})</td></tr>`
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
            })
        } else {
            thirdEl.innerHTML += `<tr class="item"><td class="centered" colspan="8">Inga bokningar än (${iovermorgon}).</td></tr>`
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
            })
        } else {
            senareEl.innerHTML += `<tr class="item"><td class="centered" colspan="8">Inga senare bokningar än</td></tr>`
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

