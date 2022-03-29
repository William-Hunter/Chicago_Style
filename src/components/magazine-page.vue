<template>
    <div>
        <el-row class="lines">
            <el-col class="lines" :span="22" :offset="1">
                <el-row >
                    <el-col :span="3" >
                        期刊名
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24" :offset="0">
                        <el-input
                                placeholder="请输入内容"
                                v-model="maga.title"
                                clearable>
                        </el-input>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>

        <el-row class="lines">
            <el-col :span="7" :offset="1" class="lines">
                <el-row>
                    <el-col :span="11">
                        期号：
                    </el-col>
                </el-row>
                <el-row>
                    <el-input
                            placeholder="请输入期号"
                            v-model="maga.volume"
                            clearable>
                    </el-input>
                </el-row>
            </el-col>
            <el-col :span="6" :offset="1" class="lines">
                <el-row>
                    <el-col :span="11">
                        卷号：
                    </el-col>
                </el-row>
                <el-row>
                    <el-input
                            placeholder="请输入卷号"
                            v-model="maga.issue"
                            clearable>
                    </el-input>
                </el-row>
            </el-col>
            <el-col :span="7" :offset="1" class="lines">
                <el-row>
                    <el-col :span="11">
                        页码：
                    </el-col>
                </el-row>
                <el-row>
                    <el-input
                            placeholder="请输入页码"
                            v-model="maga.page"
                            clearable>
                    </el-input>
                </el-row>

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
                            v-model="maga.year"
                            clearable>
                    </el-input>

                </el-col>
            </el-row>
        </el-row>

        <el-row class="lines">
            <el-row>
                <el-radio v-model="maga.magaType" label="paper">纸质版</el-radio>
                <el-radio v-model="maga.magaType" label="URL/DOI">URL/DOI</el-radio>
            </el-row>
            <el-row>
                <el-input v-show="'paper'!=maga.magaType"
                          type="text"
                          :placeholder="`请输入${maga.magaType}`"
                          v-model="maga.link"
                          clearable>
                </el-input>
            </el-row>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "MagazinePage",
        props: {
            maga: Object
        },
        model: {
            prop: 'maga',
        },
        data() {
            return {}
        },
    }
</script>

<style scoped>

</style>