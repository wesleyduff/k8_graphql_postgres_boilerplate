module.exports = {
    mongo_url: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CONNECTION_STRING}/${process.env.MONGO_DB}${process.env.MONGO_ARGS}`
}