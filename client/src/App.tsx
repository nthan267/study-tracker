import { useState, useEffect } from 'react'
import './App.css'

type Session = {
  _id: string
  course: string
  duration: number
  topics: string
  notes?: string
  date?: string
  productivity?: number
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/sessions'

function App() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)

  const [course, setCourse] = useState('')
  const [duration, setDuration] = useState('')
  const [topics, setTopics] = useState('')
  const [productivity, setProductivity] = useState('')

  useEffect(() => {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
          setSessions(data)
          setLoading(false)
        })
        .catch(err => {
          console.error('Failed to fetch sessions:', err)
          setLoading(false)
        })
  }, [])

  const handleAdd = async () => {
    if (!course || !duration || !topics) return
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          course,
          duration: Number(duration),
          topics,
          productivity: Number(productivity),
        }),
      })
      const saved = await res.json()
      setSessions([saved, ...sessions])
      setCourse('')
      setDuration('')
      setTopics('')
      setProductivity('3')
    } catch (err) {
      console.error('Failed to add session:', err)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      setSessions(sessions.filter(s => s._id !== id))
    } catch (err) {
      console.error('Failed to delete session:', err)
    }
  }

  return (
      <div className="app">
        <header className="app-header">
          <h1>Study Tracker</h1>
          <p>A quiet place to record what you've studied today.</p>
        </header>

        <section className="section">
          <h2>Log a session</h2>
          <div className="form">
            <input
                placeholder="Course (e.g. COEN 352)"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
            />
            <div className="form-row">
              <input
                  placeholder="Duration in minutes"
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
              />
              <input
                  placeholder="Productivity (1–5)"
                  type="number"
                  min="1"
                  max="5"
                  value={productivity}
                  onChange={(e) => setProductivity(e.target.value)}
              />
            </div>
            <input
                placeholder="Topics covered"
                value={topics}
                onChange={(e) => setTopics(e.target.value)}
            />
            <button className="btn-primary" onClick={handleAdd}>
              Add session
            </button>
          </div>
        </section>

        <section className="section">
          <h2>Recent sessions</h2>
          {loading ? (
              <div className="loading">Loading...</div>
          ) : sessions.length === 0 ? (
              <div className="empty">A blank page awaits.</div>
          ) : (
              <div className="session-list">
                {sessions.map(session => (
                    <div key={session._id} className="session-card">
                      <div className="session-header">
                        <div className="session-course">{session.course}</div>
                        <button
                            className="btn-danger"
                            onClick={() => handleDelete(session._id)}
                            aria-label="Delete session"
                            title="Delete session"
                        >
                          ×
                        </button>
                      </div>
                      <div className="session-meta">
                  <span className="session-meta-item">
                    <span className="session-meta-label">Duration</span>
                    {session.duration} min
                  </span>
                        {session.productivity !== undefined && (
                            <span className="productivity-pill">
                      Productivity {session.productivity}/5
                    </span>
                        )}
                      </div>
                      <div className="session-topics">{session.topics}</div>
                    </div>
                ))}
              </div>
          )}
        </section>
      </div>
  )
}

export default App