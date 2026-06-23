// Algorithm de fisher Yates
const tab=['a','b','c','d','e'];
export function fishY(tabArray){
   for (let i =tabArray.length-1; i>0; i--) {
        const j=Math.floor(Math.random()*(1+i));
        [tabArray[i],tabArray[j]]=[tabArray[j],tabArray[i]]
   }
   return tabArray;
        
}
console.log(fishY(tab));