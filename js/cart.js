/* ===== cart.js - Xử lý logic trang Giỏ hàng ===== */
/* Toàn bộ hàm đều được khai báo có tên (named function), không dùng hàm ẩn danh khi gán event */
/* Lưu ý: đây là bản demo phía giao diện (front-end), dữ liệu giỏ hàng được lưu tạm trong       */
/* biến JavaScript của trang, chưa kết nối với cơ sở dữ liệu hay đồng bộ qua các trang khác.    */

let cartItems = [];      // Danh sách sản phẩm trong giỏ (state chính của trang)
let discountPercent = 0; // % giảm giá đang được áp dụng (0 - 100)

const SHIPPING_FEE = 20000;       // Phí vận chuyển mặc định
const FREE_SHIPPING_THRESHOLD = 200000; // Miễn phí vận chuyển khi tạm tính >= mức này
const VALID_DISCOUNT_CODE = "SACH10";   // Mã giảm giá demo
const VALID_DISCOUNT_PERCENT = 10;

/**
 * Trả về dữ liệu mẫu cho giỏ hàng (mô phỏng người dùng đã thêm vài cuốn sách trước đó)
 */
function getInitialCartData() {
  return [
    {
      id: 1,
      title: "Nhà Giả Kim",
      author: "Paulo Coelho",
      price: 79000,
      image: "https://picsum.photos/seed/book1/120/160",
      quantity: 2,
    },
    {
      id: 4,
      title: "Sapiens: Lược Sử Loài Người",
      author: "Yuval Noah Harari",
      price: 189000,
      image: "https://picsum.photos/seed/book4/120/160",
      quantity: 1,
    },
    {
      id: 9,
      title: "Atomic Habits",
      author: "James Clear",
      price: 159000,
      image: "https://picsum.photos/seed/book9/120/160",
      quantity: 1,
    },
  ];
}

/**
 * Định dạng số tiền theo chuẩn VND
 */
function formatCurrency(value) {
  return Math.max(0, Math.round(value)).toLocaleString("vi-VN") + "đ";
}

/**
 * Tìm 1 sản phẩm trong giỏ theo id
 */
function findCartItemById(id) {
  return cartItems.find((item) => item.id === Number(id));
}

/**
 * Tính tổng tạm tính (chưa gồm phí vận chuyển, chưa trừ giảm giá)
 */
