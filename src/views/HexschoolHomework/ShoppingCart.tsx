import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../stores/store";
import { getClientProducts } from "@/stores/receptionStore";
import { useEffect } from "react";
const ShoppingCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cartList } = useSelector((state: RootState) => state.reception);

  useEffect(() => {
    (async () => {
      await dispatch(getClientProducts(1));
    })();
  }, [dispatch]);  // 只在 dispatch 變化時重新執行

  useEffect(() => {
    console.log(cartList); // 這樣 cartList 更新後就會重新輸出
  }, [cartList]);  // 監聽 cartList，當 cartList 變化時重新執行 useEffect
  return(
    <div>
      123
    </div>
  )
}

export default ShoppingCart