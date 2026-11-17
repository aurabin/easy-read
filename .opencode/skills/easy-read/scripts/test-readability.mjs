// Tests for the Easy Read checker.
// Run: node scripts/test-readability.mjs

import assert from "node:assert/strict";
import { checkText, detectLanguage, LANGUAGE_CODES } from "./readability.mjs";

let passed = 0;
const failures = [];

function test(name, fn) {
  try {
    fn();
    passed += 1;
  } catch (error) {
    failures.push({ name, error });
  }
}

test("supported languages", () => {
  assert.deepEqual(LANGUAGE_CODES, ["en", "de", "es", "fr", "pt", "it", "zh"]);
});

test("detects English", () => {
  assert.equal(
    detectLanguage("The cat is on the mat. You can see it. It is not far."),
    "en",
  );
});

test("detects German", () => {
  assert.equal(
    detectLanguage("Der Hund ist im Haus. Die Tür ist zu. Wir sind nicht da."),
    "de",
  );
});

test("detects Spanish", () => {
  assert.equal(
    detectLanguage("La casa es grande. El perro está aquí. No hay nadie."),
    "es",
  );
});

test("detects French", () => {
  assert.equal(
    detectLanguage(
      "Le chat est dans la maison. La porte est fermée. Nous ne sommes pas là.",
    ),
    "fr",
  );
});

test("detects Portuguese", () => {
  assert.equal(
    detectLanguage("O gato está em casa. A porta é grande. Não há ninguém."),
    "pt",
  );
});

test("detects Italian", () => {
  assert.equal(
    detectLanguage("Il gatto è in casa. La porta è chiusa. Non c'è nessuno."),
    "it",
  );
});

test("detects Chinese", () => {
  assert.equal(detectLanguage("我们在家里。这是一个好日子。你怎么看？"), "zh");
});

test("Chinese uses full stops and counts characters", () => {
  const result = checkText("我们在家里。这是一个好日子。你怎么看？", {
    language: "zh",
  });
  assert.equal(result.language, "zh");
  assert.ok(result.stats.words > 0);
  assert.ok(result.stats.sentences === 3);
});

test("Chinese hard word is flagged", () => {
  const result = checkText("请使用这个系统。", { language: "zh" });
  assert.ok(result.issues.some((issue) => issue.type === "hard-word"));
});

test("English hard word is flagged", () => {
  const result = checkText("We utilize the old system.");
  assert.ok(result.issues.some((issue) => issue.type === "hard-word"));
  assert.equal(result.language, "en");
});

test("German hard word and passive are flagged", () => {
  const result = checkText("Der Antrag wird geprüft.", { language: "de" });
  assert.ok(result.issues.some((issue) => issue.type === "hard-word"));
  assert.ok(result.issues.some((issue) => issue.type === "passive"));
});

test("German long sentence is flagged", () => {
  const result = checkText(
    "Wir gehen heute mit allen Kindern in den großen Park neben dem alten Bahnhof.",
    { language: "de" },
  );
  assert.ok(result.issues.some((issue) => issue.type === "long-sentence"));
});

test("German abbreviations do not split sentences", () => {
  const result = checkText("Das ist z. B. ein Haus. Es ist groß.", {
    language: "de",
  });
  assert.equal(result.stats.sentences, 2);
});

test("unicode word boundaries work", () => {
  const result = checkText("Öffnungszeiten sind wichtig.", { language: "de" });
  assert.ok(
    result.issues.some(
      (issue) =>
        issue.type === "hard-word" && issue.message.includes("öffnungszeiten"),
    ),
  );
});

test("a hard word is not reported twice as a long word", () => {
  const result = checkText("Die Aufwandsentschädigung ist hoch.", {
    language: "de",
  });
  assert.ok(
    result.issues.every(
      (issue) =>
        issue.type !== "long-word" ||
        !issue.message.toLowerCase().includes("aufwandsentschädigung"),
    ),
  );
});

test("Spanish hard word is flagged", () => {
  const result = checkText("Puedes solicitar la ayuda mañana.", {
    language: "es",
  });
  assert.ok(result.issues.some((issue) => issue.type === "hard-word"));
});

test("Spanish passive is flagged", () => {
  const result = checkText("La solicitud fue aprobada.", { language: "es" });
  assert.ok(result.issues.some((issue) => issue.type === "passive"));
});

test("French hard word is flagged", () => {
  const result = checkText("Nous allons effectuer le travail.", {
    language: "fr",
  });
  assert.ok(result.issues.some((issue) => issue.type === "hard-word"));
});

test("Portuguese hard word is flagged", () => {
  const result = checkText("Você pode obter a ajuda amanhã.", {
    language: "pt",
  });
  assert.ok(result.issues.some((issue) => issue.type === "hard-word"));
});

test("Italian hard word is flagged", () => {
  const result = checkText("Puoi utilizzare questo modulo.", { language: "it" });
  assert.ok(result.issues.some((issue) => issue.type === "hard-word"));
});

test("report is in the chosen language", () => {
  const result = checkText("Der Hund ist im Haus.", { language: "de" });
  assert.match(result.report, /Leichte-Sprache-Prüfung/);
});

test("unknown language falls back to English", () => {
  const result = checkText("This is a test.", { language: "xx" });
  assert.equal(result.language, "en");
  assert.equal(result.warnings.length, 1);
});

test("clean text scores well", () => {
  const result = checkText("The cat is here. It is small. You can see it.");
  assert.ok(result.score >= 85, `score was ${result.score}`);
});

test("markdown blocks are separate sentences", () => {
  const result = checkText(
    "# Title\n\n- One short line.\n- Another short line.\n\nA paragraph.",
    { language: "en" },
  );
  assert.equal(result.stats.sentences, 4);
});

test("fenced code is not prose", () => {
  const result = checkText(
    "# Title\n\n```\nPOKE 53280,1\n```\n\nHi.",
    { language: "en" },
  );
  assert.equal(result.stats.sentences, 2);
  assert.equal(result.stats.words, 2);
});

test("wrapped prose stays one sentence", () => {
  const result = checkText("The cat is here\nand it is small.", {
    language: "en",
  });
  assert.equal(result.stats.sentences, 1);
});

test("'is often' is not passive", () => {
  const result = checkText("The key is often red.", { language: "en" });
  assert.ok(result.issues.every((issue) => issue.type !== "passive"));
});

test("'is written' is passive", () => {
  const result = checkText("The note is written by Ana.", { language: "en" });
  assert.ok(result.issues.some((issue) => issue.type === "passive"));
});

if (failures.length) {
  console.error(`${failures.length} test(s) failed, ${passed} passed.`);
  for (const failure of failures) {
    console.error(`\n${failure.name}`);
    console.error(failure.error?.stack ?? failure.error);
  }
  process.exitCode = 1;
} else {
  console.log(`All ${passed} tests passed.`);
}
