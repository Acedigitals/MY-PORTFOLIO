/* Edit this file to update projects, programs, learning notes, and social links. */
window.portfolioData = {
  programs: [
    { name: "DSA 2.0", start: "2026-09-01", end: "2026-12-31" },
    { name: "TS Academy", start: "2026-10-31", end: "2027-03-31" }
  ],
  milestones: [
    { date: "September 2026", text: "Started software development, joined DSA 2.0" },
    { date: "October 2026", text: "Joined TS Academy (runs until March 2027)" },
    { date: "November 2026", text: "Shipped Daily Task Checker" },
    { date: "Today", text: "Learning in public and building my first projects" },
    { date: "Next", text: "Write the Daily Task Checker case study and start my next project" }
  ],
  skills: [
    { name: "JavaScript" },
    { name: "HTML" },
    { name: "CSS" },
    { name: "Git and GitHub" },
    { name: "localStorage" },
    { name: "Service Worker API" },
    { name: "Web App Manifest" },
    { name: "Data structures and algorithms", status: "learning" }
  ],
  learningLog: [
    { date: "September 2026", title: "Started DSA 2.0", note: "Beginning a focused study of data structures and algorithms." },
    { date: "October 2026", title: "Joined TS Academy", note: "Starting a structured learning program and documenting the journey." }
  ],
  social: {
    x: "https://x.com/AceTheSchema",
    linkedin: "https://ng.linkedin.com/in/isreal-olawale-a229403a8",
    github: "https://github.com/Acedigitals",
    email: "11isrealolawale@gmail.com"
  },
  projects: [
    {
      id: "daily-task-checker",
      title: "Daily Task Checker",
      summary: "A browser-based daily task checker for managing, completing, reordering, and saving personal daily tasks.",
      status: "Live",
      tech: [
        "HTML",
        "CSS",
        "JavaScript",
        "localStorage",
        "Service Worker API",
        "Web App Manifest"
      ],
      liveUrl: "https://daily-task-checker-app.vercel.app/",
      githubUrl: "https://github.com/Acedigitals/Daily-Task-Checker-App",
      problem: "Provides a simple way to organize recurring daily tasks, track completion progress, and preserve task data in the user's browser.",
      built: "Built a responsive, installable daily task checker with task management, progress tracking, customizable default tasks, local persistence, themes, timezone-aware daily resets, mobile reorder controls, offline support, and PWA installation support.",
      decisions: "Used plain HTML, CSS, and JavaScript with localStorage instead of a backend. Used local calendar dates for daily resets, visibility checks for mobile background behavior, stable task IDs, and a network-first service-worker strategy for safer updates.",
      learned: "Learned DOM manipulation, arrays of objects, event listeners, rendering functions, localStorage, date and timezone handling, responsive CSS, accessibility, service workers, offline caching, and PWA installation.",
      differently: "Add backend synchronization, task editing, data export and import, custom accessible dialogs, automated browser tests, and potentially a more structured cache-versioning strategy.",
      screenshots: ["assets/task_manager_1.jpg", "assets/task_manager_2.jpg"]
    },
    /*
    {
      id: "my-project",
      title: "Project title",
      summary: "One-line project summary.",
      status: "Planned",
      tech: ["JavaScript", "HTML", "CSS"],
      liveUrl: "",
      githubUrl: "",
      problem: "The problem this project addresses.",
      built: "What I built and how it works.",
      decisions: "The key technical decisions I made.",
      learned: "What I learned while making it.",
      differently: "What I would change next time.",
      screenshots: ["assets/project-screen.png"]
    }
    */
  ]
};
