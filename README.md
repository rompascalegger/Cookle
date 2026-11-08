# 🍳 Cookle

A cozy, funny, emotion-based cooking riddle. No timers, just feelings.

Every ingredient has a face, a personality and a mood. So do the pots, pans and the plate. How much **love** goes into a dish decides how delicious it is.

## How it plays

- 🐻 **Hungry animal guests** order dishes. Some have wishes: extra cheese, vegetarian, "I'm feeling blue, make every bite joyful"…
- 🧺 **Order ingredients** from the pantry with coins.
- 🚰 **Dirty food is sad.** Rinse veggies with Splashy the sink. Mushrooms want Bristle the brush, because water makes them soggy. Never wash bread, cheese or meat!
- 🔪 **Chop with Snippy.** The little pieces stay happy, but crumbs you leave alone on the counter get lonelier with every action you take.
- 🍳 **Cook with the crew** (Sizzle the pan, Toasty the grill, Nonna Brick the oven, Big Bubba the pot, Whiskers the bowl). Each ingredient dreams of one cooking method and fears another.
- 💝 **Treat them:** pat, joke, sing, whisper, hug, tickle. Each of the 12 personalities (Shy, Dramatic, Grumpy, Sassy, Philosopher…) loves one treatment and dislikes another. Their riddles hint at which.
- 💞 **Best friends** on a plate add love (tomato + basil). Feuding foods (pineapple + anchovy) take it away.
- 🔔 **Serve.** Love ≥ 35 = ⭐, ≥ 60 = ⭐⭐, ≥ 80 = ⭐⭐⭐.

## Progression

- **6 restaurants:** Sunny Sandwich Shack → Pizzeria Mamma Mood → The Bubbling Bistro → Sweet Sigh Bakery → Noodle Nook → Grand Menu Palace (3-course menus).
- **262 ingredients**, **58 recipes**, 8 kitchen tools, 6 treatments that unlock with stars.
- **Market:** 12 ingredient packs and 12 cozy decorations. Some decorations have perks, like Crumb the Cat comforting lonely crumbs.
- **Notebook:** discovered personalities, the ingredient collection, recipe star records and stats.
- **🧩 Daily Cookle:** a shared daily puzzle where you guess the secret dish from its ingredients' personalities, then share an emoji grid.

## Run it

It's a static site with no build step and no dependencies:

```bash
python -m http.server 8765
```

Then open http://localhost:8765. It also works as-is on GitHub Pages. Progress saves in `localStorage`.

## Files

- `index.html`: the app shell
- `css/style.css`: cozy styles and animations
- `js/data.js`: personalities, ingredients, recipes, restaurants, guests, quirks, packs and decor
- `js/faces.js`: the comic SVG face renderer (mood-driven expressions)
- `js/game.js`: the game engine, scoring, kitchen UI, market and notebook
- `js/daily.js`: the Daily Cookle puzzle
