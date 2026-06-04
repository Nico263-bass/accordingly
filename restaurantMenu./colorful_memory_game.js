const list=["&#128512;","&#128513;","&#128514;","&#128590;","&#128122;","&#128663;","&#128512;","&#128513;","&#128514;","&#128590;","&#128122;","&#128663;"];
/************************************************ */
const divMain=document.querySelector('.main');
      list.forEach(element=>{
            const divImg=document.createElement('div');
                  divImg.classList.add('img');
                  divMain.appendChild(divImg);
            const spanSmile= document.createElement('span');
                  spanSmile.classList.add('smile');    
                  divImg.appendChild(spanSmile);
                  spanSmile.innerHTML=element;
})
//Algo de Fisher-Yates pour le tirage aléatoire des cartes
function fishY(tabArray){
    for (let i =tabArray.length-1; i>0; i--) {
            const j=Math.floor(Math.random()*(1+i));
            [tabArray[i],tabArray[j]]=[tabArray[j],tabArray[i]];
    }
    return tabArray;
}
/**********Application de l'Algo de fisher Yates **************/
// const btnStart=document.querySelector('#btnStart');
const btnStart=document.querySelector('#btnStart');
               btnStart.addEventListener('click',()=>{
               const newList=fishY([...list]);
               const spanSmile= document.querySelectorAll('.smile');
               spanSmile.forEach((element,index)=>{
               element.innerHTML=newList[index];
       })    
 });
 const spanTime=document.querySelector('#time');    
       time.textContent='';
       btnStart.addEventListener('click',()=>{
         let    time=20;
         const  compteur=setInterval(()=>{ 
                time--;
                spanTime.textContent=time;
                if (time===0){
                    clearInterval(compteur);
                    alert('Temps épuisé!');
                    spanTime.textContent='';
                }
            },1000)
       })
    
           

















































/* Fonction Asynchrone pour empếcher que le compteur à nouveau pendant qu'il est déjà en marhce 
async function startGame(){ 
    try {
        const messageSioui = await new Promise((resolve, reject) => {
            resolve(() => {
                let time = 60;
                const timing = setInterval(() => {
                    time--;
                    let chrono = document.querySelector('#time');
                    chrono.textContent = `${time}s`;
                    if (time === 0) {
                        clearInterval(timing);
                        alert('Fin de la partie');
                        chrono.textContent = '60s';
                    }
                    const btnEnd = document.querySelector('#btnEnd');
                    btnEnd.addEventListener('click', () => {
                        clearInterval(timing);
                        chrono.textContent = '60s';
                        btnStart.removeEventListener('click');
                    });
                }, 1000);
            });
            reject(`Une erreur s'est produite!`);
          }
    )}catch (messageSinon) {
        console.log(`échec de l'opération ${messageSinon}`);
    }
/****************Fonction chrono du jeu et start game****************

let compteurEncours=false;
    btnStart.addEventListener('click',async () => {
        if (compteurEncours){
            return
        }
        compteurEncours=true;
        await startGame();
        compteurEncours=false;
    })
}*/

