document.addEventListener("DOMContentLoaded", function () {
  const currentPath = window.location.pathname;
  // if (currentPath.includes('/index') || currentPath.includes('/about')) {
  //   return;
  // }

  let page = 1;
  const imagesPerPage = 6; 
  let allImages = [];
  let isLoading = false;

  let carouselPopup, carouselImage, closeCarousel, prevButton, nextButton;
  let currentImageIndex = 0;

  function preloadImages(imageObjects) {
    imageObjects.forEach((image) => {
      const img = new Image();
      img.src = image.src;
      img.onerror = () => console.error("Failed to preload image:", image.src);
    });
  }

  async function fetchAllImages() {
    try {
      const response = await fetch("../assets/data/images.json");
      const data = await response.json();

      console.log("Images array: ",data);

      // Extract categories dynamically
      const categoryKeys = Object.keys(data[0]);
      console.log("Category Keys: ",data);


      // Determine category by matching pathname dynamically
      for (const category of categoryKeys) {
        console.log("Category: ", category);
        console.log("Current Path: ", currentPath);
        if (currentPath.includes(category)) {
          allImages = data[0][category]; 
          console.log("allImages in progress... ", allImages);
          break;
        }
      }

      console.log("Before suposed error: ", allImages);

      if (allImages.length === 0) {
        console.error("No matching category found for images.", location.pathname);
      }

      preloadImages(allImages);
    } catch (error) {
      console.error("Failed to fetch images:", error);
    }
  }

  async function loadGalleryImages() {
    if (isLoading) return;
    isLoading = true;

    const galleryGrid = document.getElementById("gallery-grid");
    const loader = document.getElementById("loader");

    if (!galleryGrid || !loader) {
      console.error("Gallery grid or loader not found.");
      return;
    }

    loader.classList.remove("hidden");

    const start = (page - 1) * imagesPerPage;
    const end = start + imagesPerPage;
    const imagesToLoad = allImages.slice(start, end);

    if (imagesToLoad.length === 0) {
      loader.classList.add("hidden");
      isLoading = false;
      return;
    }

    let imagesLoaded = 0;

    imagesToLoad.forEach((image, index) => {
      const imgContainer = document.createElement("div");
      imgContainer.classList.add("item");

      const imgElement = document.createElement("img");
      imgElement.src = image.src;
      imgElement.alt = "Gallery Image";
      imgElement.classList.add("cursor-pointer");
      imgElement.dataset.category = image.category;

      imgElement.addEventListener("error", () => {
        console.error("Failed to load image:", image.src);
      });

      imgElement.addEventListener("click", () => {
        currentImageIndex = start + index;
        openCarousel(currentImageIndex);
      })<

      imgElement.addEventListener("load", () => {
        imagesLoaded++;
        if (imagesLoaded === imagesToLoad.length) {
          loader.classList.add("hidden");
          isLoading = false;
        }
      });

      imgContainer.appendChild(imgElement);
      galleryGrid.appendChild(imgContainer);
    });

    page++;
  }

  function initializeCarousel() {
    carouselPopup = document.getElementById('carousel-popup');
    carouselImage = document.getElementById('carousel-image');
    closeCarousel = document.getElementById('close-carousel');
    prevButton = document.getElementById('prev-button');
    nextButton = document.getElementById('next-button');

    if (carouselPopup && carouselImage && closeCarousel && prevButton && nextButton) {
      closeCarousel.addEventListener("click", () => {
        carouselPopup.classList.add("hidden");
      });

      prevButton.addEventListener("click", () => {
        currentImageIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
        updateCarouselImage(currentImageIndex);
      });

      nextButton.addEventListener("click", () => {
        currentImageIndex = (currentImageIndex + 1) % allImages.length;
        updateCarouselImage(currentImageIndex);
      });

      console.log("Carousel initialized successfully.");
    } else {
      console.warn("Carousel elements not found in the DOM.");
    }
  }

  function openCarousel(index) {
    if (carouselPopup && carouselImage && allImages[index]) {
      carouselImage.src = allImages[index].src;
      carouselPopup.classList.remove("hidden");
      console.log("Carousel image category:", allImages[index].category);
    } else {
      console.error("Image not found at index:", index);
    }
  }

  function updateCarouselImage(index) {
    if (carouselImage && allImages[index]) {
      carouselImage.src = allImages[index].src;
      console.log("Current carousel image category:", allImages[index].category);
    } else {
      console.error("Image not found at index:", index);
    }
  }

  window.addEventListener("scroll", () => {
    const { scrollHeight, clientHeight } = document.documentElement;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (window.innerWidth < 600) {
      if (scrollTop + clientHeight >= scrollHeight - (scrollHeight * 0.8)) {
        loadGalleryImages();
      }
    } else {
      if (scrollTop + clientHeight >= scrollHeight - (scrollHeight * 0.6)) {
        loadGalleryImages();
      }
    }
  });

  fetchAllImages().then(() => {
    loadGalleryImages(); 
    setTimeout(() => {
      initializeCarousel();
    }, 1000);
  });
});
