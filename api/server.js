// api/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors
const db = require('./database');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Get all templates
app.get('/templates', (req, res) => {
    db.all('SELECT * FROM template', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Get a single template by id
app.get('/templates/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM template WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'Template not found' });
        }
        res.json(row);
    });
});

// Create a new template
app.post('/templates', (req, res) => {
    const { title, content } = req.body;
    db.run('INSERT INTO template (title, content) VALUES (?, ?)', [title, content], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID });
    });
});

// Update a template by id
app.put('/templates/:id', (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    db.run('UPDATE template SET title = ?, content = ? WHERE id = ?', [title, content, id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Template not found' });
        }
        res.json({ message: 'Template updated successfully' });
    });
});

// Delete a template by id
app.delete('/templates/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM template WHERE id = ?', [id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Template not found' });
        }
        res.json({ message: 'Template deleted successfully' });
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}`);
});