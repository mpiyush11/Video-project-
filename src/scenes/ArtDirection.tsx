import React from 'react';
import {useCurrentFrame} from 'remotion';
import envelope from '../audioEnvelope.json';

type WorldProps = { mood: 'intro' | 'platform' | 'moon' | 'rose' | 'finale' };
const colors = {
  night: '#0B132B', ink: '#090f20', amber: '#FFB703', cream: '#FDF0D5', rose: '#9E2A2B',
};

export const audioPulse = (frame: number) => {
  const index = Math.max(0, Math.min(envelope.values.length - 1, frame));
  return envelope.values[index] ?? 0;
};

const Stars = () => <g fill="#ffe5a4">
  {Array.from({length: 48}, (_, i) => {
    const x = (i * 179 + 83) % 1080;
    const y = 95 + ((i * 107) % 980);
    const r = 0.7 + (i % 4) * 0.45;
    return <circle key={i} cx={x} cy={y} r={r} opacity={0.14 + (i % 5) * 0.07}/>;
  })}
</g>;

const Rain = ({frame, rose = false}: {frame: number; rose?: boolean}) => <g opacity={rose ? 0.18 : 0.23} stroke={rose ? '#e4ac9d' : '#b8d0d6'} strokeWidth="2">
  {Array.from({length: 76}, (_, i) => {
    const x = (i * 137 + 31) % 1120 - 20;
    const y = (i * 211 + frame * (10 + (i % 5) * 2)) % 1960;
    return <path key={i} d={`M${x} ${y}l-18 47`} opacity={0.15 + (i % 4) * 0.1}/>;
  })}
</g>;

const Lamp = ({x, y, frame, size = 1}: {x: number; y: number; frame: number; size?: number}) => {
  const pulse = audioPulse(frame);
  const glow = 0.78 + 0.19 * pulse + 0.035 * Math.sin(frame * 0.12 + x);
  return <g transform={`translate(${x} ${y}) scale(${size})`}>
    <circle r={122 * glow} fill="#ffb703" opacity=".09" filter="url(#softGlow)"/>
    <circle r="36" fill="#ffd27a" opacity=".26" filter="url(#softGlow)"/>
    <path d="M-13 0h26l9 25h-44z" fill="#ffc75b" opacity=".92"/>
    <path d="M-75 0h150" stroke="#503626" strokeWidth="5"/>
  </g>;
};

const PlatformArchitecture = ({frame, rose = false}: {frame: number; rose?: boolean}) => <g>
  {/* Distant station arches, decorative ironwork and the warm horizon */}
  <path d="M0 970Q115 670 250 970V1200H0zm180 10Q340 600 500 980V1200H180zm330-30Q685 630 850 960V1200H510zm320 10Q965 680 1080 950V1200H830z" fill="#15192a" stroke={rose ? '#86505a' : '#80613e'} strokeWidth="10" opacity=".74"/>
  <path d="M60 1130V1000Q125 822 190 1000v130m68 0V1000q82-232 164 0v130m207 0V997q87-236 174 0v133m60 0V990q72-188 144 0v140" fill="none" stroke="#d19a53" strokeWidth="6" opacity=".25"/>
  <path d="M0 1175H1080V1920H0z" fill={rose ? '#291b2c' : '#171c2b'}/>
  <path d="M0 1220H1080" stroke={rose ? '#b3665b' : '#b48651'} strokeWidth="8" opacity=".7"/>
  <path d="M0 1280H1080M0 1440H1080M0 1640H1080M0 1840H1080" stroke="#d6a269" strokeWidth="3" opacity=".11"/>
  <path d="M0 1250L450 1920M1080 1250L640 1920" fill="none" stroke="#c08a55" strokeWidth="4" opacity=".18"/>
  {[190, 535, 875].map((x) => <Lamp key={x} x={x} y={855 + (x % 3) * 28} frame={frame} size={x === 535 ? 1.12 : .82}/>)}
  <g opacity=".36" stroke="#d1a268" strokeWidth="5">
    <path d="M40 1180v-300h24v300m278 0V780h22v400m648 0V820h22v360"/>
    <path d="M10 880h76m220-100h64m624 40h72"/>
  </g>
  <path d="M65 1300H1010" stroke="#ffe1a6" strokeWidth="2" opacity=".16"/>
