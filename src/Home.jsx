import { useEffect, useState } from "react";
import { Card } from "./components/Card";
import photo from "./assets/photoDeProfil.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReact,
  faHtml5,
  faSass,
  faCss3Alt,
  faJs,
} from "@fortawesome/free-brands-svg-icons";
import { faLanguage } from "@fortawesome/fontawesome-free-solid";
import { motion } from "framer-motion";
import "./css/home.css";

function Home() {
  const [data, setData] = useState();
  const [language, setLanguage] = useState("fr");

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("/data.json");
      const finalData = await data.json();
      setData(finalData);
    };
    fetchData();
  }, []);

  return (
    <>
      {!data ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <header>
            <nav className="navbar">
              <div
                className="language"
                onClick={() => {
                  language === "fr" ? setLanguage("en") : setLanguage("fr");
                }}
              >
                <FontAwesomeIcon icon={faLanguage} className="language-icon" size="xl" />
                <p>{data.languages[language]}</p>{" "}
                {/*map sur le json en fr ou en en*/}
              </div>
            </nav>
            <article className="bio">
              <div className="bio-text">
                <h1 className="glitch">Yanis Mehalaine</h1>
                <h2>{data.bio.title[language]}</h2>
                <p>{data.bio.content[language]}</p>
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ rotate: 360, scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <img className="bio-img" src={photo} />
              </motion.div>
            </article>
          </header>
          <main>
            <section className="mon-travail">
              <div className="work">
                <article className="mes-competences">
                  <h3>
                    {data["mon-travail"]["mes-competences"].title[language]}
                  </h3>
                  <ul className="skills">
                    <li className="skill-card">
                      <FontAwesomeIcon
                        icon={faHtml5}
                        size="3x"
                        style={{ color: "#e34c26" }}
                      />
                      <p>HTML</p>
                    </li>
                    <li className="skill-card">
                      <FontAwesomeIcon
                        icon={faCss3Alt}
                        size="3x"
                        style={{ color: "#264de4" }}
                      />
                      <p>CSS</p>
                    </li>
                    <li className="skill-card">
                      <FontAwesomeIcon
                        icon={faSass}
                        size="3x"
                        style={{ width: "1em", height: "1em", color: "#c69" }}
                      />
                      <p>SASS</p>
                    </li>
                    <li className="skill-card">
                      <FontAwesomeIcon
                        icon={faJs}
                        size="3x"
                        className="js-logo"
                      />
                      <p>JAVASCRIPT</p>
                    </li>
                    <li className="skill-card">
                      <FontAwesomeIcon
                        icon={faReact}
                        size="3x"
                        style={{ color: "#61dbfb" }}
                      />
                      <p>REACT</p>
                    </li>
                  </ul>
                </article>
                <article className="mes-projets">
                  <h3>{data["mon-travail"]["mes-projets"].title[language]}</h3>
                  <div className="projects">
                    {data["mon-travail"]["mes-projets"]["projets"].map(
                      (el, index) => (
                        <Card
                          key={index}
                          image={`/${el[language]["title"]
                            .toLowerCase()
                            .replace(" ", "_")}.png`}
                          title={el[language]["title"]}
                          subtitle={el[language]["subtitle"]}
                          text={el[language]["text"]}
                          skills={el["skills"]}
                          link={el["github"]}
                        />
                      )
                    )}
                  </div>
                </article>
              </div>
            </section>
            <section className="a-propos">
              <h2>{data["a-propos"].title[language]}</h2>
              {data["a-propos"].content[language].map((el, index) => (
                <li key={index}>
                  <p>{el}</p>
                </li>
              ))}
            </section>
          </main>
          <footer>
              <h2>Contact</h2>
              <div className="my-mail">
                <p>yanismehalaine@outlook.fr</p>
                {/*logo mail*/}
              </div>
          </footer>
        </div>
      )}
    </>
  );
}

export default Home;
