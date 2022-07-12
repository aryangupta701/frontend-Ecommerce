import { ADD_TO_CART , REMOVE_CART_ITEM} from "../constants/cartConstant"
export const cartReducer =(
    (state = {cartItems : []}, 
    action) => {
        switch(action.type){
            case ADD_TO_CART: 
            const item = action.payload
            const isPresent = state.cartItems.find((i)=>i.id == item.id)
            if(!isPresent){
                return {
                    ...state,
                    cartItems : [...state.cartItems, item]
                }
            }
            return {
                ...state, 
                cartItems : state.cartItems.map((i)=>{
                    if(i.id == item.id){
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

            default : return state;
        }
})