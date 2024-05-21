import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export const Card = ({ image, title, subtitle, text, skills, link }) => {
  console.log(`image : ${image}`);
  return (
    <li className="project-card">
      <img src={image} />
      <div className="project-content">
        <div className="project-text">
          <h4>{title}</h4>
          <h5>{subtitle}</h5>
          <h6>STACK : {skills.join(', ')}</h6>
          <p>{text}</p>
        </div>
        <a href={link}>
          <FontAwesomeIcon icon={faGithub} className="github-icon" size="2x" />
        </a>
      </div>
    </li>
  );
};
