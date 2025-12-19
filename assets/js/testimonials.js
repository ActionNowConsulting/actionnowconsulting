// Load and display testimonials
async function loadTestimonials() {
  try {
    const response = await fetch('assets/data/testimonials.json');
    if (!response.ok) {
      throw new Error('Failed to load testimonials');
    }
    
    const testimonials = await response.json();
    const container = document.getElementById('testimonials-container');
    
    if (!container) {
      console.error('Testimonials container not found');
      return;
    }
    
    container.innerHTML = '';
    
    testimonials.forEach((testimonial, index) => {
      const testimonialCard = createTestimonialCard(testimonial, index);
      container.appendChild(testimonialCard);
    });
  } catch (error) {
    console.error('Error loading testimonials:', error);
    const container = document.getElementById('testimonials-container');
    if (container) {
      container.innerHTML = '<p style="text-align: center; color: #6c757d;">Unable to load testimonials at this time.</p>';
    }
  }
}

function createTestimonialCard(testimonial, index) {
  const card = document.createElement('div');
  card.className = 'testimonial-card';
  
  // Name and rating
  const header = document.createElement('div');
  header.className = 'testimonial-header';
  
  const name = document.createElement('h3');
  name.className = 'testimonial-name';
  name.textContent = testimonial.name;
  
  const stars = createStarRating(testimonial.rating);
  
  header.appendChild(name);
  header.appendChild(stars);
  
  // Images gallery
  const imagesContainer = document.createElement('div');
  imagesContainer.className = 'testimonial-images';
  
  testimonial.images.forEach((imageName, imgIndex) => {
    const imgWrapper = document.createElement('div');
    imgWrapper.className = 'testimonial-image-wrapper';
    
    const img = document.createElement('img');
    img.src = `assets/images/testimonials/${imageName}`;
    img.alt = `${testimonial.name} testimonial image ${imgIndex + 1}`;
    img.loading = 'lazy';
    
    imgWrapper.appendChild(img);
    imagesContainer.appendChild(imgWrapper);
  });
  
  // Testimonial text
  const text = document.createElement('p');
  text.className = 'testimonial-text';
  const maxLength = 300; // Character limit
  const testimonialText = testimonial.testimonial;
  if (testimonialText.length > maxLength) {
    text.textContent = testimonialText.substring(0, maxLength).trim() + '...';
    text.title = testimonialText; // Add tooltip with full text
  } else {
    text.textContent = testimonialText;
  }
  
  card.appendChild(header);
  card.appendChild(imagesContainer);
  card.appendChild(text);
  
  return card;
}

function createStarRating(rating) {
  const starsContainer = document.createElement('div');
  starsContainer.className = 'star-rating';
  
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  // Full stars
  for (let i = 0; i < fullStars; i++) {
    const star = document.createElement('span');
    star.className = 'star star-full';
    star.innerHTML = '★';
    starsContainer.appendChild(star);
  }
  
  // Half star
  if (hasHalfStar) {
    const starWrapper = document.createElement('span');
    starWrapper.className = 'star-half-wrapper';
    
    const starEmpty = document.createElement('span');
    starEmpty.className = 'star star-empty';
    starEmpty.innerHTML = '★';
    
    const starFull = document.createElement('span');
    starFull.className = 'star star-full';
    starFull.innerHTML = '★';
    
    starWrapper.appendChild(starEmpty);
    starWrapper.appendChild(starFull);
    starsContainer.appendChild(starWrapper);
  }
  
  // Empty stars
  for (let i = 0; i < emptyStars; i++) {
    const star = document.createElement('span');
    star.className = 'star star-empty';
    star.innerHTML = '★';
    starsContainer.appendChild(star);
  }
  
  return starsContainer;
}

// Load testimonials when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadTestimonials);
} else {
  loadTestimonials();
}

