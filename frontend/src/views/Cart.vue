<template>
  <div class="cart-page">
    <div class="container">
      <div class="cart-head">
        <span class="cart-eyebrow"><span class="hanko-stamp cart-stamp">金</span> Đơn hàng của bạn</span>
        <h1 class="cart-title">GIỎ HÀNG</h1>
      </div>

      <!-- Giỏ hàng trống -->
      <div v-if="cart.items.length === 0" class="cart-empty">
        <div class="hanko-stamp empty-stamp">金</div>
        <h5>Giỏ hàng của bạn đang trống</h5>
        <p class="text-muted">Hãy khám phá thực đơn để chọn cho mình một ly cà phê ưng ý.</p>
        <router-link to="/products" class="btn-hero-primary">Khám Phá Thực Đơn</router-link>
      </div>

      <!-- Nội dung giỏ hàng -->
      <div v-else class="cart-grid">
        <div class="cart-items">
          <div class="cart-items-head">
            <span>{{ cart.totalItems }} sản phẩm</span>
            <button class="btn-clear" @click="clearCart">Xóa tất cả</button>
          </div>

          <div v-for="item in cart.items" :key="item.lineId" class="cart-row">
            <div class="cart-row-img">
              <img :src="item.image" :alt="item.name" />
            </div>
            <div class="cart-row-info">
              <div class="cart-row-name">{{ item.name }}</div>
              <div class="cart-row-variant" v-if="item.size || item.sugarIce || item.toppings?.length">
                <span v-if="item.size">{{ item.size }}</span>
                <span v-if="item.sugarIce"> · {{ item.sugarIce }}</span>
                <span v-if="item.toppings?.length"> · {{ item.toppings.join(', ') }}</span>
              </div>
              <div class="cart-row-unit">{{ formatPrice(item.price) }} / chiếc</div>
            </div>
            <div class="qty-control">
              <button @click="decrease(item)">−</button>
              <span>{{ item.quantity }}</span>
              <button @click="increase(item)">+</button>
            </div>
            <div class="cart-row-total">{{ formatPrice(item.price * item.quantity) }}</div>
            <button class="btn-remove" @click="cart.removeItem(item.lineId)" title="Xóa">✕</button>
          </div>

          <router-link to="/products" class="continue-link">← Tiếp tục mua sắm</router-link>
        </div>

        <!-- Tóm tắt đơn hàng -->
        <aside class="cart-summary">
          <h6 class="summary-title">Tóm tắt đơn hàng</h6>
          <div class="summary-row">
            <span>Tạm tính</span>
            <span>{{ formatPrice(cart.totalPrice) }}</span>
          </div>
          <div class="summary-row muted">
            <span>Phí giao hàng</span>
            <span>Tính ở bước thanh toán</span>
          </div>
          <div class="summary-divider"></div>
          <div class="summary-row total">
            <span>Tổng cộng</span>
            <span>{{ formatPrice(cart.totalPrice) }}</span>
          </div>
          <router-link to="/checkout" class="btn-checkout">Tiến hành thanh toán</router-link>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../store/cartStore';

const cart = useCartStore();

const formatPrice = (p) => (p || 0).toLocaleString('vi-VN') + ' ₫';

const increase = (item) => {
  cart.updateQuantity(item.lineId, item.quantity + 1);
};
const decrease = (item) => {
  if (item.quantity > 1) {
    cart.updateQuantity(item.lineId, item.quantity - 1);
  } else {
    cart.removeItem(item.lineId);
  }
};
const clearCart = () => {
  if (confirm('Xóa toàn bộ giỏ hàng?')) cart.clearCart();
};
</script>

<style scoped>
.cart-page {
  background: var(--paper);
  min-height: 70vh;
  padding: 56px 0 80px;
  font-family: var(--font-body);
}

.cart-head { margin-bottom: 36px; }
.cart-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--hanko);
  margin-bottom: 10px;
}
.cart-stamp { width: 30px; height: 30px; font-size: 0.7rem; }
.cart-title {
  font-family: var(--font-display);
  font-size: 2.6rem;
  letter-spacing: 1px;
  color: var(--ink);
  margin: 0;
}

