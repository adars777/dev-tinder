import "./App.css";
import { Routes, Route, Navigate } from "react-router";
import { Provider } from "react-redux";

import appStore from "./utils/appStore";
import Body from "./pages/Body";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Connections from "./pages/Connections";
import Requests from "./pages/Requests";
import Chat from "./components/Chat";

function App() {
  return (
    <Provider store={appStore}>
      <Routes>
        <Route path="/" element={<Body />}>
          {/* DEFAULT ROUTE */}
          <Route index element={<Navigate to="/login" replace />} />

          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="feed" element={<Feed />} />
          <Route path="profile" element={<Profile />} />
          <Route path="connections" element={<Connections />} />
          <Route path="requests" element={<Requests />} />
          <Route path="chat/:targetUserId" element={<Chat />} />
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;
