import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import { BsSearch } from "react-icons/bs";
import { SlLocationPin } from "react-icons/sl";
import { BiCart } from "react-icons/bi";
import LowerHeader from './LowerHeader';
import classes from "./Header.module.css";
import { DataContext } from '../DataProvider/DataProvider';

const Header = () => {
 
    const[{basket},dispatch]=useContext(DataContext)
    console.log(basket.length)
    return (
        <section className={classes.fixed}>
            <section className={classes.header_container}>
                <div className={classes.logo_container}>
                    {/* logo */}
                    <Link to="/">
                        <img src='https://pngimg.com/uploads/amazon/amazon_PNG11.png' alt='Amazon Logo' />
                    </Link>
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
                    <Link to='/'  className={classes.language}>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1024px-Flag_of_the_United_States.svg.png"
                            alt="USA Flag"
                        />
                        <section>
                            <option value="">EN</option>
                        </section>
                    </Link>
                    {/* three Components */}
                    <Link to='/auth' >
                        <div>
                            <p>Sign In</p>
                            <span>Account & Lists</span>
                        </div>
                    </Link>
                    {/* orders */}
                    <Link to='/orders' >
                        <p>returns</p>
                        <span>& Orders</span>
                    </Link>
                    {/* cart */}
                    <Link to="/cart" className={classes.cart}>
                    {/* icon */}
                        <BiCart size={35} />
                        <span>{basket.length}</span>
                    </Link>    
                </div>    
            </section>
            <LowerHeader/>
        </section>
    )
}

export default Header


