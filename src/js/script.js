// Hàm để import phần header
fetch('header.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('header').innerHTML = data;
  });

// Hàm để import phần footer
fetch('footer.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('footer').innerHTML = data;
  });


// Slider
let currentSlide = 0;

function showSlide(index) {
  const slides = document.querySelector('.slides');
  const totalSlides = document.querySelectorAll('.slide').length;

  // Xử lý vòng lặp khi hết slide
  if (index >= totalSlides) currentSlide = 0;
  else if (index < 0) currentSlide = totalSlides - 1;
  else currentSlide = index;

  // Dịch chuyển các slide
  slides.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

// Tự động chuyển slide sau mỗi 5 giây
setInterval(() => {
  nextSlide();
}, 3000);
function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('active'); // Thêm hoặc gỡ class "active"
}

function sendFeedback() {
  const opinionElement = document.getElementById('opinion'); // Lấy phần tử textarea
  const opinion = opinionElement.value.trim(); // Lấy giá trị và loại bỏ khoảng trắng

  if (opinion === '') {
    alert('Bạn chưa nhập ý kiến!'); 
  } else {
    alert('Cảm ơn bạn đã gửi ý kiến!');
    opinionElement.value = '';
  }
}