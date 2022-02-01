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
        <p>瞧瞧组件里的数据，延时异步请求回来的：{{ username2 }}</p>
        <!--<p>瞧瞧 user.store 里的数据，dispatch 后台状态更新：{{ this.$store.state.user.username }}</p>-->
        <p>瞧瞧 user.store 里的数据，dispatch 后台状态更新：{{ username }}</p>
        <hr>
        <h1>文章列表</h1>

        <ul v-bind:style="'height: ' + 22 * this.pageConf.limit + 'px;'">
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
    import {getArticleList} from "@/api/article";
    import {mapGetters} from "vuex";
    import * as user from "@/store/modules/user";

    export default {
        asyncData({store, route}) {
            /*return store.dispatch({
                type: "user/getInfo"
            });*/
        },
        data() {
            return {
                preButton: 'hidden;',
                nextButton: 'visible;',

                list: [],
                username2: "username2",
                query: {},
                pageConf: {page: 1, limit: 2, total: 0}
            };
        },
        created() {
            // this.getUserInfo();
            // this.getArticleList();
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
            getArticleList() {
                getArticleList(this.query, this.pageConf)
                    .then(res => {
                        console.log("/article/articleList 返回：" + JSON.stringify(res.data));

                        this.list = res.data.data.rows;
                        this.pageConf.total = res.data.data.total;
                    });
            },
            nextPage() {
                console.log("nextPage()");
                let currentCount = this.pageConf.page * this.pageConf.limit;
                if ((this.pageConf.total - currentCount) / this.pageConf.limit >= 0) {
                    this.nextButton = 'visible;';
                    this.preButton = 'visible;';

                    this.pageConf.page = this.pageConf.page + 1;
                    this.getArticleList();
                }

                if ((this.pageConf.total - currentCount) < this.pageConf.limit) {
                    this.nextButton = 'hidden;';
                }

                if (this.pageConf.total - currentCount > 0) {
                    this.getArticleList();
                }
            },
            prePage() {
                console.log("prePage()");

                if (this.pageConf.page > 1) {
                    this.nextButton = 'visible;';
                    this.pageConf.page = this.pageConf.page - 1;
                    this.getArticleList();
                }

                if (this.pageConf.page <= 1) {
                    this.preButton = 'hidden;'
                }
            }
        },
        computed: {
            // src/store/getters.js
            ...mapGetters(['username'])
        }
    }
</script>
