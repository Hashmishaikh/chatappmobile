import { View, Text, ScrollView, Image, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useRef } from 'react'
import useFetchMessage from '../hooks/useFetchMessage';
import TextMessage from '../component/TextMessage';
import useConversation from '../zustand/useConversation';
import useListenMessages from '../hooks/useListenMessage';

const Chat = ({ route }) => {
  const { profile } = route.params;
  const scrollViewRef = useRef(null);
  const { selectedConversation} = useConversation();
  // console.warn("messages",selectedConversation)
  const { messages, loading } = useFetchMessage();
  useListenMessages();
  // console.log('messages in chat', messages)

  return (
    <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={100} style={{ flex: 1 }}>
      <ScrollView style={{ maxHeight: "90%" }} ref={scrollViewRef} onContentSizeChange={() => { scrollViewRef.current?.scrollToEnd() }}>
        {!loading &&
          messages.length > 0 && messages?.map((messages) => (<View key={messages._id}>
          {messages.senderId == selectedConversation._id ? <View style={{ flexDirection: "row", padding: 10, alignItems: "center" }}>
            <Image style={{ borderColor: "white", borderWidth: 2, borderRadius: 50, width: 50, height: 50 }} source={{uri: profile  }} />
            <Text style={{ backgroundColor: "red", padding: 10, borderRadius: 10, color: "#fff", fontWeight: "600",maxWidth:"90%" }}>{messages.message}</Text>
          </View> :
            <View style={{ flexDirection: "row-reverse", padding: 10, alignItems: "center" }}>
              <Image style={{ borderColor: "white", borderWidth: 2, borderRadius: 50, width: 50, height: 50 }} source={{  uri: "https:cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png" }} />
              <Text style={{ backgroundColor: "red", padding: 10, borderRadius: 10, color: "#fff", fontWeight: "600",maxWidth:"90%" }}>{messages.message}</Text>
            </View>}
        </View>))}
      </ScrollView>
      <View style={{ position: "absolute", bottom: 0, margin: 10, borderColor: "pruple", borderWidth: 1, width: "95%", borderRadius: 8 }}>
        <TextMessage  />
      </View>
    </KeyboardAvoidingView>
  )
}

export default Chat