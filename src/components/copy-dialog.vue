<template>
    <div>
        <el-dialog title="生成结果" :visible.sync="dialogData.dialogVisible" width="60%" :before-close="handleDialogClose">
            <el-row>
                <span><b>FOOT NOTES & END NOTES</b></span>
            </el-row>
            <el-row>
                <el-col :span="16" :offset="1">
                    <span>{{dialogData.result.notes}}</span>
                </el-col>
                <el-col :span="7">
                    <el-button type="success" round @click="doCopy('notes')">复制到剪切板</el-button>
                </el-col>
            </el-row>
            <br>
            <el-row>
                <span> <b> BIBLIOGRAPHY</b></span>
            </el-row>
            <el-row>
                <el-col :span="16" :offset="1">
                    <span>{{dialogData.result.bio}}</span>
                </el-col>
                <el-col :span="7">
                    <el-button type="success" round @click="doCopy('bio')">复制到剪切板</el-button>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="handleDialogClose" type="danger">关闭</el-button>
                </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "CopyDialog",
        props:{
            dialogData: Object
        },
        model: {
            prop: 'dialogData',
        },
        data() {
            return {
                // dialogData:this.dialogData
            }
        },
        methods:{
            doCopy(type) {
                var that = this;
                var copyText
                if ('notes' == type) {
                    copyText = this.dialogData.result.notes
                } else {
                    copyText = this.dialogData.result.bio
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
                        this.dialogData.dialogVisible=false
                        this.$parent.resetResult()
                        done();
                    }).catch(_ => {});
            },
        }
    }
</script>

<style scoped>

</style>