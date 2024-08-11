import { View, Text, TextInput, ActivityIndicator } from 'react-native'
import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import useSendMessage from '../hooks/useSendMessage';

const TextMessage = () => {
  const [message, setMessage] = useState("");
  const { loading, sendConversation } = useSendMessage();
  const postMessage = async () => {
    // console.log('sendMessage', sendMessage)
    if (!message) return;
    await sendConversation(message);
    setMessage("")
  }
  return (
    <View style={{ padding: 7, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
      <TextInput value={message} onChangeText={setMessage} style={{ padding: 5, fontSize: 19, width: "93%" }} placeholder='Message' />
      {loading == true ?
        <ActivityIndicator size="small" color="purple" />
        : <Ionicons onPress={postMessage} name="send" size={32} color="blue" />}
    </View>
  )
}

export default TextMessage