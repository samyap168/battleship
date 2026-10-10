import sys, math, bpy
from mathutils import Vector
glb, out = sys.argv[1], sys.argv[2]
az, el, dist = float(sys.argv[3]), float(sys.argv[4]), float(sys.argv[5])
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=glb)
sc = bpy.context.scene
sc.render.engine = 'CYCLES'; sc.cycles.samples = 20; sc.cycles.device = 'CPU'; sc.cycles.use_denoising = True
sc.render.resolution_x, sc.render.resolution_y = 1280, 640
w = bpy.data.worlds.new('w'); sc.world = w; w.use_nodes = True
bg = w.node_tree.nodes['Background']; bg.inputs[0].default_value = (0.35, 0.5, 0.7, 1); bg.inputs[1].default_value = 1.2
sun = bpy.data.lights.new('sun', 'SUN'); sun.energy = 4.0; so = bpy.data.objects.new('sun', sun); sc.collection.objects.link(so); so.rotation_euler = (math.radians(55), 0, math.radians(35))
cam = bpy.data.cameras.new('c'); cam.lens = 50; co = bpy.data.objects.new('c', cam); sc.collection.objects.link(co); sc.camera = co
tgt = Vector((0, 0, 0.9))
a, e = math.radians(az), math.radians(el)
co.location = tgt + Vector((math.cos(e) * math.sin(a), -math.cos(e) * math.cos(a), math.sin(e))) * dist
d = tgt - co.location; co.rotation_euler = d.to_track_quat('-Z', 'Y').to_euler()
# sea plane
bpy.ops.mesh.primitive_plane_add(size=200, location=(0, 0, 0)); pl = bpy.context.object
m = bpy.data.materials.new('sea'); m.use_nodes = True; m.node_tree.nodes['Principled BSDF'].inputs['Base Color'].default_value = (0.02, 0.09, 0.12, 1); m.node_tree.nodes['Principled BSDF'].inputs['Roughness'].default_value = 0.15; pl.data.materials.append(m)
sc.render.filepath = out; bpy.ops.render.render(write_still=True)
