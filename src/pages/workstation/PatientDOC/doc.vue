<template>
    <div style='display: block'>
      <docSidebar ref='docSidebar' :detile='detile'></docSidebar>
      <div class='doc-main'>
        <div class="patient-detile">
          <span class='black'>姓名：{{detile.NAME}}</span>
          <span class='black' v-if='detile.INPATIENT_NUMBER && detile.INPATIENT_NUMBER.indexOf("baby") == -1'>护理级别：{{detile.NURSING_GRADE_ID | rank }}</span>
          <span class='black'>性别：{{detile.SEX}}</span>
          <span class='black'>年龄：{{detile.AGE}}</span>
          <i class='icon' :class='"icon"+detile.NURSING_GRADE_ID' v-if='detile.INPATIENT_NUMBER.indexOf("baby") == -1'></i>
          <span class='black' v-if='detile.INPATIENT_NUMBER && detile.INPATIENT_NUMBER.indexOf("baby") == -1'>床号：{{detile.BED_NUMBER}}</span>
          <span class='gray' v-if='detile.MEDICAL_RECORD_NUM && detile.MEDICAL_RECORD_NUM.indexOf("baby") == -1'>住院号：</span>
          <span class='value' v-if='detile.MEDICAL_RECORD_NUM && detile.MEDICAL_RECORD_NUM.indexOf("baby") == -1'>{{detile.MEDICAL_RECORD_NUM}}</span>
          <span class='gray' v-if='detile.INPATIENT_NUMBER && detile.INPATIENT_NUMBER.indexOf("baby") == -1'>入院时间：</span>
          <span class='value' v-if='detile.INPATIENT_NUMBER && detile.INPATIENT_NUMBER.indexOf("baby") == -1'>{{detile.HOSPITALIZED_DATE.slice(0,10)}}</span>
          <span class='gray' v-if='detile.INPATIENT_NUMBER && detile.INPATIENT_NUMBER.indexOf("baby") == -1'>诊断：</span>
          <span class='value' v-if='detile.INPATIENT_NUMBER && detile.INPATIENT_NUMBER.indexOf("baby") == -1'>{{detile.DIAGNOSTIC_RESULTS}}</span>
          <span class='gray' v-if='detile.INPATIENT_NUMBER && detile.INPATIENT_NUMBER.indexOf("baby") == -1'>过敏史：</span>
          <span class='value' v-if='detile.INPATIENT_NUMBER && detile.INPATIENT_NUMBER.indexOf("baby") == -1'>{{detile.ALLERGYINFORMATION ? detile.ALLERGYINFORMATION : '空'}}</span>
        </div>
        <div class="doc-main-content">
          <nursingPlan  v-if='docType.TYPE == 98 && detile.INPATIENT_NUMBER' :INPATIENT_NUMBER='detile.INPATIENT_NUMBER' :INPATIENT_AREA_DATE='detile.INPATIENT_AREA_DATE'></nursingPlan>
          <thermometer :detile='detile' v-if='detile.INPATIENT_NUMBER &&  docType.TYPE == 99 ' :id='docType.ID' :title='docType.TITLE'></thermometer>
          <assessmentSheet v-if='docType.DOCTYPE == 1' :id='docType.ID' :INPATIENT_NUMBER='detile.INPATIENT_NUMBER' :docType='docType.DOCTYPE'></assessmentSheet>
          <record v-if='docType.DOCTYPE == 2' :id='docType.ID' :INPATIENT_NUMBER='detile.INPATIENT_NUMBER' :detile='detile'></record>
          <bloodSugar v-if='docType.TYPE == 96' :id='docType.ID' :INPATIENT_NUMBER='detile.INPATIENT_NUMBER' :detile='detile'></bloodSugar>
          <bloodKetone v-if='docType.TYPE == 89' :id='docType.ID' :INPATIENT_NUMBER='detile.INPATIENT_NUMBER' :detile='detile'></bloodKetone>
          <notificationBook v-if='docType.DOCTYPE == 3' :id='docType.ID' :INPATIENT_NUMBER='detile.INPATIENT_NUMBER'></notificationBook>
          <adverseEvent :MEDICAL_RECORD_NUM='detile.MEDICAL_RECORD_NUM' :NAME="detile.NAME" :BED_NUMBER="detile.BED_NUMBER"
                        :detile='detile'
                        :AGE="detile.AGE" :ID="detile.ID" :SEX="detile.SEX" :DEPARTMENT="detile.DEPARTMENT" :HOSPITALIZED_DATE="detile.HOSPITALIZED_DATE"
                        :NURSING_GRADE_ID="detile.NURSING_GRADE_ID" :DIAGNOSTIC_RESULTS="detile.DIAGNOSTIC_RESULTS"  :EDUCATIONLEVEL="detile.EDUCATIONLEVEL" v-if='docType.TYPE == 97' ></adverseEvent>
          <health v-if='docType.TYPE == 93' :NAME="detile.NAME" :INPATIENT_NUMBER='detile.INPATIENT_NUMBER'></health>
          <processMap  v-if='docType.TYPE == 95' :INPATIENT_NUMBER="detile.INPATIENT_NUMBER" :detile='detile'></processMap>
          <doctors-advice v-if='docType.TYPE == 92 && docType.ID == 999996 && detile.INPATIENT_NUMBER' :INPATIENT_NUMBER="detile.INPATIENT_NUMBER"></doctors-advice>
          <test-recode v-if='docType.TYPE == 91' :INPATIENT_NUMBER="detile.INPATIENT_NUMBER"></test-recode>
          <check-recode v-if='docType.TYPE == 90' :INPATIENT_NUMBER="detile.INPATIENT_NUMBER"></check-recode>
        </div>
      </div>
    </div>
