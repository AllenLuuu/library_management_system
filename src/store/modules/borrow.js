import { ElMessage } from "element-plus"

export default ({
    state: {
        borrows: [],
        borrowedBooks: []
    },
    getters: {
    },
    mutations: {
        setBorrows(state, borrows) {
            state.borrows = borrows
        },
        setBorrowedBooks(state, borrowedBooks) {
            state.borrowedBooks = borrowedBooks
        },
        pushBorrowedBook(state, book) {
            state.borrowedBooks.push(book)
        },
    },
    actions: {
        getBorrowedBooks({ commit, state }, { cid }) {
            window.$.ajax('/borrow/getRecords', {
                method: "POST",
                data: { cid },
                success(res) {
                    if (res === "no card") {
                        ElMessage({
                            message: "无此借书卡",
                            type: "error"
                        })
                    }
                    else {
                        commit('setBorrows', eval(res))
                        console.log(state.borrows)
                        window.$.ajax('/borrow/getBorrowed', {
                            method: "POST",
                            data: { borrows: state.borrows },
                            success(res) {
                                commit('setBorrowedBooks', eval(res))
                            }
                        })
                    }
                },
                error: (jqXHR, textStatus, errorThrown) => {
                    ElMessage({
                        message: "查询失败" + errorThrown,
                        type: "error"
                    })
                }
            })
        },
        borrowBook({ dispatch }, { borrowData, queriedBno }) {
            window.$.ajax("/borrow/borrow", {
                method: "POST",
                data: borrowData,
                success(res) {
                    if (res === "borrowed") {
                        ElMessage({
                            message: "此卡已借过此书，不可重复借书",
                            type: "warning",
                        });
                    }
                    // else if (res === "no card") {
                    //     ElMessage({
                    //         message: "无此借书卡",
                    //         type: "error"
                    //     })
                    // }
                    else if (res === "success") {
                        ElMessage({
                            message: "借阅成功",
                            type: "success",
                        });
                        // commit('setBooks', eval(res))
                        dispatch('getQueriedBooks', { cid: borrowData.cid, bno: queriedBno })
                        dispatch('getBorrowedBooks', { cid: borrowData.cid })
                    }
                },
                error: (jqXHR, textStatus, errorThrown) => {
                    ElMessage({
                        message: "借阅失败" + errorThrown,
                        type: "error",
                    });
                },
            });
        },
        returnBook({ dispatch }, {returnData, queriedBno}) {
            window.$.ajax('/borrow/return', {
                method: "POST",
                data: returnData,
                success(res) {
                    if (res === "success") {
                        ElMessage({
                            message: "还书成功",
                            type: "success"
                        })
                        dispatch('getQueriedBooks', { cid: returnData.cid, bno: queriedBno })
                        dispatch('getBorrowedBooks', { cid: returnData.cid })
                    }
                    // commit('setBorrowedBooks', eval(res))
                },
                error: (jqXHR, textStatus, errorThrown) => {
                    ElMessage({
                        message: "还书失败" + errorThrown,
                        type: "error",
                    });
                },
            })
        },
        getQueriedBooks({ commit }, { cid, bno }) {
            window.$.ajax('/borrow/getBooks', {
                method: "POST",
                data: { cid, bno },
                success(res) {
                    if (res === "no card") {
                        ElMessage({
                            message: "无此借书卡",
                            type: "error"
                        })
                    }
                    else {
                        commit('setBooks', eval(res))
                    }
                }
            })
        }
    }
})