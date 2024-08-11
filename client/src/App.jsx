import { Routes, Route } from "react-router-dom"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import SignUp from "./Pages/SignUp"
import SideBar from "./Components/SideBar"
import Donate from "./Pages/Donate"
import Receive from "./Pages/Receive"
import PrivateRoute from "./Components/PrivateRoute"
import FrontPage from "./Pages/FrontPage"
import NewsFeed from "./Components/NewsFeed"
import Donations from "./Pages/Donations"
import About from "./Pages/About"

function App() {

  return (
     <Routes>
        <Route path="/" element={<FrontPage/>}/>
        <Route path="/sign-in"  element={<Login/>} />
        <Route path="/sign-up"  element={<SignUp/>} />
        <Route path="/about"  element={<About/>} />

        <Route element={<PrivateRoute/>}>
        <Route path="/home"  element={<Home/>} />
        <Route path="/donate/:donorId"  element={<Donate/>} />
        <Route path="/donations" element={<Donations/>}/>
        <Route path="/receive/:donationId"  element={<Receive/>} /> 
        <Route path="/newsfeeds"  element={<NewsFeed/>} /> 
        </Route>
     </Routes>
  )
}

export default App
