document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('projects-container');

  // Fetch portfolio data
  fetch('data/data.json')
    .then(response => response.json())
    .then(data => {
      // Populate Profile
      if (data.profile) {
        document.getElementById('profile-name').textContent = data.profile.name;
        document.getElementById('profile-bio').textContent = data.profile.bio;
        const profileImg = document.getElementById('profile-img');
        profileImg.classList.add('image-fade');
        profileImg.parentElement.classList.add('skeleton-box');
        profileImg.onload = function() { this.parentElement.classList.add('loaded'); };
        profileImg.src = data.profile.image;
      }

      // Render Projects
      if (data.projects) {
        data.projects.forEach(project => {
          renderProject(project, container);
        });
      }
      // Initialize carousels after rendering
      initCarousels();
    })
    .catch(error => {
      console.error("Error loading project data:", error);
      container.innerHTML = `<p>Error loading projects. Please check console.</p>`;
    });
});

function renderProject(project, container) {
  // Generate Tags HTML
  const tagsHtml = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
  
  // Generate Tech Stack HTML
  const techHtml = project.techStack.map(tech => `<span class="tag">${tech}</span>`).join('');

  // Generate Carousel Slides HTML
  const slidesHtml = project.carouselImages.map((img, index) => `
    <div class="carousel-slide skeleton-box ${index === 0 ? 'active' : ''}">
      <img src="${img.url}" alt="${project.title} - image ${index + 1}" class="image-fade" onload="this.parentElement.classList.add('loaded')">
      <div class="carousel-caption">${img.caption}</div>
    </div>
  `).join('');

  // Generate Links HTML
  let linksHtml = '';
  
  if (project.links.websites && project.links.websites.length > 0) {
    linksHtml += `<div class="link-group">
                    <h4>Links:</h4>
                    <ul>
                      ${project.links.websites.map(url => `<li><a href="${url}" target="_blank"><i class='bx bx-link-external'></i> ${url}</a></li>`).join('')}
                    </ul>
                  </div>`;
  }
  
  if (project.links.publications && project.links.publications.length > 0) {
    linksHtml += `<div class="link-group">
                    <h4>Publications:</h4>
                    <ul>
                      ${project.links.publications.map(url => `<li><a href="${url}" target="_blank"><i class='bx bx-file'></i> ${url}</a></li>`).join('')}
                    </ul>
                  </div>`;
  }

  if (project.links.googlePlay || project.links.appStore) {
    let badges = '';
    if (project.links.appStore) {
      badges += `<a href="${project.links.appStore}" target="_blank" class="store-badge app-store">
                  <i class='bx bxl-apple'></i>
                  <div class="badge-text">
                    <span>Download on the</span>
                    <strong>App Store</strong>
                  </div>
                </a>`;
    }
    if (project.links.googlePlay) {
      badges += `<a href="${project.links.googlePlay}" target="_blank" class="store-badge google-play">
                  <i class='bx bxl-play-store'></i>
                  <div class="badge-text">
                    <span>GET IT ON</span>
                    <strong>Google Play</strong>
                  </div>
                </a>`;
    }
    linksHtml += `<div class="link-group">
                    <h4>Get the App:</h4>
                    <div class="badges-container">
                      ${badges}
                    </div>
                  </div>`;
  }

  const cardClass = project.type === 'banner' ? 'project-card project-card-banner' : 'project-card';
  const projectHtml = `
    <article class="${cardClass}" id="${project.id}">
      <div class="project-info">
        <div class="project-header">
          <div class="project-title-wrapper">
            ${(() => {
              if (!project.logo) return '';
              const url = typeof project.logo === 'string' ? project.logo : project.logo.url;
              const format = typeof project.logo === 'object' && project.logo.format ? `logo-${project.logo.format}` : 'logo-square';
              const bgColor = typeof project.logo === 'object' && project.logo.bgColor ? `background: ${project.logo.bgColor};` : '';
              return `<div class="skeleton-box ${format}" style="border-radius:12px; display:inline-flex; ${bgColor}"><img src="${url}" alt="${project.title} Logo" class="project-logo ${format} image-fade" onload="this.parentElement.classList.add('loaded')"></div>`;
            })()}
            <h3 class="project-title">${project.title}</h3>
          </div>
          <span class="project-status">${project.status}</span>
        </div>
        
        <div class="project-meta">
          <div class="meta-item" title="Company">
            <i class='bx bxs-building'></i> ${project.company}
          </div>
          <div class="meta-item" title="Role">
            <i class='bx bx-user'></i> ${project.role}
          </div>
          <div class="meta-item" title="Duration">
            <i class='bx bx-calendar'></i> ${project.dateRange}
          </div>
        </div>

        <p class="project-description">${project.description}</p>
        
        <div class="project-tags">
          ${tagsHtml}
          ${techHtml}
        </div>
      </div>

      <div class="project-visuals">
        <!-- The Carousel -->
        ${(() => {
          const cType = project.carouselType ? `carousel-${project.carouselType}` : 'carousel-landscape';
          return `<div class="carousel-container ${cType}" data-carousel="${project.id}">`;
        })()}
          <button class="carousel-btn carousel-prev"><i class='bx bx-chevron-left'></i></button>
          <div class="carousel-track">
            ${slidesHtml}
          </div>
          <button class="carousel-btn carousel-next"><i class='bx bx-chevron-right'></i></button>
        </div>
      </div>

      <div class="project-links">
        ${linksHtml}
      </div>
    </article>
  `;

  container.insertAdjacentHTML('beforeend', projectHtml);
}

function initCarousels() {
  const carousels = document.querySelectorAll('.carousel-container');
  
  carousels.forEach(carousel => {
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    let currentSlide = 0;

    if (slides.length <= 1) {
      // Hide buttons if only 1 slide
      if(prevBtn) prevBtn.style.display = 'none';
      if(nextBtn) nextBtn.style.display = 'none';
      return;
    }

    const showSlide = (index) => {
      slides.forEach(s => s.classList.remove('active'));
      slides[index].classList.add('active');
    };

    nextBtn.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    });

    prevBtn.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    });
  });
}
