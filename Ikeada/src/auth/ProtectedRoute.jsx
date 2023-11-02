import { Navigate } from "react-router-dom";
import useLocalStorage from "./useLocalStorage";
// en chantier
export async function ProtectedRoute({ children }) {
  const { user } = useLocalStorage()
  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  } else {
    return children;
  }
}