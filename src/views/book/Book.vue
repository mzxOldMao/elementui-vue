<template>
    <div>
        <div v-if="this.detail===true">
            <div>
                <el-form :inline="true" :model="queryForm" class="demo-form-inline">
                    <el-form-item>
                        <el-input v-model="queryForm.bookName" placeholder="书名"></el-input>
                    </el-form-item>
                    <el-form-item label="            ">
                        <el-input v-model="queryForm.author" placeholder="作者名字"></el-input>
                    </el-form-item>
                    <el-form-item label="            ">
                        <el-select v-model="queryForm.price" placeholder="价格范围">
                            <el-option label="" value=""></el-option>
                            <el-option label="00--30" value="00--30"></el-option>
                            <el-option label="30--50" value="30--50"></el-option>
                            <el-option label="50--80" value="50--80"></el-option>
                            <el-option label="80--99" value="80--99"></el-option>
                            <el-option label="99--1000" value="99--1000"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit(1)">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <el-table
                    v-loading="loading"
                    :data="books"
                    style="width: 100%"
                    :row-class-name="tableRowClassName">
                <el-table-column
                        prop="id"
                        label="ID"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="bookName"
                        label="书名">
                </el-table-column>
                <el-table-column
                        prop="author"
                        label="作者">
                </el-table-column>
                <el-table-column
                        prop="publish"
                        label="出版社">
                </el-table-column>
                <el-table-column
                        prop="price"
                        label="价格">
                </el-table-column>
                <!--<el-table-column
                        prop="isbn"
                        label="ISBN">
                </el-table-column>-->
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                type="primary"
                                @click="handleDetail1(scope.$index, scope.row)">详情
                        </el-button>
                        <el-button
                                v-if="list.indexOf(list.filter(d=>d.id == scope.row.id)[0]) === -1"
                                size="mini"
                                type="primary"
                                @click="handleDetail2(scope.$index, scope.row)">预订
                        </el-button>
                        <el-button
                                v-else
                                size="mini"
                                type="warning"
                                @click="handleDetail3(scope.$index, scope.row)">取消预订
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    v-if="this.flagg===true"
                    :current-page="currentPage"
                    :page-size="pageSize"
                    :total="total"
                    @current-change=page
                    @size-change="handleSizeChange"
                    :page-sizes="[10, 20, 30, 40]"
                    layout="total, sizes, prev, pager, next, jumper">
            </el-pagination>
            <el-pagination
                    v-else
                    :current-page="currentPage"
                    :page-size="pageSize"
                    :total="total"
                    @current-change=onSubmit
                    @size-change="handleSizeChange"
                    :page-sizes="[10, 20, 30, 40]"
                    layout="total, sizes, prev, pager, next, jumper">
            </el-pagination>
        </div>
        <div v-else>
            <el-page-header @back="goBack" content="详情页面">
            </el-page-header>
            <el-form :model="_message" style="margin-left: 200px;">
                <el-form-item label="ID ">
                    <el-input v-model="_message.id" readonly></el-input>
                </el-form-item>
                <el-form-item label="教材名字 ">
                    <el-input v-model="_message.bookName" readonly></el-input>
                </el-form-item>
                <el-form-item label="作者 ">
                    <el-input v-model="_message.author" readonly></el-input>
                </el-form-item>
                <el-form-item label="出版社 ">
                    <el-input v-model="_message.publish" readonly></el-input>
                </el-form-item>
                <el-form-item label="价格 ">
                    <el-input v-model="_message.price" readonly></el-input>
                </el-form-item>
                <el-form-item label="ISBN ">
                    <el-input v-model="_message.isbn" readonly></el-input>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>


