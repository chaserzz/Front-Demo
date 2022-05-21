/**
 * @param {string} start
 * @param {string} end
 * @param {string[]} bank
 * @return {number}
 */
 const CHARS = ["A", "C", "G", "T"]
 var minMutation = function(start, end, bank) {
     const bankSet = new Set(bank), queue = new Queue()
     queue.enqueue([start, 0])
     // 当队列中还有数组?
     while(queue.size() > 0) {
         const cur = queue.dequeue() // 第一个出队的字符串
         for(let i = 0; i < cur[0].length; i++) {
             for(const nxtChar of CHARS) {
                 if(cur[0].charCodeAt(i) != nxtChar.charCodeAt(0)) {
                     const nxt = cur[0].substring(0, i) + nxtChar + cur[0].substring(i + 1) // 将字符串组合在一起
                     if(bankSet.has(nxt)) {
                         if(nxt === end)
                             return cur[1] + 1
                         bankSet.delete(nxt)
                         queue.enqueue([nxt, cur[1] + 1])
                     }
                 }
             }
         }
     }
     return -1
 };