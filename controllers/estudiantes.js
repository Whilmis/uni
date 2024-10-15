const {response} = require('express');
const { Estudiante, Materia  } = require('../models');






const obtenerEstudiantes = async(req, res = reponse) =>{
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, estudiantes ] = await Promise.all([
        Estudiante.countDocuments(query),
        Estudiante.find(query)
            .populate('usuario', 'nombre')
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        estudiantes
    });
}

const obtenerEstudiante = async(req, res = reponse) =>{
    const {id} = req.params;
    const materia = await Estudiante.findById(id).populate('usuario','nombre')
 
 
     res.json(materia);
 }

 const obtenerEstudianteIdUser = async(req, res = reponse) =>{
    const {id} = req.params;
    const materia = await Estudiante.findOne({user_id:id})
 
 
     res.json(materia);
 }
const crearEstudiante = async(req, res= response) =>{
    const nombre = req.body.nombre.toUpperCase();
    const user_id= req.body.user_id;
    const carrera = req.body.carrera;
    const materias =  await Materia.find({ carrera :   `${carrera[0]}`  }) ;
    const estudianteDB = await Estudiante.findOne({nombre});
    if(estudianteDB){
        return res.status(400).json({
            msg:`La carrera ${estudianteDB.nombre}, ya existe`
        })
    }

    const data = {
        nombre,
        usuario: req.usuario._id,
        user_id,
        carrera,
        materias
     

    }

    const estudiante = new Estudiante(data);
     await estudiante.save();
     res.status(201).json(estudiante);
}

const actualizarEstudiante = async(req, res = response) =>{
    const {id} = req.params;
    const {estado, usuario, ...data } = req.body;
    data.nombre? data.nombre = data.nombre.toUpperCase(): '' ;
    data.usuario ?  data.usuario = req.usuario._id:  '';

    const estudiante = await Estudiante.findByIdAndUpdate(id, data, {new: true});
    res.json(estudiante);

     
}

const borrarEstudiante = async(req, res = response) =>{
    const {id} = req.params;
 

    const estudiante = await Estudiante.findByIdAndUpdate(id,  {estado: false}, {new: true});
    res.json(estudiante);

     
}




module.exports = {
    crearEstudiante,
    obtenerEstudiantes,
    obtenerEstudiante,
    borrarEstudiante,
    actualizarEstudiante,
    obtenerEstudianteIdUser

}