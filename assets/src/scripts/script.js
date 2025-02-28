document.addEventListener("DOMContentLoaded", function () {

    const currentPath = window.location.pathname;
    if (!currentPath.includes('/index')) {
      return;
    }

    // Prevent image downloads right click
    document.addEventListener('contextmenu', function (e) {
        if (e.target.tagName === 'IMG') {
          e.preventDefault();
        }
    });      

    // Reviews functionality
    let index = 0;
    function showNextReview() {
        const reviews = document.querySelectorAll('.review');
        reviews.forEach(r => r.classList.add('hidden'));
        index = (index + 1) % reviews.length;
        reviews[index].classList.remove('hidden');
    }
    setInterval(showNextReview, 4000);

});