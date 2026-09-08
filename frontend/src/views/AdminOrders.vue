<template>
  <div class="orders-admin">

    <!-- Thẻ thống kê nhanh -->
    <div class="stat-row mb-4">
      <div class="stat-box">
        <div class="stat-num">{{ orders.length }}</div>
        <div class="stat-label">Tổng đơn</div>
      </div>
      <div class="stat-box warn">
        <div class="stat-num">{{ pendingOrders.length }}</div>
        <div class="stat-label">Chờ xử lý</div>
      </div>
      <div class="stat-box">
        <div class="stat-num">{{ deliveredCount }}</div>
        <div class="stat-label">Đã giao</div>
      </div>
      <div class="stat-box accent">
        <div class="stat-num">{{ formatPrice(totalRevenue) }}</div>
        <div class="stat-label">Doanh thu</div>
      </div>
    </div>

    <!-- Panel thông báo đơn chờ xử lý -->
    <div class="pending-panel mb-4" v-if="pendingOrders.length > 0">
      <div class="pending-header">
        <span>🔔 Có <strong>{{ pendingOrders.length }}</strong> đơn hàng đang chờ xử lý</span>
      </div>
      <div class="pending-list">
        <div v-for="order in pendingOrders" :key="order._id" class="pending-item">
          <div>
            <span class="fw-semibold">{{ order.user?.name }}</span>
            <span class="text-muted small ms-2">#{{ order._id.slice(-6) }}</span>
            <span class="ms-2 text-muted small">{{ formatDate(order.createdAt) }}</span>
          </div>
          <div class="d-flex align-items-center gap-2">
            <span class="fw-bold text-brown">{{ formatPrice(order.totalAmount) }}</span>
            <select
              class="form-select form-select-sm"
              style="width:140px"
              @change="updateStatus(order._id, $event.target.value)"
            >
              <option value="pending"    selected>Chờ xử lý</option>
              <option value="processing">Đang pha chế</option>
              <option value="shipped">Đang giao</option>
              <option value="delivered">Đã giao</option>
              <option value="cancelled">Đã hủy</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Toolbar -->
    <div class="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
      <h5 class="mb-0">Tất cả đơn hàng</h5>
      <div class="d-flex gap-2">
        <select v-model="statusFilter" class="form-select form-select-sm" style="width:150px">
          <option value="">Tất cả trạng thái</option>
          <option value="pending">Chờ xử lý</option>
          <option value="processing">Đang pha chế</option>
          <option value="shipped">Đang giao</option>
          <option value="delivered">Đã giao</option>
          <option value="cancelled">Đã hủy</option>
        </select>
        <button class="btn btn-sm btn-outline-secondary" @click="loadOrders">↺ Làm mới</button>
      </div>
    </div>

    <div v-if="errorMsg" class="alert alert-danger">{{ errorMsg }}</div>
    <div v-if="loading" class="text-center py-4">
      <div class="spinner-border text-secondary"></div>
    </div>

    <div class="table-responsive orders-table-wrap" v-if="!loading">
      <table class="table table-hover align-middle mb-0">
        <thead>
          <tr>
            <th>Mã đơn</th>
            <th>Khách hàng</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
            <th>Ngày đặt</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredOrders.length === 0">
            <td colspan="6" class="text-center text-muted py-4">Chưa có đơn hàng nào.</td>
          </tr>
          <tr
            v-for="order in filteredOrders"
            :key="order._id"
            :class="{ 'pending-row': order.status === 'pending' }"
          >
            <td>
              <div class="d-flex align-items-center gap-2">
                <span class="order-id">#{{ order._id.slice(-6) }}</span>
                <span v-if="order.status === 'pending'" class="badge bg-danger new-badge">MỚI</span>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center gap-2">
                <div class="avatar-circle">{{ getInitial(order.user?.name) }}</div>
                <span>{{ order.user?.name || 'N/A' }}</span>
              </div>
            </td>
            <td class="fw-semibold text-brown">{{ formatPrice(order.totalAmount) }}</td>
            <td>
              <span class="status-badge" :class="'status-' + order.status">
                {{ getStatusLabel(order.status) }}
              </span>
            </td>
            <td class="small text-muted">{{ formatDate(order.createdAt) }}</td>
            <td>
              <select
                class="form-select form-select-sm"
                style="width:150px"
                @change="updateStatus(order._id, $event.target.value)"
              >
                <option value="pending"    :selected="order.status === 'pending'">Chờ xử lý</option>
                <option value="processing" :selected="order.status === 'processing'">Đang pha chế</option>
                <option value="shipped"    :selected="order.status === 'shipped'">Đang giao</option>
                <option value="delivered"  :selected="order.status === 'delivered'">Đã giao</option>
                <option value="cancelled"  :selected="order.status === 'cancelled'">Đã hủy</option>
              </select>
            </td>
          </tr>
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

