import {obtenerusuario_desdejs, crearusuario, actualizarUsuario, eliminarUsuario} from '../business/user.busines.js'

export async function getUsers (req, res){
    try{
        const users = await obtenerusuario_desdejs()
        res.json(users)
    }catch(e){
        res.json('error al obtener usuario')
    }
    
}

export async function createuser (req, res){
    try{
        const newuser= req.body
        console.log(newuser)
        const user=  await crearusuario (newuser)
      


    
    res.json(user) 
  } catch (e) {
    console.error(e)
    res.json({ error: 'error al crear usuario' })
  }
}


export async function updateUser(req, res) {
  try {
    const { id } = req.params;       // id desde la URL
    const datos = req.body;         // datos nuevos
    console.log(id,datos)
    const usuarioActualizado = await actualizarUsuario(id, datos);

    if (!usuarioActualizado) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(usuarioActualizado);

  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'error al actualizar usuario' });
  }
}

export async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    const usuarioEliminado = await eliminarUsuario(id);

    if (!usuarioEliminado) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({
      mensaje: 'Usuario eliminado correctamente',
      usuario: usuarioEliminado
    });

  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'error al eliminar usuario' });
  }
}

