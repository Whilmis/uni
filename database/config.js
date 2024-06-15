const mongoose = require('mongoose');



const dbConnection = async() => {
    const conector = 'mongodb+srv://whiluni:96KwV0aVsiCrf78x@universidadcluster.aigecdl.mongodb.net/unidb'

    try {

        await mongoose.connect( conector);
    
        console.log('Base de datos online');

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }


}



module.exports = {
    dbConnection
}
