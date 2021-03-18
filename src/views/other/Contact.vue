<template>
    <div>
        <el-tabs v-model="activeName" active-name="first" @tab-click="handleClick">
            <el-tab-pane label="填写信息" name="first">
                <div>
                    <i>请通过填写信息内容与我们联系</i>
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="500px" class="demo-ruleForm"
                             style="margin-right: 500px">
                        <el-form-item label="信息概括" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="发送给" prop="region">
                            <el-select v-model="ruleForm.region" placeholder="请选择对象">
                                <el-option label="管理员" value="管理员"></el-option>
                                <el-option label="老师" value="老师"></el-option>
                            </el-select>
                        </el-form-item>
                        <!--<el-form-item label="订购的时间" required>
                            <el-col :span="11">
                                <el-form-item prop="date1">
                                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1"
                                                    style="width: 100%;"></el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                                <el-form-item prop="date2">
                                    <el-time-picker placeholder="选择时间" v-model="ruleForm.date2"
                                                    style="width: 100%;"></el-time-picker>
                                </el-form-item>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="是否很急" prop="delivery">
                            <el-switch v-model="ruleForm.delivery"></el-switch>
                        </el-form-item>-->
                        <el-form-item label="消息性质" prop="type">
                            <el-radio-group v-model="ruleForm.type">
                                <el-radio label="反馈与建议" name="type"></el-radio>
                                <el-radio label="举报" name="type"></el-radio>
                                <el-radio label="给我发送信息" name="type"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <!--<el-form-item label="特殊处理" prop="resource">
                            <el-radio-group v-model="ruleForm.resource">
                                <el-radio label="退订"></el-radio>
                                <el-radio label="加订"></el-radio>
                            </el-radio-group>
                        </el-form-item>-->
                        <el-form-item label="详细信息" prop="des">
                            <el-input type="textarea" v-model="ruleForm.des" style="height: 100px"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')">立即发送</el-button>
                            <el-button @click="resetForm('ruleForm')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-tab-pane>
            <el-tab-pane label="历史信息" name="second">
                <div v-if="MSG">
                    <el-table
                            :data="message"
                            style="width: 100%;margin-left: 200px;">
                        <el-table-column
                                label="日期"
                                width="180">
                            <template slot-scope="scope">
                                <i class="el-icon-time"></i>
                                <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="信息概括"
                                width="180">
                            <template slot-scope="scope">
                                <div slot="reference" class="name-wrapper">
                                    {{ scope.row.name }}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="信息情况"
                                width="180">
                            <template slot-scope="scope">
                                <div v-if="scope.row.flagdetail==='未被处理'">
                                    <el-tag type="warning" size="medium">{{ scope.row.flagdetail }}</el-tag>
                                </div>
                                <div v-else>
                                    <el-tag size="medium">{{ scope.row.flagdetail }}</el-tag>
                                </div>
                                <!--<div slot="reference" class="name-wrapper">
                                    <el-tag size="medium">{{ scope.row.flagdetail }}</el-tag>
                                </div>-->
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="发送对象"
                                width="180">
                            <template slot-scope="scope">
                                <div v-if="scope.row.who==='老师'">
                                    <el-tag type="success" size="medium">{{ scope.row.who }}</el-tag>
                                </div>
                                <div v-else>
                                    <el-tag type="info" size="medium">{{ scope.row.who }}</el-tag>
                                </div>
                                <!--<div slot="reference" class="name-wrapper">
                                    <el-tag size="medium">{{ scope.row.who }}</el-tag>
                                </div>-->
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button
                                        size="mini"
                                        type="primary"
                                        @click="handleDetail(scope.$index, scope.row)">详情
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div v-else>
                    <el-page-header @back="second_goBack" content="详情页面">
                    </el-page-header>
                    <el-form :model="_message" style="margin-left: 200px;">
                        <el-form-item label="信息概括 ">
                            <el-input type="text" v-model="_message.name" readonly>{{_message.name}}</el-input>
                        </el-form-item>
                        <el-form-item label="信息详情 ">
                            <el-input type="text" v-model="_message.info" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="处理情况 ">
                            <el-input type="text" v-model="_message.flagdetail" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="发送给 ">
                            <el-input type="text" v-model="_message.who" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="信息类型 ">
                            <el-input type="text" v-model="_message.type" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="发送时间 ">
                            <el-input type="text" v-model="_message.createTime" readonly></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </el-tab-pane>
            <el-tab-pane label="未处理信息" name="third">
                <div v-if="MSG1">
                    <el-table
                            :data="message1"
                            style="width: 100%;margin-left: 200px;">
                        <el-table-column
                                label="日期"
                                width="180">
                            <template slot-scope="scope">
                                <i class="el-icon-time"></i>
                                <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="信息概括"
                                width="180">
                            <template slot-scope="scope">
                                <div slot="reference" class="name-wrapper">
                                    {{ scope.row.name }}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="信息情况"
                                width="180">
                            <template slot-scope="scope">
                                <div v-if="scope.row.flagdetail==='未被处理'">
                                    <el-tag type="warning" size="medium">{{ scope.row.flagdetail }}</el-tag>
                                </div>
                                <div v-else>
                                    <el-tag size="medium">{{ scope.row.flagdetail }}</el-tag>
                                </div>
                                <!--<div slot="reference" class="name-wrapper">
                                    <el-tag size="medium">{{ scope.row.flagdetail }}</el-tag>
                                </div>-->
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="发送对象"
                                width="180">
                            <template slot-scope="scope">
                                <div v-if="scope.row.who==='老师'">
                                    <el-tag type="success" size="medium">{{ scope.row.who }}</el-tag>
                                </div>
                                <div v-else>
                                    <el-tag type="info" size="medium">{{ scope.row.who }}</el-tag>
                                </div>
                                <!--<div slot="reference" class="name-wrapper">
                                    <el-tag size="medium">{{ scope.row.who }}</el-tag>
                                </div>-->
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button
                                        size="mini"
                                        type="primary"
                                        @click="handleDetail1(scope.$index, scope.row)">详情
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div v-else>
                    <el-page-header @back="third_goBack" content="详情页面">
                    </el-page-header>
                    <el-form :model="_message1" style="margin-left: 200px;">
                        <el-form-item label="信息概括 ">
                            <el-input v-model="_message1.name" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="信息详情 ">
                            <el-input v-model="_message1.info" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="处理情况 ">
                            <el-input v-model="_message1.flagdetail" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="发送给 ">
                            <el-input v-model="_message1.who" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="信息类型 ">
                            <el-input v-model="_message1.type" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="发送时间 ">
                            <el-input v-model="_message1.createTime" readonly></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </el-tab-pane>
            <el-tab-pane label="已处理信息" name="fourth">
                <div v-if="MSG2">
                    <el-table
                            :data="message2"
                            style="width: 100%;margin-left: 200px;">
                        <el-table-column
                                label="日期"
                                width="180">
                            <template slot-scope="scope">
                                <i class="el-icon-time"></i>
                                <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="信息概括"
                                width="180">
                            <template slot-scope="scope">
                                <div slot="reference" class="name-wrapper">
                                    {{ scope.row.name }}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="信息情况"
                                width="180">
                            <template slot-scope="scope">
                                <div v-if="scope.row.flagdetail==='未被处理'">
                                    <el-tag type="warning" size="medium">{{ scope.row.flagdetail }}</el-tag>
                                </div>
                                <div v-else>
                                    <el-tag size="medium">{{ scope.row.flagdetail }}</el-tag>
                                </div>
                                <!--<div slot="reference" class="name-wrapper">
                                    <el-tag size="medium">{{ scope.row.flagdetail }}</el-tag>
                                </div>-->
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="发送对象"
                                width="180">
                            <template slot-scope="scope">
                                <div v-if="scope.row.who==='老师'">
                                    <el-tag type="success" size="medium">{{ scope.row.who }}</el-tag>
                                </div>
                                <div v-else>
                                    <el-tag type="info" size="medium">{{ scope.row.who }}</el-tag>
                                </div>
                                <!--<div slot="reference" class="name-wrapper">
                                    <el-tag size="medium">{{ scope.row.who }}</el-tag>
                                </div>-->
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button
                                        size="mini"
                                        type="primary"
                                        @click="handleDetail2(scope.$index, scope.row)">详情
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div v-else>
                    <el-page-header @back="fourth_goBack" content="详情页面">
                    </el-page-header>
                    <el-form :model="_message2" style="margin-left: 200px;">
                        <el-form-item label="信息概括 ">
                            <el-input v-model="_message2.name" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="信息详情 ">
                            <el-input v-model="_message2.info" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="处理情况 ">
                            <el-input v-model="_message2.flagdetail" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="发送给 ">
                            <el-input v-model="_message2.who" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="信息类型 ">
                            <el-input v-model="_message2.type" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="发送时间 ">
                            <el-input v-model="_message2.createTime" readonly></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: "Contact",
        data() {
            return {
                ruleForm: {
                    name: '',
                    region: '',
                    type: [],
                    /*resource: '',*/
                    des: ''
                },
                rules: {
                    name: [
                        {required: true, message: '请输入信息概括', trigger: 'blur'},
                        {min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur'}
                    ],
                    region: [
                        {required: true, message: '请选择发送对象', trigger: 'change'}
                    ],
                    type: [
                        {required: true, message: '请选择一个信息性质', trigger: 'change'}
                    ],
                    /* resource: [
                         {required: true, message: '请选择特殊', trigger: 'change'}
                     ],*/
                    des: [
                        {required: true, message: '详细信息', trigger: 'blur'}
                    ]
                },
                activeName: '',
                message: [],
                message1: [],
                message2: [],
                _message: {},
                _message1: {},
                _message2: {},
                Mesg: true,
                Mesg1: true,
                Mesg2: true
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios({
                            method: 'post',
                            url: 'http://localhost:8888/message/saveMessage',
                            data: this.ruleForm,
                            responseType: 'json'
                        }).then(res => {
                            this.$message.success("反馈信息已发送！");
                            //this.$router.go(0);
                            location.reload();
                            this.resetForm(formName);
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
            handleDetail(index, row) {
                console.log(index, row);
                this.Mesg = !this.Mesg;
                this._message = row;
            },
            handleDetail1(index, row) {
                console.log(index, row);
                this.Mesg1 = !this.Mesg1;
                this._message1 = row;
            },
            handleDetail2(index, row) {
                console.log(index, row);
                this.Mesg2 = !this.Mesg2;
                this._message2 = row;
            },
            getMsgs() {
                this.$axios.get("http://localhost:8888/message/getMessages").then(res => {
                    console.log(res);
                    this.message = res.data.data.content;
                    /*_this.currentPage = res.data.data.number;
                    _this.total = res.data.data.totalElements;
                    _this.loading = false;*/
                })
            },
            second_goBack() {
                this.Mesg = !this.Mesg;
            },
            third_goBack() {
                this.Mesg1 = !this.Mesg1;
            },
            fourth_goBack() {
                this.Mesg2 = !this.Mesg2;
            },
            getMsgs1() {
                this.$axios.get("http://localhost:8888/message/getMessages?flag=1").then(res => {
                    this.message1 = res.data.data.content;
                    /*_this.currentPage = res.data.data.number;
                    _this.total = res.data.data.totalElements;
                    _this.loading = false;*/
                })
            },
            getMsgs2() {
                this.$axios.get("http://localhost:8888/message/getMessages?flag=2").then(res => {
                    this.message2 = res.data.data.content;
                    /*_this.currentPage = res.data.data.number;
                    _this.total = res.data.data.totalElements;
                    _this.loading = false;*/
                })
            }
        },
        computed: {
            MSG: function () {
                if (this.Mesg === true) {
                    this.getMsgs();
                }
                return this.Mesg;
            },
            MSG1: function () {
                if (this.Mesg1 === true) {
                    this.getMsgs1();
                }
                return this.Mesg1;
            },
            MSG2: function () {
                if (this.Mesg2 === true) {
                    this.getMsgs2();
                }
                return this.Mesg2;
            }
        }
    }
</script>

<style scoped>

</style>