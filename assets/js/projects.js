// Load and display before/after project images
async function loadProjects() {
  try {
    const response = await fetch('assets/data/projects.json');
    if (!response.ok) {
      throw new Error('Failed to load projects');
    }
    
    const projects = await response.json();
    const track = document.querySelector('.carousel-track');
    
    if (!track) {
      console.error('Carousel track not found');
      return;
    }
    
    // Clear existing slides
    track.innerHTML = '';
    
    // Create slides for each before/after pair
    projects.forEach((project, index) => {
      const slide = createProjectSlide(project, index);
      track.appendChild(slide);
    });
    
    // Re-initialize carousel after slides are loaded
    if (typeof carousel !== 'undefined' && carousel.init) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        carousel.init();
      }, 100);
    }
  } catch (error) {
    console.error('Error loading projects:', error);
    const track = document.querySelector('.carousel-track');
    if (track) {
      track.innerHTML = '<div class="carousel-slide"><p style="text-align: center; padding: 2rem; color: #6c757d;">Unable to load projects at this time.</p></div>';
    }
  }
}

function createProjectSlide(project, index) {
  const slide = document.createElement('div');
  slide.className = 'carousel-slide';
  
  const container = document.createElement('div');
  container.className = 'before-after-container';
  
  // Before image
  const beforeBox = document.createElement('div');
  beforeBox.className = 'before-after-box';
  
  const beforeLabel = document.createElement('div');
  beforeLabel.className = 'before-after-label';
  beforeLabel.textContent = 'Before';
  
  const beforeImg = document.createElement('img');
  beforeImg.src = `assets/images/projects/${project.before}`;
  beforeImg.alt = `Before restoration - Example ${index + 1}`;
  beforeImg.loading = 'lazy';
  
  beforeBox.appendChild(beforeLabel);
  beforeBox.appendChild(beforeImg);
  
  // After image
  const afterBox = document.createElement('div');
  afterBox.className = 'before-after-box';
  
  const afterLabel = document.createElement('div');
  afterLabel.className = 'before-after-label';
  afterLabel.textContent = 'After';
  
  const afterImg = document.createElement('img');
  afterImg.src = `assets/images/projects/${project.after}`;
  afterImg.alt = `After restoration - Example ${index + 1}`;
  afterImg.loading = 'lazy';
  
  afterBox.appendChild(afterLabel);
  afterBox.appendChild(afterImg);
  
  container.appendChild(beforeBox);
  container.appendChild(afterBox);
  slide.appendChild(container);
  
  return slide;
}

// Load projects when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadProjects);
} else {
  loadProjects();
}

