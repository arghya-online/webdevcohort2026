import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name must be at least 3 characters long"],
    maxlength: [50, "Name must be less than 50 characters long"],
  },
  company: {
    type: String,
    required: [true, "Company is required"],
    minlength: [3, "Company must be at least 3 characters long"],
    maxlength: [100, "Company must be less than 100 characters long"],
  },
});

export default mongoose.model("Owner", ownerSchema);
