<template>
  <div class="container my-5">
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-secondary"></div>
    </div>

    <div v-else-if="product" class="row g-5">
      <!-- Ảnh sản phẩm -->
      <div class="col-md-5">
        <img
          :src="product.image"
          :alt="product.name"
          class="img-fluid rounded-3 shadow"
          style="width:100%; max-height:420px; object-fit:cover;"
        />
      </div>

      <!-- Thông tin sản phẩm -->
      <div class="col-md-7">
        <span class="badge bg-warning text-dark mb-2" v-if="product.isNew">Mới</span>
        <span class="badge bg-danger mb-2 ms-1" v-if="product.isBestSeller">Bán chạy</span>

        <h1 class="mb-2">{{ product.name }}</h1>

        <div class="d-flex align-items-center gap-2 mb-3">
          <div class="stars">
            <span v-for="i in 5" :key="i" :class="i <= Math.round(product.rating) ? 'text-warning' : 'text-muted'">★</span>
          </div>
          <span class="text-muted small">{{ product.rating }} ({{ product.reviews }} đánh giá)</span>
        </div>

<<<<<<< HEAD
        <div class="fs-3 fw-bold text-brown mb-3">{{ formatPrice(unitPrice) }}</div>
=======
        <div class="fs-3 fw-bold text-brown mb-3">{{ formatPrice(product.price) }}</div>
>>>>>>> 6644a9b3829b34f1e619ed6d01c457846ddf0d75

        <p class="text-muted mb-4">{{ product.description }}</p>

        <div class="d-flex align-items-center gap-2 mb-3">
          <span class="small text-muted">Danh mục:</span>
          <span class="badge bg-light text-dark border">{{ product.category }}</span>
        </div>

        <!-- Chọn size ly -->
        <div v-if="product.sizes && product.sizes.length" class="mb-3">
<<<<<<< HEAD
          <span class="small text-muted d-block mb-2">Size ly: <span class="text-danger">*</span></span>
          <div class="d-flex gap-2 flex-wrap">
            <button
              v-for="s in product.sizes" :key="s.name"
              type="button"
              class="btn btn-sm"
              :class="selectedSize === s.name ? 'btn-brown' : 'btn-outline-secondary'"
              @click="selectedSize = s.name"
            >{{ s.name }}<span v-if="s.priceDelta"> (+{{ formatPrice(s.priceDelta) }})</span></button>
          </div>
        </div>

        <!-- Chọn mức đường / đá -->
        <div v-if="product.sugarIceOptions && product.sugarIceOptions.length" class="mb-3">
          <span class="small text-muted d-block mb-2">Đường / đá:</span>
          <div class="d-flex gap-2 flex-wrap">
            <button
              v-for="opt in product.sugarIceOptions" :key="opt"
              type="button"
              class="btn btn-sm"
              :class="selectedSugarIce === opt ? 'btn-brown' : 'btn-outline-secondary'"
              @click="selectedSugarIce = opt"
            >{{ opt }}</button>
          </div>
        </div>

        <!-- Chọn topping thêm -->
        <div v-if="product.toppings && product.toppings.length" class="mb-3">
          <span class="small text-muted d-block mb-2">Topping thêm:</span>
          <div class="d-flex gap-2 flex-wrap">
            <button
              v-for="t in product.toppings" :key="t.name"
              type="button"
              class="btn btn-sm"
              :class="selectedToppings.includes(t.name) ? 'btn-brown' : 'btn-outline-secondary'"
              @click="toggleTopping(t.name)"
            >{{ t.name }}<span v-if="t.price"> (+{{ formatPrice(t.price) }})</span></button>
          </div>
        </div>

        <!-- Ghi chú thêm -->
        <div class="mb-3">
          <span class="small text-muted d-block mb-2">Ghi chú cho quán (không bắt buộc):</span>
          <input type="text" class="form-control" v-model="note" placeholder="VD: ít đá, giao trước 12h..." />
        </div>

=======
          <span class="small text-muted d-block mb-2">Size ly:</span>
          <div class="d-flex gap-2 flex-wrap">
            <button
              v-for="s in product.sizes" :key="s"
              type="button"
              class="btn btn-sm"
              :class="selectedSize === s ? 'btn-brown' : 'btn-outline-secondary'"
              @click="selectedSize = s"
            >{{ s }}</button>
          </div>
        </div>

        <!-- Chọn tùy chọn thêm -->
        <div v-if="product.colors && product.colors.length" class="mb-3">
          <span class="small text-muted d-block mb-2">Tùy chọn:</span>
          <div class="d-flex gap-2 flex-wrap">
            <button
              v-for="c in product.colors" :key="c"
              type="button"
              class="btn btn-sm"
              :class="selectedColor === c ? 'btn-brown' : 'btn-outline-secondary'"
              @click="selectedColor = c"
            >{{ c }}</button>
          </div>
        </div>

>>>>>>> 6644a9b3829b34f1e619ed6d01c457846ddf0d75
        <div class="d-flex align-items-center gap-2 mb-4">
          <span class="small text-muted">Tình trạng:</span>
          <span :class="product.stock > 0 ? 'text-success fw-semibold' : 'text-danger fw-semibold'">
            {{ product.stock > 0 ? `Còn ${product.stock} phần` : 'Tạm hết' }}
          </span>
        </div>

        <!-- Số lượng + Thêm giỏ -->
