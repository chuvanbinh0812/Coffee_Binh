<template>
  <div class="orders-admin">
    <div class="page-head mb-4">
      <span class="page-eyebrow">Vận đơn</span>
      <h5 class="page-title">Tất cả đơn hàng</h5>
    </div>

    <!-- Thẻ thống kê nhanh -->
    <div class="stat-row mb-4">
      <div class="stat-box">
        <div class="stat-icon">▣</div>
        <div>
          <div class="stat-num">{{ orders.length }}</div>
          <div class="stat-label">Tổng đơn</div>
        </div>
      </div>
      <div class="stat-box warn">
        <div class="stat-icon">◔</div>
        <div>
          <div class="stat-num">{{ newOrders.length }}</div>
          <div class="stat-label">Đơn mới</div>
        </div>
      </div>
      <div class="stat-box">
        <div class="stat-icon">✓</div>
        <div>
          <div class="stat-num">{{ completedCount }}</div>
          <div class="stat-label">Hoàn thành</div>
        </div>
      </div>
      <div class="stat-box accent">
        <div class="stat-icon">￥</div>
        <div>
          <div class="stat-num small-num">{{ formatPrice(totalRevenue) }}</div>
          <div class="stat-label">Doanh thu</div>
        </div>
      </div>
    </div>

    <!-- Panel thông báo đơn mới -->
    <div class="pending-panel mb-4" v-if="newOrders.length > 0">
      <div class="pending-header">
        <span>🔔 Có <strong>{{ newOrders.length }}</strong> đơn hàng mới cần xác nhận</span>
      </div>
      <div class="pending-list">
        <div v-for="order in newOrders" :key="order._id" class="pending-item">
          <div>
            <span class="fw-semibold">{{ order.user?.name }}</span>
            <span class="mono-cell ms-2">#{{ order._id.slice(-6) }}</span>
            <span class="mono-cell ms-2">{{ formatDate(order.createdAt) }}</span>
            <span class="delivery-tag ms-2">{{ order.deliveryMethod === 'pickup' ? '🏪 Tại quầy' : '🚚 Giao hàng' }}</span>
          </div>
          <div class="d-flex align-items-center gap-2">
            <span class="fw-bold" style="color: var(--indigo)">{{ formatPrice(order.totalAmount) }}</span>
            <select
              class="status-select"
              :value="order.status"
              @change="updateStatus(order._id, $event.target.value)"
            >
              <option value="new">Mới</option>
              <option value="confirmed">Đã xác nhận</option>
              <option value="preparing">Đang pha chế</option>
              <option value="completed">Hoàn thành</option>
              <option value="cancelled">Đã hủy</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Toolbar -->
    <div class="toolbar mb-3">
      <h6 class="mb-0" style="font-family: var(--font-display); font-size: 1.1rem; letter-spacing: 0.5px;">Danh sách đơn hàng</h6>
      <div class="d-flex gap-2">
        <select v-model="statusFilter" class="status-select" style="width:160px">
          <option value="">Tất cả trạng thái</option>
          <option value="new">Mới</option>
          <option value="confirmed">Đã xác nhận</option>
          <option value="preparing">Đang pha chế</option>
          <option value="completed">Hoàn thành</option>
          <option value="cancelled">Đã hủy</option>
        </select>
        <button class="btn-refresh" @click="loadOrders">↺ Làm mới</button>
      </div>
    </div>

    <div v-if="errorMsg" class="alert alert-danger">{{ errorMsg }}</div>
    <div v-if="loading" class="text-center py-4">
      <div class="spinner-border" style="color: var(--indigo)"></div>
    </div>

    <div class="orders-table-wrap" v-if="!loading">
      <table class="orders-table">
        <thead>
          <tr>
            <th></th>
            <th>Mã đơn</th>
            <th>Khách hàng</th>
            <th>Nhận hàng</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
            <th>Ngày đặt</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredOrders.length === 0">
            <td colspan="8" class="text-center text-muted py-4">Chưa có đơn hàng nào.</td>
          </tr>
          <template v-for="order in filteredOrders" :key="order._id">
            <tr :class="{ 'pending-row': order.status === 'new' }">
              <td>
                <button class="btn-expand" @click="toggleExpand(order._id)">
                  {{ expanded.has(order._id) ? '▾' : '▸' }}
                </button>
              </td>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <span class="order-id">#{{ order._id.slice(-6) }}</span>
                  <span v-if="order.status === 'new'" class="new-badge">MỚI</span>
                </div>
              </td>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <div class="avatar-circle">{{ getInitial(order.user?.name) }}</div>
                  <span>{{ order.user?.name || 'N/A' }}</span>
                </div>
              </td>
              <td>
                <span class="delivery-tag">{{ order.deliveryMethod === 'pickup' ? '🏪 Tại quầy' : '🚚 Giao hàng' }}</span>
              </td>
              <td class="price-cell">{{ formatPrice(order.totalAmount) }}</td>
              <td>
                <span class="status-badge" :class="'status-' + order.status">
                  {{ getStatusLabel(order.status) }}
                </span>
              </td>
              <td class="mono-cell">{{ formatDate(order.createdAt) }}</td>
              <td>
                <select
                  class="status-select"
                  style="width:150px"
                  :value="order.status"
                  @change="updateStatus(order._id, $event.target.value)"
                >
                  <option value="new">Mới</option>
                  <option value="confirmed">Đã xác nhận</option>
                  <option value="preparing">Đang pha chế</option>
                  <option value="completed">Hoàn thành</option>
                  <option value="cancelled">Đã hủy</option>
                </select>
              </td>
            </tr>
            <tr v-if="expanded.has(order._id)" class="detail-row">
              <td></td>
              <td colspan="7">
                <div class="order-detail">
                  <div v-for="(item, i) in order.items" :key="i" class="order-detail-item">
                    <img :src="item.image" class="order-detail-img" />
                    <div class="flex-grow-1">
                      <div class="fw-semibold">{{ item.name }} × {{ item.quantity }}</div>
                      <div class="small text-muted" v-if="item.size || item.sugarIce || item.toppings?.length">
                        <span v-if="item.size">{{ item.size }}</span>
                        <span v-if="item.sugarIce"> · {{ item.sugarIce }}</span>
                        <span v-if="item.toppings?.length"> · {{ item.toppings.join(', ') }}</span>
                      </div>
                      <div class="small text-muted fst-italic" v-if="item.note">Ghi chú: {{ item.note }}</div>
                    </div>
                    <div class="fw-semibold">{{ formatPrice(item.price * item.quantity) }}</div>
                  </div>
                  <div class="order-detail-address" v-if="order.deliveryMethod !== 'pickup' && order.shippingAddress">
                    📍 {{ order.shippingAddress.street }}, {{ order.shippingAddress.city }} — {{ order.shippingAddress.phone }}
                  </div>
                  <div class="order-detail-address" v-else>
                    📞 Liên hệ: {{ order.shippingAddress?.phone || 'Xem hồ sơ khách hàng' }}
                  </div>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const auth = useAuthStore();
