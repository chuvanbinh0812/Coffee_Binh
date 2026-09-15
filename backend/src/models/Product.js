import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/300x200'
  },
  rating: {
    type: Number,
    default: 0
  },
  reviews: {
    type: Number,
    default: 0
  },
  isNew: {
    type: Boolean,
    default: false
  },
  isBestSeller: {
    type: Boolean,
    default: false
  },
  stock: {
    type: Number,
    default: 10
  },
<<<<<<< HEAD
  // Size ly: mỗi size có thể cộng thêm tiền so với giá gốc (VD: Size M +5.000đ, Size L +10.000đ)
  sizes: {
    type: [{
      name: { type: String, required: true },
      priceDelta: { type: Number, default: 0 }
    }],
    default: []
  },
  // Topping thêm: trân châu, thạch, kem cheese... mỗi topping có giá riêng
  toppings: {
    type: [{
      name: { type: String, required: true },
      price: { type: Number, default: 0 }
    }],
    default: []
  },
  // Mức đường/đá khách có thể chọn (không cộng thêm tiền)
  sugarIceOptions: {
=======
  sizes: {
    type: [String],
    default: []
  },
  colors: {
>>>>>>> 6644a9b3829b34f1e619ed6d01c457846ddf0d75
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

<<<<<<< HEAD
export default mongoose.model('Product', productSchema);
=======
export default mongoose.model('Product', productSchema);
>>>>>>> 6644a9b3829b34f1e619ed6d01c457846ddf0d75
