import mongoose from  "mongoose";
const userSchema = new mongoose.Schema({
     email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true
    },
     password: {
      type: String,
      required: true,
      minlength: 6,
      select: false
    },
    timestamp:{
        type: Date,
        createdAt: 'created_at'
        default: Date.now
    }
});