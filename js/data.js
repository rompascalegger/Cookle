/* ===========================================================
   COOKLE — game data
   Every ingredient has a personality, a mood and opinions.
   =========================================================== */

// ---------- Personalities (the riddle!) ----------
// Each personality LOVES one treatment and DISLIKES another.
// The riddle text hints at it without saying it outright.
const PERS = {
  ch: { name: 'Cheerful',    like: 'sing',    dislike: 'whisper', base: 7, riddle: 'Hums a little tune all day long. Secrets make them suspicious.' },
  sh: { name: 'Shy',         like: 'whisper', dislike: 'sing',    base: 5, riddle: 'Blushes at loud noises. Prefers soft, quiet words.' },
  gr: { name: 'Grumpy',      like: 'joke',    dislike: 'hug',     base: 4, riddle: 'Frowns a lot… but you can hear a hidden giggle. Personal space, PLEASE.' },
  dr: { name: 'Dramatic',    like: 'hug',     dislike: 'joke',    base: 5, riddle: 'Every moment is a tragedy that needs comforting arms. This is NO laughing matter!' },
  sl: { name: 'Sleepy',      like: 'pat',     dislike: 'tickle',  base: 5, riddle: 'Yawns constantly. A gentle hand on the head is lovely. Nothing feathery!' },
  gi: { name: 'Giggly',      like: 'tickle',  dislike: 'pat',     base: 6, riddle: 'Can\'t stop wiggling. Feathers? Oh no. Oh YES. Pats are sooo boring.' },
  fa: { name: 'Fancy',       like: 'sing',    dislike: 'tickle',  base: 5, riddle: 'Adores the opera, darling. Feathers and wiggling are undignified.' },
  an: { name: 'Anxious',     like: 'pat',     dislike: 'joke',    base: 4, riddle: 'Jumpy. Surprise punchlines are terrifying. A reassuring hand helps.' },
  sa: { name: 'Sassy',       like: 'joke',    dislike: 'pat',     base: 5, riddle: 'Witty comebacks for days. Don\'t. Touch. The hair.' },
  cu: { name: 'Cuddly',      like: 'hug',     dislike: 'whisper', base: 6, riddle: 'Arms always open for a squeeze. Mumbling? Speak UP, sweetie!' },
  ph: { name: 'Philosopher', like: 'whisper', dislike: 'tickle',  base: 5, riddle: 'Ponders the meaning of soup. Enjoys deep, hushed conversations. Wiggling disrupts thought.' },
  ad: { name: 'Adventurous', like: 'tickle',  dislike: 'hug',     base: 6, riddle: 'Craves thrills and surprises — feathers included! Clingy? No thanks.' },
};

// ---------- Treatments (funny ways to treat your food) ----------
const TREATS = {
  pat:     { name: 'Pat',     e: '🤚', stars: 0,  verb: 'pat' },
  joke:    { name: 'Joke',    e: '😂', stars: 0,  verb: 'tell a joke to' },
  sing:    { name: 'Sing',    e: '🎵', stars: 5,  verb: 'sing to' },
  whisper: { name: 'Whisper', e: '🤫', stars: 12, verb: 'whisper to' },
  hug:     { name: 'Hug',     e: '🤗', stars: 20, verb: 'hug' },
  tickle:  { name: 'Tickle',  e: '🪶', stars: 32, verb: 'tickle' },
};

const JOKES = [
  'Why did the tomato blush? It saw the salad dressing!',
  'What do you call a sad strawberry? A blueberry!',
  'Why did the mushroom get invited to every party? He\'s a fungi!',
  'I\'d tell you a pizza joke, but it\'s a little cheesy.',
  'What did the bread say to the butter? "I loaf you."',
  'Why don\'t eggs tell jokes? They\'d crack each other up!',
  'What\'s a potato\'s favourite TV show? Starch Trek!',
  'Lettuce romaine calm and carrot on.',
  'Why was the cucumber mad? It was in a pickle!',
  'What do you call cheese that isn\'t yours? Nacho cheese!',
  'Why did the banana go to the doctor? It wasn\'t peeling well.',
  'I\'m on a seafood diet. I see food and I eat it.',
  'What do you call a fake noodle? An impasta!',
  'Orange you glad I didn\'t say banana?',
  'Peas out! ✌️',
  'Why did the cookie cry? Its mom was a wafer too long.',
];
const SONGS = ['🎵 La la laaa, you\'re my favourite sprout~ 🎵', '🎶 O sole miooo~ 🎶', '🎵 Twinkle twinkle little pea~ 🎵', '🎶 Doo-wop, shoo-bop, you\'re the top! 🎶', '🎵 You are my sunshine, my only sunshine~ 🎵'];
const WHISPERS = ['(psst… you\'re doing great)', '(I think you\'re the best one here)', '(secretly, you\'re my favourite)', '(the universe is vast, and you are delicious)'];

// ---------- Kitchen crew (tools have feelings too) ----------
const TOOLS = {
  sink:  { name: 'Splashy',     kind: 'Sink',        e: '🚰', act: 'wash',  rest: 'shack',    desc: 'Rinses muddy veggies & fruit.' },
  brush: { name: 'Bristle',     kind: 'Veggie Brush', e: '🪥', act: 'brush', rest: 'shack',   desc: 'Gently scrubs mushrooms & roots.' },
  knife: { name: 'Snippy',      kind: 'Knife',       e: '🔪', act: 'chop',  rest: 'shack',    desc: 'Chops things into happy little pieces.' },
  pan:   { name: 'Sizzle',      kind: 'Pan',         e: '🍳', act: 'cook', m: 'fried',   rest: 'shack',    desc: 'Fries things golden.' },
  grill: { name: 'Toasty',      kind: 'Grill',       e: '🔥', act: 'cook', m: 'grilled', rest: 'shack',    desc: 'Grills and toasts.' },
  oven:  { name: 'Nonna Brick', kind: 'Oven',        e: '🧱', act: 'cook', m: 'baked',   rest: 'pizzeria', desc: 'Bakes everything cozy.' },
  pot:   { name: 'Big Bubba',   kind: 'Pot',         e: '🍲', act: 'cook', m: 'boiled',  rest: 'bistro',   desc: 'A hot bath for food.' },
  bowl:  { name: 'Whiskers',    kind: 'Mixing Bowl', e: '🥣', act: 'cook', m: 'whipped', rest: 'bakery',   desc: 'Whips things fluffy.' },
};
const COOK = {
  fried:   { label: 'fried',   icon: '🍳', tool: 'pan',   dream: 'Wants to SIZZLE in a pan!',          fear: 'the frying pan' },
  grilled: { label: 'grilled', icon: '🔥', tool: 'grill', dream: 'Craves golden grill stripes.',        fear: 'the grill' },
  baked:   { label: 'baked',   icon: '🧱', tool: 'oven',  dream: 'Dreams of a warm, cozy oven.',        fear: 'the oven' },
  boiled:  { label: 'boiled',  icon: '🍲', tool: 'pot',   dream: 'Would love a hot bubbly bath.',       fear: 'the big pot' },
  whipped: { label: 'whipped', icon: '🥣', tool: 'bowl',  dream: 'Wants to get light and fluffy!',      fear: 'the mixing bowl' },
};

// ---------- Categories ----------
const CATS = {
  veg:    { name: 'Veggies',   e: '🥕', wash: 'rinse', chop: true,  price: 2 },
  mush:   { name: 'Mushrooms', e: '🍄', wash: 'brush', chop: true,  price: 2, lv: 'fried' },
  fruit:  { name: 'Fruit',     e: '🍎', wash: 'rinse', chop: true,  price: 2, ht: 'fried' },
  herb:   { name: 'Herbs',     e: '🌿', wash: 'rinse', chop: true,  price: 1, pc: 2, ht: 'fried' },
  dairy:  { name: 'Dairy & Eggs', e: '🧀', wash: 'none', chop: false, price: 2 },
  meat:   { name: 'Meat',      e: '🍗', wash: 'none', chop: true,  price: 4, lv: 'grilled', ht: 'boiled' },
  fish:   { name: 'Sea Friends', e: '🦐', wash: 'rinse', chop: true, price: 5, lv: 'grilled', ht: 'whipped' },
  grain:  { name: 'Bread & Grains', e: '🍞', wash: 'none', chop: false, price: 2, lv: 'grilled', ht: 'boiled' },
  pasta:  { name: 'Pasta & Noodles', e: '🍝', wash: 'none', chop: false, price: 2, lv: 'boiled', ht: 'grilled' },
  legume: { name: 'Beans & Tofu', e: '🫘', wash: 'none', chop: false, price: 2, lv: 'boiled' },
  nut:    { name: 'Nuts & Seeds', e: '🌰', wash: 'none', chop: true, price: 2, pc: 2, lv: 'baked', ht: 'boiled' },
  sauce:  { name: 'Sauces',    e: '🍯', wash: 'none', chop: false, price: 1 },
  spice:  { name: 'Spices',    e: '🧂', wash: 'none', chop: false, price: 1 },
  sweet:  { name: 'Sweets',    e: '🍫', wash: 'none', chop: false, price: 2 },
  misc:   { name: 'Pantry Oddities', e: '🍿', wash: 'none', chop: false, price: 2 },
};

