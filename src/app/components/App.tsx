import "../App.css";
import Router from "../routes/Router";
import { toast_timer } from "../shared/constants";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Router />
      <ToastContainer autoClose={toast_timer} />
    </div>
  );
}

export default App;