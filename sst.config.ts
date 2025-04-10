export default {
 async config() {
   const { createApp } = await import("sst");
   return createApp({
     name: "florin",
     region: "us-east-1",
     stacks: [
       async () => {
         const { createStack, StaticSite } = await import("sst");
         return createStack((stack) => {
           const site = new StaticSite(stack, "FlorinWeb", {
             path: ".",
             buildCommand: "npm run build",
             buildOutput: "dist",
             errorPage: "index.html",
           });

           stack.addOutputs({
             URL: site.url,
           });
         });
       },
     ],
   });
 },
};
