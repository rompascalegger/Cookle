/* ===========================================================
   COOKLE — comic faces. Everything has a mood. Everything.
   =========================================================== */

const INK = '#2a1a12';

function moodWord(m) {
  if (m >= 9) return 'ecstatic';
  if (m >= 7) return 'happy';
  if (m >= 5) return 'okay';
  if (m >= 3) return 'glum';
  if (m >= 1.5) return 'sad';
  return 'miserable';
}
function moodEmoji(m) {
  return m >= 9 ? '😍' : m >= 7 ? '😊' : m >= 5 ? '🙂' : m >= 3 ? '😕' : m >= 1.5 ? '😢' : '😭';
}

// p = personality key (affects brows/lids), extra: {sleepy, dirty}
function faceSVG(mood, p = '', extra = {}) {
  const w = moodWord(mood);
  const lx = 37, rx = 63, ey = 46;
  let eyes = '', mouth = '', brows = '', cheeks = '', tears = '', deco = '';

  const openEye = (x, look = 0) =>
    `<ellipse cx="${x}" cy="${ey}" rx="7.2" ry="8.4" fill="#fff" stroke="${INK}" stroke-width="2.6"/>` +
    `<circle cx="${x + look}" cy="${ey + 1.5}" r="4" fill="${INK}"/>` +
    `<circle cx="${x + look + 1.6}" cy="${ey - 0.6}" r="1.5" fill="#fff"/>`;
  const happyEye = x => `<path d="M${x - 7} ${ey + 2} Q${x} ${ey - 8} ${x + 7} ${ey + 2}" fill="none" stroke="${INK}" stroke-width="3.4" stroke-linecap="round"/>`;
  const cryEye = x => `<path d="M${x - 7} ${ey - 1} Q${x} ${ey + 6} ${x + 7} ${ey - 1}" fill="none" stroke="${INK}" stroke-width="3.4" stroke-linecap="round"/>`;

  if (w === 'ecstatic') { eyes = happyEye(lx) + happyEye(rx); }
  else if (w === 'miserable') { eyes = cryEye(lx) + cryEye(rx); }
  else { const look = w === 'sad' || w === 'glum' ? -0.5 : 0.5; eyes = openEye(lx, look) + openEye(rx, look); }

  // sleepy / philosopher lids
  if ((p === 'sl' || extra.sleepy) && w !== 'ecstatic' && w !== 'miserable') {
    eyes += `<path d="M${lx - 8} ${ey - 1} Q${lx} ${ey - 10} ${lx + 8} ${ey - 1} Z" fill="${INK}" opacity=".85"/>` +
            `<path d="M${rx - 8} ${ey - 1} Q${rx} ${ey - 10} ${rx + 8} ${ey - 1} Z" fill="${INK}" opacity=".85"/>`;
  }
  // lashes for fancy & shy
  if ((p === 'fa' || p === 'sh') && w !== 'miserable') {
    brows += `<path d="M${lx - 7} ${ey - 7} l-4 -3 M${lx - 4} ${ey - 9} l-2 -4 M${rx + 7} ${ey - 7} l4 -3 M${rx + 4} ${ey - 9} l2 -4" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>`;
  }
  // brows
  if (p === 'gr' && mood < 8.5) {
    brows += `<path d="M${lx - 9} ${ey - 13} L${lx + 6} ${ey - 9} M${rx + 9} ${ey - 13} L${rx - 6} ${ey - 9}" stroke="${INK}" stroke-width="3.6" stroke-linecap="round"/>`;
  } else if (p === 'sa' && mood < 9) {
    brows += `<path d="M${lx - 8} ${ey - 11} L${lx + 6} ${ey - 11} M${rx - 7} ${ey - 13} Q${rx} ${ey - 19} ${rx + 8} ${ey - 14}" fill="none" stroke="${INK}" stroke-width="3.2" stroke-linecap="round"/>`;
  } else if (w === 'sad' || w === 'glum' || p === 'an' || p === 'dr') {
    if (mood < 7 || p === 'an') brows += `<path d="M${lx - 8} ${ey - 10} L${lx + 5} ${ey - 14} M${rx + 8} ${ey - 10} L${rx - 5} ${ey - 14}" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`;
  }

  // mouths
  const my = 68;
  switch (w) {
    case 'ecstatic':
      mouth = `<path d="M36 ${my - 4} Q50 ${my + 18} 64 ${my - 4} Z" fill="${INK}" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>` +
              `<path d="M43 ${my + 5} Q50 ${my + 1} 57 ${my + 5} Q50 ${my + 11} 43 ${my + 5}Z" fill="#ff6f7d"/>`; break;
    case 'happy':
      mouth = `<path d="M38 ${my - 2} Q50 ${my + 11} 62 ${my - 2}" fill="none" stroke="${INK}" stroke-width="3.6" stroke-linecap="round"/>`; break;
    case 'okay':
      mouth = `<path d="M42 ${my} Q50 ${my + 5} 58 ${my}" fill="none" stroke="${INK}" stroke-width="3.4" stroke-linecap="round"/>`; break;
    case 'glum':
      mouth = `<path d="M41 ${my + 2} Q46 ${my - 1} 50 ${my + 2} T59 ${my + 1}" fill="none" stroke="${INK}" stroke-width="3.2" stroke-linecap="round"/>`; break;
    case 'sad':
      mouth = `<path d="M40 ${my + 5} Q50 ${my - 5} 60 ${my + 5}" fill="none" stroke="${INK}" stroke-width="3.6" stroke-linecap="round"/>`; break;
    default:
      mouth = `<path d="M38 ${my + 8} Q50 ${my - 6} 62 ${my + 8} Z" fill="${INK}" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>`;
  }
  if (p === 'gi' && (w === 'happy' || w === 'okay')) mouth += `<path d="M47 ${my + 3} q3 6 6 0" fill="#ff6f7d" stroke="${INK}" stroke-width="1.6"/>`;

  if (mood >= 6.5 || p === 'sh') cheeks = `<ellipse cx="${lx - 8}" cy="${ey + 15}" rx="6" ry="3.6" fill="#ff7a8a" opacity="${p === 'sh' ? .8 : .55}"/><ellipse cx="${rx + 8}" cy="${ey + 15}" rx="6" ry="3.6" fill="#ff7a8a" opacity="${p === 'sh' ? .8 : .55}"/>`;
  if (w === 'sad' || w === 'miserable') {
    tears = `<path class="tear" d="M${lx - 3} ${ey + 8} q-3 7 0 10 q3 -3 0 -10z" fill="#7fd0ff" stroke="#3a8fc4" stroke-width="1"/>`;
    if (w === 'miserable') tears += `<path class="tear t2" d="M${rx + 3} ${ey + 8} q-3 7 0 10 q3 -3 0 -10z" fill="#7fd0ff" stroke="#3a8fc4" stroke-width="1"/>`;
  }
  if (p === 'fa' && mood >= 5) deco = `<path d="M44 ${my + 13} l6 -3 l6 3 l-6 3z M50 ${my + 13} m-1 0 a1 1 0 1 0 2 0" fill="#d0394b" stroke="${INK}" stroke-width="1.4"/>`;

  return `<svg class="face" viewBox="0 0 100 100" aria-hidden="true"><g class="eyes">${eyes}</g>${brows}${cheeks}${mouth}${tears}${deco}</svg>`;
}

