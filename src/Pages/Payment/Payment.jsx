import React,{useContext, useState} from "react";
import classes from "./Payment.module.css";
import LayOut from "../../Components/Layout/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard"
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { db} from "../../Utility/firebase"
import { Navigate, useNavigate } from "react-router-dom";
import { Type } from "../../Utility/action.type";

function Payment() {
  const [{user, basket}, dispatch] = useContext(DataContext);
  console .log(user);

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0); // Added 0 as the initial value


const [cardError, setCardError] = useState(null);
const [processing, setProcessing] = useState(false)

const stripe = useStripe();
const elements = useElements();
const navigate = useNavigate();


    const handleChange = (e) =>{
      console.log(e);
      e?.error?.massage? setCardError( e?.error?.massage) : setCardError("")
    };  
    
    const handlePayment = async (e) => {
      e.preventDefault();

      try {
        setProcessing(true)
      // 1 , backend || function --> contact to the client secret
        const response =  await axiosInstance({
          method:"POST",
          url:`/payment/create?total=${ total*100 }`,
        })
        console.log(response.data);
        const clientSecret = response.data?.clientSecret;
          
      //2, client side (react side conformation)
        const confirmation = await stripe.confirmCardPayment
        (clientSecret,{ 
          payment_method: {
            card: elements.getElement(CardElement),
          },
        });

        // console.log(confirmation);
      // 3, after conformation --> order firestore database save and clear basket
        await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket:basket,
          amount:paymentIntent.amount,
          created:paymentIntent.created
        });
        
        // empty the basket
        dispatch({type:Type.EMPTY_BASKET});
        
        setProcessing(false)
        navigate("/orders", {state:{msg:"you have placed now order"}})
      } catch (error) {
        console.log(error);
        setProcessing(false)
      }
      
    };
  return (
    <LayOut>
      {/* header */}
      <div className={classes.payment__header}>Checkout ({totalItem }) items</div>
      {/* payment method */}
      <section className={classes.payment}>
        {/* address */}
        <div className={classes.flex}>
          <h3>Delivery address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React lene</div>
            <div>Chicago, IL</div>
          </div>
        </div>
        <hr/>

        {/* product */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {
              basket?.map((item)=><ProductCard product={item} flex={true}/>)
            }
          </div>
        </div>
        <hr/>

        {/* card form */}
        <div className={classes.flex}>
          <h3>Payment methods</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
              <form onChange={handlePayment}>
                {cardError && <small style={{ color : "red" }}>{cardError}</small>}
                <CardElement onChange={handleChange}/>
                <div className={classes.payment__price}>
                  <div>
                    <span style={{display: "flex", gap: "10px"}}>
                      <p>total Order |</p> <CurrencyFormat amount={total}/>
                    </span>
                  </div>
                  <button type="submit">
                    {
                      processing? (
                        <div className="classes.loading">
                          <ClipLoader color="gray" size={12}/>
                          <p>Please wait ...</p>
                        </div>
                      ):"Pay Now"
                    }
                    </button>
                </div>
              </form>
            </div>
          </div>
        </div>

      </section>
    </LayOut>
  );
}

export default Payment;
