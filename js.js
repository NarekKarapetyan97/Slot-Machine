const rol1=document.getElementById("rol1");
const rol2=document.getElementById("rol2");
const rol3=document.getElementById("rol3");
const name_div=document.getElementById("name_div");

function getRandomInt(min, max){
    const r = Math.random()*(max-min) + min
    return Math.floor(r)
}

const values=[
    {val:10,img:'😢'},
    {val:20,img:'🤣'},
    {val:30,img:'🌹'},
    {val:40,img:'💋'},
    {val:50,img:'🤳'},
    {val:10,img:'🧶'},
    {val:20,img:'💖'},
    {val:30,img:'🎶'},
    {val:0,img:'🎁'},
    {val:0,img:'🎨'},
    {val:0,img:'🎗'},
    {val:0,img:'🎍'},
]

const lastWin=[0,0,0];
const lastWinImg=['','',''];

let lastWinSum = [];
let lastWinImgSum = [];
let userName="";

if(window.location.hash!==""){
    userName=window.location.hash.split('#')[1];
    getDb()
}
else{
    name_div.style.display="flex";
}


const getName=()=>{
    userName=document.getElementById("name").value;
    name_div.style.display="none";
}

const reducer = (acc, curr) => acc + curr;

const lastValueSumAppend = ()=>{
    const currentWin = lastWin.reduce(reducer)
    lastWinSum.push(currentWin)
    SumPrint()
}

// const pushLastKey=()=>{
//     console.log(lastWinImg)
//     console.log(lastWinImgSum)
//     lastWinImgSum.push(lastWinImg);
//     console.log(lastWinImgSum)
// }

const SumPrint =()=>{
    const showLastWin =  document.getElementById("last_win_num")
    showLastWin.innerHTML="";
    for(let i=0; i<lastWinSum.length; i++){
        let lastWinSumDiv = document.createElement('div')
        if(lastWinSum[i]>=70){
            lastWinSumDiv.innerHTML = lastWinSum[i]+'-Win'+' ';
            lastWinSumDiv.setAttribute("class", 'last_win')
        }
        else{
            lastWinSumDiv.innerHTML = lastWinSum[i]+'-Loose'+' ';
            lastWinSumDiv.setAttribute("class", 'last_loos')
        } 
        showLastWin.append(lastWinSumDiv);
    }
}

const totalWinAppend = () =>{
   if(lastWinSum.length == 0 || lastWinSum === undefined){
       return
   }else{
        let totalOn=0;
        for(let i=0; i<lastWinSum.length; i++){
            if(lastWinSum[i]>=70){
                totalOn=totalOn+lastWinSum[i];
            }
        }
        const showTotalWin = document.getElementById("total_win")
        showTotalWin.innerHTML = totalOn
   }
}

const start=()=>{
    let set=setInterval(() => {
        let variant1=getRandomInt(0,values.length-1);
        let variant2=getRandomInt(0,values.length-1);
        let variant3=getRandomInt(0,values.length-1);
        lastWin[0]=values[variant1].val;
        lastWin[1]=values[variant2].val;
        lastWin[2]=values[variant3].val;
        lastWinImg[0]=variant1;
        lastWinImg[1]=variant2;
        lastWinImg[2]=variant3;
        rol1.innerHTML=values[variant1].img;
        rol2.innerHTML=values[variant2].img;
        rol3.innerHTML=values[variant3].img;
    }, 300);

    const startTime1=getRandomInt(100,500);
    const startTime2=getRandomInt(100,500);
    const startTime3=getRandomInt(100,500);
    const stopInterval=getRandomInt(2000,2500);
    
    setTimeout(()=>rol1.classList.add('rotet_active'),startTime1)
    setTimeout(()=>rol2.classList.add('rotet_active'),startTime2)
    setTimeout(()=>rol3.classList.add('rotet_active'),startTime3)

    setTimeout(()=>{
        rol1.classList.remove('rotet_active');
        rol2.classList.remove('rotet_active');
        rol3.classList.remove('rotet_active');
        clearInterval(set);
        lastValueSumAppend();
        // pushLastKey()
        totalWinAppend()
        sendDb();
    },stopInterval)
}

const sendDb=()=>{
    let body={
        lastWinSum:JSON.stringify(lastWinSum),
        lastWinImgSum:JSON.stringify(lastWinImgSum),
        name:userName
    }
    fetch('http://localhost:4000/set-array',{
        method:'POST',
        headers:{
            'content-type':'application/json',
        },
        body:JSON.stringify(body)
    })
    .then(resp=>{return resp.json()})
    .then(data=>{
        console.log(data)
    })
}

function getDb(){
    fetch('http://localhost:4000/get-array',{
        method:'POST',
        headers:{
            'content-type':'application/json',
        },
        body:JSON.stringify({name:userName})
    })
    .then(resp=>{return resp.json()})
    .then(data=>{
        console.log(data);
        lastWinSum=JSON.parse(data.data.last_win_sum);
        SumPrint()
        totalWinAppend()
        //lastWinImgSum=JSON.parse(data.data.last_win_img_sum);
    })
}













