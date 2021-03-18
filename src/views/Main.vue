<template>
    <!--<div>
        <el-container>
            <el-header>Header</el-header>
            <el-container>
                <el-aside width="200px">Aside</el-aside>
                <el-main>Main</el-main>
            </el-container>
        </el-container>
    </div>-->

    <el-container style=" border: 1px solid #eee;" class="main">
        <el-header style="text-align: right; font-size: 15px; height: 100px">
            <!--<el-dropdown style="margin-right: 1500px">
                &lt;!&ndash;<el-image src="../assets/images/logo.png"></el-image>&ndash;&gt;
                <i>教材预定系统</i>
            </el-dropdown>-->
            <el-dropdown>
                <i style="margin-right: 1330px">教材预定系统</i>
                <el-badge :value="2" class="item" type="warning" style="margin-right: 100px">
                    <el-button size="small" v-on:click="toMessage()">消息</el-button>
                </el-badge>
            </el-dropdown>
            <el-dropdown style="margin-top: 10px; margin-right: 20px">
                <!--<i style="margin-right: 10px"><el-avatar fit="contain" v-model="name">{{name}}</el-avatar></i>-->
                <div v-if="AAa !== null">
                    <img :src="'data:image/jpeg;base64,'+AAa" class="avatar" height="60px"
                         width="60px">
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                            <el-button type="primary" v-on:click="toUpdatePwd()" round>修改密码</el-button>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <el-button type="primary" v-on:click="onLogout()" round>退出登录</el-button>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </div>
                <div v-else>
                    <i>
                        <el-avatar icon="el-icon-user-solid"></el-avatar>
                    </i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                            <el-button type="primary" v-on:click="toUpdatePwd()" round>修改密码</el-button>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <el-button type="primary" v-on:click="onLogout()" round>退出登录</el-button>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </div>
            </el-dropdown>

        </el-header>

        <el-container>
            <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                <el-menu :default-openeds="['0','1','2','3','4']" default-active="0">
                    <!--<el-submenu index="0">
                        <template slot="title" background-color="#333"><i class="el-icon-message"></i>首页信息</template>
                        <el-menu-item-group background-color="#333">
                            <el-menu-item index="0-1" class="el-icon-user" @click="toList()">
                                &lt;!&ndash;<router-link to="/user/profile">个人信息</router-link>&ndash;&gt;
                                个人信息
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>-->
                    <el-menu-item index="0">
                        <i class="el-icon-menu"></i>
                        <span slot="title" @click="toIndex()">首页</span>
                    </el-menu-item>
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-message"></i>用户信息</template>
                        <el-menu-item-group>
                            <el-menu-item index="1-1" @click="toList()">
                                个人信息
                            </el-menu-item>
                            <el-menu-item index="1-2" @click="toUpdatePwd()">
                                修改密码
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-menu"></i>图书信息</template>
                        <e1-menu-item-group>
                            <el-menu-item index="/book/getbooks" @click="toBooks()">
                                书籍信息
                            </el-menu-item>
                            <el-menu-item index="/book/gettextbooks" @click="toTextBooks()">
                                书籍要求
                            </el-menu-item>
                        </e1-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title"><i class="el-icon-phone"></i> 信息</template>
                        <el-menu-item-group>
                            <el-menu-item index="3-1" @click="toOrder()">预订信息</el-menu-item>
                            <el-menu-item index="3-2" @click="toContact()"> 反馈信息</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title"><i class="el-icon-setting"></i>关于我们</template>
                        <el-menu-item-group>
                            <el-menu-item index="4-1" @click="toAbout()"> 系统信息</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view/>
            </el-main>

        </el-container>
        <el-footer>
            <div class="indexlayout-right-footer">
                <div class="footer-links">
                    <a href="http://jsv1-demo.admin-element-vue.liqingsong.cc" target="_blank">DEMO</a>&nbsp;
                    <a href="https://github.com/lqsong/admin-element-vue/tree/javascript.v1"
                       target="_blank">Github</a>&nbsp;
                    <a href="https://liqingsong.cc" target="_blank">博客</a>&nbsp;
                    <a href="http://www.wyxgn.com" target="_blank">网页小功能</a>
                </div>
                <div class="footer-copyright">
                    Copyright © 2021 maozhixin.cc, All Rights Reserved
                </div>
            </div>
        </el-footer>
    </el-container>
