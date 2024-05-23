import React from "react";
import classes from "./Category.module.css";

import { categoryInfos } from "./CategoryInformation";
import CategoryCard from "./CategoryCard";

function Category() {
  return (
    <section className={classes.category__container}>
      {categoryInfos.map((infos) => (
        <CategoryCard data={infos} key={infos.id} />
      ))}
    </section>
  );
}

export default Category;
