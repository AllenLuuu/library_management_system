import { ElMessage } from "element-plus"

export default ({
    state: {
        books: []
    },
    getters: {
    },
    mutations: {
        setBooks(state, books) {
            state.books = books
        },
        pushBook(state, book) {
            state.books.push(book)
        }
    },
    actions: {
        async query({ commit }, whereString) {
            window.$.ajax('/book/query', {
                method: "POST",
                data: {
                    op: whereString
                },
                success(res) {
                    commit('setBooks', eval(res))
                },
                error: (jqXHR, textStatus, errorThrown) => {
                    ElMessage({
                        message: "查询失败" + errorThrown,
                        type: "error"
                    })
                }
            })
        },
    }
})