import { View, Text, TextInput, ImageBackground, Button, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { styles } from '../style';
import useLogin from '../hooks/useLogin';
const LogoImage = require("../assets/galaxy.jpg")

const Login = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { loading, login } = useLogin();
    const handleLogin = async () => {
        // console.log('username', username);
        // console.log('password', password);
        await login(username, password);
        // navigation.navigate('Home')
    }
    return (
        <View>
            <ImageBackground source={LogoImage} style={{ resizeMode: 'cover', width: "100%", height: "100%" }}>
                <View style={styles.container}>
                    <View style={styles.outerCard}>
                        <Text style={[styles.textColor, { textAlign: "center" }]}>Login Chat</Text>
                        <View style={{ padding: 10 }}>
                            <View style={{ margin: 4 }}>
                                <Text style={styles.textColor}>Username</Text>
                                <TextInput value={username} onChangeText={setUsername} placeholder='username' style={{ fontSize: 18, color: "#fff", padding: 5, borderColor: "#fff", borderWidth: 2, borderRadius: 6 }} />
                            </View>
                            <View style={{ margin: 4 }}>
                                <Text style={styles.textColor}>Password</Text>
                                <TextInput value={password} onChangeText={setPassword} placeholder='***' style={{ fontSize: 18, color: "#fff", padding: 5, borderColor: "#fff", borderWidth: 2, borderRadius: 6 }} />
                            </View>
                            <View style={{ margin: 4 }}>
                                <Text style={styles.textColor}>don't have account</Text>
                                {loading == true ?
                                <View style={{backgroundColor:"purple",borderRadius:6,paddingLeft : 10,
                                    paddingRight : 10,paddingTop:5,
                                    paddingBottom:5}}>
                                    <ActivityIndicator size="small" color="#fff" />
                                </View>
                                    : <TouchableOpacity
                                        style={styles.loginScreenButton}
                                        onPress={handleLogin}
                                        underlayColor='#fff'>
                                        <Text style={styles.loginText}>Login</Text>
                                    </TouchableOpacity>}
                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

export default Login