const state = {
    user: {
        name: "Mekontso Anderson",
        email: "mekontsoanderson@gmail.com",
        id: "id",
        role_name: "Admin",
    }
}

const getters = {
    getUserData(state) {
        return state.user
    }
}

export default {
    state,
    getters,
}
