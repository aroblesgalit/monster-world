const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const monsterSchema = new Schema({
    name: { type: String, required: true },

    level: { type: Number, required: true },
    exp: { type: Number, required: true },
    // Will we need this one here?
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

        ice:{ type: Number },
        fire:{ type: Number },
        earth:{ type: Number },
        air:{ type: Number }
        // decide on full magic/types chart
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
    }
})

const Monster = mongoose.model("Monster", monsterSchema);

module.exports = Monster;