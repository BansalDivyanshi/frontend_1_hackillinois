// components/WalletHeader.js
import styles from "../styles/WalletHeader.module.css";

const WalletHeader = ({ balance }) => {
  return (
    <div className={styles.walletContainer}>
      <div className={styles.walletInfo}>
        <span className={styles.walletLabel}>Wallet Balance:</span>
        <span className={styles.walletAmount}>${balance}</span>
      </div>
    </div>
  );
};

export default WalletHeader;  // Ensure this is a default export
