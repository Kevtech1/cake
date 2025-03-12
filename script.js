const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.carousel-slide img');

// Buttons
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');

// Counter
let counter = 1;
const size = carouselImages[0].clientWidth;
carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';

// Function to move to the next slide
function moveNext() {
    if (counter >= carouselImages.length - 1) return;
    carouselSlide.style.transition = "transform 0.4s ease-in-out";
    counter++;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
}

// Function to move to the previous slide
function movePrev() {
    if (counter <= 0) return;
    carouselSlide.style.transition = "transform 0.4s ease-in-out";
    counter--;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
}

// Event listeners for buttons
nextBtn.addEventListener('click', () => {
    clearInterval(autoSlide); // Stop auto-slide on manual interaction
    moveNext();
    restartAutoSlide();
});

prevBtn.addEventListener('click', () => {
    clearInterval(autoSlide);
    movePrev();
    restartAutoSlide();
});

// Handle infinite looping of slides
carouselSlide.addEventListener('transitionend', () => {
    if (carouselImages[counter].id === 'lastClone') {
        carouselSlide.style.transition = "none";
        counter = carouselImages.length - 2;
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }
    if (carouselImages[counter].id === 'firstClone') {
        carouselSlide.style.transition = "none";
        counter = carouselImages.length - counter;
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }
});

// Auto-slide feature
let autoSlide = setInterval(() => {
    moveNext();
}, 3000); // Slides every 3 seconds

// Restart auto-slide after user interaction
function restartAutoSlide() {
    autoSlide = setInterval(() => {
        moveNext();
    }, 3000);
}

