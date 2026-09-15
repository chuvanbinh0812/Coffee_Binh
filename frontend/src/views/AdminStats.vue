<template>
  <div class="stats-page">
    <div class="stats-head">
      <div>
        <span class="stats-eyebrow">Tổng quan hoạt động</span>
        <h2 class="stats-title">Doanh thu &amp; vận hành</h2>
      </div>
      <div class="period-toggle">
        <button
          v-for="p in periods" :key="p.value"
          class="period-btn"
          :class="{ active: period === p.value }"
          @click="changePeriod(p.value)"
        >{{ p.label }}</button>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border" style="color: var(--indigo)"></div>
    </div>

    <template v-else>
      <!-- Tổng quan -->
      <div class="overview-grid">
        <div class="overview-card">
          <div class="overview-icon">￥</div>
          <div class="overview-body">
            <div class="overview-label">Tổng doanh thu</div>
            <div class="overview-value">{{ formatPrice(stats.overview.totalRevenue) }}</div>
          </div>
        </div>
        <div class="overview-card">
          <div class="overview-icon">▣</div>
          <div class="overview-body">
            <div class="overview-label">Tổng đơn hàng</div>
            <div class="overview-value">{{ stats.overview.totalOrders }}</div>
          </div>
        </div>
        <div class="overview-card">
          <div class="overview-icon">◎</div>
          <div class="overview-body">
            <div class="overview-label">Khách hàng</div>
            <div class="overview-value">{{ stats.overview.totalUsers }}</div>
          </div>
        </div>
        <div class="overview-card">
          <div class="overview-icon">◆</div>
          <div class="overview-body">
            <div class="overview-label">Sản phẩm</div>
            <div class="overview-value">{{ stats.overview.totalProducts }}</div>
          </div>
        </div>
      </div>

      <div class="row-2col">
        <!-- Biểu đồ doanh thu -->
        <div class="panel panel-wide">
          <h6 class="panel-title">Doanh thu theo thời gian</h6>
          <div v-if="stats.revenueByTime.length === 0" class="empty-note">
            Chưa có dữ liệu trong khoảng thời gian này
          </div>
          <div v-else class="chart-container">
            <div class="chart-bars">
              <div
                v-for="item in stats.revenueByTime"
                :key="item._id"
                class="chart-bar-wrap"
              >
                <div class="chart-value">{{ shortPrice(item.revenue) }}</div>
                <div
                  class="chart-bar"
                  :style="{ height: barHeight(item.revenue) + 'px' }"
                  :title="item._id + ': ' + formatPrice(item.revenue)"
                ></div>
                <div class="chart-label">{{ shortDate(item._id) }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Trạng thái đơn hàng -->
        <div class="panel">
          <h6 class="panel-title">Trạng thái đơn hàng</h6>
          <div v-for="item in stats.ordersByStatus" :key="item._id" class="status-row">
            <div class="status-row-head">
              <span>{{ statusLabel(item._id) }}</span>
              <span class="status-row-count">{{ item.count }}</span>
            </div>
            <div class="status-track">
              <div
                class="status-fill"
                :class="'fill-' + item._id"
                :style="{ width: statusPercent(item.count) + '%' }"
              ></div>
            </div>
          </div>
          <div v-if="stats.ordersByStatus.length === 0" class="empty-note">Chưa có dữ liệu</div>
        </div>
      </div>

      <div class="row-2col">
        <!-- Top sản phẩm -->
        <div class="panel">
          <h6 class="panel-title">Top 5 sản phẩm bán chạy</h6>
          <div v-for="(item, i) in stats.topProducts" :key="item._id" class="top-row">
            <span class="top-rank">{{ i + 1 }}</span>
            <div class="flex-grow-1">
              <div class="top-name">{{ item._id }}</div>
              <div class="top-meta">{{ item.totalQty }} sản phẩm · {{ formatPrice(item.totalRevenue) }}</div>
            </div>
          </div>
          <div v-if="stats.topProducts.length === 0" class="empty-note">Chưa có dữ liệu</div>
        </div>

        <!-- Phương thức thanh toán -->
        <div class="panel">
          <h6 class="panel-title">Phương thức thanh toán</h6>
          <div v-for="item in stats.revenueByPayment" :key="item._id" class="pay-row">
            <div>
              <div class="pay-name">{{ paymentLabel(item._id) }}</div>
              <div class="pay-count">{{ item.count }} đơn hàng</div>
            </div>
            <div class="pay-total">{{ formatPrice(item.total) }}</div>
          </div>
          <div v-if="stats.revenueByPayment.length === 0" class="empty-note">Chưa có dữ liệu</div>
        </div>
      </div>

      <!-- Đơn hàng gần nhất -->
      <div class="panel">
        <h6 class="panel-title">Đơn hàng gần nhất</h6>
        <div class="table-responsive">
          <table class="stats-table">
            <thead>
              <tr>
                <th>Mã đơn</th>
                <th>Khách hàng</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
                <th>Ngày đặt</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in stats.recentOrders" :key="order._id">
                <td class="mono-cell">#{{ order._id.slice(-6) }}</td>
                <td>
                  <div class="cust-name">{{ order.user?.name }}</div>
                  <div class="cust-email">{{ order.user?.email }}</div>
                </td>
                <td class="price-cell">{{ formatPrice(order.totalAmount) }}</td>
                <td>
                  <span class="status-pill" :class="'status-' + order.status">
                    {{ statusLabel(order.status) }}
                  </span>
                </td>
                <td class="mono-cell">{{ formatDate(order.createdAt) }}</td>
              </tr>
              <tr v-if="stats.recentOrders.length === 0">
                <td colspan="5" class="empty-note text-center">Chưa có đơn hàng nào</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const auth = useAuthStore();
const loading = ref(false);
const period = ref('month');

const periods = [
  { value: 'week',  label: '7 ngày' },
  { value: 'month', label: 'Tháng này' },
  { value: 'year',  label: 'Năm nay' }
];

const stats = ref({
  overview: { totalRevenue: 0, totalOrders: 0, totalUsers: 0, totalProducts: 0 },
  revenueByTime: [],
  ordersByStatus: [],
  topProducts: [],
  revenueByPayment: [],
  recentOrders: []
});

const formatPrice = (p) => (p || 0).toLocaleString('vi-VN') + ' ₫';
const shortPrice = (p) => {
  if (p >= 1_000_000) return (p / 1_000_000).toFixed(1) + 'M';
  if (p >= 1_000)     return (p / 1_000).toFixed(0) + 'K';
  return p;
};
const shortDate  = (d) => d?.slice(5) || d;
const formatDate = (d) => new Date(d).toLocaleDateString('vi-VN');

const maxRevenue = computed(() =>
  Math.max(...stats.value.revenueByTime.map(i => i.revenue), 1)
);
const barHeight = (revenue) => Math.max((revenue / maxRevenue.value) * 160, 4);

const totalOrders = computed(() =>
  stats.value.ordersByStatus.reduce((s, i) => s + i.count, 0) || 1
);
const statusPercent = (count) => Math.round((count / totalOrders.value) * 100);

const statusLabel = (s) => ({
  pending:    'Chờ xử lý',
  processing: 'Đang xử lý',
  shipped:    'Đang giao',
  delivered:  'Đã giao',
  cancelled:  'Đã hủy'
}[s] || s);

const paymentLabel = (p) => ({
  cod:     'Thanh toán khi nhận hàng (COD)',
  banking: 'Chuyển khoản ngân hàng',
  momo:    'Ví MoMo'
}[p] || p);

const loadStats = async () => {
  loading.value = true;
  try {
    const config = { headers: { Authorization: `Bearer ${auth.token}` } };
    const res = await axios.get(`/api/stats?period=${period.value}`, config);
    stats.value = res.data;
  } catch (err) {
    alert('Không thể tải dữ liệu thống kê');
  } finally {
    loading.value = false;
  }
};

watch(period, loadStats, { immediate: true });

const changePeriod = (p) => {
  period.value = p;
};
</script>

<style scoped>
.stats-page { font-family: var(--font-body); }

.stats-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 24px;
}
.stats-eyebrow {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.66rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--hanko);
  margin-bottom: 4px;
}
.stats-title {
  font-family: var(--font-display);
  font-size: 1.7rem;
  color: var(--ink);
  margin: 0;
}

