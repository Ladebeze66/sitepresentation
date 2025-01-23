document.querySelector('form').addEventListener('submit', function(e) {
    const name = document.querySelector('#name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const message = document.querySelector('#message').value.trim();

    if (!name || !email || !message) {
        e.preventDefault();
        alert('Veuillez remplir tous les champs.');
    }
});
