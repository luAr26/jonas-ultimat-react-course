/** @format */

import PropTypes from "prop-types";
import styles from "./CityList.module.css";

import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";

function CityList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message='Add your first city by clicking on a city on the map' />
    );

  return (
    <ul className={`no-scroll ${styles.cityList}`}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}

CityList.propTypes = {
  cities: PropTypes.arrayOf(
    PropTypes.shape({
      cityName: PropTypes.string,
      country: PropTypes.string,
      emoji: PropTypes.string,
      date: PropTypes.string,
      notes: PropTypes.string,
      position: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number,
      }),
      id: PropTypes.string,
    })
  ),
  isLoading: PropTypes.bool,
};

export default CityList;
