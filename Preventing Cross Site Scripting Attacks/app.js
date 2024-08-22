const express = require("express");
const session = require("express-session");
// Added the helmet and express-validator packages to help with security headers and data validation and sanitization.
const helmet = require('helmet');
const { check } = require('express-validator');

const { validationResult } = require("express-validator");

const PORT = process.env.PORT || 4001;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set('trust proxy', 1)
//Adding helmet middleware allows security headers to be implemented
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set('trust proxy', 1)

app.use(
  session({
    secret: "my-secret",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 300000000, 
      sameSite: 'none',
      // Making sure to add secure and httpOnly for extra security!
      secure: true, // Ensures the cookie is only used over HTTPS
      httpOnly:true //Ensures the cookie is not accessible via Javascript

    },
  })
);

app.get("/", (req, res) => {
  res.render("home");
});

// Endpoint in development
app.post(
  "/review",
  [
    // Middleware to validate date and resturant information.
    check('email').isEmail(), check('resturant').notEmpty().blacklist('<>'), check('rating').isNumeric(), check('review').notEmpty().blacklist('<>')
  ],
  (req, res) => {
    var errors = validationResult(req).array();
    console.log(`Errors found: ${JSON.stringify(errors)}`);
    if (errors.length >= 1) {
      res.redirect("/error");
    } else {
      console.log("Data was valid!");
      res.redirect("/success");
    }
  }
);

app.get("/success", (req, res) => {
  res.render("success");
});

app.get("/error", (req, res) => {
  res.render("error");
});

app.listen(PORT, () =>
  console.log(`The server is listening at port: http://localhost:${PORT}`)
);
