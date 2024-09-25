<template>
  <div>
    c
    <div id="bee-plugin-container" class="BeePluginContainer"></div>


  </div>

</template>

<script>
import BeePluginService from "@/services/BeeService";
import { beeConfig, conf } from "@/config/beeConfig";

export default {
  data() {
    return {
      beeInstance:null,
      isInPreview:false,
      isInStructure:false,
    }
  },

   async mounted() {
     await this.initializeBeePlugin();


  },


  methods: {


    save(){
      this.beeInstance.save();
      console.log("Saved content:", this.beeInstance);

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

    initializeBeePlugin() {
      BeePluginService.initialize(conf, beeConfig)
          .then(instance => {
            this.beeInstance=instance;
            console.log("promise resolve return instance", instance);
          })
          .catch(error => {
            console.error("error during initialization --> ", error);
          });
    }
  }
};
</script>

<style>


</style>