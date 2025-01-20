import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { type Product } from "../../stores/productStore";
import { AppDispatch } from "../../stores/store";
import {
  getProduct,
  editProduct,
  uploadProduct,
} from "../../stores/productStore";
import FormStyles from "../../styles/ProductForm.module.scss";
import btnStyles from "../../styles/btn.module.scss";

const ProductForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
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
    saveYear: 0,
  });

  useEffect(() => {
    (async () => {
      if (!id || id === "create") return;
      const data = await dispatch(getProduct(id)).unwrap();
      console.log(data);
            
      setProductData((prev) => ({
        ...prev,
        ...data,
      }));
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

  const removeImageUrl = (indexToRemove: number) => {
    setProductData((prev) => ({
      ...prev,
      imagesUrl: prev.imagesUrl.filter((_, index) => index !== indexToRemove),
    }));
  };

  const saveProduct = async () => {
    if (!id || id === "create") {
      await addProduct();
      return;
    }
    const obj = { id: id, data: productData };
    const { message } = await dispatch(editProduct(obj)).unwrap();
    alert(message);
  };

  const addProduct = async () => {
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
    } catch (error: any) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <div className={FormStyles.form_box}>
      <div className={FormStyles.form_header}>
        <h2>產品編輯</h2>
        <button
          className={`${btnStyles.btn} ${btnStyles.btnPrimary}`}
          onClick={() => navigate("/hexSchool_homeWork/ProductList")}
        >
          返回列表
        </button>
      </div>
      <div className={FormStyles.form_box}>
        <div className={FormStyles.form_row}>
          <div className={FormStyles.input_item}>
            <label htmlFor="product_title">商品名稱</label>
            <input
              type="text"
              id="product_title"
              value={productData.title}
              onChange={(e) => handleInput("title", e.target.value)}
            />
          </div>
          <div className={FormStyles.input_item}>
            <label htmlFor="product_category">商品種類</label>
            <input
              type="text"
              id="product_category"
              value={productData.category}
              onChange={(e) => handleInput("category", e.target.value)}
            />
          </div>
        </div>

        <div className={FormStyles.input_item}>
          <label htmlFor="product_content">商品內容</label>
          <input
            type="text"
            id="product_content"
            value={productData.content}
            onChange={(e) => handleInput("content", e.target.value)}
          />
        </div>

        <div className={FormStyles.form_row}>
          <div className={FormStyles.input_item}>
            <label htmlFor="product_origin_price">商品原價</label>
            <input
              type="number"
              id="product_origin_price"
              min={0}
              value={productData.origin_price}
              onChange={(e) =>
                handleInput("origin_price", Number(e.target.value))
              }
            />
          </div>
          <div className={FormStyles.input_item}>
            <label htmlFor="product_price">商品優惠價</label>
            <input
              type="number"
              id="product_price"
              min={0}
              value={productData.price}
              onChange={(e) => handleInput("price", Number(e.target.value))}
            />
          </div>
          <div className={FormStyles.input_item}>
            <label htmlFor="product_unit">商品單位</label>
            <input
              type="text"
              id="product_unit"
              value={productData.unit}
              onChange={(e) => handleInput("unit", e.target.value)}
            />
          </div>
          <div className={FormStyles.input_item}>
            <label htmlFor="product_saveYear">保存年分</label>
            <input
              type="number"
              id="product_saveYear"
              min={0}
              value={productData.saveYear}
              onChange={(e) => handleInput("saveYear", e.target.value)}
            />
          </div>
        </div>

        <div className={FormStyles.input_item}>
          <label htmlFor="product_description">商品描述</label>
          <textarea
            value={productData.description}
            id="product_description"
            onChange={(e) => handleInput("description", e.target.value)}
          />
        </div>

        <div className={FormStyles.input_check}>
          <label htmlFor="product_check">是否啟用</label>
          <input
            type="checkbox"
            id="product_check"
            checked={productData.is_enabled === 1}
            onChange={(e) =>
              handleInput("is_enabled", e.target.checked ? 1 : 0)
            }
          />
        </div>

        <div className={FormStyles.input_item}>
          <label htmlFor="product_imageUrl">主要圖片網址</label>
          <input
            type="text"
            value={productData.imageUrl}
            onChange={(e) => handleInput("imageUrl", e.target.value)}
          />
        </div>

        <div className={FormStyles.moreImgs}>
          <label>更多圖片網址</label>
          {productData.imagesUrl.map((url, index) => (
            <div key={index} className={FormStyles.imageUrlInput}>
              <input
                type="text"
                value={url}
                onChange={(e) => handleImagesUrl(index, e.target.value)}
              />
              <button
                onClick={() => removeImageUrl(index)}
                className={`${btnStyles.btn} ${btnStyles.btnDanger}`}
                type="button"
              >
                移除
              </button>
            </div>
          ))}
          <button onClick={addImageUrl} className="btn btn-primary">
            新增圖片網址
          </button>
        </div>

        {productData.imageUrl && (
          <div className={FormStyles.preview_box}>
            <h3>預覽主要圖片</h3>
            <div className={FormStyles.mainImg}>
              <img src={productData.imageUrl} alt={productData.title} />
            </div>
          </div>
        )}

        {productData.imagesUrl.some((url) => url) && (
          <div className={FormStyles.preview_box}>
            <h3>預覽更多圖片</h3>
            <div className={FormStyles.imageGrid}>
              {productData.imagesUrl.map(
                (url, idx) =>
                  url && (
                    <div key={idx} className={FormStyles.img_item}>
                      <img src={url} alt={`Additional image ${idx + 1}`} />
                    </div>
                  )
              )}
            </div>
          </div>
        )}
      </div>

      <div className={FormStyles.btn_row}>
        <button className="btn btn-primary" onClick={saveProduct}>
          儲存
        </button>
      </div>
    </div>
  );
};

export default ProductForm;
