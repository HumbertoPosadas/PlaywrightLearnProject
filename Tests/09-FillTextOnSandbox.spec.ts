import { test, expect} from '@playwright/test';

/*
Il est important de bin cibler les elements dont on veut remplir seulement sur des web elements de type input ou textarea.
*/

test.describe('Actions dans le Sandbox Automation', () => {
    test('Remplir un champ de texte', async ({ page }) => {
        await test.step('tant que je navigue vers le Sandbox automation', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/')
        })

        await test.step('Je remplie le champ Un aburrido texto', async () => {
            await page.getByRole('textbox', { name: 'Un aburrido texto' }).fill('Ceci est un texte rempli par Playwright');
        })
    })

    test('Remplir en simulant de taper les touches dans le clavier', async ({ page }) => {
        await test.step('tant que je navigue vers le Sandbox automation', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/')
        })

        await test.step('Je remplie la textbox toouche par touche', async () => {
            await page.getByPlaceholder('Ingresá texto').type('Ceci est un texte rempli par Playwright', { delay: 100 });
            //je simule le touche enter pour validr le formulaire
            await page.keyboard.press('Enter');
            await page.getByPlaceholder('Ingresá texto').press('Enter');
        })
        
            
       })
        
    })
    
    

