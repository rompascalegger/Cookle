/* ===========================================================
   COOKLE — the cozy emotional cooking engine
   =========================================================== */

// ---------- Utils ----------
const $ = (s, el = document) => el.querySelector(s);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const pick = a => a[Math.floor(Math.random() * a.length)];
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
let UID = 1;
const uid = () => 'i' + (UID++);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const r1 = v => Math.round(v * 10) / 10;

// ---------- Save ----------
const SAVE_KEY = 'cookle-save-v1';
function freshSave() {
  return { coins: 30, stars: 0, rest: {}, packs: {}, decor: {}, nb: {}, met: {}, best: {}, served: 0, perfect: 0,
           muted: false, hints: true, daily: {}, dailyReward: null, intro: false };
}
function loadSave() {
  try { const s = JSON.parse(localStorage.getItem(SAVE_KEY)); if (s) return Object.assign(freshSave(), s); } catch (e) {}
  return freshSave();
}
let S = loadSave();
function save() { try { localStorage.setItem(SAVE_KEY, JSON.stringify(S)); } catch (e) {} }

// ---------- Unlocks ----------
const restUnlocked = r => S.stars >= r.stars;
const ingUnlocked = id => { const u = ING_UNLOCK[id]; return REST[u] ? restUnlocked(REST[u]) : !!S.packs[u]; };
const toolUnlocked = t => restUnlocked(REST[TOOLS[t].rest]);
const treatUnlocked = t => S.stars >= TREATS[t].stars;
const decorCount = () => Object.keys(S.decor).length;

// ---------- Sound (tiny WebAudio blips) ----------
let AC = null;
function sfx(type) {
  if (S.muted) return;
  try {
    AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    const t = AC.currentTime;
    const tone = (f, d, wave = 'sine', v = .12, delay = 0, slide = 0) => {
      const o = AC.createOscillator(), g = AC.createGain();
      o.type = wave; o.frequency.setValueAtTime(f, t + delay);
      if (slide) o.frequency.exponentialRampToValueAtTime(f * slide, t + delay + d);
      g.gain.setValueAtTime(v, t + delay); g.gain.exponentialRampToValueAtTime(.001, t + delay + d);
      o.connect(g); g.connect(AC.destination); o.start(t + delay); o.stop(t + delay + d + .02);
    };
    const noise = (d, v = .08, hp = 1000) => {
      const b = AC.createBuffer(1, AC.sampleRate * d, AC.sampleRate), ch = b.getChannelData(0);
      for (let i = 0; i < ch.length; i++) ch[i] = (Math.random() * 2 - 1) * (1 - i / ch.length);
      const s = AC.createBufferSource(), f = AC.createBiquadFilter(), g = AC.createGain();
      f.type = 'highpass'; f.frequency.value = hp; g.gain.value = v;
      s.buffer = b; s.connect(f); f.connect(g); g.connect(AC.destination); s.start(t);
    };
    ({
      pop: () => tone(520, .09, 'sine', .1, 0, 1.6),
      happy: () => { tone(660, .1, 'triangle', .1); tone(880, .14, 'triangle', .1, .08); },
      sad: () => tone(330, .25, 'triangle', .1, 0, .6),
      wash: () => noise(.35, .06, 2500),
      chop: () => { noise(.05, .15, 3000); tone(200, .05, 'square', .04); },
      sizzle: () => noise(.5, .05, 4000),
      coin: () => { tone(988, .08, 'square', .05); tone(1319, .2, 'square', .05, .07); },
      bell: () => { tone(1568, .6, 'sine', .12); tone(2093, .5, 'sine', .06, .02); },
      fanfare: () => [523, 659, 784, 1047].forEach((f, i) => tone(f, .25, 'triangle', .1, i * .1)),
    }[type] || (() => {}))();
  } catch (e) {}
}

// ---------- Lines ----------
const REACT_LIKE = {
  ch: 'La la LAAA! I love it! 🎶', sh: '(*blushes deeply*) …thank you… 💕', gr: 'Hmph. …heh. Heh heh. Fine, that was good.',
  dr: 'Finally! Someone UNDERSTANDS me! 😭💖', sl: 'Mmm… so cozy… zzz… 💤', gi: 'HEEHEEHEE STOP— no, don\'t stop! 🤭',
  fa: 'Magnifique! Bravissimo! 👑', an: 'Oh… that\'s nice. I feel safe now. 🥹', sa: 'Okay, you\'re funny. I\'ll allow it. 💅',
  cu: 'Squeeeeze! Best day EVER! 🤗', ph: 'Ah… a profound moment. I see now. ✨', ad: 'WOOHOO! Do it again! 🚀',
};
const REACT_DISLIKE = {
  ch: 'Psst? What? Why are we whispering?! 😟', sh: 'Too LOUD! I\'m hiding! 🙈', gr: 'Get OFF me! Personal space! 😤',
  dr: 'You think this is FUNNY?! 😭', sl: 'Eek! I was napping! 😫', gi: 'A pat? Bo-ring. 🙄',
  fa: 'How UNDIGNIFIED! 😾', an: 'W-was that a joke? Am I the joke?! 😰', sa: 'Excuse me. The HAIR. 😒',
  cu: 'What? Speak UP, sweetie! 😕', ph: 'You interrupted my thought. It was about soup. 😑', ad: 'Ugh, too clingy! Let go! 😖',
};
const REACT_NEUTRAL = ['That\'s nice 🙂', 'Aw, thanks chef!', 'Hehe, okay!', 'Oh! Sweet of you.', 'Mm, not bad!'];
const CLEAN_LINES = ['Squeaky clean! I feel brand new! ✨', 'Ahh, a spa day! 🛁', 'Bye-bye mud! 💦', 'I can SEE again!'];
const CHOP_LINES = ['We\'re still us, just smaller! 😄', 'Mini-me! And mini-me! 🥳', 'Ooh, tickles! We\'re a team now!', 'Bite-sized and happy!'];
const LONELY_LINES = ['Hey… don\'t forget about us 🥺', 'It\'s getting chilly out here…', 'Where did everyone go?', 'Psst… chef? Hello?'];
const LONELY_ALONE = ['I\'m all alone… my siblings left me 😢', 'Just me now… *sniff*', 'Did they forget me?'];

const cookLabel = (m, d) => m === 'grilled' && d && d.cat === 'grain' ? 'toasted' : COOK[m].label;

// ---------- Kitchen state ----------
let K = null;
let FX = []; // pending floating effects after render

function newItem(defId) {
  const d = ING[defId];
  const dirty = d.wash !== 'none';
  let mood = PERS[d.p].base + (Math.random() < .5 ? 0 : .5);
  if (dirty) mood = Math.min(mood - 2, 5);
  return { uid: uid(), d: defId, mood: clamp(mood, 0, 10), dirty, chopped: false, src: null, cook: null, treats: [],
           zone: 'counter', price: d.price, fresh: true, rot: 0 };
}

