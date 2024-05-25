import React, { useState } from "react";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import Rating from "@mui/material/Rating";
import classes from "./Product.module.css";
import { Link } from "react-router-dom";

function ProductCard({ product, flex, renderDesc, renderAdd }) {
  const { image, title, id, rating, price, description } = product;
 


  return (
    <div
      className={`${classes.card__container} ${
        flex ? classes.product__flexed : ""
      }`}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt={title} className={classes.img_container} />
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDesc && (
          <>
            {renderDesc && <div style={{ maxWidth: "750px" }}>{description}</div>}
          </>
        )}
        <div className={classes.rating}>
          <Rating value={rating?.rate} precision={0.1}  />
          <small>{rating?.count}</small>
        </div>
        <div>
          <CurrencyFormat amount={price} />
        </div>
        {renderAdd && (
          <button className={classes.btn} onClick={() => alert("Add to cart functionality goes here")}>
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
