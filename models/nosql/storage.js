const mongoose = requiere("mongoose")

const StorageScheme = new mongoose.Shema(
  {
      url:{
        type: String
      },
      filename:{
          type: Number
      },
  },
  {
    timestamps:true, //CreatedAd, updatedAt
    versionKey: false,
  }
)

//Exporta la conceccion con el esquema cuyo nombre corresponde a users
//una coleccion es lo mismo que una tabla sql 
module.exports = mongoose.model("storage", StorageScheme);