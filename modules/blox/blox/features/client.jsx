/**
 * Features Block - Client-side Hydration
 */

import {render} from "preact";
import {FeaturesBlock} from "./component.jsx";

function renderFeaturesBlocks() {
  const blocks = document.querySelectorAll('[data-block-type="features"]');

  blocks.forEach((block) => {
    const propsData = block.dataset.props;
    if (propsData) {
      try {
        const props = JSON.parse(propsData);
        render(<FeaturesBlock {...props} />, block);
        console.debug(`✓ Features block "${block.id}" rendered with Preact`);
      } catch (error) {
        console.error(`Failed to render Features block "${block.id}":`, error);
      }
    }
  });
}

renderFeaturesBlocks();
