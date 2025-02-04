import { useState, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../stores/store";
import { addToCart, getClientCart } from "@/stores/receptionStore";

import ReactLoading from "react-loading";

import ModalStyle from "../../styles/ProductModal.module.scss";
import btnStyles from "../../styles/btn.module.scss";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: FC<ProductModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { goods } = useSelector((state: RootState) => state.reception);
  const [cartQuantity, setCartQuantity] = useState<number>(1);
  const [isLoading, setLoading] = useState<boolean>(false);

  const joinCart = async (id: string) => {
    setLoading(true);
    try {
      await dispatch(addToCart({ id, qty: cartQuantity }));
      await dispatch(getClientCart());
    } finally {
      closeModal()
    }
  };

  const closeModal = () => {
    onClose();
    setLoading(false);
    setCartQuantity(1);
  };
  if (!isOpen) return null;

  return (
    <div className={ModalStyle.modal_bg}>
      <div className={ModalStyle.modal_box}>
        <div className={ModalStyle.modal_header}>
          <span>產品細節</span>
          <i className="bx bx-x-circle bx-sm" onClick={closeModal}></i>
        </div>

        <div className={ModalStyle.modal_body}>
          <img src={goods.imageUrl} alt={goods.title} />
          <p className={ModalStyle.product_row}>產品名稱：{goods.title}</p>
          <p className={ModalStyle.product_row}>產品內容：{goods.content}</p>
          <p className={ModalStyle.product_row}>
            產品描述：{goods.description}
          </p>
          <p className={ModalStyle.product_row}>
            <del>原價 ${goods.origin_price}</del>／特價：$
            {goods.price}
          </p>

          <div className={ModalStyle.quantity_box}>
            <label>購買數量：</label>

            <input
              type="number"
              defaultValue={cartQuantity}
              min={1}
              max={10}
              onChange={(e) => setCartQuantity(Number(e.target.value))}
            />
          </div>
        </div>

        <div className={ModalStyle.modal_footer}>
          <button
            type="button"
            className={`${btnStyles.btn} ${btnStyles.btnPrimary}`}
            onClick={() => joinCart(goods.id)}
          >
            {isLoading ? (
              <ReactLoading type="spin" color="#fff" height={20} width={20} />
            ) : (
              "加入購物車"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
