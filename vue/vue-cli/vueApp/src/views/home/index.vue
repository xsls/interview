<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h3>{{msg}}</h3>
  </div>
</template>

<script>
export default {
    data () {
        return {
            msg: 'Hello World!'
        };
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1 {
    color: #42b983;
}
</style>
