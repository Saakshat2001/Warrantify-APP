const IP_ADDRESS = '192.168.8.169'

export const ApiEndpoints = {
    fetchProductByUser: `http://${IP_ADDRESS}:3000/api/product/findproduct`,
    saveProductInfo: `http://${IP_ADDRESS}:3000/api/auth/productInfo`,
    signInApi: `http://${IP_ADDRESS}:3000/api/auth/login`,
    signUpApi: `http://${IP_ADDRESS}:3000/api/auth/signin`
}