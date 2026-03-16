import { RouterProvider } from "react-router";
import AppRoutes from "./Approutes";
 import './styles.scss'
 import { AuthProvider } from "./features/auth/auth.context";
const App = () => {
  return (
    <div>
      <AuthProvider>
        <AppRoutes/>
      </AuthProvider>
    </div>
  )
}

export default App