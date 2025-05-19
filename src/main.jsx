import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import InvoiceForm from "./invoiceform.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <InvoiceForm />
  </StrictMode>
);
