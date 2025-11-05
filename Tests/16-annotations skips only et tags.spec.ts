import { test, expect } from '@playwright/test';

/*
Les annotations 'skip' et 'only' permettent de controler l'execution des tests dans un suite de tests.
- 'skip' permet de sauter l'execution d'un test ou d'une suite de tests.
- 'only' permet d'executer uniquement un test ou une suite de tests specifiee, en ignorant les autres.
Cela est utile pour se concentrer sur des tests specifiques lors du developpement ou du debug.

Les tags permettent de categoriser les tests afin de faciliter leur execution selective. Par exemple, on peut taguer des tests comme 'smoke', 'regression', ou 'critical' pour les executer en fonction des besoins.
une fois que j'ai tagué mes tests, je peux executer uniquement les tests avec un tag specifique en utilisant la ligne de commande de Playwright, par exemple :
npx playwright test --grep @smoke

Le skip conditionnel permet de sauter l'execution d'un test en fonction de certaines conditions, comme le systeme d'exploitation, le navigateur, ou d'autres criteres. 
Par exemple, on peut choisir de sauter un test uniquement sur Windows ou uniquement sur Chrome.

Les annotations personalisées permettent de definir des comportements specifiques pour les tests, comme des retries, des timeouts, ou d'autres configurations.
par exemple, on peut configurer un test pour qu'il soit retenté automatiquement en cas d'echec en utilisant test.retry(2).
*/

test.describe('Assertions pour faire des verifications sur des checkboxes en PW', () => { //ajout du tag @checkboxes pour categoriser le test, l'execution peut etre faite en utilisant npx playwright test --grep @checkboxes
    //test.only('Je fais ma premiere verification @checkbox', async ({ page }) => { //l'annotation only permet d'executer uniquement ce test en ignorant les autres tests dans la suite
    test('Je fais ma premiere verification @checkbox', async ({ page }) => { 

        test.info().annotations.push({ 
            type: 'User story', 
            description: 'L\'utilisateur peut sélectionner des options dans un formulaire' }); //ajout d'une annotation personalisée pour categoriser le test. Ces informations seront visibles dans le rapport de test.

        //Web Elements
        const pastaChechbox = page.getByRole('checkbox', { name: 'Pasta 🍝' })

        await test.step('tant que je navigue vers le Sandbox automation', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/')
        })

        await test.step('Je suis capable de selectionner le checkbox Pasta', async () => {
            
            await pastaChechbox.check();
            //je verifie que le checkbox est bien visible
            await expect(pastaChechbox, 'Le checkbox Pasta n\'est pas visible').toBeVisible();
            await page.waitForTimeout(1000);
            //je verifie que le checkbox est bien coche
            await expect(pastaChechbox, 'Le checkbox Pasta doit être coché').toBeChecked();

        })

        await test.step('Je suis capable de deselectioner le checkbox pasta', async () => {
            await pastaChechbox.uncheck();
            await page.waitForTimeout(1000);
            //je verifie que le checkbox n'est pas coche
            await expect(pastaChechbox, 'Le checkbox Pasta doit être décoché').not.toBeChecked();

        })
    })
})

test.describe('Assertions pour faire des verifications sur les radiobuttons', () => {
    test('verifier etat de radiobuttons', async ({ page, browserName }) => {
        //utiliser skip pour sauter ce test sur chrome
        test.skip(browserName === 'chromium', 'Test sauté sur Chrome');

        const radioButtonNo = page.getByRole('radio', { name: 'No' });
        const radioButtonYes = page.getByRole('radio', { name: 'SI' });

        await test.step('Je navigue vers le Sandbox automation', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/')
        })

        await test.step('Je selectionne un radioButton', async () => {
            //Je verifie que aucun radiobutton n'est selectionne au depart
            await expect(radioButtonNo, 'Un radiobutton est sélectionné par défaut').not.toBeChecked();
            await expect(radioButtonYes, 'Un radiobutton est sélectionné par défaut').not.toBeChecked();

            //je selectionne le radiobutton Si
            await radioButtonYes.check();
            await expect(radioButtonYes, 'Le radiobutton Si doit être sélectionné').toBeChecked();

            //je selectionne le radiobutton No
            await radioButtonNo.check();
            await expect(radioButtonNo, 'Le radiobutton No doit être sélectionné').toBeChecked();
            await expect(radioButtonYes, 'Le radiobutton Si ne doit pas être sélectionné').not.toBeChecked();
        })
        
    })
    
})

