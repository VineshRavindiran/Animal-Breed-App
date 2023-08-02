import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SingleDogOverlay from "./SingleDogOverlay";
import styles from "./HomePage.module.css";
import OverlayModal from "./OverlayModal";

const HomePageOne = () => {
  const [dogs, setDogs] = useState([]);
  const [text, setText] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  useEffect(() => {
    const fetchDogData = async () => {
      try {
        const res = await fetch("https://api.thedogapi.com/v1/breeds");
        const data = await res.json();
        setDogs(data);
        console.log(data);
      } catch (error) {
        // console.log(error);
      }
    };
    fetchDogData();
  }, []);
  const dogSearch = async () => {
    try {
      const res = await fetch(
        `https://api.thedogapi.com/v1/breeds/search?q=${text}`
      );
      const data = await res.json();
      setDogs(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    setShowInfo(true);
    console.log(showInfo);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dogSearch();
  };
  return (
    <>
      <div>
        <div className="">Welcome to The dog breed info list</div>
        <form onSubmit={handleSubmit}>
          <input
            className={styles.input}
            input="text"
            name="search"
            id="search"
            placeholder="What breed you want?"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></input>
          <button type="submit">Submit</button>
        </form>
        <div className={styles.component} loading="lazy">
          {/* {dogs.map((dog) => (
            <Link to={`/${dog.name}`}>
              <div key={dog.id}>
                <img
                  className={styles.size}
                  src={dog.image.url}
                  alt={dog.name}
                />
                <h3 className={styles.titletext}>{dog.name}</h3>
                <p className={styles.ptext}>Uses: {dog.bred_for}</p>
              </div>
            </Link>
          ))} */}

          {dogs.map((dog) => (
            <div key={dog.id}>
              <img
                className={styles.size}
                src={`https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`}
                alt={dog.name}
              ></img>
              <button onClick={handleClick}>Click here for info</button>
              {/* <img
                  className={styles.size}
                  src={dog.image.url}
                  alt={dog.name}
                /> */}
              <h3 className={styles.titletext}>{dog.name}</h3>
              <p className={styles.ptext}>Uses: {dog.bred_for}</p>
              {showInfo && (
                <OverlayModal
                  name={dog.name}
                  bred_for={dog.bred_for}
                  metric={dog.weight.metric}
                  setShowInfo={setShowInfo}
                  img={dog.reference_image_id}
                ></OverlayModal>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* <div className="containter">The dog Element</div>
      <h2>Page One</h2>
      <ul>
        <Link to="/page-one/a">A</Link>
      </ul>
      <ul>
        <Link to="/page-one/b">B</Link>
      </ul> */}
    </>
  );
};

export default HomePageOne;
