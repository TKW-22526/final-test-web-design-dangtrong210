/* ===== product.js - Xử lý tương tác trên trang mô tả chi tiết sách ==== */
/* Toàn bộ hàm đều được khai báo có tên (named function), không dùng hàm ẩn danh khi gán even */
/* Trang này dùng chung cho nhiều cuốn sách, xác định sách nào qua tham số ?id= trên URL.      */
/* Ví dụ: product.html?id=2 sẽ hiển thị chi tiết cuốn sách có id = 2.                          */

let currentCartCount = 0; // Số lượng trong giỏ hàng (lưu tạm trong phiên làm việc)

const PRODUCT_DETAIL_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Các id sách đã có trang mô tả chi tiết đầy đủ

/* Trả về toàn bộ dữ liệu chi tiết của những cuốn sách đã có trang mô tả riêng (id 1 - 5) */
function getProductDetailDataset() {
  return {
    1: {
      id: 1,
      title: "Nhà Giả Kim",
      author: "Paulo Coelho",
      category: "Tiểu thuyết",
      price: 79000,
      oldPrice: 99000,
      rating: 4.8,
      reviewCount: 326,
      sold: 1200,
      publisher: "NXB Hội Nhà Văn",
      publishYear: 2020,
      pages: 228,
      format: "Bìa mềm",
      weight: "250g",
      language: "Tiếng Việt",
      mainImage: "../assets/images/nha-gia-kim.jpg",
      thumbnails: [
        ""
      ],
      description: "Nhà Giả Kim kể về cuộc hành trình của chàng chăn cừu Santiago, người rời bỏ vùng đồng cỏ quen thuộc ở Andalusia để đi tìm một giấc mơ về kho báu ẩn giấu nơi vùng kim tự tháp Ai Cập. Trên đường đi, Santiago gặp gỡ nhiều con người và trải nghiệm nhiều biến cố giúp anh hiểu được ngôn ngữ của vũ trụ và ý nghĩa thật sự của vận mệnh bản thân. Cuốn sách là một ngụ ngôn giàu chất thơ về việc lắng nghe trái tim, theo đuổi đam mê và tin tưởng vào hành trình của chính mình.",
      highlights: [
        "Tác phẩm bán hơn 65 triệu bản trên toàn thế giới",
        "Được dịch sang hơn 80 ngôn ngữ khác nhau",
        "Một trong những cuốn sách truyền cảm hứng nhất mọi thời đại",
        "Phù hợp cho người muốn tìm động lực và định hướng cuộc sống"
      ]
    },

    2: {
      id: 2,
      title: "Đắc Nhân Tâm",
      author: "Dale Carnegie",
      category: "Kỹ năng sống",
      price: 86000,
      oldPrice: 108000,
      rating: 4.9,
      reviewCount: 512,
      sold: 3400,
      publisher: "NXB Tổng hợp TP.HCM",
      publishYear: 2019,
      pages: 320,
      format: "Bìa mềm",
      weight: "300g",
      language: "Tiếng Việt",
      mainImage: "../assets/images/dac-nhan-tam.png",
      thumbnails: [
        ""
      ],
      description: "Đắc Nhân Tâm là cuốn sách nổi tiếng nhất mọi thời đại về nghệ thuật giao tiếp và đối nhân xử thế. Dale Carnegie đúc kết những nguyên tắc vàng giúp người đọc chinh phục lòng người, xây dựng mối quan hệ bền vững và đạt được thành công trong công việc lẫn cuộc sống.",
      highlights: [
        "Hơn 30 triệu bản được bán ra trên toàn thế giới",
        "Được xem là cuốn sách self-help kinh điển nhất mọi thời đại",
        "Đúc kết từ hàng nghìn khóa học thực tế của tác giả",
        "Ứng dụng được trong công việc, gia đình và các mối quan hệ xã hội"
      ]
    },

    3: {
      id: 3,
      title: "Tuổi Trẻ Đáng Giá Bao Nhiêu",
      author: "Rosie Nguyễn",
      category: "Kỹ năng sống",
      price: 72000,
      oldPrice: 90000,
      rating: 4.6,
      reviewCount: 289,
      sold: 1800,
      publisher: "NXB Hội Nhà Văn",
      publishYear: 2016,
      pages: 288,
      format: "Bìa mềm",
      weight: "260g",
      language: "Tiếng Việt",
      mainImage: "../assets/images/tuoi-tre-dang-gia-bao-nhieu.jpg",
      thumbnails: [
        ""
      ],
      description: "Cuốn sách chia sẻ những trải nghiệm và bài học của tác giả về hành trình tuổi trẻ: học tập, làm việc, du lịch bụi và khám phá bản thân. Tác phẩm truyền cảm hứng cho người trẻ dám sống hết mình và không ngừng học hỏi.",
      highlights: [
        "Sách gối đầu giường của nhiều thế hệ độc giả trẻ Việt Nam",
        "Chia sẻ kinh nghiệm thực tế từ hành trình du lịch bụi của tác giả",
        "Truyền cảm hứng học tập suốt đời và dấn thân trải nghiệm",
        "Phù hợp cho học sinh, sinh viên đang định hướng tương lai"
      ]
    },

    4: {
      id: 4,
      title: "Số Đỏ",
      author: "Vũ Trọng Phụng",
      category: "Tiểu thuyết",
      price: 65000,
      oldPrice: 80000,
      rating: 4.7,
      reviewCount: 198,
      sold: 950,
      publisher: "NXB Văn Học",
      publishYear: 2018,
      pages: 250,
      format: "Bìa mềm",
      weight: "220g",
      language: "Tiếng Việt",
      mainImage: "../assets/images/so-do.jpg",
      thumbnails: [
        ""
      ],
      description: "Số Đỏ là tiểu thuyết trào phúng kinh điển của Vũ Trọng Phụng, khắc họa xã hội thực dân nửa phong kiến qua nhân vật Xuân Tóc Đỏ. Tác phẩm phê phán sâu sắc thói học đòi, giả dối của tầng lớp thượng lưu đương thời.",
      highlights: [
        "Tác phẩm kinh điển của văn học hiện thực phê phán Việt Nam",
        "Được đưa vào chương trình giảng dạy phổ thông",
        "Nghệ thuật trào phúng bậc thầy, giàu tính thời sự",
        "Nhân vật Xuân Tóc Đỏ trở thành biểu tượng văn học nổi tiếng"
      ]
    },

    5: {
      id: 5,
      title: "Sapiens: Lược Sử Loài Người",
      author: "Yuval Noah Harari",
      category: "Khoa học",
      price: 199000,
      oldPrice: 249000,
      rating: 4.8,
      reviewCount: 620,
      sold: 2500,
      publisher: "NXB Tri Thức",
      publishYear: 2017,
      pages: 588,
      format: "Bìa mềm",
      weight: "450g",
      language: "Tiếng Việt",
      mainImage: "../assets/images/sapiens-luoc-su-loai-nguoi.jpg",
      thumbnails: [
        ""
      ],
      description: "Sapiens đưa người đọc qua hành trình 70.000 năm tiến hóa của loài người, từ những bộ lạc săn bắt hái lượm đến nền văn minh công nghệ hiện đại. Harari phân tích cách ngôn ngữ, tôn giáo và tiền bạc định hình xã hội loài người.",
      highlights: [
        "Sách bán chạy toàn cầu, dịch ra hơn 65 ngôn ngữ",
        "Được nhiều nhân vật nổi tiếng như Bill Gates, Obama giới thiệu",
        "Góc nhìn liên ngành giữa lịch sử, sinh học và triết học",
        "Thay đổi cách nhìn của độc giả về lịch sử loài người"
      ]
    },

    6: {
      id: 6,
      title: "Cà Phê Cùng Tony",
      author: "Tony Buổi Sáng",
      category: "Kỹ năng sống",
      price: 60000,
      oldPrice: 75000,
      rating: 4.5,
      reviewCount: 340,
      sold: 2100,
      publisher: "NXB Trẻ",
      publishYear: 2014,
      pages: 264,
      format: "Bìa mềm",
      weight: "230g",
      language: "Tiếng Việt",
      mainImage: "../assets/images/ca-phe-cung-tony.jpg",
      thumbnails: [
        ""
      ],
      description: "Tập hợp những bài viết ngắn gọn, hài hước nhưng sâu sắc của Tony Buổi Sáng về khởi nghiệp, hội nhập và tư duy toàn cầu. Cuốn sách truyền cảm hứng cho giới trẻ Việt Nam vươn ra thế giới.",
      highlights: [
        "Từng gây sốt cộng đồng mạng với văn phong hài hước, gần gũi",
        "Truyền cảm hứng khởi nghiệp và hội nhập quốc tế",
        "Nội dung ngắn gọn, dễ đọc, phù hợp đọc nhanh mỗi ngày",
        "Khuyến khích tư duy độc lập và tinh thần tự lập"
      ]
    },

    7: {
      id: 7,
      title: "Người Giàu Có Nhất Thành Babylon",
      author: "George S. Clason",
      category: "Tài chính",
      price: 68000,
      oldPrice: 85000,
      rating: 4.7,
      reviewCount: 275,
      sold: 1650,
      publisher: "NXB Lao Động",
      publishYear: 2020,
      pages: 200,
      format: "Bìa mềm",
      weight: "200g",
      language: "Tiếng Việt",
      mainImage: "../assets/images/người_giàu_có_nhất_thành_babylon.jpg",
      thumbnails: [
        ""
      ],
      description: "Thông qua những câu chuyện ngụ ngôn lấy bối cảnh thành Babylon cổ đại, tác giả truyền tải các nguyên tắc quản lý tài chính cá nhân và tích lũy của cải bền vững, vẫn còn nguyên giá trị đến ngày nay.",
      highlights: [
        "Một trong những cuốn sách tài chính cá nhân kinh điển nhất",
        "Nguyên tắc quản lý tiền bạc đơn giản, dễ áp dụng",
        "Hình thức ngụ ngôn dễ tiếp cận với mọi đối tượng độc giả",
        "Vẫn còn nguyên giá trị dù xuất bản lần đầu gần 100 năm trước"
      ]
    },

    8: {
      id: 8,
      title: "Lược Sử Thời Gian",
      author: "Stephen Hawking",
      category: "Khoa học",
      price: 108000,
      oldPrice: 135000,
      rating: 4.7,
      reviewCount: 241,
      sold: 1100,
      publisher: "NXB Trẻ",
      publishYear: 2019,
      pages: 256,
      format: "Bìa mềm",
      weight: "260g",
      language: "Tiếng Việt",
      mainImage: "../assets/images/luoc-su-thoi-gian.jpg",
      thumbnails: [
        ""
      ],
      description: "Stephen Hawking giải thích những khái niệm phức tạp nhất của vũ trụ học - từ Big Bang, hố đen đến bản chất thời gian - bằng ngôn ngữ dễ hiểu cho độc giả phổ thông. Đây là một trong những cuốn sách khoa học phổ thông bán chạy nhất mọi thời đại.",
      highlights: [
        "Bán hơn 10 triệu bản trên toàn thế giới",
        "Giải thích vũ trụ học phức tạp bằng ngôn ngữ dễ hiểu",
        "Viết bởi một trong những nhà vật lý vĩ đại nhất thế kỷ 20",
        "Phù hợp cho người mới bắt đầu tìm hiểu về vũ trụ"
      ]
    },

    9: {
      id: 9,
      title: "Nhà Lãnh Đạo Không Chức Danh",
      author: "Robin Sharma",
      category: "Kỹ năng sống",
      price: 95000,
      oldPrice: 120000,
      rating: 4.6,
      reviewCount: 214,
      sold: 1300,
      publisher: "NXB Trẻ",
      publishYear: 2021,
      pages: 264,
      format: "Bìa mềm",
      weight: "240g",
      language: "Tiếng Việt",
      mainImage: "../assets/images/nha-lanh-dao-khong-chuc-danh.jpg",
      thumbnails: [
        ""
      ],
      description: "Cuốn sách khẳng định ai cũng có thể trở thành lãnh đạo trong lĩnh vực của mình, không cần chức danh hay vị trí cao. Qua câu chuyện kể, Robin Sharma truyền đạt các nguyên tắc lãnh đạo bản thân và tạo ảnh hưởng tích cực.",
      highlights: [
        "Tác giả sách self-help nổi tiếng với 'Vị tu sĩ bán chiếc Ferrari'",
        "Truyền cảm hứng phát triển tư duy lãnh đạo bản thân",
        "Được viết dưới dạng câu chuyện dễ đọc, dễ tiếp thu",
        "Phù hợp cho người đi làm muốn tạo ảnh hưởng tích cực"
      ]
    },

    10: {
      id: 10,
      title: "Muôn Kiếp Nhân Sinh",
      author: "Nguyên Phong",
      category: "Tâm linh",
      price: 145000,
      oldPrice: 180000,
      rating: 4.9,
      reviewCount: 387,
      sold: 2900,
      publisher: "NXB Tổng hợp TP.HCM",
      publishYear: 2020,
      pages: 396,
      format: "Bìa mềm",
      weight: "380g",
      language: "Tiếng Việt",
      mainImage: "../assets/images/muon-kiep-nhan-sinh.jpg",
      thumbnails: [
        ""
      ],
      description: "Cuốn sách kể lại hành trình khám phá tiền kiếp của doanh nhân Thomas qua các buổi thôi miên hồi quy, hé lộ những bài học về nhân quả, luân hồi và ý nghĩa cuộc sống. Tác phẩm kết hợp giữa trải nghiệm tâm linh và tư duy khoa học.",
      highlights: [
        "Sách bán chạy nhất năm 2020 tại Việt Nam",
        "Kết hợp giữa trải nghiệm tâm linh và góc nhìn khoa học",
        "Nội dung sâu sắc về nhân quả, luân hồi và ý nghĩa cuộc sống",
        "Có phần 2 'Muôn Kiếp Nhân Sinh 2' tiếp nối câu chuyện"
      ]
    }
  }
}
/* Đọc id sách hiện tại từ tham số ?id= trên URL, mặc định là 1 nếu không hợp lệ */
function getCurrentBookId() {
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));
  return Number.isInteger(id) && PRODUCT_DETAIL_IDS.includes(id) ? id : 1;
}

