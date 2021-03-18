<template>
    <div>
        <i>书籍是人类进步的阶梯，一本好书，可以相伴终生，多读好书，是可以受益终生的。</i>

        <!--<el-carousel indicator-position="outside">
            <el-carousel-item v-for="item in imagelist" :key="item">
                &lt;!&ndash;<h3>{{ item.url }}</h3>&ndash;&gt;
                <img src="{item.url}">

            </el-carousel-item>
        </el-carousel>-->
        <el-carousel :interval="4000" type="card" height="400px">
            <el-carousel-item v-for="item in imagelist" :key="item">
                <!--<h3 class="medium">{{ item.url }}</h3>-->
                <el-image :src="item.url"></el-image>
                <!--<img :src="item.url"></img>-->
            </el-carousel-item>
        </el-carousel>
        <i>书是阶梯,帮助人们登上理想的高峰。</i><br>
        <img src="../assets/images/login.jpg">
    </div>
</template>

<script>
    export default {
        name: "Index",
        data() {
            return {
                imagelist: [
                    {url: require('../assets/images/login.jpg')},
                    {url: require('../assets/images/login1.jpg')},
                    {url: require('../assets/images/login2.jpg')},
                    {url: require('../assets/images/main_backgroud.jpg')}
                ]
            }
        }
    }
</script>

<style scoped>
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>