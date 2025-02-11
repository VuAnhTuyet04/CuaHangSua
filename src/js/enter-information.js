// Hàm kiểm tra dữ liệu
function validateForm() {
    const name = document.getElementById('fullName').value.trim();
    const phone = document.getElementById('phoneNumber').value.trim();
    const address = document.getElementById('address').value;
    const time = document.getElementById('deliveryTime').value;
    let isValid = true;
    let message = "";

    // Kiểm tra họ tên (phải trên 8 ký tự)
    if(name == ''){
        isValid = false;
        message += "Vui lòng điền họ tên.\n";
    }
    else if (name.length <= 8) {
        isValid = false;
        message += "Họ và tên phải lớn hơn 8 ký tự.\n";
    }

    // Kiểm tra số điện thoại (chỉ được là số)
    if(phone == ''){
        isValid = false;
        message += "Vui lòng điền số điện thoại.\n";
    }
    else if (!/^\d+$/.test(phone)) {
        isValid = false;
        message += "Số điện thoại chỉ được chứa chữ số.\n";
    }

    // Kiểm tra địa chỉ (không được để trống)
    if (!address) {
        isValid = false;
        message += "Vui lòng chọn địa chỉ.\n";
    }

    // Kiểm tra giờ nhận cơm (không được để trống)
    if (!time) {
        isValid = false;
        message += "Vui lòng chọn giờ nhận cơm.\n";
    }

    // Hiển thị thông báo lỗi nếu có
    if (!isValid) {
        alert(message);
    }

    return isValid;
}

// Xử lý sự kiện "Xem trước"
document.getElementById('preview-btn').addEventListener('click', function () {
    if (validateForm()) {
        const name = document.getElementById('fullName').value;
        const phone = document.getElementById('phoneNumber').value;
        const address = document.getElementById('address').value;
        const time = document.getElementById('deliveryTime').value;

        const previewDiv = document.getElementById('preview');

        // Hiển thị thông tin xem trước
        previewDiv.innerHTML = `
        <h2>Thông tin xem trước</h2>
        <p><strong>Họ và tên:</strong> ${name}</p>
        <p><strong>Số điện thoại:</strong> ${phone}</p>
        <p><strong>Địa chỉ:</strong> ${address}</p>
        <p><strong>Giờ nhận cơm:</strong> ${time}</p>
      `;
        previewDiv.classList.add('alert', 'alert-info'); // Thêm style Bootstrap

        // Bật nút "Đặt món"
        document.getElementById('submit-btn').disabled = false;
    }
});

// Xử lý sự kiện "Đặt món"
document.getElementById('order-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Ngăn trình duyệt reload trang

    if (validateForm()) {
        const name = document.getElementById('fullName').value;
        const phone = document.getElementById('phoneNumber').value;
        const address = document.getElementById('address').value;
        const time = document.getElementById('deliveryTime').value;

        // alert(`Cảm ơn ${name}! Đơn hàng của bạn đã được đặt thành công.\nĐịa chỉ: ${address}\nThời gian nhận cơm: ${time}`);

        // Xóa giỏ hàng (nếu cần)
        localStorage.removeItem('cart');

        // Chuyển về trang giỏ hàng
        window.location.href = 'cart.html';
    }
});
