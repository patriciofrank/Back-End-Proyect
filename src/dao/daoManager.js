export const getManagerMenssages = async () => {
    const modelMessage = process.env.SELECTEDBDD == 1 ? await import('./MongoDB/models/Menssage.js') :
        await import('./Postgresql/models/Menssage.js')
    return modelMessage
}

export const getManagerProducts = async () => {
    const modelProduct = process.env.SELECTEDBDD == 1 ? await import('./MongoDB/models/Product.js') :
        await import('./Postgresql/models/Product.js')

    return modelProduct
}

export const getManagerCart = async () => {
    const modelCart = process.env.SELECTEDBDD == 1 ? await import('./MongoDB/models/Cart.js') :
        await import('./Postgresql/models/Cart.js')

    return modelCart
}