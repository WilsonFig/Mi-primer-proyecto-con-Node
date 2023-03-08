 const express =require("express");
const router= express.Router();
const uploadMiddleware = require("../utils/handleStorage") ;
const {validatorGetItem} = require("../validators/storage")
const { getItems,  
        getItem, 
        updateItem, 
        deleteItem, 
        createItem 
    } = require("../controllers/storage");
//TODO http:// localhost:3000/storage

/**
 * Lista de Items
 */
router.get("/", getItems);
/**
 * Detalle de Item
 */
router.get("/:id", validatorGetItem, getItem);
/**
 * Eliminar Item
 */
router.delete("/:id",  validatorGetItem, deleteItem);
/**
 * Crear Item
 */
router.post("/", uploadMiddleware.single("myfile"), createItem);

module.exports= router;