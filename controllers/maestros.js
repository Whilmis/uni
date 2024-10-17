const {response} = require('express');
const { Maestro, Materia } = require('../models');






const obtenerMaestros = async(req, res = reponse) =>{
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, maestros ] = await Promise.all([
        Maestro.countDocuments(query),
        Maestro.find(query)
            .populate('usuario', 'nombre')
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        maestros
    });
}

const obtenerMaestro = async(req, res = reponse) =>{
    const {id} = req.params;
    const maestro = await Maestro.findById(id).populate('usuario','nombre')
 
 
     res.json(maestro);
 }
const crearMaestros = async(req, res= response) =>{
    const nombre = req.body.nombre.toUpperCase();
    const user_id= req.body.user_id;
    const carrera = req.body.carrera;
    const materias =  await Materia.find({ carrera :   `${carrera[0]}`  }) ;
    const maestroDB = await Maestro.findOne({nombre});
    if(maestroDB){
        return res.status(400).json({
            msg:`La carrera ${maestroDB.nombre}, ya existe`
        })
    }

    const data = {
        nombre,
        usuario: req.usuario._id,
        user_id,
        carrera,
        materias
     

    }

    const maestro = new Maestro(data);
     await maestro.save();
     res.status(201).json(maestro);
}

const actualizarMaestro = async(req, res = response) =>{
    const {id} = req.params;
    const {estado,  ...data } = req.body;
  
  

    const maestro = await Maestro.findByIdAndUpdate(id, data, {new: true});
    res.json(maestro);

     
}
const obtenerMaestroIdUser = async(req, res = reponse) =>{
    const {id} = req.params;
    const maestro = await Maestro.findOne({user_id:id})
 
 
     res.json(maestro);
 }

const borrarMaestro = async(req, res = response) =>{
    const {id} = req.params;
 

    const maestro = await Maestro.findByIdAndUpdate(id,  {estado: false}, {new: true});
    res.json(maestro);

     
}




module.exports = {
    crearMaestros,
    obtenerMaestros,
    obtenerMaestro,
    borrarMaestro,
    actualizarMaestro,
    obtenerMaestroIdUser 

}