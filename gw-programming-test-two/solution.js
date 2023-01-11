const prompt = require("prompt-sync")();
function firstRepeating(str){

    let h = new Set();

    for(let i = 0; i <= str.length - 1; i++)
    {
        let c = str[i];
 
        if (h.has(c)){
            return c;
        }

        else{
            h.add(c);
        }
    }
    return '';
}
 

console.log('Check character of the string that is repeated');

var str = prompt("Please enter something : ");

console.log(firstRepeating(str));

 
