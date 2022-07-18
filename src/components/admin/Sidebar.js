import React from 'react'
import { FaListAlt } from 'react-icons/fa'
import { FcAddDatabase } from 'react-icons/fc'
import { MdDashboard, MdPeople, MdRateReview } from 'react-icons/md'
import { Link } from 'react-router-dom'
import './Sidebar.css'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <Link to = '/admin/dashboard'>
            <p className='dashBoardClass'>
                <MdDashboard /> Dashboard
            </p>
        </Link>
        {/* <Link> */}
        
            {/* <TreeView 
                defaultCollapseIcon={<MdExpandMore />}
                defaultExpandIcon={<MdImportExport />}
            >
                <span className='treeviewProduct'>
                <TreeItem nodeId='1' label="Products" className='treeItemClass'>
                    <Link to="/admin/products">
                        <TreeItem nodeId='2' label="All" icon={<FcAddImage/>} />
                    </Link>
                    <Link to="/admin/product">
                        <TreeItem nodeId='3' label="Create" icon={<FcAddImage/>} />
                    </Link>
                </TreeItem>
                </span>
            </TreeView> */}
        
        {/* </Link> */}
        <Link to='/admin/products'>
            <p>
                <FcAddDatabase /> All Products
            </p>
        </Link>
        <Link to='/admin/product'>
            <p>
                <FcAddDatabase /> Create Product
            </p>
        </Link>
        <Link to='/admin/orders'>
            <p>
                <FaListAlt /> Orders
            </p>
        </Link>
        <Link to='/admin/users'>
            <p>
                <MdPeople /> Users
            </p>
        </Link>
        <Link to='/admin/reviews'>
            <p>
                <MdRateReview /> Reviews
            </p>
        </Link>
    </div>
  )
}

export default Sidebar