const express = require("express");
const router = express.Router();
const controller = require("../controllers/block.controller");

router.get("/:number", controller.fetchBlock);
router.post("/:number", controller.fetchAndSaveBlock);
router.get("/", controller.fetchAllBlocks);
module.exports = router;
