import React from 'react';
import {Composition} from 'remotion';
import envelope from './audioEnvelope.json';
import {KishoreReel} from './Video';

export const RemotionRoot: React.FC = () => <Composition
  id="KishoreRetroBollywoodReel"
  component={KishoreReel}
  width={1080}
  height={1920}
  fps={30}
  durationInFrames={envelope.durationInFrames}
/>;
