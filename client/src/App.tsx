import { useState } from 'react'
import './App.css'

/*
create a session type with values required
 */
type Session = {
  id: number;
  course: string;
  duration: number;
  topics: string;
  confidence : number;
};

/*
Initiated a couple sessions
 */

const initialSessions: Session[] = [
  {id: 1, course: 'Data Structures & Algorithm', duration: 35, topics: 'Binary Trees', confidence:3},
  {id: 2, course: 'Personal Project', duration: 45, topics: 'Frontend Development', confidence:4},
  {id: 3, course: 'Engineering economics', duration: 45, topics: 'Taxation', confidence:5}
];



/*
Component that makes the app work
handles state and form fields
handles adding, displaying and deleting sessions
 */

function App() {
  // State: the list of sessions
  const [sessions, setSessions] = useState<Session[]>(initialSessions)

  // State: the form fields
  const [course, setCourse] = useState('')
  const [duration, setDuration] = useState('')
  const [topics, setTopics] = useState('')
  const [confidence, setConfidence] = useState('5')


  // Runs when the user clicks "Add Session"
  const handleAdd = () => {
    const newSession: Session = {
      id: Date.now(),
      course: course,
      duration: Number(duration),
      topics: topics,
      confidence: Number(confidence),
    }
    setSessions([newSession, ...sessions])

    // Reset the form fields
    setCourse('')
    setDuration('')
    setTopics('')
    setConfidence('3')
  }

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
              placeholder="Confidence (1-5)"
              type="number"
              min="1"
              max="5"
              value={confidence}
              onChange={(e) => setConfidence(e.target.value)}
          />
          <button onClick={handleAdd}>Add Session</button>
        </div>


        <h2>Sessions</h2>
        {sessions.map(session => (
            <div key={session.id}>
              <h3>Course: {session.course}</h3>
              <p>Time worked: {session.duration} min</p>
              <p>Topics: {session.topics}</p>
              <p>Confidence: {session.confidence}</p>
            </div>
        ))}
      </div>
  );
}

export default App