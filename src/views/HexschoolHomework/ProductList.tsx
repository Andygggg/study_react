import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../stores/store";
import { deleteProduct, getproducts, type Products } from "../../stores/productStore";
import listStyles from "../../styles/ProductList.module.scss";
import btnStyles from "../../styles/btn.module.scss";

const ProductList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { products, loading, error } = useSelector((state: RootState) => state.products);

  const handleDeleteProduct = async (id: string) => {
    try {
      const { success, message } = await dispatch(deleteProduct(id)).unwrap();
      if (success) {
        alert(message);
        await dispatch(getproducts());
      }
    } catch (err) {
      console.log(err);
      alert('刪除產品時發生錯誤');
    }
  };

  const pushToEdit = (product: Products) => {
    navigate(`/hexSchool_homeWork/ProductForm/${product.id}`);
  };

  useEffect(() => {
    dispatch(getproducts());
  }, [dispatch]);

  if (loading) {
    return <div className={listStyles.loading}>載入中...</div>;
  }

  if (error) {
    return <div className={listStyles.error}>載入失敗: {error}</div>;
  }

  return (
    <div className={listStyles.list_box}>
      <div className={listStyles.header}>
        <h2>產品列表</h2>
        <button 
          className={`${btnStyles.btn} ${btnStyles.btnPrimary}`}
          onClick={() => navigate('/hexSchool_homeWork/ProductForm/create')}
        >
          新增產品
        </button>
      </div>

      <div className={listStyles.table_box}>
        <table>
          <thead>
            <tr>
              <th>產品名稱</th>
              <th>原價</th>
              <th>售價</th>
              <th>是否啟用</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td className={listStyles.price}>
                  ${product.origin_price.toLocaleString()}
                </td>
                <td className={listStyles.price}>
                  ${product.price.toLocaleString()}
                </td>
                <td>
                  <span className={`${listStyles.status} ${
                    product.is_enabled ? listStyles.statusEnabled : listStyles.statusDisabled
                  }`}>
                    {product.is_enabled ? "啟用" : "停用"}
                  </span>
                </td>
                <td>
                  <div className={listStyles.actions}>
                    <button 
                      className={`${btnStyles.btn} ${btnStyles.btnWarning}`}
                      onClick={() => pushToEdit(product)}
                    >
                      查看細節
                    </button>
                    <button 
                      className={`${btnStyles.btn} ${btnStyles.btnDanger}`}
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      刪除
                    </button>
                    <button 
                      className={`${btnStyles.btn} ${btnStyles.btnPrimary}`}
                      onClick={() => navigate(`/hexSchool_homeWork/edit/${product.id}`)}
                    >
                      編輯
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;