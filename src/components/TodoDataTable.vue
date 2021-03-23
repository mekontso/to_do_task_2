<template>
  <v-data-table
      class='grey lighten-5'
      :headers='headers'
      :items='items'
      :sort-by='sortBy'
      :single-expand="true"
      :expanded.sync="expanded"
      show-expand>
    <template v-slot:item.status="{ item }">
      <v-chip
          :color="getStatusColor(item.status)"
          dark
      >
        {{ item.status }}
      </v-chip>
    </template>
    <template v-slot:item.priority="{ item }">
      <v-chip
          :color="getPriorityColor(item.priority)"
          dark
      >
        {{ item.priority }}
      </v-chip>
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        <p>
          Description: {{item.description}}
        </p>
      </td>


    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
          small
          color="primary"
          class="mr-2"
          @click='editItem(item)'
      >
        mdi-pencil
      </v-icon>
      <v-icon
          color="error"
          small
      >
        mdi-delete
      </v-icon>

    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "TodoDataTable",
  props: {
    headers: {
      required: true,
      type: Array
    },
    items: {
      required: true,
      type: Array
    },
    sortBy: {
      required: true,
      type: String
    },
  },
  data: () => ({
    expanded:[]
  }),
  methods: {
    editItem(item){
      this.$store.dispatch('editTodo',item)
    },
    getStatusColor(status) {
      switch (status) {
        case 'Pending':
          return "secondary"

        case 'Terminated':
          return "error"

        case 'Ongoing':
          return "success"
      }

    },
    getPriorityColor(priority){
      switch (priority) {
        case 'High':
          return "primary"

        case 'Medium':
          return "warning"

        case 'Low':
          return "red"
      }
    }
  }

}
</script>

<style scoped>

</style>
