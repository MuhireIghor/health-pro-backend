const { db } = require("../db");
const response = require("../utils/response");

const registerPatient = async (req, res) => {
    const { patientName, frequentSickness, nationalId } = req.body;
    if ( !patientName | !frequentSickness | !nationalId) {
        res.status(400);
        return res.json({
            message: 'Please fill all fields',
            isSuccessful: false,

        })
    }
    const sql = `INSERT INTO patients(patientName,frequentSickness,nationalId) VALUES (?,?,?)`;
    db.run(sql, [patientName, frequentSickness, nationalId], (err, row) => {
        if (err) return console.log(err.message)
        res.status(200);
        return response({ res, message: 'Patient registered successfully', result: row })

    });


}
const getAllPatients = (req, res) => {
    try {
        const sql = `SELECT * FROM patients`;
        db.all(sql, [], (err, rows) => {
            if (err) return console.log(err.message);
            res.status(200);
            response({
                res,
                message: 'patients fetched successfully',
                result: rows
            })

        });

    }
    catch (err) {
        res.status(500);
        response({
            er: true,
            message: err.message,
            result: null,
            res
        })
    }

}

const getPatientById = (req, res) => {

    try {
        const id = req.params.id;
        const sql = `SELECT * FROM patients WHERE id = ?`
        db.get(sql, [id], (err, row) => {
            if (err) return console.log(err.message);
            res.status(200);
            response({
                res,
                message: 'patient fetched successfully',
                result: row
            })
        });
    }
    catch (err) {
        res.status(500);
        response({
            er: true,
            message: err.message,
            result: null
        })
    }
}
const updatePatient = (req, res) => {
    try {
        const { id } = req.params;
        const {patientName, frequentSickness, nationalId } = req.body;
        const sql = `UPDATE patients SET patientName= ?,frequentSickness= ?,nationalId= ? WHERE id = ?`;
        db.run(sql, [patientName, frequentSickness, nationalId, id], (err) => {
            if (err) return console.log(err.message);
            res.status(200);
            response({
                res,
                message: 'patient updated successfully',
                result: 'User updated'
            })
        })
    }
    catch (err) {
        res.status(500);
        response({
            er: true,
            message: err.message,
            result: null
        })
    }
}
const deletePatient = (req, res) => {
    try {
        const id = req.params.id;
        const sql = `DELETE FROM patients WHERE id = ?`;
        db.run(sql, [id], (err, row) => {
            if (err) return console.error(err.message);
            res.status(200);
            response({
                res,
                message: 'Patient deleted successfully',
                result: 'User deleted',
                result: row
            })
        });

    }
    catch (err) {
        res.status(500);
        response({
            er: true,
            message: err.message,
            result: null
        })
    }
}
module.exports = { registerPatient, getAllPatients, getPatientById, updatePatient, deletePatient }