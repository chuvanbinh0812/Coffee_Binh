<template>
  <div class="admin-layout">
    <!-- Sidebar -->
<<<<<<< HEAD
    <aside class="admin-sidebar">
      <div class="sidebar-brand">
        <span class="hanko-stamp sidebar-stamp">金</span>
        <div class="sidebar-brand-text">
          <span class="sidebar-brand-name">Kinjo</span>
          <span class="sidebar-brand-sub">Quản trị</span>
        </div>
      </div>

      <nav class="sidebar-nav">
        <span class="sidebar-nav-label">Điều hành</span>
        <router-link to="/admin/stats" class="sidebar-item" :class="{ active: tab === 'stats' }">
          <span class="sidebar-icon">◈</span>
          <span>Thống kê</span>
        </router-link>
        <router-link to="/admin/products" class="sidebar-item" :class="{ active: tab === 'products' }">
          <span class="sidebar-icon">◆</span>
          <span>Sản phẩm</span>
        </router-link>
        <router-link to="/admin/orders" class="sidebar-item" :class="{ active: tab === 'orders' }">
          <span class="sidebar-icon">▣</span>
          <span>Đơn hàng</span>
        </router-link>
        <router-link to="/admin/users" class="sidebar-item" :class="{ active: tab === 'users' }">
          <span class="sidebar-icon">◎</span>
          <span>Người dùng</span>
        </router-link>
        <router-link to="/admin/ingredients" class="sidebar-item" :class="{ active: tab === 'ingredients' }">
          <span class="sidebar-icon">⬡</span>
          <span>Nguyên liệu</span>
        </router-link>
        <router-link to="/admin/chat" class="sidebar-item" :class="{ active: tab === 'chat' }">
          <span class="sidebar-icon">✉</span>
=======
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
>>>>>>> 6644a9b3829b34f1e619ed6d01c457846ddf0d75
          <span>Chat</span>
          <span v-if="unreadCount > 0" class="sidebar-badge">{{ unreadCount }}</span>
        </router-link>
      </nav>

      <div class="sidebar-footer">
<<<<<<< HEAD
        <div class="sidebar-user">
          <div class="sidebar-user-avatar">{{ initial }}</div>
          <div class="sidebar-user-info">
            <span class="sidebar-user-name">{{ auth.user?.name || 'Admin' }}</span>
            <span class="sidebar-user-role">Quản trị viên</span>
          </div>
        </div>
        <router-link to="/" class="sidebar-item sidebar-item-ghost">
          <span class="sidebar-icon">←</span>
          <span>Về trang chủ</span>
        </router-link>
      </div>
    </aside>
=======
        <router-link to="/" class="sidebar-item">
          <span class="sidebar-icon">🏠</span>
          <span>Về trang chủ</span>
        </router-link>
      </div>
    </div>
>>>>>>> 6644a9b3829b34f1e619ed6d01c457846ddf0d75

    <!-- Main content -->
    <div class="admin-main">
      <!-- Top bar -->
      <div class="admin-topbar">
<<<<<<< HEAD
        <div>
          <span class="admin-topbar-eyebrow">Bảng điều khiển</span>
          <h5 class="admin-topbar-title">{{ pageTitle }}</h5>
        </div>
        <div class="admin-topbar-date">{{ currentDate }}</div>
=======
        <h5 class="mb-0">{{ pageTitle }}</h5>
        <div class="text-muted small">{{ currentDate }}</div>
>>>>>>> 6644a9b3829b34f1e619ed6d01c457846ddf0d75
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
<<<<<<< HEAD
import { useAuthStore } from '../store/authStore';
=======
>>>>>>> 6644a9b3829b34f1e619ed6d01c457846ddf0d75

const route = useRoute();
const router = useRouter();
const adminChat = useAdminChatStore();
<<<<<<< HEAD
const auth = useAuthStore();

const tab = computed(() => route.path.split('/').pop());
const unreadCount = computed(() => adminChat.totalUnread);
const initial = computed(() => (auth.user?.name || 'A').charAt(0).toUpperCase());

