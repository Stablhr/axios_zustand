import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Groups from './pages/Groups.jsx'
import GroupTasks from './pages/GroupTasks.jsx'
import Guide, { GuideContent } from './pages/Guide.jsx'
import Developers from './pages/Developers.jsx'
import Users from './pages/Users.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  const location = useLocation()
  const [guideOpen, setGuideOpen] = useState(false)

  return (
    <div className="min-h-dvh bg-cream">
      <div className="mx-auto flex h-dvh w-full max-w-xl flex-col sm:my-6 sm:h-[calc(100dvh-3rem)] sm:min-h-0 sm:rounded-3xl sm:border sm:border-sand-dark/50 sm:shadow-card">
        <main
          className={`scroll-area safe-x app-pt flex-1 overscroll-contain pb-24 short-screen:pb-6 sm:min-h-0 sm:pb-6 ${
            location.pathname === '/'
              ? 'min-h-0 overflow-y-auto home-desktop'
              : 'min-h-0 overflow-y-auto'
          }`}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/groups" element={<Groups openGuide={() => setGuideOpen(true)} />} />
            <Route path="/groups/:groupId" element={<GroupTasks openGuide={() => setGuideOpen(true)} />} />
            <Route path="/categories" element={<Groups openGuide={() => setGuideOpen(true)} />} />
            <Route path="/categories/:categoryId" element={<GroupTasks openGuide={() => setGuideOpen(true)} />} />
            <Route path="/guide" element={<Guide openGuide={() => setGuideOpen(true)} />} />
            <Route path="/users" element={<Users openGuide={() => setGuideOpen(true)} />} />
            <Route path="/developers" element={<Developers openGuide={() => setGuideOpen(true)} />} />
            <Route path="*" element={<NotFound openGuide={() => setGuideOpen(true)} />} />
          </Routes>
        </main>

        <div className="safe-x safe-pb fixed inset-x-0 bottom-0 z-10 bg-gradient-to-t from-cream to-transparent pt-4 sm:static sm:shrink-0 sm:bg-none sm:p-4">
          <Navbar />
        </div>

        {guideOpen ? (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-espresso/40 p-4"
            onClick={() => setGuideOpen(false)}
          >
            <div
              className="max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-cream p-5 shadow-card"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-espresso">Guide</h2>
                <button
                  type="button"
                  onClick={() => setGuideOpen(false)}
                  aria-label="Close guide"
                  className="grid h-10 w-10 place-items-center rounded-full text-mocha transition-colors duration-150 hover:bg-rose/10 hover:text-rose focus-visible:ring-2 focus-visible:ring-rose/50 focus-visible:outline-none"
                >
                  ×
                </button>
              </div>
              <GuideContent onClose={() => setGuideOpen(false)} />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}