/* Trả về dữ liệu chi tiết của cuốn sách đang được xem dựa trên id hiện tại */
function getBookDetailData() {
  const dataset = getProductDetailDataset();
  return dataset[getCurrentBookId()];
}

/* Định dạng số tiền theo chuẩn VND */
function formatCurrency(value) {
  return value.toLocaleString("vi-VN") + "đ";
}

/* Tính phần trăm giảm giá dựa trên giá gốc và giá bán */
function calculateDiscountPercent(price, oldPrice) {
  if (!oldPrice || oldPrice <= price) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}


/* Đổ dữ liệu sách vào các phần tử HTML tương ứng trên trang */
function renderProductInfo() {
  const book = getBookDetailData();

  document.title = book.title + " - BookStore";
  document.getElementById("breadcrumbTitle").textContent = book.title;

  const breadcrumbCategoryLink = document.getElementById("breadcrumbCategoryLink");
  if (breadcrumbCategoryLink) {
    breadcrumbCategoryLink.textContent = book.category;
    breadcrumbCategoryLink.href = `../index.html?category=${encodeURIComponent(book.category)}#bookList`;
  }

  document.getElementById("productTitle").textContent = book.title;
  document.getElementById("productAuthor").textContent = "Tác giả: " + book.author;
  document.getElementById("productCategory").textContent = book.category;
  document.getElementById("priceNow").textContent = formatCurrency(book.price);
  document.getElementById("priceOld").textContent = formatCurrency(book.oldPrice);

  document.getElementById("mainImage").src = book.mainImage;
  const thumbContainer = document.getElementById("thumbnailContainer");
  thumbContainer.innerHTML = book.thumbnails
    .map(
      (src, index) =>
        `<img src="${src}" class="thumb-img col-3${index === 0 ? " active-thumb" : ""}" data-src="${src}" alt="thumbnail-${index}">`
    )
    .join("");

  document.getElementById("descriptionText").textContent = book.description;

  document.getElementById("highlightList").innerHTML = book.highlights
    .map((item) => `<li>${item}</li>`)
    .join("");

  document.getElementById("specTableBody").innerHTML = `
    <tr><th>Tác giả</th><td>${book.author}</td></tr>
    <tr><th>Nhà xuất bản</th><td>${book.publisher}</td></tr>
    <tr><th>Năm xuất bản</th><td>${book.publishYear}</td></tr>
    <tr><th>Số trang</th><td>${book.pages}</td></tr>
    <tr><th>Hình thức</th><td>${book.format}</td></tr>
    <tr><th>Trọng lượng</th><td>${book.weight}</td></tr>
    <tr><th>Ngôn ngữ</th><td>${book.language}</td></tr>
  `;
}

