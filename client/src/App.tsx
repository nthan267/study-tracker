import './App.css'
/*
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

const UserList = () => (
    <div>
      {users.map(user => (
          <div key={user.id}>User: {user.name}</div>
      ))}
    </div>
);
*/

type Session = {
  id: number;
  course: string;
  duration: number;
  topics: string;
  confidence : number;
};


const sessions: Session[] = [
  {id: 1, course: 'Data Structures & Algorithm', duration: 35, topics: 'Binary Trees', confidence:3},
  {id: 2, course: 'Personal Project', duration: 45, topics: 'Frontend Development', confidence:4},
  {id: 3, course: 'Engineering economics', duration: 45, topics: 'Taxation', confidence:5}
];




function App() {
  return (
      <div>
        <h1>Study Tracker</h1>
        {sessions.map(Session => (
            <div key={Session.id}>
              <h3>Course: {Session.course}</h3>
              <p>Time worked: {Session.duration} min</p>
              <p>Topics: {Session.topics}</p>
              <p>Confidence: {Session.confidence}</p>


            </div> ))}
      </div>


  );
}

export default App