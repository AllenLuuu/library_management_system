import { ElMessage } from "element-plus"

export default ({
    state: {
        cards: []
    },
    getters: {
    },
    mutations: {
        setCards(state, cards) {
            state.cards = cards
        }
    },
    actions: {
        async cardSearch({ commit }, { cid }) {
            window.$.ajax('/lib/cards/search', {
                method: "POST",
                data: { cid },
                success(res) {
                    commit('setCards', eval(res))
                },
                error(jqXHR, textStatus, errorThrown) {
                    ElMessage({
                        message: "查询失败" + errorThrown,
                        type: "error"
                    })
                }
            })
        },
        async cardDelete({ dispatch }, { cid, currentQuery }) {
            window.$.ajax('/lib/cards/delete', {
                method: "POST",
                data: { cid },
                success(res) {
                    if (res === "error") {
                        ElMessage({
                            message: "仍有书未还，不得删卡",
                            type: "error"
                        })
                    }
                    else {
                        dispatch('cardSearch', { cid: currentQuery })
                    }
                },
                error(jqXHR, textStatus, errorThrown) {
                    ElMessage({
                        message: "删除失败" + errorThrown,
                        type: "error"
                    })
                }
            })
        }
    }
})