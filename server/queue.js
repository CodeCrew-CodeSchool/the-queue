const redis = require("redis")
const sqlite3 = require('sqlite3').verbose();

class QueueObject{
    constructor() {
        this.sqliteClient = new sqlite3.Database(process.env.SQLITE_FILE_PATH);
        this.sqliteClient.run(`CREATE TABLE IF NOT EXISTS queue (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name STRING,
            description STRING,
            timeJoined DATETIME DEFAULT CURRENT_TIMESTAMP
        );`, (error) => { error == null ? console.log("Successfully connected Sqlite database...") 
                                        : console.log("Could not connect to Sqlite database...")})

    }
    
    async getQueue(){
        let request = new Promise((resolve, reject) => {
            const query = "SELECT * FROM queue";
            this.sqliteClient.all(query, [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
        return request
    }

    async addStudentToQueue(student){
        var request = new Promise((resolve, reject) => {
            const query = "INSERT INTO queue (name, description) VALUES (?, ?)"
            this.sqliteClient.run(query, [student.name, student.description], (err) => {
                if (err) {
                    console.error("Error adding student to queue", err.message);
                    reject(err)
                } else {
                    console.log("Student added to queue");
                    resolve(null)
                }
            })
        })
        return request
    }

    async removeStudentFromQueue(studentId){
        var request = new Promise((resolve, reject) => {
            const query = "DELETE FROM queue WHERE id = ?";
            this.sqliteClient.run(query, studentId, (err) => {
                if (err) {
                    console.error("Removing student from queue", err.message);
                    reject(err)
                } else {
                    console.log("Student removed from queue");
                    resolve(null)
                }
            })
        })
        return request
    }
}

module.exports = QueueObject;