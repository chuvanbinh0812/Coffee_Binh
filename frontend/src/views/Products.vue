<template>
  <div class="products-page">

    <!-- Hero banner nhỏ -->
    <div class="products-hero">
      <div class="container text-center py-5">
        <h1 class="text-white mb-2">Thực Đơn Cà Phê</h1>
        <p class="text-white-50 mb-0">Tất cả hương vị cà phê chọn lọc kỹ càng dành cho bạn</p>
      </div>
    </div>

    <div class="container py-5">
      <div class="row g-4">

        <!-- Sidebar lọc -->
        <div class="col-lg-3">
          <div class="filter-panel">

            <!-- Tìm kiếm -->
            <div class="filter-section">
              <h6 class="filter-title">Tìm Kiếm</h6>
              <input
                type="text"
                class="form-control"
                v-model="search"
                placeholder="Tên món..."
              />
            </div>

            <!-- Danh mục -->
            <div class="filter-section">
              <h6 class="filter-title">Danh Mục</h6>
              <div class="category-list">
                <label class="category-item" :class="{ active: category === '' }">
                  <input type="radio" v-model="category" value="" hidden />
                  <span>Tất cả</span>
                  <span class="cat-count">{{ products.length }}</span>
                </label>
                <label
                  v-for="cat in categories"
                  :key="cat"
                  class="category-item"
                  :class="{ active: category === cat }"
                >
                  <input type="radio" v-model="category" :value="cat" hidden />
                  <span>{{ cat }}</span>
                  <span class="cat-count">{{ products.filter(p => p.category === cat).length }}</span>
                </label>
              </div>
            </div>

            <!-- Khoảng giá -->
            <div class="filter-section">
              <h6 class="filter-title">Khoảng Giá</h6>
              <div class="d-flex gap-2 align-items-center mb-2">
                <input type="number" class="form-control form-control-sm" v-model="minPrice" placeholder="Từ" />
                <span class="text-muted">—</span>
                <input type="number" class="form-control form-control-sm" v-model="maxPrice" placeholder="Đến" />
              </div>
              <div class="text-muted small">
                {{ minPrice ? formatPrice(minPrice) : '0 ₫' }} — {{ maxPrice ? formatPrice(maxPrice) : 'Tất cả' }}
              </div>
            </div>

            <!-- Đánh giá -->
            <div class="filter-section">
              <h6 class="filter-title">Đánh Giá Từ</h6>
              <div class="d-flex gap-2 flex-wrap">
                <button
                  v-for="r in [0, 3, 4, 4.5]"
                  :key="r"
                  class="btn btn-sm"
                  :class="minRating === r ? 'btn-brown' : 'btn-outline-secondary'"
                  @click="minRating = r"
                >
                  {{ r === 0 ? 'Tất cả' : r + '★+' }}
                </button>
              </div>
            </div>

            <!-- Nút reset -->
            <button class="btn btn-outline-secondary w-100 mt-2" @click="resetFilters">
              ↺ Xóa bộ lọc
            </button>
          </div>
        </div>

        <!-- Phần sản phẩm -->
        <div class="col-lg-9">

          <!-- Toolbar trên -->
          <div class="products-toolbar mb-4">
            <div class="text-muted small">
              Hiển thị <strong>{{ filteredProducts.length }}</strong> / {{ products.length }} sản phẩm
            </div>
            <div class="d-flex align-items-center gap-2">
              <span class="text-muted small">Sắp xếp:</span>
              <select class="form-select form-select-sm" v-model="sortBy" style="width: auto;">
                <option value="newest">Mới nhất</option>
                <option value="price-asc">Giá thấp → cao</option>
                <option value="price-desc">Giá cao → thấp</option>
                <option value="rating">Đánh giá cao nhất</option>
                <option value="popular">Bán chạy nhất</option>
              </select>
              <!-- Toggle grid/list -->
              <button class="btn btn-sm btn-outline-secondary" @click="gridCols = gridCols === 3 ? 2 : 3">
                {{ gridCols === 3 ? '⊞' : '▦' }}
              </button>
            </div>
          </div>

          <!-- Loading -->
          <div v-if="loading" class="text-center py-5">
            <div class="spinner-border text-secondary"></div>
            <p class="text-muted mt-2 small">Đang tải sản phẩm...</p>
          </div>

          <!-- Không có sản phẩm -->
          <div v-else-if="filteredProducts.length === 0" class="text-center py-5 text-muted">
            <div style="font-size: 3rem;">☕</div>
            <p>Không tìm thấy món phù hợp.</p>
            <button class="btn btn-brown" @click="resetFilters">Xóa bộ lọc</button>
          </div>

          <!-- Grid sản phẩm -->
          <div v-else :class="`row g-4 row-cols-1 row-cols-sm-2 row-cols-md-${gridCols}`">
            <div v-for="product in filteredProducts" :key="product._id || product.id" class="col">
              <ProductCard :product="product" />
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import ProductCard from '../components/ProductCard.vue';

