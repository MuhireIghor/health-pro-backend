const express = require("express");
const recordController = require("../controllers/record.controller")
const router = express.Router();
router.post("/register",recordController.registerRecord);
router.put("/update/:id",recordController.updateRecord);
router.get("/",recordController.retriveRecords);
router.get("/:id",recordController.retriveSingleRecord)
module.exports = router;