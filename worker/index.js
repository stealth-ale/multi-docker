const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000    
});

const sub = redisClient.duplicate()

function fib(index){
    if (index<2) return 1;
    return fib(index-1) + fib(index-2)
}

// This .on is kicked whenever a new value is added to Redis
sub.on('message', (channel, message) => {
    redisClient.hset('values', message, fib(parseInt(message)))
});
// Listen to new inserts
sub.subscribe('insert');