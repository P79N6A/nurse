<template>
  <div>
    <mainTab :vitalList="vitalList1" :tempss="tempss" :page="page" :dynamicName="dynamicName" :dynamic="dynamic"></mainTab>
  </div>
</template>
<script>
  import mainTab from '../../component/mainTab'

  export default{
    data(){
      return {
        vitalList1 : ["评估单模板" , "记录单模板" , "交接单模板" , "告知单" , "手术"],
        tempss : ['assessTPL' , 'recordTPL' , 'handoverTPL','informTPL','opsTPL'],
        page : 'documentAdmin/docTemplateAdmin',
        dynamic : [],
        dynamicName  : [],
      }
    },
    methods:{
      toggle(index){
        this.dynamic.splice(index, 1)
        this.dynamicName.splice(index, 1)
        window.sessionStorage.AddTPLAdmin = JSON.stringify({ dynamic : this.dynamic , dynamicName : this.dynamicName })
        this.$nextTick(() => {
          if(this.dynamic.length!=0){
            this.$router.go(-1)
          }else{
            this.$router.push('/managePlatform/documentAdmin/docTemplateAdmin/assessTPL')
          }
        })

      },
      addDynamic(){
        console.log(this.vitalList1.length)
        if(this.dynamic.length <= 1 && this.dynamic[0] != 'addTemplate'){
          console.log('新增');
          this.dynamic.push('addTemplate')
          this.dynamicName.push('新增模板')
          window.sessionStorage.AddTPLAdmin = JSON.stringify({ dynamic : this.dynamic , dynamicName : this.dynamicName })
        }
        this.$router.push('/managePlatform/documentAdmin/docTemplateAdmin/addTemplate')
      },
      edit(id){
        if(this.dynamic.length <= 1 && this.dynamicName[0] !='编辑模板'){
          this.dynamic.push('editTemplate/'+id)
          this.dynamicName.push('编辑模板')
          window.sessionStorage.AddTPLAdmin = JSON.stringify({ dynamic : this.dynamic , dynamicName : this.dynamicName })
        }
        this.$router.push('/managePlatform/documentAdmin/docTemplateAdmin/editTemplate/' + id)
      },
    },
    mounted(){
      console.log(this.$router);
/*      if(window.sessionStorage.AddTPLAdmin){
        var AddTPLAdmin = JSON.parse(window.sessionStorage.AddTPLAdmin)
        this.dynamic = AddTPLAdmin.dynamic
        this.dynamicName = AddTPLAdmin.dynamicName
      }*/


    },
    components : { mainTab }
  }
</script>
<style scoped>

</style>