<script>

    export default {
        name: "Book",
        data() {
            return {
                books: {},
                currentPage: 1,
                total: 0,
                pageSize: 10,
                loading: true,
                queryForm: {
                    bookName: '',
                    author: '',
                    price: ''
                },
                flagg: true,
                _message: {},
                detail: true,
                orders: {},
                list: [],
                array: []
            }
        },
        methods: {
            tableRowClassName({row, rowIndex}) {
                if (rowIndex === 1) {
                    return 'warning-row';
                } else if (rowIndex === 3) {
                    return 'success-row';
                }
                return '';
            },
            page(val) {
                const _this = this;
                if (_this.flagg === true) {
                    _this.$axios.get("http://localhost:8888/book/getbooks?pageNum=" + (val - 1) + "&pageSize=" + this.pageSize).then(res => {
                        console.log(res);
                        _this.books = res.data.data.content;
                        _this.currentPage = res.data.number;
                        _this.total = res.data.data.totalElements;
                        _this.pageSize = res.data.data.size;
                        _this.loading = false;
                    });
                }
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                //this.page(this.currentPage,val)
                this.pageSize = val;
                if (this.flagg === true) {
                    this.page(this.currentPage);
                } else {
                    this.onSubmit(this.currentPage);
                }

            },
            onSubmit(val) {
                this.flagg = false;
                var start, end;
                if (this.queryForm.bookName === '' && this.queryForm.author === '' && this.queryForm.price === '') {
                    this.flagg = true;
                    this.page(1);
                    return;
                }
                if (this.queryForm.price !== '') {
                    //console.log("vhvuyvuy"+this.queryForm.price);
                    //console.log("start"+this.queryForm.price.substring(0,2));
                    start = this.queryForm.price.substring(0, 2);
                    //console.log("end"+this.queryForm.price.substring(4));
                    end = this.queryForm.price.substring(4);
                } else {
                    start = 0;
                    end = 1000;
                }
                this.$axios.get("http://localhost:8888/book/getbooks?pageNum=" + (val - 1) + "&pageSize=" + this.pageSize + "&bookName=" + this.queryForm.bookName + "&author=" + this.queryForm.author + "&start=" + start + "&end=" + end)
                    .then(res => {
                    this.books = res.data.data.content;
                    this.currentPage = res.data.number;
                    this.total = res.data.data.totalElements;
                    this.pageSize = res.data.data.size;
                    this.loading = false;
                })
            },
            handleDetail1(index,row) {
                this.detail = !this.detail;
                this._message = row;
            },
            handleDetail2(index, row) {
                console.log(index, row);
                console.log(row.id);
                const h = this.$createElement;
                this.$msgbox({
                    title: '消息',
                    message: h('p', null, [
                        h('span', null, '确定预订此教材吗？ '),
                        h('i', {style: 'color: teal'}, '')
                    ]),
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            instance.confirmButtonLoading = true;
                            instance.confirmButtonText = '执行中...';
                            setTimeout(() => {
                                done();
                                setTimeout(() => {
                                    instance.confirmButtonLoading = false;
                                }, 1000);
                            }, 1000);
                        } else {
                            done();
                        }
                    }
                }).then(action => {
                    this.$axios.get("http://localhost:8888/order/saveorder/"+row.id).then(res => {
                        console.log(row.id);
                        var msg = res.data.message;
                        this.$message({
                            type: 'success',
                            message: msg
                        });
                        this.init();
                        return ;
                    });
                });
            },
            handleDetail3(index, row) {
                const h = this.$createElement;
                this.$msgbox({
                    title: '消息',
                    message: h('p', null, [
                        h('span', null, '确定取消预订此教材吗？ '),
                        h('i', {style: 'color: teal'}, '')
                    ]),
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            instance.confirmButtonLoading = true;
                            instance.confirmButtonText = '执行中...';
                            setTimeout(() => {
                                done();
                                setTimeout(() => {
                                    instance.confirmButtonLoading = false;
                                }, 1000);
                            }, 1000);
                        } else {
                            done();
                        }
                    }
                }).then(action => {
                    this.$axios.get("http://localhost:8888/order/deleteorder/"+row.id).then(res => {
                        var msg = res.data.message;
                        this.init();
                        this.$message({
                            type: 'success',
                            message: msg
                        });
                    });
                });

            },
            goBack() {
                this.detail = !this.detail;
            },
            init() {
                this.$axios.get("http://localhost:8888/order/getlist").then(res => {
                    this.list = res.data.data;
                    for (var i=0;i<this.list.length;i++){
                        this.array[i] = this.list[i].id;
                    }
                    console.log(this.list);
                    console.log(this.array);
                    });
            }
        },
        created() {
            this.page(1);
            this.init();
            if (this.$store.state.msgdisplay===0){
                const h = this.$createElement;
                this.$notify({
                    title: '温馨提示',
                    message: h('i', { style: 'color: teal'}, '每位学生一本教材一次只能预订一本')
                });
                this.$store.commit('setMsgdisplay',1);
            }

        }
    }
</script>

<style scoped>
    .el-table .warning-row {
        background: oldlace;
    }

    .el-table .success-row {
        background: #f0f9eb;
    }


</style>