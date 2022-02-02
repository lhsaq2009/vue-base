<template>
    <div style="margin-bottom: 200px;">
        <h3>src/views/blog/<span style="background-color: red;">posts</span>/index.vue</h3>
        <span>当前路径：http://localhost:8081/article</span>
        <br>
        <p>
            <router-link to="/">/index</router-link>
        </p>
        <hr>
        <h3>文章详情</h3>
        <pre>{{ article }}</pre>
        <p>
            <a href="/">返回</a>
        </p>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    const BaseLayout = () => import('@/components/BaseLayout.vue');
    let util = require("util");

    export default {
        asyncData({store, route}) {
            // 必须得 return
            return store.dispatch({
                type: "article/getArticleById",
                id: route.params.id
            });
        },
        name: 'Home',
        data() {
            return {}
        },
        created() {
        },
        methods: {},
        components: {
            BaseLayout
        },
        computed: {
            ...mapGetters(['article'])
        }
    }
</script>
