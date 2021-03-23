<template>
  <v-card flat class='grey lighten-3'>
    <v-card-title>
      <h1 class='text-h3 ma-5 title'>My Todo's</h1>
      <v-spacer></v-spacer>
      <v-btn
          color="primary"
          dark
          class="mb-2"
          @click='openAddDialog'
      >
        <v-icon>add</v-icon>
        Add Todo
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-dialog persistent max-width="800" v-model='addDialog'>
        <v-card>
          <v-card-text class='headline '>{{ formTitle }}</v-card-text>
          <v-divider></v-divider>
          <v-card-text>
            <v-form ref='form' v-model='validForm' lazy-validation>
              <v-container>
                <v-row>
                  <v-col cols='12' sm='6' md='6'>
                    <v-text-field
                        :value='editedItem.id'
                        prepend-icon="mdi-key-change"
                        label="Auto Generated Id"
                        disabled
                    ></v-text-field>
                  </v-col>
                  <v-col cols='12' sm='6' md='6'>
                    <v-text-field
                        prepend-icon="mdi-information-variant"
                        label="Title"
                        :rules='titleRules'
                        v-model='editedItem.title'
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols='12' sm='6' md='6'>
                    <v-textarea
                        v-model='editedItem.description'
                        :rules='descriptionRules'
                        class="mx-2"
                        label="Description "
                        rows="2"
                        prepend-icon="mdi-comment"
                    ></v-textarea>
                  </v-col>
                  <v-col cols='12' sm='6' md='6'>
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
                            :rules='dueDateRules'
                            v-bind="attrs"
                            v-on="on"
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
                         sm="6"
                         md="6">
                    <v-select
                        prepend-icon="mdi-shop"
                        v-model="editedItem.priority"
                        label="Priority"
                        :rules="priorityRules"
                        :items="priorities"
                    ></v-select>

                  </v-col><v-col cols="12"
                         sm="6"
                         md="6">
                    <v-select
                        prepend-icon="mdi-shop"
                        v-model="editedItem.status"
                        label="Status"
                        :rules="statusRules"
                        :items="statusSelect"
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
                @click="closeAddDialog"
            >
              Close
            </v-btn>

          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="deleteDialog" max-width="500px">
        <v-card>
          <v-card-title class="headline ">
            Are you sure you want to delete this item?
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error darken-1" text @click="deleteTodo">Yes</v-btn>
            <v-btn color="blue darken-1" text >No</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-text>
  </v-card>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
  name: "ToDoListAdd",
  computed: {
    /**
     * Function update the form title
     * @returns {string}
     */
    formTitle() {
      return this.editedIndex === -1 ? 'New Todo' : 'Edit Todo'
    },

  },
  data: () => ({
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
    addDialog: false,
    deleteDialog: false,
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
    priorities:[
        'Low',
        'Medium',
        'High'
    ],
    statusSelect:[
      'Ongoing',
      'Pending',
      'Terminated'
    ]

  }),
  methods: {

    save() {
      if (this.$refs.form.validate()) {
        this.$store.commit("alertSuccess", "Success storing todo")
        this.closeDialog()
      } else {

        this.$store.commit("alertWarning", "Please enter all todo information\'s")
      }
    },
    close() {
      this.closeDialog()
      this.setEditedIndex(-1)
      this.$refs.form.reset()
      this.$refs.form.resetValidation()
    },
    deleteTodo(){
      this.closeDeleteDialog()
      this.$store.commit("alertSuccess", "Success deleting todo")
    },


    openAddDialog(){
      this.addDialog = true
    },
    closeAddDialog(){
      this.addDialog = false
      this.editedItem = Object.assign({},this.defaultItem)
      this.editedIndex = -1
    }
  },

  beforeDestroy() {
    // By default the store action is a create action in case a user comes back
    this.$store.commit('setEditedItem', -1)
    // We clean the todo variable
    this.$store.commit('setDefaultTodo')

  }
}
</script>

<style scoped>
.title {
  color: #1976D2;
}
</style>
