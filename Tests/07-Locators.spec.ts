import {test, expect} from '@playwright/test';

/*
Lorsque l'on parle de Locators dans Playwright, on fait reference a des methodes permettant de cibler des elements Web dans une page HTML.
la principale complexitée consiste a bien choisir l'attribut HTML a utiliser pour cibler un element Web. Certains attributs ne sont disponibles que sur certains elements HTML.
autre limitation c'est que certains attributs sont dyanamique et peuvent changer a chaque chargement de la page. Il est donc important de choisir des attributs stables et uniques pour chaque element Web que l'on souhaite cibler.

GetByRole: 
permet de cibler des elements Web en fonction de leur role ARIA (Accessible Rich Internet Applications). 
example page.getByRole('button', { name: 'Submit' });
Les roles ARIA sont des attributs HTML qui permettent d'ameliorer l'accessibilite des pages Web pour les personnes utilisant des lecteurs d'ecran.
GetByRole est la facon la plus simple et la plus robuste de cibler des elements Web dans une page HTML.

GetByText:
permet de cibler des elements Web en fonction de leur texte visible.
example page.getByText('Submit');
C'est une methode simple et efficace pour cibler des elements Web, mais elle peut etre moins robuste que GetByRole car le texte visible peut changer en fonction de la langue ou du contexte.
Plusieurs web elemnts peuvent contenir le meme texte visible, il est donc important de s'assurer que le texte est unique pour l'element que l'on souhaite cibler sinon le test peut echouer de facon aleatoire.

GetByLabel:
permet de cibler des elements Web en fonction de leur etiquette (label) associee.
example page.getByLabel('Username');
C'est une methode efficace pour cibler des elements Web, mais elle peut etre moins robuste que GetByRole car les etiquettes peuvent changer en fonction de la langue ou du contexte.
Il est important de s'assurer que l'etiquette est unique pour l'element que l'on souhaite cibler sinon le test peut echouer de facon aleatoire.

getByPlaceholder:
permet de cibler des elements Web en fonction de leur texte d'espace reserve (placeholder).
example page.getByPlaceholder('Enter your name');
C'est une methode efficace pour cibler des elements Web, mais elle peut etre moins robuste que GetByRole car le texte d'espace reserve peut changer en fonction de la langue ou du contexte.
Il est important de s'assurer que le texte d'espace reserve est unique pour l'element que l'on souhaite cibler sinon le test peut echouer de facon aleatoire.

getByAltText:
permet de cibler des elements Web en fonction de leur texte alternatif (alt text).
example page.getByAltText('Profile picture');
C'est une methode efficace pour cibler des elements Web, mais elle peut etre moins robuste que GetByRole car le texte alternatif peut changer en fonction de la langue ou du contexte.
Il est important de s'assurer que le texte alternatif est unique pour l'element que l'on souhaite cibler sinon le test peut echouer de facon aleatoire.

getBytitle:
permet de cibler des elements Web en fonction de leur attribut title.
example page.getByTitle('Close');
C'est une methode efficace pour cibler des elements Web, mais elle peut etre moins robuste que GetByRole car l'attribut title peut changer en fonction de la langue ou du contexte.
Il est important de s'assurer que l'attribut title est unique pour l'element que l'on souhaite cibler sinon le test peut echouer de facon aleatoire.

getByTestId:
permet de cibler des elements Web en fonction de leur attribut data-testid.
example page.getByTestId('submit-button');
Ce locator est utilisé principalement pour les tests automatises. Il est important de s'assurer que l'attribut data-testid est unique pour l'element que l'on souhaite cibler sinon le test peut echouer de facon aleatoire.

CSS et XPath:
permettent de cibler des elements Web en utilisant des selecteurs CSS ou XPath.
example page.locator('css=button.submit');
example page.locator('xpath=//button[@class="submit"]');
Ces methodes sont puissantes et flexibles, mais elles peuvent etre moins robustes que les autres methodes de locators car les selecteurs CSS ou XPath peuvent changer en fonction de la structure HTML de la page.
Il est important de s'assurer que les selecteurs CSS ou XPath sont stables et uniques pour l'element que l'on souhaite cibler sinon le test peut echouer de facon aleatoire.

exact true:
permet de s'assurer que le texte utilise pour cibler un element Web correspond exactement au texte visible de l'element.
example page.getByText('Submit', { exact: true });
C'est une option utile pour eviter les problemes lies aux textes partiels ou aux variations de casse.

Shadow DOM:
Playwright supporte nativement le Shadow DOM, ce qui permet de cibler des elements Web encapsules dans des composants Web.
example page.locator('css=custom-element').shadowRoot().locator('css=button.submit');
C'est une fonctionnalite importante pour tester des applications modernes utilisant des composants Web.

Filters supplementaires:
Lorsque nous avons plusieurs elements Web correspondant a un meme locator, nous pouvons utiliser des filtres supplementaires pour affiner notre selection.

Nth-children:
example page.getByRole('button', { name: 'Submit' }).first(); //Premier element, il faut s'assurer que l'element est toujours le n dans la page
example page.getByRole('button', { name: 'Submit' }).nth(1);
example page.getByRole('button', { name: 'Submit' }).last();

hasText:
example page.getByRole('button', { hasText: 'Submit' }); //Dynamique car peu importe dans quel ordre l'elemnt apparait dans la page

filtres recursifs:
example page.getbyRole('list').filter({ has: page.getByRole('listitem', { name: 'Item 1' }) }); //Cible une liste contenant un element de liste specifique

Filtre par element visible:
Lorsque l'on cible par example un bouton visible dans la page mais si un autre bouton est present mais non visible alors playwright peut lever une erreur d'ambiguité. 
Pour eviter cela on peut utiliser le filtre visible: true
example page.getByRole('button', { name: 'Submit', visible: true });

C'est une fonctionnalite utile pour cibler des elements Web de facon precise lorsque plusieurs elements correspondent a un meme locator.
*/

/*
Cibler elements dans une liste

html:
<ul>
    <li>Manzana</li>
    <li>Banana</li>
    <li>Naranja</li>
</ul>

page.getByText('Banana'); //Cible un element web quelconque dans la page ayant le texte 'Banana'
page.getByRole('listitem').filter({ hasText: 'Banana' }); //Cible un element web de type listitem ayant le texte 'Banana'
page.getByRole('list').last; //Cible le dernier element web de type list dans la page
page.getByRole('list').filter({ has: page.getByText('Banana') }); //Cible une liste contenant un element ayant le texte 'Banana'


*/
