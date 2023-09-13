# Burgers&Beer REST webservice

This project is the course evaulation project for DT173G Web Developement III: JavaScript, Node.js and Gulp.

The project for this course was to build a public website for a restaurant. Along with that restaurant website there needed to be a way for the owners to update the menu options and see bookings without the need for code. A simple CMS platform was built with the use of REST API as a way to communicate to the database from a password protected dashboard to create, update, and delete data in the dashboard. 

Both the public website and the administrative dashboard fetch data from the databoard via an app which talks to the database.  This “middle-man” increases effectiveness and accessibility of the database and CMS system meaning that more elements can access the same information in the form of for example a website, administration page or an app for smartphones.

This is the repo for the administrative back-end site. The owners can log into a dashboard to update the database with new menu alternatives, or update existing. In the dashboard they can also see the bookings, which are split up for today, tomorrow, overmorrow and later for easy planning. Bookings can only be created (through the public website) or deleted (through the dashboard).

The code for the client admin dashboard can be found in the BurgersAndBeer_client repo.
