const { matchedData } = require("express-validator");
const { tracksModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
/**
 *Obtener lista de la base de datos!
 * @param {*} req
 * @param {*} res
 */
 const getItems = async (req, res) => { // se define una función asíncrona llamada getItems que acepta dos parámetros: req y res.
   try { // se inicia un bloque de código try que intentará ejecutar una o más instrucciones.
       const data = await tracksModel.find({}); // se define una constante llamada data que se inicializa con el resultado de la función find() del modelo tracksModel. La función devuelve todos los documentos de la colección correspondiente al modelo.
       res.send({ data }); // se envía una respuesta HTTP con un objeto JSON que contiene una propiedad data que tiene como valor el objeto creado.
   } catch (e) { // si se produce un error durante la ejecución del bloque try, el control pasa a un bloque catch que manejará el error.
       handleHttpError(res, "ERROR_GET_ITEMS"); // se llama a la función handleHttpError con dos parámetros: el objeto res y una cadena de texto que representa un código de error.
   }
};



/**
 *Obtener un detalle!
 * @param {*} req
 * @param {*} res
 */
const getItem = async (req, res) => {
   try{
      req = matchedData(req);
      const {id} = req;
      const data = await tracksModel.findById(id);
      res.send({data});
   }catch(e){
      handleHttpError(res,"ERROR_GET_ITEM")
   }
};   
/**
 *insertar un registro!
 * @param {*} req
 * @param {*} res
 */
const createItem = async (req, res) => {
    try{
        const body = matchedData(req)
        const data = await tracksModel.create(body);
        res.send({data});
     } catch (e) {
        handleHttpError(res, "ERROR_CREATE_ITEMS");
     }
};

/**
 *Actualizar un registro!
 * @param {*} req
 * @param {*} res
 */
const updateItem = async (req, res) => {
   try{
      const {id, ...body} = matchedData(req);
      const data = await tracksModel.findOneAndUpdate(
         id, body
      );
      res.send({data});
   } catch (e) {
      handleHttpError(res, "ERROR_UPDATE_ITEM");
   }
};
/**
 *Eliminar un registro!
 * @param {*} req
 * @param {*} res
 */
const deleteItem = async (req, res) => {
   try{
      req = matchedData(req);
      const {id} = req;
      const data = await tracksModel.delete({_id:id});
      res.send({data});
   }catch(e){
      console.log(e)
      handleHttpError(res,"ERROR_DELETE_ITEM")
   } 
}

module.exports = {getItems,getItem, createItem, updateItem, deleteItem}