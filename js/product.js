/* ===== product.js - Xử lý tương tác trên trang mô tả chi tiết sách ===== */
/* Toàn bộ hàm đều được khai báo có tên (named function), không dùng hàm ẩn danh khi gán event */
/* Trang này dùng chung cho nhiều cuốn sách, xác định sách nào qua tham số ?id= trên URL.       */
/* Ví dụ: product.html?id=2 sẽ hiển thị chi tiết cuốn sách có id = 2.                           */

let currentCartCount = 0; // Số lượng trong giỏ hàng (lưu tạm trong phiên làm việc)

const PRODUCT_DETAIL_IDS = [1, 2, 3, 4, 5]; // Các id sách đã có trang mô tả chi tiết đầy đủ

/**
 * Trả về toàn bộ dữ liệu chi tiết của những cuốn sách đã có trang mô tả riêng (id 1 - 5)
 */
function getProductDetailDataset() {
  return {
    1: {
      id: 1,
      title: "Nhà Giả Kim",
      author: "Paulo Coelho",
      category: "Tiểu thuyết",
      price: 79000,
      oldPrice: 99000,
      publisher: "NXB Hội Nhà Văn",
      publishYear: 2020,
      pages: 228,
      format: "Bìa mềm",
      weight: "250g",
      language: "Tiếng Việt",
      mainImage: "https://picsum.photos/seed/book1main/500/620",
      thumbnails: [
        "https://picsum.photos/seed/book1main/500/620",
        "https://picsum.photos/seed/book1back/500/620",
        "https://picsum.photos/seed/book1inside1/500/620",
        "https://picsum.photos/seed/book1inside2/500/620",
      ],
      description:
        "Nhà Giả Kim kể về cuộc hành trình của chàng chăn cừu Santiago, người rời bỏ vùng đồng cỏ quen thuộc ở Andalusia để đi tìm một giấc mơ về kho báu ẩn giấu nơi vùng kim tự tháp Ai Cập. Trên đường đi, Santiago gặp gỡ nhiều con người và trải nghiệm nhiều biến cố giúp anh hiểu được ngôn ngữ của vũ trụ và ý nghĩa thật sự của vận mệnh bản thân. Cuốn sách là một ngụ ngôn giàu chất thơ về việc lắng nghe trái tim, theo đuổi đam mê và tin tưởng vào hành trình của chính mình.",
      highlights: [
        "Tác phẩm bán hơn 65 triệu bản trên toàn thế giới",
        "Được dịch sang hơn 80 ngôn ngữ khác nhau",
        "Một trong những cuốn sách truyền cảm hứng nhất mọi thời đại",
        "Phù hợp cho người muốn tìm động lực và định hướng cuộc sống",
      ],
    },
    2: {
      id: 2,
      title: "Đắc Nhân Tâm",
      author: "Dale Carnegie",
      category: "Kỹ năng sống",
      price: 86000,
      oldPrice: 108000,
      publisher: "NXB Tổng hợp TP.HCM",
      publishYear: 2019,
      pages: 320,
      format: "Bìa mềm",
      weight: "350g",
      language: "Tiếng Việt",
      mainImage: "https://picsum.photos/seed/book2main/500/620",
      thumbnails: [
        "https://picsum.photos/seed/book2main/500/620",
        "https://picsum.photos/seed/book2back/500/620",
        "https://picsum.photos/seed/book2inside1/500/620",
        "https://picsum.photos/seed/book2inside2/500/620",
      ],
      description:
        "Đắc Nhân Tâm tổng hợp những nguyên tắc ứng xử và giao tiếp giúp xây dựng mối quan hệ tốt đẹp với mọi người xung quanh. Tác giả Dale Carnegie chỉ ra cách lắng nghe, khen ngợi chân thành, nhìn nhận vấn đề từ góc độ của người khác và truyền cảm hứng thay vì áp đặt. Đây là một trong những cuốn sách kỹ năng sống kinh điển, được nhiều thế hệ độc giả tin dùng để cải thiện khả năng giao tiếp và xây dựng các mối quan hệ bền vững trong công việc cũng như cuộc sống.",
      highlights: [
        "Sách kỹ năng sống bán chạy nhất mọi thời đại",
        "Được dịch ra hàng chục ngôn ngữ trên thế giới",
        "Áp dụng được cho công việc, gia đình và các mối quan hệ xã hội",
        "Trình bày dễ hiểu qua nhiều câu chuyện thực tế",
      ],
    },
    3: {
      id: 3,
      title: "Tuổi Trẻ Đáng Giá Bao Nhiêu",
      author: "Rosie Nguyễn",
      category: "Kỹ năng sống",
      price: 75000,
      oldPrice: 95000,
      publisher: "NXB Hội Nhà Văn",
      publishYear: 2018,
      pages: 263,
      format: "Bìa mềm",
      weight: "280g",
      language: "Tiếng Việt",
      mainImage: "https://picsum.photos/seed/book3main/500/620",
      thumbnails: [
        "https://picsum.photos/seed/book3main/500/620",
        "https://picsum.photos/seed/book3back/500/620",
        "https://picsum.photos/seed/book3inside1/500/620",
        "https://picsum.photos/seed/book3inside2/500/620",
      ],
      description:
        "Cuốn sách là những chia sẻ chân thành của tác giả Rosie Nguyễn dành cho các bạn trẻ Việt Nam về chuyện học tập, làm việc, đi và trải nghiệm. Nội dung xoay quanh việc đầu tư cho bản thân, dám bước ra khỏi vùng an toàn, rèn luyện kỹ năng sống cần thiết và xác định giá trị của tuổi trẻ trước khi nó trôi qua. Cuốn sách phù hợp với sinh viên và người trẻ đang tìm kiếm động lực, định hướng cho con đường phát triển của riêng mình.",
      highlights: [
        "Tác phẩm gối đầu của nhiều thế hệ sinh viên Việt Nam",
        "Chia sẻ kinh nghiệm thực tế về học tập và trải nghiệm",
        "Văn phong gần gũi, dễ đọc, nhiều câu chuyện truyền cảm hứng",
        "Phù hợp với độc giả từ 16 đến 25 tuổi",
      ],
    },
    4: {
      id: 4,
      title: "Sapiens: Lược Sử Loài Người",
      author: "Yuval Noah Harari",
      category: "Khoa học",
      price: 189000,
      oldPrice: 229000,
      publisher: "NXB Thế Giới",
      publishYear: 2021,
      pages: 588,
      format: "Bìa cứng",
      weight: "620g",
      language: "Tiếng Việt",
      mainImage: "https://picsum.photos/seed/book4main/500/620",
      thumbnails: [
        "https://picsum.photos/seed/book4main/500/620",
        "https://picsum.photos/seed/book4back/500/620",
        "https://picsum.photos/seed/book4inside1/500/620",
        "https://picsum.photos/seed/book4inside2/500/620",
      ],
      description:
        "Sapiens đưa người đọc đi qua hành trình hơn 70.000 năm tiến hóa của loài người, từ những bộ lạc săn bắt hái lượm nhỏ bé cho đến nền văn minh công nghệ hiện đại. Yuval Noah Harari phân tích vai trò của cách mạng nhận thức, cách mạng nông nghiệp và cách mạng khoa học trong việc định hình xã hội loài người, đồng thời đặt ra nhiều câu hỏi sâu sắc về hạnh phúc, đạo đức và tương lai của nhân loại trong thời đại trí tuệ nhân tạo và công nghệ sinh học.",
      highlights: [
        "Hiện tượng xuất bản toàn cầu, dịch sang hơn 60 ngôn ngữ",
        "Được nhiều nhân vật nổi tiếng trong giới công nghệ giới thiệu",
        "Góc nhìn liên ngành giữa lịch sử, sinh học và xã hội học",
        "Phù hợp với người yêu thích sách khoa học phổ thông",
      ],
    },
    5: {
      id: 5,
      title: "Cây Cam Ngọt Của Tôi",
      author: "José Mauro de Vasconcelos",
      category: "Tiểu thuyết",
      price: 88000,
      oldPrice: 110000,
      publisher: "NXB Hội Nhà Văn",
      publishYear: 2020,
      pages: 244,
      format: "Bìa mềm",
      weight: "270g",
      language: "Tiếng Việt",
      mainImage: "https://picsum.photos/seed/book5main/500/620",
      thumbnails: [
        "https://picsum.photos/seed/book5main/500/620",
        "https://picsum.photos/seed/book5back/500/620",
        "https://picsum.photos/seed/book5inside1/500/620",
        "https://picsum.photos/seed/book5inside2/500/620",
      ],
      description:
        "Cuốn tiểu thuyết bán tự truyện kể về Zezé, một cậu bé nghèo sống ở vùng ngoại ô Brazil, với tâm hồn nhạy cảm và trí tưởng tượng phong phú vượt xa tuổi của mình. Người bạn đặc biệt nhất của Zezé là một cây cam non mà cậu đặt tên là Bồ Đào Nha, nơi cậu trút bầu tâm sự mỗi khi buồn tủi giữa cuộc sống thiếu thốn tình thương. Câu chuyện chạm đến trái tim người đọc bằng sự hồn nhiên, nỗi đau và cả những bài học về tình yêu thương trong những năm tháng đầu đời.",
      highlights: [
        "Một trong những tiểu thuyết được yêu thích nhất của văn học Brazil",
        "Câu chuyện cảm động về tuổi thơ và tình thân",
        "Văn phong giản dị nhưng giàu cảm xúc",
        "Phù hợp với độc giả yêu thích những câu chuyện ấm áp, chân thực",
      ],
    },
  };
}

