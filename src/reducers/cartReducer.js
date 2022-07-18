import { ADD_TO_CART , CLEAR_CART_ITEMS, REMOVE_CART_ITEM, SAVE_SHIPPING_DETAILS} from "../constants/cartConstant"
export const cartReducer =(
    (state = {cartItems : [], shippingInfo:{}}, 
    action) => {
        switch(action.type){
            case CLEAR_CART_ITEMS: return {
                ...state, 
                cartItems : []
            }
            case ADD_TO_CART: 
            const item = action.payload
            const isPresent = state.cartItems.find((i)=>i.id === item.id)
            if(!isPresent){
                return {
                    ...state,
                    cartItems : [...state.cartItems, item]
                }
            }
            return {
                ...state, 
                cartItems : state.cartItems.map((i)=>{
                    if(i.id === item.id){
                        return item;
                    }
                    return i
                })
            }
            case REMOVE_CART_ITEM: 
                return {
                    ...state, 
                    cartItems : state.cartItems.filter((item)=> item.id !== action.payload)
                }
            case SAVE_SHIPPING_DETAILS: 
                return{
                    ...state,
                    shippingInfo: action.payload
                }

            default : return state;
        }
})
