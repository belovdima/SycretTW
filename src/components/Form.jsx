import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MaskInput from "react-maskinput";

export const Form = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [certificate, setCertificate] = useState(null);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchCertificate = async () => {
            try {
                const response = await fetch("/api/service/api/api", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        ApiKey: "011ba11bdcad4fa396660c2ec447ef14",
                        MethodName: "OSGetGoodList",
                    }),
                });

                const data = await response.json();
                if (data.result === 0) {
                    const selectedCert = data.data.find(
                        (cert) => cert.ID === id
                    );
                    setCertificate(selectedCert);
                }
            } catch (error) {
                console.error("Ошибка загрузки сертификата:", error);
            }
        };

        fetchCertificate();
    }, [id]);

    const validateForm = () => {
        const newErrors = {};
        if (!name.trim()) newErrors.name = "ФИО обязательно";
        if (!phone.match(/\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}/))
            newErrors.phone = "Номер телефона неверен";
        if (!email.match(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/))
            newErrors.email = "Некорректный email";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const saleData = {
                ApiKey: "011ba11bdcad4fa396660c2ec447ef14",
                MethodName: "OSSale",
                GoodId: certificate?.ID,
                Phone: phone,
                Email: email,
                Name: name,
                Message: message,
            };

            try {
                const response = await fetch("/api/service/api/api", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(saleData),
                });

                const data = await response.json();
                if (data.result === 0) {
                    console.log("Данные успешно сохранены:", data);
                    navigate("/ok");
                } else {
                    console.error("Ошибка API:", data.resultdescription);
                    alert("Ошибка при сохранении данных.");
                }
            } catch (error) {
                console.error("Ошибка запроса:", error);
                alert("Не удалось отправить данные.");
            }
        }
    };

    return (
        <div className="form-container">
            <h2>Оформление сертификата</h2>

            {certificate ? (
                <p className="selected-certificate">
                    Вы выбрали: {certificate.NAME} ({certificate.SUMMA}₽)
                </p>
            ) : (
                <p>Загрузка сертификата...</p>
            )}

            <form onSubmit={handleSubmit}>
                <label>ФИО*</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <p className="error">{errors.name}</p>}

                <label>Номер телефона*</label>
                <MaskInput
                    mask="+7 (000) 000-00-00"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="input"
                    placeholder="+7 (___) ___-__-__"
                />
                {errors.phone && <p className="error">{errors.phone}</p>}

                <label>Сообщение</label>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />

                <label>Почта*</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="error">{errors.email}</p>}

                <div className="button-group">
                    <button
                        type="button"
                        className="close-btn"
                        onClick={() => navigate("/")}>
                        Назад
                    </button>
                    <button type="submit" className="submit-btn">
                        Перейти к оплате
                    </button>
                </div>
            </form>
        </div>
    );
};
