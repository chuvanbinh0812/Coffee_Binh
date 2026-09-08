<template>
  <div class="admin-layout">
    <!-- Sidebar -->
    <div class="admin-sidebar">
      <div class="sidebar-brand">
        <span>☕</span>
        <span>Kinjo</span>
      </div>

      <nav class="sidebar-nav">
        <router-link to="/admin/stats" class="sidebar-item" :class="{ active: tab === 'stats' }">
          <span class="sidebar-icon">📊</span>
          <span>Thống kê</span>
        </router-link>
        <router-link to="/admin/products" class="sidebar-item" :class="{ active: tab === 'products' }">
          <span class="sidebar-icon">☕</span>
          <span>Sản phẩm</span>
        </router-link>
        <router-link to="/admin/orders" class="sidebar-item" :class="{ active: tab === 'orders' }">
          <span class="sidebar-icon">📦</span>
          <span>Đơn hàng</span>
        </router-link>
        <router-link to="/admin/users" class="sidebar-item" :class="{ active: tab === 'users' }">
          <span class="sidebar-icon">👥</span>
          <span>Người dùng</span>
        </router-link>
        <router-link to="/admin/chat" class="sidebar-item" :class="{ active: tab === 'chat' }">
          <span class="sidebar-icon">💬</span>
          <span>Chat</span>
          <span v-if="unreadCount > 0" class="sidebar-badge">{{ unreadCount }}</span>
        </router-link>
      </nav>

      <div class="sidebar-footer">
        <router-link to="/" class="sidebar-item">
          <span class="sidebar-icon">🏠</span>
          <span>Về trang chủ</span>
        </router-link>
      </div>
    </div>

    <!-- Main content -->
    <div class="admin-main">
      <!-- Top bar -->
      <div class="admin-topbar">
        <h5 class="mb-0">{{ pageTitle }}</h5>
        <div class="text-muted small">{{ currentDate }}</div>
      </div>

      <div class="admin-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAdminChatStore } from '../store/adminChatStore';

const route = useRoute();
const router = useRouter();
const adminChat = useAdminChatStore();

const tab = computed(() => route.path.split('/').pop());
const unreadCount = computed(() => adminChat.totalUnread);

const pageTitle = computed(() => ({
  stats:    '📊 Thống kê doanh thu',
  products: '☕ Quản lý sản phẩm',
  orders:   '📦 Quản lý đơn hàng',
  users:    '👥 Quản lý người dùng',
  chat:     '💬 Tin nhắn khách hàng'
}[tab.value] || 'Quản trị'));

const currentDate = computed(() =>
  new Date().toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
);

watch(tab, (newTab) => {
  if (['stats', 'products', 'orders', 'users', 'chat'].includes(newTab)) {
    localStorage.setItem('adminLastTab', newTab);
  }
});

if (route.path === '/admin' || route.path === '/admin/') {
  const lastTab = localStorage.getItem('adminLastTab') || 'stats';
  router.replace(`/admin/${lastTab}`);
}
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: #f8f0e1;
}

/* ===== Sidebar ===== */
.admin-sidebar {
  width: 220px;
  min-height: 100vh;
  background: #221510;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px 18px;
  font-size: 1.1rem;
  font-weight: 700;
  color: #b3502c;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  font-family: 'Be Vietnam Pro', sans-serif;
}

.sidebar-nav {
  flex: 1;
  padding: 12px 0;
}

.sidebar-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 18px;
  color: rgba(255,255,255,0.7);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s;
  position: relative;
  border-left: 3px solid transparent;
}
.sidebar-item:hover {
  background: rgba(255,255,255,0.08);
  color: white;
}
.sidebar-item.active {
  background: rgba(215, 168, 110, 0.15);
  color: #b3502c;
  border-left-color: #b3502c;
}
.sidebar-icon { font-size: 1.1rem; width: 20px; text-align: center; }

.sidebar-badge {
  margin-left: auto;
  background: #c1461f;
  color: white;
  border-radius: 10px;
  padding: 1px 7px;
  font-size: 0.72rem;
  font-weight: 700;
}

.sidebar-footer {
  padding: 12px 0;
  border-top: 1px solid rgba(255,255,255,0.1);
}

/* ===== Main ===== */
.admin-main {
  margin-left: 220px;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.admin-topbar {
  background: white;
  padding: 14px 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddc9a0;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  position: sticky;
  top: 0;
  z-index: 99;
}

.admin-content {
  padding: 24px 28px;
  flex: 1;
}

/* ===== Responsive ===== */
@media (max-width: 768px) {
  .admin-sidebar { width: 60px; }
  .admin-sidebar span:not(.sidebar-icon):not(.sidebar-badge) { display: none; }
  .sidebar-brand span:last-child { display: none; }
  .admin-main { margin-left: 60px; }
  .admin-content { padding: 16px; }
}
</style>