const orders = ref([]);
const loading = ref(false);
const errorMsg = ref('');
const statusFilter = ref('');
const expanded = ref(new Set());

const toggleExpand = (id) => {
  if (expanded.value.has(id)) expanded.value.delete(id);
  else expanded.value.add(id);
};

const newOrders = computed(() =>
  orders.value.filter(o => o.status === 'new')
);
const completedCount = computed(() =>
  orders.value.filter(o => o.status === 'completed').length
);
const totalRevenue = computed(() =>
  orders.value
    .filter(o => o.status !== 'cancelled')
    .reduce((sum, o) => sum + (o.totalAmount || 0), 0)
);

const filteredOrders = computed(() => {
  if (!statusFilter.value) return orders.value;
  return orders.value.filter(o => o.status === statusFilter.value);
});

const getInitial = (name) => (name || '?').charAt(0).toUpperCase();
const formatPrice = (p) => (p || 0).toLocaleString('vi-VN') + ' ₫';
const formatDate = (d) => new Date(d).toLocaleString('vi-VN');

const getStatusLabel = (s) => ({
  new:        'Mới',
  confirmed:  'Đã xác nhận',
  preparing:  'Đang pha chế',
  completed:  'Hoàn thành',
  cancelled:  'Đã hủy'
}[s] || s);

const loadOrders = async () => {
  loading.value = true;
  errorMsg.value = '';
  try {
    const config = { headers: { Authorization: `Bearer ${auth.token}` } };
    const res = await axios.get('/api/orders', config);
    orders.value = res.data;
  } catch (error) {
    errorMsg.value = error.response?.data?.message || 'Không thể tải danh sách đơn hàng.';
  } finally {
    loading.value = false;
  }
};

const updateStatus = async (orderId, status) => {
  try {
    const config = { headers: { Authorization: `Bearer ${auth.token}` } };
    await axios.put(`/api/orders/${orderId}/status`, { status }, config);
    const order = orders.value.find(o => o._id === orderId);
    if (order) order.status = status;
  } catch (error) {
    alert(error.response?.data?.message || 'Cập nhật thất bại!');
  }
};

onMounted(loadOrders);
</script>

<style scoped>
.orders-admin { font-family: var(--font-body); }

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

.mono-cell { font-family: var(--font-mono); font-size: 0.78rem; color: var(--ink-soft); }

