import { useEffect, useState } from "react";
import { privateRequest } from "../api/privateRequest";
import useConversation from "../zustand/useConversation";

const useFetchMessage = () => {
    // const [conversation,setConversation] = useState([]);
    const [loading, setLoading] = useState(false);
    const { messages, setMessages,selectedConversation } = useConversation();

    useEffect(() => {
        const fetchMessage = async () => {
            setLoading(true)
            try {
                const data = await privateRequest.get(`/api/messages/${selectedConversation._id}`);
                //    console.log('getdatamessage', data.data);
                //    setConversation(data.data)
                setMessages(data.data);
            } catch (err) {
                console.log('err', err)
            } finally {
                setLoading(false)
            }
        }
        if (selectedConversation._id) fetchMessage();
    }, [selectedConversation._id, setMessages])

    return { loading, messages }
}

export default useFetchMessage;