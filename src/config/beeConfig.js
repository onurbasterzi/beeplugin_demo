export const beeConfig = {
    uid: "test1-clientside",
    container: "bee-plugin-container",
    username: "Test User",
    userColor: "#00aba5",
    commenting: true,
    userHandle: "2468",
    autosave: 15,
    language: "en-US",
    templateId:0,
    specialLinks: [
        {
            type: "unsubscribe",
            label: "SpecialLink.Unsubscribe",
            link: "http://[unsubscribe]/"
        },
        {
            type: "subscribe",
            label: "SpecialLink.Subscribe",
            link: "http://[subscribe]/"
        }
    ],
    mergeTags: [
        {
            name: "tag 1",
            value: "[tag1]"
        },
        {
            name: "tag 2",
            value: "[tag2]"
        }
    ],
    mergeContents: [
        {
            name: "content 1",
            value: "[content1]"
        },
        {
            name: "content 2",
            value: "[content2]"
        },
        {
            name: "content 3",
            value: "[content3]"
        }
    ],
    contentDialog: {
        filePicker: {
            label: "Picker",
            handler: (resolve, reject) => {
                const sample = {
                    url: "https://d1oco4z2z1fhwp.cloudfront.net/templates/default/113/rocket-color.png"
                };
                const data = prompt("Enter image path:", JSON.stringify(sample));
                return data == null || data === "" ? reject() : resolve(JSON.parse(data));
            }
        }
    },
    onSave: (_, htmlFile) => {console.log("newsletter-template.html", htmlFile)},
    onLoad: () => console.warn("*** [integration] loading a new template..."),
    onSaveAsTemplate: (json) => console.log("newsletter-template.json", json),

    // eslint-disable-next-line no-unused-vars
    onAutoSave: (jsonFile) => {
        console.log('auto save triggered')
        //console.log(`${new Date().toISOString()} autosaving...,`, jsonFile);
    },
    onSend: (htmlFile) => console.log("onSend", htmlFile),
    onError: (errorMessage) => console.log("onError ", errorMessage),
    onChange: (msg, response) => console.warn("*** [integration] (OnChange) message --> ", msg, response),
    onWarning: (e) => console.warn("*** [integration] (OnWarning) message --> ", e.message),
    onPreview: () => console.warn("*** [integration] --> (onPreview) "),
    onTogglePreview: () => console.warn("*** [integration] --> (onTogglePreview) "),
    onSessionStarted: (sessionInfo) => {
        console.warn("*** [integration] --> (onSessionStarted) ", sessionInfo);
        prompt("press ctrl+c to copy the session ID", sessionInfo.sessionId);
    },
    onSessionChange: (sessionInfo) => console.warn("*** [integration] --> (onSessionChange) ", sessionInfo)
};

export const conf = {
    authUrl: "https://auth.getbee.io/apiauth",
    beePluginUrl: "https://app-rsrc.getbee.io/plugin/BeePlugin.js"
};