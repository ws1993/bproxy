import"./root/root-legacy.js";import*as RootModule from"./root/root.js";let appStartedPromiseCallback;self.Runtime=self.Runtime||{},Runtime=Runtime||{},self.Runtime.cachedResources={__proto__:null},self.Root=self.Root||{},Root=Root||{},Root.allDescriptors=Root.allDescriptors||[],Root.applicationDescriptor=Root.applicationDescriptor||void 0,Runtime.appStarted=new Promise(o=>appStartedPromiseCallback=o);export async function startApplication(o){console.timeStamp("Root.Runtime.startApplication");const t={};for(let o=0;o<Root.allDescriptors.length;++o){const e=Root.allDescriptors[o];t[e.name]=e}if(!Root.applicationDescriptor){let t=await RootModule.Runtime.loadResourcePromise(o+".json");Root.applicationDescriptor=JSON.parse(t);let e=Root.applicationDescriptor;for(;e.extends;)t=await RootModule.Runtime.loadResourcePromise(e.extends+".json"),e=JSON.parse(t),Root.applicationDescriptor.modules=e.modules.concat(Root.applicationDescriptor.modules)}const e=Root.applicationDescriptor.modules,r=[],s=[];for(let o=0;o<e.length;++o){const i=e[o],a=i.name,l=t[a];l?r.push(Promise.resolve(l)):r.push(RootModule.Runtime.loadResourcePromise(a+"/module.json").then(JSON.parse.bind(JSON))),"autostart"===i.type&&s.push(a)}const i=await Promise.all(r);for(let o=0;o<i.length;++o)i[o].name=e[o].name,i[o].condition=e[o].condition,i[o].remote="remote"===e[o].type;self.runtime=RootModule.Runtime.Runtime.instance({forceNew:!0,moduleDescriptors:i}),s&&await self.runtime.loadAutoStartModules(s),appStartedPromiseCallback()}export async function startWorker(o){return startApplication(o).then((function(){self.postMessage("workerReady")}))}