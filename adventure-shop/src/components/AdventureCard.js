// components/AdventureCard.js
// components/AdventureCard.js
// components/AdventureCard.js
import Link from "next/link";
import styles from "../styles/Home.module.css"; // Using the same Home.module.css for consistency

const AdventureCard = ({ title, description, image, link, onSelect }) => {
  return (
    <div className={styles.card} onClick={onSelect}> {/* Trigger onSelect when clicked */}
      <img src={image} alt={title} className={styles.cardImage} />
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription}>{description}</p>
    </div>
  );
};

export default AdventureCard;

