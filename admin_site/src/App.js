import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddProductForm from "./products/AddProduct";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AddProductForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
