<template>
    <div id="app">
        <div>
            <el-container>
                <el-header>
                    <h2>芝加哥格式参考引用生成器</h2>
                </el-header>
                <el-main>
                    <el-col :span="14" :offset="5">
                        <el-row class="lines"><!--贡献者-->
                            <el-row>
                                <el-col :span="6">
                                    <p>贡献者</p>
                                </el-col>
                            </el-row>
                            <el-col :span="6">
                                <el-select v-model="author_value" placeholder="请选择">
                                    <el-option
                                            v-for="item in author_options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="6">
                                <el-input
                                        placeholder="请输入名字"
                                        v-model="info.author.first_name"
                                        clearable>
                                </el-input>
                            </el-col>
                            <el-col :span="6">
                                <el-input
                                        placeholder="请输入中间名"
                                        v-model="info.author.mid_name"
                                        clearable>
                                </el-input>
                            </el-col>
                            <el-col :span="6">
                                <el-input
                                        placeholder="请输入姓氏"
                                        v-model="info.author.last_name"
                                        clearable>
                                </el-input>
                            </el-col>
                        </el-row>
                        <el-row class="lines">
                            <el-row>
                                <el-col :span="6">
                                    <p>标题</p>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="20" :offset="2">
                                    <el-input
                                            placeholder="请输入内容"
                                            v-model="info.title"
                                            clearable>
                                    </el-input>
                                </el-col>
                            </el-row>
                        </el-row>
                        <el-row class="lines">
                            <el-tabs v-model="activeName" @tab-click="handleClick" stretch=true type="border-card">
                                <el-tab-pane label="电子文献或网站" name="website">
                                    <el-row class="lines">
                                        网站区域
                                    </el-row>
                                </el-tab-pane>
                                <el-tab-pane label="期刊文章" name="magazine">
                                    <el-row class="lines">
                                        <el-row>
                                            <el-col :span="6">
                                                <p>期刊标题</p>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="21" :offset="1">
                                                <el-input
                                                        placeholder="请输入内容"
                                                        v-model="info.maga.title"
                                                        clearable>
                                                </el-input>
                                            </el-col>
                                        </el-row>
                                    </el-row>

                                    <el-row class="lines">
                                        <el-col :span="8">
                                            期号：
                                            <el-input
                                                    placeholder="请输入期号"
                                                    v-model="info.maga.volume"
                                                    clearable>
                                            </el-input>
                                        </el-col>
                                        <el-col :span="8">
                                            卷号：
                                            <el-input
                                                    placeholder="请输入卷号"
                                                    v-model="info.maga.issue"
                                                    clearable>
                                            </el-input>
                                        </el-col>
                                        <el-col :span="8">
                                            页码：
                                            <el-input
                                                    placeholder="请输入页码"
                                                    v-model="info.maga.page"
                                                    clearable>
                                            </el-input>
                                        </el-col>
                                    </el-row>

                                    <el-row class="lines">
                                        <el-row>
                                            <el-col :span="6">
                                                出版年份：
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="8" :offset="1">
                                                <el-input
                                                        type="number"
                                                        placeholder="请输入出版年份,yyyy"
                                                        v-model="info.maga.year"
                                                        clearable>
                                                </el-input>

                                            </el-col>
                                        </el-row>
                                    </el-row>

                                    <el-row class="lines">
                                        <el-row>
                                            <el-radio v-model="info.maga.magaType" label="paper">纸质版</el-radio>
                                            <el-radio v-model="info.maga.magaType" label="URL">URL</el-radio>
                                            <el-radio v-model="info.maga.magaType" label="DOI">DOI</el-radio>
                                        </el-row>
                                        <el-row>
                                            <el-input v-show="'paper'!=info.maga.magaType"
                                                      type="text"
                                                      :placeholder="`请输入${info.maga.magaType}`"
                                                      v-model="info.maga.link"
                                                      clearable>
                                            </el-input>
                                        </el-row>
                                    </el-row>

                                </el-tab-pane>
                                <el-tab-pane label="图书专著" name="books">
                                    <el-row class="lines">
                                        图书专著
                                    </el-row>
                                </el-tab-pane>
                            </el-tabs>
                        </el-row>
                    </el-col>
                </el-main>
                <el-footer>
                    <el-button type="primary" round @click="generate">生成结果</el-button>
                </el-footer>
            </el-container>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                author_options: [{
                    value: 'writer',
                    label: '作者'
                }, {
                    value: 'editor',
                    label: '编辑'
                }, {
                    value: 'translater',
                    label: '译者'
                }],
                author_value: 'writer',
                info: {
                    author: {
                        first_name: '',
                        mid_name: '',
                        last_name: ''
                    },
                    title: '',
                    maga:{
                        title:'',
                        volume:'',
                        issue:'',
                        page:'',
                        year:'',
                        magaType:'paper',
                        link:'',
                    },
                },
                activeName: 'magazine',
            }
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            generate(){
                console.log(this.info)
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
        margin-bottom: 15px;
    }
</style>
