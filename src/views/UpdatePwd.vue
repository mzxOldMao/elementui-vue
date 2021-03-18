<template>
    <div>
        <el-page-header @back="goBack" content="详情页面">
        </el-page-header>
        <h1>重置密码</h1>
        <div align="center" style="margin-right: 500px">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="500px"
                     class="demo-ruleForm">
                <el-form-item label="旧密码" prop="oldPass">
                    <el-input type="password" v-model="ruleForm.oldPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPass">
                    <el-input type="password" v-model="ruleForm.newPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UpdatePwd",
        data() {
            var validatePass3 = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入新密码'));
                } else {
                    callback();
                }
                /*setTimeout(() => {
                    if (!Number.isInteger(value)) {
                        callback(new Error('请输入数字值'));
                    } else {
                        if (value < 18) {
                            callback(new Error('必须年满18岁'));
                        } else {
                            callback();
                        }
                    }
                }, 1000);*/
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入原密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入新密码'));
                } else if (value !== this.ruleForm.newPass) {
                    callback(new Error('两次输入新密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    oldPass: '',
                    newPass: '',
                    checkPass: ''
                },
                rules: {
                    oldPass: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    checkPass: [
                        {validator: validatePass2, trigger: 'blur'}
                    ],
                    newPass: [
                        {validator: validatePass3, trigger: 'blur'}
                    ]
                },
                active: 0
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //alert('submit!');
                        this.$axios({
                            method: 'post',
                            url: 'http://localhost:8888/user/updatapwd',
                            data: this.ruleForm,
                            responseType: 'json'
                        }).then(res => {
                            console.log(res.data.message);
                            if (res.data.message == '修改成功') {
                                //使用 vue-router路由到指定页面，该方式称之为编程式导航
                                localStorage.removeItem("ApiAuthorization");
                                localStorage.removeItem("userName");
                                localStorage.removeItem("picture");
                                this.$router.push("/tologin");
                                this.$message.success("密码修改成功，请重新登录");
                            } else {
                                this.$message.error("旧密码输入错误");
                                console.log("123" + res.data.message);
                            }
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            next() {
                if (this.active++ > 2) this.active = 0;
            },
            goBack() {
                history.back();
            }
        }
    }
</script>

<style scoped>

</style>