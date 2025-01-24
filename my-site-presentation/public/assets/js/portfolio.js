document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.list-group-item');
    const sections = document.querySelectorAll('.section-item');

    const API_URL = 'http://localhost:1337/api/portfolios';

    /**
     * Fonction pour convertir le contenu riche en HTML formaté
     * @param {Array} richText - Contenu riche provenant de Strapi
     * @returns {String} - HTML formaté
     */
    function formatRichText(richText) {
        if (!Array.isArray(richText)) {
            return '<p>Contenu non disponible</p>';
        }

        return richText
            .map(block => {
                if (block.type === 'paragraph') {
                    return `<p>${block.children.map(child => child.text || '').join('')}</p>`;
                } else if (block.type === 'list') {
                    const items = block.children
                        .map(item => `<li>${item.children.map(child => child.text || '').join('')}</li>`)
                        .join('');
                    return `<ul>${items}</ul>`;
                }
                return '';
            })
            .join('');
    }

    /**
     * Vérifie si l'API est accessible
     * @returns {Promise<Boolean>} - Indique si l'API est accessible
     */
    async function checkApiConnection() {
        try {
            const response = await fetch(API_URL);
            if (response.ok) {
                console.log('API accessible.');
                return true;
            } else {
                console.error(`Problème d'accès à l'API : ${response.status}`);
                displayErrorMessage(`Erreur : Impossible de se connecter à l'API (${response.status})`);
                return false;
            }
        } catch (error) {
            console.error('Erreur lors de la tentative de connexion à l\'API:', error);
            displayErrorMessage('Erreur : Impossible de se connecter à l\'API.');
            return false;
        }
    }

    /**
     * Affiche un message d'erreur
     * @param {String} message - Message d'erreur à afficher
     */
    function displayErrorMessage(message) {
        const errorElement = document.createElement('div');
        errorElement.style.color = 'red';
        errorElement.style.textAlign = 'center';
        errorElement.style.marginTop = '20px';
        errorElement.innerHTML = message;
        document.body.innerHTML = '';
        document.body.appendChild(errorElement);
    }

    /**
     * Récupère les données de l'API et les injecte dans les sections
     */
    async function fetchData() {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();

            if (data && data.data) {
                const portfolios = data.data;

                portfolios.forEach((portfolio, index) => {
                    const sectionId = `section-${index + 1}`;
                    const sectionElement = document.getElementById(sectionId);

                    if (sectionElement) {
                        const description = portfolio.attributes?.Description;
                        const formattedHTML = formatRichText(description);

                        sectionElement.querySelector('p').innerHTML = formattedHTML || '<p>Contenu non disponible</p>';
                    } else {
                        console.warn(`Section ID ${sectionId} introuvable pour le portfolio avec ID ${portfolio.id}`);
                    }
                });
            } else {
                console.error('Aucune donnée trouvée dans l\'API.');
                displayErrorMessage('Erreur : Aucune donnée trouvée dans l\'API.');
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des données depuis l\'API:', error);
            displayErrorMessage('Erreur : Impossible de récupérer les données.');
        }
    }

    // Initialisation : Vérifie l'API et récupère les données
    (async () => {
        const apiAccessible = await checkApiConnection();
        if (apiAccessible) {
            await fetchData();
        }
    })();

    // Gestion des clics pour afficher les sections
    items.forEach(item => {
        item.addEventListener('click', function () {
            items.forEach(i => i.classList.remove('active'));
            this.classList.add('active');

            const targetId = this.getAttribute('data-target');
            sections.forEach(section => section.classList.remove('active'));
            document.getElementById(targetId)?.classList.add('active');
        });
    });
});
