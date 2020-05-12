import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count:0,
    todos:[]
  },
  mutations: {
    increment(state){
      state.count++
    },
    fetchTodos(state){
      fetch('http://localhost:3000/todos', {mode: 'cors'})
      .then(response => response.json())
      .then(data => {
        state.todos = data
      })
      .catch(err => {
        console.log(err)
      })
    },
    deleteTodo(state, payload){
      console.log(payload.id)
     state.todos = state.todos.filter(todo => todo.id !== payload.id)
    },
    updateTodo(state, payload){
      fetch(`http://localhost:3000/todos/${payload.id}`, {
        method: 'PUT', 
        body: JSON.stringify({
          title: "belajar vue",
          status: "on-going"
        }), // Coordinate the body type with 'Content-Type'
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        console.log(payload, state.todos)
        const checkId = (obj) => obj.id == payload.id
        //Find index of specific object using findIndex method.    
        var objIndex = state.todos.findIndex(checkId);
        //console.log(objIndex, '>>>>>> obje')
        state.todos[objIndex].status = 'on-going'
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  actions: {
    increment(context){
      context.commit('increment')
    },
    fetchTodos(context){
      context.commit('fetchTodos')
    },
    deleteTodo(context, payload){
      context.commit('deleteTodo', payload)
    },
    updateTodo(context, payload){
      context.commit('updateTodo', payload)
    }
  },
  getters:{
    doneTodos : state => {
      console.log(state.todos, 'iniiii')
      return state.todos.filter(todo => todo.status == "done")
    },
    count : state => {
      return state.count
    }
  }
});
