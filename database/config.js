const mongoose = require('mongoose');



const dbConnection = async() => {
    const conector = process.env.MONGODB_CNN

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
