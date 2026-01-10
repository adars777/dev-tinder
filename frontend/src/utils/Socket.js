import io from "socket.io-client"

export const createSocketConnection = ()=>{
    return io("https://dev-tinder-x0er.onrender.com/", {withCredentials:true})
}