// ---------- Ingredients (240+ moody friends) ----------
const ING = {};
const ING_LIST = [];
function D(id, name, e, cat, p, o = {}) {
  const c = CATS[cat];
  const d = {
    id, name, e, cat, p,
    f: o.f ? parseFilter(o.f) : '',
    wash: o.w || c.wash,
    chop: o.ch !== undefined ? o.ch : (o.t && o.t.includes('cheese') ? true : c.chop),
    pc: o.pc || c.pc || 3,
    lv: o.lv !== undefined ? o.lv : (o.t && o.t.includes('cheese') ? 'baked' : c.lv || null),
    ht: o.ht !== undefined ? o.ht : c.ht || null,
    nc: !!o.nc,
    tags: o.t || [],
    price: o.pr || (o.t && o.t.includes('cheese') ? 3 : c.price),
    q: o.q || null,
    sm: o.sm || 1,
  };
  if (d.lv === d.ht) d.ht = null;
  ING[id] = d; ING_LIST.push(d);
}
function parseFilter(s) {
  return s.split(' ').map(t => {
    const m = t.match(/^(sp|h|s|b|g)(-?[\d.]+)$/); if (!m) return '';
    const v = m[2];
    return { h: `hue-rotate(${v}deg)`, s: `saturate(${v})`, b: `brightness(${v})`, g: `grayscale(${v})`, sp: `sepia(${v})` }[m[1]];
  }).join(' ');
}

// --- Veggies ---
D('tomato', 'Tomato', '🍅', 'veg', 'dr', { lv: 'baked', q: 'Am I a fruit? Am I a vegetable? WHO AM I?!' });
D('cherrytomato', 'Cherry Tomato', '🍅', 'veg', 'gi', { pc: 2, sm: .8, f: 'h-8 s1.3' });
D('lettuce', 'Lettuce', '🥬', 'veg', 'an', { ht: 'fried', pc: 2, q: 'Please don\'t fry me. I\'m just a salad.' });
D('romaine', 'Romaine', '🥬', 'veg', 'sa', { ht: 'fried', pc: 2, f: 'h-12 b1.1' });
D('cabbage', 'Cabbage', '🥬', 'veg', 'sl', { pc: 4, f: 'g0.4 b1.15' });
D('redcabbage', 'Red Cabbage', '🥬', 'veg', 'fa', { pc: 4, f: 'h170 s1.2' });
D('spinach', 'Spinach', '🥬', 'veg', 'ad', { pc: 2, f: 'b0.7 s1.3', t: ['leafy'] });
D('kale', 'Kale', '🥬', 'veg', 'gr', { pc: 2, f: 'b0.6 h20', q: 'I\'m a superfood. You\'re welcome.' });
D('arugula', 'Arugula', '🌿', 'veg', 'sa', { pc: 2, ht: 'boiled', f: 'b0.75 h-15' });
D('bokchoy', 'Bok Choy', '🥬', 'veg', 'ch', { pc: 2, f: 'g0.4 b1.25', lv: 'fried' });
D('brussels', 'Brussels Sprout', '🥬', 'veg', 'gr', { pc: 2, sm: .7, f: 'h10 s1.3', lv: 'baked', q: 'Everyone hates me. I don\'t even care. (I care a lot.)' });
D('kimchi', 'Kimchi', '🥬', 'veg', 'sa', { w: 'none', ch: false, f: 'h-110 s1.6', t: ['spicy'] });
D('sauerkraut', 'Sauerkraut', '🥬', 'veg', 'gr', { w: 'none', ch: false, f: 'sp0.6 g0.4 b1.2' });
D('cucumber', 'Cucumber', '🥒', 'veg', 'ch', { ht: 'boiled', q: 'Cool as… well, me.' });
D('zucchini', 'Zucchini', '🥒', 'veg', 'sl', { lv: 'grilled', f: 'b0.7' });
D('pickle', 'Pickle', '🥒', 'veg', 'sa', { w: 'none', f: 'h-25 s0.8', q: 'Kind of a big dill.' });
D('carrot', 'Carrot', '🥕', 'veg', 'ch', { w: 'either', lv: 'boiled' });
D('radish', 'Radish', '🥕', 'veg', 'gi', { w: 'either', sm: .8, f: 'h-35 s1.4' });
D('parsnip', 'Parsnip', '🥕', 'veg', 'ph', { w: 'either', lv: 'baked', f: 'g0.6 sp0.4 b1.25' });
D('potato', 'Potato', '🥔', 'veg', 'sl', { w: 'either', lv: 'fried', q: 'Just a couch potato living my best life.' });
D('turnip', 'Turnip', '🥔', 'veg', 'gr', { w: 'either', lv: 'boiled', f: 'g0.5 b1.25' });
D('ginger', 'Ginger', '🥔', 'veg', 'sa', { w: 'either', pc: 2, f: 'sp0.3 h5 s1.4', t: ['spicy'] });
D('sweetpotato', 'Sweet Potato', '🍠', 'veg', 'cu', { w: 'either', lv: 'baked' });
D('beet', 'Beetroot', '🍠', 'veg', 'dr', { w: 'either', lv: 'boiled', f: 'h-30 s1.6 b0.8', q: 'I stain everything I love.' });
D('onion', 'Onion', '🧅', 'veg', 'dr', { lv: 'fried', t: ['allium'], q: 'I\'m not crying, YOU\'RE crying!' });
D('redonion', 'Red Onion', '🧅', 'veg', 'sa', { lv: 'grilled', f: 'h-90 s1.4', t: ['allium'] });
D('shallot', 'Shallot', '🧅', 'veg', 'fa', { sm: .8, f: 'sp0.5 h-20 b0.9', t: ['allium'] });
D('fennel', 'Fennel', '🧅', 'veg', 'ph', { lv: 'baked', f: 'g0.7 b1.2' });
D('garlic', 'Garlic', '🧄', 'veg', 'gr', { pc: 2, lv: 'fried', t: ['allium'], q: 'Vampires fear me. Good.' });
D('leek', 'Leek', '🥬', 'veg', 'ph', { lv: 'boiled', f: 'g0.5 b1.2', t: ['allium'] });
D('scallion', 'Spring Onion', '🌱', 'veg', 'gi', { pc: 2, t: ['allium'] });
D('celery', 'Celery', '🥬', 'veg', 'an', { f: 'h-30 b1.15' });
D('bellpepper', 'Green Pepper', '🫑', 'veg', 'ad', { lv: 'grilled' });
D('redpepper', 'Red Pepper', '🫑', 'veg', 'ch', { lv: 'grilled', f: 'h-120 s1.3' });
D('yellowpepper', 'Yellow Pepper', '🫑', 'veg', 'gi', { lv: 'baked', f: 'h-65 s1.3' });
D('chili', 'Chili', '🌶️', 'veg', 'sa', { pc: 2, t: ['spicy'], q: 'Hot stuff coming through!' });
D('jalapeno', 'Jalapeño', '🌶️', 'veg', 'ad', { pc: 2, f: 'h110', t: ['spicy'] });
D('okra', 'Okra', '🌶️', 'veg', 'sh', { f: 'h100 b0.9', lv: 'fried' });
D('broccoli', 'Broccoli', '🥦', 'veg', 'cu', { lv: 'boiled', q: 'I\'m a tiny tree. Hug me.' });
D('cauliflower', 'Cauliflower', '🥦', 'veg', 'ph', { lv: 'baked', f: 'g1 b1.3' });
D('corn', 'Corn', '🌽', 'veg', 'ch', { lv: 'grilled', q: 'I\'m all ears!' });
D('peas', 'Peas', '🫒', 'veg', 'sh', { ch: false, lv: 'boiled', f: 'h20 s1.4 b1.1', sm: .8 });
D('greenbeans', 'Green Beans', '🥒', 'veg', 'sl', { lv: 'boiled', f: 'h15 s1.2 b1.1' });
D('eggplant', 'Eggplant', '🍆', 'veg', 'fa', { lv: 'grilled' });
D('pumpkin', 'Pumpkin', '🎃', 'veg', 'gi', { pc: 4, lv: 'baked' });
D('squash', 'Butternut Squash', '🎃', 'veg', 'sl', { pc: 4, lv: 'baked', f: 'h12 s0.8 b1.1' });
D('asparagus', 'Asparagus', '🎋', 'veg', 'fa', { lv: 'grilled' });
D('artichoke', 'Artichoke', '🌵', 'veg', 'ph', { lv: 'boiled', q: 'Prickly outside, tender heart.' });
D('beansprout', 'Bean Sprouts', '🌱', 'veg', 'gi', { ch: false, f: 'g0.6 b1.3' });
D('olive', 'Green Olive', '🫒', 'veg', 'ph', { w: 'none', pc: 2, sm: .8 });
D('blackolive', 'Black Olive', '🫒', 'veg', 'gr', { w: 'none', pc: 2, sm: .8, f: 'b0.4 s0.6' });
D('avocado', 'Avocado', '🥑', 'veg', 'cu', { pc: 2, ht: 'boiled', q: 'Holy guacamole, a hug?' });

