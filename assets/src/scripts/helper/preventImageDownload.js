document.addEventListener("DOMContentLoaded", function () {

    // Prevent image downloads right click
    document.addEventListener('contextmenu', function (e) {
        if (e.target.tagName === 'IMG') {
          e.preventDefault();
        }
      });      

});