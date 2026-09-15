<template>
  <div class="container-fluid py-4">

    <!-- Toolbar -->
    <div class="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
      <h5 class="mb-0">Tất cả người dùng ({{ users.length }})</h5>
      <div class="d-flex gap-2">
        <input
          v-model="searchQuery"
          type="text"
          class="form-control form-control-sm"
          style="width:220px"
          placeholder="Tìm theo tên hoặc email..."
        />
        <select v-model="roleFilter" class="form-select form-select-sm" style="width:140px">
          <option value="">Tất cả vai trò</option>
          <option value="user">Khách hàng</option>
          <option value="admin">Quản trị viên</option>
        </select>
        <button class="btn btn-sm btn-outline-secondary" @click="loadUsers">↺ Làm mới</button>
      </div>
    </div>

    <div v-if="errorMsg" class="alert alert-danger">{{ errorMsg }}</div>
    <div v-if="loading" class="text-center py-4">
      <div class="spinner-border text-secondary"></div>
    </div>

    <div class="table-responsive" v-if="!loading">
      <table class="table table-hover align-middle">
        <thead>
          <tr>
            <th>Người dùng</th>
            <th>Email</th>
            <th>Vai trò</th>
            <th>Số đơn hàng</th>
            <th>Tổng chi tiêu</th>
            <th>Ngày tham gia</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredUsers.length === 0">
            <td colspan="7" class="text-center text-muted py-4">Không tìm thấy người dùng nào.</td>
          </tr>
          <tr v-for="u in filteredUsers" :key="u._id">
            <td>
              <div class="d-flex align-items-center gap-2">
                <div class="avatar-circle">{{ getInitial(u.name) }}</div>
                <span class="fw-semibold">{{ u.name }}</span>
                <span v-if="u._id === currentUserId" class="badge bg-secondary small-badge">Bạn</span>
              </div>
            </td>
            <td class="text-muted">{{ u.email }}</td>
            <td>
              <span class="badge" :class="u.role === 'admin' ? 'bg-primary' : 'bg-light text-dark border'">
                {{ u.role === 'admin' ? 'Quản trị viên' : 'Khách hàng' }}
              </span>
            </td>
            <td>{{ u.orderCount }}</td>
            <td class="fw-semibold text-brown">{{ formatPrice(u.totalSpent) }}</td>
            <td class="small text-muted">{{ formatDate(u.createdAt) }}</td>
            <td>
              <div class="d-flex gap-2">
                <select
                  class="form-select form-select-sm"
                  style="width:150px"
                  :disabled="u._id === currentUserId"
                  @change="updateRole(u._id, $event.target.value)"
                >
                  <option value="user"  :selected="u.role === 'user'">Khách hàng</option>
                  <option value="admin" :selected="u.role === 'admin'">Quản trị viên</option>
                </select>
                <button
                  class="btn btn-sm btn-outline-danger"
                  :disabled="u._id === currentUserId"
                  @click="confirmDelete(u)"
                >
                  🗑
                </button>
              </div>
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
const users = ref([]);
const loading = ref(false);
const errorMsg = ref('');
const searchQuery = ref('');
const roleFilter = ref('');

const currentUserId = computed(() => auth.user?.id);

const filteredUsers = computed(() => {
  return users.value.filter(u => {
    const matchesSearch =
      !searchQuery.value ||
      u.name?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesRole = !roleFilter.value || u.role === roleFilter.value;
    return matchesSearch && matchesRole;
  });
});

const getInitial = (name) => (name || '?').charAt(0).toUpperCase();
const formatPrice = (p) => (p || 0).toLocaleString('vi-VN') + ' ₫';
const formatDate = (d) => new Date(d).toLocaleDateString('vi-VN');

const loadUsers = async () => {
  loading.value = true;
  errorMsg.value = '';
  try {
    const config = { headers: { Authorization: `Bearer ${auth.token}` } };
    const res = await axios.get('/api/users', config);
    users.value = res.data;
  } catch (error) {
    errorMsg.value = error.response?.data?.message || 'Không thể tải danh sách người dùng.';
  } finally {
    loading.value = false;
  }
};

const updateRole = async (userId, role) => {
  try {
    const config = { headers: { Authorization: `Bearer ${auth.token}` } };
    await axios.put(`/api/users/${userId}/role`, { role }, config);
    const u = users.value.find(x => x._id === userId);
    if (u) u.role = role;
  } catch (error) {
    alert(error.response?.data?.message || 'Cập nhật vai trò thất bại!');
    loadUsers();
  }
};

const confirmDelete = async (u) => {
  if (!confirm(`Xóa người dùng "${u.name}"? Hành động này không thể hoàn tác.`)) return;
  try {
    const config = { headers: { Authorization: `Bearer ${auth.token}` } };
    await axios.delete(`/api/users/${u._id}`, config);
    users.value = users.value.filter(x => x._id !== u._id);
  } catch (error) {
    alert(error.response?.data?.message || 'Xóa người dùng thất bại!');
  }
};

onMounted(loadUsers);
</script>

<style scoped>
.text-brown { color: #2b1c12; }

.avatar-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #b3502c;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.85rem;
  flex-shrink: 0;
}

.small-badge {
  font-size: 0.65rem;
  padding: 2px 6px;
}
</style>
