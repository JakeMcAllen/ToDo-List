<template> 
    <div id="root">
      <h1> {{ username }} ToDo List </h1>
      <ToDoList />
    </div>
</template>

<script>
import ToDoList from "@/components/TodoList.vue";

export default {
  name: "homePage",
  data() {
    return {
      username: ''
    }
  },
  components: {
    ToDoList,
  },
  mounted() {
    this.username = this.$cookie.get('test');
  },
};
</script>

<style scoped>

h1 {
  margin: 10px 0 15px;
  font-family: Times New Roman;
  font-size: 80px;
}
</style>