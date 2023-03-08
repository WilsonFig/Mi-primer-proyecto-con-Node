const express = require("express");
const router = express.Router();
const customHeader = require ("../middleware/customHeader");
const { validatorCreateItem, validatorGetItem } = require("../validators/tracks");
const { getItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/tracks");


/** 
 * Lista los items
*/
router.get("/",  getItems);
/**
 * Obtener detalle de items
 */
router.get("/:id", validatorGetItem, getItem);
/**
 * Crear un registro
 */
router.post("/", validatorCreateItem, createItem);
/**
 * Actualizar un registro
 */
router.put("/:id", validatorGetItem, validatorCreateItem, updateItem);
/**
 * 
 */
router.delete("/:id", validatorCreateItem, deleteItem);

module.exports= router;