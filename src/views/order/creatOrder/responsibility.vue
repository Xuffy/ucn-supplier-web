<template>
    <div class="responsibility">
         <div>
              <div class="r_title">
                 responsibility
              </div>
              <div class="r_table">
   <el-table :data="tableData" style="width: 100%">
      <el-table-column
        prop="type"
        label="Type"
        width="240">
        <template slot-scope="scope">
            <span  v-model="scope.row.type">
                  <span v-if="scope.row.type==0">NeedLabelDesignInfoDate</span>
                  <span v-else-if="scope.row.type==1">LableDesignDate</span>
                  <span v-else-if="scope.row.type==2">DesignNeedConfirmDate</span>
                  <span v-else-if="scope.row.type==3">ReceiveSampleDate</span>
                  <span v-else-if="scope.row.type==4">SampleNeedConfirmDate</span>
                  <span v-else-if="scope.row.type==5">OtherDate</span>
            </span>
        </template>
</el-table-column>
<el-table-column prop="customer" label="Me" width="240">
    <template slot-scope="scope">
             
               <el-date-picker
                  v-model="scope.row.customer"
                  type="datetime"
                 :disabled=true                              >    
                </el-date-picker>
        </template>
</el-table-column>
<el-table-column prop="supplier" label="Supplier" width="240">
    <template slot-scope="scope">
               <el-date-picker
                  v-model="scope.row.supplier"
                  type="datetime"
                  placeholder=""             
                  :disabled='(copyData[scope.$index].customer!="")||scope.$index==0||scope.$index==2||scope.$index==4||disabled' 
                  >
                </el-date-picker>
               
        </template>
</el-table-column>
<el-table-column prop="remark" label="Remark" width="240">
    <template slot-scope="scope">
            <el-input
                  v-model="scope.row.remark"  :disabled='(copyData[scope.$index].remark!="")||disabled'        
            ></el-input>
        </template>
</el-table-column>
<el-table-column prop="actualDt" label="Actual Date" width="240">
    <template slot-scope="scope">
               <el-date-picker
                  v-model="scope.row.actualDt"
                  type="datetime"
                :disabled='(copyData[scope.$index].actualDt!="")||disabled'          
                  >
                </el-date-picker>
               
        </template>
</el-table-column>
</el-table>

</div>
</div>
</div>
</template>
<script>
    /*
         0=>NeedLabelDesignInfoDate 1=>LableDesignDate 2=>DesignNeedConfirmDate 3=>ReceiveSampleDate 4=>SampleNeedConfirmDate 5=>OtherDate */
    export default {
        name: 'responsibility',
        components: {

        },
        props: {
            disabled: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                tableData: [{
                    type: '0',
                    id: '',
                    orderId: '',
                    customer: '',
                    supplier: '',
                    remark: '',
                    actualDt: '',
                    orderNo:'999'
                }, {
                    type: '1',
                    id: '',
                    orderId: '',
                    customer: '',
                    supplier: '',
                    remark: '',
                    actualDt: '',
                     orderNo:'999'
                }, {
                    type: '2',
                    id: '',
                    orderId: '',
                    customer: '',
                    supplier: '',
                    remark: '',
                    actualDt: '',
                     orderNo:'999'
                }, {
                    type: '3',
                    id: '',
                    orderId: '',
                    customer: '',
                    supplier: '',
                    remark: '',
                    actualDt: '',
                     orderNo:'999'
                }, {
                    type: '4',
                    id: '',
                    orderId: '',
                    customer: '',
                    supplier: '',
                    remark: '',
                    actualDt: '',
                     orderNo:'999'
                }, {
                    type: '5',
                    id: '',
                    orderId: '',
                    customer: '',
                    supplier: '',
                    remark: '',
                    actualDt: '',
                     orderNo:'999'
                }],
                copyData: []
            }
        },
        methods: {

        },
        created() {
            this.copyData = this.$copyArr(this.tableData)

        }
    }

</script>

<style scoped>
    .responsibility{
        margin-top: 60px
    }
    .r_title {
        font-size: 14px;
        height: 60px;
        line-height: 40px;
        border-bottom: 1px solid #ccc;
        padding: 0 15px;
    }

    .el-date-picker {
        width: 220px;
    }

    .r_table {
        width: 100%;
        overflow: auto;
    }

</style>
