const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")
const StorageScheme = new mongoose.Schema(
  {
      url:{
        type: String
      },
      filename:{
          type: String
      },
  },
  {
    timestamps:true, //CreatedAd, updatedAt
    versionKey: false,
  }
)

//Exporta la conceccion con el esquema cuyo nombre corresponde a users
//una coleccion es lo mismo que una tabla sql 
StorageScheme.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("storage", StorageScheme);