// --- Mushrooms (brush, never rinse!) ---
D('mushroom', 'Button Mushroom', '🍄', 'mush', 'sh', { q: 'Water makes me soggy… a gentle brush, please.' });
D('shiitake', 'Shiitake', '🍄', 'mush', 'ph', { f: 'sp0.8 b0.8', lv: 'boiled' });
D('portobello', 'Portobello', '🍄', 'mush', 'fa', { f: 'sp0.9 b0.6', lv: 'grilled' });
D('chanterelle', 'Chanterelle', '🍄', 'mush', 'ad', { f: 'h40 s1.3' });
D('oystermush', 'Oyster Mushroom', '🍄', 'mush', 'sl', { f: 'g0.8 b1.2' });
D('truffle', 'Truffle', '🌰', 'mush', 'fa', { f: 'b0.45', pr: 12, nc: true, pc: 2, q: 'I am worth more than your rent, darling.' });

// --- Fruit ---
D('apple', 'Apple', '🍎', 'fruit', 'ch', { lv: 'baked', q: 'An apple a day keeps the sadness away!' });
D('greenapple', 'Green Apple', '🍏', 'fruit', 'sa', { lv: 'baked' });
D('pear', 'Pear', '🍐', 'fruit', 'sh', { lv: 'baked' });
D('orange', 'Orange', '🍊', 'fruit', 'ch', { q: 'Orange you glad to see me?' });
D('mandarin', 'Mandarin', '🍊', 'fruit', 'gi', { sm: .8, pc: 2 });
D('grapefruit', 'Grapefruit', '🍊', 'fruit', 'gr', { f: 'h-25 s1.1' });
D('lemon', 'Lemon', '🍋', 'fruit', 'sa', { pc: 2, q: 'Sour? Me? Never. *squirts*' });
D('lime', 'Lime', '🍋', 'fruit', 'ad', { pc: 2, f: 'h45 s1.2' });
D('banana', 'Banana', '🍌', 'fruit', 'gi', { w: 'none', ht: 'boiled', q: 'I find everything a-peeling!' });
D('strawberry', 'Strawberry', '🍓', 'fruit', 'sh', { pc: 2 });
D('raspberry', 'Raspberry', '🍓', 'fruit', 'cu', { ch: false, sm: .8, f: 'h-20 s1.1 b1.1' });
D('blackberry', 'Blackberry', '🫐', 'fruit', 'ph', { ch: false, f: 'b0.5 s1.2' });
D('blueberry', 'Blueberries', '🫐', 'fruit', 'gi', { ch: false, lv: 'baked', q: 'We\'re not sad, we\'re just blue!' });
D('cherry', 'Cherries', '🍒', 'fruit', 'ch', { ch: false });
D('cranberry', 'Cranberries', '🍒', 'fruit', 'an', { ch: false, f: 'b0.8 s1.3' });
D('lychee', 'Lychee', '🍒', 'fruit', 'sh', { ch: false, f: 'g0.7 b1.35' });
D('grape', 'Grapes', '🍇', 'fruit', 'cu', { ch: false });
D('gooseberry', 'Gooseberry', '🍇', 'fruit', 'gi', { ch: false, f: 'h-180' });
D('watermelon', 'Watermelon', '🍉', 'fruit', 'ch', { pc: 4, nc: true });
D('melon', 'Honeydew', '🍈', 'fruit', 'sl', { pc: 4 });
D('cantaloupe', 'Cantaloupe', '🍈', 'fruit', 'fa', { pc: 4, f: 'h-80 s1.3' });
D('peach', 'Peach', '🍑', 'fruit', 'sh', { lv: 'grilled', q: 'Life is just peachy!' });
D('apricot', 'Apricot', '🍑', 'fruit', 'an', { f: 'h15 s1.1', lv: 'baked' });
D('plum', 'Plum', '🍑', 'fruit', 'ph', { f: 'h-80 b0.8', lv: 'baked' });
D('passionfruit', 'Passion Fruit', '🍑', 'fruit', 'dr', { f: 'h-70 b0.7', pc: 2, q: 'I feel EVERYTHING so INTENSELY!' });
D('mango', 'Mango', '🥭', 'fruit', 'ad');
D('papaya', 'Papaya', '🥭', 'fruit', 'cu', { f: 'h-15 s1.2' });
D('pineapple', 'Pineapple', '🍍', 'fruit', 'sa', { pc: 4, lv: 'grilled', q: 'Pizza? I belong there. Fight me.' });
D('coconut', 'Coconut', '🥥', 'fruit', 'gr', { w: 'none', pc: 2 });
D('kiwi', 'Kiwi', '🥝', 'fruit', 'an', { pc: 2 });
D('fig', 'Fig', '🍐', 'fruit', 'fa', { f: 'h200 b0.8', pc: 2, lv: 'baked' });
D('pomegranate', 'Pomegranate', '🍎', 'fruit', 'dr', { f: 'h-15 b0.75 s1.2' });
D('dragonfruit', 'Dragon Fruit', '🍐', 'fruit', 'ad', { f: 'h-110 s1.5' });
D('guava', 'Guava', '🍐', 'fruit', 'ad', { f: 'h20 s1.2' });
D('persimmon', 'Persimmon', '🍅', 'fruit', 'ph', { f: 'h20 s1.2' });
D('starfruit', 'Star Fruit', '⭐', 'fruit', 'ch', { q: 'I\'m literally a star. ✨' });
D('date', 'Dates', '🌰', 'fruit', 'sl', { w: 'none', ch: false, f: 'b0.85 s0.8' });
D('raisin', 'Raisins', '🍇', 'fruit', 'gr', { w: 'none', ch: false, f: 'sp0.8 b0.6', q: 'I used to be a grape. Then life happened.' });

// --- Herbs ---
D('basil', 'Basil', '🌿', 'herb', 'fa', { q: 'Mamma mia, I am the soul of the pizza.' });
D('parsley', 'Parsley', '🌿', 'herb', 'ch', { f: 's1.4' });
D('cilantro', 'Cilantro', '🌿', 'herb', 'sa', { f: 'h-15 b1.1', q: 'Half of people think I taste like soap. Their loss.' });
D('mint', 'Mint', '🌿', 'herb', 'gi', { f: 'h20 b1.25', q: 'Feeling fresh!' });
D('dill', 'Dill', '🌿', 'herb', 'ph', { f: 'b0.8 h-10' });
D('tarragon', 'Tarragon', '🌿', 'herb', 'fa', { f: 'h-25 s0.8' });
D('vanilla', 'Vanilla Pod', '🌿', 'herb', 'sh', { w: 'none', ch: false, f: 'sp1 b0.5', ht: null });
D('rosemary', 'Rosemary', '🌲', 'herb', 'sl', { lv: 'baked', ht: null, sm: .8 });
D('thyme', 'Thyme', '🍃', 'herb', 'ph', { q: 'I have all the thyme in the world.' });
D('oregano', 'Oregano', '🍃', 'herb', 'ad', { f: 's1.4 h-10', lv: 'baked', ht: null });
D('sage', 'Sage', '🍃', 'herb', 'ph', { f: 'g0.5 b1.15', q: 'Wise beyond my leaves.' });
D('bayleaf', 'Bay Leaf', '🍃', 'herb', 'gr', { f: 'b0.7', lv: 'boiled', ch: false });
D('chives', 'Chives', '🌱', 'herb', 'gi', { f: 's1.4', t: ['allium'] });
D('lemongrass', 'Lemongrass', '🌾', 'herb', 'sh', { f: 'h40 s1.2', lv: 'boiled' });
D('watercress', 'Watercress', '🍀', 'herb', 'cu');
D('shiso', 'Shiso', '🍀', 'herb', 'sh', { f: 'h150' });

