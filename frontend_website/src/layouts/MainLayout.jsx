import { Outlet } from "react-router-dom"

import TopStrip from "../components/TopStrip"
import Header from "../components/Header"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

function MainLayout() {
  return (
    <>
      <TopStrip />
      <Header />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default MainLayout