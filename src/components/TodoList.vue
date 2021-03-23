<template>
  <v-card class="grey lighten-3 rounded-lg mb-8">
    <v-card-text>
      <v-data-table
          :expanded.sync="expanded"
          :headers='tableHeaders'
          :items='todos'
          :single-expand="true"
          class='grey lighten-5'
          show-expand
          sort-by='due_date'>
        <template v-slot:top>
          <v-toolbar color="white" flat>
            <h1 class='text-h3 ma-5 title'>My Todo's</h1>
            <v-spacer></v-spacer>
            <v-dialog v-model='dialog' max-width="800" persistent>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    v-bind="attrs"
                    v-on="on"
                    class="mb-2"
                    color="primary"
                    dark
                >
                  <v-icon>add</v-icon>
                  Add Todo
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class='headline'>{{ dialogTitle }}</span>
                </v-card-title>
                <v-card-text>
                  <v-form ref='form' v-model='validForm' lazy-validation>
                    <v-container>
                      <v-row>
                        <v-col cols='12' md='6' sm='6'>
                          <v-text-field
                              :value='editedItem.id'
                              disabled
                              label="Auto Generated Id"
                              prepend-icon="mdi-key-change"
                          ></v-text-field>
                        </v-col>
                        <v-col cols='12' md='6' sm='6'>
                          <v-text-field
                              v-model='editedItem.title'
                              :rules='titleRules'
                              label="Title"
                              prepend-icon="mdi-information-variant"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols='12' md='6' sm='6'>
                          <v-textarea
                              v-model='editedItem.description'
                              :rules='descriptionRules'
                              class="mx-2"
                              label="Description "
                              prepend-icon="mdi-comment"
                              rows="2"
                          ></v-textarea>
                        </v-col>
                        <v-col cols='12' md='6' sm='6'>
                          <v-menu
                              v-model="menu"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              min-width="290px"
                              offset-y
                              transition="scale-transition"

                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                  v-model='editedItem.due_date'
                                  v-bind="attrs"
                                  v-on="on"
                                  :rules='dueDateRules'
                                  label="Due Date"
                                  prepend-icon="event"
                                  readonly
                              ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model='editedItem.due_date'
                                @input="menu = false"></v-date-picker>
                          </v-menu>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12"
                               md="6"
                               sm="6">
                          <v-select
                              v-model="editedItem.priority"
                              :items="priorities"
                              :rules="priorityRules"
                              label="Priority"
                              prepend-icon="mdi-shop"
                          ></v-select>

                        </v-col>
                        <v-col cols="12"
                               md="6"
                               sm="6">
                          <v-select
                              v-model="editedItem.status"
                              :items="statusSelect"
                              :rules="statusRules"
                              label="Status"
                              prepend-icon="mdi-shop"
                          ></v-select>

                        </v-col>
                      </v-row>
                    </v-container>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn
                      color="blue darken-1"
                      text
                      @click="save"
                  >
                    Save
                  </v-btn>
                  <v-btn
                      color="error darken-1"
                      text
                      @click="closeDialog"
                  >
                    Close
                  </v-btn>

                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
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
              Description: {{ item.description }}
            </p>
          </td>

        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
              class="mr-2"
              color="primary"
              small
              @click='editItem(item)'
          >
            mdi-pencil
          </v-icon>
          <v-icon
              color="error"
              small
              @click='deleteItem(item)'
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card-text>
    <template>
      <div class="text-center ma-2">
        <v-snackbar
            v-model="snackbar"

        >
          {{ text }}
          <template v-slot:action="{ attrs }">
            <v-btn
                v-bind="attrs"
                color="pink"
                text
                @click="snackbar = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </div>
    </template>
  </v-card>
</template>

<script>

