const newsSlider = document.querySelector('.news-slider');
const newsItems = document.querySelectorAll('.news');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentIndex = 1; // Bắt đầu từ phần tử đầu tiên (tin tức thứ 2)
const itemsPerView = 2;
let autoSlideInterval;

// Clone các phần tử đầu và cuối
const firstClone = newsItems[0].cloneNode(true);
const lastClone = newsItems[newsItems.length - 1].cloneNode(true);

newsSlider.appendChild(firstClone);
newsSlider.insertBefore(lastClone, newsItems[0]);

prevBtn.addEventListener('click', () => {
    clearInterval(autoSlideInterval); // Dừng tự động trượt khi người dùng tương tác
    if (currentIndex <= 0) {
        currentIndex = newsItems.length - itemsPerView; // Đến phần tử cuối cùng
        newsSlider.style.transition = 'none'; // Xóa hiệu ứng để nhảy tức thời
        updateSliderPosition();
        setTimeout(() => {
            currentIndex--;
            newsSlider.style.transition = 'transform 0.5s ease-in-out'; // Khôi phục hiệu ứng
            updateSliderPosition();
        }, 20);
    } else {
        currentIndex--;
        updateSliderPosition();
    }
});

nextBtn.addEventListener('click', () => {
    clearInterval(autoSlideInterval); // Dừng tự động trượt khi người dùng tương tác
    if (currentIndex >= newsItems.length) {
        currentIndex = 1; // Quay lại phần tử đầu tiên
        newsSlider.style.transition = 'none'; // Xóa hiệu ứng để nhảy tức thời
        updateSliderPosition();
        setTimeout(() => {
            currentIndex++;
            newsSlider.style.transition = 'transform 0.5s ease-in-out'; // Khôi phục hiệu ứng
            updateSliderPosition();
        }, 20);
    } else {
        currentIndex++;
        updateSliderPosition();
    }
});

function updateSliderPosition() {
    const offset = -currentIndex * 50; // Mỗi tin tức chiếm 50% chiều rộng
    newsSlider.style.transform = `translateX(${offset}%)`;
}

function autoSlide() {
    autoSlideInterval = setInterval(() => {
        currentIndex++;
        if (currentIndex >= newsItems.length) {
            currentIndex = 1; // Quay lại phần tử đầu tiên
            newsSlider.style.transition = 'none'; // Xóa hiệu ứng để nhảy tức thời
            updateSliderPosition();
            setTimeout(() => {
                currentIndex++;
                newsSlider.style.transition = 'transform 0.5s ease-in-out'; // Khôi phục hiệu ứng
                updateSliderPosition();
            }, 20);
        } else {
            updateSliderPosition();
        }
    }, 3000); // Thời gian chuyển đổi 3 giây (3000ms)
}

// Khởi tạo vị trí để hiển thị tin tức thứ 2
newsSlider.style.transform = `translateX(${-50}%)`;

// Gọi hàm autoSlide khi trang web được tải
autoSlide();

// Dừng tự động trượt khi người dùng tương tác
newsSlider.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
});

newsSlider.addEventListener('mouseleave', () => {
    autoSlide();
});
