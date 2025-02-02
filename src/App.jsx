import React from "react";
import "./styles.css";
import { CertificateList } from "./components/CertificateList";
import { Form } from "./components/Form";

const App = () => {
    return (
        <>
            <CertificateList />
            <Form />
        </>
    );
};

export default App;
