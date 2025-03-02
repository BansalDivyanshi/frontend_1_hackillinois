// components/MessageBubble.js
import styles from "../styles/Chatbot.module.css";

const MessageBubble = ({ text, isBot }) => {
  return (
    <div className={isBot ? styles.botBubble : styles.userBubble}>
      {text}
    </div>
  );
};

export default MessageBubble;
