<template>
  <div class="kinjo-card h-100 position-relative" v-fade-in>
    <button
      v-if="auth.isLoggedIn && !auth.isAdmin"
      class="btn-wishlist"
      :class="{ liked: wishlist.isLiked(product._id) }"
      @click.prevent="toggleLike"
    >
      {{ wishlist.isLiked(product._id) ? '♥' : '♡' }}
    </button>

    <span v-if="product.isNew" class="tag-badge tag-new">Mới</span>
    <span v-else-if="product.isBestSeller" class="tag-badge tag-hot">Bán Chạy</span>

    <router-link :to="`/products/${product._id}`" class="card-img-link">
      <img :src="product.image" :alt="product.name" class="card-img-top" />
    </router-link>
    <div class="card-body-kinjo">
      <router-link :to="`/products/${product._id}`" class="text-decoration-none">
        <h5 class="card-title-kinjo">{{ product.name }}</h5>
      </router-link>
      <p class="card-category">{{ product.category }}</p>

      <div class="price-tag">{{ formatPrice(product.price) }}</div>

      <router-link :to="`/products/${product._id}`" class="rating-line">
        ★ {{ product.rating }} ({{ product.reviews }})
      </router-link>

      <button @click="addToCart" class="btn-add-cart">
        {{ needsOptions ? 'Chọn size / topping' : 'Thêm vào giỏ' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import { useAuthStore } from '../store/authStore';

const props = defineProps(['product']);
const cartStore = useCartStore();
const wishlist = useWishlistStore();
const auth = useAuthStore();
const router = useRouter();

const formatPrice = (price) => price.toLocaleString('vi-VN') + ' ₫';

// Sản phẩm có size/topping cần chọn thì phải vào trang chi tiết, không thêm thẳng vào giỏ
const needsOptions = computed(() =>
  (props.product.sizes?.length || 0) > 0 || (props.product.toppings?.length || 0) > 0
);

const addToCart = () => {
  if (needsOptions.value) {
    router.push(`/products/${props.product._id}`);
    return;
  }
  cartStore.addItem(props.product, 1, { unitPrice: props.product.price });
};

const toggleLike = async () => {
  await wishlist.toggle(props.product._id, auth.token);
};
</script>

<style scoped>
.kinjo-card {
  background: #f8f0e1;
  border: 1px solid #ddc9a0;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  transition: border-color 0.25s ease, transform 0.25s ease;
}
.kinjo-card:hover { border-color: #6f4423; transform: translateY(-4px); }

.tag-badge {
  position: absolute;
  top: 10px; left: 10px;
  z-index: 5;
  font-family: 'Space Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  padding: 3px 9px;
  color: #f8f0e1;
}
.tag-new { background: #6f4423; }
.tag-hot { background: #b3502c; }

.card-img-link { display: block; overflow: hidden; }
.card-img-top {
  height: 200px;
  width: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}
.kinjo-card:hover .card-img-top { transform: scale(1.04); }

.card-body-kinjo {
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.card-title-kinjo {
  font-family: 'Bebas Neue', sans-serif;
  letter-spacing: 0.5px;
  font-size: 1.15rem;
  color: #2a1c12;
  margin-bottom: 2px;
}
.card-category {
  font-family: 'Space Mono', monospace;
  font-size: 0.68rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: #6b5646;
  margin-bottom: 8px;
}
.price-tag {
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  font-size: 0.95rem;
  color: #6f4423;
  margin-bottom: 8px;
}
.rating-line {
  font-size: 0.78rem;
  color: #b3502c;
  margin-bottom: 12px;
  text-decoration: none;
}

.btn-add-cart {
  margin-top: auto;
  background: #2a1c12;
  color: #f8f0e1;
  border: 1px solid #2a1c12;
  font-family: 'Space Mono', monospace;
  font-size: 0.72rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  padding: 9px;
  transition: background 0.2s;
}
.btn-add-cart:hover { background: #6f4423; border-color: #6f4423; }

.btn-wishlist {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 5;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(244,242,236,0.9);
  border: 1px solid #ddc9a0;
  font-size: 16px;
  color: #b3502c;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.15s;
}
.btn-wishlist:hover { transform: scale(1.15); }
.btn-wishlist.liked { animation: pop 0.3s ease; }
@keyframes pop {
  0% { transform: scale(1); }
  50% { transform: scale(1.3); }
  100% { transform: scale(1); }
}
</style>