// Script cập nhật ảnh thật (miễn phí bản quyền, nguồn Pexels) cho các món
// đang dùng ảnh placeholder tạm thời.
//
// Cách chạy: đứng trong thư mục backend rồi gõ:
//   node scripts/updateProductImages.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../src/models/Product.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/Kinjo-Fashion';

const img = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=800`;

// Khớp theo tên món (đúng với dữ liệu tạo bởi seedProducts.js)
const IMAGE_MAP = {
  'Espresso':                        img(9050518),
  'Latte Caramel':                   img(171346),
  'Trà Đào Cam Sả':                  img(5598273),
  'Cà Phê Arabica Đà Lạt':           img(773958),
  'Cà Phê Robusta Buôn Ma Thuột':    img(4302269),
  'Cold Brew Concentrate':           img(34170574),
  'Cà Phê Muối Độc Trung':           img(12703064),
  'Bánh Tiramisu Cà Phê':            img(14766327)
};

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log('Đã kết nối MongoDB:', MONGODB_URI);

  let updated = 0;

  for (const [name, imageUrl] of Object.entries(IMAGE_MAP)) {
    const result = await Product.updateOne({ name }, { $set: { image: imageUrl } });
    if (result.matchedCount > 0) {
      console.log(`✓ Đã cập nhật ảnh cho "${name}"`);
      updated++;
    } else {
      console.log(`- Không tìm thấy món "${name}" trong database, bỏ qua.`);
    }
  }

  console.log(`\nHoàn tất! Đã cập nhật ảnh cho ${updated} món.`);
  await mongoose.disconnect();
}

run().catch(err => {
  console.error('Lỗi:', err);
  process.exit(1);
});