/* ===== Thẻ thống kê ===== */
.stat-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}
.stat-box {
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 3px;
  padding: 16px 18px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: border-color 0.2s, transform 0.2s;
}
.stat-box:hover { transform: translateY(-2px); border-color: var(--indigo); }
.stat-icon {
  width: 38px; height: 38px;
  border-radius: 50%;
  border: 1px solid var(--indigo);
  color: var(--indigo);
  display: flex; align-items: center; justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
}
.stat-box.warn { border-color: var(--hanko); }
.stat-box.warn .stat-icon { border-color: var(--hanko); color: var(--hanko); }
.stat-box.accent { background: var(--paper-dim); }
.stat-num { font-family: var(--font-display); font-size: 1.4rem; color: var(--ink); letter-spacing: 0.5px; }
.stat-num.small-num { font-size: 1.05rem; }
.stat-box.warn .stat-num { color: var(--hanko); }
.stat-box.accent .stat-num { color: var(--indigo); }
.stat-label { font-family: var(--font-mono); font-size: 0.7rem; color: var(--ink-soft); text-transform: uppercase; letter-spacing: 0.5px; margin-top: 2px; }

@media (max-width: 768px) {
  .stat-row { grid-template-columns: repeat(2, 1fr); }
}

/* ===== Panel đơn mới ===== */
.pending-panel {
  border-radius: 3px;
  overflow: hidden;
  border: 1px solid var(--hanko);
}
.pending-header {
  background: var(--hanko);
  color: var(--paper);
  padding: 11px 18px;
  font-size: 0.92rem;
}
.pending-list {
  background: var(--paper);
  max-height: 220px;
  overflow-y: auto;
}
.pending-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 11px 18px;
  border-bottom: 1px solid var(--paper-dim);
}
.pending-item:last-child { border-bottom: none; }

.delivery-tag {
  font-size: 0.76rem;
  color: var(--ink-soft);
  white-space: nowrap;
}

/* ===== Toolbar ===== */
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}
.btn-refresh {
  border: 1px solid var(--line);
  background: transparent;
  color: var(--ink);
  padding: 6px 14px;
  border-radius: 3px;
  font-size: 0.82rem;
}
.btn-refresh:hover { background: var(--paper-dim); }

.status-select {
  border: 1px solid var(--line);
  border-radius: 3px;
  padding: 6px 10px;
  font-size: 0.82rem;
  background: var(--paper);
  color: var(--ink);
}
.status-select:focus { outline: none; border-color: var(--indigo); }

/* ===== Bảng đơn hàng ===== */
.orders-table-wrap {
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 3px;
  overflow: auto;
}
.orders-table { width: 100%; border-collapse: collapse; }
.orders-table thead th {
  text-align: left;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--ink-soft);
  padding: 14px 14px 10px;
  border-bottom: 1px solid var(--line);
  white-space: nowrap;
}
.orders-table tbody td {
  padding: 12px 14px;
  border-bottom: 1px solid var(--paper-dim);
  font-size: 0.88rem;
  color: var(--ink);
  vertical-align: middle;
}
.orders-table tbody tr:hover { background: var(--paper-dim); }

.btn-expand {
  background: none;
  border: none;
  color: var(--ink-soft);
  font-size: 0.9rem;
  width: 20px;
}

.order-id { font-family: var(--font-mono); font-size: 0.85rem; color: var(--ink-soft); }
.price-cell { font-weight: 700; color: var(--indigo); }

.avatar-circle {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--indigo);
  color: var(--paper);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.8rem;
  flex-shrink: 0;
}

.pending-row { background-color: #fffbf0 !important; }
.pending-row:hover { background-color: #fff3cd !important; }

.new-badge {
  font-size: 0.6rem;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
  background: var(--hanko);
  color: var(--paper);
  animation: blink 1.2s step-start infinite;
}
@keyframes blink { 50% { opacity: 0; } }

.status-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.78rem;
  font-weight: 600;
}
.status-new        { background: #fff3cd; color: #8a6d1a; }
.status-confirmed   { background: #e3ecf1; color: #395a6e; }
.status-preparing   { background: var(--paper-dim); color: var(--indigo); }
.status-completed   { background: #dcefdc; color: #2c6e2c; }
.status-cancelled   { background: #f6e9e8; color: var(--hanko); }

/* Detail expand row */
.detail-row td { background: var(--paper-dim); padding: 0 14px; }
.order-detail { padding: 14px 0; display: flex; flex-direction: column; gap: 10px; }
.order-detail-item { display: flex; align-items: center; gap: 12px; }
.order-detail-img { width: 42px; height: 42px; object-fit: cover; border-radius: 4px; border: 1px solid var(--line); }
.order-detail-address { font-size: 0.85rem; color: var(--ink-soft); border-top: 1px dashed var(--line); padding-top: 10px; }
</style>