/**
 * Đọc id sách hiện tại từ tham số ?id= trên URL, mặc định là 1 nếu không hợp lệ
 */
function getCurrentBookId() {
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));
  return Number.isInteger(id) && PRODUCT_DETAIL_IDS.includes(id) ? id : 1;
}

/**
 * Trả về dữ liệu chi tiết của cuốn sách đang được xem dựa trên id hiện tại
 */
function getBookDetailData() {
  const dataset = getProductDetailDataset();
  return dataset[getCurrentBookId()];
}

/**
 * Định dạng số tiền theo chuẩn VND
 */
function formatCurrency(value) {
  return value.toLocaleString("vi-VN") + "đ";
}

/**
 * Tính phần trăm giảm giá dựa trên giá gốc và giá bán
 */
function calculateDiscountPercent(price, oldPrice) {
  if (!oldPrice || oldPrice <= price) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}


/**
 * Đổ dữ liệu sách vào các phần tử HTML tương ứng trên trang
 */
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

/**
 * Trả về dữ liệu rút gọn của toàn bộ 10 cuốn sách trong cửa hàng (đồng bộ với index.js),
 * dùng để chọn ra các sách gợi ý trong khu vực "Sản phẩm tương tự"
 */
function getFullBookCatalog() {
  return [
    { id: 1, title: "Nhà Giả Kim", author: "Paulo Coelho", category: "Tiểu thuyết", price: 79000, oldPrice: 99000, image: "https://picsum.photos/seed/book1/300/420" },
    { id: 2, title: "Đắc Nhân Tâm", author: "Dale Carnegie", category: "Kỹ năng sống", price: 86000, oldPrice: 108000, image: "https://picsum.photos/seed/book2/300/420" },
    { id: 3, title: "Tuổi Trẻ Đáng Giá Bao Nhiêu", author: "Rosie Nguyễn", category: "Kỹ năng sống", price: 75000, oldPrice: 95000, image: "https://picsum.photos/seed/book3/300/420" },
    { id: 4, title: "Sapiens: Lược Sử Loài Người", author: "Yuval Noah Harari", category: "Khoa học", price: 189000, oldPrice: 229000, image: "https://picsum.photos/seed/book4/300/420" },
    { id: 5, title: "Cây Cam Ngọt Của Tôi", author: "José Mauro de Vasconcelos", category: "Tiểu thuyết", price: 88000, oldPrice: 110000, image: "https://picsum.photos/seed/book5/300/420" },
    { id: 6, title: "Người Giàu Có Nhất Thành Babylon", author: "George S. Clason", category: "Tài chính", price: 65000, oldPrice: 80000, image: "https://picsum.photos/seed/book6/300/420" },
    { id: 7, title: "Tôi Tài Giỏi, Bạn Cũng Thế", author: "Adam Khoo", category: "Kỹ năng sống", price: 99000, oldPrice: 120000, image: "https://picsum.photos/seed/book7/300/420" },
    { id: 8, title: "Muôn Kiếp Nhân Sinh", author: "Nguyên Phong", category: "Tâm linh", price: 135000, oldPrice: 165000, image: "https://picsum.photos/seed/book8/300/420" },
    { id: 9, title: "Atomic Habits", author: "James Clear", category: "Kỹ năng sống", price: 159000, oldPrice: 189000, image: "https://picsum.photos/seed/book9/300/420" },
    { id: 10, title: "Nghĩ Giàu Làm Giàu", author: "Napoleon Hill", category: "Tài chính", price: 95000, oldPrice: 115000, image: "https://picsum.photos/seed/book10/300/420" },
  ];
}

