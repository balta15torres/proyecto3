
const mongoose = require("mongoose");
const Centro = require("../models/Centro");
const axios = require("axios");

mongoose
.connect('mongodb://localhost/server', {centroNewUrlParser: true})
.then(x => {
  console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  return Centro.deleteMany()
})
.catch(err => {
  console.error('Error connecting to mongo', err)
});

    axios.get("https://datos.madrid.es/egob/catalogo/200186-0-polideportivos.json?distrito_nombre=CHAMARTIN")
    .then(response => {
        //console.log(response.data['@graph']);
         const ids = [];

         //ids.push(response.data['@graph'])

         response.data['@graph'].forEach((e)=>{
            ids.push(e['@id'])
         })
         
        const axiosArray = [];
            console.log(ids);
           for(i=0;i<ids.length;i++){
               let id = ids[i]
           
            axiosArray.push(axios.get(id)
            .then(response => {
                // this.ids = response.data
                return response.data["@graph"][0]
            }))
        }
        Promise.all(axiosArray)
        .then(centros => {
            console.log(centros)
            //aqui//
            
          
        
            Centro.deleteMany()
            .then(() => {
              return Centro.create(centros)
            })
            .then(centrosCreated => {
              console.log(`${centrosCreated.length} users created with the following id:`);
              console.log(centrosCreated.map(u => u._id));
            })
            .then(() => {
              // Close properly the connection to Mongoose
              mongoose.disconnect()
            })
            .catch(err => {
              mongoose.disconnect()
              throw err
            })
        })
        })
 
        

   
        
        