// Generic token renderer (ingredient defs or instances)
function emojiHTML(e, filter = '', extraClass = '') {
  return `<span class="emo ${extraClass}" style="${filter ? `filter:${filter};` : ''}">${e}</span>`;
}

function ingTokenHTML(def, mood, opts = {}) {
  const cls = ['tok', opts.cls || ''];
  if (opts.dirty) cls.push('dirty');
  if (opts.piece) cls.push('piece');
  if (opts.cook) cls.push('ck-' + opts.cook);
  if (opts.sel) cls.push('sel');
  const style = (opts.piece ? `--rot:${opts.rot || 0}deg;` : '') + (opts.style || '');
  return `<div class="${cls.join(' ')}" ${opts.uid ? `data-uid="${opts.uid}"` : ''} ${opts.act ? `data-act="${opts.act}"` : ''} style="${style}--sm:${def.sm || 1}" title="${def.name} — ${moodWord(mood)}">
    <div class="tok-body">
      ${emojiHTML(def.e, def.f)}
      ${opts.cook ? `<span class="cook-fx fx-${opts.cook}"></span>` : ''}
      ${opts.dirty ? '<span class="mud"></span><span class="stink">〰</span>' : ''}
      ${faceSVG(mood, def.p, {})}
    </div>
    ${opts.label !== false ? `<div class="tok-name">${opts.piece ? '' : def.name}</div>` : ''}
    ${opts.bar ? `<div class="moodbar"><i style="width:${Math.max(4, mood * 10)}%;background:${moodColor(mood)}"></i></div>` : ''}
    ${opts.badge ? `<span class="tok-badge">${opts.badge}</span>` : ''}
  </div>`;
}
function moodColor(m) {
  if (m >= 8) return '#5cc96b';
  if (m >= 6) return '#a8d65a';
  if (m >= 4) return '#f2c14e';
  if (m >= 2) return '#f08a4b';
  return '#e05555';
}
