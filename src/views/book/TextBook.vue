<template>
    <div>
        <el-table
                v-loading="loading"
                :data="books"
                style="width: 100%"
                :row-class-name="tableRowClassName">
            <el-table-column
                    prop="id"
                    label="ID">
            </el-table-column>
            <el-table-column
                    prop="campus"
                    label="校区">
            </el-table-column>
            <el-table-column
                    prop="courseUnit"
                    label="学院">
            </el-table-column>
            <el-table-column
                    prop="courseName"
                    label="课程名称">
            </el-table-column>
            <el-table-column
                    prop="classNumber"
                    label="班级">
            </el-table-column>
            <el-table-column
                    prop="people"
                    label="人数">
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
            <el-table-column
                    prop="isbn"
                    label="ISBN">
            </el-table-column>
        </el-table>
        <el-pagination
                :current-page="currentPage"
                :page-size="pageSize"
                :total="total"
                @current-change=page
                @size-change="handleSizeChange"
                :page-sizes="[10, 20, 30, 40]"
                layout="total, sizes, prev, pager, next, jumper"
        >
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "TextBook",
        data() {
            return {
                books: {},
                currentPage: 1,
                total: 0,
                pageSize: 10,
                loading: true
            }
        },
        methods: {
            page(val) {
                const _this = this;
                _this.$axios.get("http://localhost:8888/textbook/getTexts?pageNum="+(val-1)+"&pageSize="+this.pageSize).then(res => {
                    console.log(res);
                    _this.books = res.data.data.content;
                    _this.currentPage = res.data.number;
                    _this.total = res.data.data.totalElements;
                    _this.pageSize = res.data.data.size;
                    _this.loading = false;nom
                })
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                //this.page(this.currentPage,val)
                this.pageSize=val;
                this.page(this.currentPage);
            }
        },
        created() {
            this.page(1);
        }
    }
</script>

<style scoped>
    .mpage {
        margin: 0 auto;
        text-align: center;
    }
</style>