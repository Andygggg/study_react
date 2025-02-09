import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../stores/store";
import {
  getClientProducts,
  getClientCart,
  updateCartItem,
  delAllCart,
  delGoods,
  orderCart,
} from "@/stores/receptionStore";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import ReactLoading from "react-loading";

import cartStyle from "../../styles/ShoppingCart.module.scss";
import btnStyle from "../../styles/btn.module.scss";
const ShoppingList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cartList, loading } = useSelector(
    (state: RootState) => state.reception
  )

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

  const editCart = async (id: string, product_id: string, qty: number) => {
    await dispatch(updateCartItem({ id, product_id, qty }));
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

  const onSubmit = async (order: any) => {
    const data = await dispatch(orderCart(order)).unwrap();
    reset();

    alert(data.message);
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
              <th></th>
              <th>產品名稱</th>
              <th>數量</th>
              <th>單位</th>
              <th>單價</th>
              <th>
                <button
                  className={`${btnStyle.btn} ${btnStyle.btnDanger}`}
                  onClick={clearCart}
                  disabled={cartList.length < 1}
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
                        editCart(
                          cart.id,
                          cart.product_id,
                          Number(e.target.value)
                        )
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
          <button
            type="submit"
            className={`${btnStyle.btn} ${btnStyle.btnDanger}`}
            disabled={cartList.length < 1}
          >
            送出訂單
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShoppingList;
