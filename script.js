const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

const heroSlides = [...document.querySelectorAll(".hero-product-image")];
const heroDots = [...document.querySelectorAll(".hero-dot")];
const lightbox = document.querySelector(".image-lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxClose = document.querySelector(".lightbox-close");
const lightboxBackdrop = document.querySelector(".lightbox-backdrop");
let heroSlideIndex = 0;

if (heroSlides.length > 1 && heroDots.length === heroSlides.length) {
  window.setInterval(() => {
    heroSlides[heroSlideIndex].classList.remove("is-active");
    heroDots[heroSlideIndex].classList.remove("is-active");
    heroSlideIndex = (heroSlideIndex + 1) % heroSlides.length;
    heroSlides[heroSlideIndex].classList.add("is-active");
    heroDots[heroSlideIndex].classList.add("is-active");
  }, 2600);
}

function closeLightbox() {
  if (!lightbox || !lightboxImage) {
    return;
  }

  lightbox.hidden = true;
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  lightboxImage.alt = "";
}

if (lightbox && lightboxImage) {
  heroSlides.forEach((slide) => {
    slide.addEventListener("click", () => {
      lightboxImage.src = slide.currentSrc || slide.src;
      lightboxImage.alt = slide.alt;
      lightbox.hidden = false;
      lightbox.setAttribute("aria-hidden", "false");
    });
  });

  lightboxClose?.addEventListener("click", closeLightbox);
  lightboxBackdrop?.addEventListener("click", closeLightbox);

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !lightbox.hidden) {
      closeLightbox();
    }
  });
}
