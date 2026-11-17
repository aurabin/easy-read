// Easy Read readability checker.
// Plain JavaScript. No dependencies. Works in Node 18+ and Bun.
//
// Usage:
//   node readability.mjs file.md
//   node readability.mjs --lang de file.md
//   node readability.mjs --json file.md
//   node readability.mjs --list-languages
//   cat file.md | node readability.mjs
//
// The check is a heuristic. It finds long sentences, hard words, idioms,
// passive voice, and long words. It does not understand meaning.

const SCORE_FLOOR = 0;

const EN_MESSAGES = {
  title: "Easy Read check: {score}/100 ({grade})",
  stats:
    "Sentences: {sentences} | Words: {words} | Average: {avg} words per sentence",
  fixThese: "Fix these:",
  allGood: "No problems found. Nice and easy to read.",
  more: "...and {n} more.",
  aim: "Aim for {limit} words or fewer per sentence. You are at {avg}.",
  longSentence: 'Long sentence ({count} words). Split it: "{quote}"',
  hardWord: 'Hard word: "{word}". Try "{easy}".',
  idiom: 'Idiom: "{word}". Say it plainly.',
  passive: 'Passive voice: "{word}". Say who does it.',
  longWord: 'Long word: "{word}". Is there a shorter word?',
};

const LANGUAGES = {
  en: {
    name: "English",
    sentenceLimit: 12,
    longWord: 12,
    grades: ["easy", "mostly easy", "needs work", "hard to read"],
    hints: [],
    stopwords: [
      "the", "and", "you", "to", "of", "is", "are", "for", "with", "that",
      "this", "it", "in", "on", "we", "they", "not", "have", "will", "can",
      "your", "from", "at", "be", "was", "were", "as", "by",
    ],
    hardWords: [
      ["utilize", "use"],
      ["utilise", "use"],
      ["commence", "start"],
      ["terminate", "end"],
      ["approximately", "about"],
      ["sufficient", "enough"],
      ["additional", "extra"],
      ["assist", "help"],
      ["obtain", "get"],
      ["purchase", "buy"],
      ["require", "need"],
      ["initiate", "start"],
      ["demonstrate", "show"],
      ["facilitate", "help"],
      ["implement", "do, set up"],
      ["subsequent", "next"],
      ["prior", "before"],
      ["numerous", "many"],
      ["indicate", "show"],
      ["modify", "change"],
      ["verify", "check"],
      ["ensure", "make sure"],
      ["determine", "find out"],
      ["participate", "take part"],
      ["configuration", "setup"],
      ["documentation", "instructions"],
      ["repository", "project folder"],
      ["deploy", "put online"],
      ["compile", "build"],
      ["execute", "run"],
      ["parameter", "setting"],
      ["dependency", "something the code needs"],
      ["asynchronous", "not at the same time"],
      ["credentials", "sign-in details"],
      ["authentication", "sign in"],
      ["directory", "folder"],
      ["terminal", "the black window where you type commands"],
      ["leverage", "use"],
      ["optimize", "make better"],
      ["stakeholder", "person with an interest"],
      ["deliverable", "what we will finish"],
      ["bandwidth", "time and energy"],
      ["in order to", "to"],
      ["prior to", "before"],
      ["with regard to", "about"],
      ["at this point in time", "now"],
      ["a number of", "some"],
      ["in the event that", "if"],
      ["due to the fact that", "because"],
      ["touch base", "talk soon"],
      ["circle back", "talk again later"],
      ["deep dive", "close look"],
      ["low-hanging fruit", "easy jobs first"],
      ["move the needle", "make a real change"],
    ],
    idioms: [
      "a piece of cake",
      "break the ice",
      "hit the nail on the head",
      "under the weather",
      "once in a blue moon",
      "ballpark figure",
      "in a nutshell",
      "bite the bullet",
      "on the same page",
      "cut corners",
      "pull strings",
      "rule of thumb",
      "cost an arm and a leg",
      "let the cat out of the bag",
      "spill the beans",
      "back to square one",
      "keep an eye on",
      "wrap your head around",
      "no brainer",
      "long story short",
      "easier said than done",
    ],
    abbreviations: [
      ["e.g.", "eg"], ["i.e.", "ie"], ["etc.", "etc"], ["vs.", "vs"],
      ["Dr.", "Dr"], ["Mr.", "Mr"], ["Mrs.", "Mrs"], ["Ms.", "Ms"],
      ["St.", "St"],
    ],
    passive:
      "\\b(?:am|is|are|was|were|be|been|being)\\s+(?!(?:often|open|even|seven|eleven|ten|then|when|garden|golden|wooden|children|women|men|chicken|kitchen|oven|sudden|red|bed|need|feed|speed|hundred)\\b)([\\p{L}]+(?:ed|en))\\b",
    messages: EN_MESSAGES,
  },

  de: {
    name: "Deutsch",
    sentenceLimit: 12,
    longWord: 14,
    grades: ["leicht", "fast leicht", "geht besser", "schwer zu lesen"],
    hints: ["ä", "ö", "ü", "ß"],
    stopwords: [
      "der", "die", "das", "und", "ist", "nicht", "mit", "für", "sie", "ein",
      "eine", "zu", "den", "dem", "des", "wir", "ihr", "ich", "du", "auf",
      "von", "bei", "auch", "aber", "oder", "wenn", "dann", "wie", "was",
      "im", "am", "zum", "zur", "sich", "es", "hat", "haben", "wird", "werden",
    ],
    hardWords: [
      ["behördlich", "von der behörde"],
      ["genehmigung", "erlaubnis"],
      ["unverzüglich", "sofort"],
      ["gegebenenfalls", "vielleicht"],
      ["hinsichtlich", "zu"],
      ["bezüglich", "zu"],
      ["infolgedessen", "deshalb"],
      ["sämtliche", "alle"],
      ["erforderlich", "nötig"],
      ["zuständig", "verantwortlich"],
      ["mitteilung", "nachricht"],
      ["aufforderung", "bitte"],
      ["voraussetzung", "was du brauchst"],
      ["aufwandsentschädigung", "geld für deine zeit"],
      ["barrierefreiheit", "gut für alle"],
      ["teilhabe", "dabeisein"],
      ["selbstbestimmung", "selbst entscheiden"],
      ["unterstützung", "hilfe"],
      ["veranstaltung", "treffen"],
      ["öffnungszeiten", "wann offen"],
      ["rückmeldung", "antwort"],
      ["anmeldung", "anmelden"],
      ["bestätigung", "antwort, dass es da ist"],
      ["frist", "letzter tag"],
      ["antrag", "bitte um erlaubnis"],
      ["bescheid", "antwort von der behörde"],
      ["in die wege leiten", "starten"],
      ["auf den weg bringen", "starten"],
    ],
    idioms: [
      "daumen drücken",
      "ins kalte wasser springen",
      "die katze aus dem sack lassen",
      "tomaten auf den augen haben",
      "auf großem fuß leben",
      "auf dem schirm haben",
      "um die ecke denken",
      "zwei fliegen mit einer klappe schlagen",
    ],
    abbreviations: [
      ["z. B.", "zb"], ["z.B.", "zb"], ["u. a.", "ua"], ["u.a.", "ua"],
      ["bzw.", "bzw"], ["usw.", "usw"], ["ca.", "ca"], ["Nr.", "Nr"],
      ["Str.", "Str"], ["Abs.", "Abs"], ["Art.", "Art"], ["Dr.", "Dr"],
    ],
    passive:
      "\\b(?:wird|werden|wurde|wurden)\\s+((?:ge[\\p{L}]+(?:t|en))|(?:[\\p{L}]+iert))\\b",
    messages: {
      title: "Leichte-Sprache-Prüfung: {score}/100 ({grade})",
      stats:
        "Sätze: {sentences} | Wörter: {words} | Durchschnitt: {avg} Wörter pro Satz",
      fixThese: "Das solltest du ändern:",
      allGood: "Keine Probleme gefunden. Gut lesbar.",
      more: "...und {n} weitere.",
      aim: "Ziel: höchstens {limit} Wörter pro Satz. Du bist bei {avg}.",
      longSentence: 'Langer Satz ({count} Wörter). Teile ihn: "{quote}"',
      hardWord: 'Schweres Wort: "{word}". Besser: "{easy}".',
      idiom: 'Redewendung: "{word}". Sag es einfach.',
      passive: 'Passiv: "{word}". Sag, wer es macht.',
      longWord: 'Langes Wort: "{word}". Gibt es ein kürzeres Wort?',
    },
  },

  es: {
    name: "Español",
    sentenceLimit: 12,
    longWord: 13,
    grades: ["fácil", "casi fácil", "necesita trabajo", "difícil de leer"],
    hints: ["ñ", "¿", "¡"],
    stopwords: [
      "el", "la", "los", "las", "y", "es", "que", "para", "con", "una", "un",
      "no", "se", "del", "por", "su", "sus", "al", "como", "más", "pero",
      "este", "esta", "son", "fue", "hay", "también", "cuando", "donde",
    ],
    hardWords: [
      ["aproximadamente", "más o menos"],
      ["adicional", "más"],
      ["obtener", "conseguir"],
      ["requerir", "necesitar"],
      ["iniciar", "empezar"],
      ["finalizar", "terminar"],
      ["demostrar", "mostrar"],
      ["facilitar", "ayudar"],
      ["implementar", "hacer"],
      ["posterior", "después"],
      ["previo", "antes"],
      ["numerosos", "muchos"],
      ["indicar", "decir"],
      ["modificar", "cambiar"],
      ["verificar", "comprobar"],
      ["determinar", "decidir"],
      ["configuración", "ajustes"],
      ["documentación", "instrucciones"],
      ["dependencia", "lo que necesita"],
      ["solicitar", "pedir"],
      ["domicilio", "casa"],
      ["cumplimentar", "rellenar"],
      ["en virtud de", "por"],
      ["a fin de", "para"],
      ["no obstante", "pero"],
      ["asistencia", "ayuda"],
    ],
    idioms: [
      "estar en las nubes",
      "tomar el pelo",
      "meter la pata",
      "costar un ojo de la cara",
      "ponerse las botas",
      "echar una mano",
      "dar largas",
      "irse por las ramas",
    ],
    abbreviations: [
      ["p. ej.", "pej"], ["etc.", "etc"], ["Sr.", "Sr"], ["Sra.", "Sra"],
      ["Dr.", "Dr"], ["Dra.", "Dra"], ["núm.", "núm"], ["aprox.", "aprox"],
    ],
    passive:
      "\\b(?:fue|fueron|es|son|era|eran|será|serán)\\s+([\\p{L}]+(?:ado|ada|ados|adas|ido|ida|idos|idas))\\b",
    messages: {
      title: "Prueba de lectura fácil: {score}/100 ({grade})",
      stats:
        "Frases: {sentences} | Palabras: {words} | Media: {avg} palabras por frase",
      fixThese: "Cambia esto:",
      allGood: "No hay problemas. Se lee bien.",
      more: "...y {n} más.",
      aim: "Meta: {limit} palabras o menos por frase. Tienes {avg}.",
      longSentence: 'Frase larga ({count} palabras). Divídela: "{quote}"',
      hardWord: 'Palabra difícil: "{word}". Mejor: "{easy}".',
      idiom: 'Expresión: "{word}". Dilo de forma simple.',
      passive: 'Pasiva: "{word}". Di quién lo hace.',
      longWord: 'Palabra larga: "{word}". ¿Hay una más corta?',
    },
  },

  fr: {
    name: "Français",
    sentenceLimit: 12,
    longWord: 13,
    grades: ["facile", "presque facile", "à retravailler", "difficile à lire"],
    hints: ["ç", "œ"],
    stopwords: [
      "le", "la", "les", "et", "est", "que", "pour", "avec", "une", "un",
      "pas", "des", "du", "dans", "sur", "au", "aux", "ce", "cette", "sont",
      "vous", "nous", "il", "elle", "plus", "mais", "ou", "quand", "comme",
      "être", "avoir", "fait", "par",
    ],
    hardWords: [
      ["effectuer", "faire"],
      ["environ", "à peu près"],
      ["supplémentaire", "en plus"],
      ["obtenir", "avoir"],
      ["nécessiter", "avoir besoin"],
      ["débuter", "commencer"],
      ["terminer", "finir"],
      ["démontrer", "montrer"],
      ["faciliter", "aider"],
      ["mettre en œuvre", "faire"],
      ["ultérieur", "après"],
      ["préalable", "avant"],
      ["nombreux", "beaucoup de"],
      ["indiquer", "dire"],
      ["modifier", "changer"],
      ["vérifier", "contrôler"],
      ["assurer", "faire en sorte"],
      ["déterminer", "trouver"],
      ["configuration", "réglages"],
      ["documentation", "mode d'emploi"],
      ["dépendance", "ce qu'il faut"],
      ["solliciter", "demander"],
      ["domicile", "chez soi"],
      ["auprès de", "chez"],
      ["assistance", "aide"],
    ],
    idioms: [
      "coûter les yeux de la tête",
      "poser un lapin",
      "tomber dans les pommes",
      "avoir du pain sur la planche",
      "mettre les points sur les i",
      "tourner autour du pot",
      "avoir le bras long",
    ],
    abbreviations: [
      ["p. ex.", "pex"], ["etc.", "etc"], ["Mme", "Mme"], ["M.", "M"],
      ["Dr", "Dr"], ["env.", "env"],
    ],
    passive:
      "\\b(?:est|sont|était|étaient|sera|seront)\\s+([\\p{L}]+(?:é|ée|és|ées))\\b",
    messages: {
      title: "Test de lecture facile : {score}/100 ({grade})",
      stats:
        "Phrases : {sentences} | Mots : {words} | Moyenne : {avg} mots par phrase",
      fixThese: "À corriger :",
      allGood: "Aucun problème. Le texte se lit bien.",
      more: "...et {n} autres.",
      aim: "Objectif : {limit} mots ou moins par phrase. Tu es à {avg}.",
      longSentence: 'Phrase longue ({count} mots). Coupe-la : « {quote} »',
      hardWord: 'Mot difficile : « {word} ». Dis « {easy} ».',
      idiom: "Expression : « {word} ». Dis-le simplement.",
      passive: "Passif : « {word} ». Dis qui fait l'action.",
      longWord: "Mot long : « {word} ». Un mot plus court existe ?",
    },
  },

  pt: {
    name: "Português",
    sentenceLimit: 12,
    longWord: 13,
    grades: ["fácil", "quase fácil", "precisa melhorar", "difícil de ler"],
    hints: ["ã", "õ"],
    stopwords: [
      "o", "a", "os", "as", "e", "é", "que", "para", "com", "uma", "um",
      "não", "se", "do", "da", "dos", "das", "em", "no", "na", "por", "mais",
      "mas", "como", "você", "quando", "onde", "também", "ao",
    ],
    hardWords: [
      ["utilizar", "usar"],
      ["aproximadamente", "mais ou menos"],
      ["adicional", "extra"],
      ["obter", "conseguir"],
      ["requerer", "precisar"],
      ["iniciar", "começar"],
      ["finalizar", "terminar"],
      ["demonstrar", "mostrar"],
      ["facilitar", "ajudar"],
      ["implementar", "fazer"],
      ["posterior", "depois"],
      ["prévio", "antes"],
      ["numerosos", "muitos"],
      ["indicar", "dizer"],
      ["modificar", "mudar"],
      ["verificar", "conferir"],
      ["determinar", "decidir"],
      ["configuração", "ajustes"],
      ["documentação", "instruções"],
      ["dependência", "o que precisa"],
      ["solicitar", "pedir"],
      ["domicílio", "casa"],
      ["preencher", "escrever nos espaços"],
      ["no entanto", "mas"],
      ["a fim de", "para"],
      ["assistência", "ajuda"],
    ],
    idioms: [
      "custar os olhos da cara",
      "chutar o balde",
      "estar com a pulga atrás da orelha",
      "fazer uma vaquinha",
      "dar com a língua nos dentes",
      "meter os pés pelas mãos",
    ],
    abbreviations: [
      ["p. ex.", "pex"], ["etc.", "etc"], ["Sr.", "Sr"], ["Sra.", "Sra"],
      ["Dr.", "Dr"], ["Dra.", "Dra"], ["aprox.", "aprox"],
    ],
    passive:
      "\\b(?:foi|foram|é|são|era|eram|será|serão)\\s+([\\p{L}]+(?:ado|ada|ados|adas|ido|ida|idos|idas))\\b",
    messages: {
      title: "Teste de leitura fácil: {score}/100 ({grade})",
      stats:
        "Frases: {sentences} | Palavras: {words} | Média: {avg} palavras por frase",
      fixThese: "Corrige isto:",
      allGood: "Sem problemas. Lê-se bem.",
      more: "...e mais {n}.",
      aim: "Meta: {limit} palavras ou menos por frase. Estás em {avg}.",
      longSentence: 'Frase longa ({count} palavras). Divide-a: "{quote}"',
      hardWord: 'Palavra difícil: "{word}". Usa "{easy}".',
      idiom: 'Expressão: "{word}". Diz de forma simples.',
      passive: 'Passiva: "{word}". Diz quem faz.',
      longWord: 'Palavra longa: "{word}". Há uma mais curta?',
    },
  },

  it: {
    name: "Italiano",
    sentenceLimit: 12,
    longWord: 13,
    grades: ["facile", "quasi facile", "da migliorare", "difficile da leggere"],
    hints: ["ì", "ò"],
    stopwords: [
      "il", "la", "gli", "le", "e", "è", "che", "per", "con", "una", "un",
      "non", "di", "del", "della", "dei", "sono", "come", "più", "ma", "si",
      "anche", "quando", "dove", "questo", "questa", "hai", "ha",
    ],
    hardWords: [
      ["utilizzare", "usare"],
      ["circa", "più o meno"],
      ["aggiuntivo", "in più"],
      ["ottenere", "avere"],
      ["richiedere", "chiedere"],
      ["iniziare", "cominciare"],
      ["terminare", "finire"],
      ["dimostrare", "mostrare"],
      ["facilitare", "aiutare"],
      ["implementare", "fare"],
      ["successivo", "dopo"],
      ["precedente", "prima"],
      ["numerosi", "molti"],
      ["indicare", "dire"],
      ["modificare", "cambiare"],
      ["verificare", "controllare"],
      ["determinare", "decidere"],
      ["configurazione", "impostazioni"],
      ["documentazione", "istruzioni"],
      ["dipendenza", "ciò che serve"],
      ["richiesta", "domanda"],
      ["domicilio", "casa"],
      ["compilare", "riempire"],
      ["tuttavia", "ma"],
      ["al fine di", "per"],
      ["assistenza", "aiuto"],
    ],
    idioms: [
      "costare un occhio della testa",
      "in bocca al lupo",
      "prendere in giro",
      "avere le mani in pasta",
      "fare il passo più lungo della gamba",
      "non vedo l'ora",
    ],
    abbreviations: [
      ["per es.", "peres"], ["ecc.", "ecc"], ["Sig.", "Sig"],
      ["Dott.", "Dott"],
    ],
    passive:
      "\\b(?:è|sono|era|erano|sarà|saranno)\\s+([\\p{L}]+(?:ato|ata|ati|ate|ito|ita|iti|ite|uto|uta|uti|ute))\\b",
    messages: {
      title: "Controllo lettura facile: {score}/100 ({grade})",
      stats:
        "Frasi: {sentences} | Parole: {words} | Media: {avg} parole per frase",
      fixThese: "Correggi questo:",
      allGood: "Nessun problema. Si legge bene.",
      more: "...e altri {n}.",
      aim: "Obiettivo: {limit} parole o meno per frase. Sei a {avg}.",
      longSentence: 'Frase lunga ({count} parole). Dividila: "{quote}"',
      hardWord: 'Parola difficile: "{word}". Meglio: "{easy}".',
      idiom: 'Modo di dire: "{word}". Dillo in modo semplice.',
      passive: "Passivo: «{word}». Di' chi lo fa.",
      longWord: 'Parola lunga: "{word}". C\'è una parola più corta?',
    },
  },
};