// --- Dairy & eggs ---
D('milk', 'Milk', '🥛', 'dairy', 'cu', { ht: 'fried', lv: 'boiled' });
D('cream', 'Cream', '🥛', 'dairy', 'sl', { lv: 'whipped', ht: 'fried', f: 'sp0.3 b1.05' });
D('yogurt', 'Yogurt', '🥛', 'dairy', 'sh', { ht: 'fried', f: 'sp0.25 h-30' });
D('sourcream', 'Sour Cream', '🥛', 'dairy', 'sa', { ht: 'fried', f: 'g1 b0.95' });
D('butter', 'Butter', '🧈', 'dairy', 'cu', { lv: 'fried', ch: true, pc: 2, q: 'I\'m on a roll!' });
D('cheddar', 'Cheddar', '🧀', 'dairy', 'ch', { t: ['cheese'], f: 'h-10 s1.5', q: 'Say cheese! 📸' });
D('mozzarella', 'Mozzarella', '🧀', 'dairy', 'sh', { t: ['cheese'], f: 'g0.9 b1.35' });
D('parmesan', 'Parmesan', '🧀', 'dairy', 'fa', { t: ['cheese'], f: 'sp0.4 s1.1', lv: null, q: 'Aged 24 months. Show some respect.' });
D('gorgonzola', 'Gorgonzola', '🧀', 'dairy', 'gr', { t: ['cheese'], f: 'h140 s0.4 b1.1', q: 'Yes, I smell. It\'s called CHARACTER.' });
D('brie', 'Brie', '🧀', 'dairy', 'fa', { t: ['cheese'], f: 'g0.6 b1.3' });
D('feta', 'Feta', '🧀', 'dairy', 'sa', { t: ['cheese'], f: 'g1 b1.4', lv: null });
D('goatcheese', 'Goat Cheese', '🧀', 'dairy', 'gi', { t: ['cheese'], f: 'g1 b1.45' });
D('ricotta', 'Ricotta', '🧀', 'dairy', 'cu', { t: ['cheese'], ch: false, f: 'g1 b1.5' });
D('creamcheese', 'Cream Cheese', '🧀', 'dairy', 'sl', { t: ['cheese'], ch: false, lv: null, f: 'g0.8 b1.4' });
D('gouda', 'Gouda', '🧀', 'dairy', 'ch', { t: ['cheese'], f: 'h-15 s1.3', q: 'Gouda things come to those who wait.' });
D('emmental', 'Swiss Cheese', '🧀', 'dairy', 'gi', { t: ['cheese'], q: 'I\'m holey and proud.' });
D('halloumi', 'Halloumi', '🧀', 'dairy', 'ad', { t: ['cheese'], lv: 'grilled', f: 'g0.9 b1.3', q: '*squeak squeak*' });
D('icecream', 'Ice Cream', '🍨', 'dairy', 'gi', { nc: true, pr: 3, q: 'Keep me away from the heat or I MELT.' });
D('softserve', 'Soft Serve', '🍦', 'dairy', 'ch', { nc: true, pr: 3 });
D('custard', 'Custard', '🍮', 'dairy', 'sl', { lv: 'baked' });
D('egg', 'Egg', '🥚', 'dairy', 'an', { lv: 'fried', q: 'Please be gentle. I crack under pressure.' });
D('quailegg', 'Quail Egg', '🥚', 'dairy', 'sh', { lv: 'boiled', sm: .7 });

// --- Meat ---
D('chicken', 'Chicken', '🍗', 'meat', 'ch', { q: 'Why did I cross the road? To get to your kitchen!' });
D('turkey', 'Turkey', '🍗', 'meat', 'sl', { f: 'sp0.4 b0.85', lv: 'baked' });
D('duck', 'Duck Breast', '🍗', 'meat', 'fa', { f: 'b0.65' });
D('bacon', 'Bacon', '🥓', 'meat', 'sa', { lv: 'fried', q: 'Everyone loves me. It\'s a burden.' });
D('pepperoni', 'Pepperoni', '🥓', 'meat', 'gi', { lv: 'baked', pc: 4, f: 'h-10 s1.6 b0.9' });
D('prosciutto', 'Prosciutto', '🥓', 'meat', 'fa', { lv: null, f: 'g0.3 b1.25' });
D('ham', 'Ham', '🍖', 'meat', 'cu', { lv: 'baked' });
D('lamb', 'Lamb Chop', '🍖', 'meat', 'ph', { f: 'b0.85' });
D('steak', 'Steak', '🥩', 'meat', 'fa', { pr: 7, q: 'Medium-rare, or I riot.' });
D('beef', 'Ground Beef', '🥩', 'meat', 'ad', { lv: 'fried', f: 'b0.8 h-5' });
D('pork', 'Pork Belly', '🥩', 'meat', 'sl', { f: 'g0.4 b1.25' });
D('salami', 'Salami', '🥩', 'meat', 'fa', { lv: null, f: 's1.4 b0.85' });
D('sausage', 'Sausage', '🌭', 'meat', 'ch');
D('chorizo', 'Chorizo', '🌭', 'meat', 'sa', { lv: 'fried', f: 'h-15 s1.6 b0.85', t: ['spicy'] });
D('meatball', 'Meatballs', '🧆', 'meat', 'cu', { ch: false, lv: 'fried', f: 'sp0.6 b0.75' });

// --- Sea friends ---
D('salmon', 'Salmon', '🍣', 'fish', 'fa', { pr: 6 });
D('tuna', 'Canned Tuna', '🥫', 'fish', 'gr', { w: 'none', ch: false, lv: null, f: 'h180 s0.6', q: 'I\'ve been in a can for a year. Don\'t talk to me.' });
D('shrimp', 'Shrimp', '🍤', 'fish', 'gi', { lv: 'fried', ch: false });
D('lobster', 'Lobster', '🦞', 'fish', 'dr', { lv: 'boiled', ht: 'whipped', pr: 10, pc: 2, q: 'I am ROYALTY. Treat me accordingly!' });
D('crab', 'Crab', '🦀', 'fish', 'sa', { lv: 'boiled', ch: false, pr: 7, q: 'I\'m not crabby, I\'m CRAB-ulous.' });
D('oyster', 'Oyster', '🦪', 'fish', 'sh', { nc: true, ch: false, pr: 6, lv: null });
D('mussels', 'Mussels', '🦪', 'fish', 'cu', { lv: 'boiled', ch: false, f: 'b0.4' });
D('anchovy', 'Anchovy', '🐟', 'fish', 'gr', { w: 'none', f: 'b0.6 g0.5', lv: null, q: 'Nobody invites me to pizza night.' });
D('cod', 'Cod', '🐟', 'fish', 'sl', { lv: 'fried', f: 'g0.8 b1.3' });
D('squid', 'Calamari', '🦑', 'fish', 'ad', { lv: 'fried' });
D('caviar', 'Caviar', '🫐', 'fish', 'fa', { w: 'none', ch: false, nc: true, pr: 12, f: 'b0.35 g0.5' });

// --- Bread & grains ---
D('bread', 'Bread', '🍞', 'grain', 'ch', { ch: true, pc: 2, q: 'I\'m the best thing since… me!' });
D('baguette', 'Baguette', '🥖', 'grain', 'fa', { ch: true, lv: 'baked', q: 'Ooh la la!' });
D('croissant', 'Croissant', '🥐', 'grain', 'fa', { ch: true, pc: 2, lv: 'baked' });
D('bagel', 'Bagel', '🥯', 'grain', 'sa', { ch: true, pc: 2 });
D('pretzel', 'Pretzel', '🥨', 'grain', 'gi', { lv: 'baked', q: 'I\'m all twisted up inside!' });
D('flatbread', 'Flatbread', '🫓', 'grain', 'ad', { ch: true, pc: 2 });
D('tortilla', 'Tortilla', '🫓', 'grain', 'ch', { ch: true, pc: 2, f: 'h5 s1.3 b1.05' });
D('pita', 'Pita', '🫓', 'grain', 'cu', { ch: true, pc: 2, f: 'g0.3 b1.15' });
D('brioche', 'Brioche', '🍞', 'grain', 'fa', { ch: true, pc: 2, f: 'h-10 s1.5' });
D('rye', 'Rye Bread', '🍞', 'grain', 'gr', { ch: true, pc: 2, f: 'b0.6 sp0.5' });
D('dough', 'Pizza Dough', '🫓', 'grain', 'cu', { lv: 'baked', f: 'g0.6 b1.35', q: 'Knead me! I mean… I need you.' });
D('flour', 'Flour', '🌾', 'grain', 'sl', { lv: 'baked', f: 'g0.9 b1.4' });
D('rice', 'Rice', '🍚', 'grain', 'sh', { lv: 'boiled', ht: 'baked' });
D('oats', 'Oats', '🌾', 'grain', 'sl', { lv: 'boiled', f: 'sp0.4 b0.9' });
D('quinoa', 'Quinoa', '🍚', 'grain', 'ph', { lv: 'boiled', f: 'sp0.6' });
D('couscous', 'Couscous', '🍚', 'grain', 'gi', { lv: 'boiled', f: 'sp0.8 h-5 b1.05' });
D('waffle', 'Waffle', '🧇', 'grain', 'ch', { ch: true, pc: 4 });
D('ricecracker', 'Rice Cracker', '🍘', 'grain', 'sa');

