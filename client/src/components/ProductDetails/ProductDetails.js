import React from "react";
import Modal from "react-bootstrap/Modal";
import "./ProductDetails.css";
import { BsFillHeartFill, BsCartPlusFill } from "react-icons/bs";

const ProductDetails = (props) => {
  const imageUrlParse = () => {
    const codeArr = props.code.split("-");
    codeArr.pop();
    return codeArr.join("-");
  };

  const priceFormatting = (price) => {
    const currency = price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
    const currencyArr = currency.split("");

    for (let i = 0; i < 3; i++) {
      currencyArr.pop();
    }

    currencyArr.shift();

    return currencyArr.join("").replace(/,/g, ".");
  };

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Product Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{props.name}</h4>

          <div className="modal-product-content">
            <div className="modal-product-image-container">
              <img
                src={
                  props.productSelectedObj !== null
                    ? require(`../../img/img-${imageUrlParse()}.jpg`)
                    : ""
                }
                alt=""
              />
            </div>

            <div className="modal-product-description-container">
              <p>
                <strong>Code:</strong> {` ${props.code}`}
              </p>

              <p>
                <strong>Size:</strong> {` ${props.size}`}
              </p>

              <p id="modal-product-description">
                <strong>Description:</strong>
              </p>

              <p id="modal-product-description-text">{props.description}</p>

              <p id="modal-product-price">
                {props.discount > 0 ? (
                  <strong>
                    Rp
                    {priceFormatting(
                      Math.floor((props.price * (100 - props.discount)) / 100)
                    )}
                    ,-
                  </strong>
                ) : (
                  <strong>Rp{priceFormatting(props.price)},-</strong>
                )}
              </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            id="modal-button-wishlist"
            type="button"
            class="btn btn-danger"
            // onClick={props.onHide}
          >
            <div className="modal-button-container">
              <div className="modal-button-icon-container">
                <BsFillHeartFill />
              </div>
              Wishlist
            </div>
          </button>
          <button
            id="modal-button-add-to-cart"
            type="button"
            class="btn btn-success"
            onClick={props.onHide}
          >
            <div className="modal-button-container">
              <div className="modal-button-icon-container">
                <BsCartPlusFill />
              </div>
              Add to cart
            </div>
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductDetails;
