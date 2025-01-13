import { useState } from "react";
import listStyles from "../../styles/ProductList.module.scss";
import { useSelector } from 'react-redux';
import { RootState } from '../../stores/store';

interface Product {
  category: string;
  content: string;
  description: string;
  id: string;
  is_enabled: number;
  origin_price: number;
  price: number;
  title: string;
  unit: string;
  num: number;
  imageUrl: string;
  imagesUrl: string[];
}

const ProductList = () => {
  const [tempProduct, setTempProduct] = useState<Product | null>(null);
  // const [productList, setProductList] = useState<Product[]>([]);
  const { products } = useSelector((state: RootState) => state.products);

  // useEffect(() => {
  //   setProductList(products)
  // }, [])
  

  return (
    <>
      <div className={listStyles.list_box}>
        <div className={listStyles.products}>
          <h2>產品列表</h2>
          <div className={listStyles.table_box}>
            <table className="table table-dark table-striped table-hover">
              <thead>
                <tr>
                  <th>產品名稱</th>
                  <th>原價</th>
                  <th>售價</th>
                  <th>是否啟用</th>
                  <th>查看細節</th>
                  <th>更多功能</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  return (
                    <tr key={product.id}>
                      <td>{product.title}</td>
                      <td>{product.origin_price}</td>
                      <td>{product.price}</td>
                      <td>{product.is_enabled ? "是" : "否"}</td>
                      <td>
                        <button
                          className="btn btn-warning"
                          onClick={() => setTempProduct(product)}
                        >
                          查看細節
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                        >
                          刪除
                        </button>
                        <button
                          className="btn btn-primary"
                        >
                          編輯
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className={listStyles.product_info}>
          <h2>單一產品細節</h2>
          {tempProduct ? (
            <div className={listStyles.info_body}>
              <div className={listStyles.info_img}>
                <img src={tempProduct.imageUrl} alt={tempProduct.title} />
              </div>
              <div className={listStyles.info_content}>
                <div className={listStyles.info_row}>
                  <span>商品名稱：{tempProduct.title}</span>
                  <span>商品種類：{tempProduct.category}</span>
                  <span>{tempProduct.content}</span>
                </div>
                <div className={listStyles.info_row}>
                  <span>商品原價：{tempProduct.origin_price}元</span>
                  <span>商品優惠價：{tempProduct.price}元</span>
                  <span>商品數量：{tempProduct.num}</span>
                </div>
                <div className={listStyles.info_textarea}>
                  <p>商品描述：{tempProduct.description}</p>
                </div>
                <h5>更多圖片：</h5>
                <div className={listStyles.info_imgs}>
                  {
                    tempProduct.imagesUrl.map((img, idx) => {
                      return <img key={idx} src={img} />
                    })
                  }
                </div>
              </div>
            </div>
          ) : (
            <p className="text-secondary">請選擇一個商品查看!!</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductList;
