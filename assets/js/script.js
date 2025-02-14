let mainSite = document.querySelector("#mainSite");
const navbar = document.querySelector(".navbar");
const navItems = document.querySelectorAll(".nav-item");

function lunchIntro() {
  setTimeout(() => {
    mainSite.style.display = "block";
  }, 3000);
}

lunchIntro();

// Retirer la classe active de tous les éléments au démarrage
navItems.forEach((item) => {
  item.classList.remove("active");
});

// Ajouter les écouteurs d'événements pour chaque élément de navigation
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    // Retirer la classe active de tous les éléments
    navItems.forEach((navItem) => navItem.classList.remove("active"));

    // Ajouter la classe active à l'élément cliqué
    item.classList.add("active");

    // Déplacer la navbar vers la gauche seulement si on n'est pas en haut de la page
    if (window.scrollY > 100) {
      navbar.classList.add("active");
    }
  });
});

const welcomeText = document.getElementById("welcomeText");
const greetings = [
  "Welcome",
  "Bienvenue",
  "Willkommen",
  "Bienvenido",
  "いらっしゃいませ",
  "欢迎",
];

async function typeText(text) {
  for (let i = 0; i < text.length; i++) {
    welcomeText.textContent += text[i];
    await new Promise((resolve) => setTimeout(resolve, 150));
  }
}

async function deleteText() {
  let text = welcomeText.textContent;
  while (text.length > 0) {
    text = text.slice(0, -1);
    welcomeText.textContent = text;
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
}

async function animateGreetings() {
  while (true) {
    for (const greeting of greetings) {
      await typeText(greeting);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await deleteText();
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }
}

// Démarrer l'animation quand la page est chargée
document.addEventListener("DOMContentLoaded", animateGreetings);

window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
    navbar.classList.add("active");
  } else {
    navbar.classList.remove("scrolled");
    navbar.classList.remove("active");
    // Enlever la classe active de tous les éléments de navigation
    navItems.forEach((item) => {
      item.classList.remove("active");
    });
  }
});

document.querySelectorAll(".nav-item").forEach((item) => {
  item.addEventListener("click", function (e) {
    if (this.classList.contains("active")) {
      // Désélectionne l'élément
      this.classList.remove("active");
      // Scroll vers le haut de la page
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      // Retire la classe active de tous les autres éléments
      navItems.forEach((navItem) => navItem.classList.remove("active"));
      // Ajoute la classe active à l'élément cliqué
      this.classList.add("active");
    }
  });
});

document.querySelectorAll(".download-container").forEach((container) => {
  const steps = container.querySelectorAll(".step");
  const nextBtns = container.querySelectorAll(".next-step");
  let currentStep = 0;

  nextBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      steps[currentStep].classList.remove("active");

      if (currentStep === steps.length - 1) {
        currentStep = 0;
      } else {
        currentStep = (currentStep + 1) % steps.length;
      }

      steps[currentStep].classList.add("active");

      nextBtns.forEach((button) => {
        if (currentStep === 0) {
          button.textContent = "Begin";
        } else if (currentStep === steps.length - 1) {
          button.textContent = "Finish";
        } else {
          button.textContent = `${currentStep + 1}nd Step`;
        }
      });
    });
  });
});
