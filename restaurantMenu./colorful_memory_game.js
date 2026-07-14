const list = ["&#128512;", "&#128513;", "&#128514;", "&#128590;", "&#128122;"
    , "&#128663;", "&#128512;", "&#128513;", "&#128514;", "&#128590;",
    "&#128122;", "&#128663;"];
/* -------------------------------------------Variables simples--------------------------------- */
let premiereCarteRetournee=null;
let deuxiemeCarteRetounee=null;
let etatdeJeu = 'startingParty'; /* startingParty, jeuEncours, finDelaPartie */
let handlers = []; /* variable qui va contenir chaque copie de l'eventListner de DivImg */
// let verrou=false;
let pairesRetrouvee=[];
/*_________________________________________________________________________________________________*/

/*------------------------------------Variables Fonctions---------------------------------------*/
//Algo de Fisher-Yates pour le mélange aléatoire des cartes 
function fishY(tabArray) { 
    for (let i = tabArray.length - 1; i > 0; i--) 
            { 
                const j = Math.floor(Math.random() * (1 + i)); 
                 [tabArray[i], tabArray[j]] = [tabArray[j], tabArray[i]];
            
            } return tabArray; 
    }
const controlOverlay=()=>{
        const retraitOverlay = (element) => {
        element.classList.remove('overlayCards');
    }
    return retraitOverlay;
}
const callbackOverlay = controlOverlay();
const putOverlayAgain = () => {
    const divImg = document.querySelectorAll('.img');
    divImg.forEach(element => {
        element.classList.add('overlayCards')
    })
}
/*__________________________________________________________________________________________________*/
const divMain = document.querySelector('.main');
list.forEach(element => {
    const divImg = document.createElement('div');
    divImg.classList.add('img');
    divImg.classList.add('overlayCards');
    divMain.appendChild(divImg);
    const spanSmile = document.createElement('span');
    spanSmile.classList.add('smile');
    divImg.appendChild(spanSmile);
});
function lancerParty() {
    return new Promise((resolve) => {
        const newList = fishY([...list]);/* le melange des cartes se fait à ce niveau */
        const spanSmile = document.querySelectorAll('.smile');
              spanSmile.forEach((element, index) => {
              element.innerHTML = newList[index];
        })
        let time =40;
        const spanTime = document.querySelector('#time');
        const divImg=document.querySelectorAll('.img');
              divImg.forEach(element=>{
                 const handler = () => {
                 callbackOverlay(element); /* callback element retire l'overlay du div cliqué */
                 if(premiereCarteRetournee===null){
                    premiereCarteRetournee=element;
                 }
                 else{
                    deuxiemeCarteRetounee=element;
                    if(premiereCarteRetournee.firstElementChild.textContent===deuxiemeCarteRetounee.firstElementChild.textContent){
                            if(premiereCarteRetournee===deuxiemeCarteRetounee){
                                return
                            }
                            else{
                                premiereCarteRetournee.removeEventListener('click',handler);
                                deuxiemeCarteRetounee.removeEventListener('click',handler);
                                pairesRetrouvee.push(premiereCarteRetournee.firstElementChild.textContent);
                                pairesRetrouvee.push(deuxiemeCarteRetounee.firstElementChild.textContent);
                                console.log(pairesRetrouvee);
                                premiereCarteRetournee=null;
                                deuxiemeCarteRetounee=null;
                                if(pairesRetrouvee.length===list.length){
                                    alert('Félicitations, vous avez trouvé toutes les paires')
                                    clearInterval(compteur);
                                    etatdeJeu="startingParty";
                                    spanTime.textContent="0";

                                }
                            }
                    }
                    else{
                        setTimeout(()=>{
                                premiereCarteRetournee.classList.add('overlayCards');
                                deuxiemeCarteRetounee.classList.add('overlayCards');
                                premiereCarteRetournee=null;
                                deuxiemeCarteRetounee=null; 
                        },500)
                    }

                 }
            }
            element.addEventListener('click', handler); 
            handlers.push(handler);
         })
        const compteur = setInterval(() => {
              time--;
              spanTime.textContent = time;
              if (time === 0) {
                clearInterval(compteur);
                spanTime.textContent = 'Temps épuisé!';
                resolve(etatdeJeu = 'startingParty');
            }
        }, 1000);
    })
}
/* async compteur est la fonction lancée, Qaund le jeu démarre et contient toute la logique du jeu */
const asyncCompteur = async () => {
    if (etatdeJeu !== 'startingParty') /* On vérifie si le compteur est en cours*/
    { 
        return
    }
    else {
        putOverlayAgain();
        etatdeJeu = 'jeuEncours';
        const divImg = document.querySelectorAll('.img');
        await lancerParty();
 /* On retire l'event listner à ce niveau après la fin du compteur */
        etatdeJeu = 'partieTerminate';
        divImg.forEach((element, index) => {
            element.removeEventListener('click', handlers[index]);
        })
         if(pairesRetrouvee.length!==list.length){
            alert('Désolé, vous avez perdu');
         }
         pairesRetrouvee=[];
         etatdeJeu='startingParty';
        /*On attend que le user apuit à nouveau sur le btnStart */
    }
}
const compareSpanImg=async()=>{
        await asyncCompteur();
        handlers=[];
};
const btnStart = document.querySelector('#btnStart');
btnStart.addEventListener('click', async () =>{
    compareSpanImg()
});
