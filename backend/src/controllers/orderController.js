import Order from '../models/Order.js';
import Product from '../models/Product.js';

// User: Create order
export const createOrder = async (req, res) => {
<<<<<<< HEAD
  const { items, shippingAddress, paymentMethod, deliveryMethod } = req.body;
=======
  const { items, shippingAddress, paymentMethod } = req.body;
>>>>>>> 6644a9b3829b34f1e619ed6d01c457846ddf0d75
  const userId = req.user.userId;

  // Lưu lại các sản phẩm đã trừ stock để rollback nếu có lỗi
  const stockDeducted = [];

  try {
<<<<<<< HEAD
    if (deliveryMethod === 'delivery') {
      if (!shippingAddress?.street || !shippingAddress?.city || !shippingAddress?.phone) {
        return res.status(400).json({ message: 'Vui lòng nhập đầy đủ địa chỉ giao hàng' });
      }
    }

=======
>>>>>>> 6644a9b3829b34f1e619ed6d01c457846ddf0d75
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      // Dùng findOneAndUpdate atomic: chỉ trừ stock khi còn đủ hàng
<<<<<<< HEAD
=======
      // Nếu stock < quantity thì không update và trả về null
>>>>>>> 6644a9b3829b34f1e619ed6d01c457846ddf0d75
      const product = await Product.findOneAndUpdate(
        { _id: item.productId, stock: { $gte: item.quantity } },
        { $inc: { stock: -item.quantity } },
        { new: true }
      );

<<<<<<< HEAD
      if (!product) {
        const found = await Product.findById(item.productId);

=======
      // Nếu null: sản phẩm không tồn tại hoặc không đủ hàng
      if (!product) {
        // Tìm lại để biết lý do cụ thể
        const found = await Product.findById(item.productId);

        // Rollback stock cho các sản phẩm đã trừ trước đó
>>>>>>> 6644a9b3829b34f1e619ed6d01c457846ddf0d75
        if (stockDeducted.length > 0) {
          await Promise.all(
            stockDeducted.map(({ productId, quantity }) =>
              Product.findByIdAndUpdate(productId, { $inc: { stock: quantity } })
            )
          );
        }

        if (!found) {
          return res.status(404).json({ message: `Sản phẩm không tồn tại` });
        }
        return res.status(400).json({
          message: `"${found.name}" không đủ hàng. Còn lại: ${found.stock}`
        });
      }

<<<<<<< HEAD
      stockDeducted.push({ productId: product._id, quantity: item.quantity });

      // Tính đơn giá = giá gốc + phụ thu size + tổng giá topping đã chọn
      const sizeObj = (product.sizes || []).find(s => s.name === item.size);
      const sizeDelta = sizeObj ? sizeObj.priceDelta : 0;
      const chosenToppings = Array.isArray(item.toppings) ? item.toppings : [];
      const toppingsTotal = chosenToppings.reduce((sum, tName) => {
        const t = (product.toppings || []).find(pt => pt.name === tName);
        return sum + (t ? t.price : 0);
      }, 0);
      const unitPrice = product.price + sizeDelta + toppingsTotal;

      orderItems.push({
        product: product._id,
        name: product.name,
        price: unitPrice,
        quantity: item.quantity,
        image: product.image,
        size: item.size || '',
        sugarIce: item.sugarIce || '',
        toppings: chosenToppings,
        note: item.note || ''
      });

      totalAmount += unitPrice * item.quantity;
    }

=======
      // Ghi nhận đã trừ stock để rollback nếu cần
      stockDeducted.push({ productId: product._id, quantity: item.quantity });

      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        image: product.image
      });

      totalAmount += product.price * item.quantity;
    }

    // Tạo đơn hàng sau khi tất cả stock đã được trừ thành công
>>>>>>> 6644a9b3829b34f1e619ed6d01c457846ddf0d75
    const order = new Order({
      user: userId,
      items: orderItems,
      totalAmount,
<<<<<<< HEAD
      deliveryMethod: deliveryMethod === 'pickup' ? 'pickup' : 'delivery',
      shippingAddress: deliveryMethod === 'pickup' ? undefined : shippingAddress,
      paymentMethod,
      status: 'new'
=======
      shippingAddress,
      paymentMethod,
      status: 'pending'
>>>>>>> 6644a9b3829b34f1e619ed6d01c457846ddf0d75
    });

    await order.save();
    await order.populate('user', 'name email');

    // ✅ Thông báo realtime cho admin khi có đơn hàng mới
    const io = req.app.get('io');
<<<<<<< HEAD
    if (io) {
=======
    console.log('[Order] io available:', !!io);
    if (io) {
      console.log('[Order] Emitting new_order to admins room');
>>>>>>> 6644a9b3829b34f1e619ed6d01c457846ddf0d75
      io.to('admins').emit('new_order', {
        orderId: order._id,
        userName: order.user?.name || 'Khách',
        totalAmount: order.totalAmount,
        itemCount: order.items.length,
        createdAt: order.createdAt
      });
    }

    res.status(201).json(order);

  } catch (error) {
<<<<<<< HEAD
=======
    // Rollback nếu có lỗi không mong muốn (mất kết nối DB, v.v.)
>>>>>>> 6644a9b3829b34f1e619ed6d01c457846ddf0d75
    if (stockDeducted.length > 0) {
      await Promise.all(
        stockDeducted.map(({ productId, quantity }) =>
          Product.findByIdAndUpdate(productId, { $inc: { stock: quantity } })
<<<<<<< HEAD
        )
      ).catch(() => {});
=======
        ).catch(() => {}) // Bỏ qua lỗi rollback, không làm crash thêm
      );
>>>>>>> 6644a9b3829b34f1e619ed6d01c457846ddf0d75
    }
    res.status(500).json({ message: error.message });
  }
};

// User: Get my orders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId })
      .populate('items.product', 'name price')
      .sort('-createdAt');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// User: Get order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product', 'name price image');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.user.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('items.product', 'name price')
      .sort('-createdAt');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
<<<<<<< HEAD
    const allowed = ['new', 'confirmed', 'preparing', 'completed', 'cancelled'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: 'Trạng thái không hợp lệ' });
    }
=======
>>>>>>> 6644a9b3829b34f1e619ed6d01c457846ddf0d75
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Delete order
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
<<<<<<< HEAD
};
=======
};
>>>>>>> 6644a9b3829b34f1e619ed6d01c457846ddf0d75