function startDay(rid) {
  const r = REST[rid];
  S.rest[rid] = S.rest[rid] || { day: 0 };
  const day = S.rest[rid].day;
  if (S.coins < 12) { S.coins += 25; setTimeout(() => toast('🧺 The neighbours left a care package: +25 🪙'), 400); }
  const tools = {};
  Object.keys(TOOLS).filter(toolUnlocked).forEach(t => tools[t] = { mood: S.decor.radio ? 8 : 7, patted: false });
  const guests = [];
  const animals = shuffle(GUESTS);
  const count = r.menus ? Math.min(3, 2 + Math.floor(day / 2)) : Math.min(5, 3 + Math.floor(day / 2));
  let pool;
  if (r.menus) {
    const unlockedR = Object.values(RECIPES).filter(x => restUnlocked(REST[x.rest]) && x.course);
    pool = { s: unlockedR.filter(x => x.course === 's'), m: unlockedR.filter(x => x.course === 'm'), d: unlockedR.filter(x => x.course === 'd') };
  } else {
    const all = Object.values(RECIPES).filter(x => x.rest === rid).sort((a, b) => a.price - b.price);
    pool = all.slice(0, Math.min(all.length, 3 + day));
  }
  let lastId = null;
  for (let i = 0; i < count; i++) {
    let recipes;
    if (r.menus) {
      const palaceFirst = arr => { const p = arr.filter(x => x.rest === 'palace'); return Math.random() < .55 && p.length ? pick(p) : pick(arr); };
      recipes = [palaceFirst(pool.s).id, palaceFirst(pool.m).id, palaceFirst(pool.d).id];
    } else {
      let rec; let tries = 0;
      do { rec = (day === 0 && i < 2 && rid === 'shack') ? pool[i] : pick(pool); tries++; } while (rec.id === lastId && tries < 10);
      lastId = rec.id; recipes = [rec.id];
    }
    const quirkChance = (rid === 'shack' && day === 0) ? 0 : Math.min(.85, .25 + day * .12);
    let quirk = null;
    if (Math.random() < quirkChance) {
      const ok = QUIRKS.filter(q => q.minDay <= day && quirkCompatible(q, recipes));
      if (ok.length) quirk = pick(ok).id;
    }
    guests.push({ e: animals[i % animals.length][0], name: animals[i % animals.length][1], recipes, course: 0, quirk,
                  greet: pick(GREETINGS), results: [] });
  }
  K = { rid, day, guests, gi: 0, items: [], tools, sel: new Set(), usedTools: new Set(), tab: 'order', inspect: null,
        dayStars: 0, dayCoins: 0, dayLove: [], chef: null, actions: 0 };
  save();
  show('kitchen');
}

function quirkCompatible(q, recipeIds) {
  const reqIds = recipeIds.flatMap(id => RECIPES[id].req.map(x => x.i));
  if (q.type === 'want') return ING_LIST.some(d => d.tags.includes(q.tag) && ingUnlocked(d.id) && !reqIds.includes(d.id));
  if (q.type === 'no') return !reqIds.some(i => ING[i].tags.includes(q.tag));
  if (q.type === 'friends') return true;
  return true;
}

const curGuest = () => K.guests[K.gi];
const curRecipe = () => RECIPES[curGuest().recipes[curGuest().course]];
const counterItems = () => K.items.filter(i => i.zone === 'counter');
const plateItems = () => K.items.filter(i => i.zone === 'plate');
const selItems = zone => K.items.filter(i => K.sel.has(i.uid) && (!zone || i.zone === zone));
const srcOf = i => i.src || i.uid;

function bump(item, delta, show = true) {
  const before = item.mood;
  item.mood = clamp(item.mood + delta, 0, 10);
  if (item.dirty) item.mood = Math.min(item.mood, 5);
  const real = r1(item.mood - before);
  if (show && real !== 0) FX.push({ uid: item.uid, text: (real > 0 ? '+' : '') + real + (real > 0 ? ' 💖' : ' 💧'), cls: real > 0 ? 'up' : 'down' });
}
function toolBump(tid, d) {
  const t = K.tools[tid]; if (!t) return;
  t.mood = clamp(t.mood + d, 0, 10);
}
function say(target, text, kind = '') { FX.push({ uid: target, say: text, kind }); }

// After every action, uncooked crumbs left on the counter get a bit lonelier.
function decay(exclude) {
  K.actions++;
  const counter = counterItems();
  let saidAlone = false, saidLonely = false;
  counter.forEach(i => {
    if (!i.chopped || i.cook || exclude.has(i.uid)) return;
    const sibs = counter.filter(o => o !== i && o.chopped && srcOf(o) === srcOf(i));
    const d = sibs.length ? .5 : 1;
    bump(i, -d, false);
    FX.push({ uid: i.uid, text: '💧', cls: 'down small' });
    if (!sibs.length && !saidAlone && Math.random() < .7) { say(i.uid, pick(LONELY_ALONE)); saidAlone = true; }
    else if (!saidLonely && !saidAlone && Math.random() < .35) { say(i.uid, pick(LONELY_LINES)); saidLonely = true; }
  });
}

// ---------- Actions ----------
function useTool(tid) {
  const T = TOOLS[tid];
  const items = selItems('counter');
  if (!items.length) {
    const t = K.tools[tid];
    if (!t.patted) { t.patted = true; toolBump(tid, 1); say('tool-' + tid, pick([`Aww, thanks chef! ${T.name} feels loved.`, 'Hehe, that tickles my handle!', 'A pat for me? 🥹'])); sfx('happy'); }
    else say('tool-' + tid, selItems('plate').length ? 'Food on the plate is ready to serve! Bring counter items to me.' : 'Select some ingredients on the counter first, chef!');
    renderKitchen(); return;
  }
  K.usedTools.add(tid);
  const touched = new Set(items.map(i => i.uid));
  if (T.act === 'wash' || T.act === 'brush') doWash(items, T.act, tid);
  else if (T.act === 'chop') doChop(items, touched);
  else doCook(items, T.m, tid);
  decay(touched);
  renderKitchen();
}

function doWash(items, act, tid) {
  sfx('wash');
  const how = act === 'wash' ? 'rinse' : 'brush';
  let toolMsg = null;
  const seen = new Set();
  items.forEach(i => {
    const d = ING[i.d];
    const first = !seen.has(srcOf(i)); seen.add(srcOf(i));
    if (i.cook) { bump(i, -3); toolBump(tid, -1); if (first) say(i.uid, 'Soggy! I was already cooked! 😖'); return; }
    if (d.wash === 'none') {
      bump(i, -3); toolBump(tid, -2);
      if (first) say(i.uid, d.cat === 'meat' ? 'NEVER wash raw meat, chef! 😱' : d.cat === 'grain' ? 'SOGGY! I\'m bread, not a sponge! 😫' : 'Why am I wet?! I was clean! 😩');
      toolMsg = d.cat === 'meat' ? `${TOOLS[tid].name} is horrified.` : `${TOOLS[tid].name}: "That didn't need me…"`;
      return;
    }
    if (!i.dirty) { if (first) say(i.uid, 'Already sparkling! ✨'); return; }
    i.dirty = false;
    if (d.wash === how || d.wash === 'either') {
      bump(i, 3); toolBump(tid, 1);
      if (first) say(i.uid, pick(CLEAN_LINES));
    } else if (how === 'rinse') {
      bump(i, -1); toolBump(tid, -1);
      if (first) say(i.uid, 'Clean… but I\'m a soggy sponge now 😣 (a brush would be gentler)');
    } else {
      bump(i, -1); toolBump(tid, -1);
      if (first) say(i.uid, 'Bristles?! On my delicate skin?! 😣 (rinse me next time)');
    }
  });
  if (toolMsg) say('tool-' + tid, toolMsg);
}

function doChop(items, touched) {
  sfx('chop');
  const knife = K.tools.knife;
  const done = new Set();
  items.forEach(i => {
    const d = ING[i.d];
    if (done.has(srcOf(i))) return;
    if (!d.chop) { done.add(srcOf(i)); toolBump('knife', -1); say(i.uid, pick([`You can't chop me, I'm ${d.name}! 😅`, 'Snippy stares at me. "How, exactly?"'])); return; }
    if (i.chopped) { done.add(srcOf(i)); say(i.uid, 'We\'re already bite-sized! 🤏'); return; }
    // replace with pieces
    const idx = K.items.indexOf(i);
    K.items.splice(idx, 1); K.sel.delete(i.uid);
    const pieces = [];
    for (let n = 0; n < d.pc; n++) {
      const p = Object.assign({}, i, { uid: uid(), chopped: true, src: i.uid, treats: i.treats.slice(), fresh: false, rot: Math.round(Math.random() * 40 - 20) });
      pieces.push(p);
    }
    K.items.splice(idx, 0, ...pieces);
    if (K.inspect === i.uid) K.inspect = pieces[0].uid;
    pieces.forEach(p => {
      K.sel.add(p.uid); touched.add(p.uid);
      if (i.dirty) bump(p, -2, false);
      else if (knife && knife.mood >= 7) bump(p, .5, false);
    });
    if (i.dirty) { toolBump('knife', -2); say(pieces[0].uid, 'Ew, we\'re chopped AND muddy! 😖'); FX.push({ uid: pieces[0].uid, text: '-2 💧', cls: 'down' }); }
    else { toolBump('knife', 1); say(pieces[0].uid, pick(CHOP_LINES)); }
  });
}

