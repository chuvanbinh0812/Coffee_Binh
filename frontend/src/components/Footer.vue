<template>
  <footer class="kinjo-footer mt-5 py-5">
    <div class="container">
      <div class="row g-4 mb-4">
        <div class="col-md-6 col-lg-3">
          <div class="d-flex align-items-center gap-2 mb-3">
            <span class="hanko-stamp footer-stamp">金</span>
            <h5 class="mb-0">KINJO</h5>
          </div>
          <p class="text-muted">Chúng tôi cam kết mang đến những ly cà phê thơm ngon và chất lượng nhất cho khách hàng của mình.</p>
          <div class="social-links">
            <a href="#" aria-label="Facebook" class="text-decoration-none">f</a>
            <a href="#" aria-label="Instagram" class="text-decoration-none">i</a>
            <a href="#" aria-label="Twitter" class="text-decoration-none">t</a>
            <a href="#" aria-label="YouTube" class="text-decoration-none">y</a>
          </div>
        </div>

        <div class="col-md-6 col-lg-3">
          <h5 class="mb-3">Danh Mục</h5>
          <ul class="list-unstyled">
            <li class="mb-2"><a href="#" class="text-decoration-none">Cà Phê Phin</a></li>
            <li class="mb-2"><a href="#" class="text-decoration-none">Cà Phê Máy</a></li>
            <li class="mb-2"><a href="#" class="text-decoration-none">Trà & Đá Xay</a></li>
            <li class="mb-2"><a href="#" class="text-decoration-none">Bánh Ngọt</a></li>
          </ul>
        </div>

        <div class="col-md-6 col-lg-3">
          <h5 class="mb-3">Chính Sách</h5>
          <ul class="list-unstyled">
            <li class="mb-2"><a href="#" class="text-decoration-none">Về Chúng Tôi</a></li>
            <li class="mb-2"><a href="#" class="text-decoration-none">Điều Khoản Sử Dụng</a></li>
            <li class="mb-2"><a href="#" class="text-decoration-none">Chính Sách Bảo Mật</a></li>
            <li class="mb-2"><a href="#" class="text-decoration-none">Điều Khoản Giao Hàng</a></li>
          </ul>
        </div>

        <div class="col-md-6 col-lg-3">
          <h5 class="mb-3">Hỗ Trợ</h5>
          <ul class="list-unstyled">
            <li class="mb-2"><a href="#" class="text-decoration-none">FAQ</a></li>
            <li class="mb-2"><a href="#" class="text-decoration-none">Liên Hệ</a></li>
            <li class="mb-2"><a href="#" class="text-decoration-none">Trả Hàng</a></li>
            <li class="mb-2"><a href="#" class="text-decoration-none">Bảo Hành</a></li>
          </ul>
        </div>
      </div>

      <hr class="my-4">

      <div class="text-center">
        <p class="text-muted mb-0">&copy; 2026 KINJO. Tất cả quyền được bảo lưu.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.kinjo-footer {
  background-color: #2a1c12;
  color: #ddc9a0;
  border-top: 3px solid #b3502c;
}

.footer-stamp {
  width: 40px; height: 40px;
  font-size: 0.9rem;
  border-color: #f8f0e1;
  color: #f8f0e1;
}

.kinjo-footer h5 {
  color: #f8f0e1;
  font-family: 'Bebas Neue', sans-serif;
  letter-spacing: 1.5px;
  font-weight: 400;
}

.kinjo-footer a {
  color: #ddc9a0;
  font-size: 0.9rem;
  transition: color 0.2s ease;
}

.kinjo-footer a:hover {
  color: #b3502c;
}

.kinjo-footer hr {
  border-top: 1px solid rgba(244, 242, 236, 0.1);
}

.social-links a {
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0;
  border: 1px solid rgba(244, 242, 236, 0.25);
  color: #f8f0e1;
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  margin-right: 8px;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.social-links a:hover {
  background-color: #b3502c;
  border-color: #b3502c;
  color: #f8f0e1;
}
</style>
