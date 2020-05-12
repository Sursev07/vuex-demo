<template>
    <div class="container">
        <h1>Ini Home</h1>
        <h1>Ini {{count}} dan {{jumlah}} dan {{counter}}</h1>
        <button @click.prevent="incrementCount">Increment</button>
        <Todo/>
    </div>
</template>
<script>
import Todo from '../components/TodoCard.vue'
import {mapState} from 'vuex'
export default {
    components:{
        Todo
    },
    data(){
        return{
            jumlah:0
        }
    },
    created(){
        this.jumlah = this.$store.state.count
    },
    computed:{
        count(){
            return this.$store.state.count
        },
        ...mapState({
            counter : 'count'
        })
    },
    methods:{
        incrementCount(){
            this.$store.dispatch('increment')
        },
    }
}
</script>