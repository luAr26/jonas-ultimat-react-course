/** @format */

// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState } from "react";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Form.module.css";
import "react-datepicker/dist/react-datepicker.css";

import Button from "./Button";
import ButtonBack from "./ButtonBack";
import Message from "./Message";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";

import { convertToEmoji } from "../utils";
import { getCountryName } from "../utils/index";
import { useCities } from "../hooks/useCities";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [lat, lng] = useUrlPosition();
  const { createCity, isLoading } = useCities();
  const navigate = useNavigate();
  console.log(lat, lng);
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");

  const [geocodingError, setGeocodingError] = useState("");

  const emoji = convertToEmoji(country);

  console.log(isLoadingGeocoding);

  useEffect(() => {
    if (!lat && !lng) return;
    async function fetchCityData() {
      try {
        setIsLoadingGeocoding(true);
        setGeocodingError("");
        const response = await fetch(
          `${BASE_URL}?latitude=${lat}&longitude=${lng}`
        );
        const data = await response.json();
        if (!data.countryCode)
          throw new Error(
            "That doesn't seem to be a city. Click somewhere else 😊."
          );
        setCityName(data.city || data.locality || "");
        setCountry(data.countryCode || "");
      } catch (error) {
        setGeocodingError(error.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }

    fetchCityData();
  }, [lat, lng]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date || !notes) return;

    const newCity = {
      cityName,
      country: getCountryName(country),
      emoji: convertToEmoji(country),
      date,
      notes,
      position: { lat, lng },
    };

    await createCity(newCity);
    navigate("/app/cities");
  }

  if (!lat && !lng)
    return <Message message='Start by clicking somewhere on the map. 😉' />;

  if (isLoadingGeocoding) return <Spinner />;

  if (geocodingError) return <Message message={geocodingError} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor='cityName'>City name</label>
        <input
          id='cityName'
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor='date'>When did you go to {cityName}?</label>
        <DatePicker
          id='date'
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat='dd/MM/yyyy'
        />
      </div>

      <div className={styles.row}>
        <label htmlFor='notes'>Notes about your trip to {cityName}</label>
        <textarea
          id='notes'
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type='primary'>Add</Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;
