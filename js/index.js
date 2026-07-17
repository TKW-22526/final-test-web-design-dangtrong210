/*  ===== index.js - Sinh danh sách sách & xử lý tương tác trang chủ ==== */

let cartTotalCount = 0; // Biến lưu số lượng sách trong giỏ hàng (chỉ lưu tạm trong phiên làm việc)

const PRODUCT_DETAIL_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Các id sách đã có trang mô tả chi tiết đầy đủ

/* Trả về dữ liệu mẫu cho 10 cuốn sách đầu tiên của cửa hàng */
function getBookData() {
  return [
    {
      id: 1,
      title: "Nhà Giả Kim",
      author: "Paulo Coelho",
      category: "Tiểu thuyết",
      price: 79000, oldPrice: 99000,
      rating: 4.8, sold: 1200,
      image: "assets/images/nha-gia-kim.jpg"
    },
    {
      id: 2,
      title: "Đắc Nhân Tâm",
      author: "Dale Carnegie",
      category: "Kỹ năng sống",
      price: 86000, oldPrice: 108000,
      rating: 4.9, sold: 3400,
      image: "assets/images/dac-nhan-tam.png"
    },
    {
      id: 3,
      title: "Tuổi Trẻ Đáng Giá Bao Nhiêu",
      author: "Rosie Nguyễn",
      category: "Kỹ năng sống",
      price: 72000, oldPrice: 90000,
      rating: 4.6, sold: 1800,
      image: "assets/images/tuoi-tre-dang-gia-bao-nhieu.jpg"
    },
    {
      id: 4,
      title: "Số Đỏ",
      author: "Vũ Trọng Phụng",
      category: "Tiểu thuyết",
      price: 65000, oldPrice: 80000,
      rating: 4.7, sold: 950,
      image: "assets/images/so-do.jpg"
    },
    {
      id: 5,
      title: "Sapiens: Lược Sử Loài Người",
      author: "Yuval Noah Harari",
      category: "Khoa học",
      price: 199000, oldPrice: 249000,
      rating: 4.8, sold: 2500,
      image: "assets/images/sapiens-luoc-su-loai-nguoi.jpg"
    },
    {
      id: 6,
      title: "Cà Phê Cùng Tony",
      author: "Tony Buổi Sáng",
      category: "Kỹ năng sống",
      price: 60000, oldPrice: 75000,
      rating: 4.5, sold: 2100,
      image: "assets/images/ca-phe-cung-tony.jpg"
    },
    {
      id: 7,
      title: "Người Giàu Có Nhất Thành Babylon",
      author: "George S. Clason",
      category: "Tài chính",
      price: 68000, oldPrice: 85000,
      rating: 4.7, sold: 1650,
      image: "assets/images/người_giàu_có_nhất_thành_babylon.jpg"
    },
    {
      id: 8,
      title: "Lược Sử Thời Gian",
      author: "Stephen Hawking",
      category: "Khoa học",
      price: 108000, oldPrice: 135000,
      rating: 4.7, sold: 1100,
      image: "assets/images/luoc-su-thoi-gian.jpg"
    },
    {
      id: 9,
      title: "Nhà Lãnh Đạo Không Chức Danh",
      author: "Robin Sharma",
      category: "Kỹ năng sống",
      price: 95000, oldPrice: 120000,
      rating: 4.6, sold: 1300,
      image: "assets/images/nha-lanh-dao-khong-chuc-danh.jpg"
    },
    {
      id: 10,
      title: "Muôn Kiếp Nhân Sinh",
      author: "Nguyên Phong",
      category: "Tâm linh",
      price: 145000, oldPrice: 180000,
      rating: 4.9, sold: 2900,
      image: "assets/images/muon-kiep-nhan-sinh.jpg" }
  ];
}

document.addEventListener("DOMContentLoaded", () => {
  renderCategoryFilters();
});

/* Hàm tự động sinh các nút danh mục dựa trên dữ liệu từ getBookData() */
function renderCategoryFilters() {
  const filterContainer = document.getElementById("categoryFilter");
  if (!filterContainer) return;
  const books = getBookData();
  const categories = [...new Set(books.map(book => book.category))].filter(Boolean);

  let html = `<button class="btn btn-outline-primary btn-sm active-filter" data-category="all">Tất cả</button>`;

  categories.forEach(category => {
    html += `<button class="btn btn-outline-primary btn-sm" data-category="${category}">${category}</button>`;
  });
  filterContainer.innerHTML = html;

  setupFilterEvents();
}

