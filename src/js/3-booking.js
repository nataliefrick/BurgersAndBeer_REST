// Bookings ---------------------------
function getBookings() {
    fetch(urlBookings)
    .then(response => {
        if(response.status != 200) {
            console.log("status!200")
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
    console.log(bookings);

    // Separate out bookings for today
    var today = new Date();// Get today's date
    console.log(today);

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

