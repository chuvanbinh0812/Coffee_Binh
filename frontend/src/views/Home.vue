<template>
  <div class="home">

    <!-- ===== HERO ===== -->
    <section class="hero-section">
      <div class="container hero-grid">
        <div class="hero-text">
          <div class="eyebrow"><span class="hanko-stamp">金</span> Kinjo — Hạt Vàng, Đậm Chất Việt</div>
          <h1 class="hero-title">ĐẬM<br/>VỊ<br/><span class="ink-outline">RIÊNG</span></h1>
          <p class="hero-desc">Lấy cảm hứng từ nghệ thuật rang xay và pha phin truyền thống — mỗi ly cà phê của Kinjo đều mang một hương vị không thể nhầm lẫn.</p>
          <div class="d-flex gap-3 flex-wrap">
            <router-link to="/products" class="btn-hero-primary">Khám Phá Thực Đơn</router-link>
            <router-link to="/about" class="btn-hero-outline">Về Chúng Tôi</router-link>
          </div>
        </div>
        <div class="hero-media">
          <video autoplay muted loop playsinline>
            <source :src="heroVideo2" type="video/mp4" />
          </video>
          <div class="hero-media-frame"></div>
        </div>
      </div>
    </section>

    <!-- ===== STATS ===== -->
    <section class="stats-section">
      <div class="container">
        <div class="row g-0">
          <div v-for="stat in stats" :key="stat.label" class="col-6 col-md-3 stat-item" v-fade-in>
            <div class="stat-number">{{ stat.number }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== GỢI Ý HÔM NAY ===== -->
    <section class="py-5 my-3">
      <div class="container">
        <div class="section-header mb-5" v-fade-in>
          <span class="section-tag">Nổi Bật</span>
          <h2 class="section-title">Gợi Ý Hôm Nay</h2>
          <p class="section-sub">Ba lựa chọn được chúng tôi đề xuất để bạn bắt đầu ngày mới trọn vị</p>
        </div>
        <div class="row g-4">
          <div v-for="p in spotlightProducts" :key="p.id" class="col-md-4" v-fade-in>
            <div class="spotlight-card">
              <div class="spotlight-img-wrap">
                <img :src="p.image" :alt="p.name" />
                <div class="spotlight-badge" v-if="p.badge">{{ p.badge }}</div>
              </div>
              <div class="spotlight-body">
                <h5>{{ p.name }}</h5>
                <p class="text-muted small">{{ p.intro }}</p>
                <router-link to="/products" class="spotlight-link">Xem thêm →</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== SẢN PHẨM NỔI BẬT ===== -->
    <section class="featured-section py-5">
      <div class="container">
        <div class="section-header mb-5" v-fade-in>
          <span class="section-tag">Bán Chạy</span>
          <h2 class="section-title">Sản Phẩm Nổi Bật</h2>
          <p class="section-sub">Những hương vị được yêu thích nhất tại Kinjo</p>
        </div>
        <div class="row g-4">
          <div v-for="product in featuredProducts" :key="product._id" class="col-6 col-md-3" v-fade-in>
            <ProductCard :product="product" />
          </div>
        </div>
        <div class="text-center mt-5" v-fade-in>
          <router-link to="/products" class="btn-hero-outline">
            Xem tất cả sản phẩm →
          </router-link>
        </div>
      </div>
    </section>

    <!-- ===== CHẤT LƯỢNG ===== -->
    <section class="quality-section py-5 my-3">
      <div class="container">
        <div class="row align-items-center g-5">
          <div class="col-lg-6" v-fade-in>
            <span class="section-tag">Cam Kết</span>
            <h2 class="section-title text-start mt-2 mb-3">CHẤT LƯỢNG<br/>LÀ ƯU TIÊN</h2>
            <p class="text-muted mb-3">Kinjo được thành lập với sứ mệnh mang đến cho khách hàng những ly cà phê thơm ngon và chất lượng nhất. Chúng tôi sử dụng hạt cà phê cao cấp được chọn lọc kỹ từ các vùng trồng uy tín nhất Việt Nam.</p>
            <p class="text-muted mb-4">Mỗi mẻ hạt đều trải qua quy trình rang xay nghiêm ngặt để đảm bảo hương thơm trọn vẹn và độ tươi lâu dài.</p>
            <div class="d-flex gap-3 flex-wrap">
              <div class="quality-badge">Hạt Tự Nhiên 100%</div>
              <div class="quality-badge">Đạt Chuẩn Quốc Tế</div>
              <div class="quality-badge">Giao Hàng Nhanh</div>
            </div>
          </div>
          <div class="col-lg-6" v-fade-in>
            <div class="row g-3">
              <div v-for="s in statCards" :key="s.label" class="col-6">
                <div class="stat-card text-center p-4">
                  <div class="stat-card-num">{{ s.num }}</div>
                  <div class="stat-card-label">{{ s.label }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== QUY TRÌNH ===== -->
    <section class="process-section py-5 my-3">
      <div class="container">
        <div class="section-header mb-5" v-fade-in>
          <span class="section-tag">Quy Trình</span>
          <h2 class="section-title">Từ Hạt Đến Ly Cà Phê</h2>
          <p class="section-sub">Hành trình tạo nên những ly cà phê hoàn hảo</p>
        </div>
        <div class="row g-4">
          <div v-for="step in steps" :key="step.title" class="col-6 col-md-3" v-fade-in>
            <div class="process-step">
              <div class="process-num">{{ step.num }}</div>
              <h6 class="mt-2 mb-2">{{ step.title }}</h6>
              <p class="text-muted small mb-0">{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== TESTIMONIALS ===== -->
    <section class="testimonials-section py-5 my-3">
      <div class="container">
        <div class="section-header mb-5" v-fade-in>
          <span class="section-tag">Đánh Giá</span>
          <h2 class="section-title">Khách Hàng Nói Gì</h2>
        </div>
        <div class="row g-4">
          <div v-for="t in testimonials" :key="t.name" class="col-md-4" v-fade-in>
            <div class="testimonial-card">
              <div class="testimonial-mark">"</div>
              <p class="testimonial-text">{{ t.text }}</p>
              <div class="testimonial-author">
                <div class="testimonial-avatar">{{ t.name[0] }}</div>
                <div>
                  <div class="fw-semibold small">{{ t.name }}</div>
                  <div class="text-muted small">{{ t.role }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== NEWSLETTER ===== -->
    <section class="newsletter-section py-5">
      <div class="container">
        <div class="newsletter-card" v-fade-in>
          <span class="hanko-stamp light-stamp">金</span>
          <h2 class="mb-2">Nhận Ưu Đãi Độc Quyền</h2>
          <p class="text-muted mb-4">Đăng ký nhận email để cập nhật sản phẩm mới và khuyến mãi đặc biệt</p>
          <form class="newsletter-form" @submit.prevent>
            <input type="email" placeholder="Nhập email của bạn..." />
            <button type="submit">Đăng Ký</button>
          </form>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import heroVideo2 from '../assets/media/video2.mp4';
import axios from 'axios';
import ProductCard from '../components/ProductCard.vue';

const caPheSuaDa = 'https://placehold.co/500x400/6f4423/f8f0e1?text=C%C3%A0+Ph%C3%AA+S%E1%BB%AFa+%C4%90%C3%A1';
const caPheDenPhin = 'https://placehold.co/500x400/6f4423/f8f0e1?text=C%C3%A0+Ph%C3%AA+Phin';
const bacXiu = 'https://placehold.co/500x400/6f4423/f8f0e1?text=B%E1%BA%A1c+X%E1%BB%89u';

const stats = [
  { number: '500+', label: 'Khách hàng hài lòng' },
  { number: '10+',  label: 'Danh mục thức uống' },
  { number: '5+',   label: 'Năm kinh nghiệm' },
  { number: '100%', label: 'Hạt cà phê nguyên chất' },
];

const statCards = [
  { num: '500+', label: 'Khách hàng hài lòng' },
  { num: '10+',  label: 'Danh mục thức uống' },
  { num: '5+',   label: 'Năm kinh nghiệm' },
  { num: '100%', label: 'Hạt cà phê nguyên chất' },
];

const steps = [
  { num: '01', title: 'Chọn hạt',    desc: 'Hạt cà phê được chọn lọc kỹ từ những vùng trồng uy tín nhất' },
  { num: '02', title: 'Rang xay',     desc: 'Rang theo công thức riêng, giữ trọn hương thơm tự nhiên' },
  { num: '03', title: 'Pha chế',   desc: 'Pha đúng chuẩn, kiểm soát kỹ từng tỷ lệ nước và nhiệt độ' },
  { num: '04', title: 'Đóng gói',    desc: 'Đóng gói cẩn thận, giao nhanh đến tay bạn khi còn nóng hổi' },
];

const spotlightProducts = ref([
  { id: 's1', name: 'Cà Phê Sữa Đá Truyền Thống', image: caPheSuaDa, intro: 'Vị đắng đậm hòa cùng sữa đặc béo ngậy — hương vị Việt Nam nguyên bản.', badge: 'Hot' },
  { id: 's2', name: 'Cà Phê Phin Nguyên Chất',  image: caPheDenPhin, intro: 'Hạt rang mộc, nhỏ giọt chậm rãi — trọn vẹn hương thơm truyền thống.', badge: 'Mới' },
  { id: 's3', name: 'Bạc Xỉu Đặc Biệt', image: bacXiu, intro: 'Vị nhẹ nhàng, thơm béo sữa tươi — lựa chọn dịu êm cho buổi sáng.', badge: null },
]);

const testimonials = [
  { name: 'Nguyễn Văn An',  role: 'Khách hàng thường xuyên', text: 'Cà phê của Kinjo thực sự tuyệt vời! Hương vị đậm đà, hạt rang chuẩn. Tôi đã trở thành khách hàng thường xuyên.' },
  { name: 'Trần Thị Bình',  role: 'Khách hàng mới',          text: 'Giao hàng nhanh, đóng gói cẩn thận. Cà phê thơm ngon và giá cả hợp lý. Rất hài lòng!' },
  { name: 'Lê Hoàng Minh',  role: 'Người sành cà phê',        text: 'Tôi là người sành cà phê, và Kinjo là lựa chọn tốt nhất. Chất lượng không thua các thương hiệu quốc tế.' },
];

const featuredProducts = ref([]);

onMounted(async () => {
  try {
    const res = await axios.get('/api/products');
    featuredProducts.value = res.data.filter(p => p.isBestSeller || p.isNew).slice(0, 4);
  } catch {}
});
</script>

<style scoped>
/* ===== HERO ===== */
.hero-section {
  background: #f8f0e1;
  padding: 60px 0 40px;
}
.hero-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 40px;
  align-items: center;
}
.eyebrow {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  letter-spacing: 1px;
  color: #b3502c;
  text-transform: uppercase;
  margin-bottom: 20px;
}
.hero-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(3.2rem, 9vw, 7rem);
  line-height: 0.92;
  letter-spacing: 2px;
  color: #2a1c12;
  margin-bottom: 24px;
}
.ink-outline {
  color: transparent;
  -webkit-text-stroke: 2px #b3502c;
}
.hero-desc {
  font-size: 1.05rem;
  color: #6b5646;
  max-width: 460px;
  margin-bottom: 32px;
}
.btn-hero-primary {
  background: #2a1c12;
  color: #f8f0e1;
  font-family: 'Space Mono', monospace;
  font-size: 0.82rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 14px 28px;
  border: 1px solid #2a1c12;
  transition: background 0.2s;
}
.btn-hero-primary:hover { background: #6f4423; border-color: #6f4423; color: #f8f0e1; }
.btn-hero-outline {
  background: transparent;
  color: #2a1c12;
  font-family: 'Space Mono', monospace;
  font-size: 0.82rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 14px 28px;
  border: 1px solid #2a1c12;
  transition: all 0.2s;
}
.btn-hero-outline:hover { background: #2a1c12; color: #f8f0e1; }

.hero-media { position: relative; }
.hero-media video {
  width: 100%;
  aspect-ratio: 4/5;
  object-fit: cover;
  filter: grayscale(15%) contrast(1.05);
  display: block;
}
.hero-media-frame {
  position: absolute;
  top: 14px; left: 14px;
  right: -14px; bottom: -14px;
  border: 2px solid #b3502c;
  z-index: -1;
}

@media (max-width: 991.98px) {
  .hero-grid { grid-template-columns: 1fr; }
  .hero-media { order: -1; max-width: 320px; margin: 0 auto 20px; }
}

/* ===== STATS BAR ===== */
.stats-section { background: #2a1c12; }
.stat-item {
  padding: 26px 20px;
  text-align: center;
  border-right: 1px solid rgba(244,242,236,0.15);
}
.stat-item:last-child { border-right: none; }
.stat-number { font-family: 'Bebas Neue', sans-serif; font-size: 2.4rem; letter-spacing: 1px; color: #f8f0e1; }
.stat-label { font-family: 'Space Mono', monospace; font-size: 0.7rem; letter-spacing: 0.5px; text-transform: uppercase; color: rgba(244,242,236,0.6); margin-top: 4px; }

/* ===== SECTION HEADER ===== */
.section-header { text-align: center; }
.section-tag {
  font-family: 'Space Mono', monospace;
  font-size: 0.72rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #b3502c;
  font-weight: 700;
}
.section-title {
  font-size: 2.6rem;
  letter-spacing: 1px;
  margin-top: 8px;
  line-height: 1;
}
.section-sub { color: #6b5646; font-size: 0.95rem; margin-top: 10px; }

/* ===== SPOTLIGHT ===== */
.spotlight-card {
  background: #f8f0e1;
  border: 1px solid #ddc9a0;
  overflow: hidden;
  transition: border-color 0.25s ease;
}
.spotlight-card:hover { border-color: #6f4423; }
.spotlight-img-wrap { position: relative; overflow: hidden; height: 200px; }
.spotlight-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; }
.spotlight-card:hover .spotlight-img-wrap img { transform: scale(1.05); }
.spotlight-badge {
  position: absolute;
  top: 12px; left: 12px;
  background: #b3502c;
  color: #f8f0e1;
  font-family: 'Space Mono', monospace;
  font-size: 0.68rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 4px 10px;
}
.spotlight-body { padding: 20px; }
.spotlight-body h5 { font-family: 'Bebas Neue', sans-serif; letter-spacing: 1px; font-size: 1.3rem; margin-bottom: 8px; }
.spotlight-link {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  text-transform: uppercase;
  color: #6f4423;
  border-bottom: 1px solid #6f4423;
}

/* ===== FEATURED ===== */
.featured-section { background: #efe1c3; }

/* ===== QUALITY ===== */
.quality-badge {
  border: 1px solid #2a1c12;
  color: #2a1c12;
  padding: 6px 14px;
  font-family: 'Space Mono', monospace;
  font-size: 0.72rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
.stat-card {
  background: #f8f0e1;
  border: 1px solid #ddc9a0;
}
.stat-card-num { font-family: 'Bebas Neue', sans-serif; font-size: 2.2rem; color: #6f4423; }
.stat-card-label { font-family: 'Space Mono', monospace; font-size: 0.68rem; letter-spacing: 0.5px; text-transform: uppercase; color: #6b5646; margin-top: 4px; }

/* ===== PROCESS ===== */
.process-section { background: #efe1c3; }
.process-step { padding: 20px; border-left: 2px solid #2a1c12; }
.process-num { font-family: 'Bebas Neue', sans-serif; font-size: 2.4rem; color: #b3502c; line-height: 1; }

/* ===== TESTIMONIALS ===== */
.testimonial-card {
  background: #f8f0e1;
  border: 1px solid #ddc9a0;
  padding: 30px 26px 26px;
  height: 100%;
  position: relative;
}
.testimonial-mark {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 3rem;
  color: #ddc9a0;
  line-height: 0.5;
  margin-bottom: 10px;
}
.testimonial-text { color: #6b5646; line-height: 1.7; margin-bottom: 20px; }
.testimonial-author { display: flex; align-items: center; gap: 12px; }
.testimonial-avatar {
  width: 38px; height: 38px;
  border-radius: 50%;
  background: #2a1c12;
  color: #f8f0e1;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Bebas Neue', sans-serif;
  flex-shrink: 0;
}

/* ===== NEWSLETTER ===== */
.newsletter-section { background: #2a1c12; }
.newsletter-card { padding: 50px 20px; text-align: center; }
.light-stamp {
  width: 52px; height: 52px;
  font-size: 1.1rem;
  border-color: #f8f0e1;
  color: #f8f0e1;
  margin-bottom: 16px;
}
.newsletter-card h2 { color: #f8f0e1; }
.newsletter-card p { color: rgba(244,242,236,0.65); }
.newsletter-form {
  display: flex;
  gap: 0;
  max-width: 460px;
  margin: 0 auto;
}
.newsletter-form input {
  flex: 1;
  border: 1px solid #f8f0e1;
  border-right: none;
  background: transparent;
  padding: 12px 16px;
  font-size: 0.9rem;
  color: #f8f0e1;
  outline: none;
}
.newsletter-form input::placeholder { color: rgba(244,242,236,0.5); }
.newsletter-form button {
  background: #b3502c;
  border: 1px solid #b3502c;
  color: #f8f0e1;
  font-family: 'Space Mono', monospace;
  font-size: 0.78rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 0 22px;
  white-space: nowrap;
}
.newsletter-form button:hover { background: #8f2822; }

@media (max-width: 768px) {
  .newsletter-form { flex-direction: column; gap: 8px; }
  .newsletter-form input { border-right: 1px solid #f8f0e1; }
}
</style>
