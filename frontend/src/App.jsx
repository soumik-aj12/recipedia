import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { SavedRecipePage } from "./pages/SavedRecipePage";
import { Create } from "./pages/Create";
import { Auth } from "./pages/Auth";

import { Nav } from "./components/Nav";
import { Created } from './pages/Created';
import { ContextProvider } from './Context/ContextProvider';
function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/create_recipe" element={<Create/>} />
        <Route path="/auth" element={<Auth/>} />
        <Route path="/saved" element={<SavedRecipePage/>} />
        <Route path="/created" element={<Created/>} />

      </Routes>
    </BrowserRouter>
    </ContextProvider>
  )
}

export default App
