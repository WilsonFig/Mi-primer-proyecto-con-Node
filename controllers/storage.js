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
const getItems = async (req, res) => {
    try{
        const data = await storageModel.find({});
        res.send({data})
    }catch(e){
        handleHttpError(res,"ERROR_lIST_ITEM")
    }
};
/**
 *Obtener un detalle!
 * @param {*} req
 * @param {*} res
 */
const getItem = async (req, res) => {
    try{
        const {id} = matchedData(req)
        const data = await storageModel.findById(id);
        res.send({ data });
    }catch(e){
        handleHttpError(res,"ERROR_DETAIL_ITEM");
    }
};
/**
 *insertar un registro!
 * @param {*} req
 * @param {*} res
 */
const createItem = async (req, res) => {
    try{
    const { file } = req;
    const fileData = {
        filename: file.filename,
        url:`${PUBLIC_URL}/${file.filename}`,
    }
    const data = await storageModel.create(fileData);
    res.send({data});
    }catch(e){
        handleHttpError(res,"ERROR_CREATE_ITEM");   
    }



    const { file } = req;
    const fileData = {
        filename: file.filename,
        url:`${PUBLIC_URL}/${file.filename}`,
    }
    const data = await storageModel.create(fileData);
    res.send({data});
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
const deleteItem = async (req, res) => {
    try{
        const {id} = matchedData(req)
        const dataFile = await storageModel.findById(id);
        await storageModel.delete({__id:id})
        const {filename} = dataFile;
        const filePath = `${MEIDA_PATH}/${filename}`//TODO c:/xxxxx/file-12223443.png  



        //fs.unlinkSync(filePath);
        const data = {
            filePath,
            delete:1
        }

        res.send({ data });
    }catch(e){
        handleHttpError(res,"ERROR_DETAIL_ITEM");
    }   
}

module.exports = {getItems,getItem, createItem, updateItem, deleteItem}