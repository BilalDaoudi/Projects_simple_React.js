import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import DarkModeToggle from "./components/DarkModeToggle";
import Footer from "./components/Footer";
import "./styles.css";

function App() {
  return (
    <div>
      <DarkModeToggle />
      <Header />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
}

export default App;