</template>
<script>
    export default {
        props: ['username'],
        name: "Main",
        data() {
            return {
                username: this.$store.state.showname,
                name: window.localStorage.getItem("userName"),
                showName: this.$store.state.isLogin,
                activeIndex: '1',
                activeIndex2: '1',
                user: {
                    studentName: '',
                    classId: '',
                    studentId: '',
                    sex: '',
                    nati: '',
                    picture: ''
                },
                getpicture: this.$store.state.picture
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            openCenter() {
                this.$message({
                    message: '居中的文字',
                    center: true
                });
            },
            onLogout() {
                this.$axios({
                    method: 'get',
                    url: 'http://localhost:8888/user/logout'
                }).then(res => {
                    if (res.data.message == '登出成功') {

                        //使用 vue-router路由到指定页面，该方式称之为编程式导航
                        localStorage.removeItem("ApiAuthorization");
                        localStorage.removeItem("userName");
                        localStorage.removeItem("picture");
                        this.$store.commit('isLoginMethod');
                        this.$store.commit('setMsgdisplay',0);
                        this.$router.push("/tologin");
                        this.$message.success("已退出系统");
                    }
                });
            },
            toProfile() {
                this.$router.push("/user/profile");
            },
            toIndex() {
                this.$router.push("/index");
            },
            toList() {
                this.$router.push("/user/list");
            },
            toBooks() {
                this.$router.push("/book/getbooks");
            },
            toTextBooks() {
                this.$router.push("/book/gettextbooks");
            },
            toAbout() {
                this.$router.push("/aboutUs");
            },
            toContact() {
                this.$router.push("/contact");
            },
            toUpdatePwd() {
                this.$router.push("/user/uppwd");
            },
            toHistory() {
                this.$router.push("/contact/history");
            },
            toMessage() {
                this.$router.push("/other/message");
            },
            autoMenthod() {
                this.$axios({
                    method: 'get',
                    url: 'http://localhost:8888/userinfo/getUser'
                }).then(res => {
                    this.user = res.data.data;
                    localStorage.setItem("picture", this.user.picture);
                    this.$store.commit('setPicture', this.user.picture);
                    this.lb = this.la;
                })
            },
            toOrder() {
                this.$router.push("/book/order");
            }
        },
        mounted() {
            this.autoMenthod();
        },
        computed: {
            AAa: function () {
                this.getpicture = this.$store.state.picture;
                return this.getpicture;
            }
        }
    }
</script>

<style scoped lang="scss">
    .item {
        margin-top: 10px;
        margin-right: 40px;
    }

    .el-header {
        background-color: #9d99d1;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        background-color: #9d99d1;
        color: #333;
    }

    a {
        text-decoration: none;
    }

    .router-link-active {
        text-decoration: none;
    }

    .el-main {

        color: #333;
        text-align: center;
        line-height: 160px;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }

    .indexlayout-right-footer {
        padding: 48px 0 24px;
        height: 50px;
        overflow: hidden;
        text-align: center;
        font-size: 14px;
        color: #808695;

        .footer-links {
            margin-bottom: 10px;

            a {
                margin-right: 30px;
                color: #808695;
                text-decoration: none;

                &:last-child {
                    margin-right: 0;
                }

                &:hover {
                    color: #515a6e;
                }
            }
        }
    }

    .main {
        display: flex;
        width: 100%;
        height: 100vh;
        min-height: 500px;
        overflow: auto;
        background-image: url("../assets/images/main1.jpg");
        background-repeat: no-repeat;
        background-position: center;
        background-attachment: fixed;
        background-size: cover;
        align-items: revert;
    }
</style>