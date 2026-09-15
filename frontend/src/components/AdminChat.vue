<template>
<<<<<<< HEAD
  <div class="chat-page">
    <div class="page-head mb-4">
      <span class="page-eyebrow">Hỗ trợ khách hàng</span>
      <h5 class="page-title">Tin nhắn khách hàng</h5>
    </div>

    <!-- Tab chuyển giữa Chat và Liên hệ -->
    <div class="chat-tabs mb-4">
      <button class="chat-tab" :class="{ active: activeTab === 'chat' }" @click="activeTab = 'chat'">
        Chat realtime
      </button>
      <button class="chat-tab" :class="{ active: activeTab === 'contact' }" @click="activeTab = 'contact'">
        Liên hệ
        <span v-if="unreadContacts > 0" class="tab-badge">{{ unreadContacts }}</span>
      </button>
    </div>

    <!-- ===== PHẦN CHAT REALTIME ===== -->
    <div v-if="activeTab === 'chat'" class="chat-grid">
      <div class="chat-panel users-panel">
        <div class="panel-head">Khách đang chat</div>
        <div class="users-list">
          <div
            v-for="user in chatStore.chatUsers"
            :key="user.socketId"
            class="user-item"
            :class="{ active: selectedUser?.socketId === user.socketId }"
            @click="selectUser(user)"
          >
            <div class="user-avatar">{{ (user.userName || '?').charAt(0).toUpperCase() }}</div>
            <div class="user-info">
              <div class="user-name-row">
                <span class="user-name">{{ user.userName }}</span>
                <span v-if="user.unread > 0" class="user-unread">{{ user.unread }}</span>
              </div>
              <div class="user-lastmsg">{{ user.lastMsg }}</div>
            </div>
          </div>
          <div v-if="chatStore.chatUsers.length === 0" class="empty-users">
            Chưa có khách nào nhắn tin
          </div>
        </div>
      </div>

      <div class="chat-panel thread-panel">
        <div v-if="!selectedUser" class="thread-empty">
          Chọn một khách hàng để bắt đầu chat
        </div>
        <template v-else>
          <div class="panel-head thread-head">
            <div class="user-avatar small">{{ selectedUser.userName?.charAt(0).toUpperCase() }}</div>
            {{ selectedUser.userName }}
          </div>
          <div class="chat-messages" ref="messagesEl">
            <div
              v-for="(msg, i) in currentMessages"
              :key="i"
              class="chat-msg"
              :class="msg.sender === 'admin' ? 'msg-admin' : 'msg-user'"
            >
              <div class="msg-bubble">{{ msg.text }}</div>
              <div class="msg-time">{{ msg.time }}</div>
            </div>
          </div>
          <div class="thread-footer">
            <input
              v-model="replyText"
              @keyup.enter="sendReply"
              type="text"
              class="reply-input"
              placeholder="Nhập phản hồi..."
            />
            <button class="btn-send" @click="sendReply" :disabled="!replyText.trim()">Gửi</button>
          </div>
        </template>
=======
  <div class="container-fluid py-4">

    <!-- Tab chuyển giữa Chat và Liên hệ -->
    <ul class="nav nav-tabs mb-4">
      <li class="nav-item">
        <button class="nav-link" :class="{ active: activeTab === 'chat' }" @click="activeTab = 'chat'">
          💬 Chat realtime
        </button>
      </li>
      <li class="nav-item">
        <button class="nav-link" :class="{ active: activeTab === 'contact' }" @click="activeTab = 'contact'">
          📩 Liên hệ
          <span v-if="unreadContacts > 0" class="badge bg-danger ms-1">{{ unreadContacts }}</span>
        </button>
      </li>
    </ul>

    <!-- ===== PHẦN CHAT REALTIME ===== -->
    <div v-if="activeTab === 'chat'">
      <div class="row g-3">
        <div class="col-md-4">
          <div class="card h-100">
            <div class="card-header bg-brown text-white">Khách đang chat</div>
            <div class="list-group list-group-flush">
              <div
                v-for="user in chatStore.chatUsers"
                :key="user.socketId"
                class="list-group-item list-group-item-action"
                :class="{ active: selectedUser?.socketId === user.socketId }"
                @click="selectUser(user)"
              >
                <div class="d-flex justify-content-between">
                  <span>👤 {{ user.userName }}</span>
                  <span v-if="user.unread > 0" class="badge bg-danger">{{ user.unread }}</span>
                </div>
                <small class="text-muted text-truncate d-block">{{ user.lastMsg }}</small>
              </div>
              <div v-if="chatStore.chatUsers.length === 0" class="list-group-item text-center text-muted py-4">
                Chưa có khách nào nhắn tin
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-8">
          <div class="card h-100">
            <div v-if="!selectedUser" class="card-body d-flex align-items-center justify-content-center text-muted">
              Chọn một khách hàng để bắt đầu chat
            </div>
            <template v-else>
              <div class="card-header bg-brown text-white">
                💬 {{ selectedUser.userName }}
              </div>
              <div class="card-body chat-messages" ref="messagesEl">
                <div
                  v-for="(msg, i) in currentMessages"
                  :key="i"
                  class="chat-msg"
                  :class="msg.sender === 'admin' ? 'msg-admin' : 'msg-user'"
                >
                  <div class="msg-bubble">{{ msg.text }}</div>
                  <div class="msg-time">{{ msg.time }}</div>
                </div>
              </div>
              <div class="card-footer p-2">
                <div class="input-group">
                  <input
                    v-model="replyText"
                    @keyup.enter="sendReply"
                    type="text"
                    class="form-control"
                    placeholder="Nhập phản hồi..."
                  />
                  <button class="btn btn-brown" @click="sendReply" :disabled="!replyText.trim()">Gửi</button>
                </div>
              </div>
            </template>
          </div>
        </div>
