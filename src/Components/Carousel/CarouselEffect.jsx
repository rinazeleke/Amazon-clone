import React from "react";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { img } from "./Images/data";
import classes from "./Carousel.module.css";

function CarouselEffect() {
    return (
        <div>
        <Carousel
            autoPlay={true}
            infiniteloop={true}
            showIndicators={false}
            showThumbs={false}
        >
            {img.map((imgaeItemLink) => { 
                return <img src={imgaeItemLink} />;
            })}
        </Carousel>

        <div className={classes.hero__img}></div>
        </div>
    );
}

export default CarouselEffect;