import React, { useState } from "react";
import {
  MemoryRouter,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

// ---------- Utility: Pill + Card ----------
const Pill = ({ children }) => (
  <span className="px-2 py-0.5 text-xs rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200">
    {children}
  </span>
);

const Card = ({ title, subtitle, children }) => (
  <div className="rounded-2xl border border-zinc-200 p-4 shadow-sm bg-white">
    <div className="flex items-start justify-between gap-2 mb-3">
      <div>
        <h3 className="text-lg font-semibold leading-tight">{title}</h3>
        {subtitle && <p className="text-sm text-zinc-500 mt-0.5">{subtitle}</p>}
      </div>
    </div>
    {children}
  </div>
);

// ---------- Router HUD (so you can see where you are) ----------
const RouterHUD = () => {
  const location = useLocation();
  return (
    <div className="text-xs text-zinc-600 border border-zinc-200 bg-zinc-50 rounded-lg px-2 py-1 w-fit">
      Current route: <code className="text-zinc-800">{location.pathname}</code>
    </div>
  );
};

// ---------- Example container with Broken/Fixed switch ----------
const Example = ({ label, explanation, Broken, Fixed }) => {
  const [mode, setMode] = useState("broken");
  return (
    <Card title={label} subtitle={explanation}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Pill>Broken</Pill>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={mode === "fixed"}
              onChange={(e) =>
                setMode(e.target.checked ? "fixed" : "broken")
              }
            />
            <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:bg-emerald-500 relative transition">
              <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5" />
            </div>
          </label>
          <Pill>Fixed</Pill>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-zinc-200 p-3 bg-zinc-50">
          <div className="text-xs font-medium text-zinc-700 mb-2">
            {mode === "broken" ? "Broken Demo" : "Fixed Demo"}
          </div>
          <div className="min-h-16">
            {mode === "broken" ? <Broken /> : <Fixed />}
          </div>
        </div>
        <div className="rounded-xl border border-zinc-200 p-3">
          <p className="m-0 text-sm text-zinc-600">
            Toggle <strong>Broken ↔ Fixed</strong> and try the button. Watch the
            router HUD and your browser alert/console.
          </p>
        </div>
      </div>
    </Card>
  );
};

// ---------- Examples ----------

// 1. Button refreshes page
const RefreshBug_Broken = () => {
  const [count, setCount] = useState(0);
  return (
    <form className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => {
          alert("Clicked, but form is submitting because type is missing!");
          setCount((c) => c + 1);
        }}
        className="px-3 py-2 rounded-lg bg-zinc-900 text-white"
      >
        Click Me
      </button>
      <span className="text-sm text-zinc-600">Count: {count}</span>
    </form>
  );
};

const RefreshBug_Fixed = () => {
  const [count, setCount] = useState(0);
  return (
    <form className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => {
          alert("No submit/refresh. Works fine now.");
          setCount((c) => c + 1);
        }}
        className="px-3 py-2 rounded-lg bg-emerald-600 text-white"
      >
        Click Me
      </button>
      <span className="text-sm text-zinc-600">Count: {count}</span>
    </form>
  );
};

// 2. onClick runs immediately
const CallBug_Broken = () => {
  const handleClick = () => alert("Runs on render — wrong!");
  return (
    <button
      onClick={handleClick} // Pass function reference, not call
      className="px-3 py-2 rounded-lg bg-zinc-900 text-white"
    >
      Click Me
    </button>
  );
};

const CallBug_Fixed = () => {
  const handleClick = () => alert("Runs only when clicked.");
  return (
    <button
      onClick={handleClick}
      className="px-3 py-2 rounded-lg bg-emerald-600 text-white"
    >
      Click Me
    </button>
  );
};

// 3. <a> vs <Link>
const AnchorBug_Broken = () => (
  <div className="flex items-center gap-3">
    <Link to="/about" className="underline text-blue-600">
      Go to About (anchor)
    </Link>
    <RouterHUD />
  </div>
);

const AnchorBug_Fixed = () => (
  <div className="flex items-center gap-3">
    <Link to="/about" className="underline text-blue-600">
      Go to About (Link)
    </Link>
    <RouterHUD />
  </div>
);

