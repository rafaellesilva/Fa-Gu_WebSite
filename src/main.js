import "./styles/style.css";
import "./styles/pages.css";
import heroVideo from "./assets/video/hero.mp4";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    type: "Casamento",
    title: "Um sim para sempre",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85",
  },
  {
    type: "15 anos",
    title: "Uma noite para lembrar",
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=85",
  },
  {
    type: "Corporativo",
    title: "Ideias que conectam",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=85",
  },
];

const testimonials = [
  {
    text: "A Fa & Gu entendeu exatamente o que imaginávamos. O dia foi leve, lindo e muito mais especial do que sonhamos.",
    name: "Mariana & Lucas",
    event: "Casamento",
  },
  {
    text: "Cada detalhe tinha a nossa cara. Foi uma festa inesquecível e nós conseguimos aproveitar tudo sem preocupação.",
    name: "Juliana Alves",
    event: "15 anos",
  },
  {
    text: "Profissionalismo, criatividade e muito carinho em cada etapa. Nosso evento corporativo foi um sucesso.",
    name: "Rafael Mendes",
    event: "Evento corporativo",
  },
];

function renderProjects() {
  const projectGrid = document.querySelector(".project-grid");

  if (!projectGrid) return;

  projectGrid.innerHTML = projects
    .map(
      (project, index) => `
        <article class="project project-${index + 1}">
          <img src="${project.image}" alt="${project.title}" />
          <div class="project-caption">
            <p>${project.type}</p>
            <h3>${project.title}</h3>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderTestimonials() {
  const testimonialGrid = document.querySelector(".testimonial-grid");

  if (!testimonialGrid) return;

  testimonialGrid.innerHTML = testimonials
    .map(
      (testimonial) => `
        <article>
          <div class="stars" aria-label="5 estrelas">★★★★★</div>
          <p>“${testimonial.text}”</p>
          <strong>${testimonial.name}</strong>
          <small>${testimonial.event}</small>
        </article>
      `,
    )
    .join("");
}

function setupHeroVideo() {
  const video = document.querySelector(".hero-video");

  if (video) video.src = heroVideo;
}

function setupMenu() {
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-nav");

  if (!menuButton || !navigation) return;

  menuButton.addEventListener("click", () => {
    navigation.classList.toggle("is-open");
  });
}

function setupScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    ".intro, .services, .portfolio, .mission, .testimonials, .contact, .service-list article, .project",
  );

  animatedElements.forEach((element) => {
    element.classList.add("js-reveal");
  });

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.14 },
  );

  animatedElements.forEach((element) => revealObserver.observe(element));
}

function setupInternalExperience() {
  if (!document.body.classList.contains("inner-page")) return;

  const revealSections = document.querySelectorAll(".reveal-section");

  revealSections.forEach((section) => {
    gsap.to(section, {
      autoAlpha: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 82%",
        once: true,
      },
    });
  });

  const hero = document.querySelector(".page-hero--story");
  if (hero && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.to(hero.querySelector(".hero-orbit"), {
      y: -80,
      rotation: 25,
      ease: "none",
      scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
    });
    gsap.to(hero.querySelector("h1"), {
      y: 55,
      ease: "none",
      scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
    });
  }

  document.querySelectorAll(".event-card__top").forEach((top) => {
    top.addEventListener("click", () => {
      const card = top.closest(".event-card");
      document.querySelectorAll(".event-card.is-open").forEach((openCard) => {
        if (openCard !== card) openCard.classList.remove("is-open");
      });
      card.classList.toggle("is-open");
    });
  });

  const counters = document.querySelectorAll("[data-count]");
  counters.forEach((counter) => {
    const target = Number(counter.dataset.count);
    const state = { value: 0 };
    gsap.to(state, {
      value: target,
      duration: 1.8,
      ease: "power2.out",
      snap: { value: 1 },
      scrollTrigger: { trigger: counter, start: "top 88%", once: true },
      onUpdate: () => { counter.textContent = Math.round(state.value); },
    });
  });

  const filterButtons = document.querySelectorAll(".gallery-filters button");
  const galleryItems = document.querySelectorAll(".gallery-item");
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
      const filter = button.dataset.filter;
      galleryItems.forEach((item) => {
        const visible = filter === "all" || item.dataset.category === filter;
        gsap.to(item, { autoAlpha: visible ? 1 : 0, scale: visible ? 1 : 0.96, duration: 0.3, onComplete: () => { item.hidden = !visible; } });
      });
    });
  });

  const lightbox = document.querySelector(".lightbox");
  const lightboxImage = lightbox?.querySelector("img");
  document.querySelectorAll("[data-lightbox]").forEach((item) => {
    item.addEventListener("click", () => {
      if (!lightbox || !lightboxImage) return;
      lightboxImage.src = item.dataset.lightbox;
      lightboxImage.alt = item.querySelector("img")?.alt || "Imagem ampliada";
      lightbox.classList.add("is-visible");
      lightbox.setAttribute("aria-hidden", "false");
    });
  });
  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove("is-visible");
    lightbox.setAttribute("aria-hidden", "true");
  };
  lightbox?.querySelector(".lightbox-close")?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", (event) => { if (event.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeLightbox(); });

  const slides = [...document.querySelectorAll(".testimonial-slide")];
  const dots = [...document.querySelectorAll(".testimonial-dots button")];
  let currentSlide = 0;
  const showSlide = (index) => {
    if (!slides.length) return;
    currentSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => slide.classList.toggle("is-active", slideIndex === currentSlide));
    dots.forEach((dot, dotIndex) => dot.classList.toggle("is-active", dotIndex === currentSlide));
  };
  document.querySelector(".testimonial-prev")?.addEventListener("click", () => showSlide(currentSlide - 1));
  document.querySelector(".testimonial-next")?.addEventListener("click", () => showSlide(currentSlide + 1));
  dots.forEach((dot, index) => dot.addEventListener("click", () => showSlide(index)));
  if (slides.length > 1) window.setInterval(() => showSlide(currentSlide + 1), 6500);
}

renderProjects();
renderTestimonials();
setupHeroVideo();
setupMenu();
setupScrollAnimations();
setupInternalExperience();
