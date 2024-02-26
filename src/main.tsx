import "./index.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Router } from "./routes/routes";
import { UserProvider } from "./context/UserContext";
import { ListProvider } from "./context/ListContext";
import { FrameProvider } from "./context/FrameContext";
import { CardProvider } from "./context/CardContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <UserProvider>
        <FrameProvider>
          <ListProvider>
            <CardProvider>
              <Router />
            </CardProvider>
          </ListProvider>
        </FrameProvider>
      </UserProvider>
    </AuthProvider>
  </BrowserRouter>
);