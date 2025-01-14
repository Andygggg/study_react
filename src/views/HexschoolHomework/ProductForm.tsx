import { useEffect, useState } from "react";
import { type Product } from "../../stores/productStore";
import styles from "../../styles/ProductForm.module.scss";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../stores/store";
import {
  getProduct,
  editProduct,
  uploadProduct,
} from "../../stores/productStore";
import { useParams } from "react-router-dom";

const ProductForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  const [productData, setProductData] = useState<Product>({
    category: "",
    content: "",
    description: "",
    is_enabled: 1,
    origin_price: 0,
    price: 0,
    title: "",
    unit: "",
    imageUrl: "",
    imagesUrl: [""],
  });

  useEffect(() => {
    (async () => {
      if (!id || id === "create") return;
      const data = await dispatch(getProduct(id)).unwrap();
      setProductData(data);
    })();
  }, [id, dispatch]);

  const handleInput = (name: string, value: string | number) => {
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImagesUrl = (index: number, value: string) => {
    const newImagesUrl = [...productData.imagesUrl];
    newImagesUrl[index] = value;
    setProductData((prev) => ({
      ...prev,
      imagesUrl: newImagesUrl,
    }));
  };

  const addImageUrl = () => {
    setProductData((prev) => ({
      ...prev,
      imagesUrl: [...prev.imagesUrl, ""],
    }));
  };

  const saveProduct = async () => {
    if (!id || id === "create") {
      await upload();
      return;
    }
    const obj = { id: id, data: productData };
    await dispatch(editProduct(obj)).unwrap();
  };

  const upload = async () => {
    try {
      const data = await dispatch(uploadProduct(productData)).unwrap();

      if (data.success) {
        alert(data.message);
        setProductData({
          category: "",
          content: "",
          description: "",
          is_enabled: 1,
          origin_price: 0,
          price: 0,
          title: "",
          unit: "",
          imageUrl: "",
          imagesUrl: [""],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.upload_box}>
      <h2 className={styles.upload_title}>產品編輯</h2>
      <div className={styles.form_box}>
        <div className={styles.form_row}>
          <div className={styles.input_item}>
            <label>商品名稱</label>
            <input
              type="text"
              value={productData.title}
              onChange={(e) => handleInput("title", e.target.value)}
            />
          </div>
          <div className={styles.input_item}>
            <label>商品種類</label>
            <input
              type="text"
              value={productData.category}
              onChange={(e) => handleInput("category", e.target.value)}
            />
          </div>
        </div>

        <div className={styles.input_item}>
          <label>商品內容</label>
          <input
            type="text"
            value={productData.content}
            onChange={(e) => handleInput("content", e.target.value)}
          />
        </div>

        <div className={styles.form_row}>
          <div className={styles.input_item}>
            <label>商品原價</label>
            <input
              type="number"
              value={productData.origin_price}
              onChange={(e) =>
                handleInput("origin_price", Number(e.target.value))
              }
            />
          </div>
          <div className={styles.input_item}>
            <label>商品優惠價</label>
            <input
              type="number"
              value={productData.price}
              onChange={(e) => handleInput("price", Number(e.target.value))}
            />
          </div>
          <div className={styles.input_item}>
            <label>商品單位</label>
            <input
              type="text"
              value={productData.unit}
              onChange={(e) => handleInput("unit", e.target.value)}
            />
          </div>
        </div>

        <div className={styles.input_item}>
          <label>商品描述</label>
          <textarea
            value={productData.description}
            onChange={(e) => handleInput("description", e.target.value)}
          />
        </div>

        <div className={styles.input_item}>
          <label>主要圖片網址</label>
          <input
            type="text"
            value={productData.imageUrl}
            onChange={(e) => handleInput("imageUrl", e.target.value)}
          />
        </div>

        <div className={styles.moreImgs}>
          <label>更多圖片網址</label>
          {productData.imagesUrl.map((url, index) => (
            <input
              key={index}
              type="text"
              value={url}
              onChange={(e) => handleImagesUrl(index, e.target.value)}
            />
          ))}
          <button onClick={addImageUrl} className="btn btn-primary">
            新增圖片網址
          </button>
        </div>

        {productData.imageUrl && (
          <div className={styles.preview_box}>
            <h3>預覽主要圖片</h3>
            <div className={styles.mainImg}>
              <img src={productData.imageUrl} alt={productData.title} />
            </div>
          </div>
        )}

        {productData.imagesUrl.some((url) => url) && (
          <div className={styles.preview_box}>
            <h3>預覽更多圖片</h3>
            <div className={styles.imageGrid}>
              {productData.imagesUrl.map(
                (url, idx) =>
                  url && (
                    <div key={idx} className={styles.img_item}>
                      <img src={url} alt={`Additional image ${idx + 1}`} />
                    </div>
                  )
              )}
            </div>
          </div>
        )}
      </div>

      <div className={styles.btn_row}>
        <button className="btn btn-primary" onClick={saveProduct}>
          儲存
        </button>
      </div>
    </div>
  );
};

export default ProductForm;
