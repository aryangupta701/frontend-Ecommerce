import React, { useEffect,Fragment, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { clearErrors,getProduct } from '../../actions/productActions'
import Loader from '../layout/loader/Loader'
import { useAlert } from 'react-alert'
import ProductCard from '../Home/ProductCard'
import './Product.css'
import Pagination from 'react-js-pagination'
import { useParams } from 'react-router-dom'
import Slider from '@mui/material/Slider'
import Typography from '@mui/material/Typography'
import MetaData from '../layout/MetaData'

const categories = [
    "smartphone",
    "HeadPhones",
    "Shoes",
    "T-Shirts",
    "Jeans",
    "Laptops"
]

const Products = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const [price,setPrice] = useState([0,250000])
    const [category,setCategory] = useState()
    const priceHandler = (e,newPrice)=>{
        setPrice(newPrice)
    }

    const [rating,setRating] = useState(0)
    const ratingHandler = (e,newRating)=>{
        setRating(newRating)
    }

    if(category)
    console.log(category)
    const {products,loading,error,productCount,resultPerPage,filteredProductsCount} = useSelector(state => state.products)
    let count = filteredProductsCount
    const [currentPage,setCurrentPage] = useState(1)
    const setCurrentPageNumber = (event)=>{
        setCurrentPage(event)
    }
    const {keyword} = useParams()
    // console.log(keyword)
    useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch(clearErrors()) 
        }
        dispatch(getProduct(keyword,currentPage,price,category,rating))
    },[dispatch,error,alert,keyword,currentPage,price,category,rating])
    // console.log(productCount)
    
  return (
    <Fragment>
        {
            loading ? <Loader />: 
            <Fragment>
                <MetaData title="PRODUCTS -- ECOMMERCE" />
                <h2 className='productsHeading'>Products</h2>
                <div className='products'>
                    {
                    products.map(item => <ProductCard product={item} key={item._id}/>
                    )}
                </div>
                <div className='filterBox'>
                    <Typography>Price</Typography>
                    <Slider 
                        value={price}
                        onChange={priceHandler}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        min={0}
                        max={250000}
                        />
                    <Typography>Categories</Typography>
                    <ul className='categoryBox'>
                        {categories.map(category => (
                            <li className='category-link' key={category} onClick={()=>setCategory(category)}>
                                {category}
                            </li>
                        ))}
                    </ul>
                    <fieldset >
                        <Typography component="legend">Ratings Above</Typography>
                        <Slider 
                            aria-labelledby="continuous-slider"
                            min={0}
                            max={5}
                            onChange={ratingHandler}
                            value={rating}
                            valueLabelDisplay="auto"
                        />
                    </fieldset>
                </div>
                
                {resultPerPage < count && 
                    <div className='paginationBox'>
                    <Pagination 
                        activePage={currentPage} 
                        itemsCountPerPage={resultPerPage}
                        totalItemsCount={productCount}
                        onChange={setCurrentPageNumber}
                        nextPageText="Next"
                        prevPageText="Prev"
                        firstPageText="First"
                        lastPageText="Last"
                        itemClass='page-item'
                        linkClass='page-link'
                        activeClass='pageItemActive'
                        activeLinkClass='pageLinkActive'
                    />
                </div>
                }
            </Fragment>

        }
    </Fragment>
  )
}

export default Products