const state = {
    todos : [
        {
            id:12345,
            title:"Plan project",
            description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius laboriosam necessitatibus nemo officia ratione, sint suscipit. Ab adipisci aliquid, dignissimos, dolor, dolores earum incidunt ipsam maiores officiis repellat unde voluptatem!",
            due_date:"2021-02-22",
            priority:"High",
            status:"Terminated"
        },
        {
            id:12346,
            title:"Design database",
            description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius laboriosam necessitatibus nemo officia ratione, sint suscipit. Ab adipisci aliquid, dignissimos, dolor, dolores earum incidunt ipsam maiores officiis repellat unde voluptatem!",
            due_date:"2021-03-31",
            priority:"Low",
            status:"Ongoing"
        },
        {
            id:12347,
            title:"Design User Interface",
            description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius laboriosam necessitatibus nemo officia ratione, sint suscipit. Ab adipisci aliquid, dignissimos, dolor, dolores earum incidunt ipsam maiores officiis repellat unde voluptatem!",
            due_date:"2021-04-22",
            priority:"Medium",
            status:"Pending"
        }
    ],
    editedIndex: -1,
    todo:{
        id:"",
        title:"",
        description:"",
        due_date:"",
        priority:"",
        status:""
    },
    dialog:false
}

const getters = {
    getAllTodos(state){
        return state.todos
    },
    formTitle(state) {
        return state.editedIndex === -1 ? 'New Todo' : 'Edit Todo'
    },
    getDialog(state){
        return state.dialog
    },
    getTodoId(state){
        return state.todo.id
    },
    getTodoTitle(state){
        return state.todo.title
    },
    getTodoDescription(state){
        return state.todo.description
    },
    getTodoDueDate(state){
        return state.todo.due_date
    },
    getTodoPriority(state){
        return state.todo.priority
    },
    getTodoStatus(state){
        return state.todo.status
    },
}

const actions = {
    editTodo({state,commit},item){
        commit('setEditedIndex',1)
        commit('openDialog')
        state.todo = {
            id:item.id,
            title:item.title,
            description:item.description,
            due_date:item.due_date,
            priority:item.priority,
            status:item.status
        }
    }
}
const mutations = {
    openDialog(state){
        state.dialog = true
    },
    closeDialog(state){
        state.dialog = false
    },
    setEditedIndex(state, value){
        state.editedIndex = value
    },
    setDefaultTodo(state){
        state.todo = {
            id:"",
            title:"",
            description:"",
            due_date:"",
            priority:"",
            status:""
        }
    },
    setTodoId(state, value){
        state.todo.id = value
    },
    setTodoTitle(state, value){
        state.todo.title = value
    },
    setTodoDescription(state, value){
        state.todo.description = value
    },
    setTodoDueDate(state, value){
        state.todo.due_date = value
    },
    setTodoPriority(state, value){
        state.todo.priority = value
    },
    setTodoStatus(state, value){
        state.todo.status = value
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}
