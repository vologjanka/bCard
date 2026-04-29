import './App.css'
import AboutMe from './components/AboutMe'
import FullName from './components/FullName'
import ProfilePhoto from './components/ProfilePhoto'

function App() {
  return (
    <main className="page">
      <FullName />
      <section className="content-row">
        <ProfilePhoto />
        <AboutMe />
      </section>
    </main>
  )
}

export default App
