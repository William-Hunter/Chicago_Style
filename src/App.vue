<template>
    <div id="app">
        <div>
            <el-row class="lines">
                <el-col :span="12" :offset="6">
                    <el-row class="lines">
                        <h2>芝加哥格式参考引用生成器</h2>
                    </el-row>
                    <el-row class="lines">
                        作者
                        <el-input
                                placeholder="请输入名字"
                                v-model="info.author.first_name"
                                clearable>
                        </el-input>
                        <el-input
                                placeholder="请输入中间名"
                                v-model="info.author.mid_name"
                                clearable>
                        </el-input>
                        <el-input
                                placeholder="请输入姓氏"
                                v-model="info.author.last_name"
                                clearable>
                        </el-input>
                    </el-row>
                    <el-row class="lines">
                        标题
                    </el-row>
                    <el-row class="lines">
                        <el-tabs v-model="activeName" @tab-click="handleClick" stretch=true type="border-card">
                            <el-tab-pane label="电子文献或网站" name="website">
                                <el-row class="lines" >
                                    网站区域
                                </el-row>
                            </el-tab-pane>
                            <el-tab-pane label="期刊文章" name="magazine">
                                <el-row class="lines" >
                                    期刊区域
                                </el-row>
                            </el-tab-pane>
                            <el-tab-pane label="图书专著" name="books">
                                <el-row class="lines" >
                                    图书专著
                                </el-row>
                            </el-tab-pane>
                        </el-tabs>
                    </el-row>
                    <el-row class="lines">
                        生成按钮
                    </el-row>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                info:{
                    author:{
                        first_name:'',
                        mid_name:'',
                        last_name:''
                    },
                },
                activeName: 'magazine',
                input: '',
            }
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            startHacking() {
                this.$notify({
                    title: 'It works!',
                    type: 'success',
                    message: 'We\'ve laid the ground work for you. It\'s time for you to build something epic!',
                    duration: 5000
                })
            }
        }
    }
</script>

<style>
    #app {
        font-family: Helvetica, sans-serif;
        text-align: center;
    }

    .lines {
        border: 1px solid rgba(86, 61, 124, .2);
        background-color: rgba(86, 61, 124, .15);
    }
</style>
