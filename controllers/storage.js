const fs = require("fs")
const { matchedData } = require("express-validator");
const { storageModel } = require("../models");
const {handleHttpError} = require("../utils/handleError")

const PUBLIC_URL = process.env.PUBLIC_URL;
const MEIDA_PATH = `${__dirname}/../storage`;

/**
 *Obtener base de la lista de datos!
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req, res) => {   //Se define una función asíncrona llamada getItems que acepta dos parámetros, req y res, que representan la solicitud y la respuesta HTTP respectivamente.
    try{                                 //Se inicia un bloque de código try que intentará ejecutar una o más instrucciones.
        const data = await storageModel.find({}); //Se define una constante llamada data que se inicializa con el resultado de la función find() del modelo storageModel. La función find() busca en la base de datos todos los documentos que coinciden con un criterio de consulta vacío, lo que significa que devolverá todos los documentos en la colección.
        res.send({data})                //Se envía una respuesta HTTP con un objeto JSON que contiene una propiedad data que tiene como valor el resultado de la consulta storageModel.find().
    }catch(e){                          //Si se produce un error durante la ejecución del bloque try, el control pasa a un bloque catch que manejará el error.
        handleHttpError(res,"ERROR_lIST_ITEM") //La función handleHttpError se llama con dos parámetros: el objeto res y una cadena de texto que representa un código de error.
    }
};
/**
 *Obtener un detalle!
 * @param {*} req
 * @param {*} res
 */
 const getItem = async (req, res) => { // se define una función asíncrona llamada getItem que acepta dos parámetros: req y res.
    try { // se inicia un bloque de código try que intentará ejecutar una o más instrucciones.
        const {id} = matchedData(req); // se define una constante llamada id que se inicializa con el valor de la propiedad id del objeto retornado por la función matchedData().
        const data = await storageModel.findById(id); // se define una constante llamada data que se inicializa con el resultado de la función findById() del modelo storageModel. La función busca en la base de datos un documento con el id especificado en la constante id.
        res.send({ data }); // se envía una respuesta HTTP con un objeto JSON que contiene una propiedad data que tiene como valor el documento encontrado.
    } catch (e) { // si se produce un error durante la ejecución del bloque try, el control pasa a un bloque catch que manejará el error.
        handleHttpError(res, "ERROR_DETAIL_ITEM"); // se llama a la función handleHttpError con dos parámetros: el objeto res y una cadena de texto que representa un código de error.
    }
};

/**
 *insertar un registro!
 * @param {*} req
 * @param {*} res
 */
 const createItem = async (req, res) => { // se define una función asíncrona llamada createItem que acepta dos parámetros: req y res.
    try { // se inicia un bloque de código try que intentará ejecutar una o más instrucciones.
        const { file } = req; // se define una constante llamada file que se inicializa con el objeto file de la solicitud req.
        const fileData = { // se define una constante llamada fileData que contiene un objeto con dos propiedades: filename y url.
            filename: file.filename,
            url: `${PUBLIC_URL}/${file.filename}`,
        }
        const data = await storageModel.create(fileData); // se define una constante llamada data que se inicializa con el resultado de la función create() del modelo storageModel. La función crea un nuevo documento en la base de datos con los datos de fileData.
        res.send({ data }); // se envía una respuesta HTTP con un objeto JSON que contiene una propiedad data que tiene como valor el documento creado.
    } catch (e) { // si se produce un error durante la ejecución del bloque try, el control pasa a un bloque catch que manejará el error.
        handleHttpError(res, "ERROR_CREATE_ITEM"); // se llama a la función handleHttpError con dos parámetros: el objeto res y una cadena de texto que representa un código de error.
    }
    const { file } = req; // se define una constante llamada file que se inicializa con el objeto file de la solicitud req.
    const fileData = { // se define una constante llamada fileData que contiene un objeto con dos propiedades: filename y url.
        filename: file.filename,
        url: `${PUBLIC_URL}/${file.filename}`,
    }
    const data = await storageModel.create(fileData); // se define una constante llamada data que se inicializa con el resultado de la función create() del modelo storageModel. La función crea un nuevo documento en la base de datos con los datos de fileData.
    res.send({ data }); // se envía una respuesta HTTP con un objeto JSON que contiene una propiedad data que tiene como valor el documento creado.
};

/**
 *Actualizar un registro!
 * @param {*} req
 * @param {*} res
 */
const updateItem = async (req, res) => {}
/**
 *Eliminar un registro!
 * @param {*} req
 * @param {*} res
 */
 const deleteItem = async (req, res) => { // se define una función asíncrona llamada deleteItem que acepta dos parámetros: req y res.
    try { // se inicia un bloque de código try que intentará ejecutar una o más instrucciones.
        const { id } = matchedData(req); // se define una constante llamada id que se inicializa con el ID del objeto proporcionado en la solicitud req.
        const dataFile = await storageModel.findById(id); // se define una constante llamada dataFile que se inicializa con el resultado de la función findById() del modelo storageModel. La función devuelve un objeto con los datos del documento correspondiente al ID proporcionado.
        await storageModel.delete({ __id: id }); // se elimina el documento correspondiente al ID proporcionado utilizando la función delete() del modelo storageModel.
        const { filename } = dataFile; // se define una constante llamada filename que se inicializa con el nombre del archivo correspondiente al documento eliminado.
        const filePath = `${MEIDA_PATH}/${filename}`; // se define una constante llamada filePath que contiene la ruta completa del archivo en el servidor.
        const data = { // se define una constante llamada data que contiene un objeto con dos propiedades: filePath y delete.
            filePath,
            delete: 1
        }
        res.send({ data }); // se envía una respuesta HTTP con un objeto JSON que contiene una propiedad data que tiene como valor el objeto creado.
    } catch (e) { // si se produce un error durante la ejecución del bloque try, el control pasa a un bloque catch que manejará el error.
        handleHttpError(res, "ERROR_DETAIL_ITEM"); // se llama a la función handleHttpError con dos parámetros: el objeto res y una cadena de texto que representa un código de error.
    }
}


module.exports = {getItems,getItem, createItem, updateItem, deleteItem}