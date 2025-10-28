import { test, expect} from '@playwright/test';

test.describe('Interagir avec les elements dans le Sandbox automation', () => {
    test('cliquer sur un bouton avec id dynamique', async ({ page }) => {
        await test.step('Tant que je me dirige vers le site freeRangeTesters', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/')
        })
        
        await test.step('J\arrive a faire clique sur le bouton avec ID Dynamique', async () => {
            //premier example click direct sur le locator
            //await page.getByRole('button', { name: 'Hacé click para generar un ID' }).click();

            //deuxieme example click avec une variable, cette façon necessite parfois de forcer avec l'attribut force:true
            const dynamicButton = page.getByRole('button', { name: 'Hacé click para generar un ID' });
            await dynamicButton.click({ force: true});

            //examples differents types de clicks
            //await dynamicButton.dblclick();
            //await dynamicButton.click({ clickCount: 3 });
            //await dynamicButton.click({ button: 'right' });
            //await dynamicButton.click({ modifiers: ['Control']})
            //await dynmicButton.hover();
            
        })
        
    });
});
        