</g>;

const Traveler = ({x = 350, y = 940, scale = 1, facing = 1}: {x?: number; y?: number; scale?: number; facing?: number}) => <g transform={`translate(${x} ${y}) scale(${scale * facing} ${scale})`}>
  {/* Limned profile, period coat, scarf and diary: an elegant layered silhouette */}
  <ellipse cx="0" cy="530" rx="150" ry="24" fill="#030710" opacity=".65"/>
  <path d="M-45 205Q-84 255-115 359L-146 515Q-113 538-49 520L-18 374L2 520Q42 538 89 518L79 350Q62 260 35 210z" fill="#171a25" stroke="#bf8745" strokeWidth="7"/>
  <path d="M-48 211Q-78 306-65 507l35 8 27-166 30 169 36-4Q67 321 34 211z" fill="#24232a"/>
  <path d="M-40 232L-6 270l-23 125-49-117m112-42 18 134-45 25-8-128" fill="#9e562f" opacity=".86"/>
  <path d="M-62 252Q-6 276 47 245" fill="none" stroke="#ffcf7e" strokeWidth="4" opacity=".74"/>
  <path d="M-74 292Q-141 310-183 365l-41 86q15 18 41 14l69-71 77-29" fill="#1a1b24" stroke="#b67a43" strokeWidth="7"/>
  <path d="M40 278q83 5 121 76l38 62-22 20-75-52-93-53" fill="#27232b" stroke="#b67a43" strokeWidth="7"/>
  <path d="M-185 444q-24 20-18 44t40 19l38-35-7-24z" fill="#b7774d"/>
  <path d="M164 408q32-22 54 0t-12 45l-45 5z" fill="#b7774d"/>
  <path d="M-36 212q-15-43-8-91l57-27q37 24 33 72l-22 64z" fill="#bc8058" stroke="#f3c27a" strokeWidth="5"/>
  <path d="M-22 112q9-59 69-57 55 4 69 43l-10 13-47-18-24 6-12 27-39 8z" fill="#181a23" stroke="#c59351" strokeWidth="6"/>
  <path d="M39 140q31 6 49-8" fill="none" stroke="#55362e" strokeWidth="5"/>
  <path d="M47 78q18 20 41 31" fill="none" stroke="#e2ad66" strokeWidth="5"/>
  {/* Open leather diary */}
  <path d="M-260 360q46-26 93 1v99q-43-23-93 2zm95 1q48-27 93-1v101q-50-24-93-1z" fill="#814a32" stroke="#edc27f" strokeWidth="5"/>
  <path d="M-252 376q36-14 73 3m-73 12q34-13 73 4m19-18q34-17 73-1m-73 15q33-16 73-1" stroke="#f1d5a7" strokeWidth="3" opacity=".72"/>
  <path d="M-18 353l20-24 13 12-21 23" fill="#d7c5a3" stroke="#28202a" strokeWidth="4"/>
</g>;

