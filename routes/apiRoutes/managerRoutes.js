const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// GET all managers
router.get('/managers', (req, res) => {
    const sql = `SELECT * FROM managers`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// GET a manager
router.get('/manager/:id', (req, res) => {
    const sql = `SELECT * FROM managers WHERE manager_id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

// DELETE a manager
router.delete('/manager/:id', (req, res) => {
    const sql = `DELETE FROM managers WHERE manager_id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        } else if (!result.affectedRows) {
            res.json({
                message: 'Manager not found'
            });
        } else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                manager_id: req.params.id
            });
        }
    });
});


module.exports = router;