>>>>>>> 6644a9b3829b34f1e619ed6d01c457846ddf0d75
      </div>
    </div>

    <!-- ===== PHẦN LIÊN HỆ ===== -->
    <div v-if="activeTab === 'contact'">
      <div v-if="loadingContacts" class="text-center py-4">
<<<<<<< HEAD
        <div class="spinner-border" style="color: var(--indigo)"></div>
      </div>

      <div v-else-if="contacts.length === 0" class="empty-users py-5 text-center">
        Chưa có liên hệ nào
=======
        <div class="spinner-border text-secondary"></div>
      </div>

      <div v-else-if="contacts.length === 0" class="text-center text-muted py-5">
        📩 Chưa có liên hệ nào
>>>>>>> 6644a9b3829b34f1e619ed6d01c457846ddf0d75
      </div>

      <div v-else class="contact-list">
        <div
          v-for="c in contacts"
          :key="c._id"
          class="contact-card"
          :class="{ unread: !c.isRead }"
        >
          <div class="contact-card-header">
            <div>
              <span class="fw-semibold">{{ c.name }}</span>
<<<<<<< HEAD
              <span class="mono-cell ms-2">{{ c.email }}</span>
              <span v-if="!c.isRead" class="new-tag ms-2">Mới</span>
            </div>
            <div class="d-flex align-items-center gap-2">
              <span class="mono-cell">{{ formatDate(c.createdAt) }}</span>
              <button
                v-if="!c.isRead"
                class="btn-mark-read"
                @click="markRead(c._id)"
              >✓ Đã đọc</button>
              <button class="btn-del-contact" @click="deleteContact(c._id)">🗑</button>
=======
              <span class="text-muted small ms-2">{{ c.email }}</span>
              <span v-if="!c.isRead" class="badge bg-danger ms-2 small">Mới</span>
            </div>
            <div class="d-flex align-items-center gap-2">
              <span class="text-muted small">{{ formatDate(c.createdAt) }}</span>
              <button
                v-if="!c.isRead"
                class="btn btn-sm btn-outline-secondary"
                @click="markRead(c._id)"
              >✓ Đã đọc</button>
              <button class="btn btn-sm btn-outline-danger" @click="deleteContact(c._id)">🗑</button>
>>>>>>> 6644a9b3829b34f1e619ed6d01c457846ddf0d75
            </div>
          </div>
          <div class="contact-message">{{ c.message }}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue';
import { io } from 'socket.io-client';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import { useAdminChatStore } from '../store/adminChatStore';

const auth = useAuthStore();
const chatStore = useAdminChatStore();

const activeTab = ref('chat');
const selectedUser = ref(null);
const replyText = ref('');
const messagesEl = ref(null);
let socket = null;

// Liên hệ
const contacts = ref([]);
const loadingContacts = ref(false);
const unreadContacts = computed(() => contacts.value.filter(c => !c.isRead).length);

const getTime = () => new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
const formatDate = (d) => new Date(d).toLocaleString('vi-VN');

const config = () => ({ headers: { Authorization: `Bearer ${auth.token}` } });

const currentMessages = computed(() =>
  selectedUser.value ? (chatStore.allMessages[selectedUser.value.socketId] || []) : []
);

const scrollToBottom = async () => {
  await nextTick();
  if (messagesEl.value) messagesEl.value.scrollTop = messagesEl.value.scrollHeight;
};

const selectUser = (user) => {
  selectedUser.value = user;
  chatStore.clearUnread(user.socketId);
  scrollToBottom();
};

