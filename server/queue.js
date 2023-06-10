const redis = require("redis")


class QueueObject{
    constructor(){
        this.redisClient = redis.createClient({ url: process.env.REDIS_CONNECTION_STRING })
        this.redisClient.on('error', err => console.log('Redis Client Error', err));
        this.redisClient.connect().then(()=>{ 
            console.log("Successfully connected Redis...")
        })
    }
    
    async getQueue(){
        let queueString = await this.redisClient.get("queue")
        let queue = JSON.parse(queueString)
        if(!queue){ queue = [] }
        return queue
    }

    async addStudentToQueue(student){
        let queue = await this.getQueue()
        queue.push(student)
        await this.redisClient.set('queue', JSON.stringify(queue))
    }

    async removeStudentFromQueue(studentName){
        let queue = await this.getQueue()
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
    }
}

module.exports = QueueObject;