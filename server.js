const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const filePath = './notas.json';

// Inicializar archivo si no existe
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
}

// Leer notas
app.get('/api/notas', (req, res) => {
    const data = fs.readFileSync(filePath, 'utf8');
    const notas = JSON.parse(data);
    res.json(notas);
});

// Agregar nota
app.post('/api/notas', (req, res) => {
    const { titulo, contenido } = req.body;
    const data = fs.readFileSync(filePath, 'utf8');
    const notas = JSON.parse(data);
    
    const nuevaNota = {
        id: Date.now().toString(),
        titulo,
        contenido,
        fecha: new Date().toISOString()
    };
    
    notas.push(nuevaNota);
    fs.writeFileSync(filePath, JSON.stringify(notas, null, 2));
    res.json(nuevaNota);
});

// Eliminar nota
app.delete('/api/notas/:id', (req, res) => {
    const { id } = req.params;
    const data = fs.readFileSync(filePath, 'utf8');
    let notas = JSON.parse(data);
    
    notas = notas.filter(nota => nota.id !== id);
    fs.writeFileSync(filePath, JSON.stringify(notas, null, 2));
    res.json({ message: 'Nota eliminada' });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});