//Déclaration et initialisation de variables avec différents types de données
let age: number = 39; //Type annotation (déclaration explicite du type d'une variable)
let pieces = 25; //Type inference (capacité du compilateur à déterminer automatiquement le type d'une variable)
let hauteur: number = 175.5; //Type annotation pour un nombre à virgule flottante, sous Typesscript, les floats sont aussi de type 'number'
let firstName: string = "Humberto"; //Type annotation pour une chaîne de caractères
let lastName = 'Posadas'; //Type inference pour une chaîne de caractères
let isActive: boolean = true; //Type annotation pour un booléen
let isAdmin = false; //Type inference pour un booléen
let valeurs: number[] = [1, 2, 3, 4, 5]; //Type annotation pour un tableau de nombres
let fruits = ["pomme", "banane", "orange"]; //Type inference pour un tableau de chaînes de caractères
let identification: [string, number] = ["Juanito", 31] //Type annotation pour un tuple (un tableau avec des types fixes pour chaque position)
let coordonnees: [number, number] = [25536.5, -48652.3]; //Type annotation pour un tuple de deux nombres

//enums (énumérations)
enum Couleur {
  Rouge, //0
  Vert, //1
  Bleu   //2
}

let couleurChoisie: Couleur = Couleur.Vert; //Utilisation de l'énumération

//Operations numeriques
let adition: number = age + 10; 
let moyenne: number = pieces / 5; 

//Concatenation de chaînes de caractères
let fullName: string = firstName + " " + lastName; //Utilisation de l'opérateur + pour concaténer des chaînes
let greeting: string = `Bonjour, je m'appelle ${firstName} ${lastName} et j'ai ${age} ans.`; //Utilisation de template literals pour inclure des variables dans une chaîne

//conditionnelles
if (isActive) {
  console.log("Le compte est actif.");
} else {
  console.log("Le compte est inactif.");
}

//acceder aux éléments d'un tableau ainsi que ses propriétés
console.log(valeurs[2]); //Accès au troisième élément du tableau 'valeurs'
console.log(fruits.length); //Accès à la propriété 'length' du tableau 'fruits'

console.log(identification[0]); //Accès au premier élément du tuple 'identification'
console.log(coordonnees[1]); //Accès au deuxième élément du tuple 'coordonnees'