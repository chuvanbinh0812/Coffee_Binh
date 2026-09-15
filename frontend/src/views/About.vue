<template>
  <div class="container my-5">
    <h1 class="text-center mb-5 display-5">Về Kinjo</h1>
    <div class="about-hero mb-4 text-center">
      <video class="w-100 rounded-4 shadow-sm" autoplay muted loop playsinline>
        <source :src="heroVideo" type="video/mp4" />
        Trình duyệt của bạn không hỗ trợ thẻ video.
      </video>
    </div>

    <div class="row justify-content-center">
      <div class="col-lg-10">
        <p class="lead text-center text-muted mb-5">
          Kinjo là điểm đến cho những ai yêu cà phê nguyên bản, trải nghiệm thưởng thức thư thái và thực đơn đa dạng. Mỗi câu chuyện của chúng tôi đều bắt đầu từ hạt cà phê, lan tỏa đến tay khách hàng qua từng ly pha chế tận tâm.
        </p>

        <section id="brand-journey" class="about-section mb-5">
          <div class="row align-items-center g-4">
            <div class="col-md-6">
              <h3>Hành trình thương hiệu</h3>
              <p>
                Mỗi ly cà phê tại Kinjo là một hành trình tinh tế từ hạt đến tách hoàn chỉnh. Chúng tôi tuyển chọn hạt từ những vùng trồng uy tín, rang xay kỹ lưỡng và pha chế theo quy trình chuẩn mực để giữ trọn hương vị.
              </p>
              <p>
                Từ nông trại đến quầy pha chế, chúng tôi luôn theo dõi từng bước: chọn hạt đúng chất lượng, rang chuẩn xác và kiểm tra kỹ hương vị. Kết quả là mỗi ly cà phê đều cân bằng giữa độ đậm, hậu vị và hương thơm.
              </p>
            </div>
            <div class="col-md-6 text-center">
              <img :src="brandJourneyImg" alt="Hành trình thương hiệu" class="img-fluid rounded shadow-sm" />
            </div>
          </div>
        </section>

        <section id="materials" class="about-section mb-5 bg-light p-4 rounded-4">
          <div class="row g-4">
            <div class="col-md-6 text-center order-md-2">
              <img :src="materialsImg" alt="Vùng nguyên liệu Kinjo" class="img-fluid rounded shadow-sm" />
            </div>
            <div class="col-md-6 order-md-1">
              <h3>Vùng nguyên liệu Kinjo</h3>
              <p>
                Chúng tôi tự hào về nguồn hạt cao cấp, từ Arabica thanh nhẹ đến Robusta đậm đà. Mỗi lô nguyên liệu đều được kiểm định chặt chẽ về độ ẩm, kích cỡ hạt và chất lượng để đảm bảo hương vị luôn ổn định.
              </p>
              <p>
                Hạt được xử lý cẩn thận, bảo quản kỹ lưỡng để giữ trọn hương thơm và độ tươi. Điều này giúp Kinjo mang đến trải nghiệm thưởng thức trọn vẹn cho khách hàng dù mua tại cửa hàng hay đặt online.
              </p>
            </div>
          </div>
        </section>

        <section id="brewing-art" class="about-section mb-5">
          <div class="row align-items-center g-4">
            <div class="col-md-6">
              <h3>Nghệ thuật pha chế</h3>
              <p>
                Nghệ thuật pha chế tại Kinjo là sự hòa quyện giữa kỹ thuật và sáng tạo. Đội ngũ pha chế của chúng tôi được đào tạo bài bản để cân bằng tỷ lệ, nhiệt độ và thời gian chiết xuất, tạo nên những ly cà phê vừa vặn và tinh tế.
              </p>
              <p>
                Bên cạnh cà phê truyền thống, chúng tôi cũng nghiên cứu các công thức đặc sắc theo mùa như đồ uống đá xay, trà trái cây và món tráng miệng. Mỗi thức uống đều được chuẩn bị với tâm huyết và niềm đam mê cà phê.
              </p>
            </div>
            <div class="col-md-6 text-center">
              <img :src="brewingArtImg" alt="Nghệ thuật pha chế" class="img-fluid rounded shadow-sm" />
            </div>
          </div>
        </section>

        <section id="company" class="about-section mb-5 bg-light p-4 rounded-4">
          <div class="row g-4">
            <div class="col-md-6 text-center order-md-2">
              <img :src="companyImg" alt="Giới thiệu công ty" class="img-fluid rounded shadow-sm" />
            </div>
            <div class="col-md-6 order-md-1">
              <h3>Giới thiệu công ty</h3>
              <p>
                Kinjo được xây dựng từ khát vọng mang hương vị cà phê Việt lên tầm cao mới. Công ty tập trung vào chất lượng nguyên liệu, dịch vụ tận tâm và thực đơn luôn cập nhật xu hướng.
              </p>
              <p>
                Chúng tôi đồng hành cùng khách hàng bằng những giá trị: thân thiện, chuyên nghiệp và sáng tạo. Kinjo không chỉ là nơi thưởng thức cà phê, mà còn là điểm gặp gỡ, chia sẻ câu chuyện và cảm hứng mỗi ngày.
              </p>
            </div>
          </div>
        </section>

        <section id="gallery" class="about-section mb-5">
          <h3 class="mb-4">Thư viện hình ảnh</h3>
          <div class="row g-3 gallery-row">
            <div class="col-sm-6 col-lg-4">
              <img :src="gallery1Img" alt="Thư viện ảnh 1" class="img-fluid rounded shadow-sm" />
            </div>
            <div class="col-sm-6 col-lg-4">
              <img :src="gallery2Img" alt="Thư viện ảnh 2" class="img-fluid rounded shadow-sm" />
            </div>
            <div class="col-sm-6 col-lg-4">
              <img :src="gallery3Img" alt="Thư viện ảnh 3" class="img-fluid rounded shadow-sm" />
            </div>
          </div>
          <p class="mt-3 text-muted">
            Thư viện của Kinjo lưu giữ những khoảnh khắc đẹp: từ không gian quán, quy trình rang xay chuyên nghiệp đến những ly cà phê được hoàn thiện tỉ mỉ.
          </p>
        </section>

        <section id="contact" class="about-section mb-5 bg-light p-4 rounded-4">
          <div class="row g-4">
            <div class="col-md-6">
              <h3>Liên hệ</h3>
              <p>
                Nếu bạn muốn đặt hàng, hợp tác hay có câu hỏi về thực đơn, hãy liên hệ với chúng tôi qua số điện thoại, email hoặc đến trực tiếp quán. Đội ngũ Kinjo luôn sẵn sàng tư vấn và phục vụ bạn chu đáo.
              </p>
              <ul class="contact-list">
                <li>Địa chỉ: 123 Đường Cà Phê, Quận 1, TP. HCM</li>
                <li>Hotline: 0900 123 456</li>
                <li>Email: info@kinjo.vn</li>
              </ul>
            </div>
            <div class="col-md-6 text-center">
              <img :src="contactImg" alt="Liên hệ Kinjo" class="img-fluid rounded shadow-sm" />
            </div>
          </div>
        </section>

        <section id="menu" class="about-section mb-5">
          <h3 class="mb-4">Thực đơn mới</h3>
          <div class="row g-3">
            <div class="col-md-4">
              <img :src="menuImg1" alt="Thực đơn 1" class="img-fluid rounded shadow-sm" />
            </div>
            <div class="col-md-4">
              <img :src="menuImg2" alt="Thực đơn 2" class="img-fluid rounded shadow-sm" />
            </div>
            <div class="col-md-4">
              <img :src="menuImg3" alt="Thực đơn 3" class="img-fluid rounded shadow-sm" />
            </div>
          </div>
          <p class="mt-3 text-muted">
            Thực đơn của chúng tôi được cập nhật liên tục, giúp khách hàng nhanh chóng chọn được thức uống yêu thích. Từ cà phê phin truyền thống đến trà đá xay, mỗi món đều có mô tả rõ ràng và hình ảnh hấp dẫn.
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import heroVideo from '../assets/media/video.mp4';