const pendingOrders = computed(() =>
  orders.value.filter(o => o.status === 'pending')
);
const deliveredCount = computed(() =>
  orders.value.filter(o => o.status === 'delivered').length
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
  pending:    'Chờ xử lý',
  processing: 'Đang pha chế',
  shipped:    'Đang giao',
  delivered:  'Đã giao',
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
.text-brown { color: #2b1c12; }

/* ===== Thẻ thống kê ===== */
.stat-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}
.stat-box {
  background: #f8f0e1;
  border: 1px solid #ddc9a0;
  border-radius: 8px;
  padding: 16px 18px;
  text-align: center;
}
.stat-box.warn { border-color: #b3502c; background: #fbeaea; }
.stat-box.accent { background: #efe1c3; }
.stat-num { font-size: 1.5rem; font-weight: 700; color: #2a1c12; }
.stat-box.warn .stat-num { color: #b3502c; }
.stat-box.accent .stat-num { font-size: 1.15rem; color: #6f4423; }
.stat-label { font-size: 0.78rem; color: #6b5646; margin-top: 4px; }

@media (max-width: 768px) {
  .stat-row { grid-template-columns: repeat(2, 1fr); }
}

/* ===== Panel đơn chờ xử lý ===== */
.pending-panel {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(42,28,18,0.15);
}
.pending-header {
  background: #a8451f;
  color: white;
  padding: 12px 18px;
  font-size: 0.95rem;
}
.pending-list {
  background: white;
  max-height: 220px;
  overflow-y: auto;
}
.pending-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 18px;
  border-bottom: 1px solid #efe1c3;
  animation: slideIn 0.3s ease;
}
.pending-item:last-child { border-bottom: none; }
@keyframes slideIn {
  from { opacity: 0; transform: translateX(-10px); }
  to   { opacity: 1; transform: translateX(0); }
}

/* ===== Bảng đơn hàng ===== */
.orders-table-wrap {
  background: #f8f0e1;
  border: 1px solid #ddc9a0;
  border-radius: 8px;
  overflow: hidden;
}
.order-id { font-family: 'Space Mono', monospace; font-size: 0.85rem; color: #6b5646; }

.avatar-circle {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #6f4423;
  color: #f8f0e1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.8rem;
  flex-shrink: 0;
}

/* Hàng đơn pending trong bảng */
.pending-row { background-color: #fffbf0 !important; }
.pending-row:hover { background-color: #fff3cd !important; }

/* Badge MỚI nhấp nháy */
.new-badge {
  font-size: 0.62rem;
  padding: 2px 5px;
  border-radius: 4px;
  animation: blink 1.2s step-start infinite;
}
@keyframes blink { 50% { opacity: 0; } }

/* ===== Status badges theo tông thương hiệu ===== */
.status-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.78rem;
  font-weight: 600;
}
.status-pending    { background: #fff3cd; color: #8a6d1a; }
.status-processing { background: #efe1c3; color: #6f4423; }
.status-shipped    { background: #ddc9a0; color: #3e2a17; }
.status-delivered  { background: #dcefdc; color: #2c6e2c; }
.status-cancelled  { background: #f6e9e8; color: #a8451f; }
</style>
