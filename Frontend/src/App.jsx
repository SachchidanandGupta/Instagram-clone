import { RouterProvider } from "react-router";
import AppRoutes from "./Approutes";
 import './styles.scss'
 import { AuthProvider } from "./features/auth/auth.context.jsx";
const App = () => {
  return (
     <AuthProvider>
        <AppRoutes/>
      </AuthProvider>
  )
}

export default App