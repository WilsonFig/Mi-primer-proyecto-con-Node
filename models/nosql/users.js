const mongoose = require("mongoose")

const UsersScheme = new mongoose.Schema(
  {
    name:{
        type: String
      },
      age:{
          type: Number
      },
      email:{
          type: String,
          unique: true,
      },
      password:{
          type: String,
      },
      artisit:{
        type: String,
    },
      role: {
          type: ["user", "admin"],
          default: "user",
      },
  },
  {
    timestamps:true, //CreatedAd, updatedAt
    versionKey: false,
  }
)

//Exporta la conceccion con el esquema cuyo nombre corresponde a users
//una coleccion es lo mismo que una tabla sql 
module.exports = mongoose.model("users", UsersScheme);