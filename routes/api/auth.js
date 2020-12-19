const router = require("express").Router();
const User = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  try {
    const foundUser = await User.findOne({ email: req.body.email });
    if (!foundUser) {
      return res.json("User not found");
    }

    const validatePassword = await bcrypt.compare(
      req.body.password,
      foundUser.password
    );

    if (!validatePassword) {
      return res.json({ error: "Password do not match please try again" });
    }
    const token = jwt.sign({ id: foundUser._id }, "secret key");
    res.status(200).json({ user: foundUser, token: token });
    console.log(foundUser, token);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
});

module.exports = router;
