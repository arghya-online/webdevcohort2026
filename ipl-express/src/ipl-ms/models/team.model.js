import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Team name is required"],
      trim: true,
      minlength: [3, "Team name must be at least 3 characters long"],
      maxlength: [50, "Team name must be less than 50 characters long"],
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Owner",
      required: [true, "Owner ID is required"],
    },
  },
  { timestamps: true },
);

export default mongoose.model("Team", teamSchema);
