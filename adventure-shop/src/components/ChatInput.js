// components/ChatInput.js
import { useState } from "react";
import styles from "../styles/Chatbot.module.css";

const ChatInput = ({ sendMessage }) => {
  const [inputText, setInputText] = useState("");

  const handleSend = () => {
    if (inputText.trim()) {
      sendMessage(inputText);
      setInputText(""); // Clear input after sending
    }
  };

  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className={styles.chatInput}
        placeholder="Type your message..."
      />
      <button onClick={handleSend} className={styles.sendButton}>
        Send
      </button>
    </div>
  );
};

export default ChatInput;
