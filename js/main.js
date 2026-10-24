/* Change rendering or interaction behavior here. */
(() => {
  const data = window.portfolioData;
  const $ = (selector) => document.querySelector(selector);
  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));

  function progress(program) {
    const now = new Date();
    const start = new Date(`${program.start}T00:00:00`);
    const end = new Date(`${program.end}T23:59:59`);
    const total = end - start;
    const percent = total <= 0 ? 100 : Math.min(100, Math.max(0, Math.round(((now - start) / total) * 100)));
    const daysLeft = Math.max(0, Math.ceil((end - now) / 86400000));
    return { percent, daysLeft };
  }
  function renderTimeline() {
    const target = $("#timeline");
    if (!target) return;
    target.innerHTML = data.milestones.map((item) => `<article class="timeline-item"><span class="timeline-date">${escapeHtml(item.date)}</span><p>${escapeHtml(item.text)}</p></article>`).join("");
  }
  function renderProgress() {
    const target = $("#program-progress");
    if (!target) return;
    target.innerHTML = data.programs.map((program) => { const result = progress(program); return `<div class="progress-item"><div class="progress-label"><strong>${escapeHtml(program.name)}</strong><span>${result.percent}% complete, ${result.daysLeft} days left</span></div><div class="progress-track" role="progressbar" aria-label="${escapeHtml(program.name)} progress" aria-valuenow="${result.percent}" aria-valuemin="0" aria-valuemax="100"><span style="width:${result.percent}%"></span></div></div>`; }).join("");
  }
  function renderLog() {
    const target = $("#learning-log");
    if (!target) return;
    const entries = [...data.learningLog].reverse();
    const visible = target.dataset.expanded === "true" ? entries : entries.slice(0, 5);
    target.innerHTML = visible.map((entry) => `<article class="log-entry"><time>${escapeHtml(entry.date)}</time><div><h3>${escapeHtml(entry.title)}</h3><p>${escapeHtml(entry.note)}</p></div></article>`).join("");
    const more = $("#log-more");
    if (more) { more.hidden = entries.length <= 5; more.textContent = target.dataset.expanded === "true" ? "Show less" : "Show more"; }
  }
  function renderProjects(filter = "All") {
    const target = $("#projects-grid");
    const filters = $("#project-filters");
    if (!target) return;
    if (!data.projects.length) {
      if (filters) filters.hidden = true;
      target.innerHTML = `<div class="slot-card"><strong>My first project is coming soon</strong><p>This space will feature a project I build during my learning journey.</p></div><div class="slot-card"><strong>Project space available</strong><p>New work will appear here as I continue learning and building.</p></div>`;
      return;
    }
    const statuses = ["All", ...new Set(data.projects.map((project) => project.status))];
    if (filters) { filters.hidden = false; filters.innerHTML = statuses.map((status) => `<button class="filter-button${status === filter ? " active" : ""}" type="button" data-filter="${escapeHtml(status)}">${escapeHtml(status)}</button>`).join(""); }
    const projects = filter === "All" ? data.projects : data.projects.filter((project) => project.status === filter);
    target.innerHTML = projects.map((project) => `<article class="project-card"><div class="project-card-top"><span class="status-badge">${escapeHtml(project.status)}</span><span class="project-index">${String(data.projects.indexOf(project) + 1).padStart(2, "0")}</span></div><h3>${escapeHtml(project.title)}</h3><p>${escapeHtml(project.summary)}</p><div class="tags">${project.tech.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div><a class="case-link" href="project.html?id=${encodeURIComponent(project.id)}">Read case study <span aria-hidden="true">-&gt;</span></a></article>`).join("");
  }
  function renderSocial() {
    const target = $("#social-links");
    if (!target) return;
    target.innerHTML = `<a class="button button-secondary" href="${data.social.x}" target="_blank" rel="noopener noreferrer">X</a><a class="button button-secondary" href="${data.social.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn</a><a class="button button-secondary" href="${data.social.github}" target="_blank" rel="noopener noreferrer">GitHub</a>`;
  }
  function renderProjectPage() {
    const target = $("#project-content");
    if (!target) return;
    const id = new URLSearchParams(window.location.search).get("id");
    const project = data.projects.find((item) => item.id === id);
    if (!project) { target.innerHTML = `<div class="not-found content-card"><h1>Project not found</h1><p class="muted">That project case study does not exist yet.</p><a class="case-link" href="index.html#projects">Back to projects</a></div>`; return; }
    document.title = `${project.title} | Olawale Isreal Feranmi`;
    document.querySelector('meta[name="description"]').setAttribute("content", project.summary);
    target.innerHTML = `<article class="case-study"><div class="section-heading"><h1>Project case study</h1></div><div class="case-header"><span class="status-badge">${escapeHtml(project.status)}</span><h1>${escapeHtml(project.title)}</h1><p class="case-summary">${escapeHtml(project.summary)}</p><div class="tags">${project.tech.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div><div class="button-row">${project.liveUrl ? `<a class="button button-primary" href="${escapeHtml(project.liveUrl)}" target="_blank" rel="noopener noreferrer">Live demo</a>` : ""}${project.githubUrl ? `<a class="button button-secondary" href="${escapeHtml(project.githubUrl)}" target="_blank" rel="noopener noreferrer">GitHub</a>` : ""}</div></div><div class="case-sections">${[["Problem", "problem"], ["What I built", "built"], ["Key decisions", "decisions"], ["What I learned", "learned"], ["What I would do differently", "differently"]].map(([heading, key]) => `<section><h2>${heading}</h2><p>${escapeHtml(project[key])}</p></section>`).join("")}</div>${project.screenshots && project.screenshots.length ? `<section class="gallery"><h2>Screenshots</h2><div>${project.screenshots.map((image) => `<img src="${escapeHtml(image)}" loading="lazy" alt="${escapeHtml(project.title)} screenshot">`).join("")}</div></section>` : ""}</article>`;
  }
  document.addEventListener("DOMContentLoaded", () => {
    renderTimeline(); renderProgress(); renderLog(); renderProjects(); renderSocial(); renderProjectPage();
    const year = $("#current-year"); if (year) year.textContent = new Date().getFullYear();
    const more = $("#log-more"); if (more) more.addEventListener("click", () => { const log = $("#learning-log"); log.dataset.expanded = log.dataset.expanded !== "true"; renderLog(); });
    const filters = $("#project-filters"); if (filters) filters.addEventListener("click", (event) => { if (event.target.matches("[data-filter]")) renderProjects(event.target.dataset.filter); });
    const menu = $(".menu-toggle");
    const nav = $("#site-nav");
    if (menu && nav) {
      menu.addEventListener("click", () => {
        const open = menu.getAttribute("aria-expanded") === "true";
        menu.setAttribute("aria-expanded", String(!open));
        nav.classList.toggle("is-open", !open);
      });
      nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
        menu.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
      }));
    }
  });
})();
