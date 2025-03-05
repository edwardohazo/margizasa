document.addEventListener("DOMContentLoaded", function () {

    const currentPath = window.location.pathname;

    // Prevent image downloads right click
    document.addEventListener('contextmenu', function (e) {
        if (e.target.tagName === 'IMG') {
          e.preventDefault();
        }
    });      
    console.log("INDEX:", 11111);
    // Reviews functionality
    let index = 0;
    function showNextReview() {
      console.log("INDEX:",index);
        const reviews = document.querySelectorAll('.review');
        reviews.forEach(r => r.classList.add('hidden'));
        index = (index + 1) % reviews.length;
        reviews[index].classList.remove('hidden');
    }
    setInterval(showNextReview, 4000);

});