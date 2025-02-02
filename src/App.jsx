import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./styles.css";
import { CertificateList } from "./components/CertificateList";
import { Form } from "./components/Form";
import { OK } from "./components/OK";

const App = () => {
    return (
        <Router basename="/SycretTW">
            <Routes>
                <Route path="/" element={<CertificateList />} />
                <Route path="/form/:id" element={<Form />} />
                <Route path="/ok" element={<OK />} />
            </Routes>
        </Router>
    );
};

export default App;
