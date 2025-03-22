<!-- Image opacity can be adjusted in const opacity = index === activeIndex ? 1 : 1; -->
const testimonials = [
  {
    quote:
      "I was impressed by the food — every dish is bursting with flavor! And I could really tell that they use high-quality ingredients. The staff was friendly and attentive, going the extra mile. I'll definitely be back for more!",
    name: "Tamar Mendelson",
    designation: "Restaurant Critic",
    src:
      "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    quote:
      "This place exceeded all expectations! The atmosphere is inviting, and the staff truly goes above and beyond to ensure a fantastic visit. I'll definitely keep returning for more exceptional dining experience.",
    name: "Joe Charlescraft",
    designation: "Frequent Visitor",
    src:
      "https://images.unsplash.com/photo-1628749528992-f5702133b686?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D"
  },
  {
    quote:
      "Shining Yam is a hidden gem! From the moment I walked in, I knew I was in for a treat. The impeccable service and overall attention to detail created a memorable experience. I highly recommend it!",
    name: "Martina Edelweist",
    designation: "Satisfied Customer",
    src:
      "https://images.unsplash.com/photo-1524267213992-b76e8577d046?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D"
  }
];

let activeIndex = 0;
const imageContainer = document.getElementById("image-container");
const nameElement = document.getElementById("name");
const designationElement = document.getElementById("designation");
const quoteElement = document.getElementById("quote");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");

function calculateGap(width) {
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 60;
  const maxGap = 86;

  if (width <= minWidth) return minGap;
  if (width >= maxWidth)
    return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));

  return (
    minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth))
  );
}

function updateTestimonial(direction) {
  const oldIndex = activeIndex;
  activeIndex =
    (activeIndex + direction + testimonials.length) % testimonials.length;

  const containerWidth = imageContainer.offsetWidth;
  const gap = calculateGap(containerWidth);
  const maxStickUp = gap * 0.8; // 80% of the calculated gap

  testimonials.forEach((testimonial, index) => {
    let img = imageContainer.querySelector(`[data-index="${index}"]`);
    if (!img) {
      img = document.createElement("img");
      img.src = testimonial.src;
      img.alt = testimonial.name;
      img.classList.add("testimonial-image");
      img.dataset.index = index;
      imageContainer.appendChild(img);
    }

    const offset =
      (index - activeIndex + testimonials.length) % testimonials.length;
    const zIndex = testimonials.length - Math.abs(offset);
    const opacity = index === activeIndex ? 1 : 1;
    const scale = index === activeIndex ? 1 : 0.85;

    let translateX, translateY, rotateY;
    if (offset === 0) {
      translateX = "0%";
      translateY = "0%";
      rotateY = "0deg";
    } else if (offset === 1 || offset === -2) {
      translateX = "20%";
      translateY = `-${(maxStickUp / img.offsetHeight) * 100}%`;
      rotateY = "-15deg";
    } else {
      translateX = "-20%";
      translateY = `-${(maxStickUp / img.offsetHeight) * 100}%`;
      rotateY = "15deg";
    }

    img.style.zIndex = zIndex;
    img.style.opacity = opacity;
    img.style.transform = `translate(${translateX}, ${translateY}) scale(${scale}) rotateY(${rotateY})`;
  });

  nameElement.textContent = testimonials[activeIndex].name;
  designationElement.textContent = testimonials[activeIndex].designation;
  quoteElement.innerHTML = testimonials[activeIndex].quote
    .split(" ")
    .map((word) => `<span class="word">${word}</span>`)
    .join(" ");

  animateWords();
}

function animateWords() {
  const words = quoteElement.querySelectorAll(".word");
  words.forEach((word, index) => {
    word.style.opacity = "0";
    word.style.transform = "translateY(10px)";
    word.style.filter = "blur(10px)";
    setTimeout(() => {
      word.style.transition =
        "opacity 0.2s ease-in-out, transform 0.2s ease-in-out, filter 0.2s ease-in-out";
      word.style.opacity = "1";
      word.style.transform = "translateY(0)";
      word.style.filter = "blur(0)";
    }, index * 20);
  });
}

function handleNext() {
  updateTestimonial(1);
}

function handlePrev() {
  updateTestimonial(-1);
}

prevButton.addEventListener("click", handlePrev);
nextButton.addEventListener("click", handleNext);

// Initial setup
updateTestimonial(0);

// Autoplay functionality
const autoplayInterval = setInterval(handleNext, 5000);

// Stop autoplay on user interaction
[prevButton, nextButton].forEach((button) => {
  button.addEventListener("click", () => {
    clearInterval(autoplayInterval);
  });
});

// Handle window resize
window.addEventListener("resize", () => updateTestimonial(0));
