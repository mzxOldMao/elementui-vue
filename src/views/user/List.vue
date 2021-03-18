<template>
    <div>
        <el-row class="demo-avatar demo-basic"><h3>个人信息</h3></el-row>
        <el-row class="demo-avatar demo-basic">
            <el-col :span="14">
                <el-form :label-position="labelPosition" label-width="600px" :model="user">
                    <el-form-item>
                        修改/上传头像
                        <el-upload
                                class="avatar-uploader"
                                action="http://localhost:8888/userinfo/setpicture"
                                :headers=header
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">

                            <img v-if="user.picture !== null" :src="'data:image/jpeg;base64,'+user.picture"
                                 class="avatar" height="50px"
                                 width="50px">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="姓名 ">
                        <el-input v-model="user.studentName" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="学号 ">
                        <el-input v-model="user.studentId" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="班级号 ">
                        <el-input v-model="userQuery.class_id" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="学院 ">
                        <el-input v-model="userQuery.course_unit" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="校区 ">
                        <el-input v-model="userQuery.campus" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="性别 ">
                        <el-input v-model="user.sex" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="籍贯 ">
                        <el-input v-model="user.nati" readonly></el-input>
                    </el-form-item>

                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "List",
        data() {
            return {
                labelPosition: 'right',
                la: 0,
                lb: 0,
                imageUrl: '',
                user: {
                    studentName: '',
                    classId: '',
                    studentId: '',
                    sex: '',
                    nati: '',
                    picture: ''
                },
                userQuery: {
                    id: 0,
                    student_id: '',
                    class_id: '',
                    student_name: '',
                    campus: '',
                    course_unit: ''
                },
                header: {
                    'ApiAuthorization': window.localStorage.getItem("ApiAuthorization"),
                    'userName': window.localStorage.getItem("userName")
                }
            }
        },
        methods: {
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
                console.log("ssss" + this.imageUrl);
                this.autoMenthod();
            },
            beforeAvatarUpload(file) {
                this.la++;
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            autoMenthod() {
                this.$axios({
                    method: 'get',
                    url: 'http://localhost:8888/userinfo/getUser'
                }).then(res => {
                    this.user = res.data.data;
                    this.userQuery = res.data.userQuery;
                    localStorage.setItem("picture", this.user.picture);
                    this.$store.commit('setPicture', this.user.picture);

                    this.lb = this.la;
                })
            },
            toredirect() {
                this.$router.push("/redirect");
            }
        },
        mounted() {
            this.autoMenthod();
        }
    }
</script>

<style scoped>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>