<template>
  <div class="ingredients-admin">

    <div class="toolbar mb-4">
      <div>
        <span class="page-eyebrow">Kho hàng</span>
        <h5 class="page-title">Nguyên liệu &amp; tồn kho ({{ ingredients.length }})</h5>
      </div>
      <button class="btn-add" @click="openAddForm">+ Thêm nguyên liệu</button>
    </div>

    <div class="stat-row mb-4">
      <div class="stat-box">
        <div class="stat-icon">◆</div>
        <div>
          <div class="stat-num">{{ ingredients.length }}</div>
          <div class="stat-label">Loại nguyên liệu</div>
        </div>
      </div>
      <div class="stat-box warn">
        <div class="stat-icon">⚠</div>
        <div>
          <div class="stat-num">{{ lowStockList.length }}</div>
          <div class="stat-label">Sắp hết hàng</div>
        </div>
      </div>
    </div>

    <div v-if="lowStockList.length > 0" class="low-stock-panel mb-4">
      <div class="low-stock-header">
        <span>Có <strong>{{ lowStockList.length }}</strong> nguyên liệu sắp hết, cần nhập thêm</span>
      </div>
      <div class="low-stock-list">
        <span v-for="ing in lowStockList" :key="ing._id" class="low-stock-chip">
          {{ ing.name }}: còn {{ ing.stockQuantity }}{{ ing.unit }}
        </span>
      </div>
    </div>

    <!-- Form thêm/sửa -->
    <div v-if="showForm" class="form-card mb-4">
      <div class="form-card-header">
        <h5 class="mb-0">{{ editingIngredient ? 'Sửa nguyên liệu' : 'Thêm nguyên liệu' }}</h5>
        <button class="btn-close-form" @click="cancelForm">✕</button>
      </div>
      <form @submit.prevent="saveIngredient" class="p-4">
        <div class="row g-3">
          <div class="col-md-5">
            <label class="form-label">Tên nguyên liệu</label>
            <input type="text" class="form-control" v-model="form.name" placeholder="VD: Hạt cà phê Robusta" required />
          </div>
          <div class="col-md-3">
            <label class="form-label">Đơn vị</label>
            <input type="text" class="form-control" v-model="form.unit" placeholder="kg, g, lít, gói..." required />
          </div>
          <div class="col-md-2">
            <label class="form-label">Tồn kho</label>
            <input type="number" class="form-control" v-model="form.stockQuantity" placeholder="0" required />
          </div>
          <div class="col-md-2">
            <label class="form-label">Ngưỡng cảnh báo</label>
            <input type="number" class="form-control" v-model="form.minThreshold" placeholder="0" />
          </div>
          <div class="col-12 d-flex gap-2 pt-2">
            <button type="submit" class="btn-save" :disabled="saving">
              {{ saving ? 'Đang lưu...' : (editingIngredient ? 'Cập nhật' : 'Thêm mới') }}
            </button>
            <button type="button" class="btn-cancel" @click="cancelForm">Hủy</button>
          </div>
        </div>
      </form>
    </div>

    <div v-if="loading" class="text-center py-4">
      <div class="spinner-border" style="color: var(--indigo)"></div>
    </div>

    <div class="ing-table-wrap" v-else>
      <table class="ing-table">
        <thead>
          <tr>
            <th>Tên nguyên liệu</th>
            <th>Đơn vị</th>
            <th>Tồn kho</th>
            <th>Ngưỡng cảnh báo</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="ingredients.length === 0">
            <td colspan="6" class="text-center text-muted py-4">Chưa có nguyên liệu nào.</td>
          </tr>
          <tr v-for="ing in ingredients" :key="ing._id" :class="{ 'low-row': isLow(ing) }">
            <td class="fw-semibold">{{ ing.name }}</td>
            <td class="mono-cell">{{ ing.unit }}</td>
            <td class="mono-cell">{{ ing.stockQuantity }} {{ ing.unit }}</td>
            <td class="mono-cell">{{ ing.minThreshold }} {{ ing.unit }}</td>
            <td>
              <span class="status-badge" :class="isLow(ing) ? 'status-low' : 'status-ok'">
                {{ isLow(ing) ? 'Sắp hết' : 'Còn đủ' }}
              </span>
            </td>
            <td>
              <div class="d-flex gap-2">
                <button class="btn-edit" @click="editIngredient(ing)">Sửa</button>
                <button class="btn-delete" @click="deleteIngredient(ing._id)">Xóa</button>
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
const ingredients = ref([]);
const loading = ref(false);
const saving = ref(false);
const showForm = ref(false);
const editingIngredient = ref(null);

const emptyForm = () => ({ name: '', unit: '', stockQuantity: 0, minThreshold: 0 });
const form = ref(emptyForm());

const config = () => ({ headers: { Authorization: `Bearer ${auth.token}` } });

const isLow = (ing) => ing.stockQuantity <= ing.minThreshold;
const lowStockList = computed(() => ingredients.value.filter(isLow));

const loadIngredients = async () => {
  loading.value = true;
  try {
    const res = await axios.get('/api/ingredients', config());
    ingredients.value = res.data;
  } catch (error) {
    alert(error.response?.data?.message || 'Không thể tải danh sách nguyên liệu.');
  } finally {
    loading.value = false;
  }
};

const openAddForm = () => {
  editingIngredient.value = null;
  form.value = emptyForm();
  showForm.value = true;
};

