/* ===== header-search.js - Xử lý thanh tìm kiếm chung trên navbar (kèm gợi ý) ===== */
/* File này được nhúng ở mọi trang có thanh tìm kiếm (index, product, cart).               */
/* Khi gõ vào ô tìm kiếm: hiện dần danh sách gợi ý các sách có tên/tác giả gần giống nhất.  */
/* Khi click vào 1 gợi ý hoặc nhấn Enter: mới thực sự thực hiện tìm kiếm.                   */
/* Nếu đang ở trang chủ (có sẵn hàm filterBooksByKeyword từ index.js) thì lọc ngay tại chỗ. */
/* Nếu đang ở trang khác thì chuyển hướng về trang chủ kèm từ khóa qua query string ?search= */

const MAX_SUGGESTION_RESULTS = 10;

/* Trả về danh sách rút gọn của toàn bộ sách trong cửa hàng, dùng để gợi ý khi gõ tìm kiếm */
function getSearchSuggestionsData() {
  return [
    { id: 1, title: "Nhà Giả Kim", author: "Paulo Coelho", image: "../assets/images/nha-gia-kim.jpg" },
    { id: 2, title: "Đắc Nhân Tâm", author: "Dale Carnegie", image: "../assets/images/dac-nhan-tam.png" },
    { id: 3, title: "Tuổi Trẻ Đáng Giá Bao Nhiêu", author: "Rosie Nguyễn", image: "../assets/images/tuoi-tre-dang-gia-bao-nhieu.jpg" },
    { id: 4, title: "Số Đỏ", author: "Vũ Trọng Phụng", image: "../assets/images/so-do.jpg" },
    { id: 5, title: "Sapiens: Lược Sử Loài Người", author: "Yuval Noah Harari", image: "../assets/images/sapiens-luoc-su-loai-nguoi.jpg" },
    { id: 6, title: "Cà Phê Cùng Tony", author: "Tony Buổi Sáng", image: "../assets/images/ca-phe-cung-tony.jpg" },
    { id: 7, title: "Người Giàu Có Nhất Thành Babylon", author: "George S. Clason", image: "../assets/images/người_giàu_có_nhất_thành_babylon.jpg" },
    { id: 8, title: "Lược Sử Thời Gian", author: "Stephen Hawking", image: "../assets/images/luoc-su-thoi-gian.jpg" },
    { id: 9, title: "Nhà Lãnh Đạo Không Chức Danh", author: "Robin Sharma", image: "../assets/images/nha-lanh-dao-khong-chuc-danh.jpg" },
    { id: 10, title: "Muôn Kiếp Nhân Sinh", author: "Nguyên Phong", image: "../assets/images/muon-kiep-nhan-sinh.jpg" }
  ];
}

