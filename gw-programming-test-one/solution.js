const prompt = require("prompt-sync")();

function isAnagram(a, b)
{
     
        if (a.length != b.length) {
            return false;
        }
        let map = new Map();
        for (let i = 0; i < a.length; i++) {
            if (map.has(a[i])) {
                map.set(a[i],
                        map.get(a[i]) + 1);
            }
            else {
                map.set(a[i], 1);
            }
        }
        for (let i = 0; i < b.length; i++) {
            if (map.has(b[i])) {
                map.set(b[i],map.get(b[i]) - 1);
            }
        }
        let keys = map.keys();
        for (let key of keys) {
            if (map.get(key) != 0) {
                return false;
            }
        }
        return true;
    }
 

console.log('Check anagrams of each other ');

var str1 = prompt("Please enter first string  : ");
var str2 = prompt("Please enter second string : ");
 
if (isAnagram(str1, str2)){
    console.log('True');
    } else {
    console.log('False');
    }
    
