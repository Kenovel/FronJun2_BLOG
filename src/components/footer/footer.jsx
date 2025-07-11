import { useEffect, useState } from 'react';
import styled from 'styled-components';

const FooterContainer = ({ className }) => {
    const [city, setCity] = useState('');
    const [temperature, setTemperature] = useState('');
    const [weather, setWeather] = useState('');

    useEffect(() => {
        fetch(
            'https://api.openweathermap.org/data/2.5/weather?q=Moscow&units=metric&lang=ru&appid=bcd040c2db61b8892a44988260952ef9',
        )
            .then((response) => response.json())
            .then(({ name, main, weather }) => {
                setCity(name);
                setTemperature(Math.round(main.temp));
                setWeather(weather[0].description);
            });
    }, []);
    return (
        <footer className={className}>
            <div>
                <div>Блог веб-разработчика</div>
                <div>web@developer.ru</div>
            </div>
            <div>
                <div>
                    {city}, {new Date().toLocaleString('ru', { day: 'numeric', month: 'long' })}
                </div>
                <div>
                    {temperature} градусов, {weather}
                </div>
            </div>
        </footer>
    );
};

export const Footer = styled(FooterContainer)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1000px;
    height: 120px;
    padding: 20px 40px;
    box-shadow: 0 2px 15px #412b45;
    background-color: #f1e1f3;
    font-weight: bold;
`;
