const { db } = require("../db");
const recordValidator = require("../utils/validation.utils");
const response = require("../utils/response")

const registerRecord = (req, res) => {
    const { heartRate, bodyTemp, patientId } = req.body;
    const isRecordValid = recordValidator({ heartRate, bodyTemp });
    if (!heartRate || !bodyTemp || !patientId) {
        res.status(400);
        return res.json({
            message: "Please fill all fields",
            results: null
        })
    }
    if (isRecordValid) {
        const sql = `SELECT  * FROM patients where id = ?`;
        db.get(sql, [patientId], (err, row) => {
            if (err) return console.log(`The user is not found`);
            if (!row) return res.json({
                message: `Patient with id ${patientId} is not found`
            })
            const query = 'INSERT INTO records(heartRate,bodyTemp,patient_id) VALUES (?,?,?)';
            db.run(query, [heartRate, bodyTemp, patientId], function (err) {
                if (err) return console.log(`An error occured`);
                response({
                    res,
                    message: 'Record created successfully',
                    isSuccessful: true
                })
            })

        })
    }
    else {
        res.status(400);
        return res.json({
            message: 'Please enter varid records i.e Temperature must be between 35 and 40 and heart rate between 60 and 80',
            result: null
        })
    }


}
const updateRecord = (req, res) => {
    try{
        const { id } = req.params.id;
        const { heartRate, bodyTemp,patientId } = req.body;
        const recordRetrievalSql = `SELECT * FROM records WHERE id = ?`;
        db.get(recordRetrievalSql, [id], (err, row) => {
            if (err) return console.log('Error occured')
            if (!row) return res.json({
                message: `No Record Found`,
            })
    
            const sql = `UPDATE records SET heartRate= ?,bodyTemp= ? ,patientId = ?  WHERE id= ?`;
            db.run(sql, [heartRate, bodyTemp,patientId, id], (err) => {
                if (err) return console.log(`Error occured`);
                res.status(200);
                response({
                    res,
                    message:'Record updated successfully'
                })
            })
        })

    }
    catch(err){
        console.error(err.message)
    }
}
const retriveRecords = (req,res)=>{
    try{
        const sql = `SELECT * FROM records`;
        db.all(sql,[],(err,rows)=>{
            if(err)return console.log(err)
            return response({
        res,
        message:'Records retrieved successfully',
        isSuccessful:true,
        result:rows})
        })

    }
    catch(err){
        console.error(err)
    }

}
const retriveSingleRecord = (req,res)=>{
    try{
const {id} = req.params.id;
        const sql = `SELECT * FROM records WHERE id = ?`;
        db.get(sql,[id],(err,row)=>{
            if(err) return console.log(err.message)
            if(!row){
                response({
                    res,               
                    er:true,
                    message:`Record with id ${id} is not found`,
                })
            }
            response({
                res,
                message:'Record retrieved successfully',
                isSuccessful:true,
                result:row
            })
        })

    }
    catch(err){
console.error(err.message)
    }
}
module.exports = { registerRecord,updateRecord,retriveRecords,retriveSingleRecord }