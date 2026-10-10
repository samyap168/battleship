# Ship assets (Blender, headless)

`build_frigate.py` rebuilds `public/models/frigate_hull.glb`: the game's own frigate hull lines (a Python port of
`makeHull` in `src/render/models/shipModels.js`, see `hulllib.py`) at high resolution, with generated plank, copper and
deck textures (`textures.py`), wales and a rub rail. Rigging, sails, cannons and the quarterdeck stay procedural in the
game, so the hull must keep the same lines: if `makeHull` parameters change, change them in `hulllib.Hull` too.

```
python3.11 -m venv bvenv && bvenv/bin/pip install bpy pillow numpy      # Blender 5 as a module, ~375 MB
cd tools/ship-assets && ../../bvenv/bin/python build_frigate.py ../../public/models/frigate_hull.glb
../../bvenv/bin/python render_glb.py $PWD/../../public/models/frigate_hull.glb $PWD/review.png 70 12 24   # Cycles review render
```
The GLB has four meshes (`hull`, `team`, `deck`, `trim`). `team` is tinted with the team colour in `glbMaterial()`.
`src/render/models/glbHulls.js` loads it at boot; if it is missing the code-built hull is used.

## Steel hero hulls (ironclad, dreadnought, torpedo, battleship, carrier)

`build_hull.py HULL_ID OUT.glb` builds the other lofted hulls the same way. `hulllib.HULLS` holds, per hull, the exact options
the builder in `shipModels.js` passes to `makeHull` (`js`), the band boundaries (`bands`: which mesh each strake belongs to) and
the texture settings. If a builder's `makeHull` options change, change them in `HULLS` and rebuild; the lines must match or the
guns, superstructure and turrets will not sit on the deck.

```
cd tools/ship-assets
for h in ironclad dreadnought torpedo battleship carrier; do ../../bvenv/bin/python build_hull.py $h ../../public/models/${h}_hull.glb; done
```
Meshes: `hull` (riveted lapped plating, boot-topping, anti-fouling, waterline weathering; texture U is the outline arc length in
metres, V is physical height), `team` (neutral tileable plate tinted with the team colour by `glbMaterial()`; absent on the
carrier, whose hull has no team band), `deck` (tread-plate steel tile, or the teak tile on the dreadnought and battleship) and
`trim` (rail cap, inner bulwark and weld beads, tinted with the builder's rail colour). `textures_steel.py` writes the maps to
`_tex/` (ignored); they are exported as JPEG. All the hull GLBs together are about 7 MB.

Not converted: the arsenal cruiser and the drone mothership. Both are deliberately faceted low-poly stealth hulls (`nu: 20`,
`nLow: 3`, `rowStep: 1`) whose angular panels and emissive `teamGlow` seams are the design, and the mothership is a main hull plus
two outrigger hulls placed by matrix and joined by a wing deck; a smooth high-resolution shell would change the silhouette.
They keep the code-built hull, as do the creep ships.
