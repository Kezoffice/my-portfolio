import { useState, useEffect } from "react";
import "./index.css";

const projectsData = [
  {
    id: 1,
    title: "Aurora Dashboard",
    description:
      "A modern dashboard UI focused on data visualisation, with realtime widgets and responsive charts.",
    image:
      "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=1200&q=60",
  },
  {
    id: 2,
    title: "Nomad Blog",
    description:
      "A minimal, content-first blog template with rich typography and beautiful reading experience.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=60",
  },
  {
    id: 3,
    title: "RouteFinder App",
    description:
      "A mobile-first navigation app that blends offline maps with curated POIs and routing features.",
    image:
      "https://images.unsplash.com/photo-1504805572947-34fad45aed93?auto=format&fit=crop&w=1200&q=60",
  },
  {
    id: 4,
    title: "Studio Brand Kit",
    description:
      "A creative brand kit and component library for designers — color systems, tokens, and patterns.",
    image:
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1200&q=60",
  },
];

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("themeIsDark")) ?? false;
    } catch (e) {
      return false;
    }
  });
  const [navOpen, setNavOpen] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  useEffect(() => {
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("themeIsDark", JSON.stringify(isDark));
  }, [isDark]);

  useEffect(() => {
    // close nav on resize to desktop
    function onResize() {
      if (window.innerWidth > 768) setNavOpen(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  function toggleTheme() {
    setIsDark((s) => !s);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormState((s) => ({ ...s, [name]: value }));
  }

  function validateEmail(email) {
    return /^[\w-.]+@[\w-]+\.[A-Za-z]{2,}$/.test(email);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");
    const { name, email, message } = formState;
    if (!name.trim() || !email.trim() || !message.trim()) {
      setFormError("Please fill in all fields.");
      return;
    }
    if (!validateEmail(email)) {
      setFormError("Please provide a valid email address.");
      return;
    }

    setFormSuccess(
      "Thanks! Your message has been sent. We'll get back to you soon."
    );
    setFormState({ name: "", email: "", message: "" });

    setTimeout(() => setFormSuccess(""), 6000);
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <header className="max-w-6xl mx-auto p-4 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
            E
          </span>
          <div className="hidden md:block">
            <div className="text-lg font-semibold">Emmanuel Okezie</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Creative Developer
            </div>
          </div>
        </a>

        <nav className="md:flex items-center gap-6 hidden">
          <a href="#projects" className="hover:underline">
            Projects
          </a>
          <a href="#contact" className="hover:underline">
            Contact
          </a>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-md ring-1 ring-gray-200 dark:ring-gray-700"
          >
            {isDark ? "☀️ Light" : "🌙 Dark"}
          </button>
        </nav>

        {/* Mobile nav */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-md ring-1 ring-gray-200 dark:ring-gray-700"
          >
            {isDark ? "☀️" : "🌙"}
          </button>
          <button
            onClick={() => setNavOpen((s) => !s)}
            aria-label="Toggle navigation"
            className="p-2 rounded-md ring-1 ring-gray-200 dark:ring-gray-700"
          >
            {navOpen ? "✖" : "☰"}
          </button>
        </div>
      </header>

      {/* Mobile menu panel */}
      {navOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <a
            href="#projects"
            className="block p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Projects
          </a>
          <a
            href="#contact"
            className="block p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Contact
          </a>
        </div>
      )}

      <main className="max-w-6xl mx-auto p-6">
        {/* Hero */}
        <section
          id="home"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center py-12"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Hi — I<span>&apos;</span>m{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
                Emmanuel
              </span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-xl">
              I design and build beautiful, accessible, and responsive web
              experiences. I focus on performance, simplicity, and delightful
              interactions.
            </p>

            <div className="mt-6 flex gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg shadow-md ring-1 ring-gray-200 dark:ring-gray-700 bg-white dark:bg-gray-800"
              >
                View projects →
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg"
              >
                Contact me
              </a>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3 max-w-sm">
              <div className="p-3 rounded-lg bg-white dark:bg-gray-800 ring-1 ring-gray-100 dark:ring-gray-800 text-center">
                <div className="text-xl font-semibold">8+</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Years experience
                </div>
              </div>
              <div className="p-3 rounded-lg bg-white dark:bg-gray-800 ring-1 ring-gray-100 dark:ring-gray-800 text-center">
                <div className="text-xl font-semibold">24</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Projects
                </div>
              </div>
              <div className="p-3 rounded-lg bg-white dark:bg-gray-800 ring-1 ring-gray-100 dark:ring-gray-800 text-center">
                <div className="text-xl font-semibold">Remote</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Work
                </div>
              </div>
            </div>
          </div>

          <div className="order-first md:order-last flex justify-center md:justify-end">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-3xl bg-gradient-to-tr from-blue-400 via-purple-500 to-pink-500 shadow-xl transform hover:scale-105 transition-transform duration-300 flex items-center justify-center text-white">
              <div className="text-center px-6">
                <div className="text-2xl font-bold">Design + Dev</div>
                <div className="mt-2 text-sm opacity-90">
                  Creative websites & delightful apps
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-12">
          <div className="flex items-baseline justify-between">
            <h2 className="text-2xl font-semibold">Projects</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
              A small selection of recent work.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsData.map((p) => (
              <article
                key={p.id}
                className="rounded-xl overflow-hidden bg-white dark:bg-gray-800 ring-1 ring-gray-100 dark:ring-gray-800 shadow-sm"
              >
                <div className="aspect-[16/10] bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    {p.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <a href="#" className="text-sm underline">
                      View
                    </a>
                    <span className="text-xs text-gray-500">Web / UI</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-12">
          <h2 className="text-2xl font-semibold">Contact</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Have a message to send? Fill the form below.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="space-y-2">
              <label className="text-sm">Name</label>
              <input
                name="name"
                value={formState.name}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-md ring-1 ring-gray-200 dark:ring-gray-700 bg-white dark:bg-gray-800"
                placeholder="Your name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm">Email</label>
              <input
                name="email"
                value={formState.email}
                onChange={handleChange}
                required
                type="email"
                className="w-full p-3 rounded-md ring-1 ring-gray-200 dark:ring-gray-700 bg-white dark:bg-gray-800"
                placeholder="you@domain.com"
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-sm">Message</label>
              <textarea
                name="message"
                value={formState.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full p-3 rounded-md ring-1 ring-gray-200 dark:ring-gray-700 bg-white dark:bg-gray-800"
                placeholder="Your message"
              />
            </div>

            <div className="md:col-span-2 flex items-center gap-4">
              <button
                type="submit"
                className="px-5 py-3 rounded-md bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium shadow"
              >
                Send message
              </button>
              <div className="text-sm text-green-600 dark:text-green-300">
                {formSuccess}
              </div>
              <div className="text-sm text-red-600 dark:text-red-300">
                {formError}
              </div>
            </div>
          </form>
        </section>
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-800 mt-12">
        <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm">
            © {new Date().getFullYear()} Emmanuel Okezie — Built with React
          </div>
          <div className="flex gap-3">
            <a href="#" className="text-sm hover:underline">
              Privacy
            </a>
            <a href="#" className="text-sm hover:underline">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
