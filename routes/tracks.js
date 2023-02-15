const express = require("express");
const router = express.Router();
const { getItems } = require("../controllers/tracks")
const { getItem } = require("../controllers/tracks")
const { createItem } = require("../controllers/tracks")

router.get("/",getItems) 

router.get("/",getItem) 
router.post("/",createItem) 





module.exports= router