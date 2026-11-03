import { Link } from 'react-router-dom'
import Header from '../components/Header.jsx'

const STEPS = [
  {
    title: 'Create a category',
    body: 'Go to the Categories page, type a name in the input, and press Create Category. Empty or duplicate names are rejected.',
  },
  {
    title: 'Add a task to a selected category',
    body: 'Open a category from the Categories page, then type your task in the input and press Add Task (or hit Enter). It appears marked Not Done.',
  },
  {
    title: 'Mark a task as Done or Not Done',
    body: 'Tap the circle next to a task, or its status badge. It switches between Not Done and Done. Tap again to switch back.',
  },
  {
    title: 'Delete a task',
    body: 'Press the trash Delete button on the right side of a task. To remove everything in a category, use Clear all tasks in this category.',
  },
  {
    title: 'Navigate between pages and categories',
    body: 'Use the navigation bar (Home, Categories, Users, Developers) at the bottom. On a category page, use ← Back to Categories. On the dashboard, use the Categories button. Open buttons on category cards open that category.',
  },
  {
    title: 'Retrieve user information with Axios',
    body: 'The app sends a GET request with Axios to https://dummyjson.com/users (or /users/1). While waiting, a loading indicator appears. When the response arrives, the user\'s name, email, username and photo are shown. If the request fails, an error message and a Retry button appear.',
    code: `import axios from "axios";

const api = axios.create({ baseURL: "https://dummyjson.com" });

export const fetchUserById = (id) =>
  api.get(\`/users/\${id}\`).then((res) => res.data);`,
  },
  {
    title: 'Share task data with Zustand',
    body: 'Tasks and groups live in one global store. Any page can read them and call actions such as addTask, toggleTask and deleteTask. When the store changes, every component that uses that data (dashboard stats, group cards, task lists) re-renders automatically, so no props need to be passed down.',
    code: `import { create } from "zustand";

export const useTaskStore = create((set) => ({
  tasks: [],
  addTask: (text) =>
    set((state) => ({ tasks: [...state.tasks, { text, done: false }] })),
}));`,
  },
]

export function GuideContent({ onClose }) {
  return (
    <>
      <ol className="flex flex-col gap-3">
        {STEPS.map((step, index) => (
          <li
            key={step.title}
            className="flex gap-3 rounded-3xl bg-sand/60 p-4 sm:gap-4 sm:p-5"
          >
            <span className="font-hand text-4xl leading-none text-latte">
              {index + 1}
            </span>
            <div className="min-w-0">
              <h2 className="text-lg font-semibold text-espresso">{step.title}</h2>
              <p className="mt-1 text-sm leading-relaxed text-mocha">{step.body}</p>
              {step.code ? (
                <pre className="mt-3 overflow-x-auto rounded-2xl bg-sand/80 p-3 text-xs text-espresso">
                  <code>{step.code}</code>
                </pre>
              ) : null}
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <Link
          to="/categories"
          onClick={onClose}
          className="flex min-h-11 flex-1 items-center justify-center rounded-2xl bg-latte px-5 py-3 font-medium text-white shadow-btn transition-[background-color,transform] duration-150 ease-out hover:bg-latte-dark active:scale-95 focus-visible:ring-2 focus-visible:ring-latte-dark/60 focus-visible:outline-none"
        >
          Categories
        </Link>
        <Link
          to="/users"
          onClick={onClose}
          className="flex min-h-11 flex-1 items-center justify-center rounded-2xl bg-sand px-5 py-3 font-medium text-espresso transition-colors duration-150 hover:bg-sand-dark focus-visible:ring-2 focus-visible:ring-latte/60 focus-visible:outline-none"
        >
          Go to Users page
        </Link>
      </div>
    </>
  )
}

export default function Guide({ openGuide }) {
  return (
    <div className="flex flex-col gap-5 px-0 py-2">
      <Header title="Guide" onGuideClick={openGuide} />
      <GuideContent />
    </div>
  )
}