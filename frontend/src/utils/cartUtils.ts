export const addDecimals = (num: number): string => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  
  type CartItem = {
    _id: string;
    name: string;
    price: number;
    qty: number;
  };
  
  type CartState = {
    cartItems: CartItem[];
    itemsPrice?: string;
    shippingPrice?: string;
    taxPrice?: string;
    totalPrice?: string;
  };
  
  export const updateCart = (state) => {
    const itemsPrice = state.cartItems.reduce(
      (acc, item) => acc + (item.price * 100 * item.qty) / 100,
      0
    );
    state.itemsPrice = addDecimals(itemsPrice);
  
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    state.shippingPrice = addDecimals(shippingPrice);
  
    const taxPrice = 0.15 * itemsPrice;
    state.taxPrice = addDecimals(taxPrice);
  
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    state.totalPrice = addDecimals(totalPrice);
  
    localStorage.setItem("cart", JSON.stringify(state));
  
    return state;
  };
  