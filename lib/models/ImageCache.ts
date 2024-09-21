import mongoose from "mongoose";

const ImageCacheSchema = new mongoose.Schema({
  query: { type: String, required: true },
  data: { type: Array, required: true },
  page: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now, index: { expires: "24h" } },
});

export default mongoose.models.ImageCache ||
  mongoose.model("ImageCache", ImageCacheSchema);
