<template>
  <div class="products-admin">

    <!-- Toolbar -->
    <div class="toolbar mb-4">
      <div>
        <span class="page-eyebrow">Thực đơn</span>
        <h5 class="page-title">Tất cả món ({{ products.length }})</h5>
      </div>
      <div class="toolbar-actions">
        <input
          v-model="search"
          type="text"
          class="search-box"
          placeholder="Tìm theo tên món..."
        />
        <select v-model="filterCategory" class="cat-filter">
          <option value="">Tất cả danh mục</option>
          <option v-for="c in categoryOptions" :key="c" :value="c">{{ c }}</option>
        </select>
        <button class="btn-add" @click="openAddForm">+ Thêm món mới</button>
      </div>
    </div>

    <!-- Add/Edit Form -->
    <div v-if="showAddForm || editingProduct" class="product-form-card mb-4">
      <div class="form-card-header">
        <h5 class="mb-0">{{ editingProduct ? 'Sửa món' : 'Thêm món mới' }}</h5>
        <button class="btn-close-form" @click="cancelForm">✕</button>
      </div>
      <form @submit.prevent="saveProduct" class="p-4">
        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label">Tên món</label>
            <input type="text" class="form-control" v-model="productForm.name" placeholder="VD: Cà Phê Sữa Đá" required />
          </div>
          <div class="col-md-6">
            <label class="form-label">Danh mục</label>
            <select class="form-select" v-model="productForm.category" required>
              <option value="" disabled>-- Chọn danh mục --</option>
              <option v-for="c in categoryOptions" :key="c" :value="c">{{ c }}</option>
            </select>
          </div>
          <div class="col-md-6">
            <label class="form-label">Giá bán cơ bản (₫)</label>
            <input type="number" class="form-control" v-model="productForm.price" placeholder="35000" required />
          </div>
          <div class="col-md-6">
            <label class="form-label">Số lượng tồn</label>
            <input type="number" class="form-control" v-model="productForm.stock" placeholder="50" required />
          </div>

          <!-- Size ly -->
          <div class="col-12">
            <label class="form-label d-flex justify-content-between align-items-center">
              <span>Size ly <span class="text-muted small fw-normal">(giá cộng thêm so với giá cơ bản)</span></span>
              <button type="button" class="btn-add-row" @click="addSize">+ Thêm size</button>
            </label>
            <div v-if="productForm.sizes.length === 0" class="empty-hint">Chưa có size — nếu để trống, khách sẽ không cần chọn size.</div>
            <div v-for="(s, i) in productForm.sizes" :key="i" class="option-row">
              <input type="text" class="form-control" v-model="s.name" placeholder="VD: S, M, L" />
              <input type="number" class="form-control" v-model="s.priceDelta" placeholder="+0" />
              <button type="button" class="btn-remove-row" @click="productForm.sizes.splice(i,1)">✕</button>
            </div>
          </div>

          <!-- Topping -->
          <div class="col-12">
            <label class="form-label d-flex justify-content-between align-items-center">
              <span>Topping thêm <span class="text-muted small fw-normal">(trân châu, thạch, kem cheese...)</span></span>
              <button type="button" class="btn-add-row" @click="addTopping">+ Thêm topping</button>
            </label>
            <div v-if="productForm.toppings.length === 0" class="empty-hint">Chưa có topping cho món này.</div>
            <div v-for="(t, i) in productForm.toppings" :key="i" class="option-row">
              <input type="text" class="form-control" v-model="t.name" placeholder="VD: Trân châu đen" />
              <input type="number" class="form-control" v-model="t.price" placeholder="+5000" />
              <button type="button" class="btn-remove-row" @click="productForm.toppings.splice(i,1)">✕</button>
            </div>
          </div>

          <!-- Đường / đá -->
          <div class="col-12">
            <label class="form-label">Mức đường / đá <span class="text-muted small fw-normal">(không cộng thêm tiền, phân cách bằng dấu phẩy)</span></label>
            <input type="text" class="form-control" v-model="productForm.sugarIceOptions" placeholder="100% đường, 70% đường, 50% đường, Ít đá, Không đá" />
          </div>

          <div class="col-12">
            <label class="form-label">Mô tả</label>
            <textarea class="form-control" v-model="productForm.description" placeholder="Mô tả hương vị, thành phần..." rows="3"></textarea>
          </div>

          <div class="col-12">
            <label class="form-label">Hình ảnh món</label>
            <input type="file" class="form-control" accept="image/*" @change="onFileChange" />
            <div v-if="imagePreview" class="mt-2">
              <img :src="imagePreview" alt="Preview" class="img-preview" />
            </div>
            <div v-else-if="editingProduct?.image" class="mt-2">
              <img :src="editingProduct.image" alt="Ảnh hiện tại" class="img-preview" />
              <p class="text-muted small mt-1">Ảnh hiện tại — chọn file mới để thay thế</p>
            </div>
          </div>

          <div class="col-md-3">
            <div class="form-check">
              <input type="checkbox" class="form-check-input" v-model="productForm.isNew" id="chkNew" />
              <label class="form-check-label" for="chkNew">Món mới</label>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-check">
              <input type="checkbox" class="form-check-input" v-model="productForm.isBestSeller" id="chkBest" />
              <label class="form-check-label" for="chkBest">Bán chạy</label>
            </div>
          </div>

          <div class="col-12 d-flex gap-2 pt-2">
            <button type="submit" class="btn-save" :disabled="saving">
              {{ saving ? 'Đang lưu...' : (editingProduct ? 'Cập nhật' : 'Thêm mới') }}
            </button>
            <button type="button" class="btn-cancel" @click="cancelForm">Hủy</button>
          </div>
        </div>
      </form>
    </div>

    <!-- Products Grid -->
    <div v-if="filteredProducts.length === 0" class="empty-state">
      <div class="hanko-stamp empty-stamp">金</div>
      <p class="text-muted mt-3">Chưa có món nào phù hợp.</p>
    </div>

    <div v-else class="product-grid">
      <div v-for="product in filteredProducts" :key="product._id" class="product-card">
        <div class="product-card-img">
          <img :src="product.image" :alt="product.name" />
          <span v-if="product.isNew" class="pc-badge pc-new">Mới</span>
          <span v-else-if="product.isBestSeller" class="pc-badge pc-hot">Bán chạy</span>
          <span v-if="product.stock === 0" class="pc-badge pc-out">Hết hàng</span>
        </div>
        <div class="product-card-body">
          <div class="pc-category">{{ product.category }}</div>
          <h6 class="pc-name">{{ product.name }}</h6>
          <div class="pc-variant" v-if="product.sizes?.length || product.toppings?.length">
            <span v-if="product.sizes?.length">{{ product.sizes.length }} size</span>
            <span v-if="product.sizes?.length && product.toppings?.length"> · </span>
            <span v-if="product.toppings?.length">{{ product.toppings.length }} topping</span>
          </div>
          <div class="pc-footer">
            <span class="pc-price">{{ formatPrice(product.price) }}</span>
            <span class="pc-stock" :class="{ low: product.stock > 0 && product.stock <= 5 }">
              Tồn: {{ product.stock }}
            </span>
          </div>
          <div class="pc-actions">
            <button class="btn-edit" @click="editProduct(product)">Sửa</button>
            <button class="btn-delete" @click="deleteProduct(product._id)">Xóa</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const auth = useAuthStore();
