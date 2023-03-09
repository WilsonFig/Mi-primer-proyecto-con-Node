
const mongoose = require("mongoose");
// Definimos una función llamada dbConnect
const dbConnect = () => {
   // Obtenemos la URL de conexión a la base de datos de MongoDB desde una variable de entorno llamada DB_URI
   const DB_URI = process.env.DB_URI;
   // Desactivamos el modo estricto de consulta de Mongoose
   mongoose.set('strictQuery', false);
   // Llamamos a la función connect de Mongoose para establecer la conexión a la base de datos
   mongoose.connect(
     // Pasamos la URL de conexión a la base de datos
     DB_URI,
     // Pasamos un objeto con opciones para evitar advertencias de deprecación
     {
       useNewUrlParser: true,
       useUnifiedTopology: true,
     },
     // Pasamos un callback que se ejecutará después de que se establezca la conexión
     (err, res) => {
       // Si no hay errores en la conexión, imprimimos un mensaje de éxito en la consola
       if (!err) {
         console.log('**** CONEXION CORRECTA *****');
       } else {
         // Si hay errores en la conexión, imprimimos un mensaje de error en la consola
         console.log('**** ERROR DE CONEXION *****');
       }
     }
   );
 };
 
            


module.exports = dbConnect;