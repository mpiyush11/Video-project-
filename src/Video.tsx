import React from 'react';
import {AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame} from 'remotion';
import envelope from './audioEnvelope.json';
import {AtmosphericParticles} from './scenes/ArtDirection';
import {Scene1Intro} from './scenes/Scene1Intro';
import {Scene2Verse} from './scenes/Scene2Verse';
import {Scene3Moon} from './scenes/Scene3Moon';
import {Scene4Turn} from './scenes/Scene4Turn';
import {Scene5Chorus} from './scenes/Scene5Chorus';
import {LyricOverlay} from './components/LyricOverlay';
import './styles.css';

const scenes = [
  {key:'intro', start:0, end:156, Component:Scene1Intro},
  {key:'verse', start:156, end:444, Component:Scene2Verse},
  {key:'moon', start:444, end:732, Component:Scene3Moon},
  {key:'turn', start:732, end:933, Component:Scene4Turn},
  {key:'chorus', start:933, end:envelope.durationInFrames, Component:Scene5Chorus},
];

const FilmFinish: React.FC = () => <>
  <div style={{position:'absolute',inset:0,pointerEvents:'none',background:'radial-gradient(ellipse at 50% 43%, transparent 38%, rgba(9,9,20,.18) 70%, rgba(5,7,17,.64) 100%)'}}/>
  <svg viewBox="0 0 1080 1920" preserveAspectRatio="none" style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none',mixBlendMode:'soft-light',opacity:.15}} aria-hidden="true">
    <filter id="filmGrain"><feTurbulence type="fractalNoise" baseFrequency=".82" numOctaves="2" stitchTiles="stitch"/></filter>
    <rect width="100%" height="100%" filter="url(#filmGrain)" opacity=".42"/>
  </svg>
  <div style={{position:'absolute',inset:0,pointerEvents:'none',border:'1px solid rgba(255,209,142,.14)',boxShadow:'inset 0 0 96px rgba(255,183,3,.08), inset 0 0 220px rgba(5,7,18,.34)'}}/>
</>;

export const KishoreReel: React.FC = () => {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{backgroundColor:'#0B132B',overflow:'hidden'}}>
    {scenes.map(({key,start,end,Component}, index) => {
      const fadeIn = index === 0 ? 1 : interpolate(frame, [start-12, start+12], [0,1], {extrapolateLeft:'clamp',extrapolateRight:'clamp'});
      const fadeOut = index === scenes.length-1 ? 1 : interpolate(frame, [end-12, end+12], [1,0], {extrapolateLeft:'clamp',extrapolateRight:'clamp'});
      return <AbsoluteFill key={key} style={{opacity:Math.min(fadeIn,fadeOut)}}><Component/></AbsoluteFill>;
    })}
    <AtmosphericParticles/>
    <LyricOverlay/>
    <FilmFinish/>
    <Audio src={staticFile('kishore_clip.mp3')} volume={1}/>
  </AbsoluteFill>;
};
