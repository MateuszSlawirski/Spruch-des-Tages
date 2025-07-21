// Schritt 1: Elemente aus dem HTML "greifen".
const spruchAnzeige = document.getElementById('spruch-anzeige');
const randomSpruchBtn = document.getElementById('random-spruch-btn');
const neuesSpruchForm = document.getElementById('neuer-spruch-form');
const spruchInput = document.getElementById('spruch-input');
const autorInput = document.getElementById('autor-input');
const spruchListe = document.getElementById('spruch-liste');
const charCountDisplay = document.getElementById('char-count-display');

// Schritt 2: Deine Daten. Füge hier gleich 2-3 deiner eigenen Lieblingssprüche hinzu!


async function ladeSprueche() {
    const res = await fetch('http://localhost:3000/api/sprueche');
    const daten = await res.json();
    renderSprueche(daten); // Übergib die Sprüche an die Anzeige-Funktion
}

function renderSprueche(sprueche) {
    spruchListe.innerHTML = '';

    sprueche.forEach((spruch) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center'; 

        li.innerHTML = `
            <div>
                <p class="mb-1">"${spruch.text}"</p>
                <small class="text-muted fst-italic">- ${spruch.autor}</small>
            </div>
            <button class="btn btn-danger btn-sm delete-btn" data-id="${spruch.id}">Löschen</button>
        `;

        const deleteButton = li.querySelector('.delete-btn');
        deleteButton.addEventListener('click', function() {
            spruchLoeschen(spruch.id);
        });

        spruchListe.appendChild(li);
    });
}

async function spruchLoeschen(id) {
    await fetch(`http://localhost:3000/api/sprueche/${id}`, {
        method: 'DELETE'
    });
    ladeSprueche(); // Aktualisiere die Liste
}

neuesSpruchForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const neuerSpruch = {
        text: spruchInput.value,
        autor: autorInput.value
    };

    await fetch('http://localhost:3000/api/sprueche', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(neuerSpruch)
    });

    neuesSpruchForm.reset();
    updateCharCounter();
    ladeSprueche();
});

randomSpruchBtn.addEventListener('click', async function() {
    const res = await fetch('http://localhost:3000/api/sprueche');
    const sprueche = await res.json();
    const zufallsIndex = Math.floor(Math.random() * sprueche.length);
    const zufallsSpruch = sprueche[zufallsIndex];

    spruchAnzeige.innerHTML = `
        <p>"${zufallsSpruch.text}"</p>
        <footer class="blockquote-footer">${zufallsSpruch.autor}</footer>
    `;
});

// Schritt 3: Eine Funktion, die deine Sprüche-Liste im HTML anzeigt.




// NEU: Funktion zum Aktualisieren des Zeichenzählers
function updateCharCounter() {
    const charCount = spruchInput.value.length;
    charCountDisplay.textContent = `${charCount} Zeichen`;
}


// Schritt 4: Auf das Absenden des Formulars reagieren.


// Schritt 5: Auf den Klick des "Zufalls-Button" reagieren.


spruchInput.addEventListener('input', updateCharCounter);
neuesSpruchForm.reset();
updateCharCounter(); 

// Initialer Aufruf: Die Liste beim Start der Seite laden.
//renderSprueche();

ladeSprueche(); 