/* Trả về dữ liệu rút gọn của toàn bộ 10 cuốn sách trong cửa hàng (đồng bộ với index.js),
 * dùng để chọn ra các sách gợi ý trong khu vực "Sản phẩm tương tự" */
function getFullBookCatalog() {
  return [
    { id: 1, title: "Nhà Giả Kim", author: "Paulo Coelho", category: "Tiểu thuyết", price: 79000, oldPrice: 99000, rating: 4.8, image: "../assets/images/nha-gia-kim.jpg" },
    { id: 2, title: "Đắc Nhân Tâm", author: "Dale Carnegie", category: "Kỹ năng sống", price: 86000, oldPrice: 108000, rating: 4.9, image: "../assets/images/dac-nhan-tam.png" },
    { id: 3, title: "Tuổi Trẻ Đáng Giá Bao Nhiêu", author: "Rosie Nguyễn", category: "Kỹ năng sống", price: 72000, oldPrice: 90000, rating: 4.6, image: "../assets/images/tuoi-tre-dang-gia-bao-nhieu.jpg" },
    { id: 4, title: "Số Đỏ", author: "Vũ Trọng Phụng", category: "Tiểu thuyết", price: 65000, oldPrice: 80000, rating: 4.7, image: "../assets/images/so-do.jpg" },
    { id: 5, title: "Sapiens: Lược Sử Loài Người", author: "Yuval Noah Harari", category: "Khoa học", price: 199000, oldPrice: 249000, rating: 4.8, image: "../assets/images/sapiens-luoc-su-loai-nguoi.jpg" },
    { id: 6, title: "Cà Phê Cùng Tony", author: "Tony Buổi Sáng", category: "Kỹ năng sống", price: 60000, oldPrice: 75000, rating: 4.5, image: "../assets/images/ca-phe-cung-tony.jpg" },
    { id: 7, title: "Người Giàu Có Nhất Thành Babylon", author: "George S. Clason", category: "Tài chính", price: 68000, oldPrice: 85000, rating: 4.7, image: "../assets/images/người_giàu_có_nhất_thành_babylon.jpg" },
    { id: 8, title: "Lược Sử Thời Gian", author: "Stephen Hawking", category: "Khoa học", price: 108000, oldPrice: 135000, rating: 4.7, image: "../assets/images/luoc-su-thoi-gian.jpg" },
    { id: 9, title: "Nhà Lãnh Đạo Không Chức Danh", author: "Robin Sharma", category: "Kỹ năng sống", price: 95000, oldPrice: 120000, rating: 4.6, image: "../assets/images/nha-lanh-dao-khong-chuc-danh.jpg" },
    { id: 10, title: "Muôn Kiếp Nhân Sinh", author: "Nguyên Phong", category: "Tâm linh", price: 145000, oldPrice: 180000, rating: 4.9, image: "../assets/images/muon-kiep-nhan-sinh.jpg" }
  ];
}

