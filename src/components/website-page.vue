<template>
    <div>
        <el-row class="lines">
            <el-col class="lines" :span="22" :offset="1">
                <el-row>
                    <el-col :span="3">
                        网址
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="20" :offset="0">
                        <el-input
                                placeholder="请输入网址"
                                v-model="info.website.URL"
                                clearable>
                        </el-input>

                    </el-col>
                    <el-col :span="3" :offset="0">
                        <el-button type="warning" @click="getherUrlInfo">自动获取信息</el-button>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>

        <el-row class="lines">
            <el-col :span="7" :offset="1" class="lines">
                <el-row>
                    <el-col :span="8">
                        日：
                    </el-col>
                </el-row>
                <el-row>
                    <el-input
                            placeholder="请输入日"
                            v-model="info.website.day"
                            clearable>
                    </el-input>
                </el-row>
            </el-col>
            <el-col :span="6" :offset="1" class="lines">
                <el-row>
                    <el-col :span="8">
                        月：
                    </el-col>
                </el-row>
                <el-row>
                    <el-input
                            placeholder="请输入月"
                            v-model="info.website.month"
                            clearable>
                    </el-input>
                </el-row>
            </el-col>
            <el-col :span="7" :offset="1" class="lines">
                <el-row>
                    <el-col :span="8">
                        年：
                    </el-col>
                </el-row>
                <el-row>
                    <el-input
                            placeholder="请输入年"
                            v-model="info.website.year"
                            clearable>
                    </el-input>
                </el-row>
            </el-col>
        </el-row>


    </div>

</template>

<script>
    export default {
        name: "WebsitePage",
        props: {
            info: Object
        },
        model: {
            prop: 'info',
        },
        data() {
            return {
                // dialogData:this.dialogData
            }
        },
        methods:{
            getherUrlInfo:function () {



            }
        }
    }
</script>

<style scoped>

</style>