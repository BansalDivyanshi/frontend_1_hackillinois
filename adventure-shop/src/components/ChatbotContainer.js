import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Chatbot.module.css";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";

const ChatbotContainer = ({ adventureName, backgroundColor, textColor }) => {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ HP: 10, DEF: 10, ATK: 10 });

  useEffect(() => {
    startNewAdventure();
  }, []);

  const startNewAdventure = async () => {
    setMessages([{ text: `Starting your adventure...`, isBot: true }]);
    setLoading(true);

    const data = {
      model: "Qwen/Qwen2.5-VL-72B-Instruct",
      messages: [
        {
          role: "system",
          content: `
You are a game master running an interactive mystery adventure. Your task is to:
1. Generate a mystery adventure based on the theme: "${adventureName}".
2. Provide a situation where the player must make a choice.
3. Present exactly **three numbered options** for the player.
4. Track and update player stats (HP, DEF, ATK) based on their choices.

Your response **must** be in valid JSON format with:
- "Event": The current scene description.
- "Choices": An array of exactly **three** choices.
- "HP": Change in HP (positive or negative).
- "DEF": Change in defense (positive or negative).
- "ATK": Change in attack (positive or negative).

Ensure the JSON is valid and contains no additional text.
`.trim(),
        },
        { role: "user", content: "Begin the adventure and set up the mystery." },
      ],
      temperature: 0.7,
      course_name: "hell2",
      stream: true,
      api_key: process.env.NEXT_PUBLIC_UIUC_API_KEY,
      retrieval_only: false,
    };

    try {
      const response = await fetch("/api/chat-api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        presentScenario(result);
      } else {
        setError("Failed to fetch adventure start.");
      }
    } catch (err) {
      setError("Error starting the adventure.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const presentScenario = (result) => {
    try {
      const { Event, Choices, HP, DEF, ATK } = result;

      if (!Event || !Array.isArray(Choices) || Choices.length !== 3 || typeof HP !== 'number' || typeof DEF !== 'number' || typeof ATK !== 'number') {
        throw new Error("Invalid response format");
      }

      const updatedStats = {
        HP: Math.max(stats.HP + HP, 0),
        DEF: Math.max(stats.DEF + DEF, 0),
        ATK: Math.max(stats.ATK + ATK, 0),
      };
      setStats(updatedStats);

      let formattedResponse = `🌟 ${Event}\n\nYour stats:\n❤️ HP: ${updatedStats.HP}, 🛡️ DEF: ${updatedStats.DEF}, ⚔️ ATK: ${updatedStats.ATK}\n\nChoose your next action:`;
      Choices.forEach((choice, index) => {
        formattedResponse += `\n${index + 1}. ${choice}`;
      });

      setMessages((prevMessages) => [...prevMessages, { text: formattedResponse, isBot: true }]);

      if (updatedStats.HP <= 0) {
        setMessages((prevMessages) => [...prevMessages, { text: "💀 You have lost all your HP. Game Over!", isBot: true }]);
      }
    } catch (error) {
      setError("Failed to process the scenario. Please try again.");
      console.error(error);
    }
  };

  const sendMessage = async (userInput) => {
    if (!userInput.trim()) return;

    setMessages((prevMessages) => [...prevMessages, { text: userInput, isBot: false }]);
    setLoading(true);

    const data = {
      model: "Qwen/Qwen2.5-VL-72B-Instruct",
      messages: [
        { role: "user", content: userInput },
      ],
      temperature: 0.7,
      course_name: "hell2",
      stream: true,
      api_key: process.env.NEXT_PUBLIC_UIUC_API_KEY,
      retrieval_only: false,
    };

    try {
      const response = await fetch("/api/chat-api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        presentScenario(result);
      } else {
        setError("Failed to process response.");
      }
    } catch (err) {
      setError("Error sending message.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.chatContainer} style={{ background: backgroundColor || "#ffffff" }}>
      <div className={styles.chatHeader}>
        <h2 style={{ color: textColor || "#ffffff" }}>Chat</h2>
        <button className={styles.backButton} onClick={() => router.push("/")}>Back</button>
      </div>

      <div className={styles.statsContainer}>
        <h3>Stats</h3>
        <p>❤️ HP: {stats.HP}</p>
        <p>🛡️ DEF: {stats.DEF}</p>
        <p>⚔️ ATK: {stats.ATK}</p>
      </div>

      <div className={styles.chatBox}>
        {messages.map((msg, index) => (
          <MessageBubble key={index} text={msg.text} isBot={msg.isBot} />
        ))}
        {error && <div className={styles.error}>{error}</div>}
      </div>

      <ChatInput sendMessage={sendMessage} />
    </div>
  );
};

export default ChatbotContainer;



