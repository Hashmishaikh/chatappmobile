import { useState } from "react";
import { privateRequest } from "../api/privateRequest";
import useConversation from "../zustand/useConversation";

const useSendMessage = () => {
    // const [sendMessage, setSendMessage] = useState("");
    const [loading,setLoading] = useState(false)
    const { messages, setMessages, selectedConversation } = useConversation();
    const sendConversation = async (message) => {
        setLoading(true)
        try {
          let data = await privateRequest.post(`/api/messages/send/${selectedConversation._id}`, { message: message });
          if (data.error) throw new Error(data.error);
          console.log('data', data.data)
        //   setSendMessage([...sendMessage,data])
        setMessages([...messages, data.data]);
        } catch (error) {
            console.log('error', error)
        }finally{
            setLoading(false)
        }

    }

    return {sendConversation,loading}
}

export default useSendMessage;