export default {
  name: "TodoList",
  computed: {
    dialogTitle() {
      return this.editedIndex === -1 ? "New Todo" : "Edit Todo"
    }
  },
  watch: {
    addDialog(val) {
      val || this.closeDialog()
    }
  },
  data: () => ({
    snackbar: true,
    text: "Welcome",
    tableHeaders: [
      {text: '#ID', value: 'id', align: 'start', sortable: false},
      {text: 'Title', value: 'title',},
      {text: 'Due date', value: 'due_date',},
      {text: 'Priority', value: 'priority',},
      {text: 'Status', value: 'status'},
      {text: 'Actions', value: 'actions', sortable: false},
      {text: 'More', value: 'data-table-expand'},
    ],
    todos: [
      {
        id: 12345,
        title: "Plan project",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius laboriosam necessitatibus nemo officia ratione, sint suscipit. Ab adipisci aliquid, dignissimos, dolor, dolores earum incidunt ipsam maiores officiis repellat unde voluptatem!",
        due_date: "2021-02-22",
        priority: "High",
        status: "Terminated"
      },
      {
        id: 12346,
        title: "Design database",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius laboriosam necessitatibus nemo officia ratione, sint suscipit. Ab adipisci aliquid, dignissimos, dolor, dolores earum incidunt ipsam maiores officiis repellat unde voluptatem!",
        due_date: "2021-03-31",
        priority: "Low",
        status: "Ongoing"
      },
      {
        id: 12347,
        title: "Design User Interface",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius laboriosam necessitatibus nemo officia ratione, sint suscipit. Ab adipisci aliquid, dignissimos, dolor, dolores earum incidunt ipsam maiores officiis repellat unde voluptatem!",
        due_date: "2021-04-22",
        priority: "Medium",
        status: "Pending"
      }
    ],
    expanded: [],
    dialog: false,
    validForm: false,
    editedIndex: -1,
    editedItem: {
      id: "",
      title: "",
      description: "",
      due_date: "",
      priority: "",
      status: ""
    },
    defaultItem: {
      id: "",
      title: "",
      description: "",
      due_date: "",
      priority: "",
      status: ""
    },
    menu: false,
    titleRules: [
      v => !!v || 'Title is required',
    ],
    descriptionRules: [
      v => !!v || 'Description is required',
    ],
    dueDateRules: [
      v => !!v || 'Due date is required',
    ],
    priorityRules: [
      v => !!v || 'Priority is required',
    ],
    statusRules: [
      v => !!v || 'Status is required',
    ],
    priorities: [
      'Low',
      'Medium',
      'High'
    ],
    statusSelect: [
      'Ongoing',
      'Pending',
      'Terminated'
    ]
  }),
  methods: {
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
    getPriorityColor(priority) {
      switch (priority) {
        case 'High':
          return "primary"

        case 'Medium':
          return "warning"

        case 'Low':
          return "red"
      }
    },
    editItem(item) {
      this.editedIndex = this.todos.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true

    },
    deleteItem(item) {
      let index = this.todos.findIndex(x => x.id === item.id)
      confirm("Are you sure you want to delete this item?") && this.todos.splice(index,1)
    },
    closeDialog() {
      this.dialog = false
      this.editedItem = Object.assign({}, this.defaultItem)
      this.$refs.form.reset()
      this.$refs.form.resetValidation()
      this.editedIndex = -1
    },
    save() {
      if (this.$refs.form.validate()) {

        if (this.editedIndex > -1) {
          this.todos.splice(this.editedIndex,1,this.editedItem)
          this.text = "Success updating todo"
          this.snackbar = true
        } else {
          console.log("creating")
          this.editedItem.id = this.getRandomInt(123459,25000)
          this.todos.push(this.editedItem)
          this.text = "Success creating todo"
          this.snackbar = true

        }
        this.closeDialog()
      } else {
        this.text = "Please input all information\'s for the todo"
        this.snackbar = true

      }


    },
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }
}
</script>

<style scoped>
.title {
  color: #1976D2;
}
</style>
