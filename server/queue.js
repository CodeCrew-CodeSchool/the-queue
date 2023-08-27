
const pg = require('pg')

class QueueObject{
    constructor() {
        this.dbClient = new pg.Client({
            connectionString: process.env.POSTGRES_CONNECTION_STRING,
            ssl: true
        })
        this.dbClient.connect()
            .then((res) => {
                console.log("Successfully connected to Postgres database...")
                this.dbClient.query(`CREATE TABLE IF NOT EXISTS queue (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(255),
                    description TEXT,
                    timeJoined TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
                  );`)
            })
    }
    
    async getQueue(){
        const query = "SELECT * FROM queue";
        var result = await this.dbClient.query(query)
        return result.rows

    }

    async addStudentToQueue(student){
        const query = `INSERT INTO queue (name, description)
                        VALUES ($1, $2)
                        RETURNING id`
        var result = await this.dbClient.query(query, [student.name, student.description])

        return result.rows
    }

    async removeStudentFromQueue(studentId){
        const query = `DELETE FROM queue
                        WHERE id = $1`
        var result = await this.dbClient.query(query, [studentId])
        return result.rows
    }
}

module.exports = QueueObject;