// --- Pasta & noodles ---
D('spaghetti', 'Spaghetti', '🍝', 'pasta', 'ch', { q: 'I\'m pasta-tively thrilled!' });
D('macaroni', 'Macaroni', '🍝', 'pasta', 'gi', { f: 'h-5 s1.4' });
D('penne', 'Penne', '🍝', 'pasta', 'sa', { f: 'h-15 s1.5' });
D('lasagna', 'Lasagna Sheets', '🍝', 'pasta', 'dr', { lv: 'baked', f: 'g0.4 b1.2' });
D('ramen', 'Ramen Noodles', '🍜', 'pasta', 'ad', { ht: null });
D('udon', 'Udon', '🍜', 'pasta', 'sl', { f: 'g0.3 b1.15' });
D('ricenoodles', 'Rice Noodles', '🍜', 'pasta', 'sh', { lv: 'fried', ht: 'baked', f: 'g0.6 b1.3' });
D('gnocchi', 'Gnocchi', '🥟', 'pasta', 'cu', { lv: 'fried', f: 'h-5 s1.4' });
D('dumpling', 'Dumplings', '🥟', 'pasta', 'gi');
D('ravioli', 'Ravioli', '🥟', 'pasta', 'fa', { f: 'h-10 s1.6' });

// --- Beans & tofu ---
D('tofu', 'Tofu', '🧈', 'legume', 'ph', { ch: true, lv: 'fried', f: 'g1 b1.25', q: 'I become whatever you need me to be.' });
D('kidneybean', 'Kidney Beans', '🫘', 'legume', 'gr');
D('chickpea', 'Chickpeas', '🫘', 'legume', 'ch', { f: 'h40 s0.8 b1.3' });
D('lentil', 'Lentils', '🫘', 'legume', 'sl', { f: 'h20 s1.3 b1.1' });
D('edamame', 'Edamame', '🫘', 'legume', 'gi', { f: 'h90 s1.2' });
D('blackbean', 'Black Beans', '🫘', 'legume', 'ph', { f: 'b0.35' });
D('falafel', 'Falafel', '🧆', 'legume', 'ad', { lv: 'fried' });
D('peanut', 'Peanuts', '🥜', 'legume', 'gi', { ch: true, pc: 2, lv: 'baked', t: ['nut'] });

// --- Nuts & seeds ---
D('almond', 'Almond', '🌰', 'nut', 'fa', { f: 'b1.2 sp0.3' });
D('walnut', 'Walnut', '🌰', 'nut', 'ph', { q: 'I look like a brain because I AM one.' });
D('hazelnut', 'Hazelnut', '🌰', 'nut', 'cu', { f: 'b1.1 s1.2' });
D('cashew', 'Cashew', '🥜', 'nut', 'sh', { f: 'sp0.2 b1.2' });
D('pistachio', 'Pistachio', '🥜', 'nut', 'gi', { f: 'h60 s0.8' });
D('pinenut', 'Pine Nuts', '🌰', 'nut', 'sh', { ch: false, f: 'g0.4 b1.35' });
D('chestnut', 'Chestnut', '🌰', 'nut', 'sl', { f: 'b0.9' });
D('pecan', 'Pecan', '🌰', 'nut', 'fa', { f: 'b0.75 s1.2' });
D('sesame', 'Sesame Seeds', '🌾', 'nut', 'gi', { ch: false, f: 'g0.5 b1.3' });
D('sunflower', 'Sunflower Seeds', '🌻', 'nut', 'ch', { ch: false });

// --- Sauces & spreads ---
D('tomatosauce', 'Tomato Sauce', '🥫', 'sauce', 'dr', { lv: 'baked' });
D('ketchup', 'Ketchup', '🥫', 'sauce', 'ch', { f: 'h-10 s1.4', q: 'I go with EVERYTHING. Fight me.' });
D('bbq', 'BBQ Sauce', '🥫', 'sauce', 'sa', { f: 'sp0.5 b0.6', lv: 'grilled' });
D('hotsauce', 'Hot Sauce', '🥫', 'sauce', 'ad', { f: 's1.8 b0.85 h-10', t: ['spicy'] });
D('mustard', 'Mustard', '🥫', 'sauce', 'sa', { f: 'h50 s1.3' });
D('gravy', 'Gravy', '🥫', 'sauce', 'cu', { f: 'sp0.8 b0.6', lv: 'boiled' });
D('mayo', 'Mayo', '🥚', 'sauce', 'cu', { ht: 'fried', f: 'g0.2 b1.2 s0.6' });
D('oliveoil', 'Olive Oil', '🫒', 'sauce', 'fa', { f: 'sp0.3 h-20 b1.2' });
D('soysauce', 'Soy Sauce', '🍶', 'sauce', 'ph', { f: 'sp0.8 b0.7' });
D('vinegar', 'Vinegar', '🍶', 'sauce', 'gr', { f: 'sp0.4' });
D('honey', 'Honey', '🍯', 'sauce', 'cu', { q: 'Hey there, honey! 🐝' });
D('maple', 'Maple Syrup', '🍁', 'sauce', 'ch', { q: 'Sorry! (I\'m Canadian.)' });
D('jam', 'Strawberry Jam', '🍯', 'sauce', 'gi', { f: 'h-40 s1.6' });
D('peanutbutter', 'Peanut Butter', '🍯', 'sauce', 'cu', { f: 'sp0.6 b0.8', t: ['nut'], q: 'I stick with my friends. Literally.' });
D('chocspread', 'Choco Spread', '🍯', 'sauce', 'gi', { f: 'b0.45 sp0.5', t: ['sweet'] });
D('caramel', 'Caramel', '🍯', 'sauce', 'fa', { f: 'h-10 s1.3 b0.85', t: ['sweet'] });
D('pesto', 'Pesto', '🍯', 'sauce', 'fa', { f: 'h60 s1.2', t: ['nut'] });
D('salsa', 'Salsa', '🍯', 'sauce', 'gi', { f: 'h-25 s1.5', t: ['spicy'] });
D('currypaste', 'Curry Paste', '🍯', 'sauce', 'ad', { f: 'h-15 s1.8', t: ['spicy'], lv: 'boiled' });
D('wasabi', 'Wasabi', '🍯', 'sauce', 'sa', { f: 'h80 s1.4', t: ['spicy'], q: 'I clear your sinuses AND your doubts.' });
D('hummus', 'Hummus', '🥣', 'sauce', 'sl', { f: 'sp0.5' });
D('guacamole', 'Guacamole', '🥣', 'sauce', 'ch', { f: 'h90 s1.3' });

// --- Spices ---
D('salt', 'Salt', '🧂', 'spice', 'gr', { q: 'I\'m not salty. YOU\'RE salty.' });
D('pepper', 'Black Pepper', '🧂', 'spice', 'sa', { f: 'b0.4', q: 'Ah… ahh… ACHOO!' });
D('paprika', 'Paprika', '🧂', 'spice', 'ad', { f: 'sp1 h-30 s3', t: ['spicy'] });
D('cumin', 'Cumin', '🧂', 'spice', 'ph', { f: 'sp1 b0.8' });
D('turmeric', 'Turmeric', '🧂', 'spice', 'ch', { f: 'sp1 h10 s3 b1.1' });
D('saffron', 'Saffron', '🧂', 'spice', 'fa', { f: 'sp1 h-10 s4', pr: 6 });
D('chiliflakes', 'Chili Flakes', '🧂', 'spice', 'sa', { f: 'sp1 h-40 s4 b0.9', t: ['spicy'] });
D('currypowder', 'Curry Powder', '🧂', 'spice', 'ad', { f: 'sp1 h5 s2.5', t: ['spicy'] });
D('cinnamon', 'Cinnamon', '🪵', 'spice', 'cu', { q: 'Warm hugs in stick form.' });
D('nutmeg', 'Nutmeg', '🌰', 'spice', 'sl', { f: 'sp0.5 b0.85' });
D('clove', 'Cloves', '🌰', 'spice', 'gr', { f: 'b0.5' });
D('cardamom', 'Cardamom', '🫘', 'spice', 'fa', { f: 'h90 s0.7 b1.2' });
D('staranise', 'Star Anise', '⭐', 'spice', 'ph', { f: 'sp1 b0.6' });