.period-toggle {
  display: inline-flex;
  background: var(--paper-dim);
  border: 1px solid var(--line);
  border-radius: 4px;
  padding: 3px;
  gap: 2px;
}
.period-btn {
  border: none;
  background: transparent;
  padding: 7px 14px;
  font-family: var(--font-mono);
  font-size: 0.76rem;
  letter-spacing: 0.5px;
  color: var(--ink-soft);
  border-radius: 3px;
  transition: all 0.18s ease;
}
.period-btn.active { background: var(--indigo); color: var(--paper); }
.period-btn:not(.active):hover { color: var(--ink); }

/* Overview cards */
.overview-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-bottom: 20px;
}
.overview-card {
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 3px;
  padding: 18px;
  display: flex;
  align-items: center;
  gap: 14px;
  transition: border-color 0.2s, transform 0.2s;
}
.overview-card:hover { border-color: var(--indigo); transform: translateY(-2px); }
.overview-icon {
  width: 44px; height: 44px;
  border-radius: 50%;
  border: 1px solid var(--hanko);
  color: var(--hanko);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.15rem;
  flex-shrink: 0;
}
.overview-label {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.5px;
  color: var(--ink-soft);
  text-transform: uppercase;
  margin-bottom: 2px;
}
.overview-value {
  font-family: var(--font-display);
  font-size: 1.35rem;
  letter-spacing: 0.5px;
  color: var(--ink);
}

