import { useState, useEffect } from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
const WeatherApp = () => {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const fetchWeatherData = () => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const apiKey = '3709f89e826c2838310e77a773533f2d'; // Replace with your OpenWeatherMap API key

                    fetch(
                        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
                    )
                        .then((response) => response.json())
                        .then((data) => {
                            console.log(data);
                            setWeatherData({
                                cityName: data.name,
                                temperature: data.main.temp,
                                humidity: data.main.humidity,
                                description: data.weather[0].description,
                                sunrise: formatTime(data.sys.sunrise),
                                sunset: formatTime(data.sys.sunset),
                                wind: data.wind.speed,
                                weatherIcon: getWeatherIcon(data.weather[0].icon),
                            });
                        })
                        .catch((error) => {
                            console.error('Error fetching weather data:', error);
                        });
                },
                (error) => {
                    console.error('Error getting user location:', error);
                }
            );
        };

        fetchWeatherData();
    }, []);

    const formatTime = (unixTimestamp) => {
        const date = new Date(unixTimestamp * 1000);
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
        });
    };

    const getWeatherIcon = (iconCode) => {
        const weatherIcons = {
            '01d': 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/ilu1.webp',
            '01n': 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/ilu2.webp',
            '02d': 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/ilu3.webp',
            '02n': 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/ilu4.webp',
            // Add more mappings for other weather icons
        };

        return weatherIcons[iconCode] || 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/ilu1.webp';
    };


    if (!weatherData) {
        return <p>Loading weather data...</p>;
    }

    return (
        <section className="vh-100" style={{ backgroundColor: '#4B515D' }}>
            <MDBContainer className="h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol md="8" lg="6" xl="4">
                        <MDBCard style={{ color: '#4B515D', borderRadius: '35px' }}>
                            <MDBCardBody className="p-4">
                                <div className="d-flex">
                                    <MDBTypography tag="h6" className="flex-grow-1">
                                        {weatherData.cityName}
                                    </MDBTypography>
                                    <MDBTypography tag="h6">{new Date().toLocaleTimeString()}</MDBTypography>
                                </div>

                                <div className="d-flex flex-column text-center mt-5 mb-4">
                                    <MDBTypography
                                        tag="h6"
                                        className="display-4 mb-0 font-weight-bold"
                                        style={{ color: '#1C2331' }}
                                    >
                                        {Math.round(weatherData.temperature)}°C
                                    </MDBTypography>
                                    <span className="small" style={{ color: '#868B94' }}>
                                        {weatherData.description}
                                    </span>
                                </div>

                                <div className="d-flex align-items-center">
                                    <div className="flex-grow-1" style={{ fontSize: '1rem' }}>
                                        <div>
                                            <MDBIcon fas icon="wind fa-fw" style={{ color: '#868B94' }} />{' '}
                                            <span className="ms-1">{weatherData.wind} km/h</span>
                                        </div>
                                        <div>
                                            <MDBIcon fas icon="tint fa-fw" style={{ color: '#868B94' }} />{' '}
                                            <span className="ms-1">{weatherData.humidity}%</span>
                                        </div>
                                        <div>
                                            <MDBIcon fas icon="sun fa-fw" style={{ color: '#868B94' }} />{' '}
                                            <span className="ms-1">
                                                {weatherData.sunrise} - {weatherData.sunset}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <img src={weatherData.weatherIcon} width="100px" />
                                    </div>
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
};

export default WeatherApp;