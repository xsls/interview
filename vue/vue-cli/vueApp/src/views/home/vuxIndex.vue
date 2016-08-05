<template>
    <div class="home-vuxIndexViews">
        <flexbox>
            <flexbox-item><div class="flex-demo">1</div></flexbox-item>
            <flexbox-item><div class="flex-demo">2</div></flexbox-item>
            <flexbox-item><div class="flex-demo">3</div></flexbox-item>
            <flexbox-item><div class="flex-demo">4</div></flexbox-item>
        </flexbox>
    </div>
</template>

<script>
import {Flexbox, FlexboxItem, Divider} from 'vux';
export default {
    component: {
        Flexbox, FlexboxItem, Divider
    },
    data () {
        return {
            msg: 'Hello World!'
        };
    },
    asyncData (resolve, reject) {
        window.console.log('this', this.msg);
    },
    ready () {
        console.log('this', this);
    }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    
</style>
