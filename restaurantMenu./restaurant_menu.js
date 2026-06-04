/* const breakfastMenu = ['Pancakes', 'Eggs Benedict', 'Oatmeal', 'Frittata'];
const mainCourseMenu = ['Steak', 'Pasta', 'Burger', 'Salmon'];
const dessertMenu = ['Cake', 'Ice Cream', 'Pudding', 'Fruit Salad'];
 const breakfastMenuItemsHTML = breakfastMenu.map((item, index) => `<p>Item ${index + 1}: ${item}</p>`).join('');
        document.getElementById('breakfastMenuItems').innerHTML = breakfastMenuItemsHTML;
 const mainCourseMenuHTML=mainCourseMenu.map((el,index)=>`<p>${el}:son index est ${index+1}</p>`).join('');
    document.getElementById('maincourseMenuItems').innerHTML=mainCourseMenuHTML;
for (let index = 0; index < array.length; index++) {
       const element = array[index];
       
} */

const obj={
       nom:'nomObjet',
};
try {
       const prop=obj.age;
       console.log(`la valeur de la la propriété est: ${prop}`);
} catch (error) {
       console.error(`Une erreur a étée rencontrée lors de la lecture de la proprité: ${error.message}`);
}
console.log('le code continue à s\'exécuter malgré l\'erreur rencontrée');