function doCook(items, m, tid) {
  sfx(m === 'boiled' || m === 'whipped' ? 'wash' : 'sizzle');
  const T = TOOLS[tid];
  const seen = new Set();
  let toolSaid = false;
  items.forEach(i => {
    const d = ING[i.d];
    const first = !seen.has(srcOf(i)); seen.add(srcOf(i));
    if (i.cook) { if (first) say(i.uid, `I'm already ${COOK[i.cook].label}, darling!`); return; }
    i.cook = m; i.fresh = false;
    if (i.dirty) { bump(i, -2); toolBump(tid, -2); if (first) say(i.uid, 'Cooked… with MUD?! 🤢'); if (!toolSaid) { say('tool-' + tid, `${T.name}: "Mud in my ${T.kind.toLowerCase()}?!"`); toolSaid = true; } return; }
    if (d.nc) { bump(i, -5); toolBump(tid, -1); if (first) say(i.uid, d.cat === 'dairy' || d.id === 'watermelon' ? 'I\'M MEEELTING! 🫠' : 'Nooo, I\'m not meant to be cooked! 😵'); return; }
    if (d.lv === m) { bump(i, 3); toolBump(tid, 1); if (first) say(i.uid, pick(['Yesss, my FAVOURITE! 😍', 'This is my dream come true!', 'Ahhh, perfection~ ✨'])); }
    else if (d.ht === m) { bump(i, -3); toolBump(tid, -2); if (first) say(i.uid, `Not ${COOK[m].fear}! Anything but that! 😱`); if (!toolSaid) { say('tool-' + tid, `${T.name} feels bad about that one…`); toolSaid = true; } }
    else { bump(i, 1); toolBump(tid, .5); if (first) say(i.uid, pick(['Warm and toasty! 🙂', 'Ooh, cozy!', 'Nice and warm~'])); }
  });
  if (!toolSaid && Math.random() < .5) say('tool-' + tid, pick([`${T.name} hums happily.`, `${T.name}: "Love my job!"`, `${T.name} is in the zone.`]));
}

function treat(t) {
  if (!treatUnlocked(t)) { toast(`🔒 Unlocks at ${TREATS[t].stars} ⭐`); return; }
  const items = selItems();
  if (!items.length) { toast('Select an ingredient first, then try a treatment!'); return; }
  const touched = new Set(items.map(i => i.uid));
  K.chef = t === 'joke' ? pick(JOKES) : t === 'sing' ? pick(SONGS) : t === 'whisper' ? pick(WHISPERS) : t === 'hug' ? '*big warm hug* 🤗' : t === 'pat' ? '*pat pat pat* 🤚' : '*tickle tickle* 🪶';
  const seen = new Set();
  let anyLike = false, anyDis = false;
  items.forEach(i => {
    const d = ING[i.d], P = PERS[d.p];
    const first = !seen.has(srcOf(i)); seen.add(srcOf(i));
    if (i.treats.includes(t)) { if (first) say(i.uid, pick(['We did that already, silly 😅', 'Again? Hehe, it doesn\'t work twice.', 'I remember that one!'])); return; }
    i.treats.push(t);
    S.nb[d.p] = S.nb[d.p] || {};
    if (P.like === t) { bump(i, 3); anyLike = true; if (first) say(i.uid, REACT_LIKE[d.p], 'love'); if (!S.nb[d.p].like) { S.nb[d.p].like = true; FX.push({ note: `📓 Discovered: ${P.name} ingredients LOVE ${TREATS[t].e} ${TREATS[t].name}!` }); } }
    else if (P.dislike === t) { bump(i, -3); anyDis = true; if (first) say(i.uid, REACT_DISLIKE[d.p], 'ugh'); if (!S.nb[d.p].dislike) { S.nb[d.p].dislike = true; FX.push({ note: `📓 Noted: ${P.name} ingredients dislike ${TREATS[t].e} ${TREATS[t].name}.` }); } }
    else { bump(i, 1); if (first) say(i.uid, i.dirty ? 'Nice… but I\'m still muddy 😢' : pick(REACT_NEUTRAL)); }
  });
  sfx(anyLike ? 'happy' : anyDis ? 'sad' : 'pop');
  decay(touched);
  save();
  renderKitchen();
}

function toPlate() {
  const items = selItems('counter');
  if (!items.length) { toast('Select counter ingredients to plate them.'); return; }
  items.forEach(i => { i.zone = 'plate'; });
  sfx('pop');
  const pl = items[0]; say(pl.uid, pick(['Plate time! 🍽️', 'Comfy up here!', 'Ready for my close-up!']));
  decay(new Set(items.map(i => i.uid)));
  K.sel.clear();
  renderKitchen();
}
function fromPlate() {
  const items = selItems('plate');
  if (!items.length) { toast('Select something on the plate first.'); return; }
  items.forEach(i => { i.zone = 'counter'; });
  K.sel.clear(); sfx('pop'); renderKitchen();
}
function returnItems() {
  const items = selItems('counter');
  if (!items.length) { toast('Select counter ingredients to send them back.'); return; }
  let refund = 0, snacked = 0;
  items.forEach(i => {
    if (!i.chopped && !i.cook) refund += i.price; else snacked++;
    K.items.splice(K.items.indexOf(i), 1); K.sel.delete(i.uid);
  });
  S.coins += refund;
  if (refund) toast(`↩ Returned to the pantry: +${refund} 🪙`);
  if (snacked) toast(`🥪 ${snacked} piece${snacked > 1 ? 's' : ''} became a happy staff snack!`);
  save(); sfx('pop'); renderKitchen();
}
function addFromPantry(id) {
  const d = ING[id];
  if (S.coins < d.price) { toast('Not enough coins! 🪙 Serve some guests first.'); sfx('sad'); return; }
  S.coins -= d.price;
  const it = newItem(id);
  K.items.push(it);
  if (!S.met[id]) { S.met[id] = true; FX.push({ uid: it.uid, say: d.q || `Hi! I'm ${d.name}! ${moodEmoji(it.mood)}` }); }
  else if (it.dirty && Math.random() < .5) FX.push({ uid: it.uid, say: pick(['I\'m all muddy… 😢', 'Fresh from the garden! (and the dirt)', 'Could use a bath…']) });
  K.inspect = it.uid;
  save(); sfx('pop'); renderKitchen();
}
function clickToken(u) {
  const it = K.items.find(i => i.uid === u); if (!it) return;
  const group = K.items.filter(o => o.zone === it.zone && srcOf(o) === srcOf(it));
  const on = !K.sel.has(u);
  group.forEach(o => on ? K.sel.add(o.uid) : K.sel.delete(o.uid));
  K.inspect = u;
  sfx('pop'); renderKitchen();
}