/**
 * Chọn ra 4 sách gợi ý cho khu vực "Sản phẩm tương tự", loại trừ sách đang xem,
 * ưu tiên những sách đã có trang mô tả chi tiết để người dùng bấm vào xem ngay được
 */
function getRelatedBooksData(currentId) {
  const otherBooks = getFullBookCatalog().filter((book) => book.id !== currentId);
  const withDetailPage = otherBooks.filter((book) => PRODUCT_DETAIL_IDS.includes(book.id));
  const withoutDetailPage = otherBooks.filter((book) => !PRODUCT_DETAIL_IDS.includes(book.id));
  return [...withDetailPage, ...withoutDetailPage].slice(0, 4);
}

/**
 * Tạo đoạn HTML cho 1 thẻ sách trong khu vực "Sản phẩm tương tự"
 */
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

/**
 * Render danh sách "Sản phẩm tương tự" vào khu vực #relatedBooksContainer
 */
function renderRelatedBooks() {
  const currentBookId = getCurrentBookId();
  const relatedBooks = getRelatedBooksData(currentBookId);
  const container = document.getElementById("relatedBooksContainer");
  container.innerHTML = relatedBooks.map(createRelatedBookCardHTML).join("");
}

/**
 * Chuyển sang trang chi tiết của 1 sách tương tự được chọn
 * Hiện tại các sách có id nằm trong PRODUCT_DETAIL_IDS đã có trang mô tả riêng
 */
