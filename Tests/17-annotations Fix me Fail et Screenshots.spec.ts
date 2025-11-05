import {    test, expect } from '@playwright/test';

/*
l'annotation fail permet de marquer un test comme etant destine a echouer. Cela peut etre utile dans plusieurs scenarios :
- Tests en cours de developpement : Si un test est en cours de creation ou de modification et qu'il n'est pas encore pret a etre execute avec succes, on peut utiliser l'annotation fail pour indiquer que l'echec est attendu.
- Bugs connus : Si un test echoue en raison d'un bug connu dans l'application, on peut marquer le test avec fail pour signaler que l'echec est attendu jusqu'a ce que le bug soit corrige.
- Documentation des limitations : L'annotation fail peut etre utilisee pour documenter les limitations actuelles de l'application ou du systeme teste. Cela permet aux autres membres de l'equipe de comprendre pourquoi un test echoue et quelles sont les attentes.


L'annotation Fixme permet de marquer un test comme ayant des problemes connus qui doivent etre resolus. Cela peut etre utile dans plusieurs scenarios :
- Tests avec des bugs connus : Si un test echoue en raison d'un bug connu dans l'application, on peut utiliser l'annotation Fixme pour indiquer que le test doit etre corrige une fois que le bug est resolu.
- Tests incomplets : Si un test n'est pas encore complet ou si certaines parties du test doivent etre ameliores, on peut utiliser Fixme pour signaler que des travaux sont en cours.
- Documentation des problemes : L'annotation Fixme peut etre utilisee pour documenter les problemes connus dans le code de test lui-meme, ce qui facilite la maintenance et l'amelioration future des tests.

Le screenshot peut etre fourni avec l'annotation info pour documenter le deroulé du test vis a vis des etapes realisées selon l'endroit du test ou l'annotation à été positionnée.
Il est possible de prendre un screenshot si le test echoue en configurant la prise de screenshot dans le fichier playwright.config.ts avec l'option "screenshot: 'only-on-failure'".
*/

test.describe('Assertions pour faire des verifications sur une table statique', () => {
    
    test('Je verifie les valeurs presentes dans la colonne Nombre dans la table Statique', async ({ page }) => {

        //test fail permet de marquer ce test comme etant destine a echouer donc s'il echoue le test sera considere comme reussi
        test.fail(true, 'Ce test est destine a echouer car les valeurs attendues ne correspondent pas aux valeurs reelles de la table.');

        const tableStatiqueLocator = page.locator('h2:has-text("Tabla estática") + table tbody tr td:nth-child(2)');
        const expectedValues = ["Messi", "Neymar", "Mbappe"];   //valeur incorrecte "Neymar" pour forcer l'echec du test mais il sera considere comme reussi grace a l'annotation test.fail()
        
        await test.step('Je navigue vers le Sandbox automation', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/')
        })
        
        await test.step('Je verifie que les valeurs attendues sont presentes dans la colonne Nombre', async () => {
            const cellCount = await tableStatiqueLocator.count();
            console.log(`Nombre de cellules dans la colonne Nombre : ${cellCount}`);
            //je valide que le nombre de cellules est egal au nombre de valeurs attendues
            expect(cellCount, 'Le nombre de cellules dans la colonne Nombre est incorrect').toBe(expectedValues.length);

            //je recupere dans un tableau les valeurs presentes dans la colonne Nombre
            const actualValues: string[] = [];
            for (let i = 0; i < cellCount; i++) {
                const cellText = await tableStatiqueLocator.nth(i).innerText();
                actualValues.push(cellText.trim());
            }
            //je valide que les valeurs presentes dans la colonne Nombre sont bien celles attendues
            expect(actualValues, 'Les valeurs presentes dans la colonne Nombre sont incorrectes').toEqual(expectedValues);
        })
    })
    
})

test.describe('Assertions pour faire des verifications sur les dropdowns en PW', () => {
    test('Verifier que le dropdown a des valeurs', async ({ page }) => {

        //Fixme permet de marquer ce test comme ayant des problemes connus qui doivent etre resolus. Le test apparait dans l'onglet Skipped avec la raison fournie.
        test.fixme(true, 'Ce test a des problemes connus qui doivent etre resolus.');

        const dropdownSports = page.locator('id=formBasicSelect')
        const SportsList = ['Fútbol', 'Tennis', 'Basketball']
        const sportFound: string[] = [];

        await test.step('Je navigue vers le Sandbox automation', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/')
        })

        await test.step('Je verifie la presence du dropdown sports', async () => {
            //je clique sur le dropdown pour l'ouvrir
            await dropdownSports.click();
            //je verifie que le dropdown est visible
            await expect(dropdownSports, 'Le dropdown Sports n\'est pas visible').toBeVisible();
            //je verifie que le dropdown contient des options
            for (const sport of SportsList) {
                const sportOption = dropdownSports.locator(`option[value="${sport}"]`);
                if (sportOption) {
                    console.log(`L'option ${sport} est présente dans le dropdown Sports.`);
                    sportFound.push(sport);
                } else {
                    console.log(`L'option ${sport} n'est pas présente dans le dropdown Sports.`);
                    throw new Error(`L'option ${sport} n'est pas présente dans le dropdown Sports.`);
                }
            }
            //je verifie que toutes les options attendues sont presentes dans le dropdown
            expect(sportFound.length, 'Toutes les options attendues ne sont pas présentes dans le dropdown Sports').toBe(SportsList.length);
            //je verifie que chaque option presente dans sportFound est bien dans SportsList
            for (const sport of sportFound) {
                expect(SportsList.includes(sport), `L'option ${sport} n'est pas attendue dans le dropdown Sports`).toBe(true);
                console.log(sport)
            }

            
        })
        
    })
    
})

test.describe('Assertions pour faire des verifications sur des checkboxes en PW', () => {
    test('Je fais ma premiere verification', async ({ page }) => {

        //Web Elements
        const pastaChechbox = page.getByRole('checkbox', { name: 'Pasta 🍝' })

        await test.step('tant que je navigue vers le Sandbox automation', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/')
        })

        await test.info().attach('screenshot avant interaction', { //prise de screenshot avant l'interaction avec le checkbox
            body: await page.screenshot(),
            contentType: 'image/png',
        });

        await test.step('Je suis capable de selectionner le checkbox Pasta', async () => {
            
            await pastaChechbox.check();
            //je verifie que le checkbox est bien visible
            await expect(pastaChechbox, 'Le checkbox Pasta n\'est pas visible').toBeVisible();
            await page.waitForTimeout(1000);
            //je verifie que le checkbox est bien coche
            await expect(pastaChechbox, 'Le checkbox Pasta doit être coché').toBeChecked();

            await test.info().attach('screenshot apres selection Pasta', { //prise de screenshot apres l'interaction avec le checkbox Pasta
            body: await page.screenshot(),
            contentType: 'image/png',
        });

        })

        await test.step('Je suis capable de deselectioner le checkbox pasta', async () => {
            await pastaChechbox.uncheck();
            await page.waitForTimeout(1000);
            //je verifie que le checkbox n'est pas coche
            await expect(pastaChechbox, 'Le checkbox Pasta doit être décoché').not.toBeChecked();

            await test.info().attach('screenshot apres deselection Pasta', { //prise de screenshot apres l'interaction avec le checkbox Pasta
            body: await page.screenshot(),
            contentType: 'image/png',
        });

        })
    })
})

