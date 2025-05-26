const fs = require('fs');

async function saveToFile(path, data) {
  try {
    await fs.promises.writeFile(path, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`Error al guardar en ${path}:`, error);
    throw new Error('No se pudo guardar el archivo');
  }
}

module.exports = { saveToFile };
