// Before and After Carousel
var carousel = (function () {
  "use strict";

  const carouselObj = {
    track: null,
    slides: null,
    currentIndex: 0,
    autoPlayInterval: null,
    autoPlayDelay: 5000, // 5 seconds

    init: function () {
      const outer = document.querySelector(".carousel-outer");
      if (!outer) return;

      this.track = outer.querySelector(".carousel-track");
      this.slides = outer.querySelectorAll(".carousel-slide");

      if (this.slides.length === 0) return;

      const leftBtn = outer.querySelector(".carousel-btn-left");
      const rightBtn = outer.querySelector(".carousel-btn-right");

      if (leftBtn) {
        leftBtn.addEventListener("click", () => {
          this.pauseAutoPlay();
          this.prevSlide();
          this.startAutoPlay();
        });
      }

      if (rightBtn) {
        rightBtn.addEventListener("click", () => {
          this.pauseAutoPlay();
          this.nextSlide();
          this.startAutoPlay();
        });
      }

      // Pause on hover
      outer.addEventListener("mouseenter", () => this.pauseAutoPlay());
      outer.addEventListener("mouseleave", () => this.startAutoPlay());

      this.updateSlidePosition();
      this.startAutoPlay();
    },

    updateSlidePosition: function () {
      if (!this.track || !this.slides) return;
      this.track.style.transform = `translateX(-${this.currentIndex * 100}%)`;
    },

    nextSlide: function () {
      if (!this.slides) return;
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
      this.updateSlidePosition();
    },

    prevSlide: function () {
      if (!this.slides) return;
      this.currentIndex =
        (this.currentIndex - 1 + this.slides.length) % this.slides.length;
      this.updateSlidePosition();
    },

    startAutoPlay: function () {
      this.pauseAutoPlay();
      const self = this;
      this.autoPlayInterval = setInterval(function () {
        if (self.slides && self.slides.length > 0) {
          self.nextSlide();
        }
      }, self.autoPlayDelay);
    },

    pauseAutoPlay: function () {
      if (this.autoPlayInterval) {
        clearInterval(this.autoPlayInterval);
        this.autoPlayInterval = null;
      }
    },
  };

  // Auto-init only if slides already exist (fallback for static HTML)
  const initCarousel = function() {
    const outer = document.querySelector(".carousel-outer");
    if (!outer) return;
    const slides = outer.querySelectorAll(".carousel-slide");
    if (slides.length > 0) {
      carouselObj.init();
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCarousel);
  } else {
    initCarousel();
  }

  return carouselObj;
})();
