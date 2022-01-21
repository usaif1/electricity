import React, { Suspense, useRef, useState } from "react";
import * as THREE from "three";
import { BlurPass, Resizer, KernelSize } from "postprocessing";

import {
  EffectComposer,
  DepthOfField,
  SelectiveBloom,
  Bloom,
  Noise,
  Vignette,
} from "@react-three/postprocessing";

const BloomEffect = ({ lightRef1, lightRef2, meshRef }) => {
  return (
    <EffectComposer>
      <SelectiveBloom
        lights={[lightRef1, lightRef2]} // ⚠️ REQUIRED! all relevant lights
        selection={[meshRef]} // selection of objects that will have bloom effect
        selectionLayer={10} // selection layer
        intensity={1.0} // The bloom intensity.
        blurPass={undefined} // A blur pass.
        width={Resizer.AUTO_SIZE} // render width
        height={Resizer.AUTO_SIZE} // render height
        kernelSize={KernelSize.LARGE} // blur kernel size
        luminanceThreshold={0.9} // luminance threshold. Raise this value to mask out darker elements in the scene.
        luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
      />
    </EffectComposer>
  );
};

export default BloomEffect;
