const slider = document.querySelector('.slider');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const images = slider.querySelectorAll('img');

let currentIndex = 0;

function showImage(index) {
    images.forEach((image, i) => {
        if (i === index) {
        image.style.display = 'block';
        } else {
        image.style.display = 'none';
        }
    });
}

function updateButtons() {
    if (currentIndex === 0) {
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'block';
    }

    if (currentIndex === images.length - 1) {
        nextBtn.style.display = 'none';
    } else {
        nextBtn.style.display = 'block';
    }
}

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        showImage(currentIndex);
        updateButtons();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentIndex < images.length - 1) {
        currentIndex++;
        showImage(currentIndex);
        updateButtons();
    }
});

showImage(currentIndex);
updateButtons();
