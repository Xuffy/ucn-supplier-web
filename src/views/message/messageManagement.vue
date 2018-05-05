<template>
    <div>
        <div class="head">
            <el-button @click="addNews">{{$i.common.add}}</el-button>
        </div>
        <div class="body">
          <v-table
            :data="tabData"
          />
        </div>

        <el-dialog
                class="speDialog"
                title="Add News"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <el-input
                type="input"
                :rows="2"
                placeholder="请输入标题"
                style="margin-bottom:10px"
                v-model="params.title"
               >
            </el-input>
            <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="params.content">
            </el-input>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="postAddMessage()">发 布</el-button>
                <el-button @click="dialogVisible = false">取消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import { VTable } from '@/components/index';
    export default {
        name: "message-management",
        components:{
          VTable
        },
        data(){
            return{
                tabData:[],
                tabLoad:true,
                params:{
                  title:'',
                  content:'',
                },
                pData:{
                  ps:10,
                  pn:1
                },
                dialogVisible:false,            //弹出框显示隐藏
                newsContent:'',              //新增消息的内容
            }
        },
        methods:{
            //表格操作
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            //发布
            publish(e){
                console.log(e)
            },

            //分页操作
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },

            //新增消息
            addNews(){
                this.dialogVisible=true;
            },

            //点击外部取消时的提示
            handleClose(done) {
                console.log('取消了')
                // this.$confirm('确认关闭？')
                //     .then(_ => {
                //         done();
                //     })
                //     .catch(_ => {});
                done();
            },
          getMessageList(){
            let url, column;
            this.tabLoad = true;
            column = this.$db.message.table;
            if(this.$route.query.type == 1) {;
              url = this.$apis.post_sys_queryownlist;
            } else {
              url = this.$apis.post_company_queryownlist;
            };
            this.$ajax.post(url,this.pData)
              .then(res => {
                this.tabData = this.$getDB(column, res.datas);
                this.tabLoad = false;
              })
              .catch(() => {
                this.tabLoad = false;
              })
          },
          postAddMessage(){
            let url
            if(this.$route.query.type == 1) {;
              url = this.$apis.post_sys_addsystemmessage;
            } else {
              url = this.$apis.post_company_addcompanymessage;
            };
            this.$ajax.post(url, this.params)
            .then(res => {
              this.$message('发送成功');
              this.getMessageList()
            })
            .catch(() => {
              console.log('发送失败')
            })
            this.dialogVisible = false
          },

        },
      //get_messagesetting_query
      created(){
        this. getMessageList()
      }
    }
</script>

<style scoped>
    .head{
        padding: 10px 0;
    }
    .speDialog >>> .el-dialog__footer{
        text-align: center;
    }
</style>
