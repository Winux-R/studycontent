class  Mypromise{
    constructor(excutor){
        this.state = "pending";
        this.fulfilledEvent = [];
        this.rejectedEvent = [];
        this.value = undefined;
        let  resolve =result=>{
            if(this.state!=="pending")return;
            this.state = "fulfilled";
            this.value  = result;
            setTimeout(()=>{
                this.fulfilledEvent.forEach(item=>{
                    if(typeof item==="function"){
                        item(this.value);
                    }
                })
            },0);
        };
        let reject =(reason)=>{
            if(this.state!=="pending")return;
            this.state = "rejected";
            this.value = reason;
            let timer = setTimeout(()=>{
                clearTimeout(timer);
                this.rejectedEvent.forEach(item=>{
                    if(typeof item==="function"){
                        item(this.value);
                    }
                });
            },0)
        };
        try{
            excutor(resolve,reject);
        }catch (err){
            console.log(err);
            reject(err);
        }
    }
    then(resolveFn,rejectFn){
      if(resolveFn==undefined){
        resolveFn = result =>{
          return result;
        }
      }
      if(rejectFn==undefined){
         rejectFn = reason =>{
           return reason;
         }
      }
      return new Mypromise((resolve,rejetct)=>{
        this.fulfilledEvent.push(result=>{
          try{
              let x = resolveFn(result);
              x instanceof Mypromise?x.then(resolve,reject) : resolve(result);
          }catch(err){
              reject(err);
          }
        });
        this.rejectedEvent.push(reason=>{
          try{
              let x = rejectFn(reason);
              x instanceof Mypromise?x.then(resolve,reject) : resolve(reason);
          }catch(err){
              reject(err)
          }
        });
      })
    }
}
new  Mypromise((resolve,reject)=>{
    console.log(1);
    reject();
}).then(function (data) {
    console.log(2);
},function (data) {
    console.log(3);
});
console.log(6);
