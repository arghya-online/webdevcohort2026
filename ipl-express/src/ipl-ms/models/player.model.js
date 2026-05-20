import mongoose from "mongoose";

const playerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true],
      trim: true,
      minlength: [3],
      maxlength: [50],
    },
    role: {
      type: String,
      required: [true],
      enum: ["Batsman", "Bowler", "All-Rounder", "Wicket-Keeper"],
      message:
        "Role must be one of Batsman, Bowler, All-Rounder, or Wicket-Keeper",
    },
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: [true],
    },
  },
  { timestamps: true },
);

export default mongoose.model("Player", playerSchema);
