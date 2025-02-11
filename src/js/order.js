const apiUrl = 'https://6742dc41b7464b1c2a62e211.mockapi.io/api/dish/Dish';

// Lấy thẻ div để hiển thị menu
const productList = document.getElementById('product-list'); // Đảm bảo bạn lấy đúng ID 'product-list'

// Giỏ hàng lưu trữ món ăn đã chọn
let cart = JSON.parse(localStorage.getItem('cart')) || []; // Khai báo biến cart và lấy từ localStorage

// Hàm để định dạng giá tiền
function formatPrice(price) {
    return price.toLocaleString(); // Sử dụng toLocaleString để thêm dấu phân cách hàng nghìn
}

// Hàm để lấy dữ liệu sản phẩm từ API
async function fetchProducts() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Hiển thị sản phẩm
        displayProducts(data);
    } catch (error) {
        console.error('Có lỗi khi lấy dữ liệu:', error);
    }
}

// Hàm để hiển thị các sản phẩm
function displayProducts(products) {
    productList.innerHTML = ''; // Xóa nội dung cũ trong danh sách sản phẩm

    products.forEach(product => {
        // Tạo phần tử cho mỗi sản phẩm
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');

        // Định dạng giá
        const formattedPrice = formatPrice(product.price);

        // Tạo nội dung cho sản phẩm
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3 id="name">${product.name}</h3>
                <p class="price">${formattedPrice} VND</p>
                <button class="add-to-cart btn btn-primary" onclick="addToCart(${product.id}, '${product.name}', ${product.price}, '${product.image}')">Đặt Món</button>
            </div>
        `;

        // Thêm sản phẩm vào danh sách
        productList.appendChild(productItem);
    });
}

// Hàm thêm món vào giỏ hàng
function addToCart(id, name, price, image) {
    const product = { id, name, price, image, quantity: 1 };
    const existingProduct = cart.find(item => item.id === id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push(product);
    }

    // Lưu giỏ hàng vào LocalStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} đã được thêm vào giỏ hàng! Vui lòng vào trang Giỏ Hàng để tiến hành thanh toán.`);
}


// Gọi hàm để lấy và hiển thị sản phẩm khi trang web tải
fetchProducts();
