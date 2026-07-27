const flowerArea = document.getElementById("flowerArea");

function addFlower(icon){

const flower=document.createElement("div");

flower.className="flower";

flower.innerHTML=icon;

flower.style.left=Math.random()*380+50+"px";

flower.style.top=Math.random()*250+50+"px";

flowerArea.appendChild(flower);

dragElement(flower);

flower.ondblclick=()=>{
flower.remove();
}

}

function changeWrapper(){

const color=document.getElementById("wrapperSelect").value;

document.getElementById("wrapper").style.background=color;

}

function updateLetter(){

const text=document.getElementById("letterInput").value;

document.getElementById("letterCard").innerText=text || "Your message...";

}

function dragElement(el){

let pos1=0,pos2=0,pos3=0,pos4=0;

el.onmousedown=dragMouseDown;

function dragMouseDown(e){

e.preventDefault();

pos3=e.clientX;

pos4=e.clientY;

document.onmouseup=closeDrag;

document.onmousemove=drag;
}

function drag(e){

e.preventDefault();

pos1=pos3-e.clientX;

pos2=pos4-e.clientY;

pos3=e.clientX;

pos4=e.clientY;

el.style.top=(el.offsetTop-pos2)+"px";

el.style.left=(el.offsetLeft-pos1)+"px";

}

function closeDrag(){

document.onmouseup=null;

document.onmousemove=null;

}

}