/* Chuẩn hóa chuỗi để so khớp tìm kiếm: chữ thường, bỏ dấu tiếng Việt */
function normalizeForSearch(text) {
  return text
    .toLowerCase()
    .replace(/đ/g, "d")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

/* Tìm các sách có tên hoặc tác giả gần giống với từ khóa, trả về tối đa số lượng quy định */
function getMatchingSuggestions(keyword) {
  const normalizedKeyword = normalizeForSearch(keyword);
  if (!normalizedKeyword) return [];

  return getSearchSuggestionsData()
    .filter((book) => {
      return (
        normalizeForSearch(book.title).includes(normalizedKeyword) ||
        normalizeForSearch(book.author).includes(normalizedKeyword)
      );
    })
    .slice(0, MAX_SUGGESTION_RESULTS);
}

/* Tạo đoạn HTML cho 1 dòng gợi ý trong dropdown */
function buildSuggestionItemHTML(book) {
  return `
    <button type="button" class="search-suggestion-item" data-title="${book.title}">
      <img src="${book.image}" alt="${book.title}">
      <span class="flex-grow-1 overflow-hidden">
        <p class="search-suggestion-title">${book.title}</p>
        <p class="search-suggestion-author">${book.author}</p>
      </span>
    </button>
  `;
}

/* Hiển thị dropdown gợi ý với danh sách sách phù hợp (hoặc thông báo không tìm thấy) */
function renderSuggestionsDropdown(matches) {
  const dropdown = document.getElementById("searchSuggestions");
  if (!dropdown) return;

  dropdown.innerHTML =
    matches.length === 0
      ? `<p class="search-suggestion-empty">Không tìm thấy sách phù hợp</p>`
      : matches.map(buildSuggestionItemHTML).join("");

  dropdown.classList.remove("d-none");
}

/* Ẩn dropdown gợi ý và xóa nội dung bên trong */
function hideSuggestionsDropdown() {
  const dropdown = document.getElementById("searchSuggestions");
  if (!dropdown) return;
  dropdown.classList.add("d-none");
  dropdown.innerHTML = "";
}

/* Chuyển hướng về trang chủ kèm từ khóa tìm kiếm trên query string */
function redirectToSearchResults(keyword) {
  window.location.href = keyword ? `../index.html?search=${encodeURIComponent(keyword)}` : "../index.html";
}

/* Thực hiện tìm kiếm thật với từ khóa: lọc ngay nếu đang ở trang chủ, ngược lại chuyển hướng */
function performSearch(keyword) {
  const trimmedKeyword = (keyword || "").trim();

  if (typeof window.filterBooksByKeyword === "function") {
    window.filterBooksByKeyword(trimmedKeyword);
  } else {
    redirectToSearchResults(trimmedKeyword);
  }
}

/* Xử lý khi người dùng gõ vào ô tìm kiếm - hiện dần các gợi ý gần giống nhất */
function handleSearchInputTyping(event) {
  const keyword = event.target.value;
  if (!keyword.trim()) {
    hideSuggestionsDropdown();
    return;
  }
  renderSuggestionsDropdown(getMatchingSuggestions(keyword));
}

/* Xử lý khi người dùng click chọn 1 gợi ý trong dropdown (event delegation) */
function handleSuggestionItemClick(event) {
  const item = event.target.closest(".search-suggestion-item[data-title]");
  if (!item) return;

  const title = item.dataset.title;
  const input = document.getElementById("searchInput");
  if (input) input.value = title;

  hideSuggestionsDropdown();
  performSearch(title);
}

/* Xử lý khi người dùng submit form tìm kiếm (nhấn Enter hoặc bấm icon kính lúp) */
function handleHeaderSearchSubmit(event) {
  event.preventDefault();
  const input = document.getElementById("searchInput");
  const keyword = input ? input.value : "";

  hideSuggestionsDropdown();
  performSearch(keyword);
}

/* Đóng dropdown khi người dùng click ra ngoài khu vực tìm kiếm */
function handleDocumentClickForSearch(event) {
  const wrapper = document.querySelector(".search-wrapper");
  if (!wrapper) return;
  if (!wrapper.contains(event.target)) {
    hideSuggestionsDropdown();
  }
}

/* Đóng dropdown khi người dùng nhấn phím Escape */
function handleSearchInputKeydown(event) {
  if (event.key === "Escape") {
    hideSuggestionsDropdown();
  }
}

/* Hàm khởi tạo chính - gắn toàn bộ sự kiện cho thanh tìm kiếm nếu trang hiện tại có form này */
function initHeaderSearch() {
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");
  const suggestionsBox = document.getElementById("searchSuggestions");
  if (!searchForm || !searchInput) return;

  searchForm.addEventListener("submit", handleHeaderSearchSubmit);
  searchInput.addEventListener("input", handleSearchInputTyping);
  searchInput.addEventListener("keydown", handleSearchInputKeydown);
  if (suggestionsBox) suggestionsBox.addEventListener("click", handleSuggestionItemClick);
  document.addEventListener("click", handleDocumentClickForSearch);
}

document.addEventListener("DOMContentLoaded", initHeaderSearch);
