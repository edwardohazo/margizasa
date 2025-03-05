document.addEventListener("DOMContentLoaded", function () {
  const currentPath = window.location.pathname;
  // if (!currentPath.includes("/")) {
  //   return;
  // }

  // Infinite Scroll for Gallery
  let categoCounter = 1;
  let category = "maternity";
  let page = 1;
  let imagesPerPage; // Number of images to load per scroll
  let allImages = []; // Array to store all image objects
  let allImagesBirthdays = [];
  let allImagesMaternity = [];
  let allImagesNewBorn = [];
  let allImagesCakeSmash = [];
  let allImagesMomyAndMe = [];
  let allImagesFamily = [];
  let allImagesSixMonths = [];
  let isLoading = false; // Flag to prevent multiple loads

  const loader = document.getElementById("loader");

  // Grid
  let galleryGrid; 
  let galleryCategoryTitle; 

  // Carousel Variables
  let carouselPopup, carouselImage, closeCarousel, prevButton, nextButton;
  let currentImageIndex = 0;

  // Preload Images
  function preloadImages(imageObjects) {
    imageObjects.forEach((image) => {
      const img = new Image();
      img.src = image.src; // Use image.src instead of image
      img.onload = () => console.log("Preloaded image:", image.src);
      img.onerror = () => console.error("Failed to preload image:", image.src);
    });
  }

  // Get all image paths from images.json
  async function fetchAllImages(category) {

    console.log("New category", category);

    try {
      const response = await fetch("../assets/data/images.json");
      const data = await response.json();

      switch (category) {
        case "maternity":
          allImages = data[0].maternity; // Array of objects with src and category
          allImagesMaternity = data[0].maternity;
          // galleryCategoryTitle = document.getElementById("gallery-a-maternity");
          galleryGrid = document.getElementById("gallery-grid-maternity");
          break;
        // case "birthdays":
        //   allImages = data[0].birthdays; // Array of objects with src and category
        //   allImagesBirthdays = data[0].birthdays;
        //   galleryCategoryTitle = document.getElementById("gallery-a-birthdays");
        //   galleryGrid = document.getElementById("gallery-grid-birthdays");
        //   break;
        // case "family":
        //   allImages = data[0].family; // Array of objects with src and category
        //   allImagesFamily = data[0].family;
        //   galleryCategoryTitle = document.getElementById("gallery-a-family");
        //   galleryGrid = document.getElementById("gallery-grid-family");
        //   break;
        // case 'sixMonths':
        //   allImages = data[0].sixMonths; // Array of objects with src and category
        //   allImagesSixMonths = data[0].sixMonths;
        //   galleryCategoryTitle = document.getElementById("gallery-a-sixMonths");
        //   galleryGrid = document.getElementById("gallery-grid-sixMonths");
        //   break;
        // case 'newBorn':
        //   allImages = data[0].newBorn; // Array of objects with src and category
        //   allImagesNewBorn = data[0].newBorn;
        //   galleryCategoryTitle = document.getElementById("gallery-a-newBorn");
        //   galleryGrid = document.getElementById("gallery-grid-newBorn");
        //   break;
        // case 'momyAndMe':
        //   allImages = data[0].momyAndMe; // Array of objects with src and category
        //   allImagesMomyAndMe = data[0].momyAndMe;
        //   galleryCategoryTitle = document.getElementById("gallery-a-momyAndMe");
        //   galleryGrid = document.getElementById("gallery-grid-momyAndMe");
        //   break;
        // case 'cakeSmash':
        //   allImages = data[0].cakeSmash; // Array of objects with src and category
        //   allImagesCakeSmash = data[0].cakeSmash;
        //   galleryCategoryTitle = document.getElementById("gallery-a-cakeSmash");
        //   galleryGrid = document.getElementById("gallery-grid-cakeSmash");
        //   break;
      }

      // Preload all images after fetching
      // preloadImages(allImages);
    } catch (error) {
      console.error("Failed to fetch images:", error);
    }
  }

  // this is ran every tine we have a scroll
  // Load images for the current page
  async function loadGalleryImages() {

    let start;
    let end;

    if (isLoading) return; // Prevent multiple loads
    isLoading = true;

    if (!galleryGrid || !loader) {
      console.log(galleryGrid, loader);
      console.error("Gallery grid or loader not found.");
      return;
    }

    // Show loader
    loader.classList.remove("hidden");

    // Calculate the range of images to load
    if (allImages.length % 2 === 0 && allImages.length > 4) {
      imagesPerPage = 6;
      start = (page - 1) * imagesPerPage;
      end = start + imagesPerPage;
    } else if (allImages.length % 2 !== 0 && allImages.length > 3) {
      imagesPerPage = 3;
      start = (page - 1) * imagesPerPage;
      end = start + imagesPerPage;
    }

    let imagesToLoad = allImages.slice(start, end);

    // Reset variables
    if (imagesToLoad.length === 0) {

      page = 1;
      allImages = [];
      loader.classList.add("hidden");
      isLoading = false;

      // // when we are out of images in the current category change to the next category
      // switch (categoCounter) {
      //   // first category is harcored as maternity index 0 
      //   case 1:
      //     category = "birthdays";
      //     break;
      //   case 2:
      //     category = "family";
      //     break;
      //   case 3:
      //     category = "sixMonths";
      //     break;
      //   case 4:
      //     category = "newBorn";
      //     break;
      //   case 5:
      //     category = "momyAndMe";
      //     break;
      //   case 6:
      //     category = "cakeSmash";
      //     break;
      //   default:
      //     throw new Error("No existing category left");
      // }

      console.log("updated catego:", category);
      // categoCounter++;


      // // Initialize the next category
      // fetchAllImages(category).then(() => {
      //   // Load the first set of images
      //   loadGalleryImages();
      //   // Making sure carousel is loaded
      //   setTimeout(() => {
      //     initializeCarousel();
      //   }, 1000);
      // });
      

      return;
    }

    // Track the number of images loaded
    let imagesLoaded = 0;

    // Load images
    imagesToLoad.forEach((image, index) => {
      const imgContainer = document.createElement("div");
      imgContainer.classList.add("item");

      const imgElement = document.createElement("img");
      imgElement.src = image.src; // Use image.src instead of image
      imgElement.alt = "Gallery Image";
      imgElement.classList.add("cursor-pointer"); // Add cursor pointer for clickability

      // Add category information as a data attribute
      imgElement.dataset.category = image.category;

      // Add error handling for image loading
      imgElement.addEventListener("error", () => {
        console.error("Failed to load image:", image.src);
      });

      // Add click event to open carousel
      imgElement.addEventListener("click", () => {
        // Calculate the global index of the clicked image
        currentImageIndex = start + index;

        // Log the category of the clicked image
        const clickedCategory = imgElement.dataset.category;

        openCarousel(currentImageIndex, clickedCategory);
      });

      const shareIcon = document.createElement("i");
      shareIcon.classList.add("fa-solid", "fa-share", "text-white", "mr-3");

      // Wait for the image to load
      imgElement.addEventListener("load", () => {
        imagesLoaded++;

        // If all images in the current batch are loaded, hide the loader
        if (imagesLoaded === imagesToLoad.length) {
          loader.classList.add("hidden");
          isLoading = false;
        }
      });

      imgContainer.appendChild(imgElement);
      galleryGrid.appendChild(imgContainer);
    });

    console.log("loaded images", imagesToLoad);

    page++;
  }

  // Initialize Carousel Functionality
  function initializeCarousel() {
    // Check if carousel elements exist in the DOM
    carouselPopup = document.getElementById("carousel-popup");
    carouselImage = document.getElementById("carousel-image");
    closeCarousel = document.getElementById("close-carousel");
    prevButton = document.getElementById("prev-button");
    nextButton = document.getElementById("next-button");

    // If carousel elements exist, set up event listeners
    if (
      carouselPopup &&
      carouselImage &&
      closeCarousel &&
      prevButton &&
      nextButton
    ) {
      // Close Carousel
      closeCarousel.addEventListener("click", () => {
        allImages = [];
        carouselPopup.classList.add("hidden");
      });

      // Previous Image
      prevButton.addEventListener("click", () => {
        currentImageIndex =
          (currentImageIndex - 1 + allImages.length) % allImages.length;
        updateCarouselImage(currentImageIndex);
      });

      // Next Image
      nextButton.addEventListener("click", () => {
        currentImageIndex = (currentImageIndex + 1) % allImages.length;
        updateCarouselImage(currentImageIndex);
      });

      console.log("Carousel initialized successfully.");
    } else {
      console.warn("Carousel elements not found in the DOM.");
    }
  }

  // Open Carousel
  function openCarousel(index, clickedCategory) {
    switch (clickedCategory) {
      case "maternity":
        allImages = allImagesMaternity;
        break;
      case "birthdays":
        allImages = allImagesBirthdays;
        break;
      case "momyAndMe":
        allImages = allImagesMomyAndMe;
        break;
      case "sixMonths":
        allImages = allImagesSixMonths;
        break;
      case "family":
        allImages = allImagesFamily;
        break;
      case "cakeSmash":
        allImages = allImagesCakeSmash;
        break;
      case "newBorn":
        allImages = allImagesNewBorn;
        break;
    }

    if (carouselPopup && carouselImage && allImages[index]) {
      carouselImage.src = allImages[index].src; // Use image.src instead of image
      carouselPopup.classList.remove("hidden");
    } else {
      console.error("Image not found at index:", index);
    }
  }

  // Update Carousel Image
  function updateCarouselImage(index) {
    if (carouselImage && allImages[index]) {
      carouselImage.src = allImages[index].src; // Use image.src instead of image
    } else {
      console.error("Image not found at index:", index);
    }
  }

  // Infinite Scroll Event Listener
  window.addEventListener("scroll", () => {
    const { scrollHeight, clientHeight } = document.documentElement;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (window.innerWidth < 600) {
      if (scrollTop + clientHeight >= scrollHeight - scrollHeight * 0.9) {
        loadGalleryImages();
      }
    } else {
      if (scrollTop + clientHeight >= scrollHeight - scrollHeight * 0.8) {
        loadGalleryImages();
      }
    }
  });

  // Initialize
  fetchAllImages(category).then(() => {
    // Load the first set of images
    loadGalleryImages();
    // Making sure carousel is loaded
    setTimeout(() => {
      initializeCarousel();
    }, 1000);
  });
});