const pageTitle = computed(() => ({
  stats:    'Thống kê doanh thu',
  products: 'Quản lý sản phẩm',
  orders:   'Quản lý đơn hàng',
  users:    'Quản lý người dùng',
  ingredients: 'Nguyên liệu & tồn kho',
  chat:     'Tin nhắn khách hàng'
=======

const tab = computed(() => route.path.split('/').pop());
const unreadCount = computed(() => adminChat.totalUnread);

const pageTitle = computed(() => ({
  stats:    '📊 Thống kê doanh thu',
  products: '☕ Quản lý sản phẩm',
  orders:   '📦 Quản lý đơn hàng',
  users:    '👥 Quản lý người dùng',
  chat:     '💬 Tin nhắn khách hàng'
>>>>>>> 6644a9b3829b34f1e619ed6d01c457846ddf0d75
}[tab.value] || 'Quản trị'));

const currentDate = computed(() =>
  new Date().toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
);

watch(tab, (newTab) => {
<<<<<<< HEAD
  if (['stats', 'products', 'orders', 'users', 'ingredients', 'chat'].includes(newTab)) {
=======
  if (['stats', 'products', 'orders', 'users', 'chat'].includes(newTab)) {
>>>>>>> 6644a9b3829b34f1e619ed6d01c457846ddf0d75
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
<<<<<<< HEAD
  background: var(--paper);
  font-family: var(--font-body);
=======
  background: #f8f0e1;
>>>>>>> 6644a9b3829b34f1e619ed6d01c457846ddf0d75
}

/* ===== Sidebar ===== */
.admin-sidebar {
<<<<<<< HEAD
  width: 234px;
  min-height: 100vh;
  background: var(--ink);
=======
  width: 220px;
  min-height: 100vh;
  background: #221510;
>>>>>>> 6644a9b3829b34f1e619ed6d01c457846ddf0d75
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
<<<<<<< HEAD
  gap: 12px;
  padding: 26px 20px 22px;
  border-bottom: 1px solid rgba(248,240,225,0.1);
}
.sidebar-stamp {
  width: 38px;
  height: 38px;
  font-size: 0.85rem;
  border-color: var(--hanko);
  color: var(--hanko);
  flex-shrink: 0;
}
.sidebar-brand-text { display: flex; flex-direction: column; line-height: 1.15; }
.sidebar-brand-name {
  font-family: var(--font-display);
  font-size: 1.35rem;
  letter-spacing: 1.5px;
  color: var(--paper);
}
.sidebar-brand-sub {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--hanko);
}

.sidebar-nav { flex: 1; padding: 20px 14px 12px; overflow-y: auto; }
.sidebar-nav-label {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(248,240,225,0.35);
  padding: 0 10px 10px;
=======
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
>>>>>>> 6644a9b3829b34f1e619ed6d01c457846ddf0d75
}

.sidebar-item {
  display: flex;
  align-items: center;
<<<<<<< HEAD
  gap: 12px;
  padding: 11px 12px;
  margin-bottom: 2px;
  color: rgba(248,240,225,0.68);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  border-radius: 3px;
  border-left: 2px solid transparent;
  transition: background 0.18s ease, color 0.18s ease;
  position: relative;
}
.sidebar-item:hover {
  background: rgba(248,240,225,0.06);
  color: var(--paper);
}
.sidebar-item.active {
  background: rgba(179,80,44,0.16);
  color: var(--paper);
  border-left-color: var(--hanko);
}
.sidebar-item.active .sidebar-icon { color: var(--hanko); }
.sidebar-icon {
  font-size: 0.95rem;
  width: 18px;
  text-align: center;
  color: rgba(248,240,225,0.4);
  flex-shrink: 0;
}

.sidebar-badge {
  margin-left: auto;
  background: var(--hanko);
  color: var(--paper);
  border-radius: 20px;
  padding: 1px 7px;
  font-family: var(--font-mono);
  font-size: 0.68rem;
=======
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
>>>>>>> 6644a9b3829b34f1e619ed6d01c457846ddf0d75
  font-weight: 700;
}

.sidebar-footer {
<<<<<<< HEAD
  padding: 14px 14px 18px;
  border-top: 1px solid rgba(248,240,225,0.1);
}
.sidebar-user {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 10px 14px;
}
.sidebar-user-avatar {
  width: 34px; height: 34px;
  border-radius: 50%;
  background: var(--indigo);
  border: 1px solid var(--hanko);
  color: var(--paper);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 1rem;
  flex-shrink: 0;
}
.sidebar-user-info { display: flex; flex-direction: column; line-height: 1.25; min-width: 0; }
.sidebar-user-name {
  color: var(--paper);
  font-size: 0.85rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.sidebar-user-role {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.5px;
  color: rgba(248,240,225,0.4);
}
.sidebar-item-ghost { color: rgba(248,240,225,0.55); }

/* ===== Main ===== */
.admin-main {
  margin-left: 234px;
=======
  padding: 12px 0;
  border-top: 1px solid rgba(255,255,255,0.1);
}

/* ===== Main ===== */
.admin-main {
  margin-left: 220px;
>>>>>>> 6644a9b3829b34f1e619ed6d01c457846ddf0d75
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.admin-topbar {
<<<<<<< HEAD
  background: var(--paper);
  padding: 20px 32px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 1px solid var(--line);
=======
  background: white;
  padding: 14px 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddc9a0;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
>>>>>>> 6644a9b3829b34f1e619ed6d01c457846ddf0d75
  position: sticky;
  top: 0;
  z-index: 99;
}
<<<<<<< HEAD
.admin-topbar-eyebrow {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.66rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--hanko);
  margin-bottom: 4px;
}
.admin-topbar-title {
  font-family: var(--font-display);
  font-size: 1.6rem;
  letter-spacing: 0.5px;
  color: var(--ink);
  margin: 0;
}
.admin-topbar-date {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--ink-soft);
  text-transform: capitalize;
}

.admin-content {
  padding: 28px 32px 48px;
=======

.admin-content {
  padding: 24px 28px;
>>>>>>> 6644a9b3829b34f1e619ed6d01c457846ddf0d75
  flex: 1;
}

/* ===== Responsive ===== */
@media (max-width: 768px) {
<<<<<<< HEAD
  .admin-sidebar { width: 64px; }
  .admin-sidebar .sidebar-brand-text,
  .admin-sidebar .sidebar-nav-label,
  .admin-sidebar span:not(.sidebar-icon):not(.sidebar-badge):not(.sidebar-stamp) { display: none; }
  .sidebar-item { justify-content: center; padding: 12px 0; }
  .sidebar-badge { position: absolute; top: 4px; right: 4px; margin-left: 0; }
  .sidebar-user { justify-content: center; padding: 6px 0 14px; }
  .admin-main { margin-left: 64px; }
  .admin-content { padding: 18px; }
  .admin-topbar { padding: 16px 18px; }
}
</style>
=======
  .admin-sidebar { width: 60px; }
  .admin-sidebar span:not(.sidebar-icon):not(.sidebar-badge) { display: none; }
  .sidebar-brand span:last-child { display: none; }
  .admin-main { margin-left: 60px; }
  .admin-content { padding: 16px; }
}
</style>
>>>>>>> 6644a9b3829b34f1e619ed6d01c457846ddf0d75