export const LANGUAGE_CODES = Object.keys(LANGUAGES);

const WORD = /[\p{L}][\p{L}\p{M}'’-]*/gu;

for (const profile of Object.values(LANGUAGES)) {
  profile.stopwordSet = new Set(profile.stopwords);
  profile.hardList = [...profile.hardWords].sort((a, b) => b[0].length - a[0].length);
  profile.passivePattern = new RegExp(profile.passive, "giu");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Unicode-safe word boundary: JS \b only knows ASCII letters.
function phrasePattern(phrase) {
  return new RegExp(
    `(?<![\\p{L}\\p{M}])${escapeRegExp(phrase)}(?![\\p{L}\\p{M}])`,
    "iu",
  );
}

function format(template, values) {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? ""));
}

export function detectLanguage(text) {
  const source = String(text ?? "");
  const lower = source.toLowerCase();
  const words = lower.match(WORD) ?? [];
  const scores = {};

  for (const [code, profile] of Object.entries(LANGUAGES)) {
    const seen = new Set();
    let score = 0;
    for (const word of words) {
      if (!profile.stopwordSet.has(word) || seen.has(word)) continue;
      seen.add(word);
      score += 1;
    }
    const hints = profile.hints.filter((hint) => lower.includes(hint));
    score += Math.min(3, hints.length);
    scores[code] = score;
  }

  let best = "en";
  let bestScore = -1;
  for (const [code, score] of Object.entries(scores)) {
    if (score > bestScore) {
      best = code;
      bestScore = score;
    }
  }

  // Too little signal: keep English rather than guess.
  if (bestScore < 2 && LANGUAGES[best] !== LANGUAGES.en) return "en";

  return best;
}

