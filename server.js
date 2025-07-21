const express = require('express');
const app = express();
const port = 3000;

// 🔧 CORS-Middleware vor allen anderen
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// JSON-Parsing aktivieren
app.use(express.json());

// Beispiel-Daten
let sprueche = [
    { id: 1, text: "Der Weg ist das Ziel.", autor: "Konfuzius" },
    { id: 2, text: "Phantasie ist wichtiger als Wissen.", autor: "Albert Einstein" },
    { id: 3, text: "Das Leben ist kein Ponyhof", autor: "unbekannt" },
    { id: 4, text: "Übung macht den Meister", autor: "unbekannt" },
    { id: 5, text: "In der Ruhe liegt die Kraft", autor: "unbekannt" }
];

// 📥 GET - Alle Sprüche
app.get('/api/sprueche', (req, res) => {
    res.json(sprueche);
});

// ➕ POST - Neuen Spruch hinzufügen
app.post('/api/sprueche', (req, res) => {
    const neuerSpruch = {
        id: sprueche[sprueche.length - 1]?.id + 1 || 1,
        text: req.body.text,
        autor: req.body.autor
    };

    sprueche.push(neuerSpruch);
    res.status(201).json(neuerSpruch);
});

// ❌ DELETE - Spruch löschen
app.delete('/api/sprueche/:id', (req, res) => {
    const idZumLoeschen = parseInt(req.params.id);
    const index = sprueche.findIndex(s => s.id === idZumLoeschen);

    if (index !== -1) {
        sprueche.splice(index, 1);
        console.log(`Spruch mit ID ${idZumLoeschen} wurde gelöscht.`);
    } else {
        console.log(`Spruch mit ID ${idZumLoeschen} nicht gefunden.`);
    }

    res.status(204).send();
});

// 🚀 Server starten
app.listen(port, () => {
    console.log(`✅ Server läuft auf http://localhost:${port}`);
});
