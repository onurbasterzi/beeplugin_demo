// src/services/BeePluginService.js

import BeePlugin from "@mailupinc/bee-plugin";

class BeePluginService {
    constructor() {
        this.beePluginInstance = null;
    }

    initialize(conf, config) {
        this.beePluginInstance = new BeePlugin();
        console.log("conffff",config)

        console.log('templateId',config.templateId);
        return this.beePluginInstance
            .getToken(
                process.env.VUE_APP_BEE_CLIENT_ID,
                process.env.VUE_APP_BEE_CLIENT_SECRET,
                conf
            )
            .then(() => fetch(new Request(`http://localhost:3001/templates/${config.templateId.toString()}`, { method: "GET" })))
            .then(res => res.json())
            .then(template => {
                if(config.templateId!==0){
                    return this.beePluginInstance.start(config, JSON.parse(template.content), "", { shared: false });
                }
                return this.beePluginInstance.start(config, {}, "", { shared: false });

            })
            .catch(error => {
                console.error("error during initialization --> ", error);
                throw error;
            });
    }

    getInstance() {
        return this.beePluginInstance;
    }
}

export default new BeePluginService();
