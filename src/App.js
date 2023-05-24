import Registerpage from "./pages/Registerpage";
 import LoginPage from "./pages/LoginPage";
import DashboardPage from"./pages/Dashboard";

 
import { BrowserRouter,Route,Routes} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
         <Routes>
        
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/dashboard" element={<DashboardPage/>}/>
          <Route path="/" element={<Registerpage/>}/>
          <Route path="/register" element={<Registerpage/>}/>
         </Routes>
       
      </BrowserRouter>
      
    </div>
  );
}

export default App;

