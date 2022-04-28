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
                    <el-col :span="18" :offset="0">
                        <el-input
                                placeholder="请输入网址"
                                v-model="info.website.URL"
                                clearable>
                        </el-input>

                    </el-col>
                    <el-col :span="5" :offset="0">
                        <el-button type="warning" @click="getherUrlInfo">自动获取信息</el-button>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>

        <el-row class="lines">
            <el-col class="lines" :span="10" :offset="2">
                <el-row>
                    <el-col :span="8" :offset="0">
                        网站名
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22" :offset="1">
                        <el-input
                                placeholder="请输入网站名"
                                v-model="info.website.name"
                                clearable>
                        </el-input>

                    </el-col>
                </el-row>
            </el-col>

            <el-col class="lines" :span="8" :offset="2">
                <el-row>
                    <el-col :span="9" :offset="0">
                        出版方
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22" :offset="1">
                        <el-input
                                placeholder="请输入出版方"
                                v-model="info.website.publisher"
                                clearable>
                        </el-input>
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
                    <el-select v-model="info.website.day" placeholder="请选择" clearable filterable>
                        <el-option
                                v-for="item in days"
                                :key="item.value"
                                :label="item.value"
                                :value="item.value">
                            <span style="float: left">{{ item.value }}</span>
                            <!--                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>-->
                        </el-option>
                    </el-select>

                </el-row>
            </el-col>
            <el-col :span="6" :offset="1" class="lines">
                <el-row>
                    <el-col :span="8">
                        月：
                    </el-col>
                </el-row>
                <el-row>
                    <el-select v-model="info.website.month" placeholder="请选择" clearable filterable>
                        <el-option
                                v-for="item in months"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            <span style="float: left">{{ item.label }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                        </el-option>
                    </el-select>
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
                            type="number"
                            min="1"
                            clearable
                    >
                    </el-input>
                </el-row>
            </el-col>
        </el-row>


    </div>

</template>

<script>
    import Generator from '../assets/utils/generate.js'
    import HtmlUtil from '../assets/utils/tools.js'
    import config from '../config.js'

    const axios = require('axios').default;


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
                months: [
                    {label: '一月', value: 'Jan'}, {label: '二月', value: 'Feb'}, {label: '三月', value: 'Mar'},
                    {label: '四月', value: 'Apr'}, {label: '五月', value: 'May'}, {label: '六月', value: 'Jun'},
                    {label: '七月', value: 'Jul'}, {label: '八月', value: 'Aug'}, {label: '九月', value: 'Sep'},
                    {label: '十月', value: 'Oct'}, {label: '十一月', value: 'Nov'}, {label: '十二月', value: 'Dec'}
                ],
                days: [
                    {value: '1'}, {value: '2'}, {value: '3'}, {value: '4'}, {value: '5'}, {value: '6'}, {value: '7'}, {value: '8'},
                    {value: '9'}, {value: '10'}, {value: '11'}, {value: '12'}, {value: '13'}, {value: '14'}, {value: '15'},
                    {value: '16'}, {value: '17'}, {value: '18'}, {value: '19'}, {value: '20'}, {value: '21'}, {value: '22'},
                    {value: '23'}, {value: '24'}, {value: '25'}, {value: '26'}, {value: '27'}, {value: '28'}, {value: '29'},
                    {value: '30'}, {value: '31'}
                ]
            }
        },
        methods: {
            getHostnameFromRegex() {
                var url = this.info.website.URL
                if (!url.startsWith("https://") && !url.startsWith("http://")) {
                    url = "https://" + url
                }
                // console.log("url",url)
                this.info.website.URL = url

                // run against regex
                var matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
                // extract hostname (will be null if no match is found)
                var result = null
                if (matches && matches[1]) {
                    result = matches && matches[1]
                } else {
                    matches = url.match(/^http?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
                    result = matches && matches[1]
                }
                // console.log("url_result",result)
                return result;
            },
            async getherUrlInfo() {
                this.info.title=''

                var domain = this.getHostnameFromRegex()

                console.log("domain", domain)

                var domains = domain.split(".")
                // console.log("domains", domains)
                var websiteName
                if (3 == domains.length) {
                    websiteName = domains[1]
                } else if (4 == domains.length) {
                    websiteName = domains[1] + "." + domains[2]
                } else if (2 == domains.length) {
                    websiteName = domains[0]
                }
                // console.log("websiteName", websiteName)
                this.info.website.name = websiteName
                this.info.website.publisher = websiteName

                var date = Generator.getDateObject()
                // console.log("date",date)
                this.info.website.year = date.year
                this.info.website.month = date.month_english
                this.info.website.day = date.day

                console.log("get title")

                var url = HtmlUtil.htmlEncode(this.info.website.URL)
                url =config.api_url+ "/cite-machine-api/spider/query?url=" + url
                var res=await axios.get(url).then(response => response.data)
                console.log("res",res)
                if(null!=res && '' != res){
                    this.info.title = res.title
                }

                console.log("get title done")
            },
        }
    }
</script>

<style scoped>

</style>