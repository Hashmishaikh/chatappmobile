import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

export const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext)
}

export const SoketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser,authIdS } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const socket = io("https://gade-chat.onrender.com/", {
        query: {
          userId: authIdS,
        },
      });
      setSocket(socket);

      // socket.on() is used in listen to the event.can be used in both on client and server side
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });
      return () => socket.close();
    } else {
      if (socket) {
        socket?.close();
        setSocket(null);
      }
    }
  }, [authUser]);
  // console.log('socket', socket)
  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
