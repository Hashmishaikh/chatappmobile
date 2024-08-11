import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { styles } from '../style';
import useFetchList from '../hooks/useFetchList';
import { useSocketContext } from '../context/SocketContext';
import useConversation from '../zustand/useConversation';
import Octicons from '@expo/vector-icons/Octicons';


const Home = ({ navigation }) => {
const {fetchChat,listed} = useFetchList();
const { onlineUsers } = useSocketContext();
const { setSelectedConversation } = useConversation();

  const getViewList = async () => {
    await fetchChat();
  }

  const goToChat = (res) => {
    navigation.navigate('Chat',{
      id: res?._id,
      profile:res?.profilePic
    })
    setSelectedConversation(res)
  }

  useEffect(() => {
    getViewList();
  }, []);

  // console.log('socket', socket)




  return (
    <View style={{ width: "100%", height: "100%", backgroundColor: "#000" }}>
      <ScrollView>
        {listed.map((res) => (<TouchableOpacity key={res._id} onPress={() => goToChat(res)} style={{ flexDirection: "row", backgroundColor: "#fffafa", alignItems: "center", marginTop: 5, borderRadius: 6, shadowColor: "red", elevation: 10, marginBottom: 5 }}>
          <View style={{ padding: 20 }}>
            <View >
              <Image
                style={{ borderColor: "white", borderWidth: 2, borderRadius: 50, width: 50, height: 50 }}
                source={{uri:`${res?.profilePic}`}}
              // alt="user avatar"
              />
              <View style={{position:"absolute",right:2}}>
              <Octicons name="dot" size={19} color={onlineUsers.includes(res?._id)?"green":"grey"} />
              </View>
            </View>
          </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 5, alignItems: "center" }}>
              <Text>{res?.username}</Text>
              {/* <Text style={{textAlign:"right"}}>{onlineUsers.includes(res?._id)?"online":"offline"}</Text> */}
            </View>
        </TouchableOpacity>))}
      </ScrollView>
    </View>
  )
}

export default Home