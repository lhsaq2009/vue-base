<template>
    <div style="margin-bottom: 200px;">
        <h3>src/views/blog/<span style="background-color: red;">index</span>/index.vue</h3>
        <span>当前路径：http://localhost:8081/</span>
        <br>
        <p>
            <router-link to="/article">/article</router-link>
        </p>
        <hr>
        <Button @click="getInfoByDispatch">通过 dispatch 触发 getInfo()，更新全局状态 name</Button>
        <br>
        <!--<p>瞧瞧组件里的数据，延时异步请求回来的：{{ username2 }}</p>-->
        <!--<p>瞧瞧 user.store 里的数据，dispatch 后台状态更新：{{ this.$store.state.user.username }}</p>-->
        <p>瞧瞧 user.store 里的数据，dispatch 后台状态更新：{{ username }}</p>
        <hr>
        <h1>文章列表</h1>

        <ul v-bind:style="'height: ' + 22 * pageConf.limit + 'px;'">
            <template v-for="(item, i) in list">
                <li><a v-bind:href="'/article/' + item.id">{{ item.title }}</a></li>
            </template>
        </ul>

        <pre>{{ pageConf }}</pre>

        <Button v-bind:style="'visibility: ' + preButton " @click="prePage">上一页</Button>
        <Button v-bind:style="'visibility: ' + nextButton + 'margin-left: 12px;'" @click="nextPage">下一页</Button>

    </div>
</template>

<script>
    import {getInfo} from "@/api/user";
    import {mapGetters} from "vuex";

    // 合并多个接口 axios.all：https://github.com/193Eric/study/issues/11
    const fetchInitialData = ({store, route}) => {
        let pageConf = store.state.article.pageConf;
        let query = store.state.article.query;

        // return store.dispatch({type: "user/getInfo"});
        return store.dispatch({
            type: "article/getArticleList",
            payload: {
                query, pageConf
            }
        });
    };

    export default {
        asyncData: fetchInitialData,
        data() {
            return {
                preButton: 'hidden;',
                nextButton: 'visible;',
                username2: "username2",
            };
        },
        created() {
            // this.getUserInfo();  // 在 SSR 服务器渲染前，要预先获取所有需要的异步数据，然后存到 Vuex 的 store 中
        },
        methods: {
            // dispatch 更新 store user 里 name
            getInfoByDispatch() {
                console.log("src/views/blog/index/index.vue 调用 getInfoByDispatch()");
                this.$store.dispatch('user/getInfo')
            },
            getUserInfo() {
                // 延迟 2秒后，请求数据，更新本组件的 name
                setTimeout(() => {
                    getInfo().then(res => {
                        this.username2 = res.data.data.username;
                    });
                }, 2000);
            },
            nextPage() {
                console.log("nextPage()");

                /*let pageConf = this.$store.state.article.pageConf;

                let currentCount = pageConf.page * pageConf.limit;
                if ((pageConf.total - currentCount) / pageConf.limit >= 0) {
                    this.nextButton = 'visible;';
                    this.preButton = 'visible;';

                    pageConf.page = pageConf.page + 1;
                    this.getArticleList();
                }

                if ((pageConf.total - currentCount) < pageConf.limit) {
                    this.nextButton = 'hidden;';
                }

                if (pageConf.total - currentCount > 0) {
                    this.getArticleList();
                }*/
            },
            prePage() {
                console.log("prePage()");
                /*let pageConf = this.$store.state.article.pageConf;

                if (pageConf.page > 1) {
                    this.nextButton = 'visible;';
                    pageConf.page = pageConf.page - 1;
                    this.getArticleList();
                }

                if (pageConf.page <= 1) {
                    this.preButton = 'hidden;'
                }*/
            }
        },
        computed: {
            // src/store/getters.js，在上面 <template> 里面通过：{{ username }} 访问
            ...mapGetters(['username', 'pageConf', 'list'])
        }
    }
</script>