const products = ref([]);
const showAddForm = ref(false);
const editingProduct = ref(null);
const imageFile = ref(null);
const imagePreview = ref('');
const saving = ref(false);
const search = ref('');
const filterCategory = ref('');

const categoryOptions = ['Cà Phê Phin', 'Cà Phê Máy', 'Trà & Đá Xay', 'Bánh Ngọt'];

const emptyForm = () => ({
  name: '', category: '', price: 0,
  description: '', stock: 10,
  isNew: false, isBestSeller: false,
  sizes: [], toppings: [], sugarIceOptions: ''
});

const productForm = ref(emptyForm());

const formatPrice = (price) => price.toLocaleString('vi-VN') + ' ₫';

const addSize = () => productForm.value.sizes.push({ name: '', priceDelta: 0 });
const addTopping = () => productForm.value.toppings.push({ name: '', price: 0 });

const filteredProducts = computed(() => {
  return products.value.filter(p => {
    const matchesSearch = !search.value || p.name?.toLowerCase().includes(search.value.toLowerCase());
    const matchesCategory = !filterCategory.value || p.category === filterCategory.value;
    return matchesSearch && matchesCategory;
  });
});

const onFileChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  imageFile.value = file;
  imagePreview.value = URL.createObjectURL(file);
};

const loadProducts = async () => {
  try {
    const res = await axios.get('/api/products');
    products.value = res.data;
  } catch (error) {
    alert('Không thể tải danh sách món.');
  }
};

