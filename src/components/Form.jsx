import React from "react";
import MaskInput from "react-maskinput";

export const Form = ({ value, onChange }) => {
    return (
        <MaskInput
            mask="+7 (000) 000-00-00"
            value={value}
            onChange={onChange}
            className="input"
            placeholder="+7 (___) ___-__-__"
        />
    );
};
