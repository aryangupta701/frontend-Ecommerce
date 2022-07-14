import React from "react";
import "./Success.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { BiCheckCircle } from "react-icons/bi";

const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
      <BiCheckCircle />

      <Typography>Your Order has been Placed successfully </Typography>
      <Link to="/orders">View Orders</Link>
    </div>
  );
};

export default OrderSuccess;