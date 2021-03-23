<template>
  <v-card flat class='grey lighten-3'>
    <v-card-title>
      <h1 class='text-h3 ma-5 title'>My Todo's</h1>
      <v-spacer></v-spacer>
      <v-btn
          color="primary"
          dark
          class="mb-2"
          @click='openDialog'
      >
        <v-icon>add</v-icon>
        Add
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-dialog persistent max-width="800" :value='dialog'>
        <v-card>
          <v-card-text class='headline '>{{ formTitle }}</v-card-text>
          <v-divider></v-divider>
          <v-card-text>
            <v-form ref='form' v-model='validForm' lazy-validation>
              <v-container>
                <v-row>
                  <v-col cols='12' sm='6' md='6'>
                    <v-text-field
                        :value='getTodoId'
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
                        v-model='title'
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols='12' sm='6' md='6'>
                    <v-textarea
                        v-model='description'
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
                            v-model='due_date'
                            :rules='dueDateRules'
                            v-bind="attrs"
                            v-on="on"
                            label="Due Date"
                            prepend-icon="event"
                            readonly
                        ></v-text-field>
                      </template>
                      <v-date-picker
                          v-model='due_date'
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
                        v-model="priority"
                        label="Priority"
                        :rules="priorityRules"
                        :items="priorities"
                    ></v-select>

                  </v-col><v-col cols="12"
                         sm="6"
                         md="6">
                    <v-select
                        prepend-icon="mdi-shop"
                        v-model="status"
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
                @click="close"
            >
              Close
            </v-btn>

          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog :value="getDeleteDialog" max-width="500px">
        <v-card>
          <v-card-title class="headline ">
            Are you sure you want to delete this item?
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error darken-1" text @click="deleteTodo">Yes</v-btn>
            <v-btn color="blue darken-1" text @click="closeDeleteDialog">No</v-btn>
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
    ...mapGetters([
      'formTitle',
      'getDialog',
      'getDeleteDialog',
      'getTodoId',
      'getTodoTitle',
      'getTodoDescription',
      'getTodoDueDate',
      'getTodoPriority',
      'getTodoStatus'
    ]),
    dialog() {
      return this.getDialog
    },
    title: {
      get() {
        return this.getTodoTitle
      },
      set(value){
        this.setTodoTitle(value)
      }
    },
    description: {
      get() {
        return this.getTodoDescription
      },
      set(value){
        this.setTodoDescription(value)
      }
    },
    due_date: {
      get() {
        return this.getTodoDueDate
      },
      set(value){
        this.setTodoDueDate(value)
      }
    },
    priority: {
      get() {
        return this.getTodoPriority
      },
      set(value){
        this.setTodoPriority(value)
      }
    },
    status: {
      get() {
        return this.getTodoStatus
      },
      set(value){
        this.setTodoStatus(value)
      }
    }
  },
  data: () => ({
    validForm: false,
    editedIndex: -1,
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
    ...mapMutations([
      'closeDialog',
      'openDialog',
      'closeDeleteDialog',
      'setEditedIndex',
      'setTodoTitle',
      'setTodoDescription',
      'setTodoDueDate',
      'setTodoPriority',
      'setTodoStatus',
    ]),
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
