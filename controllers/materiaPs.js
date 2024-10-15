const {response} = require('express');
const { MateriaP } = require('../models');





const obtenerMateriasP = async(req, res = reponse) =>{
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, materias ] = await Promise.all([
        MateriaP.countDocuments(query),
        MateriaP.find(query)
            .populate('usuario')
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        materias
    });
}


const obtenerMateriaP = async(req, res = reponse) =>{
    const {id} = req.params;
    const materiaP = await MateriaP.findById(id).populate('usuario','nombre')
 
 
     res.json(materiaP);
 }
const crearMateriaP = async(req, res= response) =>{
    const nombre = req.body.nombre.toUpperCase();
    const clave = req.body.clave;
    const carrera = req.body.carrera;
    const tipo = await MateriaP.findOne({nombre})? 'PENDIENTE':'ABIERTA';
   

    const data = {
        nombre,
        usuario: req.usuario._id,
        clave,
        tipo,
        carrera,
     

    }

    const materiaP = new MateriaP(data);
     await materiaP.save();
     res.status(201).json(materiaP);
}


const actualizarMateriaP = async(req, res = response) =>{
    const {id} = req.params;
    const {estado, ...data } = req.body;
    data.nombre = data.nombre.toUpperCase();
  

    const materia = await MateriaP.findByIdAndUpdate(id, data, {new: true});
    res.json(materia);

     
}

const borrarMateriaP = async(req, res = response) =>{
    const {id} = req.params;
 

    const materiaP = await MateriaP.findByIdAndUpdate(id,  {estado: false}, {new: true});
    res.json(materiaP);

     
}







module.exports = {
    crearMateriaP,
    obtenerMateriasP,
    obtenerMateriaP,
    actualizarMateriaP,
    borrarMateriaP
    
}