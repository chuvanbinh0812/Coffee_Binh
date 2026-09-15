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
    price: Number,        // đơn giá đã gồm size + topping
    quantity: Number,
    image: String,
    size: String,
    sugarIce: String,
    toppings: { type: [String], default: [] },
    note: String
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  // Hình thức nhận hàng: giao tận nơi hoặc đến quầy lấy
  deliveryMethod: {
    type: String,
    enum: ['delivery', 'pickup'],
    default: 'delivery'
  },
  shippingAddress: {
    street: String,
    city: String,
    phone: String
  },
  // Quy trình xử lý đơn theo mô hình quán cà phê:
  // Mới -> Đã xác nhận -> Đang pha chế -> Hoàn thành (hoặc Đã hủy)
  status: {
    type: String,
    enum: ['new', 'confirmed', 'preparing', 'completed', 'cancelled'],
    default: 'new'
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

export default mongoose.model('Order', orderSchema);