const img = (label) => `https://placehold.co/500x600/2b1c12/f7f0e1?text=${encodeURIComponent(label)}`;

const defaultProducts = [
  { id: 1, name: 'Cà Phê Đen Đá', category: 'Cà Phê Phin', price: 29000, rating: 4.8, reviews: 128, image: img('Cà Phê Đen Đá'), isNew: false, isBestSeller: true, description: 'Hạt Robusta rang mộc, vị đắng đậm đà, thơm nồng đặc trưng.' },
  { id: 2, name: 'Cà Phê Sữa Đá', category: 'Cà Phê Phin', price: 32000, rating: 4.9, reviews: 210, image: img('Cà Phê Sữa Đá'), isNew: false, isBestSeller: true, description: 'Cà phê phin truyền thống hòa cùng sữa đặc béo ngậy, đá mát lạnh.' },
  { id: 3, name: 'Bạc Xỉu', category: 'Cà Phê Phin', price: 35000, rating: 4.7, reviews: 96, image: img('Bạc Xỉu'), isNew: false, isBestSeller: false, description: 'Nhiều sữa hơn cà phê, vị béo nhẹ nhàng, dễ uống cho mọi lứa tuổi.' },
  { id: 4, name: 'Espresso', category: 'Cà Phê Máy', price: 39000, rating: 4.6, reviews: 74, image: img('Espresso'), isNew: true, isBestSeller: false, description: 'Chiết xuất cô đặc từ hạt Arabica rang đậm, dậy hương mạnh mẽ.' },
  { id: 5, name: 'Cappuccino', category: 'Cà Phê Máy', price: 45000, rating: 4.8, reviews: 133, image: img('Cappuccino'), isNew: false, isBestSeller: true, description: 'Espresso hòa quyện lớp bọt sữa mịn màng, rắc thêm bột cacao.' },
  { id: 6, name: 'Latte Caramel', category: 'Cà Phê Máy', price: 48000, rating: 4.7, reviews: 88, image: img('Latte Caramel'), isNew: true, isBestSeller: false, description: 'Sữa tươi hấp nóng cùng espresso, thêm sốt caramel ngọt dịu.' },
  { id: 7, name: 'Trà Đào Cam Sả', category: 'Trà & Đá Xay', price: 42000, rating: 4.9, reviews: 156, image: img('Trà Đào Cam Sả'), isNew: true, isBestSeller: true, description: 'Trà ô long thanh mát kết hợp đào ngâm, cam tươi và sả thơm.' },
  { id: 8, name: 'Matcha Đá Xay', category: 'Trà & Đá Xay', price: 49000, rating: 4.6, reviews: 67, image: img('Matcha Đá Xay'), isNew: false, isBestSeller: false, description: 'Bột trà xanh Nhật Bản nguyên chất, xay cùng sữa tươi mát lạnh.' },
  { id: 9, name: 'Cold Brew Nguyên Chất', category: 'Cà Phê Phin', price: 45000, rating: 4.8, reviews: 59, image: img('Cold Brew'), isNew: true, isBestSeller: false, description: 'Ủ lạnh 12 giờ, vị êm dịu, hậu ngọt thanh, ít axit hơn cà phê pha nóng.' },
  { id: 10, name: 'Bánh Tiramisu', category: 'Bánh Ngọt', price: 39000, rating: 4.7, reviews: 45, image: img('Tiramisu'), isNew: false, isBestSeller: false, description: 'Lớp bông lan thấm cà phê, phô mai mascarpone béo mịn, phủ cacao.' },
];

