import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    isOpen: false // ✅ trạng thái mở/đóng sidebar
  }),
  getters: {
    totalItems: (state) => state.items.reduce((sum, i) => sum + i.quantity, 0),
    totalPrice: (state) => state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  },
  actions: {
    _getId(product) {
      return product._id || product.id;
    },

    // Tạo khóa duy nhất cho từng biến thể (size + đường/đá + topping) của cùng 1 sản phẩm
    _makeLineId(productId, options = {}) {
      const toppings = [...(options.toppings || [])].sort().join('+');
      return [productId, options.size || '', options.sugarIce || '', toppings].join('::');
    },

    // options: { size, sugarIce, toppings: [], note, unitPrice }
    addItem(product, quantity = 1, options = {}) {
      const pid = this._getId(product);
      const lineId = this._makeLineId(pid, options);
      const existing = this.items.find(i => i.lineId === lineId);

      if (existing) {
        existing.quantity += quantity;
        return;
      }

      this.items.push({
        ...product,
        _id: pid,
        id: pid,
        productId: pid,
        lineId,
        quantity,
        price: options.unitPrice ?? product.price,
        size: options.size || '',
        sugarIce: options.sugarIce || '',
        toppings: options.toppings || [],
        note: options.note || ''
      });
    },

    removeItem(lineId) {
      this.items = this.items.filter(i => i.lineId !== lineId);
    },

    updateQuantity(lineId, qty) {
      const item = this.items.find(i => i.lineId === lineId);
      if (item) item.quantity = qty;
    },

    clearCart() {
      this.items = [];
    },

    openCart() { this.isOpen = true; },
    closeCart() { this.isOpen = false; },
    toggleCart() { this.isOpen = !this.isOpen; }
  }
});