const openAddForm = () => {
  editingProduct.value = null;
  productForm.value = emptyForm();
  imageFile.value = null;
  imagePreview.value = '';
  showAddForm.value = true;
};

const saveProduct = async () => {
  saving.value = true;
  try {
    const config = { headers: { Authorization: `Bearer ${auth.token}` } };
    const formData = new FormData();
    formData.append('name', productForm.value.name);
    formData.append('category', productForm.value.category);
    formData.append('price', productForm.value.price);
    formData.append('stock', productForm.value.stock);
    formData.append('description', productForm.value.description);
    formData.append('isNew', productForm.value.isNew);
    formData.append('isBestSeller', productForm.value.isBestSeller);
    formData.append('sizes', JSON.stringify(
      productForm.value.sizes.filter(s => s.name?.trim())
    ));
    formData.append('toppings', JSON.stringify(
      productForm.value.toppings.filter(t => t.name?.trim())
    ));
    formData.append('sugarIceOptions', productForm.value.sugarIceOptions);
    if (imageFile.value) {
      formData.append('image', imageFile.value);
    }

    if (editingProduct.value) {
      await axios.put(`/api/products/${editingProduct.value._id}`, formData, config);
    } else {
      await axios.post('/api/products', formData, config);
    }

    await loadProducts();
    cancelForm();
  } catch (error) {
    alert(error.response?.data?.message || 'Lỗi khi lưu món!');
  } finally {
    saving.value = false;
  }
};

const editProduct = (product) => {
  editingProduct.value = product;
  productForm.value = {
    name: product.name,
    category: product.category,
    price: product.price,
    stock: product.stock,
    description: product.description,
    isNew: product.isNew,
    isBestSeller: product.isBestSeller,
    sizes: (product.sizes || []).map(s => ({ ...s })),
    toppings: (product.toppings || []).map(t => ({ ...t })),
    sugarIceOptions: (product.sugarIceOptions || []).join(', ')
  };
  imageFile.value = null;
  imagePreview.value = '';
  showAddForm.value = true;
};

const deleteProduct = async (id) => {
  if (!confirm('Bạn chắc chắn muốn xóa món này?')) return;
  try {
    const config = { headers: { Authorization: `Bearer ${auth.token}` } };
    await axios.delete(`/api/products/${id}`, config);
    await loadProducts();
  } catch (error) {
    alert(error.response?.data?.message || 'Lỗi khi xóa!');
  }
};

const cancelForm = () => {
  showAddForm.value = false;
  editingProduct.value = null;
  imageFile.value = null;
  imagePreview.value = '';
  productForm.value = emptyForm();
};

onMounted(loadProducts);
</script>

<style scoped>
.products-admin { font-family: var(--font-body); }

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 14px;
}
.page-eyebrow {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.66rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--hanko);
  margin-bottom: 4px;
}
.page-title {
  font-family: var(--font-display);
  font-size: 1.35rem;
  letter-spacing: 0.5px;
  color: var(--ink);
  margin: 0;
}

.toolbar-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}
.search-box, .cat-filter {
  border: 1px solid var(--line);
  border-radius: 3px;
  padding: 8px 12px;
  font-size: 0.85rem;
  background: var(--paper);
  color: var(--ink);
}
.search-box { width: 220px; }
.cat-filter { width: 170px; }
.search-box:focus, .cat-filter:focus { outline: none; border-color: var(--indigo); }

.btn-add {
  background: var(--indigo);
  color: var(--paper);
  border: none;
  padding: 9px 20px;
  border-radius: 3px;
  font-weight: 600;
  font-size: 0.86rem;
  transition: background 0.2s;
}
.btn-add:hover { background: var(--indigo-deep); }

