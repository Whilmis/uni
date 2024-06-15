const {response} = require('express');
const { Materia } = require('../models');





const obtenerMaterias = async(req, res = reponse) =>{
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, materias ] = await Promise.all([
        Materia.countDocuments(query),
        Materia.find(query)
            .populate('usuario', 'nombre')
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        materias
    });
}


const obtenerMateria = async(req, res = reponse) =>{
    const {id} = req.params;
    const materia = await Materia.findById(id).populate('usuario','nombre')
 
 
     res.json(materia);
 }
const crearMateria = async(req, res= response) =>{
    const nombre = req.body.nombre.toUpperCase();
    const clave = req.body.clave;
    const carrera = req.body.carrera;
    const carreraDB = await Materia.findOne({nombre});
    if(carreraDB){
        return res.status(400).json({
            msg:`La carrera ${carreraDB.nombre}, ya existe`
        })
    }

    const data = {
        nombre,
        usuario: req.usuario._id,
        clave,
        carrera,
     

    }

    const materia = new Materia(data);
     await materia.save();
     res.status(201).json(materia);
}


const actualizarMateria = async(req, res = response) =>{
    const {id} = req.params;
    const {estado, usuario, ...data } = req.body;
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const materia = await Materia.findByIdAndUpdate(id, data, {new: true});
    res.json(materia);

     
}

const borrarMateria = async(req, res = response) =>{
    const {id} = req.params;
 

    const materia = await Materia.findByIdAndUpdate(id,  {estado: false}, {new: true});
    res.json(materia);

     
}







module.exports = {
    crearMateria,
    obtenerMaterias,
    obtenerMateria,
    actualizarMateria,
    borrarMateria
    
}