import { Route, Router, Routes } from "react-router-dom";
import Pokolist from "../PokoList/Pokolist";
import IndPok from "../IndiviPoke/IndPok";

export default function Routpath() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Pokolist></Pokolist>} />
        <Route path="/pokemon/:id" element={<IndPok />} />
      </Routes>
    </>
  );
}
