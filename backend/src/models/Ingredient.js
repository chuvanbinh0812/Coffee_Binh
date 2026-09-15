import mongoose from 'mongoose';

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  unit: {
    type: String,
    required: true,
    trim: true // g, kg, ml, l, cái, gói...
  },
  stockQuantity: {
    type: Number,
    default: 0
  },
  minThreshold: {
    type: Number,
    default: 0 // dưới mức này sẽ cảnh báo sắp hết
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Ingredient', ingredientSchema);
