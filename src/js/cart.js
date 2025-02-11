const cartItemsContainer = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const checkoutButton = document.getElementById('checkout-btn');
const quantity = document.getElementById('quantity');
const footer = document.getElementById('footer');
let cart = JSON.parse(localStorage.getItem('cart')) || [];
function displayCart() {
    cartItemsContainer.innerHTML = ''; // Xóa nội dung cũ
    let totalPrice = 0;

    if (cart.length === 0) {
        // Nếu giỏ hàng trống, hiển thị thông báo
        cartItemsContainer.innerHTML = '<p>Không có sản phẩm trong giỏ hàng.</p>';
        totalPriceElement.innerHTML = ''; // Không hiển thị giá trị 0 VND
        footer.style.marginTop = '15%'; // Thêm khoảng cách cho footer
    } else {
        // Nếu giỏ hàng có sản phẩm
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <h3>${item.name}</h3>
                    <p class="price">${formatPrice(item.price)} VND</p>
                    <p>Số lượng: ${item.quantity}</p>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
            totalPrice += item.price * item.quantity;
            localStorage.setItem('totalPrice', totalPrice);
        });

        totalPriceElement.innerHTML = `${formatPrice(totalPrice)} VND`; 
        footer.style.marginTop = '0';
    }

    updateCheckoutButton(); // Cập nhật trạng thái nút thanh toán
}



// Định dạng giá
function formatPrice(price) {
    return price.toLocaleString();
}

// Hàm thanh toán
checkoutButton.addEventListener('click', function () {
    window.location.href = 'enter-information.html';
});

// Kiểm tra giỏ hàng mỗi khi có thay đổi
function updateCheckoutButton() {
    if (cart.length === 0) {
        // Nếu giỏ hàng trống, ẩn nút thanh toán
        checkoutButton.style.display = 'none';
    } else {
        // Nếu giỏ hàng có món, hiển thị nút thanh toán
        checkoutButton.style.display = 'inline-block';
    }
}

// Hàm thêm món vào giỏ hàng
function addToCart(id, name, price, image) {
    const product = { id, name, price, image, quantity: 1 };

    // Kiểm tra xem món ăn đã có trong giỏ chưa
    const existingProduct = cart.find(item => item.id === id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push(product);
    }

    // Lưu giỏ hàng vào LocalStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Cập nhật lại giỏ hàng và nút thanh toán
    displayCart();
}

// Gọi hàm để hiển thị giỏ hàng khi trang tải
displayCart();