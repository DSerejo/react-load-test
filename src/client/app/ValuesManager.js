'use strict';

class ValuesManager{
    constructor(numValues,eachStepValues,step,cb){
        this.numValues = numValues;
        this.eachStepValues = eachStepValues;
        this.step = step;
        this.cb = cb;
        this.startValues();
        this.scheduleUpdate()
    }
    startValues(){
        this.values = [];
        for(var i=0;i<this.numValues;i++)
            this.values.push(ValuesManager.randomValue())
    }
    scheduleUpdate(){
        this.interval = setInterval(this.update.bind(this),this.step);
    }
    update(){
        const indexesToUpdate = this.getIndexesToUpdate();
        for(var i = 0;i<indexesToUpdate.length;i++){
            this.values[indexesToUpdate[i]]=ValuesManager.randomValue();
        }
        this.cb && this.cb();
    }
    getIndexesToUpdate(){
        let arr,i,n=this.eachStepValues;
        for(arr=[],i=0;i<this.numValues;arr.push(i++)){}
        return ValuesManager.getRandomValuesFromArray(arr,n);
    }
    static getRandomValuesFromArray(arr,n){
        var result = new Array(n),
            len = arr.length,
            taken = new Array(len);
        if (n > len)
            throw new RangeError("getRandom: more elements taken than available");
        while (n--) {
            var x = Math.floor(Math.random() * len);
            result[n] = arr[x in taken ? taken[x] : x];
            taken[x] = --len;
        }
        return result;
    }
    static randomValue(){
        return Math.round(Math.random()*100)
    }
    stop(){
        clearInterval(this.interval);
    }

}
export default  ValuesManager;