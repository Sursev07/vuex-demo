<template>
    <div class="row" >
            <div v-for="todo in todoList" :key="todo.id" class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">{{todo.title}}</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <h2 class="card-title">{{todo.status}}</h2>
                    <a  class="btn btn-primary" @click="deleteTodo(todo.id)">Delete</a>
                    <a  class="btn btn-primary" @click="updateTodo(todo.id)">Update</a>
                </div>
            </div>
            <h1>{{count}}</h1>
        </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    created(){
        this.getTodos()
    },
    computed:{
        todoList(){
            console.log('masuk computed')
            return this.$store.state.todos
        },
        todoDone(){
            return this.$store.getters.doneTodos
            console.log(this.$store.getters.doneTodos, '>>>')
        },
        ...mapGetters([
            'doneTodos',
            'count'
            // ...
        ])
    },
    methods:{
        getTodos(){
            this.$store.dispatch('fetchTodos')
            console.log('lallaa')
        },
        deleteTodo(id){
            this.$store.dispatch('deleteTodo', {id:id})
        },
        updateTodo(id){
            this.$store.dispatch('updateTodo', {id:id})
        }
    }  
}
</script>