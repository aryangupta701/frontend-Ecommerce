import React, { Fragment, useEffect } from 'react'
import Sidebar from './Sidebar.js'
import './AdminDashBoard.css' 
import { Typography } from '@mui/material'
import MetaData from '../layout/MetaData.js'
import { Link } from 'react-router-dom'
import Chart from 'chart.js/auto';
import { useDispatch, useSelector } from 'react-redux'
import {Doughnut,Line} from 'react-chartjs-2'
import {CategoryScale} from 'chart.js'; 
import { getAdminProduct } from '../../actions/productActions.js'
import { getAllOrders } from '../../actions/orderActions.js'
import { getAllUsers } from '../../actions/userActions.js'
import Loader from '../layout/loader/Loader.js'

const AdminDashBoard = () => {
    Chart.register(CategoryScale);
    const dispatch = useDispatch()
    const {error: allOrdersError, loading, orders} = useSelector(state => state.allOrders)
    const {error,products,loading: productLoading} = useSelector(state => state.products)
    const{error: userError, users, loading: userLoading} = useSelector(state => state.allUsers)

    useEffect(()=>{
      if(error){
        alert.error(error)
      }
      if(allOrdersError){
        alert.error(allOrdersError)
      }
      if(userError){
        alert.error(userError)
      }
      dispatch(getAdminProduct());
      dispatch(getAllOrders())
      dispatch(getAllUsers())
    },[dispatch,error,userError,allOrdersError])

    let outOfStock = 0 
    products && products.forEach(item => {
      if(item.stock === 0){
        outOfStock += 1
      }
    })

    const totalAmount = 345324
    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
          {
            label: "TOTAL AMOUNT",
            backgroundColor: ["tomato"],
            hoverBackgroundColor: ["rgb(197, 72, 49)"],
            data: [0, totalAmount],
          },
        ],
      };
    
      const doughnutState = {
        labels: ["Out of Stock", "InStock"],
        datasets: [
          {
            backgroundColor: ["#00A6B4", "#6800B4"],
            hoverBackgroundColor: ["#4B5000", "#35014F"],
            data: [outOfStock, products.length - outOfStock],
          },
        ],
      };
  return <Fragment>
    { (loading || productLoading || userLoading) ? <Loader/> : (
    <div className="dashboard">
    <MetaData title="Dashboard - Admin Panel" />
    <Sidebar />

    <div className="dashboardContainer">
      <Typography component="h1">Dashboard</Typography>

      <div className="dashboardSummary">
        <div>
          <p>
            Total Amount <br /> ₹{totalAmount}
          </p>
        </div>
        <div className="dashboardSummaryBox2">
          <Link to="/admin/products">
            <p>Product</p>
            <p>{products && products.length}</p>
          </Link>
          <Link to="/admin/orders">
            <p>Orders</p>
            <p>{orders && orders.length}</p>
          </Link>
          <Link to="/admin/users">
            <p>Users</p>
            <p>{users && users.length}</p>
          </Link>
        </div>
      </div>

      <div className="lineChart">
        <Line data={lineState} />
      </div>

      <div className="doughnutChart">
        <Doughnut data={doughnutState} />
      </div>
    </div>
  </div>
  )}
  </Fragment>
}

export default AdminDashBoard