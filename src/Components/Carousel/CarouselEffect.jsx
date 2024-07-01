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
       infiniteLoop={true}
       showIndicators={false}
       showThumbs={false}
    >
      {
        img?.map((imageItemLink,i)=>{
            return <img key={i} src={imageItemLink}/>
        })
      }
    
    
    </Carousel>
    <div className={classes.hero_img}></div>
        </div>
      );
}

export default CarouselEffect;
