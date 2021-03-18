<template>
    <div>
        <i>你所有的预订信息都在这里</i>
        <div v-if="this.detail === true">
            <el-table
                    v-loading="loading"
                    :data="orders"
                    style="width: 100%"
                    :row-class-name="tableRowClassName">
                <!--<el-table-column
                        prop="order_id"
                        label="ID"
                        width="120">
                </el-table-column>-->
                <el-table-column
                        prop="book_name"
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
                <el-table-column
                        prop="flagdetail"
                        label="预订时间">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                type="primary"
                                @click="handleDetail1(scope.$index, scope.row)">详情
                        </el-button>
                        <el-button
                                size="mini"
                                type="warning"
                                @click="handleDetail3(scope.$index, scope.row)">取消预订
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    :current-page="currentPage"
                    :page-size="pageSize"
                    :total="total"
                    @current-change=page
                    @size-change="handleSizeChange"
                    :page-sizes="[10, 20, 30, 40]"
                    layout="total, sizes, prev, pager, next, jumper">
            </el-pagination>
        </div>
        <div v-else>
            <el-page-header @back="goBack" content="详情页面">
            </el-page-header>
            <el-form :model="_message" style="margin-left: 200px;">
                <el-form-item label="预订ID ">
                    <el-input v-model="_message.order_id" readonly></el-input>
                </el-form-item>
                <el-form-item label="预订时间 ">
                    <el-input v-model="_message.flagdetail" readonly></el-input>
                </el-form-item>
                <el-form-item label="教材ID ">
                    <el-input v-model="_message.book_id" readonly></el-input>
                </el-form-item>
                <el-form-item label="教材名字 ">
                    <el-input v-model="_message.book_name" readonly></el-input>
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
        name: "Order",
        data() {
            return {
                orders: {},
                loading: true,
                currentPage: 1,
                total: 0,
                pageSize: 10,
                detail: true,
                _message: {}
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
            handleDetail1(index, row) {
                this.detail = !this.detail;
                this._message = row;
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
                    this.$axios.get("http://localhost:8888/order/deleteorder/" + row.book_id).then(res => {
                        console.log("http://localhost:8888/order/deleteorder/" + row.order_id);
                        var msg = res.data.message;
                        this.page(this.currentPage);
                        this.$message({
                            type: 'success',
                            message: msg
                        });
                    });
                });
            },
            page(val) {
                const _this = this;
                _this.$axios.get("http://localhost:8888/order/getorders?pageNum=" + (val - 1) + "&pageSize=" + this.pageSize).then(res => {
                    console.log(res);
                    _this.orders = res.data.data.content;
                    _this.currentPage = res.data.data.number;
                    _this.total = res.data.data.totalElements;
                    _this.loading = false;
                });
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                //this.page(this.currentPage,val)
                this.pageSize = val;
                this.page(this.currentPage);
            },
            goBack() {
                this.detail = !this.detail;
            }
        },
        created() {
            this.page(1);
        }
    }
</script>

<style scoped>

</style>