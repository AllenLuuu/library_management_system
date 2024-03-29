import { ElMessage } from "element-plus"

export default ({
    state: {
        user_name: "",
        user_id: null,
        login_status: false,
        opNum: 0
        // privilege_level: ""
    },
    getters: {
    },
    mutations: {
        setUser(state, { name, id }) {
            state.user_name = name
            state.user_id = id
        },
        setStatus(state, status) {
            state.login_status = status
        },
        setOpNum(state, num) {
            state.opNum = num
        }
    },
    actions: {
        async login({ commit }, { id, password }) {
            window.$.ajax('/lib/user/login', {
                method: "POST",
                data: { id, password },
                success(res) {
                    if (res === "unsigned") {
                        ElMessage({
                            message: "此账号尚未注册",
                            type: "warning"
                        })
                    }
                    else if (res === "wrong") {
                        ElMessage({
                            message: "密码错误",
                            type: "warning"
                        })
                    }
                    else {
                        ElMessage({
                            message: "登录成功",
                            type: "success"
                        })
                        commit("setUser", {
                            name: res.name,
                            id: res.id
                        })
                        commit('setStatus', true)
                    }
                },
                error: (jqXHR, textStatus, errorThrown) => {
                    ElMessage({
                        message: "登录失败" + errorThrown,
                        type: "error"
                    })
                }
            })
        },
        async logout({ commit }) {
            commit("setUser", {
                name: null,
                id: null
            })
            commit('setStatus', false)
        },
        async signUp({ commit }, { id, name, password, contact }) {
            window.$.ajax('/lib/user/signup', {
                method: "POST",
                data: {
                    id, name, password, contact
                },
                success(res) {
                    if (res === "success") {
                        ElMessage({
                            message: "注册成功",
                            type: "success"
                        })
                        commit("setUser", {
                            name: name,
                            id: id
                        })
                        commit('setStatus', true)
                    }
                    else if (res === "signed up before") {
                        ElMessage({
                            message: "此账号已注册",
                            type: "warning"
                        })
                    }
                },
                error: (jqXHR, textStatus, errorThrown) => {
                    ElMessage({
                        message: "注册失败" + errorThrown,
                        type: "error"
                    })
                }
            })
        },
        async getOpNum({ state, commit }) {
            window.$.ajax("/lib/user/opNum", {
                method: "POST",
                data: { id: state.user_id },
                success(res) {
                    commit('setOpNum', res.count)
                },
            });
        }
    }
})