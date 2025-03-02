// pages/index.js
// pages/index.js
// pages/index.js
import { useState } from "react";
import AdventureCard from "../components/AdventureCard";
import ChatbotContainer from "../components/ChatbotContainer";
import WalletHeader from "../components/WalletHeader";
import styles from "../styles/Home.module.css";

const adventures = [
  { 
    title: "Lost in the Woods", 
    description: "Find your way back to safety.", 
    image: "/images/woods.jpg", 
    backgroundColor: "linear-gradient(135deg, #4b9e42, #88d498)",  // Forest-inspired gradient
    textColor: "#ffffff"  
  },
  { 
    title: "Desert Escape", 
    description: "Survive the harsh desert.", 
    image: "/images/desert.jpg", 
    backgroundColor: "linear-gradient(135deg, #f4a261, #e76f51)",  // Warm desert tones
    textColor: "#333333"  
  },
  { 
    title: "Ocean Depths", 
    description: "Dive into the deep ocean.", 
    image: "/images/ocean.jpg", 
    backgroundColor: "linear-gradient(135deg, #2d6a4f, #1e3c72)",  // Deep blue-green gradient
    textColor: "#ffffff"  
  },
  { 
    title: "Mountain Expedition", 
    description: "Climb the highest peaks.", 
    image: "/images/mountain.jpg", 
    backgroundColor: "linear-gradient(135deg, #5c4d7d, #a3a1c9)",  // Cool, muted mountain hues
    textColor: "#ffffff"  
  },
  { 
    title: "Space Odyssey", 
    description: "Journey through the stars.", 
    image: "/images/space.jpg", 
    backgroundColor: "linear-gradient(135deg, #1d2b64, #f8cdda)",  // Cosmic gradient
    textColor: "#ffffff"  
  },
  { 
    title: "Cave Exploration", 
    description: "Uncover secrets in the cave.", 
    image: "/images/cave.jpg", 
    backgroundColor: "linear-gradient(135deg, #333333, #dd1818)",  // Dark cave with a pop of red
    textColor: "#ffffff"  
  },
  { 
    title: "Treasure Hunt", 
    description: "Search for the hidden treasure.", 
    image: "/images/treasure.jpg", 
    backgroundColor: "linear-gradient(135deg, #c31432, #240b36)",  // Rich, dramatic gradient
    textColor: "#ffffff"  
  },
];

export default function Home() {
  const [showChatbot, setShowChatbot] = useState(false);
  const [selectedAdventure, setSelectedAdventure] = useState("");
  const [chatBackground, setChatBackground] = useState("");
  const [chatTextColor, setChatTextColor] = useState("");

  const handleAdventureSelect = (adventure) => {
    setSelectedAdventure(adventure.title);
    setChatBackground(adventure.backgroundColor);
    setChatTextColor(adventure.textColor);
    setShowChatbot(true);
  };

  return (
    <div className={styles.container}>
      {!showChatbot && <WalletHeader balance={50.75} />} {/* Wallet header only on adventure selection */}

      {!showChatbot ? (
        <>
          <h1 className={styles.title}>Choose Your Next Adventure</h1>
          <div className={styles.cardGrid}>
            {adventures.map((adventure, index) => (
              <AdventureCard
                key={index}
                title={adventure.title}
                description={adventure.description}
                image={adventure.image}
                onSelect={() => handleAdventureSelect(adventure)}
              />
            ))}
          </div>
        </>
      ) : (
        <ChatbotContainer 
          adventureName={selectedAdventure} 
          backgroundColor={chatBackground} 
          textColor={chatTextColor} 
        />
      )}
    </div>
  );
}
