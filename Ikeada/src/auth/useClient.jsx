import credentials from './credentials.jsx'
import { useNavigate } from "react-router-dom";


export default async function useClient(email, password) {
    const key = credentials.supabaseKey
    const url = credentials.supabaseUrl
    console.log(supabase)
    console.log(credentials)

}

