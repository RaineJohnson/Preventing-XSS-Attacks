This project demonstrates proper ways to code a web application that prevent it from being susceptible to Cross Site Scripting Attacks. 

The app.js file lays the basic groundwork for importing security express modules such as helmet and express validator, as well as handling the logic of the website by creating cookies and validating and sanitizing user input. 

The home.ejs file handles all of the basic HTML setup that allows the website to function, ensuring that user input is done through HTML tags, rather than through document.write, which would have exposed a DOM-Based XSS vulnerability.
