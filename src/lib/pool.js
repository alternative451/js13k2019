class Pool {
    constructor(classLink, poolSize) {
        this.pool = new Array(poolSize)
        this.lastAwakeIndex = 0
        for(let i = 0; i < poolSize; i++){
            let instance = classLink.constructor()
            instance.sleep = this.sleep(i) /* let's go curry */
            instance.sleep = this.wake(i)
            this.pool[i] = instance
        }
    }


    give() {
        if(this.lastAwakeIndex === this.pool.length) {
            throw "pool size exeeded"
        }
        this.lastAwakeIndex+=1
        return this.pool[this.lastAwakeIndex]
    }

    wake(i) {
       return () => {

       }
    }

    sleep(i) {
        return () => {
            
        }
    }
}
