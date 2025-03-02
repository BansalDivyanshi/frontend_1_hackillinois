// components/ChatbotContainer.js
// components/ChatbotContainer.js
// components/ChatbotContainer.js
import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Chatbot.module.css";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";

const ChatbotContainer = ({ adventureName, backgroundColor, textColor }) => {
  const router = useRouter();
  const [messages, setMessages] = useState([
    {
      text: `Welcome to the ${adventureName} adventure! How can I assist you today?`,
      isBot: true,
    },
  ]);

  const sendMessage = (message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, isBot: false },
      { text: "Let me think...", isBot: true },
    ]);
  };

  const handleBackToHome = () => {
    router.push("/");
  };

  return (
    <div
      className={styles.chatContainer}
      style={{ background: backgroundColor || "#ffffff" }}
    >
      <div className={styles.chatHeader}>
        <h2 style={{ color: textColor || "#ffffff" }}>Chat </h2>
        <button className={styles.backButton} onClick={handleBackToHome}>
          Back
        </button>
      </div>
      <div className={styles.chatBox}>
        {messages.map((msg, index) => (
          <MessageBubble key={index} text={msg.text} isBot={msg.isBot} />
        ))}
      </div>
      <ChatInput sendMessage={sendMessage} />
    </div>
  );
};

export default ChatbotContainer;

