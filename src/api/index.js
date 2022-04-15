import requests from './request'
import mockRequest from './mockRequest'


export const reqCategoryList = () => {
    return requests({ url: '/product/getBaseCategoryList', method: 'get' });
}

export const reqGetBannerList = () => {
    return mockRequest({ url: '/banner', method: 'get' });
}

export const reqGetFloorList = () => {
    return mockRequest({ url: '/floor', method: 'get' });
}

export const reqGetSearchInfo = (params) => requests({ url: "/list", method: "post", data: params })

export const reqDetailList = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' });

export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' });

export const reqShopCartList = () => requests({ url: '/cart/cartList', method: 'get' });

export const reqDeleteCartById = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' });

export const reqUpdateCartChecked = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' });

export const reqCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' });

export const reqRegister = (phone, code, password) => requests({ url: `user/passport/register`, method: 'post', data: { phone, code, password } });

export const reqLogin = (phone, password) => requests({ url: `/user/passport/login`, method: 'post', data: { phone, password } });

export const reqUserInfo = () => requests({ url: `/user/passport/auth/getUserInfo`, method: 'get' });

export const reqLogout = () => requests({ url: `/user/passport/logout`, method: 'get' });

export const reqAddressInfo = () => requests({ url: `/user/userAddress/auth/findUserAddressList`, method: 'get' });

export const reqShopCartInfo = () => requests({ url: `/order/auth/trade`, method: 'get' });

export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, method: 'post', data });

export const reqOrderPay = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' });

export const reqOrderStatus = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' });

export const reqMyList = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'get' });
