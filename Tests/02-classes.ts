const personne = new Personne("Humberto", 39);
personne.afficherDetails(); // Appel de la méthode de la classe

//function simple
function addition(x: number, y: number): number {
  return x + y;
}
console.log(`La somme de 5 et 10 est: ${addition(5, 10)}`);
console.log('La somme de 20 et 30 est', addition(20, 30));

//fonction fleche (arrow function)
const multiplication = (x: number, y: number): number => {
  return x * y;
}
console.log(`Le produit de 5 et 10 est: ${multiplication(5, 10)}`);
console.log('Le produit de 20 et 30 est', multiplication(20, 30));

//fonction fleche simplifiée (sans accolades et return implicite)
const soustraction = (x: number, y: number): number => x - y;
console.log(`La différence entre 10 et 5 est: ${soustraction(10, 5)}`);
console.log('La différence entre 30 et 20 est', soustraction(30, 20));

//Fonction fleche avec mappage (map)
const nombres: number[] = [1, 2, 3, 4, 5];
const auCarre: number[] = nombres.map(n => n * n); //Utilisation de la fonction fleche pour élever au carré chaque élément du tableau
console.log('Nombres au carré:', auCarre);