// Script chạy 1 lần để thêm size / topping / mức đường-đá mẫu
// cho các món cà phê đã tạo từ trước (chưa có dữ liệu này).
//
// Cách chạy: đứng trong thư mục backend rồi gõ:
//   node scripts/addProductOptions.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../src/models/Product.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/Kinjo-Fashion';

// Bộ tùy chọn mặc định áp dụng theo từng danh mục
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

// Danh mục đồ uống sẽ được gắn đủ size + topping + đường/đá
const DRINK_CATEGORIES = ['Cà Phê Phin', 'Cà Phê Máy', 'Trà & Đá Xay'];

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log('Đã kết nối MongoDB:', MONGODB_URI);

  const products = await Product.find();
  console.log(`Tìm thấy ${products.length} sản phẩm.`);

  let updated = 0;

  for (const p of products) {
    const alreadyHasOptions =
      (p.sizes && p.sizes.length > 0) ||
      (p.toppings && p.toppings.length > 0) ||
      (p.sugarIceOptions && p.sugarIceOptions.length > 0);

    if (alreadyHasOptions) {
      console.log(`- Bỏ qua "${p.name}" (đã có dữ liệu size/topping).`);
      continue;
    }

    if (DRINK_CATEGORIES.includes(p.category)) {
      p.sizes = DRINK_SIZES;
      p.toppings = DRINK_TOPPINGS;
      p.sugarIceOptions = SUGAR_ICE_OPTIONS;
    } else {
      // Bánh ngọt / món không phải đồ uống: không cần size ly hay đường đá
      p.sizes = [];
      p.toppings = [];
      p.sugarIceOptions = [];
    }

    await p.save();
    updated++;
    console.log(`✓ Đã cập nhật "${p.name}" (${p.category})`);
  }

  console.log(`\nHoàn tất! Đã cập nhật ${updated}/${products.length} sản phẩm.`);
  await mongoose.disconnect();
}

run().catch(err => {
  console.error('Lỗi:', err);
  process.exit(1);
});