const sendReply = () => {
  const text = replyText.value.trim();
  if (!text || !selectedUser.value) return;
  const msg = { text, sender: 'admin', time: getTime() };
  chatStore.addMessage(selectedUser.value.socketId, msg);
  socket.emit('admin_reply', { targetSocketId: selectedUser.value.socketId, text, time: getTime() });
  replyText.value = '';
  scrollToBottom();
};

// Load liên hệ từ DB
const loadContacts = async () => {
  loadingContacts.value = true;
  try {
    const res = await axios.get('/api/contact', config());
    contacts.value = res.data;
  } catch {} finally {
    loadingContacts.value = false;
  }
};

const markRead = async (id) => {
  try {
    await axios.put(`/api/contact/${id}/read`, {}, config());
    const c = contacts.value.find(x => x._id === id);
    if (c) c.isRead = true;
  } catch {}
};

const deleteContact = async (id) => {
  if (!confirm('Xóa liên hệ này?')) return;
  try {
    await axios.delete(`/api/contact/${id}`, config());
    contacts.value = contacts.value.filter(c => c._id !== id);
  } catch {}
};

// Khi bấm tab liên hệ → load
watch(activeTab, (tab) => {
  if (tab === 'contact') loadContacts();
});

onMounted(() => {
  socket = io('http://localhost:5000');

  socket.on('connect', () => {
    socket.emit('admin_join', { token: auth.token });
  });

  socket.on('user_connected', (user) => chatStore.addUser(user));

  socket.on('user_message', (data) => {
    const { socketId, text, time, userName } = data;
    chatStore.addUser({ socketId, userName });
    chatStore.addMessage(socketId, { text, sender: 'user', time });
    chatStore.updateLastMsg(socketId, text);
    if (selectedUser.value?.socketId !== socketId) chatStore.incrementUnread(socketId);
    else scrollToBottom();
  });

  socket.on('user_disconnected', (socketId) => {
    chatStore.removeUser(socketId);
    if (selectedUser.value?.socketId === socketId) selectedUser.value = null;
  });

  // Nhận liên hệ mới realtime
  socket.on('new_contact', (data) => {
    contacts.value.unshift({ ...data, _id: data.id, isRead: false });
<<<<<<< HEAD
=======
    // Nếu đang ở tab liên hệ thì không cần thông báo riêng
    if (activeTab.value !== 'contact') {
      // Badge tự cập nhật qua unreadContacts computed
    }
>>>>>>> 6644a9b3829b34f1e619ed6d01c457846ddf0d75
  });
});

onUnmounted(() => {
  if (socket) socket.disconnect();
});

watch(currentMessages, scrollToBottom);
</script>

<style scoped>
<<<<<<< HEAD
.chat-page { font-family: var(--font-body); }

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
.mono-cell { font-family: var(--font-mono); font-size: 0.76rem; color: var(--ink-soft); }

/* Tabs */
.chat-tabs {
  display: inline-flex;
  border-bottom: 1px solid var(--line);
  gap: 4px;
}
.chat-tab {
  background: transparent;
  border: none;
  padding: 10px 16px;
  font-size: 0.88rem;
  color: var(--ink-soft);
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.chat-tab.active { color: var(--ink); border-bottom-color: var(--hanko); font-weight: 600; }
.tab-badge {
  background: var(--hanko);
  color: var(--paper);
  font-family: var(--font-mono);
  font-size: 0.66rem;
  font-weight: 700;
  padding: 1px 7px;
  border-radius: 20px;
}

/* Chat layout */
.chat-grid {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 16px;
  min-height: 460px;
}
.chat-panel {
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.panel-head {
  background: var(--ink);
  color: var(--paper);
  padding: 13px 16px;
  font-size: 0.88rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}

.users-list { overflow-y: auto; flex: 1; }
.user-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--paper-dim);
  cursor: pointer;
  transition: background 0.15s;
}
.user-item:hover { background: var(--paper-dim); }
.user-item.active { background: rgba(179,80,44,0.1); border-left: 3px solid var(--hanko); }
.user-avatar {
  width: 34px; height: 34px;
  border-radius: 50%;
  background: var(--indigo);
  color: var(--paper);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.85rem;
  flex-shrink: 0;
}
.user-avatar.small { width: 26px; height: 26px; font-size: 0.72rem; }
.user-info { min-width: 0; flex: 1; }
.user-name-row { display: flex; justify-content: space-between; align-items: center; }
.user-name { font-size: 0.86rem; font-weight: 600; color: var(--ink); }
.user-unread {
  background: var(--hanko);
  color: var(--paper);
  font-size: 0.65rem;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: 20px;
}
.user-lastmsg {
  font-size: 0.78rem;
  color: var(--ink-soft);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.empty-users { text-align: center; color: var(--ink-soft); padding: 30px 14px; font-size: 0.86rem; }

.thread-panel { min-height: 460px; }
.thread-empty {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--ink-soft);
  font-size: 0.9rem;
}
.thread-head { gap: 10px; }

