// Script tạo sẵn dữ liệu mẫu cho thực đơn Kinjo Coffee (chạy khi database đang trống).
// Cách chạy: đứng trong thư mục backend rồi gõ:
//   node scripts/seedProducts.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../src/models/Product.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/Kinjo-Fashion';

const DRINK_SIZES = [
  { name: 'S', priceDelta: 0 },
  { name: 'M', priceDelta: 5000 },
  { name: 'L', priceDelta: 10000 }
];

const DRINK_TOPPINGS = [
  { name: 'Trân châu đen', price: 5000 },
  { name: 'Thạch cà phê', price: 5000 },
  { name: 'Kem cheese', price: 8000 },
  { name: 'Pudding trứng', price: 7000 }
];

const SUGAR_ICE_OPTIONS = ['100% đường', '70% đường', '50% đường', '30% đường', 'Bình thường đá', 'Ít đá', 'Không đá'];

const PLACEHOLDER_IMG = 'https://via.placeholder.com/400x300?text=Kinjo+Coffee';

const products = [
  {
    name: 'Espresso', category: 'Cà Phê Máy', price: 39000,
    description: 'Cà phê espresso nguyên chất, đậm đà, rang xay chuẩn Ý.',
    isNew: true, isBestSeller: false, stock: 50, image: PLACEHOLDER_IMG,
    sizes: DRINK_SIZES, toppings: DRINK_TOPPINGS, sugarIceOptions: SUGAR_ICE_OPTIONS
  },
  {
    name: 'Latte Caramel', category: 'Cà Phê Máy', price: 48000,
    description: 'Sự kết hợp giữa espresso, sữa tươi đánh bông và caramel béo ngậy.',
    isNew: true, isBestSeller: true, stock: 50, image: PLACEHOLDER_IMG,
    sizes: DRINK_SIZES, toppings: DRINK_TOPPINGS, sugarIceOptions: SUGAR_ICE_OPTIONS
  },
  {
    name: 'Trà Đào Cam Sả', category: 'Trà & Đá Xay', price: 42000,
    description: 'Trà đào thanh mát kết hợp cam tươi và sả thơm dịu.',
    isNew: true, isBestSeller: true, stock: 50, image: PLACEHOLDER_IMG,
    sizes: DRINK_SIZES, toppings: DRINK_TOPPINGS, sugarIceOptions: SUGAR_ICE_OPTIONS
  },
  {
    name: 'Cà Phê Arabica Đà Lạt', category: 'Cà Phê Phin', price: 45000,
    description: 'Hạt Arabica Đà Lạt rang mộc, hương thơm nhẹ nhàng, vị chua thanh đặc trưng.',
    isNew: false, isBestSeller: true, stock: 42, image: PLACEHOLDER_IMG,
    sizes: DRINK_SIZES, toppings: DRINK_TOPPINGS, sugarIceOptions: SUGAR_ICE_OPTIONS
  },
  {
    name: 'Cà Phê Robusta Buôn Ma Thuột', category: 'Cà Phê Phin', price: 40000,
    description: 'Robusta nguyên chất Buôn Ma Thuột, đậm vị, hậu vị đắng nhẹ đặc trưng Tây Nguyên.',
    isNew: false, isBestSeller: true, stock: 69, image: PLACEHOLDER_IMG,
    sizes: DRINK_SIZES, toppings: DRINK_TOPPINGS, sugarIceOptions: SUGAR_ICE_OPTIONS
  },
  {
    name: 'Cold Brew Concentrate', category: 'Cà Phê Pha Sẵn', price: 45000,
    description: 'Cà phê ủ lạnh 12 giờ, vị êm dịu, ít chua, giữ trọn hương thơm nguyên bản.',
    isNew: false, isBestSeller: false, stock: 46, image: PLACEHOLDER_IMG,
    sizes: DRINK_SIZES, toppings: DRINK_TOPPINGS, sugarIceOptions: SUGAR_ICE_OPTIONS
  },
  {
    name: 'Cà Phê Muối Độc Trung', category: 'Cà Phê Phin', price: 45000,
    description: 'Cà phê muối beo béo, thơm nồng, gây thương nhớ ngay từ ngụm đầu tiên.',
    isNew: false, isBestSeller: false, stock: 52, image: PLACEHOLDER_IMG,
    sizes: DRINK_SIZES, toppings: DRINK_TOPPINGS, sugarIceOptions: SUGAR_ICE_OPTIONS
  },
  {
    name: 'Bánh Tiramisu Cà Phê', category: 'Bánh Ngọt', price: 35000,
    description: 'Bánh tiramisu phủ cacao, tầng kem mascarpone béo mịn, thấm vị espresso.',
    isNew: false, isBestSeller: false, stock: 20, image: PLACEHOLDER_IMG,
    sizes: [], toppings: [], sugarIceOptions: []
  }
];

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log('Đã kết nối MongoDB:', MONGODB_URI);

  const existingCount = await Product.countDocuments();
  if (existingCount > 0) {
    console.log(`Database đã có ${existingCount} sản phẩm — script dừng lại để tránh tạo trùng.`);
    console.log('Nếu vẫn muốn thêm dữ liệu mẫu, hãy xóa toàn bộ sản phẩm cũ trước hoặc chỉnh sửa script.');
    await mongoose.disconnect();
    return;
  }

  const created = await Product.insertMany(products);
  console.log(`Đã tạo ${created.length} sản phẩm mẫu, đầy đủ size/topping/đường-đá.`);

  await mongoose.disconnect();
}

run().catch(err => {
  console.error('Lỗi:', err);
  process.exit(1);
});