const ph = (label) => `https://placehold.co/600x400/2c2c2c/f7f5f2?text=${encodeURIComponent(label)}`;
const brandJourneyImg = ph('Hành Trình');
const materialsImg = ph('Vùng Nguyên Liệu');
const brewingArtImg = ph('Pha Chế');
const companyImg = ph('Công Ty');
const gallery1Img = ph('Gallery 1');
const gallery2Img = ph('Gallery 2');
const gallery3Img = ph('Gallery 3');
const contactImg = ph('Liên Hệ');
const menuImg1 = ph('Menu 1');
const menuImg2 = ph('Menu 2');
const menuImg3 = ph('Menu 3');

onMounted(() => {
  // ensure video tag updates if needed; static import guarantees bundling
});
</script>

<style scoped>
.text-brown {
  color: #2b1c12;
}

.about-section h3 {
  color: #221510;
  margin-bottom: 1rem;
}

.about-section p {
  color: #6b5646;
  line-height: 1.72;
}

.contact-list {
  list-style: none;
  padding: 0;
  margin-top: 1rem;
  color: #6b5646;
}

.contact-list li {
  margin-bottom: 0.6rem;
}

.gallery-row img,
.about-section img {
  max-height: 280px;
  object-fit: cover;
}

.about-hero video {
  max-height: 420px;
  width: 100%;
  object-fit: cover;
}
</style>
