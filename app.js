// Schritt 1: Elemente aus dem HTML "greifen".
const spruchAnzeige = document.getElementById('spruch-anzeige');
const randomSpruchBtn = document.getElementById('random-spruch-btn');
const neuesSpruchForm = document.getElementById('neuer-spruch-form');
const spruchInput = document.getElementById('spruch-input');
const autorInput = document.getElementById('autor-input');
const spruchListe = document.getElementById('spruch-liste');
const charCountDisplay = document.getElementById('char-count-display');

// Schritt 2: Deine Daten. Füge hier gleich 2-3 deiner eigenen Lieblingssprüche hinzu!
let sprueche = [
    { text: "Der Weg ist das Ziel.", autor: "Konfuzius" },
    { text: "Phantasie ist wichtiger als Wissen, denn Wissen ist begrenzt.", autor: "Albert Einstein" },
    { text: "Das Leben ist kein Ponyhof" ,autor:"unbekannt"},
    { text: "Übung macht den Meister" ,autor:"unbekannt"},
    { text: "In der Ruhe liegt die Kraft" ,autor:"unbekannt"}
];

// Schritt 3: Eine Funktion, die deine Sprüche-Liste im HTML anzeigt.

function renderSprueche() {
    spruchListe.innerHTML = ''; 
    sprueche.forEach((spruch, index) => { 
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center'; 

        li.innerHTML = `
            <div>
                <p class="mb-1">"${spruch.text}"</p>
                <small class="text-muted fst-italic">- ${spruch.autor}</small>
            </div>
            <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">Löschen</button>
        `;

        
        const deleteButton = li.querySelector('.delete-btn');
        deleteButton.addEventListener('click', function() {
         
            sprueche.splice(index, 1);
          
            renderSprueche();
        });

        spruchListe.appendChild(li);
    });
}

// NEU: Funktion zum Aktualisieren des Zeichenzählers
function updateCharCounter() {
    const charCount = spruchInput.value.length;
    charCountDisplay.textContent = `${charCount} Zeichen`;
}


// Schritt 4: Auf das Absenden des Formulars reagieren.
neuesSpruchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const neuerSpruch = { text: spruchInput.value, autor: autorInput.value };
    sprueche.push(neuerSpruch);
    renderSprueche();
    neuesSpruchForm.reset();
});

// Schritt 5: Auf den Klick des "Zufalls-Button" reagieren.
randomSpruchBtn.addEventListener('click', function() {
    const zufallsIndex = Math.floor(Math.random() * sprueche.length);
    const zufallsSpruch = sprueche[zufallsIndex];
    spruchAnzeige.innerHTML = `
        <p>"${zufallsSpruch.text}"</p>
        <footer class="blockquote-footer">${zufallsSpruch.autor}</footer>
    `;
});

spruchInput.addEventListener('input', updateCharCounter);
neuesSpruchForm.reset();
updateCharCounter(); 

// Initialer Aufruf: Die Liste beim Start der Seite laden.
renderSprueche();
