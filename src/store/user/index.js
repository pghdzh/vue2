import { reqCode, reqRegister, reqLogin, reqUserInfo, reqLogout } from "@/api";
import { setToken, getToken, clearToken } from "@/utils/token";
const state = {
    code: '',
    token: getToken(),
    userInfo: {}
}

const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    SETTOKEN(state, token) {
        state.token = token;
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo;
    },
    USERLOGOUT(state) {
        state.token = ''
        state.userInfo = {}
        clearToken();
    }

}

const actions = {
    async getCode({ commit }, phone) {
        let result = await reqCode(phone);
        console.log('验证码', result)
        if (result.code == 200) {
            commit('GETCODE', result.data);
            return 'ok';
        }
        else {
            return Promise.reject(new Error('faile'));
        }
    },

    async userRegister({ commit }, { phone, code, password }) {
        let result = await reqRegister(phone, code, password);
        if (result.code == 200) {
            return 'ok';
        }
        else {
            return Promise.reject(result.message);
        }
    },

    async userLogin({ commit }, { phone, password }) {
        let result = await reqLogin(phone, password);
        console.log('获取用户token', result.data)
        if (result.code == 200) {
            commit("SETTOKEN", result.data.token)
            setToken(result.data.token);
            return 'ok';
        }
        else {
            return Promise.reject(result.message);
        }
    },

    async getUserInfo({ commit }) {
        let result = await reqUserInfo();
        console.log("获取用户信息", result.data)
        if (result.code == 200) {
            commit("GETUSERINFO", result.data);
            return "ok";
        }
        else {
            return Promise.reject(new Error('faile'));
        }
    },

    async userLogout({ commit }) {
        let result = await reqLogout();
        if (result.code == 200) {
            commit("USERLOGOUT");
        }
    }
}

const getters = {

}

export default {
    state,
    mutations,
    actions,
    getters
}