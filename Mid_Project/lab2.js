//synchronous 
console.log("step 1");
console.log("step 2");
Asynchronous 
console.log("Step 1 ");
setTimeout(() => {
    console.log("step 2");// this will conduct later because of the callback function
}, 2000);
console.log("step 3");
//promise
console.log("start");

const prom=new Promise((resolve, reject)=>{
    setTimeout(() => {
        resolve("Promise")
    }, 2000);
});
prom.then(result=>{
    console.log(result);
});
console.log("End");
// await 
function hello(){
    return new Promise(resolve => {
        setTimeout(()=>{
            resolve("Hello, World");
        },2000);
    });
}
async function greet(){
    console.log("waiting");
    let message = await hello();
    console.log(message);
}
greet();