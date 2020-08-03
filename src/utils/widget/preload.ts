export default class PreLoad {
    private i: number;
    private arr: string[];
    constructor(arr: string[]) {
        this.i = 0
        this.arr = arr
    }
    public imgs(cb: (n: number) => void) {
        return new Promise(resolve => {
            const work = (src: string) => {
                if (this.i < this.arr.length) {
                    const img = new Image()
                    img.src = src;
                    cb(((this.i + 1) / this.arr.length) * 100) // 进度反馈
                    if (img.complete) {
                        work(this.arr[this.i++])
                    } else {
                        img.onload = () => {
                            work(this.arr[this.i++])
                            img.onload = null;
                        };
                    }
                } else {
                    resolve()
                }
            }
            work(this.arr[this.i])
        })
    }
}
