<template>
    <div>
        <h3>src/views/blog/<span style="background-color: red;">posts</span>/index.vue</h3>
        <span>当前路径：http://localhost:8081/article</span>
        <br>
        <p>
            <router-link to="/">/index</router-link>
        </p>
        <hr>
        <Button @click="getInfoByDispatch">通过 dispatch 触发 getInfo()，更新全局状态 name</Button>
        <br>
        <div>瞧瞧组件里的数据：{{ name }}</div>
        <hr>
        <div> {{ this.$store.state.user.name }}</div>

    </div>
</template>

<script>
    import HelloWorld from '@/components/HelloWorld.vue'
    import {getInfo} from "@/api/user";

    export default {
        name: 'Home',
        data() {
            return {
                name: 'default'
            }
        },
        created() {
            this.getUserInfo();
        },
        methods: {
            // dispatch 更新 store user 里 name
            getInfoByDispatch() {
                console.log("src/views/blog/posts/index.vue 调用 getInfoByDispatch()");
                this.$store.dispatch('user/getInfo')
            },

            getUserInfo() {
                // 延迟 2秒后，请求数据，更新本组件的 name
                setTimeout(() => {
                    getInfo().then(res => {
                        this.name = res.data.name;
                    });
                }, 2000);
            }
        },
        components: {
            HelloWorld
        }
    }
</script>
