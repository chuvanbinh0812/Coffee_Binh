<template>
  <nav class="kinjo-nav">
    <div class="container d-flex align-items-center justify-content-between py-2">
      <router-link to="/" class="brand-mark">
        <span class="hanko-stamp small-stamp">金</span>
        <span class="brand-word">KINJO</span>
      </router-link>

      <button class="navbar-toggler d-lg-none" type="button" @click="mobileOpen = !mobileOpen">
        <span class="toggler-line"></span>
        <span class="toggler-line"></span>
        <span class="toggler-line"></span>
      </button>

      <div class="nav-links d-none d-lg-flex align-items-center">
        <router-link to="/" class="nav-link">Trang Chủ</router-link>
        <router-link to="/products" class="nav-link">Thực Đơn</router-link>

        <div class="nav-item dropdown-container" @mouseenter="showMenu = true" @mouseleave="startHideMenu">
          <router-link to="/about" class="nav-link">Về Chúng Tôi</router-link>
          <div class="mega-menu" :class="{ visible: showMenu }" @mouseenter="showMenu = true" @mouseleave="startHideMenu">
            <div class="mega-menu-grid">
              <div class="mega-menu-column">
                <h6>Câu Chuyện Hạt Cà Phê</h6>
                <router-link :to="{ path: '/about', hash: '#brand-journey' }" class="dropdown-link">Hành trình thương hiệu</router-link>
                <router-link :to="{ path: '/about', hash: '#materials' }" class="dropdown-link">Vùng nguyên liệu Kinjo</router-link>
                <router-link :to="{ path: '/about', hash: '#brewing-art' }" class="dropdown-link">Nghệ thuật pha chế</router-link>
              </div>
              <div class="mega-menu-column">
                <h6>Về Kinjo</h6>
                <router-link :to="{ path: '/about', hash: '#company' }" class="dropdown-link">Giới thiệu công ty</router-link>
                <router-link :to="{ path: '/about', hash: '#gallery' }" class="dropdown-link">Thư viện hình ảnh</router-link>
                <router-link :to="{ path: '/about', hash: '#contact' }" class="dropdown-link">Liên hệ</router-link>
                <router-link :to="{ path: '/about', hash: '#menu' }" class="dropdown-link">Thực đơn mới</router-link>
              </div>
            </div>
          </div>
        </div>

        <router-link to="/contact" class="nav-link">Liên Hệ</router-link>

        <router-link v-if="!auth.isLoggedIn" to="/login" class="nav-link nav-link-cta">Đăng Nhập</router-link>

        <template v-else>
          <a v-if="!auth.isAdmin" href="#" class="nav-link position-relative" @click.prevent="cartStore.openCart()">
            Giỏ hàng
            <span v-if="cartTotal > 0" class="cart-count">{{ cartTotal }}</span>
          </a>

          <div class="account-dropdown-container">
            <button class="btn-account">
              <span class="account-name">{{ auth.user?.name }}</span>
            </button>

            <div class="account-menu">
              <div class="account-menu-header">
                <div class="fw-semibold">{{ auth.user?.name }}</div>
                <div class="text-muted small">{{ auth.user?.email }}</div>
              </div>
              <div class="account-menu-divider"></div>

              <template v-if="!auth.isAdmin">
                <router-link to="/profile" class="account-menu-item">Hồ sơ tài khoản</router-link>
                <router-link to="/my-orders" class="account-menu-item">Đơn hàng của tôi</router-link>
                <router-link to="/wishlist" class="account-menu-item">Yêu thích</router-link>
                <a href="#" class="account-menu-item" @click.prevent="cartStore.openCart()">
                  Giỏ hàng
                  <span v-if="cartTotal > 0" class="badge bg-danger ms-1">{{ cartTotal }}</span>
                </a>
              </template>

              <template v-else>
                <router-link to="/profile" class="account-menu-item">Hồ sơ tài khoản</router-link>
                <router-link to="/admin" class="account-menu-item">Trang quản trị</router-link>
              </template>

              <div class="account-menu-divider"></div>
              <a href="#" class="account-menu-item text-danger" @click.prevent="logout">Đăng xuất</a>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- Mobile menu -->
    <div class="mobile-menu" v-if="mobileOpen">
      <router-link to="/" class="mobile-link" @click="mobileOpen = false">Trang Chủ</router-link>
      <router-link to="/products" class="mobile-link" @click="mobileOpen = false">Thực Đơn</router-link>
      <router-link to="/about" class="mobile-link" @click="mobileOpen = false">Về Chúng Tôi</router-link>
      <router-link to="/contact" class="mobile-link" @click="mobileOpen = false">Liên Hệ</router-link>
      <router-link v-if="!auth.isLoggedIn" to="/login" class="mobile-link" @click="mobileOpen = false">Đăng Nhập</router-link>
      <a v-else href="#" class="mobile-link" @click.prevent="logout">Đăng xuất</a>
    </div>
  </nav>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { useRouter } from 'vue-router';

