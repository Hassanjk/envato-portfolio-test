// Project Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
  const projectItems = document.querySelectorAll('.project-item');
  const projectSlider = document.querySelector('.project-slider');
  const projectSliderContent = document.querySelector('.project-slider__content');
  const closeBtn = document.querySelector('.project-slider__close');
  
  // Function to open slider with project details
  function openProjectSlider(projectData) {
    // Populate the slider content
    projectSliderContent.innerHTML = `
      <h2>${projectData.title}</h2>
      <img src="${projectData.image}" alt="${projectData.title}">
      <div class="project-details">
        ${projectData.description}
        <p><strong>Technologies:</strong> ${projectData.technologies}</p>
        ${projectData.link ? `<a href="${projectData.link}" target="_blank" class="btn">View Project</a>` : ''}
      </div>
    `;
    
    // Show the slider
    projectSlider.classList.add('active');
    document.body.classList.add('slider-open');
  }
  
  // Function to close slider
  function closeProjectSlider() {
    projectSlider.classList.remove('active');
    document.body.classList.remove('slider-open');
  }
  
  // Add click event to projects
  projectItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get project data from data attributes or from an API
      const projectData = {
        title: this.querySelector('h3').textContent,
        image: this.querySelector('img').src,
        description: this.getAttribute('data-description') || 'No description available.',
        technologies: this.getAttribute('data-technologies') || 'Not specified',
        link: this.getAttribute('data-link') || ''
      };
      
      openProjectSlider(projectData);
    });
  });
  
  // Close slider when clicking close button
  closeBtn.addEventListener('click', closeProjectSlider);
  
  // Close slider when clicking outside of content
  projectSlider.addEventListener('click', function(e) {
    if (e.target === projectSlider) {
      closeProjectSlider();
    }
  });
  
  // Close slider with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && projectSlider.classList.contains('active')) {
      closeProjectSlider();
    }
  });
});