/* Panels */
.row-2col {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}
.panel {
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 3px;
  padding: 20px;
}
.panel-title {
  font-family: var(--font-display);
  font-size: 1.05rem;
  letter-spacing: 0.5px;
  color: var(--ink);
  margin-bottom: 16px;
}
.empty-note { text-align: center; color: var(--ink-soft); padding: 24px 0; font-size: 0.88rem; }

/* Chart */
.chart-container { overflow-x: auto; }
.chart-bars {
  display: flex;
  align-items: flex-end;
  gap: 6px;
  min-height: 200px;
  padding-bottom: 4px;
}
.chart-bar-wrap { min-width: 34px; flex: 1; text-align: center; }
.chart-bar {
  background: var(--indigo);
  width: 100%;
  border-radius: 2px 2px 0 0;
  transition: height 0.4s ease, background 0.2s ease;
}
.chart-bar-wrap:hover .chart-bar { background: var(--hanko); }
.chart-value { font-family: var(--font-mono); font-size: 0.64rem; color: var(--ink-soft); margin-bottom: 4px; }
.chart-label { font-family: var(--font-mono); font-size: 0.64rem; color: var(--ink-soft); margin-top: 6px; }

/* Order status */
.status-row { margin-bottom: 14px; }
.status-row:last-child { margin-bottom: 0; }
.status-row-head {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: var(--ink);
  margin-bottom: 6px;
}
.status-row-count { font-family: var(--font-mono); font-weight: 700; }
.status-track {
  height: 7px;
  background: var(--paper-dim);
  border-radius: 4px;
  overflow: hidden;
}
.status-fill { height: 100%; border-radius: 4px; transition: width 0.4s ease; }
.fill-pending    { background: #d1a13a; }
.fill-processing { background: #6f8fa8; }
.fill-shipped    { background: var(--indigo); }
.fill-delivered  { background: #4c8c5a; }
.fill-cancelled  { background: var(--hanko); }

/* Top products */
.top-row { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
.top-row:last-child { margin-bottom: 0; }
.top-rank {
  width: 26px; height: 26px;
  border-radius: 50%;
  border: 1px solid var(--hanko);
  color: var(--hanko);
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 0.78rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.top-name { font-weight: 600; font-size: 0.88rem; color: var(--ink); }
.top-meta { font-size: 0.78rem; color: var(--ink-soft); }

/* Payment methods */
.pay-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
  margin-bottom: 12px;
  border-bottom: 1px solid var(--line);
}
.pay-row:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
.pay-name { font-weight: 600; font-size: 0.86rem; color: var(--ink); }
.pay-count { font-size: 0.78rem; color: var(--ink-soft); }
.pay-total { font-family: var(--font-mono); font-weight: 700; color: var(--indigo); }

/* Table */
.stats-table { width: 100%; border-collapse: collapse; }
.stats-table thead th {
  text-align: left;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--ink-soft);
  padding: 0 10px 10px;
  border-bottom: 1px solid var(--line);
}
.stats-table tbody td {
  padding: 12px 10px;
  border-bottom: 1px solid var(--paper-dim);
  font-size: 0.88rem;
  color: var(--ink);
  vertical-align: middle;
}
.stats-table tbody tr:hover { background: var(--paper-dim); }
.mono-cell { font-family: var(--font-mono); font-size: 0.78rem; color: var(--ink-soft); }
.price-cell { font-weight: 700; color: var(--indigo); }
.cust-name { font-weight: 600; font-size: 0.86rem; }
.cust-email { font-size: 0.76rem; color: var(--ink-soft); }

.status-pill {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.74rem;
  font-weight: 600;
}
.status-pending    { background: #fff3cd; color: #8a6d1a; }
.status-processing { background: #e3ecf1; color: #395a6e; }
.status-shipped    { background: var(--paper-dim); color: var(--indigo); }
.status-delivered  { background: #dcefdc; color: #2c6e2c; }
.status-cancelled  { background: #f6e9e8; color: var(--hanko); }

@media (max-width: 992px) {
  .overview-grid { grid-template-columns: repeat(2, 1fr); }
  .row-2col { grid-template-columns: 1fr; }
}
</style>
