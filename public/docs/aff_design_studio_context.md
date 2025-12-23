🧵 AFF — African Fashion Forge (Design Studio Context)

AFF (African Fashion Forge) is a fashion-tech platform for designers, tailors, and DIY creators.
One of the core modules is the Design Studio — a Fabric.js + Next.js powered garment-construction tool.

The Design Studio must allow users to:

Combine garment blocks (sleeves, collars, torso, skirts, cuffs, etc.)

Attach components using anchor points

Adjust measurements dynamically (parametric design)

Apply textures/fabrics

Export designs (PNG / SVG / JSON)

Save/load reusable patterns

The Design Studio is a 2D parametric garment-engine similar to simplified CLO3D / Illustrator pattern workflows.

🎨 1. Garment Blocks (SVG-based Components)

Garment blocks are stored as individual SVG files.
Each block must contain metadata describing:

Block Metadata Structure
{
  "type": "collar" | "sleeve" | "torso" | "skirt",
  "anchors": {
    "attach_left":  { "x": 10, "y": 25 },
    "attach_right": { "x": 90, "y": 25 }
  },
  "measurements": {
    "base_width_cm": 40,
    "base_height_cm": 50
  }
}


Each SVG is loaded into Fabric.js and wrapped as a group object with metadata.

🧲 2. Anchor-Point Attachment System (CORE FEATURE)

Every block contains anchor points.
When attaching, Codex must perform:

Algorithm (simplified)
function attachBlock(base, child, baseAnchorKey, childAnchorKey) {
  const baseAnchor = getAnchorPosition(base, baseAnchorKey);
  const childAnchor = getAnchorPosition(child, childAnchorKey);

  const dx = baseAnchor.x - childAnchor.x;
  const dy = baseAnchor.y - childAnchor.y;

  child.set({
    left: child.left + dx,
    top:  child.top + dy
  });

  canvas.renderAll();
}

Requirements:

Support multiple anchor types

Auto-align rotation (optional)

Scaling child block before attach

Ensure snapping is pixel-accurate

Child block becomes part of a GarmentComposition Group

📏 3. Measurement Engine (Parametric Scaling)

Users can modify measurements:

height

chest

waist

sleeve length

shoulder width

neck size

Each block has baseline measurement metadata:

{
  "baseline": {
    "width_cm": 40,
    "height_cm": 55
  }
}

Scaling rule example:
const scaleX = userChest / baselineChest;
block.scaleX = scaleX;
block.setCoords();

Measurement Engine Goals

Apply proportional scaling

Maintain anchor point accuracy after scaling

Re-attach accessories after measurement updates

Keep all blocks within a shared coordinate space

🎨 4. Fabric & Texture Application

Users can upload a fabric image (PNG/JPG).
Codex must help implement:

Pattern Fill Logic:
const pattern = new fabric.Pattern({
  source: fabricImage,
  repeat: "repeat"
});

block.set("fill", pattern);


Additional goals:

Allow scaling of texture

Allow rotation

Store fabric metadata in design JSON

Export texture inside SVG when possible

💾 5. Export Pipeline (PNG / SVG / JSON)

Codex should help implement clean exports:

PNG
canvas.toDataURL({ format: "png" });

SVG
const svg = canvas.toSVG();

JSON

Full design model must serialize:

const saveData = canvas.toJSON(["metadata", "anchors"]);

Requirements

Preserve anchor metadata

Embed texture images

Maintain correct scaling

📂 6. Save / Load System (Design Persistence)

Designs must be storable into a database (Supabase or AFF backend):

Save Format:
{
  "id": "uuid",
  "title": "My Shirt Design",
  "canvas_json": {...},
  "thumbnail_url": "https://...",
  "fabric_urls": [...]
}

Load procedure:

Fetch design JSON

Load into Fabric canvas using canvas.loadFromJSON()

Rehydrate anchors and metadata

⚙️ 7. Architecture Goals (For Codex)
The codebase should contain:
A. Canvas Engine
/design/canvas/
  - canvasManager.ts
  - objectLoader.ts
  - anchorEngine.ts
  - measurementEngine.ts
  - textureEngine.ts

B. Components
/components/design/
  - BlockSelector.tsx
  - MeasurementControls.tsx
  - TexturePicker.tsx
  - ExportPanel.tsx

C. Data
/public/blocks/*.svg
/blocks/metadata/*.json

🧠 8. Primary Tasks Codex Should Assist With

When prompting Codex, the tasks include:

1. Create the anchor-alignment engine
2. Write the measurement scaling logic
3. Load SVG + metadata as Fabric objects
4. Build the garment composition grouping system
5. Apply texture patterns to shapes
6. Implement export functions
7. Ensure anchors survive serialization
8. Construct React components to manage tools
9. Manage state between Fabric canvas and Next.js UI
10. Help prototype parametric garment blocks
🧵 9. Functional Requirements Summary (For Codex)

The design studio must allow:

✔ Load and place multiple garment blocks
✔ Snap blocks together via anchor points
✔ Adjust measurements and scale components
✔ Change fabrics and textures
✔ Undo/Redo
✔ Save and load designs
✔ Pan/zoom canvas
✔ Export final result

This file provides Codex with:

your technical direction

your domain logic

your file structure

your math and rules

your constraints

your export requirements

🎯 10. How to Use This File

In VS Code:

Place this file at:

/docs/aff_design_studio_context.md


Open it while using Codex.

Ask:

Codex, using the context in docs/aff_design_studio_context.md,
help me implement the anchor alignment engine in Fabric.js.
