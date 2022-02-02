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
    const BaseLayout = () => import('@/components/BaseLayout.vue');
    let util = require("util");

    import {getArticleById} from "@/api/article";

    export default {
        name: 'Home',
        data() {
            return {
                article: '{}'
            }
        },
        created() {
            this.getArticleInfo();
        },
        methods: {
            getArticleInfo() {
                getArticleById(this.$route.params.id).then(res => {
                    console.log("getArticleById:" + util.inspect(res.data));
                    this.article = res.data;        // 直接 JSON 显示整个接口数据
                });
            }
        },
        components: {
            BaseLayout
        }
    }
</script>