// ---------- Scoring: love is the secret ingredient ----------
function units(items) {
  const m = new Map();
  items.forEach(i => { const k = srcOf(i); if (!m.has(k)) m.set(k, []); m.get(k).push(i); });
  return [...m.values()].map(arr => {
    const cooks = {}; arr.forEach(i => cooks[i.cook || 'raw'] = (cooks[i.cook || 'raw'] || 0) + 1);
    const cook = Object.entries(cooks).sort((a, b) => b[1] - a[1])[0][0];
    return { d: arr[0].d, items: arr, chopped: arr.some(i => i.chopped), cook: cook === 'raw' ? null : cook, dirty: arr.some(i => i.dirty) };
  });
}
function matchRecipe(recipe, us) {
  const used = new Set();
  return recipe.req.map(q => {
    let best = null, bestScore = -1;
    us.forEach((u, idx) => {
      if (used.has(idx) || u.d !== q.i) return;
      const prepOk = q.prep === '-' || (q.prep === 'c' ? u.chopped : !u.chopped);
      const cookOk = q.cook === 'any' || (q.cook === 'raw' ? !u.cook : u.cook === q.cook);
      const s = (prepOk ? 1 : 0) + (cookOk ? 2 : 0);
      if (s > bestScore) { bestScore = s; best = idx; }
    });
    if (best === null) return { q, found: false };
    used.add(best);
    const u = us[best];
    return { q, found: true, unit: best,
      prepOk: q.prep === '-' || (q.prep === 'c' ? u.chopped : !u.chopped),
      cookOk: q.cook === 'any' || (q.cook === 'raw' ? !u.cook : u.cook === q.cook) };
  });
}
function evaluate() {
  const recipe = curRecipe(), g = curGuest();
  const plate = plateItems(), counter = counterItems();
  const us = units(plate);
  const match = matchRecipe(recipe, us);
  const lines = [];
  if (!plate.length) return { love: 0, stars: 0, lines, match, us };
  const moodAvg = plate.reduce((a, i) => a + i.mood, 0) / plate.length;
  lines.push({ t: `Ingredient happiness (avg ${r1(moodAvg)}/10)`, v: moodAvg * 5 });
  let reqV = 30; const missing = [], wp = [], wc = [];
  match.forEach(m => { if (!m.found) { reqV -= 14; missing.push(ING[m.q.i].name); } else { if (!m.prepOk) { reqV -= 5; wp.push(ING[m.q.i].name); } if (!m.cookOk) { reqV -= 7; wc.push(ING[m.q.i].name); } } });
  lines.push({ t: missing.length ? `Missing: ${missing.join(', ')}` : wp.length || wc.length ? 'Recipe (some steps off)' : 'Recipe followed perfectly', v: Math.max(-30, reqV) });
  if (wp.length) lines.push({ t: `Prep off: ${wp.join(', ')} (check chopped/whole)`, v: 0, info: true });
  if (wc.length) lines.push({ t: `Cooking off: ${wc.join(', ')}`, v: 0, info: true });
  const used = [...K.usedTools].filter(t => K.tools[t]);
  const tAvg = used.length ? used.reduce((a, t) => a + K.tools[t].mood, 0) / used.length : 7;
  lines.push({ t: `Kitchen crew mood (${r1(tAvg)}/10)`, v: (tAvg - 6) * 2.5 });
  let fr = 0, fe = 0; const frNames = [], feNames = [];
  for (let a = 0; a < us.length; a++) for (let b = a + 1; b < us.length; b++) {
    const k = [us[a].d, us[b].d].sort().join('|');
    if (FRIEND_SET.has(k)) { fr++; frNames.push(`${ING[us[a].d].name} 💞 ${ING[us[b].d].name}`); }
    if (FEUD_SET.has(k)) { fe++; feNames.push(`${ING[us[a].d].name} 😤 ${ING[us[b].d].name}`); }
  }
  if (fr) lines.push({ t: `Best friends: ${frNames.slice(0, 3).join(', ')}`, v: Math.min(12, fr * 4) });
  if (fe) lines.push({ t: `Feuding: ${feNames.join(', ')}`, v: -6 * fe });
  const dirty = us.filter(u => u.dirty).length;
  if (dirty) lines.push({ t: `Dirt on the plate! (${dirty})`, v: -8 * dirty });
  const crumbs = counter.filter(i => i.chopped).length;
  if (crumbs) lines.push({ t: `Lonely crumbs left behind (${crumbs})${S.decor.cat ? ' — Crumb the cat comforts them' : ''}`, v: Math.max(-18, -3 * crumbs * (S.decor.cat ? .5 : 1)) });
  const extras = us.filter((u, idx) => !match.some(m => m.unit === idx));
  if (g.quirk) {
    const q = QUIRKS.find(x => x.id === g.quirk);
    let ok = null;
    if (q.type === 'want') ok = extras.some(u => ING[u.d].tags.includes(q.tag));
    if (q.type === 'no') ok = !us.some(u => ING[u.d].tags.includes(q.tag));
    if (q.type === 'joy') ok = plate.every(i => i.mood >= 8);
    if (q.type === 'pure') ok = extras.length === 0;
    if (q.type === 'friends') ok = fr > 0;
    if (q.type === 'crew') ok = tAvg >= 7;
    if (q.type === 'tidy') ok = crumbs === 0;
    lines.push({ t: `${g.name}'s wish: ${ok ? 'granted! 🎉' : 'not met 😔'}`, v: ok ? 12 : -12 });
  }
  const dc = decorCount();
  if (dc) lines.push({ t: `Cozy atmosphere (${dc} decoration${dc > 1 ? 's' : ''})`, v: Math.min(12, dc * 2) });
  const love = clamp(Math.round(lines.reduce((a, l) => a + l.v, 0)), 0, 100);
  const stars = love >= 80 ? 3 : love >= 60 ? 2 : love >= 35 ? 1 : 0;
  return { love, stars, lines, match, us, extras };
}

function serve() {
  if (!plateItems().length) { toast('The plate is empty! Plate some food first 🍽️'); return; }
  const res = evaluate();
  const recipe = curRecipe(), g = curGuest();
  const coins = Math.round(recipe.price * (0.4 + res.love / 100)) + res.stars * 2 + (S.decor.jar ? 3 : 0);
  const starsBefore = S.stars;
  S.coins += coins; S.stars += res.stars; S.served++;
  if (res.stars === 3) S.perfect++;
  S.best[recipe.id] = Math.max(S.best[recipe.id] || 0, res.stars);
  K.dayStars += res.stars; K.dayCoins += coins; K.dayLove.push(res.love);
  g.results.push(res);
  save(); renderTopbar();
  sfx('bell'); setTimeout(() => sfx(res.stars >= 2 ? 'fanfare' : res.stars ? 'happy' : 'sad'), 300);
  const react = [
    ['🥲', 'Oh… it\'s… food. Thank you, I suppose.'],
    ['🙂', 'Hmm, it was alright! The food seemed a little sad though.'],
    ['😋', 'Yum! I could really taste the care!'],
    ['😍', 'OH MY. This is pure LOVE on a plate!'],
  ][res.stars];
  const unlockMsgs = unlockNotes(starsBefore);
  modal(`
    <div class="result">
      <div class="res-guest"><span class="big-emo bounce">${g.e}</span><div class="bubble">${react[1]} ${react[0]}</div></div>
      <h2>${recipe.e} ${recipe.name}</h2>
      <div class="love-meter"><div class="love-fill" style="--to:${res.love}%"></div><span>❤️ Love ${res.love}</span></div>
      <div class="stars-row">${[1, 2, 3].map(n => `<span class="star ${n <= res.stars ? 'on' : ''}" style="animation-delay:${n * .25}s">⭐</span>`).join('')}</div>
      <ul class="breakdown">${res.lines.map(l => `<li class="${l.info ? 'info' : l.v >= 0 ? 'pos' : 'neg'}"><span>${esc(l.t)}</span><b>${l.info ? '' : (l.v >= 0 ? '+' : '') + Math.round(l.v)}</b></li>`).join('')}</ul>
      <div class="earn">+${coins} 🪙 &nbsp; +${res.stars} ⭐</div>
      ${unlockMsgs}
      <button class="btn big" data-act="nextGuest">Continue ➜</button>
    </div>`, { noClose: true });
}

function unlockNotes(before) {
  const msgs = [];
  RESTAURANTS.forEach(r => { if (r.stars > before && r.stars <= S.stars) msgs.push(`🎉 New restaurant unlocked: ${r.e} <b>${r.name}</b>!`); });
  Object.entries(TREATS).forEach(([k, t]) => { if (t.stars > before && t.stars <= S.stars) msgs.push(`🎉 New treatment: ${t.e} <b>${t.name}</b>!`); });
  if (msgs.length) setTimeout(() => sfx('fanfare'), 900);
  return msgs.length ? `<div class="unlocks">${msgs.map(m => `<div>${m}</div>`).join('')}</div>` : '';
}

function nextGuest() {
  closeModal();
  // clear the station: untouched whole items get refunded
  let refund = 0;
  K.items.forEach(i => { if (i.zone === 'counter' && !i.chopped && !i.cook && i.fresh && !i.treats.length) refund += i.price; });
  if (refund) { S.coins += refund; toast(`↩ Unused ingredients back to the pantry: +${refund} 🪙`); }
  K.items = []; K.sel.clear(); K.usedTools.clear(); K.inspect = null; K.chef = null;
  Object.values(K.tools).forEach(t => t.patted = false);
  const g = curGuest();
  if (g.course < g.recipes.length - 1) { g.course++; save(); renderKitchen(); return; }
  K.gi++;
  if (K.gi >= K.guests.length) return endDay();
  save(); renderKitchen();
}

