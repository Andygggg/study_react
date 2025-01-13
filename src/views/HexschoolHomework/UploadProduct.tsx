// UploadProduct.tsx
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../stores/store';
import { uploadProduct, type Upload } from '../../stores/productStore';
import styles from "../../styles/UploadProduct.module.scss";

const UploadProduct = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  const [uploadData, setUploadData] = useState<Upload>({
    category: "",
    content: "",
    description: "",
    is_enabled: 1,
    origin_price: 0,
    price: 0,
    title: "",
    unit: "",
    imageUrl: "",
    imagesUrl: [""]
  });

  const handleInput = (name: string, value: string | number) => {
    setUploadData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImagesUrl = (index: number, value: string) => {
    const newImagesUrl = [...uploadData.imagesUrl];
    newImagesUrl[index] = value;
    setUploadData(prev => ({
      ...prev,
      imagesUrl: newImagesUrl
    }));
  };

  const addImageUrl = () => {
    setUploadData(prev => ({
      ...prev,
      imagesUrl: [...prev.imagesUrl, ""]
    }));
  };

  const upload = async() => {
    try {
      const data = await dispatch(uploadProduct(uploadData)).unwrap();

      if(data.success) {
        alert(data.message)
        setUploadData(
          {
            category: "",
            content: "",
            description: "",
            is_enabled: 1,
            origin_price: 0,
            price: 0,
            title: "",
            unit: "",
            imageUrl: "",
            imagesUrl: [""]
          }
        )
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.upload_box}>
      <h2 className={styles.upload_title}>產品上傳</h2>
      <div className={styles.form_box}>
        <div className={styles.form_row}>
          <div className={styles.input_item}>
            <label>商品名稱</label>
            <input
              type="text"
              value={uploadData.title}
              onChange={(e) => handleInput("title", e.target.value)}
            />
          </div>
          <div className={styles.input_item}>
            <label>商品種類</label>
            <input
              type="text"
              value={uploadData.category}
              onChange={(e) => handleInput("category", e.target.value)}
            />
          </div>
        </div>

        <div className={styles.input_item}>
          <label>商品內容</label>
          <input
            type="text"
            value={uploadData.content}
            onChange={(e) => handleInput("content", e.target.value)}
          />
        </div>

        <div className={styles.form_row}>
          <div className={styles.input_item}>
            <label>商品原價</label>
            <input
              type="number"
              value={uploadData.origin_price}
              onChange={(e) => handleInput("origin_price", Number(e.target.value))}
            />
          </div>
          <div className={styles.input_item}>
            <label>商品優惠價</label>
            <input
              type="number"
              value={uploadData.price}
              onChange={(e) => handleInput("price", Number(e.target.value))}
            />
          </div>
          <div className={styles.input_item}>
            <label>商品單位</label>
            <input
              type="text"
              value={uploadData.unit}
              onChange={(e) => handleInput("unit", e.target.value)}
            />
          </div>
        </div>

        <div className={styles.input_item}>
          <label>商品描述</label>
          <textarea
            value={uploadData.description}
            onChange={(e) => handleInput("description", e.target.value)}
          />
        </div>

        <div className={styles.input_item}>
          <label>主要圖片網址</label>
          <input
            type="text"
            value={uploadData.imageUrl}
            onChange={(e) => handleInput("imageUrl", e.target.value)}
          />
        </div>

        <div className={styles.moreImgs}>
          <label>更多圖片網址</label>
          {uploadData.imagesUrl.map((url, index) => (
            <input
              key={index}
              type="text"
              value={url}
              onChange={(e) => handleImagesUrl(index, e.target.value)}
            />
          ))}
          <button 
            onClick={addImageUrl}
            className="btn btn-primary"
          >
            新增圖片網址
          </button>
        </div>

        {uploadData.imageUrl && (
          <div className={styles.preview_box}>
            <h3>預覽主要圖片</h3>
            <div className={styles.mainImg}>
              <img src={uploadData.imageUrl} alt={uploadData.title} />
            </div>
          </div>
        )}

        {uploadData.imagesUrl.some(url => url) && (
          <div className={styles.preview_box}>
            <h3>預覽更多圖片</h3>
            <div className={styles.imageGrid}>
              {uploadData.imagesUrl.map((url, idx) => (
                url && (
                  <div key={idx} className={styles.img_item}>
                    <img src={url} alt={`Additional image ${idx + 1}`} />
                  </div>
                )
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={styles.btn_row}>
        <button className="btn btn-primary" onClick={upload}>上傳</button>
      </div>
    </div>
  );
};

export default UploadProduct;