import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    date: { type: Date, default: new Date() },
    priority: {
      type: String,
      default: "нормальный",
      enum: ["высокий", "средний", "нормальный", "низкий"],
    },
    stage: {
      type: String,
      default: "на выполнение",
      enum: ["на выполнение", "в процессе", "выполнена"],
    },
    activities: [
      {
        type: {
          type: String,
          default: "назначен",
          enum: [
            "назначен",
            "начат",
            "в процессе",
            "ошибка",
            "выполнен",
          ],
        },
        activity: String,
        date: { type: Date, default: new Date() },
        by: { type: Schema.Types.ObjectId, ref: "User" },
      },
    ],

    subTasks: [
      {
        title: String,
        date: Date,
        tag: String,
      },
    ],
    assets: [String],
    team: [{ type: Schema.Types.ObjectId, ref: "User" }],
    isTrashed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
