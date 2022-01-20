import React, { useState, useEffect } from "react";
import AlertSuccess from "../AlertSuccess/AlertSuccess";
import StoreCarousel from "../StoreCarousel/StoreCarousel";
import "./HomepageContent.css";
import {
  BsFillFunnelFill,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";
import ThumbnailCard from "../ThumbnailCard/ThumbnailCard";
import ProductDetails from "../ProductDetails/ProductDetails";
import ProductNotFound from "../ProductNotFound/ProductNotFound";

const HomepageContent = (props) => {
  const [productItems, setProductItems] = useState(null);
  const [pageNumberLength, setPageNumberLength] = useState(null);
  const [pageNumberView, setPageNumberView] = useState(null);
  const [showStartPage, setShowStartPage] = useState(false);
  const [showEndPage, setShowEndPage] = useState(false);
  const [productDetail, setProductDetail] = useState(false);
  const [itemSelectedCode, setItemSelectedCode] = useState(null);
  const [productItemsObj, setProductItemsObj] = useState(null);
  const [productSelectedObj, setProductSelectedObj] = useState(null);
  const [isProductFound, setIsProductFound] = useState(false);

  // fetch data from server asynchronously
  const fetchProductItem = async () => {
    const productItemsArr = await props.storeObj.getProducts;

    return productItemsArr;
  };

  const thumbnailCardView = (
    array,
    sliceFirstArgument,
    sliceSecondArgument
  ) => {
    if (array.length % 10 === 0) {
      setPageNumberLength(Math.floor(array.length / 10));
    } else {
      setPageNumberLength(Math.floor(array.length / 10) + 1);
    }

    setProductItems(
      array.slice(sliceFirstArgument, sliceSecondArgument).map((item) => {
        return (
          <ThumbnailCard
            productName={item.name}
            productSize={item.size}
            productPrice={item.price}
            productDiscount={item.discount}
            productCode={item.code}
            setProductDetail={setProductDetail}
            setItemSelectedCode={setItemSelectedCode}
          />
        );
      })
    );
  };

  const tagStrToArray = (str) => {
    return str.split(", ");
  };

  const productItemsHandler = (array) => {
    const sliceFirstArgument = (props.storeObj.currentPageNumber - 1) * 10;
    const sliceSecondArgument = props.storeObj.currentPageNumber * 10;

    if (props.storeObj.productName === "All Products") {
      if (props.storeObj.filterItem === "All") {
        if (!(array.length > 0)) {
          setIsProductFound(false);
        } else {
          setIsProductFound(true);
        }

        thumbnailCardView(array, sliceFirstArgument, sliceSecondArgument);
      } else {
        const arrFilter = array.filter((data) => {
          return tagStrToArray(data.tag).some((value) => {
            return value === props.storeObj.filterItem.toLowerCase();
          });
        });

        if (!(arrFilter.length > 0)) {
          setIsProductFound(false);
        } else {
          setIsProductFound(true);
        }

        thumbnailCardView(arrFilter, sliceFirstArgument, sliceSecondArgument);
      }
    } else {
      if (props.storeObj.filterItem === "All") {
        const arrFilter = array.filter((data) => {
          return tagStrToArray(data.tag).some((value) => {
            return value === props.storeObj.productName.toLowerCase();
          });
        });

        if (!(arrFilter.length > 0)) {
          setIsProductFound(false);
        } else {
          setIsProductFound(true);
        }

        thumbnailCardView(arrFilter, sliceFirstArgument, sliceSecondArgument);
      } else {
        const arrFilter = array.filter((data) => {
          return (
            tagStrToArray(data.tag).some((value) => {
              return value === props.storeObj.productName.toLowerCase();
            }) &&
            tagStrToArray(data.tag).some((value) => {
              return value === props.storeObj.filterItem.toLowerCase();
            })
          );
        });

        if (!(arrFilter.length > 0)) {
          setIsProductFound(false);
        } else {
          setIsProductFound(true);
        }

        thumbnailCardView(arrFilter, sliceFirstArgument, sliceSecondArgument);
      }
    }
  };

  // pagination logic
  const pageNumberViewHandler = () => {
    const tempArray = [];
    const totalPage = pageNumberLength;
    const currentPage = props.storeObj.currentPageNumber;
    let startPage, endPage, diff;

    startPage = currentPage < 5 ? 1 : currentPage - 2;
    endPage = 4 + startPage;
    endPage = totalPage < endPage ? totalPage : endPage;
    diff = startPage - endPage + 4;
    startPage = startPage - (startPage - diff > 0 ? diff : 0);

    setShowStartPage(false);
    setShowEndPage(false);

    if (startPage > 1) {
      setShowStartPage(true);
    }

    for (let i = startPage; i <= endPage; i++) {
      tempArray.push(i);
    }

    setPageNumberView(
      tempArray.map((number) => {
        if (number === currentPage) {
          return (
            <>
              <button className="pagination-number-active">
                {props.storeObj.currentPageNumber}
              </button>
            </>
          );
        } else {
          return (
            <>
              <button
                className="pagination-number"
                onClick={() => {
                  props.storeObj.setCurrentPageNumber(number);
                }}
              >
                {number}
              </button>
            </>
          );
        }
      })
    );

    if (endPage < totalPage) {
      setShowEndPage(true);
    }
  };

  // showing modal of produc details
  const productItemsObjHandler = (array) => {
    setProductItemsObj(array);
  };

  const productSelectedObjHandler = (array) => {
    setProductSelectedObj(
      array.filter((product) => product.code === itemSelectedCode)
    );
  };

  useEffect(() => {
    if (productItems === null) {
      fetchProductItem().then((result) => {
        productItemsHandler(result);
        productItemsObjHandler(result);
        pageNumberViewHandler();
      });
    }
  });

  useEffect(() => {
    fetchProductItem().then((result) => {
      productItemsHandler(result);
      productItemsObjHandler(result);
    });

    pageNumberViewHandler();
  }, [
    props.storeObj.filterItem,
    props.storeObj.currentPageNumber,
    props.storeObj.productName,
    pageNumberLength,
  ]);

  useEffect(() => {
    if (itemSelectedCode !== null) {
      productSelectedObjHandler(productItemsObj);

      if (productSelectedObj !== null) {
        setItemSelectedCode(null);
      }
    }
  });

  return (
    <>
      {/* homepage carousel */}
      <div className="homepage-carousel-container">
        <StoreCarousel />
      </div>

      {/* homepage content start */}
      <div className="homepage-content-container">
        <div className="homepage-top-content-container">
          {/* homepage breadcrumb */}
          <nav aria-label="breadcrumb">
            {props.storeObj.filterItem === "All" ? (
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/">Store</a>
                </li>

                <li className="breadcrumb-item active">
                  {props.storeObj.productName}
                </li>
              </ol>
            ) : (
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/">Store</a>
                </li>

                <li className="breadcrumb-item">
                  <a
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      props.storeObj.setFilterItem("All");
                      props.storeObj.setCurrentPageNumber(1);
                    }}
                  >
                    {props.storeObj.productName}
                  </a>
                </li>

                <li className="breadcrumb-item active">
                  {props.storeObj.filterItem}
                </li>
              </ol>
            )}
          </nav>

          {/* homepage filter */}
          <div className="homepage-filter-container">
            <button className="homepage-filter">
              <BsFillFunnelFill />
              <p>{props.storeObj.filterItem}</p>
            </button>

            <div className="homepage-filter-dropdown-container">
              <div className="homepage-filter-dropdown">
                <button
                  className="filter-dropdown-item"
                  onClick={() => {
                    props.storeObj.setFilterItem("All");
                    props.storeObj.setCurrentPageNumber(1);
                  }}
                >
                  All
                </button>

                <button
                  className="filter-dropdown-item"
                  onClick={() => {
                    props.storeObj.setFilterItem("Male");
                    props.storeObj.setCurrentPageNumber(1);
                  }}
                >
                  Male
                </button>

                <button
                  className="filter-dropdown-item"
                  onClick={() => {
                    props.storeObj.setFilterItem("Female");
                    props.storeObj.setCurrentPageNumber(1);
                  }}
                >
                  Female
                </button>

                <button
                  className="filter-dropdown-item"
                  onClick={() => {
                    props.storeObj.setFilterItem("Unisex");
                    props.storeObj.setCurrentPageNumber(1);
                  }}
                >
                  Unisex
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* homepage alert */}
        <div className="homepage-alert-container">
          <AlertSuccess />
        </div>

        {isProductFound ? (
          <>
            {/* homepage thumbnail card */}
            <div className="homepage-thumbnail-card-container">
              {productItems}
            </div>

            {/* homepage pagination */}
            <div className="homepage-pagination-container">
              {props.storeObj.currentPageNumber === 1 ? (
                <button className="pagination-arrow" disabled>
                  <BsChevronLeft />
                </button>
              ) : (
                <button
                  className="pagination-arrow"
                  onClick={() => {
                    props.storeObj.setCurrentPageNumber(
                      props.storeObj.currentPageNumber - 1
                    );
                  }}
                >
                  <BsChevronLeft />
                </button>
              )}

              {showStartPage ? (
                <>
                  <button
                    className="pagination-number"
                    onClick={() => {
                      props.storeObj.setCurrentPageNumber(1);
                    }}
                  >
                    1
                  </button>

                  <button className="pagination-number" disabled>
                    ...
                  </button>
                </>
              ) : (
                <></>
              )}

              {pageNumberView}

              {showEndPage ? (
                <>
                  <button className="pagination-number" disabled>
                    ...
                  </button>

                  <button
                    className="pagination-number"
                    onClick={() => {
                      props.storeObj.setCurrentPageNumber(pageNumberLength);
                    }}
                  >
                    {pageNumberLength}
                  </button>
                </>
              ) : (
                <></>
              )}

              {props.storeObj.currentPageNumber === pageNumberLength ? (
                <button className="pagination-arrow" disabled>
                  <BsChevronRight />
                </button>
              ) : (
                <button
                  className="pagination-arrow"
                  onClick={() => {
                    props.storeObj.setCurrentPageNumber(
                      props.storeObj.currentPageNumber + 1
                    );
                  }}
                >
                  <BsChevronRight />
                </button>
              )}
            </div>
          </>
        ) : (
          <>
            <ProductNotFound />
          </>
        )}
      </div>
      {/* homepage content end */}

      {/* modal product detail */}
      <ProductDetails
        show={productDetail}
        onHide={() => {
          setProductDetail(false);
          setProductSelectedObj(null);
          setItemSelectedCode(null);
        }}
        name={productSelectedObj !== null ? productSelectedObj[0].name : ""}
        description={
          productSelectedObj !== null ? productSelectedObj[0].description : ""
        }
        code={productSelectedObj !== null ? productSelectedObj[0].code : ""}
        size={productSelectedObj !== null ? productSelectedObj[0].size : ""}
        tag={productSelectedObj !== null ? productSelectedObj[0].tag : ""}
        price={productSelectedObj !== null ? productSelectedObj[0].price : ""}
        discount={
          productSelectedObj !== null ? productSelectedObj[0].discount : ""
        }
        productSelectedObj={productSelectedObj}
      />
    </>
  );
};

export default HomepageContent;
