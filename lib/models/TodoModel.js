import mongoose from "mongoose";

// Define the schema
let todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    isComplete: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true // Enable automatic createdAt and updatedAt fields
});

// Check if the model already exists to avoid model overwrite error
let TodoModel = mongoose.models.Todo || mongoose.model('Todo', todoSchema);

export default TodoModel;
