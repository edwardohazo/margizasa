document.addEventListener("DOMContentLoaded", function () {

    let lastScrollTop = 0;
    let header = document.getElementById('header');
              
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");

    const myWorkButton = document.getElementById('my-work-toggle');
    const workDropDown = document.getElementById('work-drop-down');

    const mobileMyWorkButton = document.getElementById('mobile-my-work-toggle');
    const mobileWorkDropDown = document.getElementById('mobile-work-drop-down');

    myWorkButton.addEventListener('click', () => {
      workDropDown.classList.toggle('hidden');
    });

    mobileMyWorkButton.addEventListener('click', () => {
      mobileWorkDropDown.classList.toggle('hidden');
    });

    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener("click", () => {
        if (mobileMenu.classList.contains("max-h-0")) {
          // Open the menu
          mobileMenu.classList.remove("max-h-0");
        } else {
          // Close the menu
          mobileMenu.classList.add("max-h-0");
        }
      });
    } else {
      console.error("Menu toggle or mobile menu element not found.");
    }
  
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
  
  