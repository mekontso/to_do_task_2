const state = {
    snackData:{
        text:"",
        view:false,
        color:""
    }
}

const getters = {
    getSnackData(state){
        return state.snackData
    }
}

const mutations ={
    setSnackData(state,payload){
        state.snackData.text = payload.text,
        state.snackData.color = payload.color,
        state.snackData.view = payload.view
    },
    closeSnackbar(state){
        state.snackData.view = false
    },
    alertSuccess(state, message){
        state.snackData.view = false
        state.snackData.color = "success"
        state.snackData.text = message
        state.snackData.view = true
    },
    alertWarning(state, message){
        state.snackData.view = false
        state.snackData.color = "warning"
        state.snackData.text = message
        state.snackData.view = true
    },
    alertError(state, message){
        state.snackData.view = false
        state.snackData.color = "error"
        state.snackData.text = message
        state.snackData.view = true
    }


}

export default {
    state,
    getters,
    mutations
}
