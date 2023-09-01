
const pg = require('pg')

class TheQueue{
    constructor() {
        this.dbClient = new pg.Client({
            connectionString: process.env.POSTGRES_CONNECTION_STRING
        })
        this.dbClient.connect()
            .then((res) => {
                console.log("Successfully connected to Postgres database...")
                this.dbClient.query(`CREATE TABLE IF NOT EXISTS queue (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(255),
                    email VARCHAR(255) UNIQUE,
                    description TEXT,
                    timeJoined TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
                  );`)
            })
        
    }
    
    async getQueue(){
        const sql = "SELECT * FROM queue ORDER BY timeJoined ASC";
        var result = await this.dbClient.query(sql)
        return result.rows

    }

    async addStudentToQueue(student){
        const sql = `INSERT INTO queue (name, description, email)
                        VALUES ($1, $2, $3)
                        RETURNING id`
        var result = await this.dbClient.query(sql, [student.name, student.description, student.email])

        return result.rows
    }

    async removeStudentFromQueue(studentEmail){
        const sql = `DELETE FROM queue
                        WHERE email = $1`
        var result = await this.dbClient.query(sql, [studentEmail])
        return result.rows
    }
}

module.exports = TheQueue;