// --- Sweets ---
D('sugar', 'Sugar', '🧊', 'sweet', 'gi', { f: 'g1 b1.3', q: 'Sugar, sugar! Oh honey honey~' });
D('brownsugar', 'Brown Sugar', '🧊', 'sweet', 'cu', { f: 'sp1 s1.5 b0.9' });
D('chocolate', 'Chocolate', '🍫', 'sweet', 'dr', { ch: true, lv: 'baked', q: 'Life is like a box of… ME!' });
D('whitechoc', 'White Chocolate', '🍫', 'sweet', 'sh', { ch: true, f: 'g1 b1.6' });
D('marshmallow', 'Marshmallow', '☁️', 'sweet', 'sl', { lv: 'grilled', q: 'So squishy… so sleepy…' });
D('candy', 'Candy', '🍬', 'sweet', 'gi', { nc: true });
D('lollipop', 'Lollipop', '🍭', 'sweet', 'ch', { nc: true });
D('cookie', 'Cookie', '🍪', 'sweet', 'cu', { ch: true, pc: 2, q: 'That\'s just the way I crumble!' });
D('donut', 'Donut', '🍩', 'sweet', 'ch', { ch: true, pc: 2 });
D('mochi', 'Mochi', '🍡', 'sweet', 'cu', { ch: true, pc: 3 });
D('sprinkles', 'Sprinkles', '🎊', 'sweet', 'gi', { nc: true });
D('gummybear', 'Gummy Bears', '🧸', 'sweet', 'cu', { nc: true, q: 'We just want hugs. Gummy hugs.' });
D('cocoa', 'Cocoa Powder', '☕', 'sweet', 'sl', { f: 'sp0.5 b0.75' });
D('coffee', 'Espresso', '☕', 'sweet', 'ad', { q: 'I\'M NOT JITTERY YOU\'RE JITTERY' });
D('matcha', 'Matcha', '🍵', 'sweet', 'sh', { lv: 'whipped' });

// --- Pantry oddities ---
D('nori', 'Nori', '🍃', 'misc', 'ph', { f: 'b0.35 s0.8' });
D('popcorn', 'Popcorn', '🍿', 'misc', 'gi', { lv: 'fried' });
D('cornflakes', 'Cornflakes', '🥣', 'misc', 'ch', { ht: 'boiled' });
D('granola', 'Granola', '🥣', 'misc', 'ad', { f: 'sp0.6 b0.8', lv: 'baked', t: ['nut'] });
D('crisps', 'Potato Chips', '🥔', 'misc', 'sa', { f: 'h10 s1.6 b1.15', ht: 'boiled' });
D('nachos', 'Tortilla Chips', '🫓', 'misc', 'ad', { f: 'h15 s1.6', lv: 'baked' });

// tag helpers
ING_LIST.forEach(d => {
  if (d.cat === 'herb') d.tags.push('herb');
  if (d.cat === 'nut') d.tags.push('nut');
  if (d.cat === 'fruit') d.tags.push('fruit');
  if (d.cat === 'sweet') d.tags.push('sweet');
  if (d.cat === 'meat' || d.cat === 'fish') d.tags.push('animal');
});

// ---------- Friendships & feuds ----------
const FRIENDS = [
  ['tomato', 'basil'], ['tomato', 'mozzarella'], ['mozzarella', 'basil'], ['bread', 'butter'], ['peanutbutter', 'jam'],
  ['strawberry', 'cream'], ['apple', 'cinnamon'], ['banana', 'chocolate'], ['garlic', 'onion'], ['bacon', 'egg'],
  ['lemon', 'salmon'], ['potato', 'leek'], ['carrot', 'peas'], ['rice', 'soysauce'], ['ham', 'pineapple'],
  ['chili', 'lime'], ['honey', 'yogurt'], ['mint', 'chocolate'], ['pear', 'gorgonzola'], ['fig', 'goatcheese'],
  ['beet', 'goatcheese'], ['steak', 'potato'], ['spaghetti', 'tomato'], ['avocado', 'lime'], ['cucumber', 'dill'],
  ['lobster', 'butter'], ['duck', 'orange'], ['marshmallow', 'chocolate'], ['cookie', 'milk'], ['coffee', 'donut'],
  ['pumpkin', 'cinnamon'], ['garlic', 'butter'], ['basil', 'pinenut'], ['pesto', 'penne'], ['shrimp', 'garlic'],
  ['tofu', 'soysauce'], ['nori', 'rice'], ['cherry', 'chocolate'], ['raspberry', 'whitechoc'], ['caramel', 'apple'],
  ['salt', 'caramel'], ['honey', 'walnut'], ['oyster', 'lemon'], ['asparagus', 'lemon'], ['lettuce', 'tomato'],
  ['cheddar', 'bread'], ['egg', 'avocado'], ['mushroom', 'garlic'], ['spinach', 'ricotta'], ['bacon', 'lettuce'],
  ['cream', 'potato'], ['ginger', 'pumpkin'], ['scallion', 'ramen'], ['egg', 'ramen'], ['parmesan', 'spaghetti'],
  ['feta', 'olive'], ['cucumber', 'feta'], ['sugar', 'egg'], ['strawberry', 'kiwi'], ['blueberry', 'mango'],
  ['milk', 'chocolate'], ['flour', 'butter'], ['icecream', 'cherry'], ['lemon', 'sugar'], ['rosemary', 'potato'],
  ['tuna', 'mayo'], ['chicken', 'lemon'], ['corn', 'butter'], ['watermelon', 'mint'], ['peanut', 'lime'],
];
const FEUDS = [
  ['pineapple', 'anchovy'], ['garlic', 'chocolate'], ['onion', 'icecream'], ['ketchup', 'icecream'], ['pickle', 'strawberry'],
  ['salmon', 'chocolate'], ['mustard', 'banana'], ['wasabi', 'marshmallow'], ['coffee', 'tuna'], ['brussels', 'candy'],
  ['vinegar', 'milk'], ['lemon', 'milk'], ['gorgonzola', 'gummybear'], ['sardine', 'jam'], ['anchovy', 'chocolate'],
  ['mint', 'orange'], ['garlic', 'strawberry'], ['onion', 'chocolate'],
];
const FRIEND_SET = new Set(FRIENDS.map(([a, b]) => [a, b].sort().join('|')));
const FEUD_SET = new Set(FEUDS.map(([a, b]) => [a, b].sort().join('|')));

