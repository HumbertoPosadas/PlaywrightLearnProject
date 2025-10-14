import { test, Browser, Page } from '@playwright/test';      //import des librairies necessaires

    test.describe('Feature', () => {      //debut du bloc de tests
        test('scenario 1', async({ page }) => {      //debut du test scenario 1
            await test.step('Etant donné que je suis sur la page d\'accueil', async () => {      //debut de l'etape 1
                await page.goto('https://www.isagri.fr/');      //aller a la page d'accueil
            })

            await test.step('Quand je clique sur le lien "Contactez-nous"', async () => {      //debut de l'etape 2
                await page.click('text=Contactez-nous');      //cliquer sur le lien "Contactez-nous"
            });

            await test.step('Alors je suis redirigé vers la page de contact', async () => {      //debut de l'etape 3
                await page.goto('https://www.isagri.fr/contact');      //aller a la page de contact
        });      //fin du test scenario 1
    });      //fin du bloc de tests
    });