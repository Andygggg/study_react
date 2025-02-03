import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../stores/store";
import {
  getClientProducts,
  addToCart,
  getClientCart,
  updateCartItem,
  delAllCart,
  delGoods,
  orderCart,
} from "@/stores/receptionStore";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import ReactLoading from "react-loading";
import Pagination from "./Pagination";

import cartStyle from "../../styles/ShoppingCart.module.scss";
import btnStyle from "../../styles/btn.module.scss";
const ShoppingCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { goodsList, pagination, cartList, loading } = useSelector(
    (state: RootState) => state.reception
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [loadingCartId, setLoadingCartId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      tel: "",
      address: "",
      message: "",
    },
  });

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

  const editCart = async (id: string, qty: number) => {
    await dispatch(updateCartItem({ id, qty }));
    await dispatch(getClientCart());
  };

  const clearCart = async () => {
    await dispatch(delAllCart());
    await dispatch(getClientCart());
  };

  const removeGoods = async (id: string) => {
    await dispatch(delGoods(id));
    await dispatch(getClientCart());
  };

  const onSubmit =async  (order: any) => {
    const data = await dispatch(orderCart(order)).unwrap();
    reset()

    alert(data.message)
    await dispatch(getClientCart());
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
                <button
                  className={`${btnStyle.btn} ${btnStyle.btnDanger}`}
                  onClick={clearCart}
                >
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
                    <button
                      className={`${btnStyle.btn} ${btnStyle.btnDanger}`}
                      onClick={() => {
                        removeGoods(cart.id);
                      }}
                    >
                      移除
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={5} className={cartStyle.text_end}>
                總計:
              </td>
              <td>{cartList.reduce((sum, cart) => sum + cart.total, 0)}</td>
            </tr>
            <tr>
              <td
                colSpan={5}
                className={`${cartStyle.text_end} ${cartStyle.discount}`}
              >
                折扣價:
              </td>
              <td className={cartStyle.discount}>
                {cartList.reduce((sum, cart) => sum + cart.final_total, 0)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <form className={cartStyle.cart_form} onSubmit={handleSubmit(onSubmit)}>
        <div className={cartStyle.form_item}>
          <label htmlFor="name">收件人姓名</label>
          <input
            id="name"
            type="text"
            placeholder="請輸入姓名"
            {...register("name", { required: "請輸入收件人姓名。" })}
          />
          {errors.name && (
            <p className={cartStyle.error}>{errors.name.message}</p>
          )}
        </div>

        <div className={cartStyle.form_item}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="請輸入 Email"
            {...register("email", {
              required: "請輸入 Email。",
              pattern: { value: /^\S+@\S+$/i, message: "Email 格式不正確。" },
            })}
          />
          {errors.email && (
            <p className={cartStyle.error}>{errors.email.message}</p>
          )}
        </div>
        <div className={cartStyle.form_item}>
          <label htmlFor="tel">收件人電話</label>
          <input
            id="tel"
            type="tel"
            placeholder="請輸入電話"
            {...register("tel", {
              required: "請輸入收件人電話。",
              minLength: {
                value: 8,
                message: "電話號碼至少需要 8 碼。",
              },
              pattern: {
                value: /^\d+$/,
                message: "電話號碼格式不正確，僅限數字。",
              },
            })}
          />
          {errors.tel && (
            <p className={cartStyle.error}>{errors.tel.message}</p>
          )}
        </div>

        <div className={cartStyle.form_item}>
          <label htmlFor="address">收件人地址</label>
          <input
            id="address"
            type="text"
            placeholder="請輸入地址"
            {...register("address", { required: "請輸入收件人地址。" })}
          />
          {errors.address && (
            <p className={cartStyle.error}>{errors.address.message}</p>
          )}
        </div>

        <div className={cartStyle.form_item}>
          <label htmlFor="message">留言</label>
          <textarea
            id="message"
            placeholder="留言"
            rows={3}
            {...register("message")}
          />
        </div>

        <div className={cartStyle.submit}>
          <button type="submit"  className={`${btnStyle.btn} ${btnStyle.btnDanger}`}>送出訂單</button>
        </div>
      </form>
    </div>
  );
};

export default ShoppingCart;
