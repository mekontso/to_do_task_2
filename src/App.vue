<template>
  <v-app >
<!--    <TheHeader/>-->
    <TheHeader/>
    <v-main>
      <CustomSnackbar/>
      <v-container>
        <TodoList/>
      </v-container>
    </v-main>
    <TheFooter/>
  </v-app>
</template>

<script>
import TheHeader from "@/components/TheHeader";
import TheFooter from "@/components/TheFooter";
import TodoList from "@/components/TodoList";
import CustomSnackbar from "@/components/CustomSnackbar";

export default {
  name: 'App',
  metaInfo:{
    title: "Todos"
  },
  components: {
    CustomSnackbar,
    TodoList,

    TheFooter,
    TheHeader,

  },

  data: () => ({
    //
  }),
};
</script>
