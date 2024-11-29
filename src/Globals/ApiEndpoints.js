const IP_ADDRESS = 'https://warrantify-app.onrender.com'

export const ApiEndpoints = {
    fetchProductByUser: `${IP_ADDRESS}/api/product/findproduct`,
    saveProductInfo: `${IP_ADDRESS}/api/auth/productInfo`,
    signInApi: `${IP_ADDRESS}/api/auth/login`,
    signUpApi: `${IP_ADDRESS}/api/auth/signInForMobapp`,
    deleteCard: `${IP_ADDRESS}/api/product/deleteCard`
}