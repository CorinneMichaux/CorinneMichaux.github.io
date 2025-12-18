  const toTopBtn = document.getElementById("toTop");

  function toggleToTopButton() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    toTopBtn.classList.toggle("show", scrollPercent >= 10);
  }

  window.addEventListener("scroll", toggleToTopButton, { passive: true });
  window.addEventListener("load", toggleToTopButton);

  // ⬆ custom smooth scroll (~20% slower)
  toTopBtn.addEventListener("click", () => {
    const start = window.scrollY;
    const duration = 1000; // default smooth ≈ 600ms → +20% slower
    let startTime = null;

    function scrollStep(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percent = Math.min(progress / duration, 1);

      // easeInOut
      const ease =
        percent < 0.5
          ? 2 * percent * percent
          : 1 - Math.pow(-2 * percent + 2, 2) / 2;

      window.scrollTo(0, start * (1 - ease));

      if (progress < duration) {
        requestAnimationFrame(scrollStep);
      }
    }

    requestAnimationFrame(scrollStep);
  });