// Split Markdown or plain text into prose blocks.
// Headings, list items, table rows, and quotes are their own block.
// Fenced code is not prose, so it is skipped.
function textBlocks(text) {
  const lines = String(text ?? "").replace(/\r\n?/g, "\n").split("\n");
  const blocks = [];
  let current = [];
  let inFence = false;

  const flush = () => {
    if (current.length) {
      blocks.push(current.join(" ").trim());
      current = [];
    }
  };

  for (const line of lines) {
    if (/^\s*(```|~~~)/.test(line)) {
      flush();
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    if (!line.trim()) {
      flush();
      continue;
    }
    if (/^\s*(#{1,6}\s|[-*+]\s|\d+[.)]\s|>\s|\|)/.test(line)) {
      flush();
      const clean = line
        .replace(/^\s*#{1,6}\s+/, "")
        .replace(/^\s*([-*+]|\d+[.)]|>)\s+/, "")
        .trim();
      if (clean) blocks.push(clean);
      continue;
    }
    current.push(line.trim());
  }
  flush();
  return blocks;
}

function splitSentences(text, abbreviations) {
  const sentences = [];
  for (const block of textBlocks(text)) {
    let safe = block.replace(/\s+/g, " ").trim();
    if (!safe) continue;
    for (const [from, to] of abbreviations) {
      safe = safe.split(from).join(to);
    }
    const parts = safe
      .split(/(?<=[.!?])\s+(?=[A-ZÀ-Þ0-9"“'(«¡¿])/u)
      .map((sentence) => sentence.trim())
      .filter(Boolean);
    sentences.push(...parts);
  }
  return sentences;
}

function countWords(text) {
  return text.match(WORD)?.length ?? 0;
}

function shortQuote(text, limit = 80) {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length <= limit ? clean : `${clean.slice(0, limit - 1)}…`;
}

export function checkText(text, options = {}) {
  const source = String(text ?? "");
  const detected = detectLanguage(source);
  const warnings = [];

  let language = options.language ? String(options.language).toLowerCase() : detected;
  if (!LANGUAGES[language]) {
    warnings.push(`Unknown language "${options.language}". Using English.`);
    language = "en";
  }

  const profile = LANGUAGES[language];
  const maxWords = options.sentenceLimit ?? profile.sentenceLimit;
  const maxWordLength = profile.longWord;
  const m = profile.messages;

  const prose = textBlocks(source).join(" ");
  const sentences = splitSentences(source, profile.abbreviations);
  const words = countWords(prose);
  const avgSentence = sentences.length ? words / sentences.length : 0;
  const lower = source.toLowerCase();

  const issues = [];
  let score = 100;

  const longSentences = sentences.filter(
    (sentence) => countWords(sentence) > maxWords,
  );
  for (const sentence of longSentences) {
    issues.push({
      type: "long-sentence",
      message: format(m.longSentence, {
        count: countWords(sentence),
        quote: shortQuote(sentence),
      }),
    });
  }
  score -= Math.min(30, longSentences.length * 6);

  const seenWords = new Set();
  const seenPhrases = [];
  for (const [hard, easy] of profile.hardList) {
    if (seenWords.has(hard)) continue;
    if (!phrasePattern(hard).test(lower)) continue;

    const insidePhrase = seenPhrases.some((phrase) => phrase.includes(hard));
    if (insidePhrase) continue;

    seenWords.add(hard);
    if (hard.includes(" ")) seenPhrases.push(hard);

    issues.push({
      type: "hard-word",
      message: format(m.hardWord, { word: hard, easy }),
    });
  }
  score -= Math.min(30, seenWords.size * 5);

  const seenIdioms = new Set();
  for (const idiom of profile.idioms) {
    if (!phrasePattern(idiom).test(lower)) continue;
    seenIdioms.add(idiom);
    issues.push({
      type: "idiom",
      message: format(m.idiom, { word: idiom }),
    });
  }
  score -= Math.min(18, seenIdioms.size * 6);

  const passive = [...source.matchAll(profile.passivePattern)];
  for (const match of passive.slice(0, 5)) {
    issues.push({
      type: "passive",
      message: format(m.passive, { word: match[0] }),
    });
  }
  score -= Math.min(18, passive.length * 6);

  const longWords = new Set();
  for (const word of source.match(WORD) ?? []) {
    if (word.length <= maxWordLength) continue;
    const key = word.toLowerCase();
    if (LANGUAGES[language].hardWords.some(([hard]) => hard === key)) continue;
    if (longWords.has(key)) continue;
    longWords.add(key);
    issues.push({
      type: "long-word",
      message: format(m.longWord, { word }),
    });
  }
  score -= Math.min(12, longWords.size * 2);

  const finalScore = Math.max(SCORE_FLOOR, Math.min(100, Math.round(score)));
  const grade = gradeFor(finalScore, profile);

  const stats = {
    sentences: sentences.length,
    words,
    averageSentenceWords: Math.round(avgSentence * 10) / 10,
    longSentences: longSentences.length,
    hardWords: seenWords.size,
    idioms: seenIdioms.size,
    passiveVoice: passive.length,
    longWords: longWords.size,
  };

  const report = renderReport({
    score: finalScore,
    grade,
    stats,
    issues,
    messages: m,
    maxWords,
  });

  return {
    score: finalScore,
    grade,
    language,
    detected,
    warnings,
    stats,
    issues,
    report,
    text: report,
  };
}

function gradeFor(score, profile) {
  if (score >= 85) return profile.grades[0];
  if (score >= 70) return profile.grades[1];
  if (score >= 55) return profile.grades[2];
  return profile.grades[3];
}

function renderReport({ score, grade, stats, issues, messages, maxWords }) {
  const lines = [];
  lines.push(format(messages.title, { score, grade }));
  lines.push("");
  lines.push(
    format(messages.stats, {
      sentences: stats.sentences,
      words: stats.words,
      avg: stats.averageSentenceWords,
    }),
  );

  const shown = issues.slice(0, 12);
  if (shown.length) {
    lines.push("");
    lines.push(messages.fixThese);
    for (const issue of shown) lines.push(`- ${issue.message}`);
    if (issues.length > shown.length) {
      lines.push(`- ${format(messages.more, { n: issues.length - shown.length })}`);
    }
  } else {
    lines.push("");
    lines.push(messages.allGood);
  }

  if (stats.averageSentenceWords > maxWords) {
    lines.push("");
    lines.push(
      format(messages.aim, { limit: maxWords, avg: stats.averageSentenceWords }),
    );
  }

  return lines.join("\n");
}

function readStdin() {
  return new Promise((resolve) => {
    let data = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => {
      data += chunk;
    });
    process.stdin.on("end", () => resolve(data));
  });
}

const HELP = `Easy Read checker

  readability.mjs [options] [file]
  cat file.md | readability.mjs [options]

Options:
  --lang <code>       Force a language: ${LANGUAGE_CODES.join(", ")}
  --json              Print the full result as JSON
  --list-languages    Show the supported languages
  --help              Show this help
`;

async function main(argv) {
  let json = false;
  let file;
  let language;

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--json") json = true;
    else if (arg === "--help" || arg === "-h") {
      process.stdout.write(HELP);
      return;
    } else if (arg === "--list-languages") {
      for (const [code, profile] of Object.entries(LANGUAGES)) {
        process.stdout.write(`${code}\t${profile.name}\n`);
      }
      return;
    } else if (arg === "--lang") {
      language = argv[i + 1];
      i += 1;
    } else if (arg.startsWith("--lang=")) {
      language = arg.slice("--lang=".length);
    } else if (arg.startsWith("--")) {
      throw new Error(`Unknown option: ${arg}`);
    } else {
      file = arg;
    }
  }

  let text = "";
  if (file) {
    const { readFile } = await import("node:fs/promises");
    text = await readFile(file, "utf8");
  } else {
    text = await readStdin();
  }

  const result = checkText(text, language ? { language } : {});
  if (json) {
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  } else {
    process.stdout.write(`${result.report}\n`);
  }
  process.exitCode = result.score >= 70 ? 0 : 1;
}

const invokedDirectly =
  typeof process !== "undefined" &&
  process.argv?.[1] &&
  (() => {
    const name = process.argv[1].replace(/\\/g, "/").split("/").pop();
    return name === "readability.mjs" || name === "readability.js";
  })();

if (invokedDirectly) {
  main(process.argv.slice(2)).catch((error) => {
    console.error(error?.message ?? String(error));
    process.exitCode = 1;
  });
}
