
const typeDef = `
    type weatherDaily{
        _id:String
        status:Int
        days:[day!]
    }
    
    type day {
        dayOfWeek:String
        moonPhase:String
        narrative:String
    }
`

module.exports = typeDef;