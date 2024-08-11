import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native';
import Home from './Screen/Home';
import Login from './Screen/Login';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { AuthContextProvider, useAuthContext } from './context/AuthContext';
import useLogout from './hooks/useLogout';
import Chat from './Screen/Chat';
import { SoketContextProvider } from './context/SocketContext';
// import { AuthContextProvider } from './context'
const Stack = createNativeStackNavigator();
export default function App() {

  return (
      <AuthContextProvider>
        <SoketContextProvider>
        <Layout />
        </SoketContextProvider>
      </AuthContextProvider>
  );
}
export const Layout = () => {
  const {authUser}  = useAuthContext()
  const {logout} = useLogout()
  return (
    <NavigationContainer>
      <StatusBar backgroundColor='#fff' />
      <Stack.Navigator>
        {authUser===false? <Stack.Screen name="Login" component={Login} options={{
          headerShown: false
        }} /> :
        <>
          <Stack.Screen name="Home" component={Home} options={{
            headerRight:() => <Button onPress={() => logout()} title='signout'/>
          }} />
          <Stack.Screen name="Chat" component={Chat} options={{title:"Chat"}} />
          
          </>
          }
      </Stack.Navigator>
    </NavigationContainer>
  )
}
