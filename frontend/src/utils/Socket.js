import io from "socket.io-client"

export const createSocketConnection = ()=>{
    return io("https://dev-tinder-server-zfwo.onrender.com/", {withCredentials:true})
}