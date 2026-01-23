    <section class="hero-section">
      <div class="container position-relative carousel-container-wrapper">

        <div id="pizzaCarousel" class="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">

          <div class="carousel-indicators custom-indicators">
            <button type="button" data-bs-target="#pizzaCarousel" data-bs-slide-to="0" class="active"></button>
            <button type="button" data-bs-target="#pizzaCarousel" data-bs-slide-to="1"></button>
            <button type="button" data-bs-target="#pizzaCarousel" data-bs-slide-to="2"></button>
          </div>

          <div class="carousel-inner">
            <div class="carousel-item active">
              <div class="main-card-structure">
                <div class="img-wrapper">
                  <div class="img-container">
                    <img src="assets/images/carousel-1.jpg" alt="بيتزا">
                  </div>
                </div>
                <div class="caption-section">
                  <div class="text-content">
                    <h5>بيتزا الجبنة الفاخرة</h5>
                    <p>طعم إيطالي أصيل بجبنة الموتزاريلا الفاخرة.</p>
                  </div>
                  <div class="action-content">
                    <a href="#" class="btn-order">اطلب الآن</a>
                  </div>
                </div>
              </div>
            </div>

            <div class="carousel-item">
              <div class="main-card-structure">
                <div class="img-wrapper">
                  <div class="img-container">
                    <img src="assets/images/carousel-2.jpg" alt="بيتزا">
                  </div>
                </div>
                <div class="caption-section">
                  <div class="text-content">
                    <h5>بيتزا السلامي اللذيذة</h5>
                    <p>بيتزا حارة مع السلامي الإيطالي والفلفل الملون.</p>
                  </div>
                  <div class="action-content">
                    <a href="#" class="btn-order">اطلب الآن</a>
                  </div>
                </div>
              </div>
            </div>

            <div class="carousel-item">
              <div class="main-card-structure">
                <div class="img-wrapper">
                  <div class="img-container">
                    <img src="assets/images/carousel-3.jpg" alt="بيتزا">
                  </div>
                </div>
                <div class="caption-section">
                  <div class="text-content">
                    <h5>بيتزا الدجاج المشوي</h5>
                    <p>بيتزا شهية مع قطع الدجاج المشوي والفطر والبصل.</p>
                  </div>
                  <div class="action-content">
                    <a href="#" class="btn-order">اطلب الآن</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button class="carousel-control-prev custom-control" type="button" data-bs-target="#pizzaCarousel"
            data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          </button>
          <button class="carousel-control-next custom-control" type="button" data-bs-target="#pizzaCarousel"
            data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
          </button>

        </div>
      </div>
    </section>
    ----------------------
    .hero-section {
  padding:0 0 30px 0;
  background-color: $vanilla-custard;

  .carousel-container-wrapper {
    max-width: 900px; // عرض الكاروسيل الأساسي
  }

  .main-card-structure {
    background-color: #151515; // لون الهيكل بدون حدود
    border-radius: 40px;
    margin: 10px;
    display: flex;
    flex-direction: column;
  }

  .img-wrapper {
    padding: 25px 25px 15px 25px; // بادينج حول حاوية الصورة
    
    .img-container {
      height: 350px;
      overflow: hidden;
      border-radius: 25px;
      position: relative;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        /* تحريك الصورة للتطوير */
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }

  .caption-section {
    padding: 10px 30px 40px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;

    // --- جعل النص والزر فوق بعضهما في الجوال ---
    @media (max-width: 767px) {
      flex-direction: column;
      text-align: center;
      gap: 20px;
      
      .text-content { text-align: center !important; }
    }

    .text-content {
      text-align: right;
      h5 { font-size: 1.7rem; font-weight: bold; color: #ffc107; }
      p { color: #aaa; margin: 0; }
    }

    .btn-order {
      background-color: #e63946; // لون أحمر جذاب
      color: white;
      padding: 12px 35px;
      border-radius: 12px;
      text-decoration: none;
      font-weight: bold;
      white-space: nowrap; // لمنع انكسار النص في الزر
    }
  }

  // --- التحكم في الأزرار الخارجية ---
  .custom-control {
    width: 50px;
    height: 50px;
    background-color: #333;
    border-radius: 50%;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0.8;
    transition: 0.3s;

    &:hover { background-color: #ffc107; opacity: 1; }

    &.carousel-control-prev { left: -70px; } // دفع الزر لليسار خارج الإطار
    &.carousel-control-next { right: -70px; } // دفع الزر لليمين خارج الإطار

    @media (max-width: 1100px) {
      // في الشاشات المتوسطة، نقرب الأزرار قليلاً أو نخفيها
      &.carousel-control-prev { left: -30px; }
      &.carousel-control-next { right: -30px; }
    }
    
    @media (max-width: 991px) {
        // في الجوال، الأفضل إخفاء الأزرار الخارجية والاعتماد على السحب أو اللمس
        display: none;
    }
  }

  // تخصيص المؤشرات (النقاط)
  .custom-indicators {
    bottom: -50px; // وضعها تحت الكارد
    button {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: #555;
      &.active { background-color: #ffc107; }
    }
  }
}