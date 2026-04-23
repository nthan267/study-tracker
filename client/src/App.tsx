import { useState, useEffect } from 'react'
import './App.css'

/*
The Session type — now matches what the backend returns
Backend uses _id (MongoDB), not id
 */
type Session = {
  _id: string;
  course: string;
  duration: number;
  topics: string;
  notes?: string;
  date?: string;
  productivity?: number;
};

const API_URL = 'http://localhost:5000/api/sessions'

function App() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)

  // Form state
  const [course, setCourse] = useState('')
  const [duration, setDuration] = useState('')
  const [topics, setTopics] = useState('')
  const [productivity, setProductivity] = useState('3')

  // Fetch sessions when the component first mounts
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
      setSessions(sessions.filter(session => session._id !== id))
    } catch (err) {
      console.error('Failed to delete session:', err)
    }
  }

  if (loading) return <p>Loading...</p>

  return (
      <div>
        <h1>Study Tracker</h1>

        <div>
          <h2>Add a Session</h2>
          <input
              placeholder="Course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
          />
          <input
              placeholder="Duration (min)"
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
          />
          <input
              placeholder="Topics"
              value={topics}
              onChange={(e) => setTopics(e.target.value)}
          />
          <input
              placeholder="Productivity (1-5)"
              type="number"
              min="1"
              max="5"
              value={productivity}
              onChange={(e) => setProductivity(e.target.value)}
          />
          <button onClick={handleAdd}>Add Session</button>
        </div>

        <h2>Sessions</h2>
        {sessions.length === 0 ? (
            <p>No sessions yet. Add your first one above.</p>
        ) : (
            sessions.map(session => (
                <div key={session._id}>
                  <h3>Course: {session.course}</h3>
                  <p>Time worked: {session.duration} min</p>
                  <p>Topics: {session.topics}</p>
                  {session.productivity && <p>Productivity: {session.productivity}/5</p>}
                  <button onClick={() => handleDelete(session._id)}>Delete</button>
                </div>
            ))
        )}
      </div>
  )
}

export default App