function endDay() {
  S.rest[K.rid].day++;
  save();
  const avg = K.dayLove.length ? Math.round(K.dayLove.reduce((a, b) => a + b, 0) / K.dayLove.length) : 0;
  const r = REST[K.rid];
  const nextR = RESTAURANTS.find(x => x.stars > S.stars);
  modal(`
    <div class="result">
      <div class="big-emo">🌙</div>
      <h2>Day ${K.day + 1} at ${r.e} ${r.name} is done!</h2>
      <p class="muted">The guests waddled home with full, happy tummies.</p>
      <div class="day-stats">
        <div><b>${K.dayStars}</b><span>⭐ stars</span></div>
        <div><b>${K.dayCoins}</b><span>🪙 coins</span></div>
        <div><b>${avg}</b><span>❤️ avg love</span></div>
      </div>
      ${nextR ? `<p>Next unlock: ${nextR.e} <b>${nextR.name}</b> at ${nextR.stars} ⭐ (you have ${S.stars})</p>` : '<p>You\'ve unlocked every restaurant! You\'re a legend. 👑</p>'}
      <div class="row-btns">
        <button class="btn big" data-act="enter" data-id="${K.rid}">Next day ☀️</button>
        <button class="btn ghost" data-act="go" data-screen="map">Town map 🗺️</button>
        <button class="btn ghost" data-act="go" data-screen="market">Market 🛒</button>
      </div>
    </div>`, { noClose: true });
  K = null;
}

// ---------- Hints ----------
function computeHint() {
  const recipe = curRecipe();
  const counter = counterItems(), plate = plateItems();
  const dirty = counter.find(i => i.dirty);
  if (!counter.length && !plate.length) return `Tap ingredients in the <b>pantry</b> below to order them onto your counter. The order card shows what ${esc(curGuest().name)} needs.`;
  if (dirty) { const d = ING[dirty.d]; return `${d.name} is ${d.wash === 'brush' ? 'dusty' : 'muddy'} and sad. Select it, then use ${d.wash === 'brush' ? '🪥 <b>Bristle</b> (water makes mushrooms soggy!)' : '🚰 <b>Splashy</b> the sink'}.`; }
  const lonely = counter.filter(i => i.chopped && !i.cook);
  const m = matchRecipe(recipe, units(plate));
  for (const x of m) {
    if (x.found && x.prepOk && x.cookOk) continue;
    const d = ING[x.q.i];
    const onC = counter.filter(i => i.d === x.q.i);
    if (!onC.length && !x.found) return `You still need <b>${d.name}</b>. Grab it from the pantry!`;
    if (onC.length) {
      const it = onC[0];
      if (x.q.prep === 'c' && !it.chopped) return `<b>${d.name}</b> needs chopping — select it and use 🔪 <b>Snippy</b>.`;
      if (x.q.cook !== 'any' && x.q.cook !== 'raw' && it.cook !== x.q.cook) return `<b>${d.name}</b> should be <b>${cookLabel(x.q.cook, d)}</b> — use ${TOOLS[COOK[x.q.cook].tool].e} <b>${TOOLS[COOK[x.q.cook].tool].name}</b>.`;
      return `<b>${d.name}</b> is ready — select it and press <b>🍽️ Plate</b>.`;
    }
    if (x.found && !x.cookOk) return `<b>${d.name}</b> on the plate isn't cooked right. Order a fresh one?`;
  }
  if (lonely.length) return `Some crumbs are waiting alone on the counter 🥺 — plate or cook them before they get sad!`;
  const glum = plate.find(i => i.mood < 7);
  if (glum) return `<b>${ING[glum.d].name}</b> looks a bit glum. Tap it and read its riddle — then try a treatment 💝`;
  return `Looks lovely! Ring the bell 🔔 to serve — or keep pampering for extra love.`;
}

// ---------- Rendering ----------
let SCREEN = 'title';
function show(screen) {
  SCREEN = screen;
  document.body.dataset.screen = screen;
  render();
  window.scrollTo(0, 0);
}
function render() {
  renderTopbar();
  const main = $('#main');
  if (SCREEN === 'title') main.innerHTML = titleHTML();
  else if (SCREEN === 'map') main.innerHTML = mapHTML();
  else if (SCREEN === 'kitchen') { if (!K) { SCREEN = 'map'; return render(); } renderKitchen(); }
  else if (SCREEN === 'market') main.innerHTML = marketHTML();
  else if (SCREEN === 'notebook') main.innerHTML = notebookHTML();
  else if (SCREEN === 'daily') main.innerHTML = dailyHTML();
}
function renderTopbar() {
  $('#topbar').innerHTML = `
    <button class="logo" data-act="go" data-screen="title" aria-label="Cookle home">${logoHTML(true)}</button>
    <nav>
      <button class="nav ${SCREEN === 'map' ? 'on' : ''}" data-act="go" data-screen="map">🗺️<span>Town</span></button>
      ${K ? `<button class="nav ${SCREEN === 'kitchen' ? 'on' : ''}" data-act="go" data-screen="kitchen">👩‍🍳<span>Kitchen</span></button>` : ''}
      <button class="nav ${SCREEN === 'market' ? 'on' : ''}" data-act="go" data-screen="market">🛒<span>Market</span></button>
      <button class="nav ${SCREEN === 'notebook' ? 'on' : ''}" data-act="go" data-screen="notebook">📓<span>Notebook</span></button>
      <button class="nav ${SCREEN === 'daily' ? 'on' : ''}" data-act="go" data-screen="daily">🧩<span>Daily</span></button>
    </nav>
    <div class="wallet"><span title="Coins">🪙 <b>${S.coins}</b></span><span title="Stars">⭐ <b>${S.stars}</b></span>
      <button class="icon-btn" data-act="mute" title="Sound">${S.muted ? '🔇' : '🔊'}</button>
      <button class="icon-btn" data-act="help" title="How to play">❔</button></div>`;
}
function logoHTML(small) {
  const letters = [['C', '🍪'], ['o', '🍅'], ['o', '🥚'], ['k', '🥦'], ['l', '🧀'], ['e', '🍓']];
  return `<span class="logo-word ${small ? 'small' : ''}">${letters.map(([l, e], i) => `<span class="ll" style="--i:${i}"><span class="ll-e">${e}</span>${l}</span>`).join('')}</span>`;
}

function titleHTML() {
  const parade = shuffle(ING_LIST).slice(0, 14);
  return `
  <section class="title-screen">
    <div class="title-sky"><span class="sun">☀️</span><span class="cloud c1">☁️</span><span class="cloud c2">☁️</span></div>
    <h1 class="big-logo">${logoHTML(false)}</h1>
    <p class="tagline">A cozy, emotional cooking riddle.<br>Wash the sad muddy carrot. Hug the dramatic tomato. Serve love.</p>
    <div class="parade">${parade.map((d, i) => `<div class="parade-item" style="--i:${i}">${ingTokenHTML(d, 9.5, { label: false })}</div>`).join('')}</div>
    <div class="row-btns">
      <button class="btn big" data-act="go" data-screen="map">${S.served ? 'Back to the kitchen' : 'Open the kitchen'} 👩‍🍳</button>
      <button class="btn big alt" data-act="go" data-screen="daily">Daily Cookle 🧩</button>
    </div>
    <button class="btn ghost" data-act="help">How to play</button>
    <p class="muted small">${ING_LIST.length} moody ingredients · ${Object.keys(RECIPES).length} recipes · ${RESTAURANTS.length} restaurants · 0 timers</p>
  </section>`;
}