// ---------- Recipes ----------
// req tokens: "id[:prep[:cook]]"  prep: c=chopped, w=whole, -=any ; cook: raw|fried|boiled|baked|grilled|whipped|any
const RECIPES = {};
function R(id, name, e, rest, price, reqs, course) {
  const req = reqs.split(',').map(s => s.trim()).map(tok => {
    const [i, p = '-', c = 'any'] = tok.split(':');
    if (!ING[i]) console.warn('Missing ingredient', i, 'in', id);
    return { i, prep: p, cook: c };
  });
  RECIPES[id] = { id, name, e, rest, price, req, course: course || null };
}
// Sunny Sandwich Shack
R('butter_toast', 'Buttered Toast', '🍞', 'shack', 9, 'bread:-:grilled, butter');
R('cheese_sandwich', 'Cheese Sandwich', '🥪', 'shack', 10, 'bread, cheddar:c');
R('pbj', 'PB&J Sandwich', '🥪', 'shack', 11, 'bread, peanutbutter, jam');
R('egg_toast', 'Egg on Toast', '🍳', 'shack', 13, 'bread:-:grilled, egg:-:fried');
R('cucumber_sandwich', 'Cucumber Sandwich', '🥒', 'shack', 13, 'bread, cucumber:c:raw, creamcheese');
R('grilled_cheese', 'Grilled Cheese', '🧀', 'shack', 15, 'bread:-:fried, cheddar:c:fried');
R('avocado_toast', 'Avocado Toast', '🥑', 'shack', 16, 'bread:-:grilled, avocado:c:raw, lemon:c');
R('blt', 'BLT', '🥓', 'shack', 19, 'bread:-:grilled, bacon:-:fried, lettuce:-:raw, tomato:c:raw');
R('tuna_melt', 'Tuna Melt', '🐟', 'shack', 18, 'bread:-:grilled, tuna, cheddar:c:grilled');
R('ham_croissant', 'Ham & Cheese Croissant', '🥐', 'shack', 19, 'croissant:-:grilled, ham:c, emmental:c');
R('club', 'Club Sandwich', '🥪', 'shack', 23, 'bread:-:grilled, chicken:c:grilled, lettuce:-:raw, tomato:c, mayo');
// Pizzeria
R('garlic_bread', 'Garlic Bread', '🥖', 'pizzeria', 15, 'baguette:c:baked, garlic:c:baked, butter');
R('margherita', 'Pizza Margherita', '🍕', 'pizzeria', 21, 'dough:-:baked, tomatosauce:-:baked, mozzarella:c:baked, basil:-:raw');
R('bruschetta', 'Bruschetta', '🍅', 'pizzeria', 18, 'baguette:c:grilled, tomato:c:raw, basil, oliveoil');
R('pepperoni_pizza', 'Pepperoni Pizza', '🍕', 'pizzeria', 25, 'dough:-:baked, tomatosauce:-:baked, mozzarella:c:baked, pepperoni:c:baked');
R('funghi', 'Pizza Funghi', '🍄', 'pizzeria', 25, 'dough:-:baked, tomatosauce:-:baked, mozzarella:c:baked, mushroom:c:baked');
R('hawaiian', 'Hawaiian Pizza', '🍍', 'pizzeria', 26, 'dough:-:baked, tomatosauce:-:baked, ham:c:baked, pineapple:c:baked');
R('veggie_pizza', 'Veggie Pizza', '🫑', 'pizzeria', 27, 'dough:-:baked, tomatosauce:-:baked, bellpepper:c:baked, onion:c:baked, olive:c');
R('calzone', 'Calzone', '🥟', 'pizzeria', 28, 'dough:-:baked, ricotta, ham:c, spinach:c');
R('quattro', 'Quattro Formaggi', '🧀', 'pizzeria', 32, 'dough:-:baked, mozzarella:c:baked, gorgonzola:c:baked, parmesan:c, ricotta');
// Bistro
R('garden_salad', 'Garden Salad', '🥗', 'bistro', 17, 'lettuce:-:raw, tomato:c:raw, cucumber:c:raw, oliveoil', 's');
R('caprese', 'Caprese', '🍅', 'bistro', 19, 'tomato:c:raw, mozzarella:c:raw, basil:-:raw, oliveoil', 's');
R('tomato_soup', 'Tomato Soup', '🍅', 'bistro', 19, 'tomato:c:boiled, onion:c:boiled, basil', 's');
R('potato_leek', 'Potato Leek Soup', '🥣', 'bistro', 21, 'potato:c:boiled, leek:c:boiled, cream', 's');
R('greek_salad', 'Greek Salad', '🥗', 'bistro', 23, 'tomato:c:raw, cucumber:c:raw, feta:c, olive, redonion:c:raw', 's');
R('pumpkin_soup', 'Pumpkin Soup', '🎃', 'bistro', 23, 'pumpkin:c:boiled, ginger:c:boiled, cream', 's');
R('caesar', 'Caesar Salad', '🥗', 'bistro', 25, 'romaine:-:raw, chicken:c:grilled, parmesan:c, bread:c:grilled', 's');
R('minestrone', 'Minestrone', '🍲', 'bistro', 27, 'carrot:c:boiled, celery:c:boiled, kidneybean:-:boiled, macaroni:-:boiled, tomato:c:boiled', 's');
R('risotto', 'Mushroom Risotto', '🍚', 'bistro', 29, 'rice:-:boiled, mushroom:c:fried, parmesan:c, butter', 'm');
// Bakery
R('meringue', 'Meringue Clouds', '☁️', 'bakery', 15, 'egg:-:whipped, sugar:-:whipped', 'd');
R('smores', 'S\'mores', '🔥', 'bakery', 17, 'marshmallow:-:grilled, chocolate:c, cookie', 'd');
R('hot_choc', 'Hot Chocolate', '☕', 'bakery', 17, 'milk:-:boiled, chocolate:c:boiled, marshmallow', 'd');
R('pancakes', 'Fluffy Pancakes', '🥞', 'bakery', 19, 'flour:-:fried, egg:-:whipped, milk, maple', 'd');
R('fruit_salad', 'Fruit Salad', '🍓', 'bakery', 21, 'strawberry:c:raw, kiwi:c:raw, mango:c:raw, blueberry:-:raw', 'd');
R('cookies', 'Choc Chip Cookies', '🍪', 'bakery', 23, 'flour:-:baked, butter:-:baked, chocolate:c:baked, sugar:-:baked', 'd');
R('banana_split', 'Banana Split', '🍨', 'bakery', 25, 'banana:c:raw, icecream:-:raw, chocolate:c, cherry', 'd');
R('shortcake', 'Strawberry Shortcake', '🍰', 'bakery', 27, 'flour:-:baked, strawberry:c, cream:-:whipped, sugar', 'd');
R('apple_pie', 'Apple Pie', '🥧', 'bakery', 29, 'flour:-:baked, apple:c:baked, cinnamon, butter:-:baked', 'd');
R('lemon_tart', 'Lemon Tart', '🍋', 'bakery', 29, 'flour:-:baked, lemon:c, egg:-:whipped, sugar', 'd');
// Noodle Nook
R('dumplings', 'Dumpling Basket', '🥟', 'noodle', 23, 'dumpling:-:boiled, soysauce, scallion:c', 's');
R('spaghetti_pomodoro', 'Spaghetti Pomodoro', '🍝', 'noodle', 23, 'spaghetti:-:boiled, tomato:c:fried, garlic:c:fried, basil', 'm');
R('mac_cheese', 'Mac & Cheese', '🧀', 'noodle', 23, 'macaroni:-:boiled, cheddar:c:baked, milk, butter', 'm');
R('pesto_pasta', 'Pesto Penne', '🌿', 'noodle', 25, 'penne:-:boiled, pesto, pinenut, parmesan:c', 'm');
R('yakisoba', 'Yakisoba', '🥢', 'noodle', 27, 'ramen:-:fried, cabbage:c:fried, carrot:c:fried, soysauce', 'm');
R('udon_soup', 'Udon Soup', '🍜', 'noodle', 27, 'udon:-:boiled, tofu:c:fried, scallion:c, shiitake:c:boiled', 'm');
R('carbonara', 'Carbonara', '🍝', 'noodle', 29, 'spaghetti:-:boiled, egg:-:whipped, bacon:c:fried, parmesan:c', 'm');
R('ramen_bowl', 'Ramen Bowl', '🍜', 'noodle', 31, 'ramen:-:boiled, egg:-:boiled, scallion:c:raw, pork:c:grilled, nori', 'm');
R('padthai', 'Pad Thai', '🍤', 'noodle', 31, 'ricenoodles:-:fried, shrimp:-:fried, peanut:c, lime:c, beansprout:-:raw', 'm');
// Grand Menu Palace (specials)
R('oysters', 'Oysters & Lemon', '🦪', 'palace', 40, 'oyster:-:raw, lemon:c, shallot:c:raw', 's');
R('beet_salad', 'Beet & Goat Salad', '🍠', 'palace', 32, 'beet:c:boiled, goatcheese:c, walnut:c, arugula:-:raw', 's');
R('fig_goat', 'Baked Figs', '🍐', 'palace', 34, 'fig:c:baked, goatcheese:c:baked, honey, walnut:c', 's');
R('steak_frites', 'Steak Frites', '🥩', 'palace', 42, 'steak:-:grilled, potato:c:fried, salt', 'm');
R('salmon_asparagus', 'Salmon & Asparagus', '🍣', 'palace', 44, 'salmon:-:grilled, asparagus:-:grilled, lemon:c', 'm');
R('duck_orange', 'Duck à l\'Orange', '🍊', 'palace', 46, 'duck:-:grilled, orange:c, honey', 'm');
R('truffle_pasta', 'Truffle Tagliatelle', '🍝', 'palace', 50, 'spaghetti:-:boiled, truffle:c:raw, parmesan:c, butter', 'm');
R('lobster_dinner', 'Lobster Thermidor', '🦞', 'palace', 56, 'lobster:-:boiled, butter:-:fried, lemon:c, parsley:c', 'm');
R('choc_fondant', 'Chocolate Fondant', '🍫', 'palace', 38, 'chocolate:c:baked, butter:-:baked, egg:-:whipped, flour:-:baked', 'd');
R('pear_tart', 'Poached Pear Tart', '🍐', 'palace', 36, 'pear:c:baked, flour:-:baked, vanilla, caramel', 'd');

// ---------- Restaurants ----------
const RESTAURANTS = [
  { id: 'shack',    name: 'Sunny Sandwich Shack', e: '🥪', stars: 0,   color: '#ffd36e', desc: 'A tiny shack with a big heart. Toast, sandwiches and gossip.', tools: ['sink', 'brush', 'knife', 'pan', 'grill'] },
  { id: 'pizzeria', name: 'Pizzeria Mamma Mood',  e: '🍕', stars: 12,  color: '#ff8a6b', desc: 'Nonna Brick the oven has waited 80 years for you.', tools: ['oven'] },
  { id: 'bistro',   name: 'The Bubbling Bistro',  e: '🥗', stars: 30,  color: '#9ad48a', desc: 'Salads, soups and Big Bubba, the pot who loves baths.', tools: ['pot'] },
  { id: 'bakery',   name: 'Sweet Sigh Bakery',    e: '🧁', stars: 55,  color: '#f7a8c8', desc: 'Treats, cakes and a mixing bowl called Whiskers.', tools: ['bowl'] },
  { id: 'noodle',   name: 'Noodle Nook',          e: '🍜', stars: 85,  color: '#f2b45a', desc: 'Slurp-worthy bowls under paper lanterns.', tools: [] },
  { id: 'palace',   name: 'Grand Menu Palace',    e: '🏰', stars: 125, color: '#b9a2f0', desc: 'Three-course menus for the fanciest critters in town.', tools: [], menus: true },
];
const REST = Object.fromEntries(RESTAURANTS.map(r => [r.id, r]));

