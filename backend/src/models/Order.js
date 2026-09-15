import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    name: String,
<<<<<<< HEAD
    price: Number,        // đơn giá đã gồm size + topping
    quantity: Number,
    image: String,
    size: String,
    sugarIce: String,
    toppings: { type: [String], default: [] },
    note: String
=======
    price: Number,
    quantity: Number,
    image: String
>>>>>>> 6644a9b3829b34f1e619ed6d01c457846ddf0d75
  }],
  totalAmount: {
    type: Number,
    required: true
  },
<<<<<<< HEAD
  // Hình thức nhận hàng: giao tận nơi hoặc đến quầy lấy
  deliveryMethod: {
    type: String,
    enum: ['delivery', 'pickup'],
    default: 'delivery'
  },
=======
>>>>>>> 6644a9b3829b34f1e619ed6d01c457846ddf0d75
  shippingAddress: {
    street: String,
    city: String,
    phone: String
  },
<<<<<<< HEAD
  // Quy trình xử lý đơn theo mô hình quán cà phê:
  // Mới -> Đã xác nhận -> Đang pha chế -> Hoàn thành (hoặc Đã hủy)
  status: {
    type: String,
    enum: ['new', 'confirmed', 'preparing', 'completed', 'cancelled'],
    default: 'new'
=======
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
>>>>>>> 6644a9b3829b34f1e619ed6d01c457846ddf0d75
  },
  paymentMethod: {
    type: String,
    enum: ['cod', 'banking', 'momo'],
    default: 'cod'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

<<<<<<< HEAD
export default mongoose.model('Order', orderSchema);
=======
export default mongoose.model('Order', orderSchema);
>>>>>>> 6644a9b3829b34f1e619ed6d01c457846ddf0d75