function mapHTML() {
  return `
  <section class="map">
    <h2 class="screen-title">🏡 Cookle Town</h2>
    <p class="muted center">Earn ⭐ by cooking with love. Stars unlock new restaurants and treatments.</p>
    <div class="rest-grid">
      ${RESTAURANTS.map(r => {
        const un = restUnlocked(r);
        const day = (S.rest[r.id] || {}).day || 0;
        const recs = Object.values(RECIPES).filter(x => x.rest === r.id);
        const best = recs.reduce((a, x) => a + (S.best[x.id] || 0), 0);
        return `<div class="rest-card ${un ? '' : 'locked'}" style="--c:${r.color}">
          <div class="rest-emo">${un ? r.e : '🔒'}${un ? `<span class="rest-face">${faceSVG(8.5, '')}</span>` : ''}</div>
          <h3>${r.name}</h3>
          <p>${r.desc}</p>
          <div class="rest-meta">
            ${un ? `<span>📅 Day ${day + 1}</span><span>📖 ${recs.length} recipes</span><span>⭐ ${best}/${recs.length * 3}</span>` : `<span>Needs ${r.stars} ⭐ (you have ${S.stars})</span>`}
          </div>
          ${r.tools.length ? `<div class="rest-tools">New crew: ${r.tools.map(t => `${TOOLS[t].e} ${TOOLS[t].name}`).join(', ')}</div>` : r.menus ? '<div class="rest-tools">Serves 3-course menus!</div>' : '<div class="rest-tools">Slurpy new recipes</div>'}
          ${un ? `<button class="btn" data-act="enter" data-id="${r.id}">${K && K.rid === r.id ? 'Resume' : 'Open'} ➜</button>` : `<div class="progress"><i style="width:${Math.min(100, S.stars / r.stars * 100)}%"></i></div>`}
        </div>`;
      }).join('')}
    </div>
    <h3 class="sub-title">💝 Treatments</h3>
    <div class="treat-list">${Object.entries(TREATS).map(([k, t]) => `<div class="treat-chip ${treatUnlocked(k) ? '' : 'locked'}">${t.e} ${t.name} ${treatUnlocked(k) ? '✓' : `🔒 ${t.stars}⭐`}</div>`).join('')}</div>
  </section>`;
}

function renderKitchen() {
  const main = $('#main');
  const g = curGuest(), recipe = curRecipe(), r = REST[K.rid];
  const res = evaluate();
  const counter = counterItems(), plate = plateItems();
  const now = Date.now() / 1000;
  const tokHTML = i => {
    const d = ING[i.d];
    const off = (parseInt(i.uid.slice(1)) * .37) % 3;
    return ingTokenHTML(d, i.mood, { uid: i.uid, dirty: i.dirty, piece: i.chopped, cook: i.cook, sel: K.sel.has(i.uid), rot: i.rot, bar: true,
      badge: i.cook ? COOK[i.cook].icon : '', act: 'tok', style: `animation-delay:${-((now + off) % 3).toFixed(2)}s;` });
  };
  const quirk = g.quirk ? QUIRKS.find(q => q.id === g.quirk) : null;
  const ins = K.items.find(i => i.uid === K.inspect);
  main.innerHTML = `
  <section class="kitchen" style="--rc:${r.color}">
    <aside class="k-left">
      <div class="guest-card">
        <div class="guest-top"><span class="guest-emo">${g.e}</span><div><b>${g.name}</b><div class="muted small">Guest ${K.gi + 1} of ${K.guests.length} · ${r.e} Day ${K.day + 1}</div></div></div>
        <div class="bubble">${esc(g.greet.replace('{dish}', recipe.name))}${quirk ? `<div class="quirk">✨ ${esc(quirk.text)}</div>` : ''}</div>
        <div class="queue">${K.guests.map((x, n) => `<span class="${n < K.gi ? 'done' : n === K.gi ? 'now' : ''}">${x.e}</span>`).join('')}</div>
      </div>
      <div class="order-card">
        <div class="order-head"><span class="order-emo">${recipe.e}</span><div><b>${recipe.name}</b>${g.recipes.length > 1 ? `<div class="muted small">Course ${g.course + 1}/3 · ${['Starter', 'Main', 'Dessert'][g.course]}</div>` : ''}<div class="muted small">Pays ~${recipe.price} 🪙</div></div></div>
        <ul class="req-list">
          ${res.match.map(m => {
            const d = ING[m.q.i];
            const st = !m.found ? '' : m.prepOk && m.cookOk ? 'ok' : 'warn';
            const tags = [m.q.prep === 'c' ? '🔪 chopped' : m.q.prep === 'w' ? 'whole' : '', m.q.cook === 'raw' ? '🌱 raw' : m.q.cook !== 'any' ? `${COOK[m.q.cook].icon} ${cookLabel(m.q.cook, d)}` : ''].filter(Boolean).join(' · ');
            return `<li class="${st}"><span class="mini">${emojiHTML(d.e, d.f)}</span><span>${d.name}${tags ? `<em>${tags}</em>` : ''}</span><b>${st === 'ok' ? '✅' : st === 'warn' ? '⚠️' : '⬜'}</b></li>`;
          }).join('')}
        </ul>
      </div>
    </aside>

    <main class="k-center">
      ${S.hints ? `<div class="hint-bar">💡 <span>${computeHint()}</span><button class="x" data-act="hints" title="Hide hints">✕</button></div>` : `<button class="hint-toggle" data-act="hints">💡 Show hints</button>`}
      <div class="counter" id="counter">
        <div class="counter-label">Counter</div>
        ${counter.length ? counter.map(tokHTML).join('') : '<div class="empty">Your counter is empty. Order ingredients from the pantry below ⬇️</div>'}
        ${K.chef ? `<div class="chef-say">👩‍🍳 “${esc(K.chef)}”</div>` : ''}
      </div>
      <div class="sel-row">
        <button class="btn sm" data-act="toPlate">🍽️ Plate selected</button>
        <button class="btn sm ghost" data-act="selAll">Select all</button>
        <button class="btn sm ghost" data-act="selNone">Deselect</button>
        <button class="btn sm ghost" data-act="return" title="Whole, uncooked items are refunded. Others become a staff snack.">↩ Send back</button>
      </div>
      <div class="crew">
        <div class="row-label">Kitchen crew <span class="muted small">(select food, then tap a tool · tap a tool with nothing selected to pat it)</span></div>
        <div class="tool-row">
          ${Object.keys(TOOLS).map(t => {
            const T = TOOLS[t], st = K.tools[t];
            if (!st) return `<div class="tool locked" title="Unlocks with ${REST[T.rest].name}"><div class="tool-body"><span class="emo">🔒</span></div><div class="tok-name">${T.kind}</div></div>`;
            return `<button class="tool" data-act="tool" data-id="${t}" id="tool-${t}" title="${T.name} the ${T.kind}: ${T.desc}">
              <div class="tool-body">${emojiHTML(T.e)}${faceSVG(st.mood, '')}</div>
              <div class="tok-name">${T.name}</div><div class="tool-kind">${T.kind}</div>
              <div class="moodbar"><i style="width:${st.mood * 10}%;background:${moodColor(st.mood)}"></i></div></button>`;
          }).join('')}
        </div>
      </div>
      <div class="treats">
        <div class="row-label">Treat them kindly <span class="muted small">(each works once per ingredient)</span></div>
        <div class="treat-row">
          ${Object.entries(TREATS).map(([k, t]) => `<button class="treat ${treatUnlocked(k) ? '' : 'locked'}" data-act="treat" data-id="${k}"><span>${t.e}</span>${t.name}${treatUnlocked(k) ? '' : `<small>🔒${t.stars}⭐</small>`}</button>`).join('')}
        </div>
      </div>
    </main>

    <aside class="k-right">
      <div class="plate-wrap">
        <div class="plate" id="plate">
          ${plate.length ? plate.map(tokHTML).join('') : '<div class="empty">Plate</div>'}
        </div>
        <div class="plate-mood">
          <div class="plate-face">${emojiHTML('🍽️')}${faceSVG(plate.length ? res.love / 10 : 5, '')}</div>
          <div class="love-mini"><div class="love-fill now" style="width:${res.love}%"></div><span>❤️ ${res.love} love ${'⭐'.repeat(res.stars)}</span></div>
        </div>
        <div class="row-btns tight">
          <button class="btn sm ghost" data-act="fromPlate">⬆ Unplate</button>
          <button class="btn serve" data-act="serve">🔔 Serve</button>
        </div>
      </div>
      <div class="inspect">${ins ? inspectHTML(ins) : '<div class="muted small">👆 Tap an ingredient to read its feelings, riddle and wishes.</div>'}</div>
    </aside>

    <section class="pantry">
      <div class="pantry-tabs">
        <button class="ptab ${K.tab === 'order' ? 'on' : ''}" data-act="tab" data-id="order">⭐ For this order</button>
        ${Object.entries(CATS).filter(([c]) => ING_LIST.some(d => d.cat === c && ingUnlocked(d.id))).map(([c, C]) => `<button class="ptab ${K.tab === c ? 'on' : ''}" data-act="tab" data-id="${c}">${C.e} ${C.name}</button>`).join('')}
      </div>
      <div class="pantry-grid">${pantryHTML(recipe)}</div>
    </section>
  </section>`;
  renderTopbar();
  flushFX();
}

