import { readFile, writeFile } from 'node:fs/promises';

export const obtenerusuario_desdejs = async () => {
    const db = JSON.parse(
        await readFile(new URL('../db/db.json', import.meta.url), 'utf-8')

    );
    return db.jugadores ?? [];

}

export const crearusuario = async (nuevoUsuario) => {
  // 1. Leer el archivo
  const data = await readFile(
    new URL('../db/db.json', import.meta.url),
    'utf-8'
  );

  // 2. Parsear JSON
  const db = JSON.parse(data);

  // 3. Asegurar que exista jugadores
  db.jugadores = db.jugadores ?? [];

  // 4. Crear usuario con ID simple
  const usuario = {
    id: crypto.randomUUID(),
    ...nuevoUsuario
  };

  // 5. Agregar al array
  db.jugadores.push(usuario);

  // 6. Guardar el archivo
  await writeFile(
    new URL('../db/db.json', import.meta.url),
    JSON.stringify(db, null, 2)
  );

  return usuario;
};


export const actualizarUsuario = async (id, datosActualizados) => {
  const data = await readFile(
    new URL('../db/db.json', import.meta.url),
    'utf-8'
  );

  const db = JSON.parse(data);

  db.jugadores = db.jugadores ?? [];

  const index = db.jugadores.findIndex(j => j.id === id);

  if (index === -1) {
    return null; // usuario no encontrado
  }

  // Mezcla datos antiguos + nuevos
  db.jugadores[index] = {
    ...db.jugadores[index],
    ...datosActualizados,
    id // aseguramos que el id no cambie
  };

  await writeFile(
    new URL('../db/db.json', import.meta.url),
    JSON.stringify(db, null, 2)
  );

  return db.jugadores[index];
};



export const eliminarUsuario = async (id) => {
  const data = await readFile(
    new URL('../db/db.json', import.meta.url),
    'utf-8'
  );

  const db = JSON.parse(data);

  db.jugadores = db.jugadores ?? [];

  const index = db.jugadores.findIndex(j => j.id === id);

  if (index === -1) {
    return null;
  }

  const eliminado = db.jugadores.splice(index, 1)[0];

  await writeFile(
    new URL('../db/db.json', import.meta.url),
    JSON.stringify(db, null, 2)
  );

  return eliminado;
};

