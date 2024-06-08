import * as mongoose from 'mongoose'

// Define a schema for users
const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    inventory: [{ 
        id: String,
        quantity: Number,
        acquiredDate: { type: Date, default: Date.now },
    }],
    money: {type: Number, default: 10},
    partner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required:false }
  // Additional fields as needed
});

const User = mongoose.model('User', userSchema);

export { User };