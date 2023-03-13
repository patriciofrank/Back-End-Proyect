export const getManagerMessages = async () => {
    const modelMessage = await import('./MongoDB/models/Message.js') 
       
    return modelMessage
}

export const getManagerProducts = async () => {
    const modelProduct = await import('./MongoDB/models/Product.js') 
        

    return modelProduct
}

export const getManagerCart = async () => {
    const modelCart =  await import('./MongoDB/models/Cart.js') 
    

    return modelCart
}