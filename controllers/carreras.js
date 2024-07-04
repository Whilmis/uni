const {response} = require('express');
const { Carrera, Materia  } = require('../models');



const obtenerCarreras = async(req, res = reponse) =>{
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, carreras ] = await Promise.all([
        Carrera.countDocuments(query),
        Carrera.find(query)
            .populate('usuario', 'nombre')
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        carreras
    });
}

const obtenerCarrera = async(req, res = reponse) =>{
   const {id} = req.params;
   const carrera = await Carrera.findById(id).populate('usuario','nombre')


    res.json(carrera);
}
   

const crearCarrera = async(req, res= response) =>{
    const nombre = req.body.nombre.toUpperCase();
    const codigo = req.body.codigo;
    const materia =  [ await Materia.find({ carrera :   `${nombre}`  })] ;
    const carreraDB = await Carrera.findOne({nombre});
    if(carreraDB){
        return res.status(400).json({
            msg:`La carrera ${carreraDB.nombre}, ya existe`
        })
    }
    

    const data = {
        nombre,
        usuario: req.usuario._id,
        codigo,
        materia,
     

    }

    const carrera = new Carrera(data);
     await carrera.save();
     res.status(201).json(carrera);
}


const actualizarCarrera = async(req, res = response) =>{
    const {id} = req.params;
    const {estado, usuario, ...data } = req.body;
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const carrera = await Carrera.findByIdAndUpdate(id, data, {new: true});
    res.json(carrera);

     
}

const borrarCarrera = async(req, res = response) =>{
    const {id} = req.params;
 

    const carrera = await Carrera.findByIdAndUpdate(id,  {estado: false}, {new: true});
    res.json(carrera);

     
}

module.exports = {
    crearCarrera,
    obtenerCarreras,
    obtenerCarrera,
    actualizarCarrera,
    borrarCarrera
}