(()=>{
// 80 - days

// Get the current date
let currentDate = new Date();

// Loop to print the day of the week for the next 80 days
let taken = false
let curDate = new Date("2024-03-06");
let total = 0
let dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

for (let i = 0; i < 280; i++) {
    let dayOfWeek = curDate.getDay();
    const theDate = curDate.toISOString().substring(0,10)
   	if( Math.random() * 100 <= 23){ // charge
    	if(dayOfWeek==1 && taken)continue;
      let hr = 0
      if(dayOfWeek<=1){
      	hr = parseInt(4+Math.random()*3)	
      }
      else{
      	hr = parseInt(8+Math.random()*2)
      }
      console.log(theDate + " " + dayNames[dayOfWeek] + " " + hr)
      total+=hr
      if(dayOfWeek==0){
      	taken = true;
      }else{
      	taken = false
      }
    }
    else{
        console.log(theDate + " " + dayNames[dayOfWeek] + " 8"  )
    }
    curDate = new Date(curDate.getTime() + (24 * 60 * 60 * 1000));
}
console.log("total",total)
})()