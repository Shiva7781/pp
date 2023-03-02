const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register
router.post("/register", async (req, res) => {
  let { name, email, profile, password } = req.body;

  try {
    if (!name || !email || !password || !profile) {
      return res.status(400).json({ message: "All fields required" });
    }

    const emailExist = await User.findOne({ email });
    if (emailExist)
      return res.status(403).json({ message: "Email already registered!" });

    // Creating a new mongoose doc with hashed password
    const newUser = new User({
      name,
      email,
      profile,
      password: bcrypt.hashSync(password, 11),
    });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// login
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  try {
    if (!user) return res.status(401).json({ message: "User does not exist" });

    // checking user password with hashed password stored in the database
    const validPassword = bcrypt.compareSync(req.body.password, user.password);
    // console.log(validPassword);

    if (!validPassword)
      return res.status(401).json({ message: "Wrong Email/Password" });

    const accessToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET_KEY
    );

    // sending JWT with user data except password
    const { password, ...others } = user._doc;
    res.status(200).json({ accessToken, ...others });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// verifytoken
router.get("/authorize", async (req, res) => {
  const authHeader = req.headers.usertoken;

  // console.log("authHeader:", authHeader);
  // console.log("authHeader:", req.headers);

  if (!authHeader) return res.status(403).json({ message: "Token not found" });

  try {
    const token = authHeader.split(" ")[1];
    // console.log('token:', token)

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    let userEmail = decoded.email;
    res.status(200).json({ userEmail });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