// Ingredient unlocks: anything a restaurant's recipes use unlocks with it,
// plus a few cozy extras. Everything else comes in market packs.
const REST_EXTRAS = {
  shack: ['ketchup', 'salt', 'pepper', 'pickle', 'honey'],
  pizzeria: ['oregano', 'chiliflakes', 'salami'],
  bistro: ['parsley', 'croutons'],
  bakery: ['vanilla', 'raspberry', 'cocoa'],
  noodle: ['chili', 'sesame'],
  palace: ['caviar'],
};
const ING_UNLOCK = {}; // ingId -> restaurant id or pack id
RESTAURANTS.forEach(r => {
  Object.values(RECIPES).filter(x => x.rest === r.id).forEach(x => x.req.forEach(q => { if (!ING_UNLOCK[q.i]) ING_UNLOCK[q.i] = r.id; }));
  (REST_EXTRAS[r.id] || []).forEach(i => { if (ING[i] && !ING_UNLOCK[i]) ING_UNLOCK[i] = r.id; });
});
const PACKS = [
  { id: 'p_garden', name: 'Garden Patch',     e: '🥕', price: 40, cats: ['veg'],   desc: 'Muddy, moody veggies fresh from the patch.' },
  { id: 'p_mush',   name: 'Mushroom Forest',  e: '🍄', price: 30, cats: ['mush'],  desc: 'Shy forest folk. Brush, never rinse!' },
  { id: 'p_fruit',  name: 'Fruit Basket',     e: '🍓', price: 45, cats: ['fruit'], desc: 'Sunny, juicy and a little dramatic.' },
  { id: 'p_herb',   name: 'Herb Garden',      e: '🌿', price: 30, cats: ['herb'],  desc: 'Tiny green philosophers.' },
  { id: 'p_cheese', name: 'Cheese Cellar',    e: '🧀', price: 50, cats: ['dairy'], desc: 'Stinky, fancy, squeaky — all of them lovable.' },
  { id: 'p_meat',   name: 'Butcher\'s Block', e: '🍖', price: 50, cats: ['meat'],  desc: 'Hearty and proud.' },
  { id: 'p_sea',    name: 'Ocean Friends',    e: '🦞', price: 55, cats: ['fish'],  desc: 'Crabby, shellfish-ly dramatic seafood.' },
  { id: 'p_bakery', name: 'Bread & Noodle Shelf', e: '🥖', price: 40, cats: ['grain', 'pasta'], desc: 'Carbs with feelings.' },
  { id: 'p_beans',  name: 'Nut & Bean Club',  e: '🥜', price: 35, cats: ['nut', 'legume'], desc: 'Small but mighty.' },
  { id: 'p_sauce',  name: 'Sauce Squad',      e: '🍯', price: 35, cats: ['sauce'], desc: 'Drizzly, saucy troublemakers.' },
  { id: 'p_spice',  name: 'Spice Caravan',    e: '🧂', price: 40, cats: ['spice'], desc: 'Spicy personalities from far away.' },
  { id: 'p_candy',  name: 'Candy Corner',     e: '🍬', price: 40, cats: ['sweet', 'misc'], desc: 'Sugar rush with a side of giggles.' },
];
ING_LIST.forEach(d => {
  if (!ING_UNLOCK[d.id]) {
    const p = PACKS.find(p => p.cats.includes(d.cat));
    ING_UNLOCK[d.id] = p ? p.id : 'p_candy';
  }
});

// ---------- Cozy decorations (they have faces too) ----------
const DECOR = [
  { id: 'plant',   name: 'Fernanda the Fern',   e: '🪴', price: 25, desc: '+2 love on every dish.' },
  { id: 'lights',  name: 'Fairy Lights',        e: '✨', price: 30, desc: '+2 love. Twinkly!' },
  { id: 'candle',  name: 'Candle Twins',        e: '🕯️', price: 20, desc: '+2 love. Very romantic.' },
  { id: 'rug',     name: 'Knitted Rug',         e: '🧶', price: 20, desc: '+2 love. Grandma made it.' },
  { id: 'teapot',  name: 'Teapot Theodore',     e: '🫖', price: 30, desc: '+2 love. Always steaming with joy.' },
  { id: 'flowers', name: 'Window Tulips',       e: '🌷', price: 25, desc: '+2 love. Smells like spring.' },
  { id: 'painting',name: 'Fruit Bowl Painting', e: '🖼️', price: 35, desc: '+2 love. The apples in it wave at you.' },
  { id: 'books',   name: 'Cookbook Shelf',      e: '📚', price: 45, desc: '+2 love, and your notebook shows extra hints.' },
  { id: 'radio',   name: 'Jazz Radio',          e: '📻', price: 40, desc: '+2 love. Kitchen crew starts every day happier.' },
  { id: 'cat',     name: 'Crumb the Cat',       e: '🐈', price: 60, desc: '+2 love. Snuggles lonely crumbs, halving their sadness penalty.' },
  { id: 'fire',    name: 'Crackly Fireplace',   e: '🪵', price: 55, desc: '+2 love. Cozy level: maximum.' },
  { id: 'jar',     name: 'Granny\'s Cookie Jar',e: '🏺', price: 50, desc: '+2 love, +3 tip from every guest.' },
];

// ---------- Hungry guests ----------
const GUESTS = [
  ['🐻', 'Bruno Bear'], ['🦊', 'Fiona Fox'], ['🐰', 'Clover Bun'], ['🐸', 'Ribbit Rick'], ['🦉', 'Professor Hoot'],
  ['🐼', 'Bao'], ['🐷', 'Penny Pig'], ['🐱', 'Mochi Cat'], ['🐶', 'Biscuit'], ['🦔', 'Hazel Hedgehog'],
  ['🐢', 'Sheldon'], ['🐧', 'Pip'], ['🦝', 'Rocco'], ['🐨', 'Koko'], ['🐮', 'Daisy'], ['🐭', 'Squeak'],
  ['🦁', 'Sir Leo'], ['🐯', 'Tigris'], ['🐹', 'Nibbles'], ['🐺', 'Luna Wolf'], ['🦌', 'Fawn'], ['🐿️', 'Chip'],
  ['🦦', 'Otis Otter'], ['🦥', 'Slo'], ['🦄', 'Sparkle'], ['🐲', 'Ember'], ['🦩', 'Flora'], ['🐝', 'Bumble'],
  ['🐞', 'Dotty'], ['🦘', 'Joey'], ['🐑', 'Woolly'], ['🦙', 'Lorenzo Llama'],
];
const GREETINGS = [
  'Hello dear! Could I have the {dish}, please?',
  'I\'ve been dreaming about your {dish} all week!',
  'One {dish}, pretty please? My tummy is rumbling.',
  'They say your {dish} is made with love. Is it true?',
  'Good evening! The {dish} for me, if it\'s not too much trouble.',
  'I\'ll have the {dish}! Grandma said it\'s the coziest in town.',
  'Ooh, the {dish}! And a little extra love, if you have it.',
];
const QUIRKS = [
  { id: 'cheese',  type: 'want', tag: 'cheese', minDay: 1, text: 'Oh, and EXTRA cheese, please! (Not the recipe cheese — more!)' },
  { id: 'spicy',   type: 'want', tag: 'spicy',  minDay: 2, text: 'Make it spicy! My whiskers want a thrill.' },
  { id: 'herby',   type: 'want', tag: 'herb',   minDay: 1, text: 'Could you sprinkle something green and herby on top?' },
  { id: 'nutty',   type: 'want', tag: 'nut',    minDay: 2, text: 'I\'m nuts about nuts. Add some?' },
  { id: 'fruity',  type: 'want', tag: 'fruit',  minDay: 2, text: 'A little fruit on the side would brighten my day.' },
  { id: 'veggie',  type: 'no',   tag: 'animal', minDay: 1, text: 'I\'m vegetarian, so no extra meat or fish please!' },
  { id: 'noonion', type: 'no',   tag: 'allium', minDay: 2, text: 'Onions make me cry. Nothing oniony, please!' },
  { id: 'nutfree', type: 'no',   tag: 'nut',    minDay: 2, text: 'Nut allergy! Please keep nuts far, far away.' },
  { id: 'blue',    type: 'joy',  minDay: 2, text: 'I\'m feeling blue today… I need every single bite to be truly joyful.' },
  { id: 'purist',  type: 'pure', minDay: 1, text: 'I\'m a purist. Exactly the recipe. Nothing extra!' },
  { id: 'friends', type: 'friends', minDay: 1, text: 'I love when ingredients are best friends. Put some pals together? 💞' },
  { id: 'crew',    type: 'crew', minDay: 3, text: 'I can taste it when the kitchen crew is happy. Be nice to them!' },
  { id: 'tidy',    type: 'tidy', minDay: 0, text: 'Waste not! Please don\'t leave a single crumb lonely.' },
];
