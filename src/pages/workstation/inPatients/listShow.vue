<template>
    <div class='table_list'>
      <el-table :data='bed_sign_list' border>
        <!--<el-table-column  prop='BED_NUMBER' label="床号"  min-width="40"></el-table-column>-->
        <!--<el-table-column  prop='BED_CATEGORY_NAME' label="床位类型"  min-width="70"></el-table-column>-->
        <el-table-column  prop='NAME' label="姓名"  min-width="80">
          <template slot-scope="{row}">
            <el-button type='text' @click='showDoc(row)'>
              {{ row.BED_NUMBER+'床_'+row.NAME }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column  prop='SEX' label="性别"  min-width="36"></el-table-column>
        <el-table-column  prop='PATIENT_AGE' label="年龄"  min-width="100"></el-table-column>
        <el-table-column  prop='DIAGNOSTIC_RESULTS' label="诊断"  min-width="240"></el-table-column>
        <el-table-column  prop='NURSING_GRADE' label="护理级别"  min-width="80"></el-table-column>
        <el-table-column  prop='MEDICAL_RECORD_NUM' label="住院号"  min-width="100"></el-table-column>
        <el-table-column  prop='HOSPITALIZED_DATE' label="入院时间"  min-width="140"></el-table-column>
        <el-table-column  prop='FEEBY' label="病人费别"  min-width="140"></el-table-column>
        <el-table-column  prop='DOCTOR' label="主管医生"  min-width="80"></el-table-column>
      </el-table>
      <div style="margin:20px 0;">
        <el-pagination background @current-change="handleCurrentChange" :current-page="currentPage" :page-size="20" layout="total, prev, pager, next, jumper" :total="adicsCount"></el-pagination>
      </div>
    </div>
</template>

<script>
    export default {
        name: "listShow",

        data(){
          return{
            currentPage : 1,
            own : 0,
            adicsCount : 0,
            bed_sign_list : [],
            serch_value:''
          }
        },

        methods : {
          handleCurrentChange(val) {       //当前页变化的时候
            this.currentPage = val
            this.getData()
          },
          getData(){
            this.getSer("datacenter/bed",{ filterfuc : this.$store.state.bedType ,'page_size':20 , page: this.currentPage, is_onlyprimary : this.own, inpatient_number : this.serch_value}, res => {
              console.log(res)
                console.log('pageCount')
                console.log(res.data.meta.totalCount);
              if(res.status <= 400){
                this.adicsCount = res.data.meta.totalCount
                this.bed_sign_list = res.data.items
              }
            })
          },
          showDoc(row){
            this.$parent.$refs.card.showDOC(row)
          }
        },

        mounted(){
          this.$nextTick(()=>{
            this.getData()
          })
        },

        watch :{
          '$store.state.bedType' : function () {
            this.getData()
          },
          '$parent.own' : function () {
            this.$parent.own == 1 ? this.own = 1 : this.own = 0
            this.getData()
          }
        }
    }
</script>

<style scoped lang='stylus'>
  .table_list
    margin 0 20px
    border-radius 4px
    background-color #ffffff
    padding 20px
    .el-table
    &>>>.el-table__header
      .cell
        line-height 36px
    &>>>.el-table__body-wrapper
      td
        padding 0
      .cell
        line-height 36px

</style>