function pantryHTML(recipe) {
  let list;
  if (K.tab === 'order') {
    const ids = [...new Set(recipe.req.map(q => q.i))];
    const pals = new Set();
    ids.forEach(a => FRIENDS.forEach(([x, y]) => { if (x === a && ingUnlocked(y)) pals.add(y); if (y === a && ingUnlocked(x)) pals.add(x); }));
    ids.forEach(i => pals.delete(i));
    const q = curGuest().quirk ? QUIRKS.find(x => x.id === curGuest().quirk) : null;
    let wish = [];
    if (q && q.type === 'want') wish = ING_LIST.filter(d => d.tags.includes(q.tag) && ingUnlocked(d.id) && !ids.includes(d.id)).slice(0, 6).map(d => d.id);
    list = ids.map(i => ING[i]);
    const tile = (d, tag) => pTile(d, tag);
    return list.map(d => tile(d, 'needed')).join('') +
      (wish.length ? `<div class="pantry-sep">✨ For the guest's wish</div>` + wish.map(i => tile(ING[i], 'wish')).join('') : '') +
      (pals.size ? `<div class="pantry-sep">💞 Their best friends</div>` + [...pals].slice(0, 10).map(i => tile(ING[i], 'pal')).join('') : '');
  }
  list = ING_LIST.filter(d => d.cat === K.tab && ingUnlocked(d.id));
  return list.map(d => pTile(d)).join('');
}
function pTile(d, tag) {
  return `<button class="ptile ${tag || ''} ${S.coins < d.price ? 'poor' : ''}" data-act="pan" data-id="${d.id}" title="${d.name} (${PERS[d.p].name}) — ${d.price} coins">
    ${ingTokenHTML(d, PERS[d.p].base + 1.5, { label: false })}<span class="pt-name">${d.name}</span><span class="pt-price">${d.price}🪙</span></button>`;
}

