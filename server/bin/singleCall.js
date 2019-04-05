require('dotenv').config();
const mongoose = require("mongoose");
const Center = require("../models/Centers");
const axios = require("axios");

mongoose
  .connect(process.env.DBURL, { CenterNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const distritos = ["ARGANZUELA","BARAJAS","CARABANCHEL","CENTRO","CHAMARTIN","CHAMBERI","CIUDAD LINEAL","FUENCARRAL-EL PARDO","HORTALEZA","LATINA","MONCLOA-ARAVACA","MORATALAZ","PUENTE DE VALLECAS","RETIRO","SALAMANCA","SAN BLAS-CANILLEJAS","TETUAN","USERA","VICALVARO","VILLA DE VALLECAS","VILLAVERDE"]

Promise.all(
  distritos.map(distrito => {
    
    return axios.get(`https://datos.madrid.es/egob/catalogo/200186-0-polideportivos.json?distrito_nombre=${distrito}`)
      .then(response => {
        //console.log(response.data['@graph']);
        const ids = [];

        //ids.push(response.data['@graph'])

        response.data['@graph'].forEach((e) => {
          ids.push(e['@id'])
        })

        const axiosArray = [];
        // console.log(ids);
        for (i = 0; i < ids.length; i++) {
          let id = ids[i]

          axiosArray.push(axios.get(id)
            .then(response => {
              // this.ids = response.data
              return response.data["@graph"][0]
            }))
        }
        return Promise.all(axiosArray)
          .then(centers => {
            // console.log(centers)

                centers = centers.map(center => {
                  center.distrito = distrito;
                  return center;
                })
                // console.log(centers)
              return Center.insertMany(centers)
              .then(centersCreated => {

                console.log(`${centersCreated.length} users created with the following id:`);
                console.log(centersCreated.map(u => u._id));
              })
          })
          .catch(console.log)
      })
  })
)
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect()
  })
  .catch(err => {
    mongoose.disconnect()
    throw err
  })





