const router = require("express").Router();
const User = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { email, name, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt
    .hash(password, salt)
    .catch((err) => console.log(err));

  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  try {
    const newUser = await User.create({
      email,
      name,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newUser._id }, "secret key");
    // res.header("Authorization", token);
    console.log(newUser);
    console.log(token);
    res.status(200).json({ newUser, token });
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

module.exports = router;
