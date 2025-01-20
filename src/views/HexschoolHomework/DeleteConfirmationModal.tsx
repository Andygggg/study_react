import React from 'react';
import styles from "../../styles/DeleteConfirmationModal.module.scss";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "確認刪除", 
  message = "確定要刪除此產品嗎？" 
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
            className={styles.cancelButton}
          >
            取消
          </button>
          <button
            onClick={onConfirm}
            className={styles.confirmButton}
          >
            確認刪除
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;