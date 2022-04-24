import { ElMessage } from "element-plus"

export default ({
    state: {
        // bno: null,
        // type: null,
        // title: null,
        // press: null,
        // year: null,
        // author: null,
        // price: null,
        // total: null,
        // stock: null
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