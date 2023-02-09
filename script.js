// Start Active Image
let activeImage = document.querySelectorAll(".active-image img:first-child");
let images = document.querySelectorAll(".all-images .img");
let imagesGallery = document.querySelector(".images-gallery");
let closeImageButton = document.querySelector(".close-image");
let turn = 0;
let currentIndex = 0; // for slider
let currentImage = ""; // for slider
//For width more than 768px
let mediaQuery = window.matchMedia("(min-width: 768px)");
if (mediaQuery.matches) {
  activeImage[turn].onclick = () => {
    imagesGallery.style.display = "flex";
    document.body.classList.add("body-bg");
    turn = 1;

    check();
    nextButton[turn].addEventListener("click", () => {
      next(turn);
    });
    previousButton[turn].addEventListener("click", () => {
      previous(turn);
    });
  };
}
console.log(closeImageButton.src)
//Active
images.forEach((img) => {
  img.onclick = (e) => {
    currentIndex =
      +img.firstChild.src.split("-thumbnail")[0][
        img.firstChild.src.split("-thumbnail")[0].length - 1
      ] - 1;
    check();
    activeImage[turn].src = img.firstChild.src.split("-thumbnail").join("");
    images.forEach((img) => img.classList.remove("active"));
    img.classList.add("active");
  };
});

//CLose Button
closeImageButton.onclick = () => {
  images.forEach((img) => {
    if (img.firstChild.src == activeImage[turn].src) {
      img.classList.add("active");
    }
  });
  turn = 0;
  imagesGallery.style.display = "none";
  document.body.classList.remove("body-bg");
};
// End Active Image
// Start Slider
let nextButton = document.querySelectorAll(".next");
let previousButton = document.querySelectorAll(".previous");
let galleryImages = [...images].splice(4);

nextButton[turn].addEventListener("click", () => {
  next(turn);
});
previousButton[turn].addEventListener("click", () => {
  previous(turn);
});
if (!mediaQuery.matches) {
  check();
}
function next(turn) {
  currentImage = activeImage[0].src.split(
    activeImage[0].src.match(/-\d/gi).join("")
  );
  currentIndex++;
  check();
  currentImage = currentImage[0] + `-${currentIndex + 1}` + currentImage[1];
  activeImage[turn].src = currentImage;
  galleryImages.forEach((img) => img.classList.remove("active"));
  galleryImages[currentIndex].classList.add("active");
}

function previous(turn) {
  currentImage = activeImage[0].src.split(
    activeImage[0].src.match(/-\d/gi).join("")
  );
  currentIndex--;
  check();
  currentImage = currentImage[0] + `-${currentIndex + 1}` + currentImage[1];
  activeImage[turn].src = currentImage;
  galleryImages.forEach((img) => img.classList.remove("active"));
  galleryImages[currentIndex].classList.add("active");
}

function check() {
  if (currentIndex == 0) {
    previousButton[turn].style.display = "none";
  } else {
    previousButton[turn].style.display = "block";
  }
  if (currentIndex == 3) {
    nextButton[turn].style.display = "none";
  } else {
    nextButton[turn].style.display = "block";
  }
}
// End Slider
// Start Items
let increment = document.querySelector(".order .count span:last-child");
let decrement = document.querySelector(".order .count span:first-child");
let counter = document.querySelector(".number-of-items");

increment.onclick = () => {
  counter.innerHTML++;
};
decrement.onclick = () => {
  if (counter.innerHTML > 0) counter.innerHTML--;
};
// End Items
// Start Menu
let menu = document.querySelector(".menu");
let links = document.querySelector(".links");
let closeMenu = document.querySelector(".close-menu");

menu.onclick = () => {
  links.classList.add("show-hide");
  document.body.classList.add("body-bg");
};
closeMenu.onclick = () => {
  links.classList.remove("show-hide");
  document.body.classList.remove("body-bg");
};
// End Menu
// Start Cart
let price = 125;
let cartButton = document.querySelector(".cart-button");
let cartList = document.querySelector(".cart-list");
let orderButton = document.querySelector(".order-button");
let number = document.querySelector(".number");
let finalPrice = document.querySelector("#price");
let item = document.querySelector(".item");
let noItemMessage = document.querySelector(".no-items");
let deleteButton = document.querySelector(".delete-button");
let notification = document.querySelector(".notification");

let obj;
if (window.localStorage.item) {
  obj = JSON.parse(window.localStorage.item);
  number.innerHTML = obj.itemsCount;
  finalPrice.innerHTML = obj.finalPrice + ".00";
  notification.innerHTML = obj.itemsCount;
  counter.innerHTML = obj.itemsCount;
  showItem();
} else {
  removeItem();
  obj = {};
}

cartButton.onclick = () => {
  cartList.classList.toggle("show-list");
};

orderButton.addEventListener("click", createItem);

function createItem() {
  if (+counter.innerHTML > 0) {
    obj = {
      itemsCount: counter.innerHTML,
      finalPrice: counter.innerHTML * price,
    };
    number.innerHTML = obj.itemsCount;
    finalPrice.innerHTML = obj.finalPrice + ".00";
    notification.innerHTML = obj.itemsCount;
    showItem();

    window.localStorage.item = JSON.stringify(obj);
  }
}

function showItem() {
  noItemMessage.style.display = "none";
  item.style.display = "flex";
  notification.style.display = "flex";
}
function removeItem() {
  noItemMessage.style.display = "flex";
  item.style.display = "none";
  notification.style.display = "none";
  counter.innerHTML = 0;
}

deleteButton.addEventListener("click", () => {
  removeItem();
  window.localStorage.clear();
});
// End Cart