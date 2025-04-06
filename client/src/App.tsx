import { Outlet } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import useAuth from "../../hooks/useAuth";

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <main className="container mt-5">
        <Outlet />
      </main>
    </>
  );
}

export default App;
