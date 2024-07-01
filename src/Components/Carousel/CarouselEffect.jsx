import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { img } from "./Images/data";
import classes from "./Carousel.module.css";

function CarouselEffect() {
    return (
        <div className={classes.carouselContainer}>
            <Carousel
                autoPlay={true}
                infiniteLoop={true}
                showIndicators={false}
                showThumbs={false}
            >
                {img.map((imageItemLink, index) => (
                    <img key={index} src={imageItemLink} alt={`Carousel image ${index + 1}`} />
                ))}
            </Carousel>
            <div className={classes.hero__img}></div>
        </div>
    );
}

export default CarouselEffect;
