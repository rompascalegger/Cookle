/* ===========================================================
   DAILY COOKLE — guess today's secret dish from its feelings
   =========================================================== */

const DAILY_EPOCH = Date.UTC(2026, 0, 1);
const DAILY_MAX = 6;
function dailyNum() {
  const d = new Date();
  return Math.floor((Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) - DAILY_EPOCH) / 864e5) + 1;
}
function mulberry(a) { return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function dailySecret(n) {
  const pool = Object.values(RECIPES).filter(r => new Set(r.req.map(q => q.i)).size === r.req.length).sort((a, b) => a.id < b.id ? -1 : 1);
  const cycle = Math.floor((n - 1) / pool.length);
  const rnd = mulberry(1234 + cycle * 7919);
  const order = pool.map(r => [rnd(), r]).sort((a, b) => a[0] - b[0]).map(x => x[1]);
  return order[(n - 1) % pool.length];
}

let DSEL = [], DSEARCH = '', DCAT = 'all';
function dState(n) { S.daily[n] = S.daily[n] || { guesses: [], done: false, won: false }; return S.daily[n]; }

function scoreGuess(guess, secret) {
  const ids = secret.req.map(q => q.i);
  const missingCats = ids.filter(i => !guess.includes(i)).map(i => ING[i].cat);
  return guess.map(g => {
    if (ids.includes(g)) return 'hit';
    const k = missingCats.indexOf(ING[g].cat);
    if (k >= 0) { missingCats.splice(k, 1); return 'warm'; }
    return 'cold';
  });
}
const FB = { hit: { e: '😍', mood: 10 }, warm: { e: '🙂', mood: 6 }, cold: { e: '😶', mood: 2.2 } };

function dailyHTML() {
  const n = dailyNum(), secret = dailySecret(n), st = dState(n), N = secret.req.length;
  const rest = REST[secret.rest];
  const pers = secret.req.map(q => PERS[ING[q.i].p].name).sort();
  const cats = secret.req.map(q => CATS[ING[q.i].cat].e + ' ' + CATS[ING[q.i].cat].name).sort();
  const g = st.guesses.length;
  const clues = [
    `${rest.e} A dish from <b>${rest.name}</b> with <b>${N}</b> ingredients.`,
    `🧠 Inside you'll find: ${pers.map(p => `<b>${p}</b>`).join(', ')} personalities.`,
    g >= 1 || st.done ? `🗂️ Categories: ${cats.join(', ')}` : '🔒 Category clue after guess 1',
    g >= 3 || st.done ? `🍽️ The dish looks like: <span class="big-inline">${secret.e}</span>` : '🔒 Dish emoji after guess 3',
    g >= 5 || st.done ? `📖 It's called: <b>${secret.name}</b>` : '🔒 Dish name after guess 5',
  ];
  const known = {};
  st.guesses.forEach(gs => { const fb = scoreGuess(gs, secret); gs.forEach((id, k) => { const v = fb[k]; if (!known[id] || v === 'hit' || (v === 'warm' && known[id] === 'cold')) known[id] = v; }); });
  const rows = [];
  for (let r = 0; r < DAILY_MAX; r++) {
    const gs = st.guesses[r];
    if (gs) {
      const fb = scoreGuess(gs, secret);
      rows.push(`<div class="d-row">${gs.map((id, k) => `<div class="d-cell ${fb[k]}">${ingTokenHTML(ING[id], FB[fb[k]].mood, { label: false })}<span>${ING[id].name}</span></div>`).join('')}</div>`);
    } else if (r === g && !st.done) {
      rows.push(`<div class="d-row current">${Array.from({ length: N }, (_, k) => DSEL[k]
        ? `<button class="d-cell pending" data-act="dRemove" data-id="${DSEL[k]}">${ingTokenHTML(ING[DSEL[k]], 7, { label: false })}<span>${ING[DSEL[k]].name}</span></button>`
        : `<div class="d-cell empty">?</div>`).join('')}</div>`);
    } else rows.push(`<div class="d-row">${Array.from({ length: N }, () => '<div class="d-cell blank"></div>').join('')}</div>`);
  }
  const end = st.done ? `
    <div class="d-end ${st.won ? 'won' : 'lost'}">
      <h3>${st.won ? `🎉 You got it in ${g}!` : '🥲 So close!'}</h3>
      <p>Today's dish: <b>${secret.e} ${secret.name}</b> — ${secret.req.map(q => `${emojiHTML(ING[q.i].e, ING[q.i].f)} ${ING[q.i].name}`).join(', ')}</p>
      ${st.won && S.dailyReward === n ? '<p class="small">+15 🪙 added to your restaurant savings!</p>' : ''}
      <button class="btn" data-act="dShare">📋 Share result</button>
      <p class="muted small">A new Cookle arrives tomorrow.</p>
    </div>` : '';
  return `
  <section class="daily">
    <h2 class="screen-title">🧩 Daily Cookle <span class="muted">#${n}</span></h2>
    <p class="muted center">Guess today's secret dish by its ingredients. 😍 = in the dish · 🙂 = right category, wrong friend · 😶 = not in it.</p>
    <div class="d-layout">
      <div class="d-board">
        <ul class="d-clues">${clues.map(c => `<li class="${c.startsWith('🔒') ? 'locked' : ''}">${c}</li>`).join('')}</ul>
        <div class="d-rows">${rows.join('')}</div>
        ${st.done ? end : `<div class="row-btns"><button class="btn big ${DSEL.length === N ? '' : 'disabled'}" data-act="dGuess">Taste-test! (${g + 1}/${DAILY_MAX})</button>${DSEL.length ? '<button class="btn ghost" data-act="dClear">Clear</button>' : ''}</div>`}
      </div>
      ${st.done ? '' : `<div class="d-picker">
        <input id="dsearch" type="search" placeholder="🔍 Search ${ING_LIST.length} ingredients…" value="${esc(DSEARCH)}" autocomplete="off">
        <div class="d-cats"><button class="chip ${DCAT === 'all' ? 'on' : ''}" data-act="dCat" data-id="all">All</button>${Object.entries(CATS).map(([c, C]) => `<button class="chip ${DCAT === c ? 'on' : ''}" data-act="dCat" data-id="${c}">${C.e}</button>`).join('')}</div>
        <div class="d-grid" id="dgrid">${dailyGridHTML(known)}</div>
      </div>`}
    </div>
  </section>`;
}
function dailyKnown() {
  const n = dailyNum(), secret = dailySecret(n), st = dState(n), known = {};
  st.guesses.forEach(gs => { const fb = scoreGuess(gs, secret); gs.forEach((id, k) => { const v = fb[k]; if (!known[id] || v === 'hit' || (v === 'warm' && known[id] === 'cold')) known[id] = v; }); });
  return known;
}
function dailyGridHTML(known) {
  const q = DSEARCH.trim().toLowerCase();
  const list = ING_LIST.filter(d => (DCAT === 'all' || d.cat === DCAT) && (!q || d.name.toLowerCase().includes(q)));
  if (!list.length) return '<div class="muted">No ingredient by that name… yet!</div>';
  return list.map(d => `<button class="d-pick ${known[d.id] || ''} ${DSEL.includes(d.id) ? 'chosen' : ''}" data-act="dPick" data-id="${d.id}" title="${d.name}">
    ${emojiHTML(d.e, d.f)}<span>${d.name}</span></button>`).join('');
}

window.dailyAction = (act, el) => {
  const n = dailyNum(), secret = dailySecret(n), st = dState(n), N = secret.req.length;
  if (act === 'dPick') {
    const id = el.dataset.id;
    if (DSEL.includes(id)) DSEL = DSEL.filter(x => x !== id);
    else if (DSEL.length < N) DSEL.push(id);
    else { toast(`Only ${N} ingredients in this dish! Remove one first.`); return; }
    sfx('pop'); render();
  } else if (act === 'dRemove') { DSEL = DSEL.filter(x => x !== el.dataset.id); render(); }
  else if (act === 'dClear') { DSEL = []; render(); }
  else if (act === 'dCat') { DCAT = el.dataset.id; render(); }
  else if (act === 'dGuess') {
    if (DSEL.length !== N || st.done) { toast(`Pick ${N} ingredients first!`); return; }
    st.guesses.push(DSEL.slice());
    const fb = scoreGuess(DSEL, secret);
    DSEL = [];
    if (fb.every(x => x === 'hit')) {
      st.done = st.won = true; sfx('fanfare');
      if (S.dailyReward !== n) { S.dailyReward = n; S.coins += 15; }
    } else if (st.guesses.length >= DAILY_MAX) { st.done = true; sfx('sad'); }
    else sfx(fb.includes('hit') ? 'happy' : 'pop');
    save(); render();
  } else if (act === 'dShare') {
    const grid = st.guesses.map(gs => scoreGuess(gs, secret).map(x => FB[x].e).join('')).join('\n');
    const text = `Cookle #${n} ${st.won ? st.guesses.length : 'X'}/${DAILY_MAX} 🍳\n${grid}\nCook with love 💖`;
    (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject()).then(() => toast('Copied to clipboard! 📋'), () => modal(`<pre class="share">${esc(text)}</pre>`));
  }
};
document.addEventListener('input', e => {
  if (e.target.id === 'dsearch') { DSEARCH = e.target.value; const g = document.getElementById('dgrid'); if (g) g.innerHTML = dailyGridHTML(dailyKnown()); }
});
