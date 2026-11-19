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
    '(^|[^\\p{L}\\p{N}])(' + terms.map(escapeRegex).join('|') + ')(?=$|[^\\p{L}\\p{N}])',
    'giu'
);

// Découpe le texte en morceaux : { text } ou { slang, meaning }
function translate(text) {
    const parts = [];
    const found = new Map();
    let last = 0;
    for (const m of text.matchAll(slangPattern)) {
        const start = m.index + m[1].length;
        const word = m[2];
        const meaning = translationDictionary[word.toLowerCase()];
        if (start > last) parts.push({ text: text.slice(last, start) });
        parts.push({ slang: word, meaning });
        found.set(word.toLowerCase(), meaning);
        last = start + word.length;
    }
    if (last < text.length) parts.push({ text: text.slice(last) });
    return { parts, found };
}

// ---------------------------------------------------------------------------
// Conversation
// ---------------------------------------------------------------------------

const $ = (id) => document.getElementById(id);
const thread = $('thread');
const emptyState = $('threadEmpty');
const input = $('genZInput');
const sendBtn = $('translateBtn');
const clearBtn = $('clearBtn');

function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
}

function icon(name) {
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('width', '16');
    svg.setAttribute('height', '16');
    svg.setAttribute('aria-hidden', 'true');
    const use = document.createElementNS(ns, 'use');
    use.setAttribute('href', '#i-' + name);
    svg.append(use);
    return svg;
}

function copyButton(text) {
    const btn = el('button', 'tool');
    btn.type = 'button';
    const label = el('span', '', 'Copier');
    btn.append(icon('copy'), label);
    btn.addEventListener('click', () => {
        navigator.clipboard.writeText(text).then(
            () => {
                btn.replaceChildren(icon('check'), el('span', '', 'Copié'));
                setTimeout(() => btn.replaceChildren(icon('copy'), el('span', '', 'Copier')), 1800);
            },
            () => (label.textContent = 'Copie impossible')
        );
    });
    return btn;
}

function addExchange(text) {
    emptyState.hidden = true;
    clearBtn.hidden = false;

    const incoming = el('div', 'msg msg-in new');
    incoming.append(el('p', 'msg-label', 'Gen Z'), el('p', 'bubble', text));

    const { parts, found } = translate(text);
    const reply = el('div', 'msg msg-out new');

    if (found.size === 0) {
        reply.classList.add('miss');
        const bubble = el('p', 'bubble');
        bubble.append('Aucune expression Gen Z repérée dans ce message. Essayez par exemple ',
            el('strong', '', 'slay'), ', ', el('strong', '', 'no cap'), ' ou ', el('strong', '', 'bussin'), '.');
        reply.append(el('p', 'msg-label', 'Gen Y'), bubble);
    } else {
        const bubble = el('p', 'bubble');
        let plain = '';
        parts.forEach((part) => {
            if (part.text !== undefined) {
                bubble.append(part.text);
                plain += part.text;
            } else {
                const mark = el('mark', '', part.meaning);
                mark.title = part.slang;
                bubble.append(mark);
                plain += part.meaning;
            }
        });

        const gloss = el('ul', 'gloss');
        found.forEach((meaning, word) => {
            const li = el('li');
            li.append(el('b', '', word), ' : ' + meaning);
            gloss.append(li);
        });

        const tools = el('div', 'msg-tools');
        tools.append(copyButton(plain));

        const label = found.size === 1 ? 'Gen Y, 1 expression traduite' : `Gen Y, ${found.size} expressions traduites`;
        reply.append(el('p', 'msg-label', label), bubble, gloss, tools);
    }

    thread.append(incoming, reply);
    reply.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    thread.scrollTop = thread.scrollHeight;
}

function send() {
    const text = input.value.trim();
    if (!text) {
        input.focus();
        return;
    }
    addExchange(text);
    input.value = '';
    autosize();
    updateSend();
    input.focus();
}

function clearConversation() {
    thread.querySelectorAll('.msg').forEach((m) => m.remove());
    emptyState.hidden = false;
    clearBtn.hidden = true;
    input.focus();
}

function autosize() {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 180) + 'px';
}

function updateSend() {
    sendBtn.disabled = input.value.trim() === '';
}

// ---------------------------------------------------------------------------
// Dictionnaire : regroupé par lettre, avec recherche sur l'expression ou le sens
// ---------------------------------------------------------------------------

const normalize = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

function displayDictionary(filter = '') {
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

    $('dictionaryList').replaceChildren(...blocks);
    $('dictEmpty').hidden = blocks.length > 0;
}

// ---------------------------------------------------------------------------
// Écouteurs
// ---------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    const total = Object.keys(translationDictionary).length;
    document.querySelectorAll('[data-count]').forEach((n) => (n.textContent = total));
    displayDictionary();
    updateSend();

    $('composer').addEventListener('submit', (e) => {
        e.preventDefault();
        send();
    });
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
            e.preventDefault();
            send();
        }
    });
    input.addEventListener('input', () => {
        autosize();
        updateSend();
    });
    clearBtn.addEventListener('click', clearConversation);

    document.querySelectorAll('.example').forEach((btn) =>
        btn.addEventListener('click', () => addExchange(btn.textContent))
    );

    $('dictSearch').addEventListener('input', (e) => displayDictionary(e.target.value));
});
