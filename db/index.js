const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("'../../patients.db",(err)=>{
    if(err) return console.error(err.message)
});
db.run(`CREATE TABLE IF NOT EXISTS patients(id INTEGER PRIMARY KEY AUTOINCREMENT,patientName TEXT,frequentSickness TEXT,nationalId TEXT,created_At TEXT DEFAULT CURRENT_TIMESTAMP)`)
db.run(`CREATE TABLE IF NOT EXISTS records(id INTEGER PRIMARY KEY AUTOINCREMENT,heartRate INTEGER,bodyTemp INTEGER NOT NULL,created_At TEXT DEFAULT CURRENT_TIMESTAMP,patient_id INTEGER FOREIGNKEY REFERENCES patients(id))`)
module.exports = {db}
