import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './Screens/LoginPage';
import Dashboard from "./Screens/Dashboard";
import Protected from "./Components/Protected";


function AuthNavigator() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/me" element={
            <Protected>
        <Dashboard />
            </Protected>
        }></Route>
  
    </Routes>

    </BrowserRouter>
  );
}
export default AuthNavigator;