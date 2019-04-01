
const mongoose = require("mongoose");
const Centers = require("../models/Centers");
const axios = require("axios");

mongoose
.connect('mongodb://localhost/server', {CenterNewUrlParser: true})
.then(x => {
  console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  return Center.deleteMany()
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
        .then(centers => {
            //console.log("eooooooo")
            //aqui/// haremos el objetos con las propiedades que queremos que 
            //tenga para pintarlo despues en el mapa
            
            const newCenter = {
              location: {
                cordinates:[
                  longitude,
                  latitude
                ]
                
              }
              
              
            };
            
           
            
            Centers.deleteMany()
            .then(() => {
                  
              //dentro de create /newCenter/
              //Center.create(newCenter)
              return console.log("eooooooooo")
            })
            .then(centersCreated => {
             
              console.log(`${centersCreated.length} users created with the following id:`);
              console.log(centersCreated.map(u => u._id));
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
 
        

   
        
        