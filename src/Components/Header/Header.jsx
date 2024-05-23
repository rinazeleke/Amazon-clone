import React from 'react'
import { BsSearch } from "react-icons/bs";
import { SlLocationPin } from "react-icons/sl";
import { BiCart } from "react-icons/bi";
import LowerHeader from './LowerHeader';
import classes from "./Header.module.css";

function Header() {
    return (
        <section className={classes.fixed}>
            <section className={classes.header_container}>
                <div className={classes.logo_container}>
                    {/* logo */}
                    <a href="">
                        <img src='https://pngimg.com/uploads/amazon/amazon_PNG11.png' alt='Amazon Logo' />
                    </a>
                    <div className={classes.delivery}>
                    {/* Delivery */}
                        <span>
                            {/* icon */}
                            <SlLocationPin />
                        </span>
                        <div>
                            <p>Delivered to</p>
                            <span>Ethiopia</span>
                        </div>
                    </div>
                </div>
                <div className={classes.search}>
                    {/* search */}
                    <select name="" id="">
                        <option value="">All</option>
                    </select>
                    <input type="text" name="" id="" placeholder="Search Product" />
                    {/* icon */}
                    <BsSearch size={25} />
                </div>
                {/* Right Side link */}
                <div  className={classes.order_container}>
                    <a href=''  className={classes.language}>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1024px-Flag_of_the_United_States.svg.png"
                            alt="USA Flag"
                        />
                        <section>
                            <option value="">EN</option>
                        </section>
                    </a>
                    {/* three Components */}
                    <a href='' >
                        <div>
                            <p>Sign In</p>
                            <span>Account & Lists</span>
                        </div>
                    </a>
                    {/* orders */}
                    <a href='' >
                        <p>returns</p>
                        <span>& Orders</span>
                    </a>
                    {/* cart */}
                    <a to="/cart" className={classes.cart}>
                    {/* icon */}
                        <BiCart size={35} />
                        <span>0</span>
                    </a>    
                </div>    
            </section>
            <LowerHeader/>
        </section>
    )
}

export default Header