// 4. navigate typo
const NavigateTypo_Broken = () => {
  const nav = useNavigate();
  return (
    <div className="flex items-center gap-3">
      <button
        className="px-3 py-2 rounded-lg bg-zinc-900 text-white"
        onClick={() => nav("/about")} // typo
      >
        Go to About (typo)
      </button>
      <RouterHUD />
    </div>
  );
};

const NavigateTypo_Fixed = () => {
  const nav = useNavigate();
  return (
    <div className="flex items-center gap-3">
      <button
        className="px-3 py-2 rounded-lg bg-emerald-600 text-white"
        onClick={() => nav("/about")}
      >
        Go to About (fixed)
      </button>
      <RouterHUD />
    </div>
  );
};

// 5. Missing preventDefault
const PreventDefault_Broken = () => {
  const [msg, setMsg] = useState("—");
  return (
    <form className="flex items-center gap-2">
      <button
        className="px-3 py-2 rounded-lg bg-zinc-900 text-white"
        onClick={(e) => { e.preventDefault(); setMsg("Handled click without submitting"); }}
      >
        Click
      </button>
      <span className="text-sm text-zinc-600">Status: {msg}</span>
    </form>
  );
};

const PreventDefault_Fixed = () => {
  const [msg, setMsg] = useState("—");
  return (
    <form className="flex items-center gap-2">
      <button
        className="px-3 py-2 rounded-lg bg-emerald-600 text-white"
        onClick={(e) => {
          e.preventDefault();
          setMsg("Handled click without submitting");
        }}
      >
        Click
      </button>
      <span className="text-sm text-zinc-600">Status: {msg}</span>
    </form>
  );
};

// ---------- Pages ----------
const Home = () => <div className="text-sm text-zinc-700">Home page</div>;
const About = () => <div className="text-sm text-zinc-700">About page</div>;

// ---------- Main ----------
export default function ReactButtonBugPlayground() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          React Button Bug Playground
        </h1>
        <div className="flex items-center gap-2 text-sm text-zinc-600">
          <Pill>Forms</Pill>
          <Pill>onClick</Pill>
          <Pill>Routing</Pill>
        </div>
      </header>

      <p className="text-zinc-600">
        Toggle each example between <strong>Broken</strong> and{" "}
        <strong>Fixed</strong>. Use the router HUD to see path changes and watch
        for alerts/console messages.
      </p>

      <MemoryRouter initialEntries={["/"]}>
        <div className="rounded-xl border border-zinc-200 p-3 bg-zinc-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="underline text-blue-600">
              Home
            </Link>
            <Link to="/about" className="underline text-blue-600">
              About
            </Link>
          </div>
          <RouterHUD />
        </div>

        <div className="grid gap-5">
          <Routes>
            <Route
              path="/"
              element={
                <div className="grid gap-5">
                  <Example
                    label="Button inside a form refreshes the page"
                    explanation="Default type is submit; add type='button' to stop form submission."
                    Broken={RefreshBug_Broken}
                    Fixed={RefreshBug_Fixed}
                  />

                  <Example
                    label="onClick runs immediately on render"
                    explanation="Don't call the handler in JSX; pass the function reference."
                    Broken={CallBug_Broken}
                    Fixed={CallBug_Fixed}
                  />

                  <Example
                    label="Using <a> instead of <Link>"
                    explanation="Anchors cause full reloads; use React Router's <Link> to keep SPA navigation."
                    Broken={AnchorBug_Broken}
                    Fixed={AnchorBug_Fixed}
                  />

                  <Example
                    label="navigate() path has a typo"
                    explanation="A misspelled route sends users to the wrong place (404)."
                    Broken={NavigateTypo_Broken}
                    Fixed={NavigateTypo_Fixed}
                  />

                  <Example
                    label="Missing e.preventDefault() in form button handler"
                    explanation="Inside forms, prevent default submit when you just want a click action."
                    Broken={PreventDefault_Broken}
                    Fixed={PreventDefault_Fixed}
                  />
                </div>
              }
            />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </MemoryRouter>
    </div>
  );
}
