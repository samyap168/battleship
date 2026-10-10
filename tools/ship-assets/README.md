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
