import React from "react";
import { useNavigate } from "react-router-dom";

export const OK = () => {
    const navigate = useNavigate();

    return (
        <div className="ok-container">
            <h2>Оплата...</h2>
            <p>Ваш платеж обрабатывается. Спасибо за покупку!</p>
            <button className="back-btn" onClick={() => navigate("/")}>
                Вернуться к сертификатам
            </button>
        </div>
    );
};
