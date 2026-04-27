window.toggleMenu = function toggleMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  }
};

document.addEventListener('click', (event) => {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!hamburger || !mobileMenu) return;

  if (!hamburger.contains(event.target) && !mobileMenu.contains(event.target)) {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
  }
});

let lastScroll = 0;
let scrollTicking = false;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (!navbar) return;

  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTicking) return;
  scrollTicking = true;

  window.requestAnimationFrame(() => {
    navbar.style.padding = currentScroll > 50 ? '10px' : '20px';

    const scrollingDown = currentScroll > lastScroll && currentScroll > 80;
    navbar.classList.toggle('navbar-hidden', scrollingDown);

    lastScroll = currentScroll;
    scrollTicking = false;
  });
});

(function () {
  const guides = window.GUIAS_DATA || [];
  if (!guides.length) return;

  const guidesById = Object.fromEntries(guides.map((guide) => [guide.id, guide]));
  const body = document.body;
  const pathname = window.location.pathname.replace(/\\/g, '/');
  const isInsideGuidesFolder = pathname.includes('/guias/');
  const isGuideDetailPage = isInsideGuidesFolder;
  const basePath = isInsideGuidesFolder ? '' : 'guias/';
  const parentPath = isInsideGuidesFolder ? '../' : '';

  let currentGuideContainer = document.querySelector('[data-current-guide]');
  const searchInput = document.getElementById('guias-search');
  const carousel = document.querySelector('[data-guide-carousel]');

  if (!carousel) return;

  const track = carousel.querySelector('[data-carousel-track]');
  const viewport = carousel.querySelector('[data-carousel-viewport]');
  const prevBtn = carousel.querySelector('[data-direction="prev"]');
  const nextBtn = carousel.querySelector('[data-direction="next"]');
  const dotsContainer = carousel.querySelector('[data-carousel-dots]');
  const resultsInfo = document.querySelector('[data-results-info]');

  let slidesPerView = 1;
  let currentIndex = 0;
  let visibleGuides = guides.slice();
  let searchQuery = '';
  let currentGuideId = null;

  function normalize(text) {
    return String(text || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  function getInitialGuideId() {
    const params = new URLSearchParams(window.location.search);
    const requestedId = params.get('guia');
    if (requestedId && guidesById[requestedId]) {
      return requestedId;
    }

    if (isGuideDetailPage) {
      const slug = pathname.split('/').pop()?.replace('.html', '');
      const guideBySlug = guides.find((guide) => guide.slug === slug);
      if (guideBySlug) {
        return guideBySlug.id;
      }
    }

    if (body.dataset.guideId && guidesById[body.dataset.guideId]) {
      return body.dataset.guideId;
    }

    return guides[0].id;
  }

  function getGuideUrl(guide) {
    return `${basePath}${guide.slug}.html`;
  }

  function getBackUrl() {
    return `${parentPath}guias.html`;
  }

  function getGuideImageUrl(guide) {
    if (!guide.image) return '';
    return `${basePath}${guide.image}`;
  }

  function ensureCurrentGuideContainer() {
    if (currentGuideContainer) return currentGuideContainer;

    const main = document.querySelector('.guias-browser');
    if (!main) return null;

    currentGuideContainer = document.createElement('section');
    currentGuideContainer.setAttribute('data-current-guide', '');
    main.appendChild(currentGuideContainer);
    return currentGuideContainer;
  }

  function ensureBackButton() {
    if (!isGuideDetailPage) return;
    if (document.querySelector('[data-back-index]')) return;

    const searchBlock = document.querySelector('.guias-search-block');
    if (!searchBlock) return;

    const backActions = document.createElement('section');
    backActions.className = 'guias-back-actions';
    backActions.setAttribute('data-back-index', '');
    backActions.innerHTML = `<a href="${getBackUrl()}" class="guias-back-index">Volver al índice</a>`;

    searchBlock.insertAdjacentElement('beforebegin', backActions);
  }

  function moveCurrentGuideBelowCarousel() {
    if (!isGuideDetailPage) return;

    const container = ensureCurrentGuideContainer();
    const carouselSection = document.querySelector('.guias-carousel-section');

    if (container && carouselSection) {
      carouselSection.insertAdjacentElement('afterend', container);
    }
  }

  function renderCurrentGuide(guide) {
    const container = ensureCurrentGuideContainer();
    if (!container) return;

    const requirements = guide.requirements || [];
    const bestPractices = guide.bestPractices || [];
    const stepsHtml = guide.steps.map((step) => `<li>${step}</li>`).join('');
    const requirementsHtml = requirements.map((item) => `<li>${item}</li>`).join('');
    const bestPracticesHtml = bestPractices.map((item) => `<li>${item}</li>`).join('');
    const imageSrc = getGuideImageUrl(guide);
    const imageHtml = imageSrc
      ? `<figure class="guide-visual"><img src="${imageSrc}" alt="${guide.imageAlt || guide.title}" loading="lazy"></figure>`
      : '';

    const contentBlocks = [];

    if (requirements.length) {
      contentBlocks.push(`
        <article class="guide-mini-card">
          <h3>Antes de empezar</h3>
          <ul class="guide-list">
            ${requirementsHtml}
          </ul>
        </article>
      `);
    }

    contentBlocks.push(`
      <article class="guide-main-card">
        <h3>Paso a paso</h3>
        <ol class="guias-current-steps">
          ${stepsHtml}
        </ol>
      </article>
    `);

    if (bestPractices.length) {
      contentBlocks.push(`
        <article class="guide-mini-card">
          <h3>Buenas prácticas</h3>
          <ul class="guide-list">
            ${bestPracticesHtml}
          </ul>
        </article>
      `);
    }

    container.innerHTML = `
      <section class="guide-content-heading fade-in">
        <span class="guias-current-label" id="current-guide-title">Contenido de la guia</span>
      </section>

      <section class="guias-current fade-in" aria-labelledby="current-guide-title">
        <div class="guide-overview">
          ${imageHtml}
          <div class="guide-overview-text">
            <h3 class="guias-current-title">${guide.title}</h3>
            <p class="guias-current-intro">${guide.intro}</p>
            <p class="guide-context">${guide.context || ''}</p>
          </div>
        </div>

        <div class="guide-content-grid">
          ${contentBlocks.join('')}
        </div>
      </section>
    `;
  }

  function renderCarouselSlides(list) {
    if (!track) return;

    track.innerHTML = list.map((guide) => {
      const isActive = isGuideDetailPage && guide.id === currentGuideId;
      return `
        <article class="guia-slide guias-slide">
          <a class="guias-card${isActive ? ' active' : ''}" href="${getGuideUrl(guide)}" aria-label="Abrir ${guide.title}">
            <div>
              <span class="guias-card-badge">${isActive ? 'Actual' : 'Guía'}</span>
              <h3>${guide.title}</h3>
              <p>${guide.summary}</p>
            </div>
            <div class="guias-card-footer">
              <span class="guias-card-link">Abrir guía</span>
              <span class="guias-card-arrow" aria-hidden="true">›</span>
            </div>
          </a>
        </article>
      `;
    }).join('');
  }

  function getSlidesPerView() {
    return window.matchMedia('(max-width: 768px)').matches ? 1 : 2;
  }

  function getMaxIndex() {
    return Math.max(0, visibleGuides.length - slidesPerView);
  }

  function createDots() {
    if (!dotsContainer) return;

    const pageCount = getMaxIndex() + 1;
    dotsContainer.innerHTML = '';

    for (let i = 0; i < pageCount; i += 1) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'carousel-dot';
      dot.setAttribute('aria-label', `Ir al bloque ${i + 1}`);
      dot.addEventListener('click', () => {
        currentIndex = i;
        updateCarousel();
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    if (!dotsContainer) return;

    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  function updateCarousel() {
    if (!track) return;

    const offsetPercent = (100 / slidesPerView) * currentIndex;
    track.style.transform = `translateX(-${offsetPercent}%)`;
    updateDots();
  }

  function goToIndex(index) {
    const maxIndex = getMaxIndex();

    if (index > maxIndex) {
      currentIndex = 0;
    } else if (index < 0) {
      currentIndex = maxIndex;
    } else {
      currentIndex = index;
    }

    updateCarousel();
  }

  function buildVisibleGuides(query) {
    const cleaned = normalize(query.trim());

    if (!cleaned) {
      visibleGuides = guides.slice();
    } else {
      const matches = guides.filter((guide) => {
        const haystack = normalize([guide.title, guide.summary, guide.intro].join(' '));
        return haystack.includes(cleaned);
      });

      const rest = guides.filter((guide) => !matches.includes(guide));
      visibleGuides = [...matches, ...rest];
    }

    renderCarouselSlides(visibleGuides);
    currentIndex = 0;
    slidesPerView = getSlidesPerView();
    carousel.style.setProperty('--slides-per-view', String(slidesPerView));
    createDots();
    updateCarousel();

    if (resultsInfo) {
      if (!cleaned) {
        resultsInfo.textContent = `${guides.length} guías disponibles`;
      } else {
        const matchCount = guides.filter((guide) => {
          const haystack = normalize([guide.title, guide.summary, guide.intro].join(' '));
          return haystack.includes(cleaned);
        }).length;
        resultsInfo.textContent = matchCount > 0
          ? `${matchCount} guía${matchCount === 1 ? '' : 's'} encontrada${matchCount === 1 ? '' : 's'}`
          : 'Sin coincidencias: se muestran todas las guías';
      }
    }
  }

  function syncLayout() {
    slidesPerView = getSlidesPerView();
    carousel.style.setProperty('--slides-per-view', String(slidesPerView));
    currentIndex = Math.min(currentIndex, getMaxIndex());
    createDots();
    updateCarousel();
  }

  function updatePageMeta(guide) {
    const titleWithDot = /[.!?]$/.test(guide.title) ? guide.title : `${guide.title}.`;

    const heading = document.querySelector('[data-page-heading]');
    const subtitle = document.querySelector('[data-page-subtitle]');

    if (isGuideDetailPage) {
      document.title = `${guide.title} | IFI Seguridad`;
      if (heading) {
        heading.textContent = titleWithDot;
      }
      if (subtitle) {
        subtitle.textContent = guide.summary;
      }
      return;
    }

    document.title = 'Guías | IFI Seguridad';
    if (heading) {
      heading.textContent = 'Guias.';
    }
    if (subtitle) {
      subtitle.textContent = 'Selecciona una guía, usa el buscador para priorizar resultados y navega con el carrusel inferior.';
    }
  }

  function initialize() {
    const initialGuideId = getInitialGuideId();
    const initialGuide = guidesById[initialGuideId] || guides[0];
    currentGuideId = initialGuide.id;

    if (isGuideDetailPage) {
      ensureBackButton();
      moveCurrentGuideBelowCarousel();
      renderCurrentGuide(initialGuide);
    }

    updatePageMeta(initialGuide);

    if (searchInput) {
      searchInput.addEventListener('input', (event) => {
        searchQuery = event.target.value;
        buildVisibleGuides(searchQuery);
      });
    }

    buildVisibleGuides('');

    if (searchInput) {
      searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          searchInput.value = '';
          searchQuery = '';
          buildVisibleGuides('');
          searchInput.blur();
        }
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => goToIndex(currentIndex - 1));
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => goToIndex(currentIndex + 1));
    }

    if (viewport) {
      let touchStartX = 0;

      viewport.addEventListener('touchstart', (event) => {
        touchStartX = event.changedTouches[0].clientX;
      }, { passive: true });

      viewport.addEventListener('touchend', (event) => {
        const touchEndX = event.changedTouches[0].clientX;
        const delta = touchEndX - touchStartX;

        if (Math.abs(delta) < 40) return;

        if (delta > 0) {
          goToIndex(currentIndex - 1);
        } else {
          goToIndex(currentIndex + 1);
        }
      }, { passive: true });
    }

    window.addEventListener('resize', syncLayout);
    syncLayout();
  }

  document.addEventListener('DOMContentLoaded', initialize);
}());