const products = ref([]);
const loading = ref(false);
const search = ref('');
const category = ref('');
const sortBy = ref('newest');
const minPrice = ref('');
const maxPrice = ref('');
const minRating = ref(0);
const gridCols = ref(3);

const formatPrice = (p) => Number(p).toLocaleString('vi-VN');

const categories = computed(() => [...new Set(products.value.map(p => p.category))]);

const filteredProducts = computed(() => {
  let list = products.value;

  if (search.value.trim()) {
    list = list.filter(p => p.name.toLowerCase().includes(search.value.toLowerCase()));
  }
  if (category.value) {
    list = list.filter(p => p.category === category.value);
  }
  if (minPrice.value) {
    list = list.filter(p => p.price >= Number(minPrice.value));
  }
  if (maxPrice.value) {
    list = list.filter(p => p.price <= Number(maxPrice.value));
  }
  if (minRating.value > 0) {
    list = list.filter(p => p.rating >= minRating.value);
  }

  switch (sortBy.value) {
    case 'newest':      return [...list].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    case 'price-asc':   return [...list].sort((a, b) => a.price - b.price);
    case 'price-desc':  return [...list].sort((a, b) => b.price - a.price);
    case 'rating':      return [...list].sort((a, b) => b.rating - a.rating);
    case 'popular':     return [...list].sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    default:            return list;
  }
});

const resetFilters = () => {
  search.value = '';
  category.value = '';
  sortBy.value = 'newest';
  minPrice.value = '';
  maxPrice.value = '';
  minRating.value = 0;
};

onMounted(async () => {
  loading.value = true;
  try {
    const res = await axios.get('/api/products');
    products.value = res.data.length ? res.data : defaultProducts;
  } catch {
    products.value = defaultProducts;
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.products-hero {
  background: #2a1c12;
  border-bottom: 3px solid #b3502c;
  min-height: 160px;
  display: flex;
  align-items: center;
}
.products-hero h1 { font-family: 'Bebas Neue', sans-serif; letter-spacing: 2px; font-size: 2.6rem; }

/* ===== Filter panel ===== */
.filter-panel {
  background: #f8f0e1;
  border: 1px solid #ddc9a0;
  border-radius: 2px;
  padding: 20px;
  position: sticky;
  top: 80px;
}
.filter-section {
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ddc9a0;
}
.filter-section:last-child { border-bottom: none; margin-bottom: 0; }
.filter-title {
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #2a1c12;
  margin-bottom: 12px;
}

.category-list { display: flex; flex-direction: column; gap: 6px; }
.category-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 10px;
  border-radius: 0;
  cursor: pointer;
  font-size: 0.88rem;
  color: #6b5646;
  transition: background 0.15s;
}
.category-item:hover { background: #efe1c3; color: #2a1c12; }
.category-item.active { background: #2a1c12; color: #f8f0e1; font-weight: 600; }
.cat-count {
  background: #efe1c3;
  color: #888;
  border-radius: 0;
  padding: 1px 8px;
  font-family: 'Space Mono', monospace;
  font-size: 0.72rem;
}
.category-item.active .cat-count { background: #b3502c; color: #f8f0e1; }

/* ===== Toolbar ===== */
.products-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8f0e1;
  border: 1px solid #ddc9a0;
  padding: 12px 16px;
  border-radius: 2px;
}

.btn-brown {
  background-color: #2a1c12;
  border-color: #2a1c12;
  border-radius: 0;
  color: white;
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  text-transform: uppercase;
}
.btn-brown:hover { background-color: #6f4423; border-color: #6f4423; color: white; }
</style>