import { test, expect } from '@playwright/test';      //import des librairies necessaires


// Validation des titres et des redirections sur le site isagri.fr
test.describe('Navigation vers le site www.isagri.com', () => {      
    test('Le lien principal redirige correctement', async ({ page }) => {      
        await test.step('Etant donné que je suis sur la page d\'accueil isagri', async () => {      
            await page.goto('https://www.isagri.fr/');
            await page.click('text=Agree and close');
            await expect(page).toHaveTitle('Logiciels et matériel pour le monde agricole - ISAGRI');
        });

        await test.step('Quand je clique sur le lien "Contactez-nous"', async () => {      
            await page.waitForURL('https://www.isagri.fr');
            await page.click('text=Contactez-nous'); 
        });

        await test.step('j\'ai bien été redirigé vers la page de contact', async () => {
            await page.waitForURL('https://www.isagri.fr/contact');
            await expect(page).toHaveTitle('Une équipe à l\'écoute de votre besoin d\'équipement ! - ISAGRI');
        });
    });
});

//    Validation de plusieurs titres et des redirections sur le site freerangetesters.com
test.describe('Validation des redirections sur le site www.freerangetesters.com', () => {
    const sections = [
        { name: 'Cursos', url: '/cursos', title: 'Cursos' },
        { name: 'Academia', url: '/academia', title: 'Academia' },
        { name: 'Mentorías', url: '/mentoria-1-1-con-pato', title: 'Mentoría personalizada de avance de carrera para testers de software' },
        { name: 'Blog', url: '/blog', title: 'Free Range Testers' }
    ];
    for (const section of sections) {
        test('Valider la redirection vers la section ' + section.name, async ({page}) => {
            await test.step('quand je suis sur la page d\'accueil freerangetesters', async () => {
                page.goto('https://www.freerangetesters.com/');
                await expect(page).toHaveTitle('Free Range Testers');
            });

            await test.step('quand je clique sur le lien ' + section.name, async () => {
                await page.getByRole('link', { name: section.name, exact: true }).click();
                await page.waitForURL('**' + section.url);
            });

            await test.step('alors je suis redirige vers la page ' + section.name, async () => {
                await expect(page).toHaveTitle(section.title);
            });
        });
    }
});