const Woman = ({x = 755, y = 895, scale = 1}: {x?: number; y?: number; scale?: number}) => <g transform={`translate(${x} ${y}) scale(${scale})`}>
  <ellipse cx="0" cy="575" rx="168" ry="26" fill="#080a17" opacity=".68"/>
  {/* Saree silhouette with layered, wind-swept pleats */}
  <path d="M-42 188Q-105 236-101 338L-163 528Q-86 583 55 548L94 354Q82 265 37 205z" fill="#751f39" stroke="#e7a66e" strokeWidth="7"/>
  <path d="M-99 359Q-28 383 92 330l-40 217q-58 30-134 7z" fill="#a32e47"/>
  <path d="M-65 372l32 178m7-176 18 185m24-192 6 194" stroke="#f1bf80" strokeWidth="5" opacity=".5"/>
  <path d="M-44 210Q-90 273-61 362L-13 392 15 277 45 360l43-31q9-80-50-124z" fill="#412136" stroke="#d79b6d" strokeWidth="6"/>
  <path d="M-49 248Q-127 252-156 330l44 29 76-64m94-31q62 15 109 75l-31 34-96-49" fill="#9b2e46" stroke="#e6a16f" strokeWidth="6"/>
  <path d="M-163 331q-45-4-47 27 3 25 30 24l68-38m261 17q32-10 40 14-2 27-35 25l-58-34" fill="#b97b63"/>
  {/* Head, swept hair, earring */}
  <path d="M-35 213q-25-41-11-87l50-31q45 20 43 67l-19 59z" fill="#bc8067" stroke="#efc68d" strokeWidth="5"/>
  <path d="M-49 134q-3-74 57-80 59 3 69 59l-19 35-18-54-36-13-18 44-30 30z" fill="#161622" stroke="#c08a55" strokeWidth="6"/>
  <path d="M10 144q20 8 32-3m-17 28q14 8 28-1" stroke="#653d38" strokeWidth="4" fill="none"/>
  <circle cx="45" cy="167" r="8" fill="#ffcc72"/>
  {/* Dupatta in the evening air */}
  <path d="M-32 217Q53 192 108 249q74 74 165 35-34 59-117 64-92 1-139-61" fill="#bf5661" opacity=".75" stroke="#ffd29a" strokeWidth="5"/>
  <path d="M-8 226q95 71 213 72" fill="none" stroke="#ffd29a" strokeWidth="3" opacity=".85"/>
</g>;

const RecordAndRadio = ({frame}: {frame: number}) => {
  const rotation = frame * (1.2 + audioPulse(frame) * 0.62);
  return <g>
    <g transform="translate(286 880)">
      <circle r="312" fill="#000" opacity=".45" filter="url(#softGlow)"/>
      <circle r="269" fill="#17151d" stroke="#a67542" strokeWidth="13"/>
      <g transform={`rotate(${rotation})`}>
        {[236, 210, 183, 156, 129, 102].map((r) => <circle key={r} r={r} fill="none" stroke={r % 2 ? '#433943' : '#56505a'} strokeWidth="2" opacity=".8"/>)}
        <path d="M-230 5Q-100-17 5-230" fill="none" stroke="#b9a597" strokeWidth="3" opacity=".25"/>
      </g>
      <circle r="76" fill="#873b37" stroke="#f1bd71" strokeWidth="6"/>
      <circle r="59" fill="#a94c38" stroke="#f8d69d" strokeWidth="2"/>
      <text y="-11" textAnchor="middle" fill="#ffe1a6" fontSize="16" letterSpacing="4" fontFamily="Cormorant Garamond">SIDE A</text>
      <text y="17" textAnchor="middle" fill="#ffe1a6" fontSize="17" fontFamily="Cormorant Garamond" fontStyle="italic">Kishore</text>
      <circle r="8" fill="#e9d8ba"/>
      <path d="M260-213l114 80-10 13-99-57-34 92" fill="none" stroke="#d0ae7b" strokeWidth="12" strokeLinecap="round"/>
      <circle cx="256" cy="-212" r="15" fill="#796044" stroke="#e3c28e" strokeWidth="5"/>
    </g>
    <g transform="translate(718 772)">
      <rect x="-190" y="-28" width="408" height="330" rx="32" fill="#30241e" stroke="#b8844a" strokeWidth="12"/>
      <rect x="-164" y="-4" width="356" height="265" rx="19" fill="#8a4a2c" stroke="#e7bc79" strokeWidth="5"/>
      <rect x="-145" y="15" width="317" height="103" rx="8" fill="#111628" stroke="#dea959" strokeWidth="4"/>
      <path d="M-130 80q48-85 94 0 47-77 93-2 43-74 104-3" fill="none" stroke="#ffca66" strokeWidth="8" opacity=".85" filter="url(#softGlow)"/>
      <circle cx="-87" cy="178" r="31" fill="#271a19" stroke="#efc57e" strokeWidth="6"/>
      <circle cx="112" cy="178" r="31" fill="#271a19" stroke="#efc57e" strokeWidth="6"/>
      <circle cx="-87" cy="178" r="8" fill="#ffc866"/><circle cx="112" cy="178" r="8" fill="#ffc866"/>
      <path d="M-150 230H174" stroke="#3c2924" strokeWidth="9"/>
      <path d="M-165-29q3-76 36-95m230 96q-4-72-37-94" fill="none" stroke="#e2b966" strokeWidth="10"/>
      <path d="M-175 291h375l28 47h-430z" fill="#181822" stroke="#9c744c" strokeWidth="7"/>
    </g>
  </g>;
};

