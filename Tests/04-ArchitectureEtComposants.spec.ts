import { test, Browser, Page } from '@playwright/test';      //import des librairies necessaires

(async () => {      //fonction asynchrone auto-executante
    let browser: Browser;
    let page: Page;

    test.describe('Feature', () => {      //debut du bloc de tests
        test('scenario 1', async({ page }) => {      //debut du test scenario 1
            await test.step('Etant donné que je suis sur la page d\'accueil', async () => {      //debut de l'etape 1
                await page.goto('https://www.isagri.com/');      //aller a la page d'accueil
            })

            await test.step('Quand je clique sur le lien "Solutions"', async () => {      //debut de l'etape 2
                await page.getByRole('link', { name: 'Solutions' }).click();      //cliquer sur le lien "Solutions"
            });
        });      //fin du test scenario 1
    });      //fin du bloc de tests
})();      //fin de la fonction asynchrone auto-executante