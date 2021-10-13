const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require('../middlewares/fetchUser')
// We mostly store the secret tokens or api keys in env.local
const JWT_SECRET = "@12525";
//ROUTE 1: Create a user using POST "/api/auth/createuser". Doesn't require auth

router.post(
  "/createuser",
  // adding the checks
  [
    body("name", "Enter your valid name.").isLength({ min: 3 }),
    body("password", "Minimum password length is eight.").isLength({ min: 5 }),
    body("email", "Enter a unique and valid email").isEmail(),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // check whether the user exists already
    try {
      // adding the salt and hashing using bcryptjs for storing the passwords
      const salt = await bcrypt.genSalt(10);
      const secpass = await bcrypt.hash(req.body.password, salt);

      let user = await User.findOne({ email: req.body.email });
      // if user already exists then if is true
      if (user) {
        return res
          .status(400)
          .json({ email: "email with this user exists already" });
      }
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpass,
      });

      //implementing json web token (JWT)
      const data = {
        user: { id: user.id },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      console.log(authToken);

      //  .then(user => res.json(user)) type of returning the promises
      //  .catch(err=>{console.log(err)
      // res.json({email: "email cannot be duplicate."})
      // res.json(user)
      res.json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//ROUTE-2 Authenticate a user using POST with endpoint "/api/auth/login " No login required

router.post(
  "/login",
  [
    body("password", "Password fields should not be empty").exists(),
    body("email", "Enter a unique and valid email").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Destructuring the fields
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please enter the valid credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please enter the valid credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      console.log(authToken);
      res.json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

// ROUTE -3 Get logged in user details (decode user)using POST /api/auth/getUser: LOGIN REQUIRED




router.post(
  "/getuser",fetchuser,async (req, res) => {
try {
  //from middleware fetchuser 
  const userId = req.user.id;
  const user = await User.findById(userId).select("-password");
  res.send(user);
} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal server error");
}
  })
module.exports = router;
