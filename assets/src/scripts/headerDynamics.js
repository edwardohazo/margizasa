document.addEventListener("DOMContentLoaded", function () {
  let lastScrollTop = 0;
  let header = document.getElementById('header');
            
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  // Find all dropdown buttons (desktop & mobile)
  const dropdownButtons = document.querySelectorAll('.dropdown-toggle');

  if (menuToggle && mobileMenu) {
      menuToggle.addEventListener("click", () => {
          mobileMenu.classList.toggle("max-h-0");
          mobileMenu.classList.toggle("max-h-screen");
      });
  } else {
      console.error("Menu toggle or mobile menu element not found.");
  }

  // Dropdown functionality for both desktop and mobile
  dropdownButtons.forEach(button => {
      button.addEventListener("click", function () {
          let dropdown = this.nextElementSibling;
          if (dropdown) {
              dropdown.classList.toggle("hidden");
          }
      });
  });

  // Header show and hide toggle effect
  window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
          // Scrolling down
          header.classList.remove("header-down");
          header.classList.add("header-up"); 
      } else {
          // Scrolling up
          header.classList.remove("header-up"); 
          header.classList.add("header-down"); 
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; 
  });
});


