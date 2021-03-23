<template>
  <v-card class="grey lighten-3 rounded-lg mb-8">
    <v-card-text>
      <ToDoListAdd/>
    </v-card-text>
    <v-card-text>
      <TodoDataTable :headers='tableHeaders' :items='getAllTodos' sort-by='due_date'/>
    </v-card-text>
  </v-card>
</template>

<script>
import ToDoListAdd from "@/components/ToDoListAdd";
import TodoDataTable from "@/components/TodoDataTable";
import {mapGetters} from 'vuex'
export default {
  name: "TodoList",
  components: {TodoDataTable, ToDoListAdd},
  computed:{
    ...mapGetters([
        'getAllTodos'
    ])
  },
  data: () => ({
    tableHeaders:[
      {text: '#ID', value: 'id', align: 'start', sortable: false},
      {text: 'Title', value: 'title',},
      {text: 'Due date', value: 'due_date',},
      {text: 'Priority', value: 'priority',},
      {text: 'Status', value: 'status'},
      {text: 'Actions', value: 'actions', sortable: false},
      {text: 'More', value: 'data-table-expand'},
    ]
  })
}
</script>

<style scoped>

</style>