<<<<<<< HEAD
        <div class="d-flex align-items-center gap-3 flex-wrap">
=======
        <div class="d-flex align-items-center gap-3">
>>>>>>> 6644a9b3829b34f1e619ed6d01c457846ddf0d75
          <div class="input-group" style="width:130px">
            <button class="btn btn-outline-secondary" @click="qty > 1 && qty--">−</button>
            <input type="number" class="form-control text-center" v-model="qty" min="1" :max="product.stock" />
            <button class="btn btn-outline-secondary" @click="qty < product.stock && qty++">+</button>
          </div>
          <button
            class="btn btn-brown btn-lg px-4"
            :disabled="product.stock === 0"
            @click="addToCart"
          >
            🛒 Thêm vào giỏ
          </button>

          <button
            v-if="auth.isLoggedIn && !auth.isAdmin"
            class="btn btn-outline-danger btn-lg"
            @click="toggleLike"
          >
            {{ wishlist.isLiked(product._id) ? '❤️' : '🤍' }}
          </button>
        </div>
      </div>

      <!-- Reviews -->
      <div class="col-12">
        <hr />
        <ProductReviews :productId="product._id" />
      </div>
    </div>

    <div v-else class="text-center text-muted py-5">
      Không tìm thấy sản phẩm.
    </div>
  </div>
</template>

<script setup>
<<<<<<< HEAD
import { ref, computed, onMounted, watch } from 'vue';
=======
import { ref, onMounted } from 'vue';
>>>>>>> 6644a9b3829b34f1e619ed6d01c457846ddf0d75
import { useRoute } from 'vue-router';
import axios from 'axios';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import { useAuthStore } from '../store/authStore';
import ProductReviews from '../components/ProductReviews.vue';

const route = useRoute();
const cart = useCartStore();
const wishlist = useWishlistStore();
const auth = useAuthStore();

const product = ref(null);
const loading = ref(false);
const qty = ref(1);
const selectedSize = ref('');
<<<<<<< HEAD
const selectedSugarIce = ref('');
const selectedToppings = ref([]);
const note = ref('');

const formatPrice = (p) => (p || 0).toLocaleString('vi-VN') + ' ₫';

const toggleTopping = (name) => {
  const i = selectedToppings.value.indexOf(name);
  if (i === -1) selectedToppings.value.push(name);
  else selectedToppings.value.splice(i, 1);
};

// Đơn giá = giá gốc + phụ thu size đã chọn + tổng giá topping đã chọn
const unitPrice = computed(() => {
  if (!product.value) return 0;
  const sizeObj = (product.value.sizes || []).find(s => s.name === selectedSize.value);
  const sizeDelta = sizeObj ? sizeObj.priceDelta : 0;
  const toppingsTotal = selectedToppings.value.reduce((sum, tName) => {
    const t = (product.value.toppings || []).find(pt => pt.name === tName);
    return sum + (t ? t.price : 0);
  }, 0);
  return product.value.price + sizeDelta + toppingsTotal;
});

=======
const selectedColor = ref('');

const formatPrice = (p) => (p || 0).toLocaleString('vi-VN') + ' ₫';

>>>>>>> 6644a9b3829b34f1e619ed6d01c457846ddf0d75
const loadProduct = async () => {
  loading.value = true;
  try {
    const res = await axios.get(`/api/products/${route.params.id}`);
    product.value = res.data;
<<<<<<< HEAD
    // Mặc định chọn size/đường-đá đầu tiên nếu có
    selectedSize.value = product.value.sizes?.[0]?.name || '';
    selectedSugarIce.value = product.value.sugarIceOptions?.[0] || '';
    selectedToppings.value = [];
    note.value = '';
=======
>>>>>>> 6644a9b3829b34f1e619ed6d01c457846ddf0d75
  } catch {
    product.value = null;
  } finally {
    loading.value = false;
  }
};

const addToCart = () => {
<<<<<<< HEAD
  if (product.value.sizes?.length && !selectedSize.value) {
    alert('Vui lòng chọn size ly!');
    return;
  }
  cart.addItem(product.value, qty.value, {
    size: selectedSize.value,
    sugarIce: selectedSugarIce.value,
    toppings: [...selectedToppings.value],
    note: note.value,
    unitPrice: unitPrice.value
  });
=======
  cart.addItem(product.value, qty.value);
>>>>>>> 6644a9b3829b34f1e619ed6d01c457846ddf0d75
  alert(`Đã thêm ${qty.value} "${product.value.name}" vào giỏ hàng!`);
};

const toggleLike = async () => {
  await wishlist.toggle(product.value._id, auth.token);
};

onMounted(loadProduct);
<<<<<<< HEAD
watch(() => route.params.id, loadProduct);
=======
>>>>>>> 6644a9b3829b34f1e619ed6d01c457846ddf0d75
</script>

<style scoped>
.text-brown { color: #2b1c12; }
.btn-brown { background-color: #2b1c12; border-color: #2b1c12; color: white; }
.btn-brown:hover { background-color: #4a4a4a; color: white; }
.stars span { font-size: 1rem; }
<<<<<<< HEAD
</style>
=======
</style>
>>>>>>> 6644a9b3829b34f1e619ed6d01c457846ddf0d75
