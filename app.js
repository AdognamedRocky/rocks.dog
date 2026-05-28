const iconPaths = {
  instagram:
    '<rect x="6" y="6" width="12" height="12" rx="4"></rect><circle cx="12" cy="12" r="3.2"></circle><circle cx="16" cy="8" r="0.8"></circle>',
  x: '<path d="M6 6l12 12M18 6L6 18"></path>',
  tiktok:
    '<path d="M14 5v9.4a4 4 0 1 1-3.2-3.9"></path><path d="M14 5c.8 2.6 2.2 4 4 4.5"></path>',
  youtube:
    '<path d="M4.8 8.2c.2-1.1 1.1-1.9 2.2-2.1 3.3-.3 6.7-.3 10 0 1.1.2 2 .9 2.2 2.1.4 2.5.4 5.1 0 7.6-.2 1.1-1.1 1.9-2.2 2.1-3.3.3-6.7.3-10 0-1.1-.2-2-.9-2.2-2.1-.4-2.5-.4-5.1 0-7.6z"></path><path d="M10.5 9.5l4.5 2.5-4.5 2.5z"></path>',
  discord:
    '<path d="M8.2 8.4c2.5-.9 5.1-.9 7.6 0"></path><path d="M8 16.4c2.7 1.3 5.3 1.3 8 0"></path><path d="M7.2 17.8c-1.7-.5-2.8-1.3-3.2-2.5.3-3 .9-5.5 2-7.5 1-.8 2-1.3 3.1-1.5l.7 1.3"></path><path d="M16.8 17.8c1.7-.5 2.8-1.3 3.2-2.5-.3-3-.9-5.5-2-7.5-1-.8-2-1.3-3.1-1.5l-.7 1.3"></path><circle cx="9.5" cy="12.5" r=".9"></circle><circle cx="14.5" cy="12.5" r=".9"></circle>',
  telegram:
    '<path d="M20 5L4 11.4l5.5 2.1L17 8.4l-5.8 6.6.2 4L14 16l3.7 2.8z"></path>',
  link:
    '<path d="M10 13a5 5 0 0 0 7.1 0l1.4-1.4a5 5 0 0 0-7.1-7.1L10.6 5"></path><path d="M14 11a5 5 0 0 0-7.1 0l-1.4 1.4a5 5 0 0 0 7.1 7.1l.8-.8"></path>'
};

function icon(name) {
  const path = iconPaths[name] || iconPaths.link;
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${path}</svg>`;
}

function setText(id, value) {
  const node = document.getElementById(id);
  node.textContent = value || "";
}

function applyConfig() {
  document.title = siteConfig.name || "Personal links";
  document.documentElement.style.setProperty("--accent", siteConfig.accent || "#ffd166");
  document.getElementById("background").src = siteConfig.backgroundImage || "assets/background-placeholder.png";

  const profile = document.getElementById("profile");
  if (siteConfig.profileImage) {
    profile.src = siteConfig.profileImage;
    profile.alt = `${siteConfig.name} profile image`;
    profile.hidden = false;
  } else {
    profile.hidden = true;
  }

  setText("tagline", siteConfig.tagline);
  setText("site-title", siteConfig.logoText || siteConfig.name);

  const socials = document.getElementById("socials");
  socials.innerHTML = "";
  siteConfig.socials.forEach((item) => {
    const link = document.createElement("a");
    link.className = "icon-button";
    link.href = item.url;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.ariaLabel = item.label;
    link.title = item.label;
    link.innerHTML = icon(item.icon);
    socials.append(link);
  });

  const contacts = document.getElementById("contacts");
  contacts.innerHTML = "";
 siteConfig.contacts.forEach((item) => {
  const pill = document.createElement("button");
  pill.type = "button";
  pill.className = "handle";
  pill.title = `Copy ${item.label}`;

  const contactIcon = item.image
    ? `<img class="handle-icon" src="${item.image}" alt="" aria-hidden="true">`
    : icon(item.icon);

  pill.innerHTML = `${contactIcon}<span>${item.value}</span>`;

  pill.addEventListener("click", async () => {
    await navigator.clipboard.writeText(item.copyValue || item.value);

    const text = pill.querySelector("span");
    const original = text.textContent;
    text.textContent = "Copied!";

    setTimeout(() => {
      text.textContent = original;
    }, 1200);
  });

  contacts.append(pill);
});

  const credits = document.getElementById("credits");
  credits.innerHTML = "";
  siteConfig.credits.forEach((line) => {
    const item = document.createElement("li");
    item.textContent = line;
    credits.append(item);
  });
}

function setupCredits() {
  const toggle = document.getElementById("credits-toggle");
  const close = document.getElementById("credits-close");
  const panel = document.getElementById("credits-panel");

  function setOpen(isOpen) {
    panel.hidden = !isOpen;
    toggle.setAttribute("aria-expanded", String(isOpen));
  }

  toggle.addEventListener("click", () => setOpen(panel.hidden));
  close.addEventListener("click", () => setOpen(false));
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });
}

applyConfig();
setupCredits();
