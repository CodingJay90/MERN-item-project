const router = require("express").Router();
const auth = require("../../middleware/auth");
const Item = require("../../models/item");

router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});

router.post("/", auth, (req, res) => {
  Item.create(req.body)
    .then((item) => res.json(item))
    .catch((err) => console.log(err));
});

router.delete("/:id", auth, (req, res) => {
  Item.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
