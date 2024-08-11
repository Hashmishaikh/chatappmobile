import { useAuthContext } from "../context/AuthContext";
import * as SecureStore from 'expo-secure-store';

const useLogout = () => {
    const { setAuthUser } = useAuthContext();
    const logout = async () => {
        await SecureStore.deleteItemAsync("token")
        setAuthUser(false)
    }
    return { logout }
}

export default useLogout;