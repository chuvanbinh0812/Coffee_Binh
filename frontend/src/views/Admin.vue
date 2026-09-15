<template>
  <div class="admin-layout">
    <!-- Sidebar -->
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
          <span>Chat</span>
          <span v-if="unreadCount > 0" class="sidebar-badge">{{ unreadCount }}</span>
        </router-link>
      </nav>

      <div class="sidebar-footer">
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

    <!-- Main content -->
    <div class="admin-main">
      <!-- Top bar -->
      <div class="admin-topbar">
        <div>
          <span class="admin-topbar-eyebrow">Bảng điều khiển</span>
          <h5 class="admin-topbar-title">{{ pageTitle }}</h5>
        </div>
        <div class="admin-topbar-date">{{ currentDate }}</div>
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
import { useAuthStore } from '../store/authStore';

const route = useRoute();
const router = useRouter();
const adminChat = useAdminChatStore();
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
}[tab.value] || 'Quản trị'));

const currentDate = computed(() =>
  new Date().toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
);

watch(tab, (newTab) => {
  if (['stats', 'products', 'orders', 'users', 'ingredients', 'chat'].includes(newTab)) {
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
  background: var(--paper);
  font-family: var(--font-body);
}

/* ===== Sidebar ===== */
.admin-sidebar {
  width: 234px;
  min-height: 100vh;
  background: var(--ink);
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
}

.sidebar-item {
  display: flex;
  align-items: center;
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
  font-weight: 700;
}

.sidebar-footer {
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
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.admin-topbar {
  background: var(--paper);
  padding: 20px 32px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 1px solid var(--line);
  position: sticky;
  top: 0;
  z-index: 99;
}
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
  flex: 1;
}

/* ===== Responsive ===== */
@media (max-width: 768px) {
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