test.describe('Assertions pour faire des verifications sur les dropdowns en PW', () => {
    test('Verifier que le dropdown a des valeurs', async ({ page }) => {
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


test.describe('Assertions pour faire des verifications sur la presence de textes en PW', () => {
    test('Verifier que le texte s\'affiche apres 3 secondes', async ({ page }) => {

        const phrase = "OMG, aparezco después de 3 segundos de haber hecho click en el botón 👻."
        const buttonshowText = page.getByRole('button', { name: 'Hacé click para generar un ID' })

        await test.step('Je navigue vers le Sandbox automation', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/')
        })

        await test.step('Je clique sur le bouton dynamique pour afficher le texte', async () => {
            await buttonshowText.click({force: true}); //force true pour forcer le click meme si le bouton est couvert par un autre element
            //je verifie que le texte apparait apres 3 secondes
            await expect(page.getByText(phrase), 'Le texte n\'est pas apparu après 3 secondes').toBeVisible({timeout: 6000}); //le timeout par defaut pour la methode toBeVisible est de 5000ms

        })
        
    })

    test('Je verifie que la valeur d\'un champ de texte est correcte', async ({ page }) => {
        const inputText = page.getByRole('textbox', { name: 'Un aburrido texto' })
        const inputTextV2 = page.getByPlaceholder('Ingresá texto')
        const phraseValue = "Este es un texto de prueba."

        await test.step('Je navigue vers le Sandbox automation', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/')
        })

        await test.step('J\'arrive a saisir du texte dans le textfield', async () => {

            //je verifie que le textfield est visible
            await expect(inputText, 'Le textfield n\'est pas visible').toBeVisible();
            //je verifie que le textfield est vide
            await expect(inputText, 'Le textfield n\'est pas vide au depart').toHaveValue('');
            //je verifie que le textfieldV2 est editable
            await expect(inputTextV2, 'Le textfield n\'est pas editable').toBeEditable();
            //je saisis du texte dans le textfield
            await inputTextV2.fill(phraseValue);
            //je verifie que la valeur du textfield est correcte
            await expect(await inputText.inputValue(), 'La valeur du textfield est incorrecte').toBe(phraseValue); 
            await expect(inputTextV2, 'Le textfield n\'a pas la bonne valeur').toHaveValue(phraseValue);
        })
                
        
    })
    
})

test.describe('Assertions pour faire des verifications sur une table statique', () => {
    
    test('Je verifie les valeurs presentes dans la colonne Nombre dans la table Statique @table', async ({ page }) => { //l'annotation @table permet de taguer le test pour une execution selective via la ligne de commande npx playwright test --grep @table
        const tableStatiqueLocator = page.locator('h2:has-text("Tabla estática") + table tbody tr td:nth-child(2)');
        const expectedValues = ["Messi", "Ronaldo", "Mbappe"]
        
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

test.describe('Assertions pour faire des verifications sur une table dynamique', () => {
    test('Je valide que les données de la table dynamique changent apres reload @table', async ({ page }) => {

        const tableDynamiqueLocator = page.locator('h2:has-text("Tabla dinámica") + table tbody tr td');   

        await test.step('Je navigue vers le Sandbox automation', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/')
        })

        let initialTableData: string[] = [];
        await test.step('Je recupere les données initiales de la table dynamique', async () => {
            const cellCount = await tableDynamiqueLocator.count();  
            for (let i = 0; i < cellCount; i++) {
                const cellText = await tableDynamiqueLocator.nth(i).innerText();
                initialTableData.push(cellText.trim());
            }
        })

        await test.step('Je recharge la table dynamique et je valide que les données ont changé', async () => {
            //je fais un reload de la page pour recharger la table dynamique
            await page.reload();
            //je recupere les nouvelles données de la table dynamique
            const newTableData: string[] = [];
            const cellCount = await tableDynamiqueLocator.count(); 
            for (let i = 0; i < cellCount; i++) {
                const cellText = await tableDynamiqueLocator.nth(i).innerText();
                newTableData.push(cellText.trim());
            }

            //je affiche les données initiales et les nouvelles données dans la console
            console.log('Données initiales de la table dynamique :', initialTableData);
            console.log('Nouvelles données de la table dynamique après reload :', newTableData);

            //je valide que les nouvelles données sont differentes des données initiales
            expect(newTableData, 'Les données de la table dynamique n\'ont pas changé après le rechargement').not.toEqual(initialTableData);
        })

    })
    
})

