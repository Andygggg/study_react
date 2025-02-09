import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../stores/store";
import {
  getClientProducts,
  addToCart,
  getClientCart,
  getClientProduct,
} from "@/stores/receptionStore";
import { useEffect, useState } from "react";

import ReactLoading from "react-loading";
import Pagination from "./Pagination";
import ProductModal from "./ProductModal";

import cartStyle from "../../styles/ShoppingCart.module.scss";
import btnStyle from "../../styles/btn.module.scss";
const ShoppingCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { goodsList, pagination, loading } = useSelector(
    (state: RootState) => state.reception
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingCartId, setLoadingCartId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      await dispatch(getClientProducts(1));
      await dispatch(getClientCart());
    })();
  }, [dispatch]);

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    await dispatch(getClientProducts(page));
  };

  const joinCart = async (id: string, qty: number) => {
    setLoadingCartId(id);
    try {
      await dispatch(addToCart({ id, qty }));
      await dispatch(getClientCart());
    } finally {
      setLoadingCartId(null);
    }
  };

  const openModal = async (id: string) => {
    await dispatch(getClientProduct(id));
    setIsModalOpen(true);
  };

  return (
    <div className={cartStyle.cart_box}>
      {loading && (
        <div className={cartStyle.loading}>
          <ReactLoading type="spin" color="#6c757d" height={80} width={80} />
        </div>
      )}

      <div className={cartStyle.cart_table}>
        <table>
          <thead>
            <tr>
              <th>產品圖示</th>
              <th>產品名稱</th>
              <th>價錢</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {goodsList.map((cart) => {
              return (
                <tr key={cart.id}>
                  <td>
                    <img src={cart.imageUrl} alt={cart.title} />
                  </td>
                  <td>{cart.title}</td>
                  <td>
                    <del className="h6">原價： {cart.origin_price} 元</del>
                    <div>特價： {cart.price} 元</div>
                  </td>
                  <td>
                    <button
                      className={`${btnStyle.btn} ${btnStyle.btnWarning}`}
                      onClick={() => {
                        openModal(cart.id);
                      }}
                    >
                      查看商品
                    </button>
                    <button
                      className={`${btnStyle.btn} ${btnStyle.btnPrimary}`}
                      style={{ marginLeft: "5px" }}
                      onClick={() => {
                        joinCart(cart.id, 1);
                      }}
                      disabled={loadingCartId === cart.id}
                    >
                      {loadingCartId === cart.id ? (
                        <ReactLoading
                          type="spin"
                          color="#dc3545"
                          height={20}
                          width={20}
                        />
                      ) : (
                        "加入購物車"
                      )}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={pagination.total_pages}
        onPageChange={handlePageChange}
      />

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};

export default ShoppingCart;
