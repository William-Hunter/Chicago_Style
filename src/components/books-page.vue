<template>
    <div>
        <el-row class="lines"><!--            卷号版号-->
            <el-col class="lines" :span="7" :offset="1">
                <el-row>
                    <el-col :span="8">
                            版号：
                    </el-col>
                </el-row>
                <el-row>
                    <el-input
                            placeholder="请输入版号"
                            v-model="book.edition"
                            clearable>
                    </el-input>
                </el-row>
            </el-col>
            <el-col class="lines" :span="8" :offset="1">
                <el-row>
                    <el-col :span="8">
                            卷号：
                    </el-col>
                </el-row>
                <el-row>
                    <el-input
                            placeholder="请输入卷号"
                            v-model="book.issue"
                            clearable>
                    </el-input>
                </el-row>
            </el-col>
            <el-col class="lines" :span="5" :offset="1">
                <el-row>
                    <el-col :span="12">
                        页码：
                    </el-col>
                </el-row>
                <el-row>
                    <el-input
                            placeholder="请输入页码"
                            v-model="book.page"
                            clearable>
                    </el-input>
                </el-row>
            </el-col>
        </el-row>

        <el-row class="lines"><!--            出版信息-->
            <el-col class="lines" :span="7" :offset="1">
                <el-row>
                    <el-col :span="9">
                        出版社：
                    </el-col>
                </el-row>
                <el-row>
                    <el-input
                            placeholder="请输入出版社"
                            v-model="book.publisher"
                            clearable>
                    </el-input>
                </el-row>
            </el-col>
            <el-col class="lines" :span="8" :offset="1">
                <el-row>
                    <el-col :span="11">
                        出版地点：
                    </el-col>
                </el-row>
                <el-row>
                    <el-input
                            placeholder="请输入出版地点"
                            v-model="book.location"
                            clearable>
                    </el-input>
                </el-row>
            </el-col>
            <el-col class="lines" :span="5" :offset="1">
                <el-row>
                    <el-col :span="18">
                        出版年份：
                    </el-col>
                </el-row>
                <el-row>
                    <el-input
                            placeholder="请输入出版年份"
                            v-model="book.year"
                            clearable>
                    </el-input>
                </el-row>
            </el-col>

        </el-row>


    </div>

</template>

<script>
    export default {
        name: "BooksPage",
        props: {
            book: Object
        },
        model: {
            prop: 'book',
        },
        data() {
            return {}
        },
    }
</script>

<style scoped>

</style>