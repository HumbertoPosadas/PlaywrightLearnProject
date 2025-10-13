// lorsque je commence une fonction avec le mot clé 'await' cela indique que la fonction va contenir des operations asynchrones
// et que l'execution de la fonction doit attendre la resolution de ces operations avant de continuer.
// Le mot clé 'await' ne peut etre utilisé qu'a l'interieur d'une fonction declarée avec le mot clé 'async'.
// Le mot clé async indique que la reponse ne viendra pas immediatement, mais à un moment futur.
// Les fonctions asynchrones sont souvent utilisées pour des operations qui prennent du temps, comme les appels reseau, 
// les lectures de fichiers ou les operations de base de données.

// Lorsque l'on marque une fonction avec le mot cle 'async', automatiquement cette fonction retourne une promesse.
// Si la fonction retourne une valeur, cette valeur est automatiquement encapsulée dans une promesse resolue.
// Si la fonction lance une exception, la promesse est automatiquement rejetée avec cette exception.

// A l'interieur d'une fonction asynchrone, on peut utiliser le mot clé 'await' pour attendre la resolution d'une promesse et ne pas blquer l'execution du reste du programme.

// Exemple d'une fonction asynchrone qui simule une operation asynchrone avec un delai

import {    chromium } from 'playwright';

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://www.isagri.com/');

    await browser.close();
})();

