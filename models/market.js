const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const marketSchema = new Schema({
    name: { type: String, required: true },

    level: { type: Number, required: true },
    exp: { type: Number, required: true },
    nextLevel: { type: Number, required: true },

    size:{ type: Number },
    weight:{ type: Number },

    stat: {
        happiness:{ type: Number },
        hunger:{ type: Number },

        strength:{ type: Number },
        defense:{ type:Number},
        speed:{ type: Number },
        int:{ type: Number },

        water:{ type: Number },
        fire:{ type: Number },
        earth:{ type: Number },
        air:{ type: Number }
      
    },
    moves: [
        {
            title: { type: Number },
            type: { type: String },
            damage: { type: Number }
        }
    ],
    imageUrl: {
        type: String
    },
    price: {
        type: Number
    },
    nutrition: {
        type: Number
    },
    daysToMaturity: {
        type: Number
    },
    playerMonster: {
        type: Schema.Types.ObjectId,
        ref: "Monster"
    },
    playerResources:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

const Market = mongoose.model("Market", marketSchema);

module.exports = Market;