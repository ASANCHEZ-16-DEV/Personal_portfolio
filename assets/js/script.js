console.log('El script de JavaScript está siendo cargado y ejecutado.');

const flagsElement = document.getElementById('flags');
const textsToChange = document.querySelectorAll("[data-section]");
const changeLanguage = async (language) => {
  console.log(`Cambiando idioma a: ${language}`);
  const requestJson = await fetch(`./languages/${language}.json`);
  const texts = await requestJson.json();
  const cvLink = document.querySelector('[data-lang="cv"]');

  for (const textToChange of textsToChange) {
    const section = textToChange.dataset.section;
    const value = textToChange.dataset.value;

    textToChange.innerHTML = texts[section][value];
  }
  if (language === 'es') {
    cvLink.href = 'assets/downloads/CV - David García González - ES.pdf';
  } else {
    cvLink.href = 'assets/downloads/CV - David García González - EN.pdf';
  }
};

flagsElement.addEventListener('click', (e) => {
  changeLanguage(e.target.parentElement.dataset.language);
});

// window scroll
$(window).on("scroll", function () {
  var scroll = $(window).scrollTop();
  if (scroll >= 100) {
    $("body").addClass("fixed-header");
  } else {
    $("body").removeClass("fixed-header");
  }

  if (scroll >= 4400) {
    document.querySelectorAll('[data-scroll-index]').forEach(el => el.classList.remove('active'));
    document.querySelector('[data-scroll-index="6"]').classList.add('active');
  }
});

// Document Ready
$(document).ready(function () {

  // Typing animation
  new Typed('#type-it', {
    strings: ['Backend<br>Developer'],
    typeSpeed: 100,
  });

  //Owl Carousel
  // $('.owl-carousel').owlCarousel({
  //     loop:true,
  //     items:2,
  //     margin:30,
  //     autoplay:true,
  //     autoplayTimeout:2000,
  //     responsive:{
  //         0:{
  //             items:1
  //         },
  //         900:{
  //             items:2
  //         },
  //     }
  // });

});

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM completamente cargado');
  const sections = document.querySelectorAll('section[data-scroll-index]');
  const navItems = document.querySelectorAll('[data-scroll-nav]');

  function onScroll() {
    let scrollPosition = window.scrollY + window.innerHeight / 2;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionIndex = section.getAttribute('data-scroll-index');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navItems.forEach(navItem => {
          navItem.classList.remove('active');
          if (navItem.getAttribute('data-scroll-nav') === sectionIndex) {
            navItem.classList.add('active');
          }
        });
      }
    });
  }

  function onClickNavItem(event) {
    event.preventDefault();
    const targetIndex = event.target.getAttribute('data-scroll-nav');
    const targetSection = document.querySelector(`section[data-scroll-index="${targetIndex}"]`);

    if (targetSection) {
      const targetPosition = targetSection.offsetTop;
      const offset = -55; // Ajusta este valor según sea necesario
      window.scrollTo({
        top: targetPosition + offset,
        behavior: 'smooth'
      });
    }
  }

  navItems.forEach(navItem => {
    navItem.addEventListener('click', onClickNavItem);
  });

  window.addEventListener('scroll', onScroll);
  onScroll(); // Llamar a la función para establecer la sección activa al cargar la página
});

document.addEventListener('DOMContentLoaded', function () {
  console.log('Iniciando el cambio de skills');
  const currentSkills = document.getElementById('current-skills');
  const nextSkills = document.getElementById('next-skills');
  const changeSkillsButton = document.getElementById('change-skills');

  // Función para cambiar entre los contenedores de skills
  changeSkillsButton.addEventListener('click', function () {
    console.log('Flecha clicada. Ejecutando cambio de skills...');

    // Añadir clase 'hidden' al contenedor actual y quitarla del siguiente
    currentSkills.classList.toggle('hidden');
    nextSkills.classList.toggle('active'); // Cambiar 'hidden' por 'active'

    // Verificar estado de los contenedores de skills
    console.log('Estado de current-skills: ', currentSkills.classList.contains('hidden') ? 'Oculto' : 'Visible');
    console.log('Estado de next-skills: ', nextSkills.classList.contains('active') ? 'Visible' : 'Oculto');
  });
});
