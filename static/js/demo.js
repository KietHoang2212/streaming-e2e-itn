/* Interactive Read–Tag–Write streaming ITN demo.
   Examples are precomputed (token-level tags + span outputs) so the page is
   fully static and deployable on GitHub Pages without a backend. */

const EXAMPLES = {
  vi_sports: {
    label: "VI · Sports news",
    // spoken-form -> written-form, with token-level B/I/O tags.
    // For a span, `out` on the B token holds the full normalized output.
    tokens: [
      { w: "hôm",    tag: "B", out: "Hôm" },
      { w: "qua",    tag: "B", out: "qua," },
      { w: "cầu",    tag: "O" },
      { w: "thủ",    tag: "O" },
      { w: "rô",     tag: "B", out: "Ronaldo" },
      { w: "nan",    tag: "I" },
      { w: "đô",     tag: "I" },
      { w: "đã",     tag: "O" },
      { w: "đạt",    tag: "O" },
      { w: "mốc",    tag: "O" },
      { w: "một",    tag: "B", out: "1000" },
      { w: "nghìn",  tag: "I" },
      { w: "bàn",    tag: "O" },
      { w: "thắng",  tag: "B", out: "thắng." },
    ],
  },
  en_money: {
    label: "EN · Currency",
    tokens: [
      { w: "i",       tag: "B", out: "I" },
      { w: "paid",    tag: "O" },
      { w: "one",     tag: "B", out: "$1.20" },
      { w: "point",   tag: "I" },
      { w: "two",     tag: "I" },
      { w: "dollars", tag: "I" },
      { w: "for",     tag: "O" },
      { w: "it",      tag: "B", out: "it." },
    ],
  },
  en_datetime: {
    label: "EN · Date & time",
    tokens: [
      { w: "the",     tag: "B", out: "The" },
      { w: "meeting", tag: "O" },
      { w: "is",      tag: "O" },
      { w: "on",      tag: "O" },
      { w: "march",   tag: "B", out: "March 3rd" },
      { w: "third",   tag: "I" },
      { w: "at",      tag: "O" },
      { w: "three",   tag: "B", out: "3:30 PM" },
      { w: "thirty",  tag: "I" },
      { w: "pm",      tag: "I" },
    ],
  },
  en_email: {
    label: "EN · Address",
    tokens: [
      { w: "email",   tag: "O" },
      { w: "me",      tag: "O" },
      { w: "at",      tag: "O" },
      { w: "john",    tag: "B", out: "john.doe@uney.com" },
      { w: "dot",     tag: "I" },
      { w: "doe",     tag: "I" },
      { w: "at",      tag: "I" },
      { w: "uney",    tag: "I" },
      { w: "dot",     tag: "I" },
      { w: "com",     tag: "I" },
    ],
  },

  // ---- long, mixed-type examples ----
  vi_report: {
    label: "VI · Report (long)",
    // → "Ngày 20/11/2025, công ty đạt doanh thu 15,5 tỷ đồng, tăng 30% so với quý ba."
    tokens: [
      { w: "ngày",   tag: "B", out: "Ngày" },
      { w: "hai",    tag: "B", out: "20/11/2025," },
      { w: "mươi",   tag: "I" },
      { w: "tháng",  tag: "I" },
      { w: "mười",   tag: "I" },
      { w: "một",    tag: "I" },
      { w: "năm",    tag: "I" },
      { w: "hai",    tag: "I" },
      { w: "nghìn",  tag: "I" },
      { w: "hai",    tag: "I" },
      { w: "lăm",    tag: "I" },
      { w: "công",   tag: "O" },
      { w: "ty",     tag: "O" },
      { w: "đạt",    tag: "O" },
      { w: "doanh",  tag: "O" },
      { w: "thu",    tag: "O" },
      { w: "mười",   tag: "B", out: "15,5 tỷ" },
      { w: "lăm",    tag: "I" },
      { w: "phẩy",   tag: "I" },
      { w: "năm",    tag: "I" },
      { w: "tỷ",     tag: "I" },
      { w: "đồng",   tag: "B", out: "đồng," },
      { w: "tăng",   tag: "O" },
      { w: "ba",     tag: "B", out: "30%" },
      { w: "mươi",   tag: "I" },
      { w: "phần",   tag: "I" },
      { w: "trăm",   tag: "I" },
      { w: "so",     tag: "O" },
      { w: "với",    tag: "O" },
      { w: "quý",    tag: "O" },
      { w: "ba",     tag: "B", out: "ba." },
    ],
  },

  en_news: {
    label: "EN · News (long)",
    // → "On January 15th, 2024, Prof. Smith paid $3,500 for 42% of the shares at 9:30 AM."
    tokens: [
      { w: "on",        tag: "B", out: "On" },
      { w: "january",   tag: "B", out: "January 15th, 2024," },
      { w: "fifteenth", tag: "I" },
      { w: "twenty",    tag: "I" },
      { w: "twenty",    tag: "I" },
      { w: "four",      tag: "I" },
      { w: "professor", tag: "B", out: "Prof." },
      { w: "smith",     tag: "B", out: "Smith" },
      { w: "paid",      tag: "O" },
      { w: "three",     tag: "B", out: "$3,500" },
      { w: "thousand",  tag: "I" },
      { w: "five",      tag: "I" },
      { w: "hundred",   tag: "I" },
      { w: "dollars",   tag: "I" },
      { w: "for",       tag: "O" },
      { w: "forty",     tag: "B", out: "42%" },
      { w: "two",       tag: "I" },
      { w: "percent",   tag: "I" },
      { w: "of",        tag: "O" },
      { w: "the",       tag: "O" },
      { w: "shares",    tag: "O" },
      { w: "at",        tag: "O" },
      { w: "nine",      tag: "B", out: "9:30 AM." },
      { w: "thirty",    tag: "I" },
      { w: "am",        tag: "I" },
    ],
  },

  en_specs: {
    label: "EN · Tech specs (long)",
    // → "The model has 275M parameters, uses 80 GB of memory, and reaches 98.5% accuracy."
    tokens: [
      { w: "the",        tag: "B", out: "The" },
      { w: "model",      tag: "O" },
      { w: "has",        tag: "O" },
      { w: "two",        tag: "B", out: "275M" },
      { w: "hundred",    tag: "I" },
      { w: "seventy",    tag: "I" },
      { w: "five",       tag: "I" },
      { w: "million",    tag: "I" },
      { w: "parameters", tag: "B", out: "parameters," },
      { w: "uses",       tag: "O" },
      { w: "eighty",     tag: "B", out: "80 GB" },
      { w: "gigabytes",  tag: "I" },
      { w: "of",         tag: "O" },
      { w: "memory",     tag: "B", out: "memory," },
      { w: "and",        tag: "O" },
      { w: "reaches",    tag: "O" },
      { w: "ninety",     tag: "B", out: "98.5%" },
      { w: "eight",      tag: "I" },
      { w: "point",      tag: "I" },
      { w: "five",       tag: "I" },
      { w: "percent",    tag: "I" },
      { w: "accuracy",   tag: "B", out: "accuracy." },
    ],
  },
};

