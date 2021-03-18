<!--<template>
    <div>
        <el-form ref="loginForm" :model="loginForm" :rules="rules" label-width="80px" class="login-box">
            <h3 class="login-title">欢迎登录</h3>
            <el-form-item label="账号" prop="username">
                <el-input type="text" placeholder="请输入账号" v-model="loginForm.username"/>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" placeholder="请输入密码" v-model="loginForm.password"/>
            </el-form-item>
            <el-form-item>
                <el-button @click="updatePass">忘记密码</el-button>
                <el-button type="primary" v-on:click="onSubmit('loginForm')">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>-->
<!--
<script>
    export default {
        name: "Login",
        data() {
            return {
                loginForm: {
                    username: '',
                    password: ''
                },
                //表单验证，需要再el-form-item 元素中增加prop属性
                rules: {
                    username: [
                        {required: true, message: '账号不能为空', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'blur'}
                    ]
                },
                //对话框显示和隐藏
                dialogVisible: false,
                message: ''
            }
        },
        methods: {
            onSubmit(formName) {
                //为表单绑定验证功能
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios({
                            method: 'post',
                            url: 'http://localhost:8888/user/login',
                            data: this.loginForm,
                            responseType: 'json'
                        }).then(res => {
                            console.log("messagess:" + res.data.message);
                            this.message = res.data.message;
                            console.log("message:" + this.message);
                            if (this.message!='登录成功') {
                                if (this.message=='密码错误') {
                                    alert(this.message);
                                }
                                if (this.message == '用户不存在') {
                                    alert(this.message);
                                }
                                this.$router.push("/tologin");
                            } else {
                                console.log(res.data.token);
                                localStorage.setItem("ApiAuthorization",res.data.token);
                                localStorage.setItem("userName",this.loginForm.username);
                                //使用 vue-router路由到指定页面，该方式称之为编程式导航
                                this.$router.push("/main");
                            }
                        });
                    } else {
                        this.dialogVisible = true;
                        return false;
                    }
                });
            },
            updatePass() {
                this.$router.push("/user/uppwd");
            }
        }
    }
</script>

<style lang="scss" scoped>
    .login-box {
        border: 1px solid #DCDFE6;
        width: 350px;
        margin: 180px auto;
        padding: 35px 35px 15px 35px;
        border-radius: 5px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        box-shadow: 0 0 25px #909399;
    }

    .login-title {
        text-align: center;
        margin: 0 auto 40px auto;
        color: #303133;
    }
</style>-->
<template>
    <div class="login">
        <div class="form">
            <h1 class="title" style="color: black">
                教材预定系统
            </h1>
            <el-form :model="loginForm" :rules="rules" ref="ruleForm" label-width="0" size="medium">
                <el-form-item label="" prop="username">
                    <el-input v-model.trim="loginForm.username" autocomplete="off" placeholder="请输入账号" @keyup.enter.native="submitForm('ruleForm')">
                        <i slot="prefix" class="el-input__icon el-icon-user"></i>
                    </el-input>
                </el-form-item>
                <el-form-item label="" prop="password">
                    <el-input type="password" v-model.trim="loginForm.password" autocomplete="off" placeholder="请输入密码" @keyup.enter.native="submitForm('ruleForm')" show-password>
                        <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="submit" type="primary" @click="submitForm('ruleForm')" :loading="loading">登录</el-button>
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>
<script>
    export default {
        name: 'Login',
        data() {
            return {
                loading: false,
                loginForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入账号', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 32, message: '长度在 6 到 32 个字符', trigger: 'blur' }
                    ]
                },
                redirect: undefined,
                otherQuery: {}
            };
        },
        watch: {
            $route: {
                handler: function(route) {
                    const query = route.query;
                    if (query) {
                        this.redirect = query.redirect;
                        this.otherQuery = this.getOtherQuery(query);
                    }
                },
                immediate: true
            }
        },
        methods: {
            submitForm(formName) {
                /*const _this = this;
                _this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _this.loading = true;
                        const paramData = {
                            username: _this.loginForm.username,
                            password: _this.loginForm.password
                        };
                        _this.$store.dispatch('user/login', paramData).then(() => {
                            _this.loading = false;
                            _this.$router.push({ path: _this.redirect || '/', query: _this.otherQuery },() => {});
                        }).catch(error => {
                            _this.$message.error(error.msg || 'Has Error');
                            _this.loading = false;
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });*/
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios({
                            method: 'post',
                            url: 'http://localhost:8888/user/login',
                            data: this.loginForm,
                            responseType: 'json'
                        }).then(res => {
                            console.log("messagess:" + res.data.message);
                            this.message = res.data.message;
                            console.log("message:" + this.message);
                            if (this.message!='登录成功') {
                                if (this.message=='密码错误') {
                                    this.$message.error(this.message);
                                }
                                if (this.message == '用户不存在') {
                                    this.$message.error(this.message);
                                }
                                this.$router.push("/tologin");
                            } else {
                                //console.log(res.data.token);
                                console.log(this.$store.state.isLogin);
                                localStorage.setItem("ApiAuthorization",res.data.token);
                                localStorage.setItem("userName",this.loginForm.username);
                                //使用 vue-router路由到指定页面，该方式称之为编程式导航
                                this.$store.commit('isLoginMethod');
                                console.log(this.$store.state.isLogin);
                                this.$message.success(this.message);
                                this.$router.push("/index");
                            }
                        });
                    }
                });

            },
            getOtherQuery(query) {
                return Object.keys(query).reduce((acc, cur) => {
                    if (cur !== 'redirect') {
                        acc[cur] = query[cur];
                    }
                    return acc;
                }, {});
            }
        }
    };
</script>
<style lang="scss" scoped>
    .login {
        display: flex;
        width: 100%;
        height: 100vh;
        min-height: 500px;
        overflow: auto;
        background-image: url("../assets/images/login1.jpg");
        background-repeat: no-repeat;
        background-position: center center;
        background-attachment: fixed;
        background-size: cover;
        align-items: center;
        .form{
            flex: none;
            width: 320px;
            padding: 60px;
            margin: 0 auto;
            border-radius: 4px;
            background-color: rgba($color: #FFFFFF, $alpha: 0.2);
            .title{
                font-weight: 300;
                margin-top: 0;
                margin-bottom: 60px;
                text-align: center;
                color: #FFFFFF;
            }
            .submit{
                margin-top: 30px;
                width: 100%;
            }
        }
    }
</style>
