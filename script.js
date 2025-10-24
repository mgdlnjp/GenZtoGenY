// Dictionnaire de traduction Gen Z vers Gen Y
const translationDictionary = {
    // Expressions populaires
    'slay': 'c\'est génial / tu assures',
    'frr': 'franchement / vraiment',
    'fr': 'franchement / vraiment',
    'no cap': 'sans mentir / vraiment',
    'cap': 'mensonge',
    'bussin': 'délicieux / excellent',
    'sheesh': 'wow / incroyable',
    'based': 'authentique / qui assume ses opinions',
    'cringe': 'gênant / embarrassant',
    'simp': 'quelqu\'un qui en fait trop pour séduire',
    'stan': 'être fan obsédé',
    'vibe': 'ambiance / feeling',
    'mood': 'je ressens la même chose',
    'lowkey': 'discrètement / un peu',
    'highkey': 'clairement / vraiment',
    'lit': 'génial / incroyable',
    'fire': 'super / génial',
    'goat': 'le/la meilleur(e) (greatest of all time)',
    'tea': 'potins / ragots',
    'spill the tea': 'raconte les potins',
    'salty': 'vexé / amer',
    'savage': 'brutal / sans pitié',
    'flex': 'se vanter / frimer',
    'ghosting': 'ignorer quelqu\'un soudainement',
    'simp': 'être trop gentil pour séduire',
    'karen': 'personne difficile qui se plaint',
    'ok boomer': 'ok grand-père/grand-mère (réponse condescendante)',
    'bet': 'd\'accord / ok',
    'snatched': 'parfait / impeccable',
    'slaps': 'c\'est vraiment bon (musique)',
    'bop': 'bonne chanson',
    'hits different': 'c\'est différent / spécial',
    'rent free': 'obsédé par (dans ma tête)',
    'main character': 'être le centre d\'attention',
    'npc': 'personne sans personnalité',
    'gaslighting': 'manipulation psychologique',
    'toxic': 'toxique / malsain',
    'red flag': 'signe d\'alerte / warning',
    'green flag': 'bon signe / point positif',
    'mid': 'moyen / pas terrible',
    'ratio': 'tu te fais ridiculiser',
    'w': 'victoire / win',
    'l': 'défaite / lose',
    'touch grass': 'sors dehors / déconnecte',
    'chronically online': 'toujours sur internet',
    'pick me': 'personne qui cherche l\'attention',
    'gatekeep': 'garder pour soi',
    'gaslight': 'manipuler',
    'girlboss': 'boss féminine / femme qui réussit',
    'ick': 'quelque chose de repoussant',
    'sus': 'suspect / louche',
    'bruh': 'mec / frère',
    'fam': 'famille / pote',
    'bestie': 'meilleur(e) ami(e)',
    'periodt': 'point final / c\'est dit',
    'slaying': 'tu assures / tu gères',
    'ate': 'a tout déchiré',
    'left no crumbs': 'a tout déchiré / parfait',
    'understood the assignment': 'a parfaitement compris / réussi',
    'this ain\'t it': 'ce n\'est pas ça',
    'it\'s giving': 'ça fait penser à',
    'not me': 'moi aussi / pareil',
    'the way': 'le fait que',
    'pls': 's\'il te plaît',
    'ikr': 'je sais pas vrai',
    'ngl': 'je ne vais pas mentir',
    'tbh': 'pour être honnête',
    'imo': 'à mon avis',
    'imho': 'à mon humble avis',
    'fomo': 'peur de rater quelque chose',
    'yolo': 'on ne vit qu\'une fois',
    'ootd': 'tenue du jour',
    'iykyk': 'si tu sais tu sais',
    'wdym': 'tu veux dire quoi',
    'smh': 'je secoue la tête (désapprobation)',
    'rn': 'maintenant / en ce moment',
    'af': 'extrêmement',
    'asap': 'dès que possible',
    'dm': 'message privé',
    'slide into dms': 'envoyer un message privé',
    'glow up': 'transformation positive',
    'drip': 'style / look',
    'rizz': 'charisme / capacité à séduire',
    'catch feelings': 'tomber amoureux',
    'situationship': 'relation floue (ni couple ni célibataire)',
    'down bad': 'désespérément amoureux',
    'simp for': 'craquer pour',
};

// Fonction pour afficher le dictionnaire
function displayDictionary() {
    const dictionaryList = document.getElementById('dictionaryList');

    // Trier les termes par ordre alphabétique
    const sortedTerms = Object.keys(translationDictionary).sort();

    sortedTerms.forEach(genZTerm => {
        const genYTerm = translationDictionary[genZTerm];

        const item = document.createElement('div');
        item.className = 'dictionary-item';

        item.innerHTML = `
            <div class="gen-z-term">${genZTerm}</div>
            <div class="gen-y-term">→ ${genYTerm}</div>
        `;

        dictionaryList.appendChild(item);
    });
}

// Fonction de traduction
function translateText() {
    const input = document.getElementById('genZInput').value;
    const output = document.getElementById('genYOutput');

    if (!input.trim()) {
        output.innerHTML = '<p class="placeholder">Veuillez entrer du texte à traduire...</p>';
        return;
    }

    let translatedText = input.toLowerCase();
    let foundTranslations = [];

    // Chercher les correspondances dans le dictionnaire
    for (const [genZ, genY] of Object.entries(translationDictionary)) {
        const regex = new RegExp('\\b' + genZ.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'gi');
        if (regex.test(translatedText)) {
            foundTranslations.push({ genZ, genY });
            translatedText = translatedText.replace(regex, `<strong>${genY}</strong>`);
        }
    }

    if (foundTranslations.length === 0) {
        output.innerHTML = `
            <p><strong>Texte original :</strong> ${input}</p>
            <p style="color: #ff6b6b; margin-top: 15px;">⚠️ Aucune expression Gen Z détectée dans ce texte.</p>
            <p style="color: #666; margin-top: 10px;">Essayez des mots comme : slay, frr, no cap, bussin, sheesh, etc.</p>
        `;
    } else {
        output.innerHTML = `
            <p style="margin-bottom: 15px;"><strong>Traduction :</strong></p>
            <p style="line-height: 1.8;">${translatedText}</p>
            <p style="margin-top: 20px; padding-top: 15px; border-top: 2px solid #e0e0e0; color: #667eea;">
                ✅ ${foundTranslations.length} expression(s) traduite(s)
            </p>
        `;
    }
}

// Fonction pour effacer
function clearAll() {
    document.getElementById('genZInput').value = '';
    document.getElementById('genYOutput').innerHTML = '<p class="placeholder">La traduction apparaîtra ici...</p>';
}

// Écouteurs d'événements
document.addEventListener('DOMContentLoaded', () => {
    // Afficher le dictionnaire au chargement
    displayDictionary();

    // Bouton traduire
    document.getElementById('translateBtn').addEventListener('click', translateText);

    // Bouton effacer
    document.getElementById('clearBtn').addEventListener('click', clearAll);

    // Traduction en appuyant sur Entrée (avec Ctrl)
    document.getElementById('genZInput').addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            e.preventDefault();
            translateText();
        }
    });
});
