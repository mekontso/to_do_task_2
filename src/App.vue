<template>
  <v-app>
    <TheHeader/>
    <v-main>

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


export default {
  name: 'App',
  metaInfo:{
    title: "Todos"
  },
  components: {
    TodoList,
    TheFooter,
    TheHeader,

  },

  data: () => ({
    //
  }),
};
</script>
