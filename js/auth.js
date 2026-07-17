/* ===== auth.js - Xử lý form Đăng nhập & Đăng ký ===== */
/* File này dùng chung cho cả login.html và register.html.       */

/* Đảo trạng thái hiển thị/ẩn của 1 ô mật khẩu khi bấm icon con mắt */
function togglePasswordVisibility(event) {
  const button = event.currentTarget;
  const input = document.getElementById(button.dataset.target);
  if (!input) return;

  const icon = button.querySelector("i");
  const isHidden = input.type === "password";

  input.type = isHidden ? "text" : "password";
  icon.classList.toggle("bi-eye", !isHidden);
  icon.classList.toggle("bi-eye-slash", isHidden);
}

/* Gắn sự kiện click cho tất cả nút hiện/ẩn mật khẩu có trên trang */
function attachPasswordToggleListeners() {
  const toggleButtons = document.querySelectorAll(".toggle-password");
  toggleButtons.forEach((button) => button.addEventListener("click", togglePasswordVisibility));
}

/* Đánh giá độ mạnh của mật khẩu, trả về điểm số (0-4), nhãn và màu hiển thị */
function evaluatePasswordStrength(password) {
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) score++;

  const levels = [
    { percent: 0, label: "Tối thiểu 6 ký tự, nên kết hợp chữ và số", colorClass: "bg-secondary" },
    { percent: 25, label: "Mật khẩu yếu", colorClass: "bg-danger" },
    { percent: 50, label: "Mật khẩu trung bình", colorClass: "bg-warning" },
    { percent: 75, label: "Mật khẩu khá mạnh", colorClass: "bg-info" },
    { percent: 100, label: "Mật khẩu rất mạnh", colorClass: "bg-success" },
  ];

  return levels[Math.min(score, levels.length - 1)];
}

/* Cập nhật thanh tiến trình và nhãn độ mạnh mật khẩu theo nội dung người dùng nhập */
function updatePasswordStrengthDisplay() {
  const passwordInput = document.getElementById("registerPassword");
  const bar = document.getElementById("passwordStrengthBar");
  const label = document.getElementById("passwordStrengthLabel");
  if (!passwordInput || !bar || !label) return;

  const result = evaluatePasswordStrength(passwordInput.value);

  bar.style.width = result.percent + "%";
  bar.className = "progress-bar " + result.colorClass;
  label.textContent = result.label;
}

/* Kiểm tra ô "Xác nhận mật khẩu" có khớp với ô "Mật khẩu" hay không, 
dùng setCustomValidity để báo lỗi tùy chỉnh cho HTML5 validation */
function validateConfirmPasswordMatch() {
  const password = document.getElementById("registerPassword");
  const confirmPassword = document.getElementById("confirmPassword");
  if (!password || !confirmPassword) return;

  if (confirmPassword.value !== password.value) {
    confirmPassword.setCustomValidity("mismatch");
  } else {
    confirmPassword.setCustomValidity("");
  }
}

/* Xử lý khi người dùng submit form đăng nhập */
function handleLoginFormSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const alertBox = document.getElementById("loginAlert");

  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    alertBox.classList.add("d-none");
    return;
  }

  form.classList.add("was-validated");
  alertBox.textContent = "Đăng nhập thành công! (đây là form demo, chưa kết nối máy chủ)";
  alertBox.classList.remove("d-none");
}

/* Xử lý khi người dùng submit form đăng ký */
function handleRegisterFormSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const alertBox = document.getElementById("registerAlert");

  validateConfirmPasswordMatch();

  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    alertBox.classList.add("d-none");
    return;
  }

  form.classList.add("was-validated");
  alertBox.textContent = "Đăng ký thành công! (đây là form demo, chưa kết nối máy chủ)";
  alertBox.classList.remove("d-none");
}

/* Khởi tạo các sự kiện riêng cho trang đăng nhập (nếu trang hiện tại có form đăng nhập) */
function initLoginPage() {
  const loginForm = document.getElementById("loginForm");
  if (!loginForm) return;
  loginForm.addEventListener("submit", handleLoginFormSubmit);
}

/* Khởi tạo các sự kiện riêng cho trang đăng ký (nếu trang hiện tại có form đăng ký) */
function initRegisterPage() {
  const registerForm = document.getElementById("registerForm");
  if (!registerForm) return;

  registerForm.addEventListener("submit", handleRegisterFormSubmit);

  const passwordInput = document.getElementById("registerPassword");
  const confirmInput = document.getElementById("confirmPassword");
  passwordInput.addEventListener("input", updatePasswordStrengthDisplay);
  passwordInput.addEventListener("input", validateConfirmPasswordMatch);
  confirmInput.addEventListener("input", validateConfirmPasswordMatch);
}

/* Hàm khởi tạo chính - chạy khi DOM đã tải xong, dùng được cho cả 2 trang */
function initAuthPage() {
  attachPasswordToggleListeners();
  initLoginPage();
  initRegisterPage();
}

document.addEventListener("DOMContentLoaded", initAuthPage);
