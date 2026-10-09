const track = document.querySelector(".slider-track");
const slides = document.querySelectorAll(".slide");
const next = document.querySelector(".next");
const previous = document.querySelector(".previous");
const dotsBox = document.querySelector(".dot-container");

const total = slides.length;
let index = 1;
let moving = false;


// Clone first and last slides
track.insertBefore(
    slides[total - 1].cloneNode(true),
    slides[0]
);

track.appendChild(
    slides[0].cloneNode(true)
);

const allSlides = document.querySelectorAll(".slide");


// Create navigation dots
slides.forEach((_, i) => {
    const dot = document.createElement("button");

    dot.className = "dot";
    dot.setAttribute("aria-label", `Go to slide ${i + 1}`);

    dot.onclick = () => {
        if (!moving) {
            index = i + 1;
            move();
        }
    };

    dotsBox.appendChild(dot);
});


// Move slider
function move(animate = true) {

    track.style.transition = animate
        ? "transform 0.6s ease-in-out"
        : "none";

    track.style.transform =
        `translateX(-${index * 100}%)`;

    let active = index - 1;

    if (index === 0) active = total - 1;
    if (index === total + 1) active = 0;

    document.querySelectorAll(".dot").forEach((dot, i) => {
        dot.classList.toggle("active", i === active);
    });

    moving = animate;
}


// Next slide
function nextSlide() {
    if (!moving) {
        index++;
        move();
    }
}


// Previous slide
function previousSlide() {
    if (!moving) {
        index--;
        move();
    }
}


// Seamless looping
track.addEventListener("transitionend", () => {

    if (index === total + 1) {
        index = 1;
        move(false);
    }

    if (index === 0) {
        index = total;
        move(false);
    }

    moving = false;
});


// Button controls
next.onclick = nextSlide;
previous.onclick = previousSlide;


// Keyboard controls
document.addEventListener("keydown", (e) => {

    if (e.key === "ArrowRight") {
        nextSlide();
    }

    if (e.key === "ArrowLeft") {
        previousSlide();
    }
});


// Start slider
move(false);