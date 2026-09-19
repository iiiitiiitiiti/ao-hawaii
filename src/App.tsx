import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import "./styles.css";
import "./instruments/styles.css";

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AppRoutes />
    </BrowserRouter>
  );
}
