document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img.screenshots");

  if (!("IntersectionObserver" in window)) {
    // Fallback: load everything immediately
    images.forEach(img => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
      }
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;

          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
          }

          observer.unobserve(img);
        }
      });
    },
    {
      root: null,
      rootMargin: "0px 0px 200px 0px",
      threshold: 0.01
    }
  );

  images.forEach(img => observer.observe(img));
});
