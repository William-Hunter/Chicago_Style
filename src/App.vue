<template>
    <div id="app">
        <div>
            <el-container>
                <el-header>
                    <h2>芝加哥格式参考引用生成器</h2>
                </el-header>
                <br>
                <el-main>
                    <el-col :span="14" :offset="5">
                        <el-row class="lines"><!--贡献者-->
                            <el-col :span="4"  class="lines" :offset="1">
                                <el-row>
                                    <el-col :span="12" :offset="1">
                                        贡献者
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-select v-model="author_value" placeholder="请选择">
                                        <el-option
                                                v-for="item in author_options"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-row>
                            </el-col>
                            <el-col :span="5" class="lines" :offset="1">
                                <el-row>
                                    <el-col :span="11">
                                        名字:
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-input
                                            placeholder="请输入名字"
                                            v-model="info.author.first_name"
                                            clearable>
                                    </el-input>
                                </el-row>
                            </el-col>
                            <el-col :span="5"  class="lines" :offset="1">
                                <el-row>
                                    <el-col :span="11">
                                        中间名:
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-input
                                            placeholder="请输入中间名"
                                            v-model="info.author.mid_name"
                                            clearable>
                                    </el-input>
                                </el-row>
                            </el-col>
                            <el-col :span="5" class="lines" :offset="1">
                                <el-row>
                                    <el-col :span="11">
                                        姓氏:
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-input
                                            placeholder="请输入姓氏"
                                            v-model="info.author.last_name"
                                            clearable>
                                    </el-input>
                                </el-row>
                            </el-col>
                        </el-row>
                        <el-row class="lines">
                            <el-row>
                                <el-col :span="6">
                                    标题
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
                                    <website-page ref="webCom" v-model="info"></website-page>
                                </el-tab-pane>
                                <el-tab-pane label="期刊文章" name="magazine">
                                    <magazine-page ref="magaCom" v-model="info.maga"></magazine-page>
                                </el-tab-pane>
                                <el-tab-pane label="图书专著" name="books">
                                    <BooksPage ref="bookCom" v-model="info.book"></BooksPage>
                                </el-tab-pane>
                            </el-tabs>
                        </el-row>
                    </el-col>
                </el-main>
                <el-footer>
                    <el-button type="primary" round @click="generate()">生成结果</el-button>
                </el-footer>
            </el-container>

            <copy-dialog ref="copie" v-model="dialogData"></copy-dialog>

        </div>
    </div>
</template>


<script>
    import CopyDialog from './components/copy-dialog';
    import MagazinePage from './components/magazine-page';
    import BooksPage from './components/books-page';
    import WebsitePage from './components/website-page';
    import Generator from './assets/utils/generate.js'


    export default {
        components: {MagazinePage, BooksPage, CopyDialog, WebsitePage},
        data() {
            return {
                FORMAT: {//格式模板
                    website: {
                        notes: '[Author First Name] [Author Last Name], “[Page Title],” [Website Name], [Name of Publisher], [Date], [URL].',
                        bio: '[Author Last Name], [Author First Name]. “[Page Title].” [Website Name]. [Name of Publisher], [Date]. [URL].'
                    },
                    maga: {
                        paper: {
                            notes: '[Author First Name] [Author Last Name], “[Article Title],” [Journal Name] [Volume], no. [Issue] ([Year Published]): [Cited Page].',
                            bio: '[Author Last Name], [Author First Name]. “[Article Title].” [Journal Name] [Volume], no. [Issue] ([Year Published]): [Entire Page Range of Article].'
                        },
                        electron: {
                            notes: '[Author First Name] [Author Last Name], “[Article Title],” [Journal Name] [Volume], no. [Issue] ([Year Published]): [Cited Page], accessed [Accessed Date], [URL/DOI].',
                            bio: '[Author Last Name], [Author First Name]. "[Article Title].” [Journal Name] [Volume], no. [Issue] ([Year Published]): [Entire Page Range of Article]. Accessed [Accessed Date]. [URL/DOI].'
                        }
                    },
                    books: {
                        notes: '[Author First Name] [Author Last Name], [Book Title] ([Publication Location]: [Publisher Name], [Year Published])[Page Number].',
                        bio: '[Author Last Name], [Author First Name]. [Book Title]. [Publication Location]: [Publisher Name], [Year Published].'
                    }
                },
                author_options: [
                    {value: 'writer', label: '作者'},
                    {value: 'editor', label: '编辑'},
                    {value: 'translater', label: '译者'}
                ],
                author_value: 'writer',
                activeName: 'website',
                info: {//保存用户输入的数据
                    author: {first_name: '', mid_name: '', last_name: ''},
                    title: '',
                    maga: {title: '', volume: '', issue: '', page: '', year: '', magaType: 'paper', link: ''},
                    book: {edition: '', volume: '', publisher: '', location: '', year: '', page: ''},
                    website:{URL:'',website_name:'',publisher:'',date:'',year:'',month:'',day:''}
                },
                dialogData: {
                    dialogVisible: false,
                    result: {notes: '生成异常', bio: '生成异常'},
                }
            }
        },
        mounted() {

        },
        methods: {
            resetResult(){
                this.dialogData.result={notes: '生成异常', bio: '生成异常'}
            },
            handleClick(tab, event) {
                // console.log(tab, event);
            },
            generate() {//生成按钮，按下
                var _format = JSON.parse(JSON.stringify(this.FORMAT));
                // console.log("_format", _format)
                switch (this.activeName) {
                    case 'website':
                        this.dialogData.result = Generator.genWebsite(_format.website, this.info)
                        this.dialogData.dialogVisible = true;//显示弹框
                        break;
                    case 'magazine':
                        this.dialogData.result = Generator.genMaga(_format.maga, this.info)
                        this.dialogData.dialogVisible = true;//显示弹框
                        break;
                    case 'books':
                        this.dialogData.result = Generator.genBooks(_format.books, this.info)
                        this.dialogData.dialogVisible = true;//显示弹框
                        break;
                }
            },
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
        padding-bottom: 15px;
        padding-top: 15px;
    }
</style>
