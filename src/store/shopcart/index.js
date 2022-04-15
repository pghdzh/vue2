import { reqShopCartList, reqDeleteCartById, reqUpdateCartChecked } from "@/api";
import { userTemp } from "@/utils/temp_token";
const state = {
    shopList: [],
    userTempId: userTemp(),
}

const mutations = {
    GETSHOPCART(state, shopList) {
        state.shopList = shopList;
    }
}

const actions = {
    async getShopCart({ commit }) {
        let result = await reqShopCartList();
        console.log("购物车数据", result)
        if (result.code == 200) {
            commit('GETSHOPCART', result.data)
        }
    },

    async deleteCart({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId);
        if (result.code == 200) {
            return 'ok';
        }
        else {
            return Promise.reject(new Error('faile'))
        }
    },

    async updateChecked({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCartChecked(skuId, isChecked);
        if (result.code == 200) {
            return 'ok';
        }
        else {
            return Promise.reject(new Error('faile'));
        }
    },

    updateAllCart({ getters, dispatch, commit }, isChecked) {
        let arr = []
        getters.shopCartData.cartInfoList.forEach(cart => {
            let Promise = dispatch('updateChecked', { skuId: cart.skuId, isChecked });
            arr.push(Promise);
        })
        return Promise.all(arr);
    },

    deleteCartChecked({ getters, dispatch }) {
        let arr = [];
        getters.shopCartData.cartInfoList.forEach(item => {
            if (item.isChecked == 1) {
                let promise = dispatch("deleteCart", item.skuId);
                arr.push(promise);
            }
        })
        return Promise.all(arr);
    }
}

const getters = {
    shopCartData(state) {
        return state.shopList[0] || {}
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}