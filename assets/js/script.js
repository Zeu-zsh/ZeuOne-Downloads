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
  if (!welcomeText) return;
  welcomeText.textContent = '';
  for (let i = 0; i < text.length; i++) {
    welcomeText.textContent += text[i];
    await new Promise((resolve) => setTimeout(resolve, 150));
  }
}

async function deleteText() {
  if (!welcomeText) return;
  let text = welcomeText.textContent;
  while (text.length > 0) {
    text = text.slice(0, -1);
    welcomeText.textContent = text;
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
}

async function animateGreetings() {
  if (!welcomeText) return;
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

document.querySelectorAll(".prev-step").forEach((button) => {
  button.addEventListener("click", function () {
    const currentStep = this.closest(".step");
    const prevStep = currentStep.previousElementSibling;

    if (prevStep) {
      // Mettre à jour le texte du bouton Next de l'étape précédente
      const nextButtonInPrevStep = prevStep.querySelector(".next-step");
      if (nextButtonInPrevStep) {
        // Définir le texte en fonction de l'étape actuelle
        if (currentStep.querySelector("p").textContent.includes("Étape 1")) {
          nextButtonInPrevStep.textContent = "Begin";
        } else if (
          currentStep.querySelector("p").textContent.includes("Étape 2")
        ) {
          nextButtonInPrevStep.textContent = "2nd Step";
        } else if (
          currentStep.querySelector("p").textContent.includes("Étape 3")
        ) {
          nextButtonInPrevStep.textContent = "3rd Step";
        } else {
          nextButtonInPrevStep.textContent = "Final Step";
        }
      }

      // Activer l'étape précédente
      currentStep.classList.remove("active");
      prevStep.classList.add("active");
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

// Sélectionner tous les boutons avec data-method
document.querySelectorAll('[data-method]').forEach(button => {
    button.addEventListener('click', function() {
        const method = this.getAttribute('data-method');
        const modal = document.getElementById('infoModal');
        const modalContent = document.getElementById('modalContent');
        
        // Contenu spécifique pour chaque méthode
        const content = {
            fortnite: `
                <div class="space-y-4">
                    <div class="step active">
                        <h4 class="text-lg font-semibold text-white mb-2">Étape 1</h4>
                        <p class="text-gray-300">Instructions pour Fortnite...</p>
                    </div>
                    <div class="step">
                        <h4 class="text-lg font-semibold text-white mb-2">Étape 2</h4>
                        <p class="text-gray-300">Suite des instructions...</p>
                    </div>
                </div>
            `,
            valorant: `
                <div class="space-y-4">
                    <div class="step active">
                        <h4 class="text-lg font-semibold text-white mb-2">Étape 1</h4>
                        <p class="text-gray-300">Instructions pour Valorant...</p>
                    </div>
                    <div class="step">
                        <h4 class="text-lg font-semibold text-white mb-2">Étape 2</h4>
                        <p class="text-gray-300">Suite des instructions...</p>
                    </div>
                </div>
            `
        };

        // Mettre à jour le contenu du modal
        modalContent.innerHTML = content[method];
        
        // Afficher le modal
        modal.classList.remove('hidden');
    });
});

// Fermer le modal
document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('infoModal').classList.add('hidden');
});

// Fermer le modal en cliquant en dehors
document.getElementById('infoModal').addEventListener('click', function(e) {
    if (e.target === this) {
        this.classList.add('hidden');
    }
});

// Empêcher la fermeture quand on clique sur le contenu du modal
document.querySelector('.modal-content').addEventListener('click', function(e) {
    e.stopPropagation();
});

// Fonction pour gérer la vidéo
function handleVideo() {
    const videoContainer = document.querySelector('.aspect-video');
    const iframe = videoContainer.querySelector('iframe');
    
    // Ajuster la taille de la vidéo
    function resizeVideo() {
        const width = videoContainer.offsetWidth;
        const height = width * (9/16); // Ratio 16:9
        iframe.style.height = `${height}px`;
    }

    // Redimensionner la vidéo au chargement et au redimensionnement de la fenêtre
    window.addEventListener('resize', resizeVideo);
    resizeVideo();
}

// Fonction pour ouvrir la modale (doit être globale)
window.openModal = function(product) {
    console.log('Opening modal for:', product); // Pour le débogage
    
    const modal = document.getElementById('downloadModal');
    const videoFrame = document.getElementById('videoFrame');
    const downloadButton = document.getElementById('downloadButton');

    if (!modal) {
        console.error('Modal not found');
        return;
    }
    
    if (!videoFrame) {
        console.error('Video frame not found');
        return;
    }
    
    if (!downloadButton) {
        console.error('Download button not found');
        return;
    }

    // Configuration selon le produit
    if (product === 'valmethod') {
        videoFrame.src = './assets/img/ValMethod Download.mp4';
        downloadButton.href = './assets/img/unbranded.exe';
    } else if (product === 'unlockall') {
        videoFrame.src = './assets/img/UnlockAll Download.mp4';
        downloadButton.href = './assets/img/unlock.exe';
    } else if (product === 'valtrigger') {
        videoFrame.src = './assets/img/ValTrigger Download.mp4';
        downloadButton.href = './assets/img/trigger.exe';
    } else {
        console.error('Unknown product:', product);
        return;
    }

    // Afficher la modale
    modal.classList.remove('hidden');
}

// Fonction pour fermer la modale (doit être globale)
window.closeModal = function() {
    const modal = document.getElementById('downloadModal');
    const videoFrame = document.getElementById('videoFrame');
    
    if (videoFrame) {
        videoFrame.src = '';
    }
    
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Test direct pour déboguer
document.addEventListener('DOMContentLoaded', function() {
    // Vérifier que la modale existe
    const modal = document.getElementById('downloadModal');
    console.log('Modal element:', modal);
    
    // Vérifier que le bouton existe
    const valMethodButton = document.querySelector('button[onclick="openModal(\'valmethod\')"]');
    console.log('Val-Method button:', valMethodButton);
    
    // Ajouter un écouteur d'événement direct pour le bouton
    if (valMethodButton) {
        valMethodButton.addEventListener('click', function() {
            console.log('Button clicked directly');
            openModal('valmethod');
        });
    }
});
