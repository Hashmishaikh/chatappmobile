import { useState } from "react";
import { privateRequest } from "../api/privateRequest";

const useFetchList = () => {
    const [listed,setListed] = useState([]);

    const fetchChat = async () => {
        try {
         const data = await privateRequest.get(`/api/users`)
        //  console.log('listdata', data.data);
         setListed(data.data)
        } catch (error) {
            console.log('liksterror', error)
        }
    }

    return {fetchChat,listed}

}

export default useFetchList;