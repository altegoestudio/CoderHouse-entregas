var arr = [];
var err =  false;

var argv = process.argv
for (var i = 2; i < argv.length; i++) {
  typeof argv[i] == "string"?err = true:null
  arr.push(argv[i]);
}

err?show():fail();

function show(){
  var dta = {
    data: {
      numeros: arr,
      promedio: arr.reduce(function(ac , sig){
        return ac + sig;
      }),
      max: Math.max(...arr),
      min: Math.min(...arr),
      ejecutable: process.execPath,
      pid: process.pid

    }
  }
  console.log(dta);
}

function fail(){
  console.log("error");
}
var arr = [1,2,3,4];
arr.reduce((a,b)=>a+b);
