import { AutenticacionProvider } from "./app/context/AutenticacionProvider"
import { AppRouter } from "./app/router/appRouter"


function App() {

  return (

    <AutenticacionProvider>
      <AppRouter />
    </AutenticacionProvider>

  )
}

export default App