/* Chọn ra 4 sách gợi ý cho khu vực "Sản phẩm tương tự", loại trừ sách đang xem,
 * ưu tiên những sách đã có trang mô tả chi tiết để người dùng bấm vào xem ngay được */
function getRelatedBooksData(currentId) {
  const otherBooks = getFullBookCatalog().filter((book) => book.id !== currentId);
  const withDetailPage = otherBooks.filter((book) => PRODUCT_DETAIL_IDS.includes(book.id));
  const withoutDetailPage = otherBooks.filter((book) => !PRODUCT_DETAIL_IDS.includes(book.id));
  return [...withDetailPage, ...withoutDetailPage].slice(0, 4);
}

/* Tạo đoạn HTML cho 1 thẻ sách trong khu vực "Sản phẩm tương tự" */
function createRelatedBookCardHTML(book) {
  const discount = calculateDiscountPercent(book.price, book.oldPrice);
  return `
    <div class="col-lg-3 col-md-4 col-sm-6 col-12">
      <div class="card related-book-card h-100 shadow-sm border-0">
        <div class="position-relative">
          <img src="${book.image}" class="card-img-top" alt="${book.title}">
          ${discount > 0 ? `<span class="badge bg-danger related-discount-badge">-${discount}%</span>` : ""}
        </div>
        <div class="card-body d-flex flex-column">
          <span class="badge bg-light text-secondary mb-2 align-self-start">${book.category}</span>
          <h6 class="card-title book-title">${book.title}</h6>
          <p class="text-muted small mb-1">${book.author}</p>
          <div class="mt-auto">
            <div class="d-flex align-items-center gap-2 mb-2">
              <span class="fw-bold text-danger">${formatCurrency(book.price)}</span>
              <span class="text-muted text-decoration-line-through small">${formatCurrency(book.oldPrice)}</span>
            </div>
            <button class="btn btn-outline-dark btn-sm w-100" data-id="${book.id}">Xem chi tiết</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

/* Render danh sách "Sản phẩm tương tự" vào khu vực #relatedBooksContainer */
function renderRelatedBooks() {
  const currentBookId = getCurrentBookId();
  const relatedBooks = getRelatedBooksData(currentBookId);
  const container = document.getElementById("relatedBooksContainer");
  container.innerHTML = relatedBooks.map(createRelatedBookCardHTML).join("");
}

/* Chuyển sang trang chi tiết của 1 sách tương tự được chọn
 * Hiện tại các sách có id nằm trong PRODUCT_DETAIL_IDS đã có trang mô tả riêng */
function goToRelatedBookDetail(bookId) {
  const id = Number(bookId);
  if (PRODUCT_DETAIL_IDS.includes(id)) {
    window.location.href = `product.html?id=${id}`;
  } else {
    alert("Trang chi tiết của sách này đang được phát triển. Mời bạn quay lại trang chủ để xem thêm các sách khác!");
  }
}

/* Xử lý sự kiện click vào nút "Xem chi tiết" trong khu vực sách tương tự (event delegation) */
function handleRelatedBooksClick(event) {
  const target = event.target.closest("button[data-id]");
  if (!target) return;
  goToRelatedBookDetail(target.dataset.id);
}


/* Lấy giá trị số lượng hiện tại từ ô input */
function getCurrentQuantity() {
  return Number(document.getElementById("quantityInput").value) || 1;
}

/* Cập nhật ô input số lượng với giá trị mới (đảm bảo >= 1) */
function setQuantity(value) {
  const safeValue = Math.max(1, value);
  document.getElementById("quantityInput").value = safeValue;
}

/* Tăng số lượng lên 1 */
function increaseQuantity() {
  setQuantity(getCurrentQuantity() + 1);
}

/* Giảm số lượng xuống 1 (không nhỏ hơn 1) */
function decreaseQuantity() {
  setQuantity(getCurrentQuantity() - 1);
}

/* Xử lý khi người dùng tự gõ số lượng vào ô input */
function handleQuantityInputChange() {
  setQuantity(getCurrentQuantity());
}

/* Cập nhật số hiển thị trên icon giỏ hàng */
function updateCartBadge(count) {
  document.getElementById("cartCount").textContent = count;
}

/* Xử lý khi người dùng bấm "Thêm vào giỏ hàng" */
function handleAddToCart() {
  const book = getBookDetailData();
  const quantity = getCurrentQuantity();
  currentCartCount += quantity;
  updateCartBadge(currentCartCount);
  alert(`Đã thêm ${quantity} cuốn "${book.title}" vào giỏ hàng!`);
}

/* Xử lý khi người dùng bấm "Mua ngay" */
function handleBuyNow() {
  const book = getBookDetailData();
  const quantity = getCurrentQuantity();
  const total = formatCurrency(book.price * quantity);
  alert(`Đặt mua thành công ${quantity} cuốn "${book.title}".\nTổng tiền: ${total}`);
}

/* Đổi ảnh chính khi người dùng bấm vào một ảnh thu nhỏ */
function handleThumbnailClick(event) {
  const target = event.target.closest(".thumb-img");
  if (!target) return;

  document.getElementById("mainImage").src = target.dataset.src;

  document.querySelectorAll(".thumb-img").forEach((img) => img.classList.remove("active-thumb"));
  target.classList.add("active-thumb");
}

/* Chuyển đổi giữa các tab: mô tả / thông số / đánh giá */
function switchTab(tabName) {
  document.querySelectorAll(".nav-tabs .nav-link").forEach((link) => link.classList.remove("active"));
  document.querySelectorAll(".tab-pane").forEach((pane) => pane.classList.remove("active"));

  document.querySelector(`.nav-link[data-tab="${tabName}"]`).classList.add("active");
  document.getElementById(`tab-${tabName}`).classList.add("active");
}

/* Xử lý sự kiện click vào thanh tab (event delegation) */
function handleTabClick(event) {
  const target = event.target.closest(".nav-link[data-tab]");
  if (!target) return;
  switchTab(target.dataset.tab);
}

/* Hàm khởi tạo chính của trang mô tả sản phẩm - chạy khi DOM đã tải xong */
function initProductPage() {
  renderProductInfo();
  renderRelatedBooks();
  updateCartBadge(currentCartCount);

  document.getElementById("decreaseBtn").addEventListener("click", decreaseQuantity);
  document.getElementById("increaseBtn").addEventListener("click", increaseQuantity);
  document.getElementById("quantityInput").addEventListener("change", handleQuantityInputChange);

  document.getElementById("addToCartBtn").addEventListener("click", handleAddToCart);
  document.getElementById("buyNowBtn").addEventListener("click", handleBuyNow);

  document.getElementById("thumbnailContainer").addEventListener("click", handleThumbnailClick);
  document.getElementById("productTabs").addEventListener("click", handleTabClick);
  document.getElementById("relatedBooksContainer").addEventListener("click", handleRelatedBooksClick);
}

document.addEventListener("DOMContentLoaded", initProductPage);
