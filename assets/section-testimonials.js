// Slider(all Slides in a container)
const slider = document.querySelector(".testimonials-container .slider")
// Photos
let photos = document.querySelectorAll(".testimonials-container .gallery .photos .photo")
// Box count
const boxsCnt = document.querySelector(".testimonials-container").dataset.reviewsCnt;
// console.log(" -------- boxsCnt => ", boxsCnt)
// Transform index value
let sliderIndex = 0
// interval (Duration)
let interval = 4000

// Update style properties
slider.style.width = 100 * boxsCnt + "%";

if (window.matchMedia('(max-width: 749px)').matches) {
    if(boxsCnt > 0) {
        photos.forEach((p) => {    
            let transformValue = "";
            if(boxsCnt > 1) transformValue = "translateX(calc(-" + "50%" + " - " + (4 * (boxsCnt-1)/2) + "rem" + "))";
            else  transformValue = "translateX(-50%)";
            p.style.transform = transformValue;
        });
    }
}

// Function to slide forward
const slide = (condition) => {
    // CLear interval
    clearInterval(start)
    // update sliderIndex
    condition === "increase" ? initiateINC() : initiateDEC()
    // move slide
    move(sliderIndex)
    // start interal for slides back 
    start = setInterval(() => slide("increase"), interval);
}

// function for increase(forward, next) configuration
const initiateINC = () => {
    // increase transform value
    sliderIndex === boxsCnt - 1 ? sliderIndex = 0 : sliderIndex += 1
}

// function for decrease(backward, previous) configuration
const initiateDEC = () => {
    // decrease transform value
    sliderIndex === 0 ? sliderIndex = boxsCnt - 1 : sliderIndex -= 1
}

// function to transform slide 
const move = (sliderIndex) => {
    let transformValue = (100 / boxsCnt) * sliderIndex
    // transform slider
    slider.style.transform = `translateX(-${transformValue}%)`

    // gallery photos effect
    photos.forEach((photo) => {
        photo.classList.remove("active")
    })
    photos[sliderIndex].classList.add("active");
}

// Start interval for slides
let start = setInterval(() => slide("increase"), interval)

// Next  and  Previous button function (SVG icon with different classes)
document.querySelectorAll("svg").forEach(cur => {
    // Assign function based on the class Name("next" and "prev")
    // cur.addEventListener("click", () => cur.parentNode.classList.contains("next-wrapper") ? slide("increase") : slide("decrease"))
    cur.addEventListener("click", () => {
        if(cur.parentNode.classList.contains("next-wrapper")) slide("increase")
        else if(cur.parentNode.classList.contains("prev-wrapper")) slide("decrease")
    })
})

// Mobile touch Slide Section
const touchSlide = (() => {
    let start, move, change, sliderWidth

    // Do this on initial touch on screen
    slider.addEventListener("touchstart", (e) => {
        // get the touche position of X on the screen
        start = e.touches[0].clientX
        // (each slide with) the width of the slider container divided by the number of slides
        sliderWidth = slider.clientWidth / boxsCnt
    })
    
    // Do this on touchDrag on screen
    slider.addEventListener("touchmove", (e) => {
        // prevent default function
        e.preventDefault()
        // get the touche position of X on the screen when dragging stops
        move = e.touches[0].clientX
        // Subtract initial position from end position and save to change variabla
        change = start - move
    })

    const mobile = (e) => {
        // if change is greater than a quarter of sliderWidth, next else Do NOTHING
        change > (sliderWidth/(boxsCnt-1))  ? slide("increase") : null;
        // if change * -1 is greater than a quarter of sliderWidth, prev else Do NOTHING
        (change * -1) > (sliderWidth/(boxsCnt-1)) ? slide("decrease") : null;
        // reset all variable to 0
        [start, move, change, sliderWidth] = [0,0,0,0]
    }
    // call mobile on touch end
    slider.addEventListener("touchend", mobile)
})()
