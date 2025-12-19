const display = document.getElementById("display");
const historyList = document.getElementById("history-list");

const modeSelect = document.getElementById("mode-select");
const calculatorButtons = document.getElementById("calculator-buttons");
const converter = document.getElementById("converter");
const roots = document.getElementById("roots");
const converterValue = document.getElementById("converter-value");
const converterType = document.getElementById("converter-type");
const converterResult = document.getElementById("converter-result");
const coefficientA = document.getElementById("coefficient-a");
const coefficientB = document.getElementById("coefficient-b");
const coefficientC = document.getElementById("coefficient-c");
const equationDegree = document.getElementById("equation-degree");
const rootResult = document.getElementById("root-result");
const calculatorTab = document.getElementById("calculator-tab");
const historyTab = document.getElementById("history-tab");
const historyPanel = document.getElementById("history-panel");
const calculator = document.getElementById("calculator");
const convertButton = document.getElementById("convert-button");
const findRootsButton = document.getElementById("find-roots-button");

let expression = "";
let history = [];
document.querySelectorAll("[data-key],[data-fn]").forEach(button=>{
  button.onclick = ()=>{
    const key = button.dataset.key;
    const functionName = button.dataset.fn;

    if(key==="="){
      calculate();
      return;
    }

    if(functionName){ applyFunction(functionName); return; }
    handleKey(key);
  };
});

function handleKey(key){
  if(key==="AC"){ expression=""; display.textContent="0"; return; }
  if(key==="±"){
    if(expression==="" || expression==="0"){
      expression="-0";
    } else {
      expression = expression.startsWith("-")?expression.slice(1):"-"+expression;
    }
  } else {
    if(expression==="" && (key==="+" || key==="*" || key==="/" || key==="%")){
      return;
    }
    const lastCharacter = expression.slice(-1);
    if((lastCharacter==="+" || lastCharacter==="-" || lastCharacter==="*" || lastCharacter==="/" || lastCharacter==="%") && 
       (key==="+" || key==="*" || key==="/" || key==="%")){
      expression = expression.slice(0, -1) + key;
    } else {
      expression+=key;
    }
  }
  display.textContent=expression || "0";
}

function applyFunction(functionName){
  const value=parseFloat(expression||0);
  if(isNaN(value)) return;
  let result=0;
  if(functionName==="sin") result=Math.sin(value*Math.PI/180);
  else if(functionName==="cos") result=Math.cos(value*Math.PI/180);
  else if(functionName==="tan") result=Math.tan(value*Math.PI/180);
  else if(functionName==="log"){
    if(value<=0){
      display.textContent="Error";
      expression="";
      return;
    }
    result=Math.log10(value);
  }
  expression=result.toString();
  display.textContent=expression;
}

function calculate(){
  if(expression==="") return;
  try{
    const safeExpression = expression.replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-");
    const result=eval(safeExpression);
    if(!isFinite(result)){
      display.textContent="Error";
      expression="";
      return;
    }
    history.push(`${expression} = ${result}`);
    historyList.innerHTML=history.length > 0 ? history.join("<br>") : "No calculations yet";
    expression=result.toString();
    display.textContent=expression;
  }catch{
    display.textContent="Error";
    expression="";
  }
}

if(modeSelect){
  modeSelect.onchange=()=>{
    if(calculatorButtons) calculatorButtons.classList.toggle("hidden",modeSelect.value!=="calc");
    if(converter) converter.classList.toggle("hidden",modeSelect.value!=="convert");
    if(roots) roots.classList.toggle("hidden",modeSelect.value!=="roots");
  };
  
  if(equationDegree){
    equationDegree.onchange=()=>{
      if(coefficientC){
        coefficientC.style.display = equationDegree.value==="1" ? "none" : "block";
      }
    };
    if(coefficientC){
      coefficientC.style.display = equationDegree.value==="1" ? "none" : "block";
    }
  }
}

function convert(){
  const value = parseFloat(converterValue.value);
  if(isNaN(value)) return;

  let result="";
  switch(converterType.value){
    case "weight": result=`${value} kg = ${value*1000} g | ${(value*2.20462).toFixed(3)} lb`; break;
    case "height": result=`${value} cm = ${(value/100).toFixed(2)} m | ${(value/30.48).toFixed(2)} ft`; break;
    case "distance": result=`${value} km = ${value*1000} m | ${(value*0.621371).toFixed(3)} mile`; break;
    case "deg2rad": result=`${value}° = ${(value*Math.PI/180).toFixed(6)} rad`; break;
    case "rad2deg": result=`${value} rad = ${(value*180/Math.PI).toFixed(2)}°`; break;
    case "time1": result=`${value} h = ${value*60} min = ${value*3600} sec`; break;
    case "time2": result=`${value} sec = ${(value/60).toFixed(2)} min = ${(value/3600).toFixed(4)} h`; break;
    case "trig":
      result=`sin(${value})=${Math.sin(value*Math.PI/180).toFixed(4)},
         cos(${value})=${Math.cos(value*Math.PI/180).toFixed(4)},
         tan(${value})=${Math.tan(value*Math.PI/180).toFixed(4)}`;
      break;
  }
  converterResult.innerHTML=result;
}

function findRoots(){
  const valueA = parseFloat(coefficientA.value);
  const valueB = parseFloat(coefficientB.value);
  const isLinear = equationDegree && equationDegree.value==="1";
  
  if(isNaN(valueA) || isNaN(valueB)){
    rootResult.innerHTML="Please enter valid numbers";
    return;
  }
  
  if(isLinear){
    if(valueA===0){
      rootResult.innerHTML="Error: 'a' cannot be zero";
      return;
    }
    rootResult.innerHTML=`Root = ${(-valueB/valueA).toFixed(4)}`;
  }else{
    const valueC = parseFloat(coefficientC.value);
    if(isNaN(valueC)){
      rootResult.innerHTML="Please enter valid numbers";
      return;
    }
    if(valueA===0){
      rootResult.innerHTML="Error: 'a' cannot be zero for quadratic equation";
      return;
    }
    const discriminant=valueB*valueB-4*valueA*valueC;
    if(discriminant<0){
      const realPart = (-valueB/(2*valueA)).toFixed(4);
      const imaginaryPart = (Math.sqrt(-discriminant)/(2*valueA)).toFixed(4);
      rootResult.innerHTML=`Roots = ${realPart} + ${imaginaryPart}i, ${realPart} - ${imaginaryPart}i`;
    } else {
      rootResult.innerHTML=
        `Roots = ${((-valueB+Math.sqrt(discriminant))/(2*valueA)).toFixed(4)}, ${((-valueB-Math.sqrt(discriminant))/(2*valueA)).toFixed(4)}`;
    }
  }
}

if(calculatorTab){
  calculatorTab.onclick=()=>{
    calculatorTab.classList.add("active");
    if(historyTab) historyTab.classList.remove("active");
    if(calculator) calculator.style.opacity = "1";
    if(historyPanel) historyPanel.style.opacity = "0.7";
  };
}

if(historyTab){
  historyTab.onclick=()=>{
    historyTab.classList.add("active");
    if(calculatorTab) calculatorTab.classList.remove("active");
    if(historyPanel) historyPanel.style.opacity = "1";
    if(calculator) calculator.style.opacity = "0.7";
  };
}

if(calculator) calculator.style.opacity = "1";
if(historyPanel) historyPanel.style.opacity = "0.7";

if(convertButton) convertButton.addEventListener("click", convert);
if(findRootsButton) findRootsButton.addEventListener("click", findRoots);
