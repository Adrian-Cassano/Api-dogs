import React, { useState } from "react";

import { useSelector } from "react-redux";

import Select from "../../components/DisplaySelectOption/Select";
import Card from "../../components/Card";
import Title from "../../components/Title/Title";

import styles from "./Home.module.css";
import { NavLink } from "react-router-dom";

var i = 1;
var minimo = 0;
var maximo = 9;

const Home = () => {
  const dogsStore = useSelector((state) => state.dogsSlice.dogs);

  const [dogs, setDogs] = useState(dogsStore);

  const [NumPage, setNumPage] = useState(i);

  var promedio = dogs.length / 10;

  const handleInputChange = (e) => {
    const search = e.target.value.replace(/[^A-Za-z ]/gi, "");

    var perrosFiltrados = dogsStore?.filter((dog) =>
      dog.name.toLowerCase().toString().includes(search)
    );

    setNumPage(1);
    minimo = 0;
    maximo = 9;
    i = 1;

    setDogs(perrosFiltrados);
  };

  const buttonNext = () => {
    setNumPage(NumPage + 1);
    i++;
    minimo = maximo;
    maximo = i * 9;
  };
  const buttonPrev = () => {
    if (i <= 1) {
      return null;
    }
    i--;
    setNumPage(NumPage - 1);
    if (minimo <= 1) {
      return null;
    }
    minimo = minimo - 9;
    maximo = maximo - 9;
  };

  return (
    <div>
      <Title />
      <div id={styles.MasterContainer}>
        <div id={styles.NavBarContainer}>
          <div>
            <input
              maxLength="30"
              onEmptied={handleInputChange}
              onChange={handleInputChange}
              id={styles.Search}
              type="text"
              placeholder="Search"
            />
          </div>
          <Select />
          <div id={styles.ButtonContainer}>
            <NavLink to={"/createCard"} id={styles.ButtonCreate}>
              Create New Card
            </NavLink>
          </div>
        </div>
      </div>
      <div id={styles.CardsContainer}>
        {dogs?.map((dog, index) => {
          return (
            <Card
              key={index + dog.id}
              id={dog.id}
              index={index}
              name={dog.name}
              image={dog.image.url}
              minimo={minimo}
              maximo={maximo}
            />
          );
        })}
      </div>
      <div id={styles.ContainerNumPage}>
        {i !== 1 && (
          <button className={styles.ButtonPage} onClick={buttonPrev}>
            «
          </button>
        )}
        <div id={styles.NumPage}>{NumPage}</div>
        {i !== Math.trunc(promedio) &&
          dogsStore.length !== 0 &&
          dogs.length > 10 && (
            <button className={styles.ButtonPage} onClick={buttonNext}>
              »
            </button>
          )}
      </div>
    </div>
  );
};

export default Home;
