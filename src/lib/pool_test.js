import {Pool} from "./pool"

class Cat {
    meow() {
        return "meow"
    }
}

const cats = new Pool(Cat, 4)

for(let i = 0 ; i < cats.lastAwakeIndex; i ++) {
    console.log(cats.meow)
}

let cat = cats.give()
cat.sleep()