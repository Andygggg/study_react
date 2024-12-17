import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Modal } from "bootstrap";

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  // 將 modalRef 的類型改為 HTMLDivElement | null
  const modalRef = useRef<HTMLDivElement | null>(null);
  const customModal = useRef<Modal | null>(null);

  // 初始化 modal
  useEffect(() => {
    if (modalRef.current) {
      customModal.current = new Modal(modalRef.current);
    }
  }, []);

  useEffect(() => {
    (async () => {
      const res = await axios.get("https://randomuser.me/api/");
      console.log(res);
      openModal();

      setTimeout(() => {
        closeModal();
      }, 2000);
    })();
  }, []);

  // 打開 modal
  const openModal = () => {
    customModal.current?.show();
  };

  // 關閉 modal
  const closeModal = () => {
    customModal.current?.hide();
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => openModal()}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        ref={modalRef} // 這裡的 ref 正確指向 HTMLDivElement
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button
          className="btn btn-primary"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
