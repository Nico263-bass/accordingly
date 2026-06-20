const list = ["&#128512;", "&#128513;", "&#128514;", "&#128590;", "&#128122;"
    , "&#128663;", "&#128512;", "&#128513;", "&#128514;", "&#128590;",
    "&#128122;", "&#128663;"];
/************************************************ */
const divMain = document.querySelector('.main');
list.forEach(element => {
    const divImg = document.createElement('div');
    divImg.classList.add('img');
    divImg.classList.add('overlayCards');
    divMain.appendChild(divImg);
    const spanSmile = document.createElement('span');
    spanSmile.classList.add('smile');
    divImg.appendChild(spanSmile);
})
//Algo de Fisher-Yates pour le tirage aléatoire des cartes
function fishY(tabArray) {
    for (let i = tabArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (1 + i));
        [tabArray[i], tabArray[j]] = [tabArray[j], tabArray[i]];
    }
    return tabArray;
}
/**********Application de l'Algo de fisher Yates **************/
// Function exécutant le compteur et l'algorithme de Fishr-Yates
function lancerParty() {
    return new Promise((resolve) => {
        const newList = fishY([...list]);/* le melange des cartes se fait à ce niveau */
        const spanSmile = document.querySelectorAll('.smile');
        spanSmile.forEach((element, index) => {
            element.innerHTML = newList[index]
        })
        let time = 5;
        const spanTime = document.querySelector('#time');
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
/* *********************************************************************** */
let etatdeJeu = 'startingParty' /* startingParty, jeuEncours, finDelaPartie */
/* ************************************************************************/
let handlers = []; /* variable qui va contenir chaque copie de l'eventListner de DivImg */
function controlOverlay() {
    const retraitOverlay = (element) => {
        element.classList.remove('overlayCards');
    }
    return retraitOverlay;
}
const callbackOverlay = controlOverlay();
/* ***********************************************************************/
const putOverlayAgain = () => {
    const divImg = document.querySelectorAll('.img');
    divImg.forEach(element => {
        element.classList.add('overlayCards')
    })
}
const asyncCompteur = async () => {
    if (etatdeJeu !== 'startingParty') {
        return
    }
    else {
        putOverlayAgain();
        etatdeJeu = 'jeuEncours';
        const divImg = document.querySelectorAll('.img');
        divImg.forEach(element => {
            const handler = () => {
                callbackOverlay(element);
            }
            element.addEventListener('click', handler);
            handlers.push(handler);
        })
        await lancerParty();
        /* On retire l'event listner à ce niveau après la fin du compteur */
        etatdeJeu = 'partieTerminate';
        divImg.forEach((element, index) => {
            element.removeEventListener('click', handlers[index]);
        })
        etatdeJeu='startingParty'
        console.log(handlers)
        /*On attend que le user apuit à nouveau sur le btnStart */
    }
}
const btnStart = document.querySelector('#btnStart');
btnStart.addEventListener('click', async () =>{
       await asyncCompteur();
       handlers=[];
})
