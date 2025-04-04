import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { Login, Register } from "./components/Auth/index.js";
import { Home ,Profile} from "./components/index.js";
import store from "../store/store.js";
import { Provider } from "react-redux";
import VideoPlayer from "./components/Video/VideoPlayer.jsx";
import {Studio} from "./components/Studio/index.js"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
const router = createBrowserRouter([
  {                                                                                                                                                                                                                                                                                                                                                                                                                                                   
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/:videoId",
        element: <VideoPlayer/>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/studio",
        element: <Studio />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>
);
