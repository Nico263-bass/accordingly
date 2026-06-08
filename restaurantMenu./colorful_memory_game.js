const list=["&#128512;","&#128513;","&#128514;","&#128590;","&#128122;"
    ,"&#128663;","&#128512;","&#128513;","&#128514;","&#128590;",
    "&#128122;","&#128663;"];
/************************************************ */
const divMain=document.querySelector('.main');
list.forEach(element=>{
const divImg=document.createElement('div');
      divImg.classList.add('img');
      divImg.classList.add('overlayCards');
      divMain.appendChild(divImg);
const spanSmile= document.createElement('span');
      spanSmile.classList.add('smile');
      divImg.appendChild(spanSmile);
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
// Function exécutant le compteur et l'algorithme de Fishr-Yates
const divImg=document.querySelector('.img');
function compteurAndFy(){
return new Promise ((resolve)=>{       
const    newList=fishY([...list]);
/* le melange des cartes se fait à ce niveau */
const    spanSmile= document.querySelectorAll('.smile');
         spanSmile.forEach((element,index)=>{
         element.innerHTML=newList[index]
        })    
const    spanTime=document.querySelector('#time');    
         spanTime.textContent='';
let      time=10;
const    compteur=setInterval(()=>{
         time--;
         spanTime.textContent=time;
         if (time===0){
            clearInterval(compteur);
            spanTime.textContent='Temps épuisé!'; 
            const divImg=document.querySelector('.img');
            divImg.classList.remove('overlayCards');
            resolve(()=>{compteurEncours=false;}
            
        );  
        } },1000); 
    })
}
const btnStart=document.querySelector('#btnStart');
let compteurEncours=false; 
const asyncCompteur=async()=>{
   try {
           if(compteurEncours){
               return
           }
           else{
                 compteurEncours=true;
                 const attente=await compteurAndFy();
                 attente();
       }
   } catch (error) {
       console.error(`Une erreur s'est produite ${error}`)
   }
}
btnStart.addEventListener('click',asyncCompteur);


/*  const divImg=document.querySelector('.img');
       divImg.forEach(element=>{
       element.classList.add('overlayCards')});  */