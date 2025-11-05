import { test, Browser, Page } from '@playwright/test';      //import des librairies necessaires


test.describe('Navigation vers le site www.isagri.com', () => {      
    test.skip('Le lien principal redirige correctement', async({ page }) => {      
        await test.step('Etant donné que je suis sur la page d\'accueil isagri', async () => {      
            await page.goto('https://www.isagri.fr/');     
        })

        await test.step('Quand je clique sur le lien "Solutions"', async () => {      
            await page.waitForURL('https://www.isagri.fr');    
            await page.click('text=Solutions');  
        })

        await test.step('jai bien été redirigé vers la page des solutions', async () => {
            await page.goto('https://www.isagri.fr/ressources/articles/solutions');
        })
    });      
})
