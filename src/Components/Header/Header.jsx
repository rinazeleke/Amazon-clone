import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BsSearch } from "react-icons/bs";
import { SlLocationPin } from "react-icons/sl";
import { BiCart } from "react-icons/bi";
import LowerHeader from './LowerHeader';
import classes from "./Header.module.css";
import { DataContext } from '../DataProvider/DataProvider';
import { auth } from '../../Utility/firebase';

const Header = () => {
    const [{ user, basket }] = useContext(DataContext);
    const totalItems = basket?.reduce((amount, item) => item.amount + amount, 0);

    const handleSignOut = () => {
        auth.signOut();
    };

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
                    <input type="text" placeholder="Search Product" />
                    <BsSearch size={38} />
                </div>
                <div className={classes.order_container}>
                    <Link to='/' className={classes.language}>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1024px-Flag_of_the_United_States.svg.png"
                            alt="USA Flag"
                        />
                        <section>
                            <option value="">EN</option>
                        </section>
                    </Link>
                    <Link to={!user ? '/auth' : '#' } onClick={user ? handleSignOut : null}>
                        <div>
                            {user ? (
                                <>
                                    <p>Hello {user.email.split("@")[0]}</p>
                                    <span>Sign Out</span>
                                </>
                            ) : (
                                <>
                                    <p>Hello, Sign In</p>
                                    <span>Account & Lists</span>
                                </>
                            )}
                        </div>
                    </Link>
                    <Link to='/orders'>
                        <p>Returns</p>
                        <span>& Orders</span>
                    </Link>
                    <Link to="/cart" className={classes.cart}>
                        <BiCart size={35} />
                        <span>{totalItems}</span>
                    </Link>
                </div>
            </section>
            <LowerHeader />
        </section>
    );
};

export default Header;
