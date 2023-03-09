const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")
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
          select:false 
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
UsersScheme.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("users", UsersScheme);