function goToRelatedBookDetail(bookId) {
  const id = Number(bookId);
  if (PRODUCT_DETAIL_IDS.includes(id)) {
    window.location.href = `product.html?id=${id}`;
  } else {
    alert("Trang chi tiết của sách này đang được phát triển. Mời bạn quay lại trang chủ để xem thêm các sách khác!");
  }
}

/**
 * Xử lý sự kiện click vào nút "Xem chi tiết" trong khu vực sách tương tự (event delegation)
 */
function handleRelatedBooksClick(event) {
  const target = event.target.closest("button[data-id]");
  if (!target) return;
  goToRelatedBookDetail(target.dataset.id);
}


/**
 * Lấy giá trị số lượng hiện tại từ ô input
 */
function getCurrentQuantity() {
  return Number(document.getElementById("quantityInput").value) || 1;
}

/**
 * Cập nhật ô input số lượng với giá trị mới (đảm bảo >= 1)
 */
function setQuantity(value) {
  const safeValue = Math.max(1, value);
  document.getElementById("quantityInput").value = safeValue;
}

/**
 * Tăng số lượng lên 1
 */
function increaseQuantity() {
  setQuantity(getCurrentQuantity() + 1);
}

/**
 * Giảm số lượng xuống 1 (không nhỏ hơn 1)
 */
function decreaseQuantity() {
  setQuantity(getCurrentQuantity() - 1);
}

/**
 * Xử lý khi người dùng tự gõ số lượng vào ô input
 */
function handleQuantityInputChange() {
  setQuantity(getCurrentQuantity());
}

/**
 * Cập nhật số hiển thị trên icon giỏ hàng
 */
function updateCartBadge(count) {
  document.getElementById("cartCount").textContent = count;
}

/**
 * Xử lý khi người dùng bấm "Thêm vào giỏ hàng"
 */
function handleAddToCart() {
  const book = getBookDetailData();
  const quantity = getCurrentQuantity();
  currentCartCount += quantity;
  updateCartBadge(currentCartCount);
  alert(`Đã thêm ${quantity} cuốn "${book.title}" vào giỏ hàng!`);
}

/**
 * Xử lý khi người dùng bấm "Mua ngay"
 */
function handleBuyNow() {
  const book = getBookDetailData();
  const quantity = getCurrentQuantity();
  const total = formatCurrency(book.price * quantity);
  alert(`Đặt mua thành công ${quantity} cuốn "${book.title}".\nTổng tiền: ${total}`);
}

/**
 * Đổi ảnh chính khi người dùng bấm vào một ảnh thu nhỏ
 */
function handleThumbnailClick(event) {
  const target = event.target.closest(".thumb-img");
  if (!target) return;

  document.getElementById("mainImage").src = target.dataset.src;

  document.querySelectorAll(".thumb-img").forEach((img) => img.classList.remove("active-thumb"));
  target.classList.add("active-thumb");
}

/**
 * Chuyển đổi giữa các tab: mô tả / thông số / đánh giá
 */
function switchTab(tabName) {
  document.querySelectorAll(".nav-tabs .nav-link").forEach((link) => link.classList.remove("active"));
  document.querySelectorAll(".tab-pane").forEach((pane) => pane.classList.remove("active"));

  document.querySelector(`.nav-link[data-tab="${tabName}"]`).classList.add("active");
  document.getElementById(`tab-${tabName}`).classList.add("active");
}

/**
 * Xử lý sự kiện click vào thanh tab (event delegation)
 */
function handleTabClick(event) {
  const target = event.target.closest(".nav-link[data-tab]");
  if (!target) return;
  switchTab(target.dataset.tab);
}

/**
 * Hàm khởi tạo chính của trang mô tả sản phẩm - chạy khi DOM đã tải xong
 */
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