const Moon = ({frame}: {frame: number}) => <g>
  <circle cx="820" cy="360" r="210" fill="#ffd078" opacity=".08" filter="url(#softGlow)"/>
  <path d="M841 208a152 152 0 1 0 112 244 129 129 0 0 1-112-244" fill="#ffe7b2" opacity=".94"/>
  <circle cx="780" cy="366" r="187" fill="none" stroke="#ffcf78" strokeWidth="2" opacity=".3"/>
  {[0,1,2].map((i) => <circle key={i} cx={250+i*230} cy={350+i*90} r={48 + audioPulse(frame)*15} fill="#ffc971" opacity={0.1 + audioPulse(frame)*0.09} filter="url(#softGlow)"/>)}
</g>;

export const World = ({mood}: WorldProps) => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const pulse = audioPulse(frame);
  const rose = mood === 'rose' || mood === 'finale';
  const pan = Math.sin(t * 0.18) * 13 + Math.sin(t * 0.07) * 9;
  const zoom = 1.015 + 0.035 * (frame / 992) + pulse * 0.004;
  return <svg viewBox="0 0 1080 1920" width="1080" height="1920" aria-hidden="true" style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2=".8" y2="1"><stop stopColor={mood === 'rose' || mood === 'finale' ? '#20162b' : '#0B132B'}/><stop offset=".58" stopColor={mood === 'rose' || mood === 'finale' ? '#442137' : '#222237'}/><stop offset="1" stopColor="#171a28"/></linearGradient>
      <radialGradient id="horizon"><stop stopColor={mood === 'rose' || mood === 'finale' ? '#b15b55' : '#d18a3b'} stopOpacity=".42"/><stop offset="1" stopColor="#0B132B" stopOpacity="0"/></radialGradient>
      <filter id="softGlow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="28"/></filter>
      <filter id="mist"><feGaussianBlur stdDeviation="26"/></filter>
      <linearGradient id="beam" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#ffc65e" stopOpacity=".19"/><stop offset="1" stopColor="#ffc65e" stopOpacity="0"/></linearGradient>
    </defs>
    <rect width="1080" height="1920" fill="url(#sky)"/>
    <ellipse cx="550" cy="1050" rx="680" ry="550" fill="url(#horizon)"/>
    <Stars/>
    <g transform={`translate(${pan} ${mood === 'moon' ? -Math.abs(pan)*.4 : 0}) scale(${zoom})`} style={{transformOrigin:'540px 960px'}}>
      {mood !== 'intro' && <>
        <PlatformArchitecture frame={frame} rose={rose}/>
        {mood === 'platform' && <>
          <Traveler x={385} y={948} scale={1.0}/>
          <g fill="none" stroke="#ffca70" strokeWidth="5" opacity=".7" filter="url(#softGlow)">
            <path d={`M520 1000q${-120+Math.sin(t)*40} -160 43 -250t61 -180`}/><path d="M548 988q120-120 10-222t72-184"/>
          </g>
          {[0,1,2,3].map(i=><g key={i} transform={`translate(${570 + Math.sin(t*1.8+i)*45} ${820 - ((frame*4+i*190)%460)}) rotate(${i*38})`} fill="#ffd175" filter="url(#softGlow)"><path d="M0-20q16 18 0 38-16-20 0-38z"/><circle cx="0" cy="0" r="4" fill="#fff1c6"/></g>)}
        </>}
        {mood === 'moon' && <>
          <Moon frame={frame}/>
          <path d="M-30 1050Q120 630 255 1050V1250H-30zm170 0Q325 490 510 1050V1250H140zm325 0Q680 570 850 1050V1250H465zm320 0Q970 655 1110 1050V1250H785" fill="#1c1e32" stroke="#a87d53" strokeWidth="8" opacity=".7"/>
          {Array.from({length:7},(_,i)=><g key={i} transform={`translate(${145+i*128} ${680+Math.sin(frame*.028+i)*110}) rotate(${Math.sin(frame*.024+i)*26})`}><path d="M0-60q63 54 4 124Q-57 67 0-60" fill="#efbc70" opacity=".7" stroke="#ffe8b7" strokeWidth="3"/><path d="M-34 5q34 6 66-14" fill="none" stroke="#9d563f" strokeWidth="2"/></g>)}
          <path d="M90 940q-44 38-1 94l80 25 25-36-60-43zM834 830q50-39 91-4l-10 126-77 16-43-38z" fill="#dfc18c" opacity=".57"/>
        </>}
        {mood === 'rose' && <>
          <Woman x={700} y={833} scale={1.0}/><Traveler x={370} y={1015} scale={.9}/>
          {Array.from({length:21},(_,i)=>{const x=(i*157+75)%1080;const y=(i*263+frame*(12+i%3*4))%1750;return <g key={i} transform={`translate(${x} ${y}) rotate(${frame*2+i*21})`} fill={i%2?'#b6374d':'#dc7464'} opacity=".74"><path d="M0-14q17 11 3 30-18-12-3-30z"/></g>;})}
        </>}
        {mood === 'finale' && <>
          <Traveler x={400} y={940} scale={.9}/><Woman x={705} y={910} scale={.95}/>
          <path d="M0 715Q530 550 1080 725v180Q530 740 0 930z" fill="#ffc968" opacity={.06 + pulse*.08} filter="url(#softGlow)"/>
          <circle cx="540" cy="925" r={210 + pulse*34} fill="#ffcf6c" opacity={.06 + pulse*.05} filter="url(#softGlow)"/>
        </>}
      </>}
      {mood === 'intro' && <>
        {/* Rainy window, distant twilight, and a warm tube-radio pool */}
        <rect x="0" y="230" width="1080" height="1180" fill="#101b30" opacity=".38"/>
        <path d="M25 320H1055M25 1320H1055M525 320V1320" stroke="#77634e" strokeWidth="20" opacity=".65"/>
        <path d="M40 340H515V1300H40zM550 340H1040V1300H550z" fill="#121d30" stroke="#d4a66e" strokeWidth="6" opacity=".55"/>
        <path d="M82 1040Q220 860 360 1025t142-25" fill="none" stroke="#bd8150" strokeWidth="14" opacity=".35"/>
        <path d="M560 1060q124-212 250 0t225-120" fill="none" stroke="#d7a15b" strokeWidth="11" opacity=".34"/>
        <path d="M0 440L1080 950 1080 1130 0 730z" fill="url(#beam)" opacity=".45"/>
        <RecordAndRadio frame={frame}/>
      </>}
    </g>
    {mood !== 'intro' && <Rain frame={frame} rose={rose}/>}
    <g opacity={.2 + pulse*.15} filter="url(#mist)"><ellipse cx="340" cy="1230" rx="520" ry="76" fill="#edd2bb"/><ellipse cx="810" cy="1450" rx="640" ry="110" fill="#eed0b0"/></g>
  </svg>;
};

export const AtmosphericParticles = () => {
  const frame = useCurrentFrame();
  const pulse = audioPulse(frame);
  return <svg viewBox="0 0 1080 1920" width="1080" height="1920" style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none'}} aria-hidden="true">
    <defs><filter id="dustGlow"><feGaussianBlur stdDeviation="6"/></filter></defs>
    {Array.from({length:55},(_,i)=>{
      const drift=(frame*(2+i%4)+i*83)%1980;
      const x=(i*191+117+Math.sin(frame*.012+i)*32)%1080;
      const y=190+drift;
      const r=1.3+(i%5)*.55 + pulse*.7;
      const opacity=.15+(i%6)*.075 + pulse*.12;
      return <g key={i}><circle cx={x} cy={y} r={r*2.6} fill="#ffca6b" opacity={opacity*.22} filter="url(#dustGlow)"/><circle cx={x} cy={y} r={r} fill={i%8===0?'#fff0c7':'#ffca6b'} opacity={opacity}/></g>;
    })}
  </svg>;
};