const SPEEDS = { slow: 1.7, normal: 1.0, fast: 0.5 };

let state = {
  exampleKey: "vi_sports",
  chunk: 3,
  speedKey: "normal",
  running: false,
  abort: false,
};

const $ = (sel) => document.querySelector(sel);

function sleep(ms) {
  return new Promise((res) => {
    const t = setTimeout(res, ms * SPEEDS[state.speedKey]);
    sleep._timers.push(t);
  });
}
sleep._timers = [];

function clearTimers() {
  sleep._timers.forEach(clearTimeout);
  sleep._timers = [];
}

function setPhase(name) {
  ["read", "tag", "write"].forEach((p) => {
    const el = $(`#phase-${p}`);
    if (el) el.classList.toggle("phase-active", p === name);
  });
}

function resetDemo() {
  state.abort = true;
  clearTimers();
  state.running = false;
  setPhase(null);
  $("#demo-stream").innerHTML = "";
  $("#demo-output").innerHTML = '<span class="output-placeholder">Output will stream here…</span>';
  $("#demo-run").disabled = false;
  $("#demo-run").innerHTML = '<span class="icon"><i class="fas fa-play"></i></span><span>Run streaming</span>';
}

function renderStreamTokens(tokens) {
  const stream = $("#demo-stream");
  stream.innerHTML = "";
  tokens.forEach((t, i) => {
    const chip = document.createElement("div");
    chip.className = "tok-chip";
    chip.id = `tok-${i}`;
    chip.innerHTML = `<span class="tok-word">${t.w}</span><span class="tok-tag" id="tag-${i}"></span>`;
    stream.appendChild(chip);
  });
}

function emitOutput(text, kind) {
  const out = $("#demo-output");
  const ph = out.querySelector(".output-placeholder");
  if (ph) ph.remove();
  const span = document.createElement("span");
  span.className = `out-chip out-${kind}`;
  span.textContent = text;
  out.appendChild(span);
  out.appendChild(document.createTextNode(" "));
}