.chat-messages {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 300px;
=======
.bg-brown { background-color: #2b1c12; }
.btn-brown { background-color: #2b1c12; color: white; border-color: #2b1c12; }
.btn-brown:hover { background-color: #4a4a4a; color: white; }

.chat-messages {
  height: 340px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
>>>>>>> 6644a9b3829b34f1e619ed6d01c457846ddf0d75
}
.chat-msg { display: flex; flex-direction: column; }
.msg-user { align-items: flex-start; }
.msg-admin { align-items: flex-end; }
.msg-bubble {
  max-width: 75%;
<<<<<<< HEAD
  padding: 9px 13px;
  border-radius: 12px;
  font-size: 0.88rem;
  word-break: break-word;
}
.msg-user .msg-bubble { background: var(--paper-dim); color: var(--ink); border-bottom-left-radius: 3px; }
.msg-admin .msg-bubble { background: var(--indigo); color: var(--paper); border-bottom-right-radius: 3px; }
.msg-time { font-family: var(--font-mono); font-size: 0.65rem; color: var(--ink-soft); margin-top: 3px; }

.thread-footer {
  display: flex;
  gap: 8px;
  padding: 12px;
  border-top: 1px solid var(--line);
}
.reply-input {
  flex: 1;
  border: 1px solid var(--line);
  border-radius: 3px;
  padding: 9px 12px;
  font-size: 0.88rem;
  background: var(--paper);
  color: var(--ink);
}
.reply-input:focus { outline: none; border-color: var(--indigo); }
.btn-send {
  background: var(--indigo);
  color: var(--paper);
  border: none;
  padding: 0 20px;
  border-radius: 3px;
  font-weight: 600;
  font-size: 0.86rem;
}
.btn-send:hover:not(:disabled) { background: var(--indigo-deep); }
.btn-send:disabled { opacity: 0.5; }
=======
  padding: 8px 12px;
  border-radius: 12px;
  font-size: 14px;
  word-break: break-word;
}
.msg-user .msg-bubble { background: #efe1c3; color: #333; }
.msg-admin .msg-bubble { background: #2b1c12; color: white; }
.msg-time { font-size: 10px; color: #aaa; margin-top: 2px; }
.list-group-item.active { background-color: #f5ebe6; color: #333; border-color: #e0d5d0; }
>>>>>>> 6644a9b3829b34f1e619ed6d01c457846ddf0d75

/* Liên hệ */
.contact-list { display: flex; flex-direction: column; gap: 12px; }
.contact-card {
<<<<<<< HEAD
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 3px;
  padding: 16px;
  border-left: 3px solid transparent;
}
.contact-card.unread { border-left-color: var(--hanko); background: #fffbf0; }
=======
  background: white;
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(26, 26, 26,0.08);
  border-left: 4px solid transparent;
}
.contact-card.unread {
  border-left-color: #a8451f;
  background: #fffbf0;
}
>>>>>>> 6644a9b3829b34f1e619ed6d01c457846ddf0d75
.contact-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
<<<<<<< HEAD
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 10px;
}
.new-tag {
  background: var(--hanko);
  color: var(--paper);
  font-size: 0.65rem;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 4px;
}
.contact-message {
  color: var(--ink-soft);
  font-size: 0.88rem;
  line-height: 1.6;
  white-space: pre-wrap;
}
.btn-mark-read, .btn-del-contact {
  border: 1px solid var(--line);
  background: transparent;
  color: var(--ink);
  padding: 4px 10px;
  border-radius: 3px;
  font-size: 0.76rem;
}
.btn-mark-read:hover { background: var(--paper-dim); }
.btn-del-contact { color: var(--hanko); border-color: var(--hanko); }
.btn-del-contact:hover { background: #f6e9e8; }

@media (max-width: 768px) {
  .chat-grid { grid-template-columns: 1fr; }
  .users-panel { max-height: 220px; }
}
</style>
=======
  margin-bottom: 10px;
}
.contact-message {
  color: #555;
  font-size: 0.9rem;
  line-height: 1.6;
  white-space: pre-wrap;
}

.nav-link { cursor: pointer; color: #2b1c12; }
.nav-link.active { color: #2b1c12; border-bottom: 2px solid #2b1c12; background: transparent; }
</style>
>>>>>>> 6644a9b3829b34f1e619ed6d01c457846ddf0d75