/* Hàm gắn sự kiện lọc sách khi nhấn nút */
function setupFilterEvents() {
  const buttons = document.querySelectorAll("#categoryFilter .btn");
  
  buttons.forEach(button => {
    button.addEventListener("click", function() {
      document.querySelector("#categoryFilter .active-filter")?.classList.remove("active-filter");
      this.classList.add("active-filter");

      const selectedCategory = this.getAttribute("data-category");

      // Logic lọc hiển thị danh sách sách trên trang chủ:
      // if (selectedCategory === "all") {
      //   renderBookList(getBookData());
      // } else {
      //   const filtered = getBookData().filter(book => book.category === selectedCategory);
      //   renderBookList(filtered);
      // }
      console.log("Đã chọn lọc danh mục:", selectedCategory);
    });
  });
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


/* Tạo đoạn HTML cho 1 thẻ (card) sách dựa trên dữ liệu đầu vào */
function createBookCardHTML(book) {
  const discount = calculateDiscountPercent(book.price, book.oldPrice);
  return `
    <div class="col-lg-3 col-md-4 col-sm-6 col-12" data-category="${book.category}">
      <div class="card book-card h-100 shadow-sm border-0">
        <div class="position-relative">
          <img src="${book.image}" class="card-img-top" alt="${book.title}">
          ${discount > 0 ? `<span class="badge bg-danger discount-badge">-${discount}%</span>` : ""}
        </div>
        <div class="card-body d-flex flex-column">
          <span class="badge bg-light text-secondary mb-2 align-self-start">${book.category}</span>
          <h6 class="card-title book-title">${book.title}</h6>
          <p class="text-muted small mb-1">${book.author}</p>
          <div class="mt-auto">
            <div class="d-flex align-items-center gap-2 mb-2">
              <span class="fw-bold text-danger">${formatCurrency(book.price)}</span>
              ${book.oldPrice ? `<span class="text-muted text-decoration-line-through small">${formatCurrency(book.oldPrice)}</span>` : ""}
            </div>
            <div class="d-flex gap-2">
              <button class="btn btn-outline-dark btn-sm flex-fill" data-action="detail" data-id="${book.id}">Xem chi tiết</button>
              <button class="btn btn-dark btn-sm" data-action="add" data-id="${book.id}" title="Thêm vào giỏ">
                <i class="bi bi-cart-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/* Render toàn bộ danh sách sách vào khu vực #bookContainer */
function renderBookList(bookArray) {
  const container = document.getElementById("bookContainer");
  if (!bookArray.length) {
    container.innerHTML = `<p class="text-center text-muted">Không tìm thấy sách phù hợp.</p>`;
    return;
  }
  container.innerHTML = bookArray.map(createBookCardHTML).join("");
}

/* Cập nhật số hiển thị trên icon giỏ hàng */
function updateCartBadge(count) {
  const badge = document.getElementById("cartCount");
  badge.textContent = count;
}

/* Xử lý khi người dùng bấm "Thêm vào giỏ" */
function handleAddToCart(bookId) {
  const books = getBookData();
  const book = books.find((item) => item.id === Number(bookId));
  if (!book) return;
  cartTotalCount += 1;
  updateCartBadge(cartTotalCount);
  alert(`Đã thêm "${book.title}" vào giỏ hàng!`);
}

/* Xử lý khi người dùng bấm "Xem chi tiết"
 * Hiện tại 5 cuốn sách đầu tiên (id 1 - 5) đã có trang mô tả chi tiết riêng */
function goToBookDetail(bookId) {
  const id = Number(bookId);
  if (PRODUCT_DETAIL_IDS.includes(id)) {
    window.location.href = `html/product.html?id=${id}`;
  } else {
    alert("Trang chi tiết của sách này đang được phát triển. Mời bạn xem các sách đã có trang mô tả để trải nghiệm trước!");
  }
}

/* Hàm xử lý sự kiện click chung cho toàn bộ danh sách sách (event delegation) */
function handleBookContainerClick(event) {
  const target = event.target.closest("button[data-action]");
  if (!target) return;
  const bookId = target.dataset.id;
  const action = target.dataset.action;
  if (action === "add") {
    handleAddToCart(bookId);
  } else if (action === "detail") {
    goToBookDetail(bookId);
  }
}

/* Chuẩn hóa chuỗi để so khớp tìm kiếm: chữ thường, bỏ dấu tiếng Việt */
function normalizeKeyword(text) {
  return text
    .toLowerCase()
    .replace(/đ/g, "d")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

/* Đưa các nút lọc danh mục về trạng thái "Tất cả" đang được chọn */
function resetCategoryButtonsToAll() {
  const buttons = document.querySelectorAll("#categoryFilter button");
  buttons.forEach((btn) => btn.classList.remove("active-filter"));
  const allButton = document.querySelector('#categoryFilter button[data-category="all"]');
  if (allButton) allButton.classList.add("active-filter");
}

/* Cập nhật tiêu đề khu vực danh sách sách và nút "Xóa tìm kiếm" theo từ khóa hiện tại */
function updateBookListHeading(keyword, resultCount) {
  const heading = document.getElementById("bookListHeading");
  const clearBtn = document.getElementById("clearSearchBtn");
  if (!heading) return;

  if (keyword) {
    heading.textContent = `Kết quả tìm kiếm cho "${keyword}" (${resultCount} sách)`;
    if (clearBtn) clearBtn.classList.remove("d-none");
  } else {
    heading.textContent = "Sách bán chạy";
    if (clearBtn) clearBtn.classList.add("d-none");
  }
}

/* Lọc danh sách sách theo từ khóa (tìm trong tên sách và tên tác giả), rồi render lại */
function filterBooksByKeyword(keyword) {
  const trimmedKeyword = (keyword || "").trim();
  const books = getBookData();

  resetCategoryButtonsToAll();

  if (!trimmedKeyword) {
    renderBookList(books);
    updateBookListHeading("", books.length);
    return;
  }

  const normalizedKeyword = normalizeKeyword(trimmedKeyword);
  const filtered = books.filter((book) => {
    return (
      normalizeKeyword(book.title).includes(normalizedKeyword) ||
      normalizeKeyword(book.author).includes(normalizedKeyword)
    );
  });

  renderBookList(filtered);
  updateBookListHeading(trimmedKeyword, filtered.length);
}

/* Xóa bộ lọc tìm kiếm hiện tại, hiển thị lại toàn bộ sách */
function clearSearchFilter() {
  const input = document.getElementById("searchInput");
  if (input) input.value = "";
  filterBooksByKeyword("");
}

/* Bôi sáng nút danh mục khớp với tên truyền vào; nếu không khớp nút nào thì về "Tất cả" */
function setActiveCategoryButton(category) {
  const buttons = document.querySelectorAll("#categoryFilter button");
  let isMatched = false;

  buttons.forEach((btn) => {
    const isMatch = btn.dataset.category === category;
    btn.classList.toggle("active-filter", isMatch);
    if (isMatch) isMatched = true;
  });

  if (!isMatched) resetCategoryButtonsToAll();
}

/* Đọc tham số trên URL khi tải trang chủ (?search=... hoặc ?category=...), dùng khi
 * người dùng tìm kiếm hoặc bấm vào 1 danh mục từ một trang khác rồi được chuyển về đây */
function applyInitialFiltersFromURL() {
  const params = new URLSearchParams(window.location.search);
  const keyword = params.get("search");
  const category = params.get("category");
  const input = document.getElementById("searchInput");

  if (keyword) {
    if (input) input.value = keyword;
    filterBooksByKeyword(keyword);
    return;
  }

  if (category) {
    setActiveCategoryButton(category);
    filterBooksByCategory(category);
    return;
  }

  renderBookList(getBookData());
}

/* Lọc danh sách sách theo danh mục được chọn */
function filterBooksByCategory(category) {
  const books = getBookData();
  const filtered = category === "all" ? books : books.filter((book) => book.category === category);
  renderBookList(filtered);
}

/* Xử lý sự kiện click vào các nút lọc danh mục */
function handleCategoryFilterClick(event) {
  const target = event.target.closest("button[data-category]");
  if (!target) return;

  const buttons = document.querySelectorAll("#categoryFilter button");
  buttons.forEach((btn) => btn.classList.remove("active-filter"));
  target.classList.add("active-filter");

  const searchInput = document.getElementById("searchInput");
  if (searchInput) searchInput.value = "";
  updateBookListHeading("", 0);

  filterBooksByCategory(target.dataset.category);
}

/* Hàm khởi tạo chính của trang chủ - chạy khi DOM đã tải xong */
function initIndexPage() {
  applyInitialFiltersFromURL();
  updateCartBadge(cartTotalCount);

  document.getElementById("bookContainer").addEventListener("click", handleBookContainerClick);
  document.getElementById("categoryFilter").addEventListener("click", handleCategoryFilterClick);

  const clearSearchBtn = document.getElementById("clearSearchBtn");
  if (clearSearchBtn) clearSearchBtn.addEventListener("click", clearSearchFilter);
}

document.addEventListener("DOMContentLoaded", initIndexPage);