async function flushSpan(span) {
  if (!span.length) return;
  setPhase("write");
  // highlight the span tokens as "decoding"
  span.forEach((s) => $(`#tok-${s.i}`).classList.add("tok-decoding"));
  const indicator = document.createElement("span");
  indicator.className = "out-chip out-decoding";
  indicator.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> decoding';
  const out = $("#demo-output");
  const ph = out.querySelector(".output-placeholder");
  if (ph) ph.remove();
  out.appendChild(indicator);
  await sleep(550);
  if (state.abort) return;
  indicator.remove();
  emitOutput(span[0].out, "decoded");
  span.forEach((s) => {
    const el = $(`#tok-${s.i}`);
    el.classList.remove("tok-decoding");
    el.classList.add("tok-done");
  });
}

async function run() {
  const ex = EXAMPLES[state.exampleKey];
  state.abort = false;
  state.running = true;
  $("#demo-run").disabled = true;
  $("#demo-run").innerHTML = '<span class="icon"><i class="fas fa-circle-notch fa-spin"></i></span><span>Streaming…</span>';
  $("#demo-output").innerHTML = '<span class="output-placeholder">Output will stream here…</span>';
  renderStreamTokens(ex.tokens);

  const tokens = ex.tokens.map((t, i) => ({ ...t, i }));
  let pendingSpan = [];

  for (let start = 0; start < tokens.length; start += state.chunk) {
    if (state.abort) return;
    const chunk = tokens.slice(start, start + state.chunk);

    // READ phase: reveal the whole chunk simultaneously
    setPhase("read");
    chunk.forEach((t) => $(`#tok-${t.i}`).classList.add("tok-reading"));
    await sleep(450);
    if (state.abort) return;

    // TAG phase: predict B/I/O for the whole chunk in one step
    setPhase("tag");
    chunk.forEach((t) => {
      const tagEl = $(`#tag-${t.i}`);
      tagEl.textContent = t.tag;
      tagEl.classList.add(`tag-${t.tag}`);
      const el = $(`#tok-${t.i}`);
      el.classList.remove("tok-reading");
      el.classList.add(`tok-${t.tag}`);
    });
    await sleep(450);
    if (state.abort) return;

    // WRITE phase: process tokens left-to-right
    for (const t of chunk) {
      if (state.abort) return;
      if (t.tag === "O") {
        if (pendingSpan.length) { await flushSpan(pendingSpan); pendingSpan = []; }
        setPhase("write");
        emitOutput(t.w, "verbatim");
        $(`#tok-${t.i}`).classList.add("tok-done");
        await sleep(220);
      } else if (t.tag === "B") {
        if (pendingSpan.length) { await flushSpan(pendingSpan); pendingSpan = []; }
        pendingSpan = [t];
      } else { // I
        pendingSpan.push(t);
      }
    }
  }
  if (pendingSpan.length) await flushSpan(pendingSpan);
  if (state.abort) return;

  setPhase(null);
  state.running = false;
  $("#demo-run").disabled = false;
  $("#demo-run").innerHTML = '<span class="icon"><i class="fas fa-rotate-right"></i></span><span>Run again</span>';
}

function initDemo() {
  // example buttons
  const exWrap = $("#demo-examples");
  Object.entries(EXAMPLES).forEach(([key, ex], idx) => {
    const btn = document.createElement("button");
    btn.className = "button is-small demo-ex-btn" + (idx === 0 ? " is-selected" : "");
    btn.textContent = ex.label;
    btn.dataset.key = key;
    btn.addEventListener("click", () => {
      state.exampleKey = key;
      document.querySelectorAll(".demo-ex-btn").forEach((b) => b.classList.remove("is-selected"));
      btn.classList.add("is-selected");
      resetDemo();
      renderStreamTokens(EXAMPLES[key].tokens);
    });
    exWrap.appendChild(btn);
  });

  $("#demo-chunk").addEventListener("input", (e) => {
    state.chunk = parseInt(e.target.value, 10);
    $("#demo-chunk-val").textContent = state.chunk;
    if (!state.running) { resetDemo(); renderStreamTokens(EXAMPLES[state.exampleKey].tokens); }
  });

  $("#demo-speed").addEventListener("change", (e) => { state.speedKey = e.target.value; });

  $("#demo-run").addEventListener("click", () => { if (!state.running) run(); });
  $("#demo-reset").addEventListener("click", resetDemo);

  renderStreamTokens(EXAMPLES[state.exampleKey].tokens);
}

document.addEventListener("DOMContentLoaded", initDemo);
