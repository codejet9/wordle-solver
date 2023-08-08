class maxHeap {
  constructor() {
    this.arr = [];
  }

  push(val) {
    //val -> [entropy, word, probability]
    this.arr.push(val);
    this.heapify();
  }

  pop() {
    let last = this.arr.pop();

    if (this.arr.length === 0) {
      return last;
    }

    let first = this.arr[0];
    this.arr[0] = last;

    let n = this.arr.length;

    let i = 0;
    while (i < n) {
      let left = -1;
      let right = -1;
      let cur = this.arr[i];

      if (2*i + 1 >= n) break;

      left = this.arr[2*i + 1];

      if (2*i + 2<n) right = this.arr[2*i + 2];

      if (right !== -1) {
        if (left[0] > right[0]) {
          if (left[0] > cur[0]) {
            this.arr[i] = left;
            this.arr[2*i + 1] = cur;

            i = 2*i + 1;
          }
          else break;
        }
        else {
          if (right[0] > cur[0]) {
            this.arr[i] = right;
            this.arr[2*i + 2] = cur;

            i = 2*i + 2;
          }
          else break;
        }
      }
      else {
        // only left
        if (left[0] > cur[0]) {
          this.arr[i] = left;
          this.arr[2*i + 1] = cur;

          i = 2*i + 1;
        }
        else break;
      }
    }

    return first;
  }

  size() {
    return this.arr.length;
  }

  show(){
    var str = '';
    this.arr.forEach(element => {
      str+=JSON.stringify(element)
    });
    console.log(str)
  }

  empty() {
    return (this.arr.length === 0);
  }

  heapify() {
    let n = this.arr.length;
    let i = n - 1;
    while (i > 0) {
      let par = Math.floor((i - 1) / 2);
      if (this.arr[i][0] > this.arr[par][0]) {
        let temp = this.arr[par];
        this.arr[par] = this.arr[i];
        this.arr[i] = temp;

        i = par;
      }
      else {
        break;
      }
    }
  }
}

export default maxHeap;