<template>
    <div>
      <div class='out-main' style="padding-top: 20px;">
        <div class='sort-box'>
<!--
          <el-button type='primary' class='serch-btn' @click="getAss" :disabled="patientAss.length!=0">病人评估</el-button>
-->
          <div style="float: right;">
<!--
            <el-button type='primary' class='serch-btn add' @click="getAdd"  :disabled="patientAss.length==0">新增</el-button>
-->
            <el-button type='primary' class='serch-btn see' >预览</el-button>
            <el-button type="primary" class='serch-btn ' icon="el-icon-printer"></el-button>
          </div>
        </div>
        <div style="padding-bottom: 20px;border-bottom: 1px dashed #D8E3E7;margin-bottom: 20px;">
          <el-table :data="patientAss" style="width: 100%" >
            <el-table-column  label="评估时间" min-width="120">
              <template slot-scope="{row}">
                <span>{{ row.ASSESS_TIME | stampTotime }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="CAREGIVERS" label="照顾者" ></el-table-column>
            <el-table-column prop="NEED_TRANSLATE" label="需翻译"></el-table-column>
            <el-table-column prop="MENTALITY" label="心理"></el-table-column>
            <el-table-column prop="LITERACY" label="识字"></el-table-column>
            <el-table-column prop="AMNESIA" label="失忆"></el-table-column>
            <el-table-column prop="RELIGION" label="宗教/文化习俗"></el-table-column>
            <el-table-column prop="HEARING" label="听力"></el-table-column>
            <el-table-column prop="LEFT_VISION" label="视力(左)"></el-table-column>
            <el-table-column prop="RIGHT_VISION" label="视力(右)"></el-table-column>
            <el-table-column prop="LANGUAGE_EXPRESS" label="语言表达"></el-table-column>
            <el-table-column prop="IS_CAREGIVERS" label="无照顾者"></el-table-column>
            <el-table-column prop="OTHER" label="其他"></el-table-column>
          </el-table>
        </div>
        <div style="">
          <el-table :data="census" style="width: 100%">
            <el-table-column label="教育时间" prop="EDUCATION_TIME" min-width="120">
            </el-table-column>
            <el-table-column  prop="EDUCATION_PROJECT" label="教育项目" ></el-table-column>
            <el-table-column prop="EDUCATION_OBJ" label="教育对象"></el-table-column>
            <el-table-column prop="EDUCATION_OPP" label="教育时机"></el-table-column>
            <el-table-column prop="EDUCATION_METHOD" label="教育方法"></el-table-column>
      <!--      <el-table-column prop="EDUCATION_CONTENT" label="教育内容"></el-table-column>-->
          <!--  <el-table-column prop="ASSESSER" label="教育者"></el-table-column>-->
            <el-table-column prop="EFFECT_EVALUATE" label="效果评价"></el-table-column>
            <el-table-column prop="ASSESSER" label="评价者"></el-table-column>
            <el-table-column  label="评价时间" prop="ASSESS_TIME" ></el-table-column>
            <el-table-column prop="" label="操作" width="200">
              <template slot-scope="{row}">
                <span @click="see(row)" class="ver-btn">查看</span>
               <!-- <span @click="del(row)" class="ver-btn">删除</span>-->
               <!-- <span @click="edit(row)" class="ver-btn">宣教评价</span>-->
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <assessment ref='assessment' :NAME="NAME" :INPATIENT_NUMBER="INPATIENT_NUMBER"></assessment>
      <add  ref='add' :INPATIENT_NUMBER="INPATIENT_NUMBER" ></add>
      <see  ref='see'></see>
      <edit ref='edit'></edit>
    </div>
</template>
<script>
  import assessment from './assessment'
  import add from './add'
  import see from './see'
  import edit from './edit'
    export default{
      components : { assessment ,add ,see ,edit},
      props: ['NAME','INPATIENT_NUMBER'],
      data(){
            return {
              patientAss:[],
              census:[],
              disabled:false,
            }
        },

      methods : {
        getAdd(){
          this.$refs.add.popshow = true
          this.$refs.add.addDtae()
          this.$refs.add.title = '新增宣教'
        },
        see(row){
          console.log(row)
          this.$refs.see.popshow = true
          this.$refs.see.seeDtae(row)
          this.$refs.see.title = '查看宣教'
        },
        edit(row){
          this.$refs.edit.popshow = true
          this.$refs.edit.editDtae(row)
          this.$refs.edit.title = '编辑宣教'
        },
        del(row){
          console.log(row.id)
          this.$confirm('是否确定删除该条宣教内容?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(() => {
            this._delete("datacenter/education/"+row.id,{id:row.id}, res => {
            if(res.status == 204){
            this.$message({type: 'success', message: '删除成功!'});
            this.getData()
          }
        })
        })
        },
        getAss(){
          this.$refs.assessment.popshow = true
        },
        getData(){
          this.getSer('datacenter/education', {id:this.INPATIENT_NUMBER}, (res) => {
            console.log("列表",res.data)
          this.patientAss = res.data.parent_assessment
            this.census = res.data.items
          console.log("列表2222",this.patientAss)
        })
        },
      },

      mounted(){
        this.$nextTick(()=>{
          this.getData()
        })
      },


    }
</script>
<style scoped lang='stylus'>
.out-main
  .sort-box
    .serch-btn
      padding 10px 32px !important
      background #00B3DC
      border-color #00B3DC
    .serch-btn.add
      background #11C462
      border-color #11C462
    .serch-btn.see
      background #DDEFF9
      border-color #DDEFF9
      color #00B3DC
  .el-table::before
    height: 0px;
  &>>> .el-table thead th>div
    font-size 14px
</style>