function calculateSubtotal() {
  return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

/**
 * Tính phí vận chuyển dựa trên tạm tính (miễn phí nếu vượt mức quy định)
 */
function calculateShippingFee(subtotal) {
  if (cartItems.length === 0) return 0;
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
}

/**
 * Tính số tiền được giảm dựa trên % giảm giá đang áp dụng
 */
function calculateDiscountAmount(subtotal) {
  return Math.round((subtotal * discountPercent) / 100);
}

/**
 * Tạo đoạn HTML cho 1 dòng sản phẩm trong bảng giỏ hàng
 */
function createCartItemRowHTML(item) {
  const lineTotal = item.price * item.quantity;
  return `
    <tr data-id="${item.id}">
      <td>
        <div class="d-flex align-items-center gap-3">
          <img src="${item.image}" class="cart-item-img" alt="${item.title}">
          <div>
            <p class="fw-semibold mb-1">${item.title}</p>
            <p class="text-muted small mb-0">${item.author}</p>
          </div>
        </div>
      </td>
      <td class="text-center">${formatCurrency(item.price)}</td>
      <td>
        <div class="input-group quantity-selector mx-auto">
          <button class="btn btn-outline-secondary btn-sm" type="button" data-action="decrease" data-id="${item.id}">−</button>
          <input type="number" class="form-control form-control-sm" data-id="${item.id}" value="${item.quantity}" min="1">
          <button class="btn btn-outline-secondary btn-sm" type="button" data-action="increase" data-id="${item.id}">+</button>
        </div>
      </td>
      <td class="text-center fw-semibold text-danger">${formatCurrency(lineTotal)}</td>
      <td class="text-center">
        <button class="btn btn-outline-danger btn-sm" type="button" data-action="remove" data-id="${item.id}">
          <i class="bi bi-trash"></i>
        </button>
      </td>
    </tr>
  `;
}

/**
 * Render toàn bộ bảng sản phẩm trong giỏ hàng, hoặc hiển thị trạng thái giỏ trống
 */
function renderCartItems() {
  const tableWrap = document.getElementById("cartTableWrap");
  const summaryWrap = document.getElementById("cartSummaryWrap");
  const emptyState = document.getElementById("emptyCartState");
  const tableBody = document.getElementById("cartTableBody");

  if (cartItems.length === 0) {
    tableWrap.classList.add("d-none");
    summaryWrap.classList.add("d-none");
    emptyState.classList.remove("d-none");
  } else {
    tableWrap.classList.remove("d-none");
    summaryWrap.classList.remove("d-none");
    emptyState.classList.add("d-none");
    tableBody.innerHTML = cartItems.map(createCartItemRowHTML).join("");
  }

  updateOrderSummary();
}

/**
 * Cập nhật toàn bộ số liệu trong khối tóm tắt đơn hàng (tạm tính, phí ship, giảm giá, tổng cộng)
 */
function updateOrderSummary() {
  const subtotal = calculateSubtotal();
  const shippingFee = calculateShippingFee(subtotal);
  const discountAmount = calculateDiscountAmount(subtotal);
  const total = Math.max(0, subtotal + shippingFee - discountAmount);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  document.getElementById("subtotalText").textContent = formatCurrency(subtotal);
  document.getElementById("shippingText").textContent = shippingFee === 0 ? "Miễn phí" : formatCurrency(shippingFee);
  document.getElementById("totalText").textContent = formatCurrency(total);

  const discountRow = document.getElementById("discountRow");
  if (discountAmount > 0) {
    discountRow.classList.remove("d-none");
    document.getElementById("discountText").textContent = "−" + formatCurrency(discountAmount);
  } else {
    discountRow.classList.add("d-none");
  }

  updateCartBadge(totalQuantity);
}

/**
 * Cập nhật số hiển thị trên icon giỏ hàng ở navbar
 */
function updateCartBadge(count) {
  const badge = document.getElementById("cartCount");
  if (badge) badge.textContent = count;
}

/**
 * Gán số lượng mới cho 1 sản phẩm (đảm bảo tối thiểu là 1) rồi render lại
 */
function setItemQuantity(id, quantity) {
  const item = findCartItemById(id);
  if (!item) return;
  item.quantity = Math.max(1, Math.floor(quantity) || 1);
  renderCartItems();
}

/**
 * Tăng số lượng của 1 sản phẩm lên 1
 */
function increaseItemQuantity(id) {
  const item = findCartItemById(id);
  if (!item) return;
  setItemQuantity(id, item.quantity + 1);
}

/**
 * Giảm số lượng của 1 sản phẩm xuống 1 (không nhỏ hơn 1)
 */
function decreaseItemQuantity(id) {
  const item = findCartItemById(id);
  if (!item) return;
  setItemQuantity(id, item.quantity - 1);
}

/**
 * Xóa 1 sản phẩm khỏi giỏ hàng theo id
 */
function removeCartItem(id) {
  cartItems = cartItems.filter((item) => item.id !== Number(id));
  renderCartItems();
}

/**
 * Xử lý sự kiện click trong bảng giỏ hàng (tăng / giảm / xóa) bằng event delegation
 */
function handleCartTableClick(event) {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const id = button.dataset.id;
  const action = button.dataset.action;

  if (action === "increase") increaseItemQuantity(id);
  else if (action === "decrease") decreaseItemQuantity(id);
  else if (action === "remove") removeCartItem(id);
}

/**
 * Xử lý khi người dùng tự gõ số lượng trực tiếp vào ô input trong bảng giỏ hàng
 */
function handleCartQuantityInputChange(event) {
  const input = event.target.closest("input[data-id]");
  if (!input) return;
  setItemQuantity(input.dataset.id, Number(input.value));
}

/**
 * Áp dụng mã giảm giá người dùng nhập vào, kiểm tra hợp lệ rồi cập nhật tóm tắt đơn hàng
 */
function applyDiscountCode() {
  const input = document.getElementById("discountInput");
  const feedback = document.getElementById("discountFeedback");
  const code = input.value.trim().toUpperCase();

  if (code === VALID_DISCOUNT_CODE) {
    discountPercent = VALID_DISCOUNT_PERCENT;
    feedback.textContent = `Áp dụng mã thành công, giảm ${VALID_DISCOUNT_PERCENT}% tổng đơn hàng!`;
    feedback.className = "text-success";
  } else {
    discountPercent = 0;
    feedback.textContent = "Mã giảm giá không hợp lệ hoặc đã hết hạn.";
    feedback.className = "text-danger";
  }

  updateOrderSummary();
}

/**
 * Xóa toàn bộ sản phẩm trong giỏ hàng
 */
function clearCart() {
  cartItems = [];
  discountPercent = 0;
  renderCartItems();
}

/**
 * Xử lý khi người dùng bấm "Tiến hành thanh toán"
 */
function handleCheckoutClick() {
  if (cartItems.length === 0) return;

  const subtotal = calculateSubtotal();
  const shippingFee = calculateShippingFee(subtotal);
  const discountAmount = calculateDiscountAmount(subtotal);
  const total = Math.max(0, subtotal + shippingFee - discountAmount);

  alert(`Đặt hàng thành công!\nTổng số tiền cần thanh toán: ${formatCurrency(total)}\n(Đây là bản demo, chưa kết nối cổng thanh toán thật)`);
  clearCart();
}

/**
 * Hàm khởi tạo chính của trang giỏ hàng - chạy khi DOM đã tải xong
 */
function initCartPage() {
  cartItems = getInitialCartData();
  renderCartItems();

  document.getElementById("cartTableBody").addEventListener("click", handleCartTableClick);
  document.getElementById("cartTableBody").addEventListener("change", handleCartQuantityInputChange);
  document.getElementById("applyDiscountBtn").addEventListener("click", applyDiscountCode);
  document.getElementById("checkoutBtn").addEventListener("click", handleCheckoutClick);
}

document.addEventListener("DOMContentLoaded", initCartPage);
