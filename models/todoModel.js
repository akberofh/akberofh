import mongoose from "mongoose";


const todoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: String,
     
    },
    body: {
      type: String,
    },

    description: {
      type: String,
    
    },
    photo: {
      type: String, // base64 encoded ucun string qebul edir
      
      default: '',
  },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;