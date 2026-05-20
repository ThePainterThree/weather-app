import { useState } from "react"
import Header from "./Header"

function App() {
  const [temperature, setTemperature] = useState("")
  return(
    <main>
      <h1>Weather Dashboard</h1>
      <p>Tracking weather metrics in real time.</p>
      <Header title="Temparature Overview"></Header>
      <Header title="Sea Level Rise"></Header>
    </main>
  )
}

export default App