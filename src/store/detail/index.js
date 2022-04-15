import { reqDetailList, reqAddOrUpdateShopCart } from "@/api";

const state = {
    detailList: {},
    
};

const mutations = {
    GETDETAILLIST: (state, detailList) => {
        state.detailList = detailList;
    }
};

const actions = {
    async getDetailList({ commit }, skuId) {
        let result = await reqDetailList(skuId);
        console.log("详情页数据", result.data)
        if (result.code == 200) {
            commit("GETDETAILLIST", result.data);
        }
    },
    async addShopCart({commit},{ skuId, skuNum }) {
        let result = await reqAddOrUpdateShopCart(skuId, skuNum);
        console.log("加入购物车信息",result)
        if (result.code == 200) {
            return 'ok';
        }
        else {
            return Promise.reject(new Error('faile'));
        }
    }
};

const getters = {
    categoryView(state) {
        return state.detailList.categoryView || {};
    },
    spuSaleAttrList(state) {
        return state.detailList.spuSaleAttrList;
    },
    skuInfo(state) {
        return state.detailList.skuInfo || {};
    }

};

export default {
    state,
    mutations,
    actions,
    getters
}