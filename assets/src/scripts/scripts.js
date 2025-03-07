document.addEventListener("DOMContentLoaded", function () {

    // Prevent image downloads right click
    document.addEventListener('contextmenu', function (e) {
        if (e.target.tagName === 'IMG') {
          e.preventDefault();
        }
    });      

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