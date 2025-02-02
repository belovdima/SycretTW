import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const CertificateList = () => {
    const API_URL = "/api/service/api/api";
    const API_KEY = "011ba11bdcad4fa396660c2ec447ef14";

    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCertificates = async () => {
            try {
                const response = await fetch(API_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        ApiKey: API_KEY,
                        MethodName: "OSGetGoodList",
                    }),
                });

                const data = await response.json();

                if (data.result !== 0) {
                    throw new Error(`Ошибка API: ${data.resultdescription}`);
                }

                setCertificates(
                    data.data.map((cert) => ({
                        id: cert.ID,
                        name: cert.NAME,
                        price: `${cert.SUMMA}₽`,
                    }))
                );
            } catch (error) {
                console.error("Ошибка при получении сертификатов:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCertificates();
    }, []);

    return (
        <div className="container">
            <h1>Выберите сертификат</h1>

            {loading && <p>Загрузка...</p>}
            {error && <p className="error">{error}</p>}

            {!loading && !error && (
                <div className="grid">
                    {certificates.map((cert) => (
                        <div key={cert.id} className="card">
                            <h3>{cert.name}</h3>
                            <p className="price">{cert.price}</p>
                            <button
                                onClick={() => navigate(`/form/${cert.id}`)}>
                                Оформить
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
