
/// --- START Scroll Animation --- ///

gsap.registerPlugin(ScrollTrigger);

const images = gsap.utils.toArray('.scroll-images img');
const divs = gsap.utils.toArray('.scroll-caption-item');
let imagesLoaded = 0;


function initializeAnimations() {
  gsap.set(images, { opacity: 0 });
  gsap.set(divs, { opacity: 0 });

  images.forEach((img, index) => {
    ScrollTrigger.create({
      trigger: img,
      start: "top center",
      end: "bottom center",
      onEnter: () => {
        gsap.to(img, { opacity: 1, duration: 0.3 });
        gsap.to(divs[index], { opacity: 1, duration: 0.3 });
      },
      onLeave: () => {
        gsap.to(img, { opacity: 0, duration: 0.3 });
        gsap.to(divs[index], { opacity: 0, duration: 0.3 });
      },
      onEnterBack: () => {
        gsap.to(img, { opacity: 1, duration: 0.3 });
        gsap.to(divs[index], { opacity: 1, duration: 0.3 });
      },
      onLeaveBack: () => {
        gsap.to(img, { opacity: 0, duration: 0.3 });
        gsap.to(divs[index], { opacity: 0, duration: 0.3 });
      },
      scrub: true,
      markers: false 
    });
  });
}


function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === images.length) {
    initializeAnimations();
  }
}

images.forEach(img => {
  if (img.complete) {
    imageLoaded();
  } else {
    img.addEventListener('load', imageLoaded);
  }
});

/// --- END Scroll Animation --- ///

/// --- START Service Cards Animation --- ///
var scrollContainers = document.getElementsByClassName('horizontal-scroll-container');

Array.from(scrollContainers).forEach(function(container) {
    container.addEventListener('wheel', function(event) {
        var containerRect = this.getBoundingClientRect();
        var isVerticallyCentered = (containerRect.top < window.innerHeight / 2) && (containerRect.bottom > window.innerHeight / 2);

        if (isVerticallyCentered) {
            event.preventDefault();

            var newScrollPosition = this.scrollLeft + event.deltaY;

            this.scrollLeft = newScrollPosition;

            var atStart = (newScrollPosition <= 0);
            var atEnd = (this.scrollWidth - this.clientWidth <= newScrollPosition);

            if (atStart || atEnd) {
                window.scrollBy(0, event.deltaY);
            }
        }
    });
});

window.addEventListener('wheel', function(event) {
    var container = document.querySelector('.horizontal-scroll-container');
    var containerRect = container.getBoundingClientRect();

    var isVerticallyCentered = (containerRect.top < window.innerHeight / 2) && (containerRect.bottom > window.innerHeight / 2);

    if (isVerticallyCentered) {
        container.scrollLeft += event.deltaY;
        event.preventDefault();
    }
});

// Function to calculate the desired scroll position
function calculateScrollPosition(card) {
    var containerRect = card.parentElement.getBoundingClientRect();
    var cardRect = card.getBoundingClientRect();
    var cardStyle = getComputedStyle(card);
    var cardLeftOffset = parseInt(cardStyle.left, 10);

    // Calculate the scroll position
    return cardRect.left - containerRect.left + cardLeftOffset;
}

// Add click event listener to each 'service-card-header'
var headers = document.getElementsByClassName('service-card-header');
Array.from(headers).forEach(function(header) {
    header.addEventListener('click', function() {
        // Get the parent card of the clicked header
        var card = this.closest('.service-card');

        // Calculate the scroll position where the card should be fully visible
        var scrollPosition = calculateScrollPosition(card);

        // Scroll the container to the calculated position smoothly
        card.parentElement.parentElement.scroll({
            left: scrollPosition,
            behavior: 'smooth'
        });
    });
});

/// --- END Service Cards Animation --- ///