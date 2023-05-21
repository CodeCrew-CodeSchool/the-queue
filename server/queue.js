const redis = require("redis")

class QueueObject{
    constructor(){
        this.redisClient = redis.createClient({ url: 'rediss://red-chkp6fu4dadfmsn42vug:mNQsZSfPXAhSv4DBnzJtMEUZiAGKAzVl@oregon-redis.render.com:6379' })
    }
    
    async getQueue(){
        await this.redisClient.connect()

        let queueString = await this.redisClient.get("queue")
        let queue = JSON.parse(queueString)

        await this.redisClient.disconnect()
        return queue
    }

    async addStudentToQueue(student){
        await this.redisClient.connect()

        let queueString = await this.redisClient.get("queue")
        let queue = JSON.parse(queueString)
        queue.push(student)
        await this.redisClient.set('queue', JSON.stringify(queue))

        await this.redisClient.disconnect()
    }

    async removeStudentFromQueue(studentName){
        await this.redisClient.connect()

        let queueString = await this.redisClient.get("queue")
        let queue = JSON.parse(queueString)
        let studentIndex = queue.findIndex((element) => {
            if(element.name === studentName){
                return true
            }else{
                return false
            }
        })
        if(studentIndex !== -1){
            queue.splice(studentIndex, 1)
        }
        await this.redisClient.set("queue", JSON.stringify(queue))
        
        await this.redisClient.disconnect()
    }
}

module.exports = QueueObject;