/* Empty state */
.cart-empty {
  text-align: center;
  padding: 80px 20px;
  border: 1px solid var(--line);
  border-radius: 3px;
}
.empty-stamp {
  width: 64px; height: 64px;
  font-size: 1.5rem;
  color: var(--line);
  border-color: var(--line);
  margin: 0 auto 20px;
}
.cart-empty h5 { font-family: var(--font-display); font-size: 1.4rem; letter-spacing: 0.5px; color: var(--ink); }
.cart-empty p { max-width: 420px; margin: 8px auto 24px; }

/* Grid */
.cart-grid {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 32px;
  align-items: start;
}

/* Items */
.cart-items {
  border-top: 1px solid var(--line);
}
.cart-items-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  letter-spacing: 0.5px;
  color: var(--ink-soft);
  text-transform: uppercase;
}
.btn-clear {
  background: none;
  border: none;
  color: var(--hanko);
  font-family: var(--font-mono);
  font-size: 0.74rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
.btn-clear:hover { text-decoration: underline; }

.cart-row {
  display: grid;
  grid-template-columns: 84px 1fr auto auto 32px;
  align-items: center;
  gap: 18px;
  padding: 18px 0;
  border-bottom: 1px solid var(--line);
}
.cart-row-img {
  width: 84px; height: 84px;
  border: 1px solid var(--line);
  border-radius: 2px;
  overflow: hidden;
}
.cart-row-img img { width: 100%; height: 100%; object-fit: cover; }
.cart-row-name { font-weight: 700; color: var(--ink); margin-bottom: 4px; }
.cart-row-variant { font-size: 0.78rem; color: var(--hanko); margin-bottom: 3px; }
.cart-row-unit { font-size: 0.82rem; color: var(--ink-soft); }

.qty-control {
  display: flex;
  align-items: center;
  border: 1px solid var(--line);
  border-radius: 3px;
  overflow: hidden;
}
.qty-control button {
  width: 30px; height: 30px;
  background: var(--paper-dim);
  border: none;
  color: var(--ink);
  font-size: 1rem;
  line-height: 1;
}
.qty-control button:hover { background: var(--indigo); color: var(--paper); }
.qty-control span {
  width: 32px;
  text-align: center;
  font-family: var(--font-mono);
  font-size: 0.88rem;
}

.cart-row-total {
  font-family: var(--font-mono);
  font-weight: 700;
  color: var(--indigo);
  white-space: nowrap;
  min-width: 100px;
  text-align: right;
}

.btn-remove {
  background: none;
  border: none;
  color: var(--ink-soft);
  font-size: 0.95rem;
  transition: color 0.15s;
}
.btn-remove:hover { color: var(--hanko); }

.continue-link {
  display: inline-block;
  margin-top: 22px;
  color: var(--indigo);
  font-size: 0.9rem;
  font-weight: 600;
}
.continue-link:hover { color: var(--hanko); }

/* Summary */
.cart-summary {
  background: var(--paper-dim);
  border: 1px solid var(--line);
  border-radius: 3px;
  padding: 26px;
  position: sticky;
  top: 100px;
}
.summary-title {
  font-family: var(--font-display);
  font-size: 1.15rem;
  letter-spacing: 0.5px;
  color: var(--ink);
  margin-bottom: 18px;
}
.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: var(--ink);
  margin-bottom: 12px;
}
.summary-row.muted { color: var(--ink-soft); font-size: 0.82rem; }
.summary-divider { height: 1px; background: var(--line); margin: 14px 0; }
.summary-row.total {
  font-family: var(--font-display);
  font-size: 1.25rem;
  letter-spacing: 0.5px;
  color: var(--ink);
  margin-bottom: 22px;
}

.btn-checkout {
  display: block;
  text-align: center;
  background: var(--ink);
  color: var(--paper);
  border: 2px solid var(--ink);
  padding: 13px;
  border-radius: 2px;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: background 0.2s, color 0.2s;
}
.btn-checkout:hover { background: transparent; color: var(--ink); }

@media (max-width: 860px) {
  .cart-grid { grid-template-columns: 1fr; }
  .cart-summary { position: static; }
  .cart-row {
    grid-template-columns: 64px 1fr;
    row-gap: 10px;
  }
  .cart-row-img { width: 64px; height: 64px; }
  .qty-control, .cart-row-total, .btn-remove { grid-column: 2; justify-self: start; }
  .cart-title { font-size: 2rem; }
}
</style>
