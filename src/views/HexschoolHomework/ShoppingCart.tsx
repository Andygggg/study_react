import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../stores/store";
import {
  getClientProducts,
  addToCart,
  getClientCart,
  updateCartItem,
  delAllCart,
  delGoods,
} from "@/stores/receptionStore";
import { useEffect, useState } from "react";

import Pagination from "./Pagination";

import cartStyle from "../../styles/ShoppingCart.module.scss";
import btnStyle from "../../styles/btn.module.scss";
const ShoppingCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { goodsList, pagination, cartList } = useSelector(
    (state: RootState) => state.reception
  );
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    (async () => {
      await dispatch(getClientProducts(1));
      await dispatch(getClientCart());
    })();
  }, [dispatch]);

  useEffect(() => {
    console.log(cartList);
  }, [cartList]);

  // 處理換頁
  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    await dispatch(getClientProducts(page));
  };

  const joinCart = async (id: string, qty: number) => {
    const data = await dispatch(addToCart({ id, qty })).unwrap();
    alert(data.message);
    await dispatch(getClientCart());
  };

  const editCart = async (id: string, qty: number) => {
    const data = await dispatch(updateCartItem({ id, qty })).unwrap();
    alert(data.message);
    await dispatch(getClientCart());
  };

  const clearCart = async () => {
    const data = await dispatch(delAllCart()).unwrap();
    alert(data.message);
    await dispatch(getClientCart());
  }

  const removeGoods = async (id: string) => {
    const data = await dispatch(delGoods(id)).unwrap();
    alert(data.message);
    await dispatch(getClientCart());
  }

  return (
    <div className={cartStyle.cart_box}>
      <div className={cartStyle.cart_table}>
        <table>
          <thead>
            <tr>
              <th>圖片</th>
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
                    >
                      查看更多
                    </button>
                    <button
                      className={`${btnStyle.btn} ${btnStyle.btnPrimary}`}
                      style={{ marginLeft: "5px" }}
                      onClick={() => {
                        joinCart(cart.id, 1);
                      }}
                    >
                      加入購物車
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

      <div className={cartStyle.cart_table}>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>品名</th>
              <th>數量</th>
              <th>單位</th>
              <th>單價</th>
              <th>
                <button className={`${btnStyle.btn} ${btnStyle.btnDanger}`} onClick={clearCart}>
                  清空購物車
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {cartList.map((cart) => {
              return (
                <tr key={cart.id}>
                  <td>
                    <img src={cart.product.imageUrl} alt={cart.product.title} />
                  </td>
                  <td>{cart.product.title}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      defaultValue={cart.qty}
                      key={cart.qty}
                      className={cartStyle.number_input}
                      onChange={(e) =>
                        editCart(cart.id, Number(e.target.value))
                      }
                    />
                  </td>
                  <td>{cart.product.unit}</td>
                  <td>{cart.product.price}元</td>
                  <td>
                    <button className={`${btnStyle.btn} ${btnStyle.btnDanger}`} onClick={() => {
                      removeGoods(cart.id)
                    }}>
                      移除
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={5} className={cartStyle.text_end }>總計:</td>
              <td>{cartList.reduce((sum, cart) => sum + cart.total, 0)}</td>
            </tr>
            <tr>
              <td colSpan={5} className={`${cartStyle.text_end} ${cartStyle.discount}`}>折扣價:</td>
              <td className={cartStyle.discount }>{cartList.reduce((sum, cart) => sum + cart.final_total, 0)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default ShoppingCart;
