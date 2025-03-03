document.addEventListener("DOMContentLoaded", function () {
  const currentPath = window.location.pathname;
  if (currentPath.includes('/about')) {
    return;
  }

  let lastScrollTop = 0;

  // Function to load reusable components
  function loadComponent(file, elementId) {
    fetch(file)
      .then((response) => response.text())
      .then((data) => {  
          document.getElementById(elementId).innerHTML = data;   
      })
      .catch((error) => {
        console.error(`Error loading ${file}:`, error);
      });
  }

  // Load carousel
  loadComponent("../assets/src/components/carousel.html", "carousel");

  // Header show and hide toggle effect
  window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; 
  
  });

});

