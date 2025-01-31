import React from "react";
import "./styles.css";

const certificates = [
    {
        id: 1,
        name: "Сертификат SPA",
        price: "5000₽",
        description: "Расслабляющий отдых в СПА",
        img: "/images/spa.jpg",
    },
    {
        id: 2,
        name: "Полет на воздушном шаре",
        price: "10 000₽",
        description: "Незабываемые впечатления!",
        img: "/images/airbln.jpg",
    },
    {
        id: 3,
        name: "Урок гончарного дела",
        price: "3000₽",
        description: "Создай свой первый глиняный горшок",
        img: "/images/clay.jpg",
    },
];

const App = () => {
    return (
        <div className="container">
            <h1>Выберите сертификат</h1>
            <div className="grid">
                {certificates.map((cert) => (
                    <div key={cert.id} className="card">
                        <img
                            src={cert.img}
                            alt={cert.name}
                            className="card-img"
                        />
                        <h3>{cert.name}</h3>
                        <p>{cert.description}</p>
                        <p className="price">{cert.price}</p>
                        <button>Оформить</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
