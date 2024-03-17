/** @format */

import React from "react";
import "./App.css";

import Weather from "./components/Weather";

function convertToFlag(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "lisbon",
      isLoading: false,
      displayLocation: "",
      weather: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.fetchWeather = this.fetchWeather.bind(this);
  }

  handleChange(e) {
    this.setState(() => {
      return {
        location: e.target.value,
      };
    });
  }

  async fetchWeather() {
    console.log("Loading data");
    console.log(this);

    try {
      // 1) Getting location (geocoding)
      this.setState({ isLoading: true });
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${this.state.location}`
      );
      const geoData = await geoRes.json();
      console.log(geoData);

      if (!geoData.results) throw new Error("Location not found");

      const { latitude, longitude, timezone, name, country_code } =
        geoData.results.at(0);
      console.log(`${name} ${convertToFlag(country_code)}`);
      this.setState({
        displayLocation: `${name} ${convertToFlag(country_code)}`,
      });

      // 2) Getting actual weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      const weatherData = await weatherRes.json();
      console.log(weatherData.daily);
      this.setState({ weather: weatherData.daily });
    } catch (err) {
      console.log(err);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    return (
      <div className='app'>
        <h1>Classy Weather</h1>

        <input
          type='text'
          placeholder='Search for location...'
          value={this.props.location}
          onChange={this.handleChange}
        />
        <button
          onClick={this.fetchWeather}
          className='button-17'
          disabled={this.state.isLoading}
        >
          {this.state.isLoading ? "Loading..." : "Get Weather"}
        </button>
        {this.state.weather.weathercode && (
          <Weather
            weather={this.state.weather}
            location={this.state.displayLocation}
          />
        )}
      </div>
    );
  }
}

export default App;