const cartStore = useCartStore();
const auth = useAuthStore();
const router = useRouter();

const cartTotal = computed(() => cartStore.totalItems);
const mobileOpen = ref(false);

const showMenu = ref(false);
let hideTimer = null;
const startHideMenu = () => {
  hideTimer = setTimeout(() => { showMenu.value = false; }, 150);
};

const logout = () => {
  auth.logout();
  router.push('/');
};
</script>

<style scoped>
.kinjo-nav {
  background: #f8f0e1;
  border-bottom: 1px solid #2a1c12;
  position: sticky;
  top: 0;
  z-index: 100;
}

.brand-mark {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}
.small-stamp {
  width: 34px; height: 34px;
  font-size: 0.85rem;
}
.brand-word {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.6rem;
  letter-spacing: 4px;
  color: #2a1c12;
}

.nav-links { gap: 26px; }
.nav-link {
  font-family: 'Space Mono', monospace;
  font-size: 0.76rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #2a1c12 !important;
  position: relative;
  padding-bottom: 3px;
  transition: color 0.2s;
}
.nav-link::after {
  content: '';
  position: absolute;
  left: 0; bottom: 0;
  width: 0; height: 2px;
  background: #b3502c;
  transition: width 0.2s ease;
}
.nav-link:hover { color: #6f4423 !important; }
.nav-link:hover::after { width: 100%; }
.nav-link-cta {
  border: 1px solid #2a1c12;
  padding: 6px 14px !important;
}
.nav-link-cta::after { display: none; }
.nav-link-cta:hover { background: #2a1c12; color: #f8f0e1 !important; }

.cart-count {
  background: #b3502c;
  color: #f8f0e1;
  font-family: 'Space Mono', monospace;
  font-size: 0.65rem;
  border-radius: 50%;
  width: 16px; height: 16px;
  display: inline-flex; align-items: center; justify-content: center;
  position: absolute;
  top: -8px; right: -12px;
}

.navbar-toggler {
  background: none; border: none;
  display: flex; flex-direction: column; gap: 5px;
  padding: 4px;
}
.toggler-line { width: 22px; height: 2px; background: #2a1c12; }

.mobile-menu {
  display: flex; flex-direction: column;
  border-top: 1px solid #ddc9a0;
  background: #efe1c3;
}
.mobile-link {
  padding: 14px 20px;
  font-family: 'Space Mono', monospace;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #2a1c12;
  border-bottom: 1px solid #ddc9a0;
}

/* ============ Account dropdown ============ */
.account-dropdown-container { position: relative; }
.btn-account {
  display: flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: 1px solid #2a1c12;
  border-radius: 0;
  padding: 5px 12px;
  color: #2a1c12;
  cursor: pointer;
  font-family: 'Space Mono', monospace;
  font-size: 0.72rem;
  text-transform: uppercase;
  transition: background 0.2s;
}
.btn-account:hover { background: #2a1c12; color: #f8f0e1; }
.account-name {
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.account-menu {
  pointer-events: none;
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 220px;
  background: #f8f0e1;
  border: 1px solid #2a1c12;
  border-radius: 0;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  opacity: 0;
  visibility: hidden;
  transform: translateY(8px);
  transition: opacity 180ms ease, transform 180ms ease, visibility 180ms ease;
  z-index: 1000;
  overflow: hidden;
}
.account-dropdown-container:hover .account-menu,
.account-dropdown-container:focus-within .account-menu {
  pointer-events: auto;
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}
.account-menu-header { padding: 14px 16px 10px; }
.account-menu-divider { height: 1px; background: #ddc9a0; margin: 4px 0; }
.account-menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  color: #2a1c12;
  text-decoration: none;
  font-size: 0.85rem;
  transition: background 0.15s;
}
.account-menu-item:hover { background: #efe1c3; color: #6f4423; }
.account-menu-item.text-danger { color: #b3502c !important; }
.account-menu-item.text-danger:hover { background: #f6e9e8; }

@media (max-width: 991.98px) {
  .mega-menu {
    position: static; width: 100%;
    opacity: 1; visibility: visible;
    transform: none; pointer-events: auto;
    box-shadow: none; border: none;
    background: #efe1c3; margin-top: 0;
  }
  .mega-menu-grid { grid-template-columns: 1fr; gap: 15px; }
}
</style>