/* ===== Form card ===== */
.product-form-card {
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 3px;
  overflow: hidden;
}
.form-card-header {
  background: var(--paper-dim);
  padding: 14px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--line);
}
.form-card-header h5 {
  font-family: var(--font-display);
  letter-spacing: 0.5px;
  color: var(--ink);
}
.btn-close-form {
  background: none;
  border: none;
  font-size: 1.1rem;
  color: var(--ink-soft);
  cursor: pointer;
}
.form-label { font-size: 0.82rem; font-weight: 600; color: var(--ink); }
.form-control, .form-select {
  border-color: var(--line);
  border-radius: 3px;
}
.form-control:focus, .form-select:focus {
  border-color: var(--indigo);
  box-shadow: 0 0 0 3px rgba(111,68,35,0.12);
}
.img-preview {
  height: 120px;
  object-fit: cover;
  border-radius: 3px;
  border: 1px solid var(--line);
}

.btn-add-row {
  background: none;
  border: 1px solid var(--indigo);
  color: var(--indigo);
  border-radius: 3px;
  font-size: 0.76rem;
  padding: 3px 10px;
}
.btn-add-row:hover { background: var(--indigo); color: var(--paper); }
.empty-hint { font-size: 0.8rem; color: var(--ink-soft); font-style: italic; margin-bottom: 6px; }
.option-row {
  display: grid;
  grid-template-columns: 2fr 1fr 32px;
  gap: 8px;
  margin-bottom: 8px;
}
.btn-remove-row {
  background: none;
  border: 1px solid var(--line);
  border-radius: 3px;
  color: var(--hanko);
}
.btn-remove-row:hover { background: #f6e9e8; }

.btn-save {
  background: var(--indigo);
  color: var(--paper);
  border: none;
  padding: 9px 22px;
  border-radius: 3px;
  font-weight: 600;
}
.btn-save:hover { background: var(--indigo-deep); }
.btn-save:disabled { opacity: 0.6; }
.btn-cancel {
  background: transparent;
  border: 1px solid var(--line);
  color: var(--ink);
  padding: 9px 22px;
  border-radius: 3px;
}
.btn-cancel:hover { background: var(--paper-dim); }

/* ===== Empty state ===== */
.empty-state { text-align: center; padding: 70px 0; }
.empty-stamp {
  width: 56px; height: 56px;
  font-size: 1.3rem;
  margin: 0 auto;
  color: var(--line);
  border-color: var(--line);
}

/* ===== Product grid ===== */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 18px;
}
.product-card {
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 3px;
  overflow: hidden;
  transition: transform 0.2s, border-color 0.2s;
}
.product-card:hover { transform: translateY(-4px); border-color: var(--indigo); }

.product-card-img { position: relative; height: 140px; overflow: hidden; }
.product-card-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; }
.product-card:hover .product-card-img img { transform: scale(1.05); }

.pc-badge {
  position: absolute;
  top: 8px; left: 8px;
  font-size: 0.62rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 3px 8px;
  border-radius: 3px;
  color: var(--paper);
}
.pc-new { background: var(--indigo); }
.pc-hot { background: var(--hanko); }
.pc-out { left: auto; right: 8px; top: 8px; background: #555; }

.product-card-body { padding: 14px; }
.pc-category {
  font-family: var(--font-mono);
  font-size: 0.64rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--ink-soft);
  margin-bottom: 3px;
}
.pc-name {
  font-weight: 700;
  color: var(--ink);
  margin-bottom: 4px;
  min-height: 2.4em;
}
.pc-variant {
  font-size: 0.72rem;
  color: var(--hanko);
  margin-bottom: 8px;
}
.pc-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.pc-price { font-weight: 700; color: var(--indigo); }
.pc-stock { font-size: 0.78rem; color: var(--ink-soft); }
.pc-stock.low { color: var(--hanko); font-weight: 600; }

.pc-actions { display: flex; gap: 8px; }
.btn-edit, .btn-delete {
  flex: 1;
  padding: 6px 0;
  border-radius: 3px;
  font-size: 0.8rem;
  border: 1px solid var(--line);
  background: transparent;
  color: var(--ink);
  transition: background 0.15s;
}
.btn-edit:hover { background: var(--paper-dim); }
.btn-delete { color: var(--hanko); border-color: var(--hanko); }
.btn-delete:hover { background: #f6e9e8; }

@media (max-width: 600px) {
  .toolbar-actions { width: 100%; }
  .search-box, .cat-filter { flex: 1; width: auto; }
}
</style>