</template>

<script>
  import docSidebar from './component/docSidebar'//文书左侧导航组件
  import nursingPlan from './component/nursingPlan/nursingPlan'//护理计划
  // import thermometer from './component/thermometer/thermometer'//体温单
  import thermometer from './component/thermometer_changde/thermometer'//体温单
  import assessmentSheet from './component/assessmentSheet/assessmentSheet'//评估单&交接单
  import record from './component/record/record'//记录单
  import bloodSugar from './component/bloodSugar/bloodSugar'//血糖单
  import bloodKetone from './component/bloodKetone/bloodKetone'//血酮单
  import adverseEvent from './component/adverseEvent'//护理不良事件报告单
  import notificationBook from './component/notificationBook'//告知书
  import health from './component/health/health'//健康宣教
  import processMap from './component/processMap/processMap'//产程图
  import clinicalData from './component/clinicalData'
  import DoctorsAdvice from "@/pages/workstation/PatientDOC/component/doctorsAdvice"//医嘱记录
  import TestRecode from "@/pages/workstation/PatientDOC/component/testRecode"//检验记录
  import CheckRecode from "@/pages/workstation/PatientDOC/component/checkRecode"//检查记录
  //医嘱
  //临床数据

  export default {
    name : "PatientDocPage",

    props : ['id'],

    components : {TestRecode, CheckRecode, DoctorsAdvice, docSidebar, thermometer, assessmentSheet, record, nursingPlan, bloodSugar ,bloodKetone, adverseEvent ,health,notificationBook ,processMap},

    data(){
      return{
        detile : {},
        docType : {},//默认医嘱记录
        currentView :'comA',
        routerList : []
      }
    },

    methods : {
      toggle(data){
        console.log("gggg",data)
        this.docType = data
      },
      getDetile(){
        this.getSer("datacenter/patient/" + this.id, {id : this.id} , res => {
          console.log('病人详情')
          console.log(res)
          if(res.status <= 400){
            this.detile = res.data
          }
        })
      },
    },

    mounted(){
      this.$nextTick(() => {
        this.routerList = this.$store.state.patientDocList
        this.getDetile()
      })
    },
  }
</script>

<style scoped lang='stylus'>
  .doc-main
    flex 1
    margin 0 20px 0 204px
  .patient-detile
    background-color #FAF8E0
    line-height 30px
    margin 20px 0 10px
    .black
      margin-left 18px
    .gray
      margin-left 18px
      color #6C8B97
  .doc-main-content
    height 100%
    background-color #FFFFFF
    box-shadow 0 0 10px 0 rgba(0,0,0,0.04)
    border-radius 4px
    min-height calc(100% - 140px)

</style>
