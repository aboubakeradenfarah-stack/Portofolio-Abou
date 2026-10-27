// 1. Liste des projets : tu peux modifier les titres, descriptions, photos et technologies ici.
const projects = [
  { number: "01", category: "Application web", title: "AssetMind", description: "Application de gestion des actifs informatiques : utilisateurs, rôles et équipements.", tags: ["JavaScript", "FastAPI", "SQLite"], icon: "▣", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=85", alt: "Code informatique sur un écran" },
  { number: "02", category: "Développement web", title: "Interfaces web", description: "Création de pages web modernes, responsives et faciles à utiliser.", tags: ["HTML", "CSS", "JavaScript"], icon: "</>", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=85", alt: "Ordinateur portable pour le développement web" },
  { number: "03", category: "Bases de données", title: "Projets SQL", description: "Conception de bases de données relationnelles et réalisation de requêtes SQL.", tags: ["SQL", "MySQL", "MariaDB"], icon: "▤", image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=900&q=85", alt: "Visualisation de données" },
  { number: "04", category: "Réalité virtuelle", title: "Jeu VR avec Unity", description: "Exploration de la création d'un jeu en réalité virtuelle et d'environnements 3D.", tags: ["Unity", "C#", "VR"], icon: "◈", image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=900&q=85", alt: "Casque de réalité virtuelle" },
  { number: "05", category: "Intelligence artificielle", title: "Exploration de l'IA", description: "Découverte des outils et méthodes de recherche en intelligence artificielle.", tags: ["Python", "IA", "Recherche"], icon: "✳", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=85", alt: "Illustration technologique de l'intelligence artificielle" },
  { number: "06", category: "Programmation", title: "Algorithmes & graphes", description: "Exercices et réalisations autour des algorithmes et des structures de données.", tags: ["C", "Java", "Python"], icon: "⌘", image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=85", alt: "Code source sur un écran" }
];

// 2. Compétences regroupées par domaine.
const skillGroups = [
  { title: "Programmation", icon: "</>", skills: ["C", "Java", "Python", "JavaScript"] },
  { title: "Développement web", icon: "◎", skills: ["HTML5", "CSS3", "PHP", "React"] },
  { title: "Bases de données", icon: "▤", skills: ["SQL", "MySQL", "MariaDB", "Administration"] },
  { title: "Systèmes", icon: "▣", skills: ["Linux", "Kali Linux"] },
  { title: "Réseaux", icon: "⌘", skills: ["Cisco", "TCP/IP", "Configuration réseau"] },
  { title: "Autres domaines", icon: "✳", skills: ["IA générative", "Unity / VR", "Applications mobiles"] }
];

// 3. Transformer un projet en carte HTML avec une image.
function createProjectCard(project) {
  const tagsHTML = project.tags.map(tag => `<span>${tag}</span>`).join("");
  return `<article class="project-card">
    <div class="project-image-wrap">
      <img class="project-image" src="${project.image}" alt="${project.alt}" loading="lazy">
      <span class="project-image-number">${project.number}</span>
      <span class="project-image-icon">${project.icon}</span>
    </div>
    <div class="project-card-body">
      <span class="project-category">${project.category}</span>
      <h3>${project.title}</h3><p>${project.description}</p>
      <div class="tag-list">${tagsHTML}</div>
      <a class="project-link" href="#contact">Parlons du projet <span aria-hidden="true">↗</span></a>
    </div></article>`;
}

// 4. Transformer un groupe de compétences en carte.
function createSkillCard(group) {
  const skillsHTML = group.skills.map(skill => `<span>${skill}</span>`).join("");
  return `<article class="skill-card reveal"><div class="skill-heading"><span>${group.icon}</span><h3>${group.title}</h3></div><div class="skill-pills">${skillsHTML}</div></article>`;
}

// 5. Insérer les cartes dans le document.
document.querySelector("#project-grid").innerHTML = projects.map(createProjectCard).join("");
document.querySelector("#skills-grid").innerHTML = skillGroups.map(createSkillCard).join("");

// 3 bis. Statistiques personnelles des compétences (valeurs modifiables).
const skillStats = [
  { name: "Analyse", value: 50 },
  { name: "Mathématiques", value: 80 },
  { name: "Programmation", value: 70 },
  { name: "Réseaux", value: 80 },
  { name: "Bases de données", value: 90 },
  { name: "Linux", value: 60 }
];

function createStatCircle(skill) {
  return `<article class="stat-card reveal">
    <div class="stat-circle" style="--percent:${skill.value}%" role="img" aria-label="${skill.name} : ${skill.value}%">
      <div class="stat-circle-inner"><strong>${skill.value}%</strong><span>niveau</span></div>
    </div>
    <h3>${skill.name}</h3>
  </article>`;
}
document.querySelector("#stats-grid").innerHTML = skillStats.map(createStatCircle).join("");

// 6. Menu de navigation pour les téléphones.
const menuButton = document.querySelector("#mobile-menu");
const navigation = document.querySelector("#nav-links");
menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
});
navigation.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navigation.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
}));

// 7. Apparition progressive des sections au défilement.
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(element => observer.observe(element));
document.querySelectorAll(".skill-card").forEach(element => observer.observe(element));

// 8. Flèches pour faire défiler les projets horizontalement.
const projectCarousel = document.querySelector("#project-grid");
document.querySelector("#projects-prev").addEventListener("click", () => {
  projectCarousel.scrollBy({ left: -projectCarousel.clientWidth * 0.8, behavior: "smooth" });
});
document.querySelector("#projects-next").addEventListener("click", () => {
  projectCarousel.scrollBy({ left: projectCarousel.clientWidth * 0.8, behavior: "smooth" });
});

// 9. Copier l'adresse e-mail avec le bouton de la section Contact.
document.querySelector("#copy-email").addEventListener("click", async () => {
  const button = document.querySelector("#copy-email");
  const label = document.querySelector("#copy-label");
  const feedback = document.querySelector("#copy-feedback");
  try {
    await navigator.clipboard.writeText(button.dataset.email);
    label.textContent = "E-mail copié !";
    feedback.textContent = "Adresse copiée dans le presse-papiers.";
  } catch (error) {
    feedback.textContent = "Copie automatique indisponible : " + button.dataset.email;
  }
  window.setTimeout(() => {
    label.textContent = "Copier l'e-mail";
    feedback.textContent = "";
  }, 2500);
});

// 10. Mettre à jour automatiquement l'année du pied de page.
document.querySelector("#year").textContent = new Date().getFullYear();