function inspectHTML(i) {
  const d = ING[i.d], P = PERS[d.p], nb = S.nb[d.p] || {};
  const wash = { rinse: 'Rinse me in the sink when muddy.', brush: 'Water makes me soggy — use a gentle brush!', either: 'Muddy? A rinse or a brush, both fine.', none: 'Already clean. Please keep me dry!' }[d.wash];
  return `
    <div class="ins-head">${ingTokenHTML(d, i.mood, { label: false, dirty: i.dirty, cook: i.cook })}<div><b>${d.name}</b>${i.chopped ? ' <span class="muted">(piece)</span>' : ''}
      <div class="small">${P.name} · feeling <b>${moodWord(i.mood)}</b> ${moodEmoji(i.mood)} (${r1(i.mood)}/10)</div></div></div>
    ${d.q ? `<div class="ins-quote">“${esc(d.q)}”</div>` : ''}
    <div class="ins-riddle">🧩 ${esc(P.riddle)}</div>
    ${nb.like || nb.dislike || S.decor.books ? `<div class="ins-known">📓 ${nb.like ? `Loves ${TREATS[P.like].e}` : S.decor.books ? `Maybe ${TREATS[P.like].e}?` : 'Loves ❓'} · ${nb.dislike ? `Dislikes ${TREATS[P.dislike].e}` : 'Dislikes ❓'}</div>` : ''}
    <ul class="ins-list">
      <li>${i.dirty ? '🟤 ' : '✨ '}${i.dirty ? wash : d.wash === 'none' ? wash : 'Clean and comfy.'}</li>
      ${d.lv ? `<li>💭 ${COOK[d.lv].dream}</li>` : ''}
      ${d.ht ? `<li>😨 Afraid of ${COOK[d.ht].fear}.</li>` : ''}
      ${d.nc ? `<li>🥶 Must NOT be cooked — I\'ll melt or sulk!</li>` : ''}
      <li>${d.chop ? `🔪 Can be chopped into ${d.pc} pieces.` : '🙅 Can\'t be chopped.'}</li>
      ${i.treats.length ? `<li>💝 Already got: ${i.treats.map(t => TREATS[t].e).join(' ')}</li>` : ''}
      ${i.cook ? `<li>${COOK[i.cook].icon} ${COOK[i.cook].label}</li>` : ''}
    </ul>`;
}

// floating texts & speech bubbles after render
function flushFX() {
  const fx = FX; FX = [];
  let delay = 0;
  fx.forEach(f => {
    if (f.note) { setTimeout(() => toast(f.note, 'note'), 200); return; }
    const host = f.uid && (f.uid.startsWith('tool-') ? document.getElementById(f.uid) : document.querySelector(`[data-uid="${f.uid}"]`));
    if (!host) return;
    const el = document.createElement('div');
    if (f.say) { el.className = 'say ' + (f.kind || ''); el.textContent = f.say; el.style.animationDelay = delay + 's'; delay += .15; }
    else { el.className = 'float ' + (f.cls || ''); el.textContent = f.text; }
    host.appendChild(el);
    setTimeout(() => el.remove(), f.say ? 3200 : 1400);
  });
}

// ---------- Market ----------
function marketHTML() {
  const packIng = p => ING_LIST.filter(d => ING_UNLOCK[d.id] === p.id);
  return `
  <section class="market">
    <h2 class="screen-title">🛒 The Cozy Market</h2>
    <p class="muted center">Grandpa Gourd's stall. New friends for your pantry and cozy things for your kitchen.</p>
    <h3 class="sub-title">🧺 Ingredient packs</h3>
    <div class="shop-grid">
      ${PACKS.map(p => {
        const list = packIng(p); const own = !!S.packs[p.id];
        return `<div class="shop-card ${own ? 'owned' : ''}">
          <div class="shop-emo">${p.e}</div><h4>${p.name}</h4><p>${p.desc}</p>
          <div class="pack-preview">${list.slice(0, 14).map(d => `<span title="${d.name}">${emojiHTML(d.e, d.f)}</span>`).join('')}${list.length > 14 ? `<span class="more">+${list.length - 14}</span>` : ''}</div>
          <div class="muted small">${list.length} new ingredients</div>
          ${own ? '<div class="owned-tag">✓ In your pantry</div>' : `<button class="btn ${S.coins < p.price ? 'disabled' : ''}" data-act="buyPack" data-id="${p.id}">Buy · ${p.price} 🪙</button>`}
        </div>`;
      }).join('')}
    </div>
    <h3 class="sub-title">🕯️ Cozy decorations <span class="muted small">(+2 love each, max +12)</span></h3>
    <div class="shop-grid">
      ${DECOR.map(x => {
        const own = !!S.decor[x.id];
        return `<div class="shop-card ${own ? 'owned' : ''}">
          <div class="shop-emo decor-emo">${emojiHTML(x.e)}${faceSVG(own ? 9.5 : 6, '')}</div><h4>${x.name}</h4><p>${x.desc}</p>
          ${own ? '<div class="owned-tag">✓ In your kitchen</div>' : `<button class="btn ${S.coins < x.price ? 'disabled' : ''}" data-act="buyDecor" data-id="${x.id}">Buy · ${x.price} 🪙</button>`}
        </div>`;
      }).join('')}
    </div>
  </section>`;
}
function buyPack(id) {
  const p = PACKS.find(x => x.id === id);
  if (S.packs[id] || S.coins < p.price) { toast('Not enough coins yet! 🪙'); sfx('sad'); return; }
  S.coins -= p.price; S.packs[id] = true; save(); sfx('coin'); toast(`${p.e} ${p.name} delivered! New friends in your pantry.`); render();
}
function buyDecor(id) {
  const x = DECOR.find(d => d.id === id);
  if (S.decor[id] || S.coins < x.price) { toast('Not enough coins yet! 🪙'); sfx('sad'); return; }
  S.coins -= x.price; S.decor[id] = true; save(); sfx('coin'); toast(`${x.e} ${x.name} moved in! It looks very happy.`); render();
}

// ---------- Notebook ----------
let NB_TAB = 'pers';
function notebookHTML() {
  const metN = Object.keys(S.met).length;
  let body = '';
  if (NB_TAB === 'pers') {
    body = `<p class="muted center">Treat ingredients to discover what each personality loves and dislikes.</p>
    <div class="pers-grid">${Object.entries(PERS).map(([k, P]) => {
      const nb = S.nb[k] || {};
      const ex = ING_LIST.filter(d => d.p === k).slice(0, 5);
      return `<div class="pers-card"><div class="pers-face">${faceSVG(8, k)}</div><h4>${P.name}</h4>
        <div class="pers-ex">${ex.map(d => emojiHTML(d.e, d.f)).join('')}</div>
        <p class="small">🧩 ${esc(P.riddle)}</p>
        <div class="pers-known"><span>❤️ ${nb.like ? TREATS[P.like].e + ' ' + TREATS[P.like].name : '❓'}</span><span>💔 ${nb.dislike ? TREATS[P.dislike].e + ' ' + TREATS[P.dislike].name : '❓'}</span></div></div>`;
    }).join('')}</div>`;
  } else if (NB_TAB === 'ing') {
    body = `<p class="muted center">You've met ${metN} of ${ING_LIST.length} ingredients.</p>
    <div class="coll-grid">${ING_LIST.map(d => S.met[d.id]
      ? `<div class="coll met" title="${d.name} — ${PERS[d.p].name}${d.q ? ': ' + d.q : ''}">${ingTokenHTML(d, 8, { label: false })}<span>${d.name}</span></div>`
      : `<div class="coll" title="Not met yet">${emojiHTML(d.e, 'brightness(0) opacity(.2)')}<span>???</span></div>`).join('')}</div>`;
  } else if (NB_TAB === 'rec') {
    body = RESTAURANTS.map(r => `<h3 class="sub-title">${r.e} ${r.name}</h3><div class="rec-grid">${Object.values(RECIPES).filter(x => x.rest === r.id).map(x => `
      <div class="rec-card ${S.best[x.id] !== undefined ? '' : 'unknown'}"><span class="rec-emo">${x.e}</span><b>${x.name}</b>
      <div class="rec-ings">${x.req.map(q => emojiHTML(ING[q.i].e, ING[q.i].f)).join('')}</div>
      <div>${S.best[x.id] !== undefined ? '⭐'.repeat(S.best[x.id]) + '☆'.repeat(3 - S.best[x.id]) : '<span class="muted small">not cooked yet</span>'}</div></div>`).join('')}</div>`).join('');
  } else {
    body = `<div class="stats-grid">
      <div><b>${S.served}</b><span>dishes served</span></div><div><b>${S.perfect}</b><span>perfect ⭐⭐⭐</span></div>
      <div><b>${S.stars}</b><span>stars earned</span></div><div><b>${metN}</b><span>friends met</span></div>
      <div><b>${Object.keys(S.nb).length}/12</b><span>personalities studied</span></div><div><b>${decorCount()}</b><span>decorations</span></div></div>
      <div class="center"><button class="btn ghost" data-act="reset">🗑️ Reset save</button></div>`;
  }
  return `<section class="notebook"><h2 class="screen-title">📓 Chef's Notebook</h2>
    <div class="nb-tabs">${[['pers', '🧠 Personalities'], ['ing', '🥕 Ingredients'], ['rec', '📖 Recipes'], ['stats', '📊 Stats']].map(([k, n]) => `<button class="ptab ${NB_TAB === k ? 'on' : ''}" data-act="nbTab" data-id="${k}">${n}</button>`).join('')}</div>
    ${body}</section>`;
}

// ---------- Modal & toast ----------
function modal(html, opts = {}) {
  const m = $('#modal');
  m.innerHTML = `<div class="modal-card">${opts.noClose ? '' : '<button class="x modal-x" data-act="closeModal">✕</button>'}${html}</div>`;
  m.classList.add('open');
  m.dataset.noclose = opts.noClose ? '1' : '';
}
function closeModal() { $('#modal').classList.remove('open'); $('#modal').innerHTML = ''; }
function toast(msg, cls = '') {
  const t = document.createElement('div');
  t.className = 'toast ' + cls; t.innerHTML = msg;
  $('#toasts').appendChild(t);
  setTimeout(() => t.classList.add('out'), 2800);
  setTimeout(() => t.remove(), 3300);
}
function helpModal() {
  modal(`<div class="help">
    <h2>How to cook in ${logoHTML(true)}</h2>
    <p>No timers, no rush. Just feelings. Every ingredient (and every pot and pan) has a <b>mood</b>, and the <b>love</b> in a dish decides how delicious it is.</p>
    <ol>
      <li>🐻 A hungry guest orders a dish. Check the <b>order card</b>.</li>
      <li>🧺 Order ingredients from the <b>pantry</b> (they cost a few coins).</li>
      <li>🚰 Muddy veggies are sad! Rinse them with <b>Splashy</b>. Mushrooms prefer <b>Bristle</b> the brush. Never wash bread, cheese or meat!</li>
      <li>🔪 Chop with <b>Snippy</b>. Little pieces stay happy… but if you leave crumbs alone on the counter, they get lonely 🥺 with every action you take.</li>
      <li>🍳 Cook with the crew. Each ingredient secretly dreams of one method and fears another — read their feelings!</li>
      <li>💝 Treat them: pat, joke, sing, whisper, hug, tickle. Each personality is a riddle: one treatment they <b>love</b>, one they <b>dislike</b>.</li>
      <li>💞 Best friends on the same plate add love. Feuding foods… don't.</li>
      <li>🔔 Plate it and serve. Love ≥ 35 = ⭐, 60 = ⭐⭐, 80 = ⭐⭐⭐.</li>
    </ol>
    <p>Stars unlock restaurants and treatments. Coins buy ingredient packs and cozy decorations. Try the 🧩 <b>Daily Cookle</b> riddle too!</p>
    <button class="btn big" data-act="closeModal">Let's cook! 👩‍🍳</button></div>`);
}

// ---------- Events ----------
document.addEventListener('click', e => {
  const el = e.target.closest('[data-act]');
  if (!el) {
    if (e.target.id === 'modal' && !$('#modal').dataset.noclose) closeModal();
    return;
  }
  const act = el.dataset.act, id = el.dataset.id;
  switch (act) {
    case 'go': closeModal(); show(el.dataset.screen); break;
    case 'enter':
      closeModal();
      if (K && K.rid === id) show('kitchen');
      else if (K && K.rid !== id) { if (confirm('Leave the current day? Its remaining guests will go home.')) { K = null; startDay(id); } }
      else startDay(id);
      if (!S.intro) { S.intro = true; save(); helpModal(); }
      break;
    case 'tok': clickToken(el.dataset.uid); break;
    case 'tool': useTool(id); break;
    case 'treat': treat(id); break;
    case 'pan': addFromPantry(id); break;
    case 'tab': K.tab = id; renderKitchen(); break;
    case 'toPlate': toPlate(); break;
    case 'fromPlate': fromPlate(); break;
    case 'return': returnItems(); break;
    case 'selAll': counterItems().forEach(i => K.sel.add(i.uid)); renderKitchen(); break;
    case 'selNone': K.sel.clear(); renderKitchen(); break;
    case 'serve': serve(); break;
    case 'nextGuest': nextGuest(); break;
    case 'buyPack': buyPack(id); break;
    case 'buyDecor': buyDecor(id); break;
    case 'nbTab': NB_TAB = id; render(); break;
    case 'mute': S.muted = !S.muted; save(); renderTopbar(); break;
    case 'hints': S.hints = !S.hints; save(); renderKitchen(); break;
    case 'help': helpModal(); break;
    case 'closeModal': closeModal(); break;
    case 'reset': if (confirm('Reset all Cookle progress? Your ingredients will miss you.')) { localStorage.removeItem(SAVE_KEY); S = freshSave(); K = null; show('title'); } break;
    default: if (window.dailyAction) window.dailyAction(act, el, e);
  }
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && $('#modal').classList.contains('open') && !$('#modal').dataset.noclose) closeModal();
});

window.addEventListener('DOMContentLoaded', () => show('title'));
