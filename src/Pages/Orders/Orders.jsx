import React,{useContext,useState, useEffect} from "react";
import classes from "./Orders.module.css";
import LayOut from "../../Components/Layout/LayOut";
import { db } from "../../Utility/firebase";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";

function Orders() {
  const [{user}, dispatch] = useContext(DataContext)
  const [orders, setOrders] =useState([])
  useEffect(() => {
    if(user){
      db.collection("users").doc(user.uid).collection("orders").orderBy("created","desc").onSnapshot((Snapshot) =>{
        console.log(Snapshot);
        setOrders(
          Snapshot.docs.map((doc) =>({
            id:doc.id,
            data:doc.data()
          }))
        )
      })
    }else{
      setOrders([])
    }
  }, []);
  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders_container}>
          <h2>your Orders</h2> 
          {orders?.length === 0 && <div style={{padding:"20px"}}>
            you don't have orders yet.
            </div>}
          {/* ordered items */}
          <div>{
            orders?.map((eachOrder)=>{

              return(
                <div>
                  <hr/>
                  <p>Order ID: {eachOrder?.id}</p>
                  {
                    eachOrder?.data?.basket?.map(order=>{
                      return(
                        <ProductCard 
                            flex={true}
                            product={order}
                            key={order.id}
                        />
                      );
                    })}
                </div>
              )

            })
          }</div>
        </div>
      </section>
    </LayOut>
  );
}

export default Orders;

