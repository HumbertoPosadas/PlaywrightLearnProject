class Personne {
  //propriétés de la classe
  nom: string;
  age: number;

  //constructeur de la classe
  constructor(nom: string, age: number) {
    this.nom = nom;
    this.age = age;
  }

  //méthode de la classe. Une methode de classe est une fonction qui est associée à une classe. 
  //Une methode de classe peut accéder aux propriétés de la classe et peut être appelée sur une instance de la classe.
  //Une methode de classe n'a pas besoin d'etre definie avec le mot clé 'function' car elle est deja dans le contexte d'une classe.
  afficherDetails() {
    console.log(`Nom: ${this.nom}, Age: ${this.age}`);  
  }
}

  //fonctions simples. une fonction qui à été déclarée en dehors d'une classe et qui peut être appelée de manière indépendante de toute instance de classe, 
  //necessitant le mot clé 'function'pour être définie.
  function calculer(a: number, b: number): number {
    return a + b;
  }