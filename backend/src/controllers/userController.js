import User from '../models/User.js';
import Order from '../models/Order.js';

// Admin: Lấy danh sách tất cả người dùng
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort('-createdAt');

    // Đếm số đơn hàng + tổng chi tiêu của từng user
    const orderStats = await Order.aggregate([
      {
        $group: {
          _id: '$user',
          orderCount: { $sum: 1 },
          totalSpent: { $sum: '$totalAmount' }
        }
      }
    ]);
    const statsMap = new Map(orderStats.map(s => [s._id.toString(), s]));

    const usersWithStats = users.map(u => {
      const stats = statsMap.get(u._id.toString());
      return {
        ...u.toObject(),
        orderCount: stats?.orderCount || 0,
        totalSpent: stats?.totalSpent || 0
      };
    });

    res.json(usersWithStats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Lấy chi tiết 1 người dùng
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }
    const orders = await Order.find({ user: user._id }).sort('-createdAt');
    res.json({ ...user.toObject(), orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Cập nhật vai trò (user / admin)
export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Vai trò không hợp lệ' });
    }

    // Không cho tự hạ quyền chính mình để tránh khóa tài khoản admin cuối cùng
    if (req.params.id === req.user.userId && role !== 'admin') {
      return res.status(400).json({ message: 'Không thể tự hạ quyền của chính mình' });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Xóa người dùng
export const deleteUser = async (req, res) => {
  try {
    if (req.params.id === req.user.userId) {
      return res.status(400).json({ message: 'Không thể tự xóa chính mình' });
    }

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }

    res.json({ message: 'Đã xóa người dùng thành công' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
