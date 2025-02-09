import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "@/router/useRouterManger";
import Pagination from "./Pagination";
import MessageModal from "./MessageModal";
import { AppDispatch, RootState } from "../../stores/store";
import { checkLoginStatus } from "../../stores/userStore";
import { deleteProduct, getProducts, type Products } from "../../stores/productStore";
import listStyles from "../../styles/ProductList.module.scss";
import btnStyles from "../../styles/btn.module.scss";

const ProductList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { products, loading, error, pagination } = useSelector((state: RootState) => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  const handleDeleteProduct = async (id: string) => {
    setProductToDelete(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;

    try {
      const { success, message } = await dispatch(deleteProduct(productToDelete)).unwrap();
      if (success) {
        alert(message);
        await dispatch(getProducts(1));
      }
    } catch (err) {
      console.error("刪除產品時發生錯誤:", err);
      alert("刪除產品時發生錯誤");
    } finally {
      setIsModalOpen(false);
      setProductToDelete(null);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setProductToDelete(null);
  };


  // 處理換頁
  const handlePageChange = async(page: number) => {
    setCurrentPage(page);
    await dispatch(getProducts(page)); 
  };

  const pushToEdit = (product: Products) => {
    router.push(`/hexSchool_homeWork_backstage/ProductForm/${product.id}`);
  };

  useEffect(() => {
    (async() => {
      const msg = await dispatch(checkLoginStatus()).unwrap()

      if(!msg) {
        alert('未登入')
        router.push('/hexSchool_homeWork_forestage/ProductLogin');
        return
      }

      // await dispatch(getProducts(1));
    })()
  }, [dispatch, router]);

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
          onClick={() => router.push('/hexSchool_homeWork_backstage/ProductForm/create')}
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
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={pagination.total_pages}
        onPageChange={handlePageChange}
      />

      <MessageModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title="確認刪除"
        message='確定要刪除此產品嗎？'
      />
    </div>
  );
};

export default ProductList;