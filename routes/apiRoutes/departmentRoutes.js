const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// GET all departments
router.get('/departments', (req, res) => {
    const sql = `SELECT * FROM departments`;

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

// GET a department
router.get('/department/:id', (req, res) => {
    const sql = `SELECT * FROM departments WHERE department_id = ?`;
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

// DELETE a department
router.delete('/department/:id', (req, res) => {
    const sql = `DELETE FROM departments WHERE department_id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        } else if (!result.affectedRows) {
            res.json({
                message: 'department not found'
            });
        } else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                department_id: req.params.id
            });
        }
    });
});




module.exports = router;