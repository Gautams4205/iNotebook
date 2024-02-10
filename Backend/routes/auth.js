const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = "Thisshouldbehiddeninenvvariable";
const { body, validationResult } = require("express-validator");
const User = require("../models/Users");
const fetchuser = require("../middleware/fetchuser");

//Route:1 :- Create a user using :- POST "/api/auth/createuser". Doesn't require Authentication.
router.post(
  "/createuser",
  [
    // Checking user has provided real credentials.
    body("name").isLength({ min: 4 }),
    body("email", "Enter a valid email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const result = validationResult(req);
    let success = false;
    if (result.isEmpty()) {
      try {
        // Check weather a user with same email is exit in DB.
        let user = await User.findOne({ email: req.body.email });
        //If user alredy exit in DB.
        if (user) {
          return res
            .status(400)
            .json({
              success,
              error:
                "This email already exit. Please enter other email to create New user.",
            });
        }
        //If user not exit in DB.
        //1:-
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        //2:-Create a new user and hash the password then add it to DB.
        user = new User({ ...req.body, password: hashPassword });
        const data = { user: { id: user._id } };
        user.save().then(() => {
          console.log("New user's details are saved in DB.");
          // Authentication token genrate.
          const authtoken = jwt.sign(data, JWT_SECRET);
          success = true;
          res.json({ success, authtoken });
        });
        //   .catch((err) => {
        //     console.log("Database Error");
        //     res.status(400).send(err.message);
        //   });
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ success, error: "Internal server error." });
      }
    } else {
      //Showing eroor in user's credentials enter in request body.
      res.status(400).json({ success,error: result.array() });
    }
  }
);
//Route:2 :- Login using :- POST "/api/auth/login". Doesn't require Authentication
router.post(
  "/login",
  [
    // Checking user has provided real credentials.
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank.").notEmpty(),
  ],
  async (req, res) => {
    const result = validationResult(req);
    let success = false;

    if (!result.isEmpty()) {
      return res.status(400).json({ success, errors: result.array() });
    }
    const { email, password } = req.body;

    // Checking user's record in DB.
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success, error: "Please try with real email." });
    }
    const passwordcompare = await bcrypt.compare(password, user.password);
    if (!passwordcompare) {
      return res
        .status(400)
        .json({ success, error: "Please enter the right password " });
    }
    try {
      const data = { user: { id: user._id } };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ success, error: "Internal server error." });
    }
  }
);
//Route:3:- Login using :- POST "/api/auth/getuser". Require Authentication.
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const _id = req.user.id;
    const user = await User.findOne({ _id }).select("-password");
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error.");
  }
});
module.exports = router;