const editIngredient = (ing) => {
  editingIngredient.value = ing;
  form.value = { name: ing.name, unit: ing.unit, stockQuantity: ing.stockQuantity, minThreshold: ing.minThreshold };
  showForm.value = true;
};

const cancelForm = () => {
  showForm.value = false;
  editingIngredient.value = null;
  form.value = emptyForm();
};

const saveIngredient = async () => {
  saving.value = true;
  try {
    if (editingIngredient.value) {
      await axios.put(`/api/ingredients/${editingIngredient.value._id}`, form.value, config());
    } else {
      await axios.post('/api/ingredients', form.value, config());
    }
    await loadIngredients();
    cancelForm();
  } catch (error) {
    alert(error.response?.data?.message || 'Lỗi khi lưu nguyên liệu!');
  } finally {
    saving.value = false;
  }
};

const deleteIngredient = async (id) => {
  if (!confirm('Xóa nguyên liệu này?')) return;
  try {
    await axios.delete(`/api/ingredients/${id}`, config());
    await loadIngredients();
  } catch (error) {
    alert(error.response?.data?.message || 'Lỗi khi xóa!');
  }
};

onMounted(loadIngredients);
</script>

<style scoped>
.ingredients-admin { font-family: var(--font-body); }

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 14px;
}
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

.btn-add {
  background: var(--indigo);
  color: var(--paper);
  border: none;
  padding: 9px 20px;
  border-radius: 3px;
  font-weight: 600;
  font-size: 0.86rem;
}
.btn-add:hover { background: var(--indigo-deep); }

.stat-row { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; max-width: 460px; }
.stat-box {
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 3px;
  padding: 16px 18px;
  display: flex;
  align-items: center;
  gap: 12px;
}
.stat-box.warn { border-color: var(--hanko); }
.stat-icon {
  width: 38px; height: 38px;
  border-radius: 50%;
  border: 1px solid var(--indigo);
  color: var(--indigo);
  display: flex; align-items: center; justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
}
.stat-box.warn .stat-icon { border-color: var(--hanko); color: var(--hanko); }
.stat-num { font-family: var(--font-display); font-size: 1.4rem; color: var(--ink); }
.stat-box.warn .stat-num { color: var(--hanko); }
.stat-label { font-family: var(--font-mono); font-size: 0.7rem; color: var(--ink-soft); text-transform: uppercase; margin-top: 2px; }

.low-stock-panel { border: 1px solid var(--hanko); border-radius: 3px; overflow: hidden; }
.low-stock-header { background: var(--hanko); color: var(--paper); padding: 10px 18px; font-size: 0.88rem; }
.low-stock-list { background: var(--paper); padding: 12px 18px; display: flex; flex-wrap: wrap; gap: 8px; }
.low-stock-chip { background: #f6e9e8; color: var(--hanko); font-size: 0.78rem; padding: 4px 10px; border-radius: 20px; }

.form-card { background: var(--paper); border: 1px solid var(--line); border-radius: 3px; overflow: hidden; }
.form-card-header {
  background: var(--paper-dim);
  padding: 14px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--line);
}
.form-card-header h5 { font-family: var(--font-display); letter-spacing: 0.5px; color: var(--ink); }
.btn-close-form { background: none; border: none; font-size: 1.1rem; color: var(--ink-soft); }
.form-label { font-size: 0.82rem; font-weight: 600; color: var(--ink); }
.form-control { border-color: var(--line); border-radius: 3px; }
.form-control:focus { border-color: var(--indigo); box-shadow: 0 0 0 3px rgba(111,68,35,0.12); }

.btn-save { background: var(--indigo); color: var(--paper); border: none; padding: 9px 22px; border-radius: 3px; font-weight: 600; }
.btn-save:hover { background: var(--indigo-deep); }
.btn-save:disabled { opacity: 0.6; }
.btn-cancel { background: transparent; border: 1px solid var(--line); color: var(--ink); padding: 9px 22px; border-radius: 3px; }
.btn-cancel:hover { background: var(--paper-dim); }

.ing-table-wrap { background: var(--paper); border: 1px solid var(--line); border-radius: 3px; overflow: auto; }
.ing-table { width: 100%; border-collapse: collapse; }
.ing-table thead th {
  text-align: left;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--ink-soft);
  padding: 14px 14px 10px;
  border-bottom: 1px solid var(--line);
}
.ing-table tbody td {
  padding: 12px 14px;
  border-bottom: 1px solid var(--paper-dim);
  font-size: 0.88rem;
  color: var(--ink);
}
.ing-table tbody tr:hover { background: var(--paper-dim); }
.low-row { background-color: #fff8f0; }
.mono-cell { font-family: var(--font-mono); font-size: 0.82rem; color: var(--ink-soft); }

.status-badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 0.76rem; font-weight: 600; }
.status-ok  { background: #dcefdc; color: #2c6e2c; }
.status-low { background: #f6e9e8; color: var(--hanko); }

.btn-edit, .btn-delete {
  padding: 5px 12px;
  border-radius: 3px;
  font-size: 0.78rem;
  border: 1px solid var(--line);
  background: transparent;
  color: var(--ink);
}
.btn-edit:hover { background: var(--paper-dim); }
.btn-delete { color: var(--hanko); border-color: var(--hanko); }
.btn-delete:hover { background: #f6e9e8; }
</style>
