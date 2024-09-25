<template>
  <div>
    <ul>
      <div >Templates: </div>
      <button  class="btn pointer" @click="setSelectedTemplate({id:0,title:''})">Create New</button>
      <li class="pointer" @click="setSelectedTemplate(template)" v-for="template in templates" :key="template.id">
        {{ template.title }}
      </li>

    </ul>
    <div class="btn-list">
      <input type="text" v-model="title" placeholder="Title">
      <button class="btn pointer" @click="onCustomSave">Save</button>
      <button class="btn pointer" @click="preview">
        <span v-if="!isInPreview">Preview Mode</span>
        <span v-else>Editor Mode</span>
      </button>
      <button class="btn pointer" @click="structure">
        <span v-if="!isInStructure">Show Structure</span>
        <span v-else>Hide Structure</span>
      </button>
    </div>
    <div id="bee-plugin-container" style="height: 800px" class="BeePluginContainer"></div>
  </div>


</template>

<script>
import BeePluginService from "@/services/BeeService";
import { beeConfig, conf } from "@/config/beeConfig";
import {createTemplate, getTemplates, updateTemplate} from "@/services/api";

export default {
  name: "BeePluginStarter",
  mounted() {
    this.setTemplates();
    this.initializeBeePlugin();
  },
  data() {
    return {
      templateId:0,
      templates:[],
      title:'',
      beeInstance:null,
      isInPreview:false,
      isInStructure:false,

    }
  },
  methods: {

    initializeBeePlugin() {
      BeePluginService.initialize(conf, this.getBeeConfig())
          .then(instance => {
            this.beeInstance=instance;
            console.log("BeePlugin instance initialized:", instance);
          })
          .catch(error => {
            console.error("Error during initialization:", error);
          });
    },

    setTemplates(){
      this.templates= getTemplates().then(res=>{
        this.templates=res.data;
      })
    },

    setSelectedTemplate(payload){
      this.title=payload.title;
      this.templateId=payload.id;
      this.reloadBeePlugin()
    },

    reloadBeePlugin() {
      this.beeInstance=null;
      this.initializeBeePlugin()
    },


    getBeeConfig() {
      return {
        ...beeConfig,
        templateId:this.templateId,
        onSave: this.onSave,
        onAutoSave: this.onAutoSave,
        onSend: this.onSend,
      };
    },
    // eslint-disable-next-line no-unused-vars
    async onSave(_, htmlFile) {

     if(this.templateId===0){
       createTemplate({
         title: this.title,
         content: JSON.stringify(_)
       }).then(res=>{
         this.setTemplates();
         console.log(res.data)
       }).catch(err=>{
         console.log('error',err)
       })
     }
     else {
       updateTemplate(this.templateId,{
         title: this.title,
         content: JSON.stringify(_)
       }).then(res=>{
         console.log(res.data)
       }).catch(err=>{
         console.log('error',err)
       })
     }



    },
    onAutoSave(jsonFile) {
      console.log("Handling autosave:", jsonFile);
    },
    onSend(htmlFile) {
      console.log("Handling send:", htmlFile);
    },

    preview(){
      this.beeInstance.togglePreview();
      console.log("instance",this.beeInstance);
      this.isInPreview=!this.isInPreview

    },

    structure(){
      this.beeInstance.toggleStructure();
      this.isInStructure=!this.isInStructure
    },

    onCustomSave(){
      this.beeInstance.save();
    }
  },


};
</script>

<style scoped>
.BeePluginContainer {
}
</style>