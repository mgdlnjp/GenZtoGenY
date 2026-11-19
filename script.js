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

// ---------------------------------------------------------------------------
// Traduction : un seul passage sur le texte, expressions les plus longues d'abord
// (« no cap » avant « cap », « frr » avant « fr »). Le texte saisi n'est jamais
// injecté en HTML : tout est construit avec des nœuds texte.
// ---------------------------------------------------------------------------

const terms = Object.keys(translationDictionary).sort((a, b) => b.length - a.length);
const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const slangPattern = new RegExp(
    '(?<![\\p{L}\\p{N}])(' + terms.map(escapeRegex).join('|') + ')(?![\\p{L}\\p{N}])',
    'giu'
);

const $ = (id) => document.getElementById(id);
const input = $('genZInput');
const output = $('genYOutput');
const copyBtn = $('copyBtn');
const clearBtn = $('clearBtn');
let plainTranslation = '';

function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
}

function showEmpty(message) {
    output.replaceChildren(el('p', 'empty', message));
    copyBtn.hidden = true;
    plainTranslation = '';
}

function translateText() {
    const text = input.value;
    clearBtn.hidden = text === '';

    if (!text.trim()) {
        showEmpty("La traduction s'affiche ici dès que vous écrivez.");
        return;
    }

    const sentence = el('p', 'sentence');
    const found = new Map();
    let plain = '';
    let last = 0;

    for (const match of text.matchAll(slangPattern)) {
        const key = match[0].toLowerCase();
        const meaning = translationDictionary[key];
        const before = text.slice(last, match.index);
        sentence.append(before);
        const mark = el('mark', '', meaning);
        mark.title = match[0];
        sentence.append(mark);
        plain += before + meaning;
        found.set(key, meaning);
        last = match.index + match[0].length;
    }
    sentence.append(text.slice(last));
    plain += text.slice(last);

    if (found.size === 0) {
        const miss = el('p', 'miss');
        miss.append('Aucune expression Gen Z repérée. Essayez par exemple ');
        miss.append(el('strong', '', 'slay'), ', ', el('strong', '', 'no cap'), ' ou ', el('strong', '', 'bussin'), '.');
        output.replaceChildren(miss);
        copyBtn.hidden = true;
        plainTranslation = '';
        return;
    }

    const list = el('dl');
    found.forEach((meaning, key) => list.append(el('dt', '', key), el('dd', '', meaning)));
    const summary = el('div', 'found');
    summary.append(
        el('p', 'found-title', found.size === 1 ? '1 expression traduite' : `${found.size} expressions traduites`),
        list
    );

    output.classList.remove('fresh');
    void output.offsetWidth; // relance l'animation du surligneur
    output.classList.add('fresh');
    output.replaceChildren(sentence, summary);
    plainTranslation = plain;
    copyBtn.hidden = false;
    copyBtn.textContent = 'Copier';
}

function clearAll() {
    input.value = '';
    translateText();
    input.focus();
}

// ---------------------------------------------------------------------------
// Dictionnaire : regroupé par lettre, avec recherche sur l'expression ou le sens
// ---------------------------------------------------------------------------

const normalize = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

function displayDictionary(filter = '') {
    const list = $('dictionaryList');
    const query = normalize(filter.trim());
    const groups = new Map();

    Object.keys(translationDictionary)
        .sort((a, b) => a.localeCompare(b, 'fr'))
        .forEach((term) => {
            const meaning = translationDictionary[term];
            if (query && !normalize(term + ' ' + meaning).includes(query)) return;
            const letter = normalize(term[0]).toUpperCase();
            if (!groups.has(letter)) groups.set(letter, []);
            groups.get(letter).push([term, meaning]);
        });

    const blocks = [];
    groups.forEach((entries, letter) => {
        const block = el('div', 'letter');
        const dl = el('dl');
        entries.forEach(([term, meaning]) => {
            const row = el('div', 'entry');
            row.append(el('dt', '', term), el('dd', '', meaning));
            dl.append(row);
        });
        block.append(el('h3', '', letter), dl);
        blocks.push(block);
    });

    list.replaceChildren(...blocks);
    $('dictEmpty').hidden = blocks.length > 0;
}

// ---------------------------------------------------------------------------
// Écouteurs
// ---------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    const total = Object.keys(translationDictionary).length;
    document.querySelectorAll('[data-count]').forEach((n) => (n.textContent = total));
    displayDictionary();

    let timer;
    input.addEventListener('input', () => {
        clearTimeout(timer);
        timer = setTimeout(translateText, 250);
    });
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            translateText();
        }
    });

    $('translateBtn').addEventListener('click', translateText);
    clearBtn.addEventListener('click', clearAll);

    document.querySelectorAll('.example').forEach((btn) =>
        btn.addEventListener('click', () => {
            input.value = btn.textContent;
            translateText();
        })
    );

    copyBtn.addEventListener('click', () => {
        if (!plainTranslation) return;
        navigator.clipboard.writeText(plainTranslation).then(
            () => (copyBtn.textContent = 'Copié'),
            () => (copyBtn.textContent = 'Copie impossible')
        );
    });

    $('dictSearch').addEventListener('input', (e) => displayDictionary(e.target.value));
});
