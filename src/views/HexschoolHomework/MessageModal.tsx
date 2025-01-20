import React from 'react';
import styles from "../../styles/MessageModal.module.scss";
import btnStyles from "../../styles/btn.module.scss";

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

const MessageModal: React.FC<MessageModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3 className={styles.modalTitle}>{title}</h3>
        <p className={styles.modalMessage}>{message}</p>
        
        <div className={styles.modalActions}>
          <button
            onClick={onClose}
            className={`${btnStyles.btn} ${btnStyles.btnDanger}`}
          >
            取消
          </button>
          <button
            onClick={onConfirm}
            className={`${btnStyles.btn} ${btnStyles.btnPrimary}`}
          >
            確認
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;