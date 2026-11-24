import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';

const captions = [
  {start: 156, end: 294, main: 'जान-ए-मन, जान-ए-जिगर, होता मैं शायर अगर', sub: 'Jaan-e-man, jaan-e-jigar, hota main shayar agar'},
  {start: 294, end: 444, main: 'कहता ग़ज़ल तेरी अदाओं पर', sub: 'Kehta ghazal teri adaaon par'},
  {start: 444, end: 588, main: 'जान-ए-मन, जान-ए-जिगर, होता मैं शायर अगर', sub: 'Jaan-e-man, jaan-e-jigar, hota main shayar agar'},
  {start: 588, end: 732, main: 'कहता ग़ज़ल तेरी अदाओं पर', sub: 'Kehta ghazal teri adaaon par'},
  {start: 732, end: 846, main: 'मैंने ये कहा तो मुझ से ख़फ़ा', sub: 'Maine ye kaha toh mujhse khafa'},
  {start: 846, end: 933, main: 'वो जान-ए-हयात, हो गई', sub: 'Woh jaan-e-hayat, ho gayi'},
  {start: 933, end: 992, main: 'एक अजनबी हसीना से यूँ मुलाक़ात हो गई', sub: 'Ek ajnabee haseena se yun mulaqaat ho gayi', chorus: true},
];

export const LyricOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const caption = captions.find((c) => frame >= c.start && frame < c.end);
  const lyricOpacity = caption ? interpolate(frame, [caption.start, caption.start + 9, caption.end - 8, caption.end], [0, 1, 1, 0], {extrapolateLeft:'clamp', extrapolateRight:'clamp'}) : 0;
  const lyricLift = caption ? interpolate(frame, [caption.start, caption.start + 13], [17, 0], {extrapolateRight:'clamp'}) : 0;
  const badgeOpacity = interpolate(frame, [60, 74, 138, 150], [0, 1, 1, 0], {extrapolateLeft:'clamp', extrapolateRight:'clamp'});
  return <div style={{position:'absolute',inset:0,pointerEvents:'none',fontFamily:'Noto Serif Devanagari, serif'}}>
    {/* Opening title is deliberately restrained, like a restored 1974 title card. */}
    <div style={{position:'absolute',top:376,left:'50%',transform:'translateX(-50%)',opacity:badgeOpacity,display:'flex',alignItems:'center',gap:17,padding:'15px 27px',whiteSpace:'nowrap',border:'1px solid rgba(255,205,115,.58)',borderRadius:2,color:'#ffe0a0',background:'rgba(12,17,31,.55)',boxShadow:'0 0 42px rgba(255,183,3,.12)',letterSpacing:4,fontFamily:'Cormorant Garamond, serif',fontSize:24,fontWeight:700}}>
      <span style={{width:30,height:1,background:'#ffb703'}}/>1974&nbsp;•&nbsp; KISHORE KUMAR CLASSICS<span style={{width:30,height:1,background:'#ffb703'}}/>
    </div>
    {caption && <div style={{position:'absolute',top:1184,left:80,right:80,height:306,opacity:lyricOpacity,transform:`translateY(${lyricLift}px)`,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center'}}>
      <div style={{position:'absolute',inset:'18px 0',borderRadius:18,background:'linear-gradient(90deg, rgba(9,14,28,0), rgba(9,14,28,.82) 16%, rgba(9,14,28,.82) 84%, rgba(9,14,28,0))',borderTop:'1px solid rgba(255,210,142,.16)',borderBottom:'1px solid rgba(255,210,142,.16)',boxShadow:'0 18px 60px rgba(0,0,0,.12)'}}/>
      <div style={{position:'relative',maxWidth:920,color:caption.chorus?'#ffd477':'#fff0d3',fontSize:caption.chorus?56:55,fontWeight:700,lineHeight:1.45,letterSpacing:'.01em',textShadow:caption.chorus?'0 0 18px rgba(255,183,3,.56), 0 3px 17px rgba(0,0,0,.85)':'0 3px 16px rgba(0,0,0,.95)'}}>{caption.main}</div>
      <div style={{position:'relative',marginTop:15,color:'#ebc28a',fontFamily:'Cormorant Garamond, serif',fontSize:31,fontWeight:600,fontStyle:'italic',letterSpacing:'.035em',textShadow:'0 2px 12px #080d1b'}}>{caption.sub}</div>
      <div style={{position:'relative',marginTop:21,width:108,height:2,background:'linear-gradient(90deg, transparent, #ffb703, transparent)',opacity:.82}}/>
    </div>}
  </div>;
};
