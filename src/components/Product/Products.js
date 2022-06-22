import React, { useEffect,Fragment, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { clearErrors,getProduct } from '../../actions/productActions'
import Loader from '../loader/Loader'
import { useAlert } from 'react-alert'
import ProductCard from '../Home/ProductCard'
import './Product.css'
import Pagination from 'react-js-pagination'
import { useParams } from 'react-router-dom'

const Products = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const {products,loading,error,productCount,resultPerPage} = useSelector(state => state.products)
    const [currentPage,setCurrentPage] = useState(1)
    const setCurrentPageNumber = (event)=>{
        setCurrentPage(event)
    }
    const {keyword} = useParams()
    useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch(clearErrors()) 
        }
        dispatch(getProduct(keyword,currentPage))
    },[dispatch,error,alert,keyword,currentPage])
    console.log(productCount)
  return (
    <Fragment>
        {
            loading ? <Loader />: 
            <Fragment>
                <h2 className='productsHeading'>Products</h2>
                <div className='products'>
                    {
                    products.map(item => <ProductCard product={item} key={item._id}/>
                    )}
                </div>
                {resultPerPage < productCount && 
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