import { useState } from "react";
import { Alert } from "react-native";
import { publicRequest } from "../api/publicRequest";
import * as SecureStore from 'expo-secure-store';
import { useAuthContext } from '../context/AuthContext';

const useLogin = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const login = async (username, password) => {
        // console.log('usernamelog', username)
		const success = handleInputErrors(username, password);
		if (!success) return;
		setLoading(true);
		try {
			const data = await publicRequest.post(`/api/auth/login`,{ username, password });
            console.log('data', data.data);
			await SecureStore.setItemAsync("token",data.data.token);
			await SecureStore.setItemAsync("authid",data.data._id)
			setAuthUser(true);
		} catch (error) {
			Alert.alert(error.message);
            console.log('error', error)
		} finally {
			setLoading(false);
		}
	};

	return { loading, login };
};
export default useLogin;

function handleInputErrors(username, password) {
	if (!username || !password) {
		Alert.alert("Please fill in all fields");
		return false;
	}

	return true;
}