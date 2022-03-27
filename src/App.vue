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
                                            <el-radio v-model="info.maga.magaType" label="URL/DOI">URL/DOI</el-radio>
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
                    <el-button type="primary" round @click="generate()">生成结果</el-button>
                </el-footer>
            </el-container>


            <el-dialog title="生成结果" :visible.sync="dialogVisible" width="60%" :before-close="handleDialogClose">
                <el-row>
                    <span><b>FOOT NOTES & END NOTES</b></span>
                </el-row>
                <el-row>
                    <el-col :span="16" :offset="1">
                        <span>{{result.notes}}</span>
                    </el-col>
                    <el-col :span="7">
                        <el-button @click="" type="success" round @click="doCopy('notes')">复制到剪切板</el-button>
                    </el-col>
                </el-row>
<!--                <el-divider></el-divider>-->
                <br>
                <el-row>
                    <span> <b> BIBLIOGRAPHY</b></span>
                </el-row>
                <el-row>
                    <el-col :span="16" :offset="1">
                        <span>{{result.bio}}</span>
                    </el-col>
                    <el-col :span="7">
                        <el-button @click="" type="success" round @click="doCopy('bio')">复制到剪切板</el-button>
                    </el-col>
                </el-row>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false" type="danger">关闭</el-button>
                </span>
            </el-dialog>

        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dialogVisible: false,
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
                    maga: {
                        title: '',
                        volume: '',
                        issue: '',
                        page: '',
                        year: '',
                        magaType: 'paper',
                        link: '',
                    },
                },
                activeName: 'magazine',
                format: {
                    website: {
                        paper: {
                            notes: '',
                            bio: ''
                        },
                        electron: {
                            notes: '',
                            bio: ''
                        }
                    },
                    maga: {
                        paper: {
                            notes: ' [Author First Name] [Author Last Name], “[Article Title],” [Journal Name] [Volume], no. [Issue] ([Year Published]): [Cited Page].',
                            bio: '[Author Last Name], [Author First Name]. “[Article Title].” [Journal Name] [Volume], no. [Issue] ([Year Published]): [Entire Page Range of Article].'
                        },
                        electron: {
                            notes: '[Author First Name] [Author Last Name], “[Article Title],” [Journal Name] [Volume], no. [Issue] ([Year Published]): [Cited Page], accessed [Accessed Date], [URL/DOI].',
                            bio: '[Author Last Name], [Author First Name]. "[Article Title].” [Journal Name] [Volume], no. [Issue] ([Year Published]): [Entire Page Range of Article]. Accessed [Accessed Date]. [URL/DOI].'
                        }
                    },
                    books: {
                        paper: {
                            notes: '',
                            bio: ''
                        },
                        electron: {
                            notes: '',
                            bio: ''
                        }
                    }
                },
                result: {
                    notes: '',
                    bio: '',
                }
            }
        },
        methods: {
            doCopy(type){
                var that = this;
                var copyText
                if('notes'==type){
                    copyText=this.result.notes
                }else{
                    copyText=this.result.bio
                }

                this.$copyText(copyText).then(function (e) {
                    that.$message({
                        message: '复制成功了，快去粘贴使用吧',
                        type: 'success'
                    });
                }, function (e) {
                    that.$message.error('复制失败');
                })
            },
            handleDialogClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            generate() {//生成按钮，按下
                console.log(this.info)
                switch (this.activeName) {
                    case 'website':
                        this.genWebsite()
                        break;
                    case 'magazine':
                        this.genMaga()
                        break;
                    case 'books':
                        this.genBooks()
                        break;
                }
            },
            getAccessedDate(){//生成访问日期
                var date=new Date()
                var month_english=date.toDateString().split(" ")[1];
                var year=date.getFullYear()
                var day=date.getDate()
                var fina=month_english+" "+day+","+year
                return fina
            },
            genWebsite(){

            },
            genMaga() {//生成期刊的结果
                if ('paper' == this.info.maga.magaType) {//期刊纸质
                    this.result = this.format.maga.paper

                    this.result.notes = this.result.notes.replace("[Author First Name]", this.info.author.first_name)
                    this.result.notes = this.result.notes.replace("[Author Last Name]", this.info.author.last_name)
                    this.result.notes = this.result.notes.replace("[Article Title]", this.info.title)
                    this.result.notes = this.result.notes.replace("[Journal Name]", this.info.maga.title)
                    this.result.notes = this.result.notes.replace("[Volume]", this.info.maga.volume)
                    this.result.notes = this.result.notes.replace("[Issue]", this.info.maga.issue)
                    this.result.notes = this.result.notes.replace("[Year Published]", this.info.maga.year)
                    this.result.notes = this.result.notes.replace("[Cited Page]", this.info.maga.page)
                    console.log(this.result.notes)
                    this.result.bio = this.result.bio.replace("[Author First Name]", this.info.author.first_name)
                    this.result.bio = this.result.bio.replace("[Author Last Name]", this.info.author.last_name)
                    this.result.bio = this.result.bio.replace("[Article Title]", this.info.title)
                    this.result.bio = this.result.bio.replace("[Journal Name]", this.info.maga.title)
                    this.result.bio = this.result.bio.replace("[Volume]", this.info.maga.volume)
                    this.result.bio = this.result.bio.replace("[Issue]", this.info.maga.issue)
                    this.result.bio = this.result.bio.replace("[Year Published]", this.info.maga.year)
                    this.result.bio = this.result.bio.replace("[Entire Page Range of Article]", this.info.maga.page)
                    console.log(this.result.bio)
                    this.dialogVisible=true;
                } else {//期刊电子
                    this.result = this.format.maga.electron

                    var date=this.getAccessedDate()
                    this.result.notes = this.result.notes.replace("[Author First Name]", this.info.author.first_name)
                    this.result.notes = this.result.notes.replace("[Author Last Name]", this.info.author.last_name)
                    this.result.notes = this.result.notes.replace("[Article Title]", this.info.title)
                    this.result.notes = this.result.notes.replace("[Journal Name]", this.info.maga.title)
                    this.result.notes = this.result.notes.replace("[Volume]", this.info.maga.volume)
                    this.result.notes = this.result.notes.replace("[Issue]", this.info.maga.issue)
                    this.result.notes = this.result.notes.replace("[Year Published]", this.info.maga.year)
                    this.result.notes = this.result.notes.replace("[Cited Page]", this.info.maga.page)
                    this.result.notes = this.result.notes.replace("[Accessed Date]",date )
                    this.result.notes = this.result.notes.replace("[URL/DOI]", this.info.maga.link)
                    // console.log(this.result.notes)
                    this.result.bio = this.result.bio.replace("[Author First Name]", this.info.author.first_name)
                    this.result.bio = this.result.bio.replace("[Author Last Name]", this.info.author.last_name)
                    this.result.bio = this.result.bio.replace("[Article Title]", this.info.title)
                    this.result.bio = this.result.bio.replace("[Journal Name]", this.info.maga.title)
                    this.result.bio = this.result.bio.replace("[Volume]", this.info.maga.volume)
                    this.result.bio = this.result.bio.replace("[Issue]", this.info.maga.issue)
                    this.result.bio = this.result.bio.replace("[Year Published]", this.info.maga.year)
                    this.result.bio = this.result.bio.replace("[Accessed Date]", date)
                    this.result.bio = this.result.bio.replace("[URL/DOI]", this.info.maga.link)
                    this.result.bio = this.result.bio.replace("[Entire Page Range of Article]", this.info.maga.page)
                    // console.log(this.result.bio)
                    // '[Author Last Name], [Author First Name]. "[Article Title].” [Journal Name] [Volume], no. [Issue] ([Year Published]): [Entire Page Range of Article]. Accessed [Accessed Date]. [URL/DOI].'
                    this.dialogVisible=true;
                }
            },
            genBooks(){//生成图书的内容

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
        margin-bottom: 12px;
        padding-bottom: 7px;
    }
</style>
