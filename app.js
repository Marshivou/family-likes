(function () {
  'use strict';
  const INK = '#1B365D';
  const SKIN = '#F3BE92';

  /* Order matches the lesson: Mom, Brother, Sister, Dad, Baby */
  const FAMILY = [
    { id: 'mother',  name: 'Mom',     item: 'volleyball', pre: 'Mom likes to play ',        word: 'volleyball', wrong: 'basketball', tint: '#EBDDFF' },
    { id: 'brother', name: 'Brother', item: 'guitar',     pre: 'Brother likes to play the ', word: 'guitar',     wrong: 'piano',      tint: '#DAF5E6' },
    { id: 'sister',  name: 'Sister',  item: 'tennis',     pre: 'Sister likes to play ',      word: 'tennis',     wrong: 'volleyball', tint: '#FFE0EA' },
    { id: 'father',  name: 'Dad',     item: 'piano',      pre: 'Dad likes to play the ',     word: 'piano',      wrong: 'guitar',     tint: '#DCEAFF' },
    { id: 'baby',    name: 'Baby',    item: 'sleeping',   pre: 'Baby likes to ',             word: 'sleep',      wrong: 'eating',     tint: '#FFF1BF' }
  ];
  const byId = {};
  FAMILY.forEach(f => { byId[f.id] = f; });
  const ACTS = ['volleyball', 'basketball', 'tennis', 'piano', 'guitar', 'sleeping', 'eating'];
  const ACTNAME = { volleyball: 'Volleyball', basketball: 'Basketball', tennis: 'Tennis', piano: 'Piano', guitar: 'Guitar', sleeping: 'Sleeping', eating: 'Eating' };
  const PRAISE = [
    { key: 'great-job', text: 'Great job!' }, { key: 'nice-job', text: 'Nice job!' },
    { key: 'well-done', text: 'Well done!' }, { key: 'good-job', text: 'Good job!' }
  ];
  const WRONG = [{ key: 'try-again', text: 'Try again!' }, { key: 'not-quite', text: 'Oops! Try again.' }];
  const pick = a => a[Math.floor(Math.random() * a.length)];

  /* ---------- Family pictures: round, friendly faces ---------- */
  const path = (d, fill, w) => `<path d="${d}" fill="${fill}" stroke="${INK}" stroke-width="${w || 5}" stroke-linejoin="round" stroke-linecap="round"/>`;
  const head = (cy, r) => `<circle cx="100" cy="${cy}" r="${r}" fill="${SKIN}" stroke="${INK}" stroke-width="5"/>`;
  const ear = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${SKIN}" stroke="${INK}" stroke-width="5"/>`;
  const NECK = `<rect x="87" y="122" width="26" height="36" rx="10" fill="${SKIN}" stroke="${INK}" stroke-width="5"/>`;
  const NECK_BABY = `<rect x="88" y="146" width="24" height="28" rx="10" fill="${SKIN}" stroke="${INK}" stroke-width="5"/>`;

  function face(cy, o) {
    const eyes = [-1, 1].map(s =>
      `<ellipse cx="${s * o.gap}" cy="${o.ey}" rx="${o.rx}" ry="${o.ry}" fill="${INK}"/>` +
      `<circle cx="${s * o.gap + 2}" cy="${o.ey - 2.5}" r="2.2" fill="#fff"/>`).join('');
    const cheeks = [-1, 1].map(s => `<circle cx="${s * o.cx}" cy="${o.cy}" r="${o.cr}" fill="#FF8FA3" opacity=".6"/>`).join('');
    const w = o.mw, d = o.drop;
    const mouth = `<g class="mouth"><path d="M${-w} 12 Q0 ${12 + d} ${w} 12 Z" fill="#A63A4D" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>` +
      `<ellipse cx="0" cy="${12 + d * 0.36}" rx="${w * 0.42}" ry="${Math.max(3, d * 0.11)}" fill="#FF8FA3"/></g>`;
    return `<g transform="translate(100 ${cy})"><g class="eyes">${eyes}</g>${cheeks}${mouth}</g>`;
  }
  const ADULT = { gap: 18, ey: 2, rx: 5, ry: 6.5, cx: 30, cy: 17, cr: 7, mw: 15, drop: 34 };
  const KID = { gap: 17, ey: 3, rx: 5.5, ry: 7, cx: 30, cy: 18, cr: 7.5, mw: 14, drop: 32 };
  const BABY = { gap: 20, ey: 4, rx: 6.5, ry: 8.5, cx: 35, cy: 21, cr: 9, mw: 11, drop: 26 };

  const GLYPH = {
    heart: '<path d="M0 7 C-14 -4 -9 -15 0 -8 C9 -15 14 -4 0 7 Z" fill="#FF5C7A" stroke="' + INK + '" stroke-width="2.5" stroke-linejoin="round"/>',
    star: '<path d="M0 -9 L2.6 -3 L9 -2.6 L4 1.6 L5.6 8 L0 4.6 L-5.6 8 L-4 1.6 L-9 -2.6 L-2.6 -3 Z" fill="#FFC93C" stroke="' + INK + '" stroke-width="2.5" stroke-linejoin="round"/>',
    sparkle: '<path d="M0 -11 Q1.5 -1.5 11 0 Q1.5 1.5 0 11 Q-1.5 1.5 -11 0 Q-1.5 -1.5 0 -11 Z" fill="#FFE27A" stroke="' + INK + '" stroke-width="2.5" stroke-linejoin="round"/>',
    bubble: '<circle r="8" fill="#D9F2FF" stroke="' + INK + '" stroke-width="2.5"/><circle cx="-2.5" cy="-2.5" r="2" fill="#fff"/>',
    note: '<ellipse cx="-3" cy="6" rx="6.5" ry="4.8" fill="' + INK + '"/><path d="M3 6 V-10 Q11 -6 10 1" fill="none" stroke="' + INK + '" stroke-width="3.2" stroke-linecap="round"/>',
    zed: '<path d="M-7 -7 H7 L-7 7 H7" fill="none" stroke="' + INK + '" stroke-width="7.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M-7 -7 H7 L-7 7 H7" fill="none" stroke="#BFE3FF" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>',
    steam: '<path d="M0 10 Q-7 2 0 -4 Q7 -10 0 -18" fill="none" stroke="' + INK + '" stroke-width="7" stroke-linecap="round"/><path d="M0 10 Q-7 2 0 -4 Q7 -10 0 -18" fill="none" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round"/>'
  };
  function fx(kind, spots) {
    spots = spots || [[30, 62, 1], [170, 72, 1], [100, 16, 1]];
    return spots.map((p, i) => `<g transform="translate(${p[0]} ${p[1]}) scale(${p[2] || 1})"><g class="fx" style="--i:${i}">${GLYPH[kind]}</g></g>`).join('');
  }
  const flower = (x, y) => {
    let s = '';
    for (let i = 0; i < 5; i++) {
      const a = i * Math.PI * 2 / 5 - Math.PI / 2;
      s += `<circle cx="${(x + 8 * Math.cos(a)).toFixed(1)}" cy="${(y + 8 * Math.sin(a)).toFixed(1)}" r="6" fill="#FF8FB3" stroke="${INK}" stroke-width="2.5"/>`;
    }
    return s + `<circle cx="${x}" cy="${y}" r="4.5" fill="#FFD23F" stroke="${INK}" stroke-width="2"/>`;
  };

  const CHAR = {
    mother() {
      return '<g class="fig fig-mother">' +
        path('M44 100 C38 40 70 24 100 24 C130 24 162 40 156 100 C158 132 150 152 142 164 L58 164 C50 152 42 132 44 100 Z', '#5A3826') +
        NECK +
        path('M28 200 C28 166 58 150 100 150 C142 150 172 166 172 200 Z', '#9B7BE0') +
        path('M84 151 Q100 180 116 151 Z', SKIN, 4) +
        head(92, 50) + face(92, ADULT) +
        path('M50 90 C48 50 76 36 100 36 C126 36 152 50 150 90 C134 64 112 58 96 64 C78 70 60 76 50 90 Z', '#5A3826') +
        flower(138, 52) +
        '</g>' + fx('heart');
    },
    father() {
      return '<g class="fig fig-father">' +
        NECK +
        path('M28 200 C28 166 58 150 100 150 C142 150 172 166 172 200 Z', '#4A86E8') +
        path('M80 150 L100 174 L120 150 L127 159 L100 186 L73 159 Z', '#FFFFFF', 4) +
        path('M100 174 L94 188 L100 204 L106 188 Z', '#E85D5D', 3) +
        ear(51, 96, 9) + ear(149, 96, 9) +
        head(92, 50) + face(92, ADULT) +
        `<g fill="#FFFFFF" fill-opacity=".35" stroke="${INK}" stroke-width="4.5"><circle cx="82" cy="94" r="14"/><circle cx="118" cy="94" r="14"/></g>` +
        `<path d="M96 92 Q100 88 104 92" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>` +
        path('M52 84 C48 46 76 34 100 34 C126 34 152 46 148 84 C138 62 120 58 100 58 C80 58 62 62 52 84 Z', '#3B2A22') +
        '<g class="hand">' +
          `<path d="M152 178 L164 146" stroke="${INK}" stroke-width="31" stroke-linecap="round"/>` +
          `<path d="M152 178 L164 146" stroke="#4A86E8" stroke-width="21" stroke-linecap="round"/>` +
          `<circle cx="166" cy="134" r="14" fill="${SKIN}" stroke="${INK}" stroke-width="5"/>` +
          `<circle cx="153" cy="138" r="6" fill="${SKIN}" stroke="${INK}" stroke-width="4"/>` +
        '</g>' +
        '</g>' + fx('sparkle');
    },
    brother() {
      const freckles = [[-26, 14], [-31, 20], [-22, 21], [26, 14], [31, 20], [22, 21]]
        .map(p => `<circle cx="${100 + p[0]}" cy="${92 + p[1] + 2}" r="1.7" fill="${INK}" opacity=".45"/>`).join('');
      return '<g class="fig fig-brother">' +
        NECK +
        path('M38 200 C38 170 62 154 100 154 C138 154 162 170 162 200 Z', '#3DB97A') +
        '<path d="M40 182 C70 176 130 176 160 182 L161 191 C130 185 70 185 39 191 Z" fill="#FFFFFF" opacity=".9"/>' +
        path('M85 155 Q100 172 115 155', 'none', 4) +
        ear(51, 96, 9) + ear(149, 96, 9) +
        head(92, 50) + face(92, KID) + freckles +
        path('M50 86 C46 52 66 36 100 36 C134 36 154 52 150 86 L140 66 L130 78 L118 56 L106 74 L92 54 L80 74 L68 60 Z', '#7A4A2B') +
        '</g>' + fx('star');
    },
    sister() {
      return '<g class="fig fig-sister">' +
        '<g class="tail tl"><ellipse cx="38" cy="108" rx="17" ry="30" transform="rotate(10 38 108)" fill="#9A5A33" stroke="' + INK + '" stroke-width="5"/></g>' +
        '<g class="tail tr"><ellipse cx="162" cy="108" rx="17" ry="30" transform="rotate(-10 162 108)" fill="#9A5A33" stroke="' + INK + '" stroke-width="5"/></g>' +
        NECK +
        path('M36 200 C36 168 62 152 100 152 C138 152 164 168 164 200 Z', '#FF8FB3') +
        path('M78 152 Q100 174 122 152 L129 161 Q100 188 71 161 Z', '#FFFFFF', 4) +
        `<g transform="translate(100 182) scale(.9)">${GLYPH.heart}</g>` +
        ear(51, 98, 9) + ear(149, 98, 9) +
        head(94, 50) + face(94, KID) +
        path('M50 92 C46 52 74 36 100 36 C126 36 154 52 150 92 C136 64 118 56 100 58 C82 56 64 64 50 92 Z', '#9A5A33') +
        `<circle cx="52" cy="76" r="7.5" fill="#FF5C7A" stroke="${INK}" stroke-width="3"/><circle cx="148" cy="76" r="7.5" fill="#FF5C7A" stroke="${INK}" stroke-width="3"/>` +
        '</g>' + fx('sparkle');
    },
    baby() {
      return '<g class="fig fig-baby">' +
        NECK_BABY +
        path('M48 204 C48 178 72 166 100 166 C128 166 152 178 152 204 Z', '#FFD23F') +
        `<circle cx="88" cy="190" r="3.4" fill="#fff" stroke="${INK}" stroke-width="2"/><circle cx="100" cy="190" r="3.4" fill="#fff" stroke="${INK}" stroke-width="2"/><circle cx="112" cy="190" r="3.4" fill="#fff" stroke="${INK}" stroke-width="2"/>` +
        ear(45, 102, 9) + ear(155, 102, 9) +
        head(98, 56) + face(98, BABY) +
        `<path d="M97 46 C90 28 113 22 113 35 C113 44 102 44 102 38" fill="none" stroke="${INK}" stroke-width="10" stroke-linecap="round"/>` +
        '<path d="M97 46 C90 28 113 22 113 35 C113 44 102 44 102 38" fill="none" stroke="#8A5A3A" stroke-width="5" stroke-linecap="round"/>' +
        '</g>' + fx('bubble');
    }
  };

  /* ---------- Activity pictures ---------- */
  const SHADOW = '<ellipse class="shadowb" cx="100" cy="184" rx="46" ry="7" fill="#1B365D" opacity=".18"/>';
  const band = (d, c) => `<path d="${d}" fill="none" stroke="${INK}" stroke-width="14" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${c}" stroke-width="8" stroke-linecap="round"/>`;

  const ITEM = {
    volleyball() {
      return SHADOW + '<g class="bounce"><circle cx="100" cy="100" r="70" fill="#FFFFFF" stroke="' + INK + '" stroke-width="5"/>' +
        band('M52 64 C80 86 120 86 148 64', '#3E9BFF') +
        band('M100 38 C84 76 92 116 124 154', '#FFC93C') +
        band('M42 112 C68 104 96 120 108 156', '#3E9BFF') + '</g>' + fx('star');
    },
    basketball() {
      const seam = d => `<path d="${d}" fill="none" stroke="${INK}" stroke-width="4.5" stroke-linecap="round"/>`;
      return SHADOW + '<g class="bounce b2"><circle cx="100" cy="100" r="70" fill="#FF9A3C" stroke="' + INK + '" stroke-width="5"/>' +
        seam('M100 30 V170') + seam('M30 100 H170') + seam('M51 51 Q82 100 51 149') + seam('M149 51 Q118 100 149 149') +
        '</g>' + fx('star');
    },
    tennis() {
      const cx = 92, cy = 82, rx = 38, ry = 48;
      let strings = '';
      [-24, -12, 0, 12, 24].forEach(dx => {
        const h = ry * 0.92 * Math.sqrt(1 - Math.pow(dx / rx, 2));
        strings += `<line x1="${cx + dx}" y1="${(cy - h).toFixed(1)}" x2="${cx + dx}" y2="${(cy + h).toFixed(1)}"/>`;
      });
      [-30, -15, 0, 15, 30].forEach(dy => {
        const h = rx * 0.92 * Math.sqrt(1 - Math.pow(dy / ry, 2));
        strings += `<line x1="${(cx - h).toFixed(1)}" y1="${cy + dy}" x2="${(cx + h).toFixed(1)}" y2="${cy + dy}"/>`;
      });
      return '<g class="swing"><g transform="rotate(-30 92 82)">' +
        `<rect x="85" y="124" width="14" height="54" rx="6" fill="#3E9BFF" stroke="${INK}" stroke-width="4.5"/>` +
        `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#F4FFD8" fill-opacity=".75"/>` +
        `<g stroke="${INK}" stroke-width="2" opacity=".55">${strings}</g>` +
        `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="${INK}" stroke-width="12"/>` +
        `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="#FF7A5C" stroke-width="6"/>` +
        '</g></g>' +
        '<g class="bounce b2"><circle cx="50" cy="152" r="22" fill="#D8F24A" stroke="' + INK + '" stroke-width="4.5"/>' +
        '<path d="M36 139 Q50 152 36 165" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round"/>' +
        '<path d="M64 139 Q50 152 64 165" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round"/></g>' +
        fx('star', [[168, 56, 1], [30, 70, 1], [110, 14, 1]]);
    },
    piano() {
      const x0 = 38, kw = 124 / 6;
      let keys = '', blacks = '';
      for (let i = 0; i < 6; i++) {
        keys += `<rect class="pk" style="--i:${i}" x="${(x0 + i * kw).toFixed(1)}" y="66" width="${kw.toFixed(1)}" height="80" rx="4" fill="#fff" stroke="${INK}" stroke-width="3"/>`;
      }
      [1, 2, 4, 5].forEach((i, n) => {
        blacks += `<rect class="pk" style="--i:${n + 1}" x="${(x0 + i * kw - 7).toFixed(1)}" y="66" width="14" height="48" rx="3" fill="${INK}"/>`;
      });
      return `<rect x="46" y="150" width="14" height="28" rx="4" fill="#5B6182" stroke="${INK}" stroke-width="4"/>` +
        `<rect x="140" y="150" width="14" height="28" rx="4" fill="#5B6182" stroke="${INK}" stroke-width="4"/>` +
        `<rect x="28" y="48" width="144" height="106" rx="14" fill="#4A5078" stroke="${INK}" stroke-width="5"/>` +
        '<rect x="40" y="53" width="120" height="7" rx="3.5" fill="#FFC93C"/>' +
        keys + blacks + fx('note', [[22, 38, 1], [180, 50, 1], [100, 16, 1]]);
    },
    guitar() {
      return '<g class="strum"><g transform="rotate(28 100 100)">' +
        `<rect x="93" y="26" width="14" height="90" fill="#7A4A2B" stroke="${INK}" stroke-width="4"/>` +
        `<rect x="89" y="6" width="22" height="24" rx="5" fill="#5A3826" stroke="${INK}" stroke-width="4"/>` +
        '<circle cx="85" cy="13" r="3.2" fill="#FFC93C"/><circle cx="115" cy="13" r="3.2" fill="#FFC93C"/><circle cx="85" cy="23" r="3.2" fill="#FFC93C"/><circle cx="115" cy="23" r="3.2" fill="#FFC93C"/>' +
        `<ellipse cx="100" cy="146" rx="46" ry="38" fill="${INK}" stroke="${INK}" stroke-width="10"/>` +
        `<ellipse cx="100" cy="108" rx="33" ry="28" fill="${INK}" stroke="${INK}" stroke-width="10"/>` +
        '<ellipse cx="100" cy="146" rx="46" ry="38" fill="#E8A04C"/>' +
        '<ellipse cx="100" cy="108" rx="33" ry="28" fill="#E8A04C"/>' +
        `<circle cx="100" cy="130" r="13" fill="#5A3826" stroke="${INK}" stroke-width="4"/>` +
        `<rect x="84" y="158" width="32" height="8" rx="3" fill="#5A3826" stroke="${INK}" stroke-width="3"/>` +
        '<g stroke="#FFFFFF" stroke-width="1.6" opacity=".9"><line x1="97" y1="30" x2="97" y2="160"/><line x1="100" y1="30" x2="100" y2="160"/><line x1="103" y1="30" x2="103" y2="160"/></g>' +
        '</g></g>' + fx('note', [[28, 60, 1], [176, 90, 1], [60, 16, 1]]);
    },
    sleeping() {
      return `<rect x="20" y="148" width="160" height="22" rx="8" fill="#B07A4F" stroke="${INK}" stroke-width="5"/>` +
        `<rect x="26" y="168" width="12" height="16" rx="3" fill="#B07A4F" stroke="${INK}" stroke-width="4"/><rect x="162" y="168" width="12" height="16" rx="3" fill="#B07A4F" stroke="${INK}" stroke-width="4"/>` +
        `<ellipse cx="60" cy="126" rx="44" ry="22" fill="#FFFFFF" stroke="${INK}" stroke-width="5"/>` +
        `<circle cx="62" cy="102" r="30" fill="${SKIN}" stroke="${INK}" stroke-width="5"/>` +
        '<path d="M32 98 C30 68 94 64 92 98 C84 84 72 80 62 80 C52 80 40 86 32 98 Z" fill="#5A3826" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"/>' +
        `<path d="M46 100 Q52 106 58 100 M66 100 Q72 106 78 100" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>` +
        `<path d="M56 114 Q62 119 68 114" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>` +
        '<circle cx="45" cy="110" r="5" fill="#FF8FA3" opacity=".6"/><circle cx="79" cy="110" r="5" fill="#FF8FA3" opacity=".6"/>' +
        '<g class="breathe">' +
        `<rect x="86" y="108" width="88" height="48" rx="16" fill="#6EA8FF" stroke="${INK}" stroke-width="5"/>` +
        '<circle cx="110" cy="126" r="4.5" fill="#fff"/><circle cx="134" cy="136" r="4.5" fill="#fff"/><circle cx="154" cy="122" r="4.5" fill="#fff"/>' +
        '</g>' + fx('zed', [[118, 78, 1], [140, 52, 1.25], [162, 24, 1.5]]);
    },
    eating() {
      return `<path d="M38 104 H162 C162 148 136 170 100 170 C64 170 38 148 38 104 Z" fill="#FF8A5B" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>` +
        `<ellipse cx="100" cy="104" rx="62" ry="14" fill="#FFE3A8" stroke="${INK}" stroke-width="5"/>` +
        `<g fill="#FF8A5B" stroke="${INK}" stroke-width="2"><circle cx="78" cy="102" r="5"/><circle cx="96" cy="107" r="5"/><circle cx="114" cy="101" r="5"/><circle cx="130" cy="106" r="4.5"/></g>` +
        `<g transform="translate(100 140) scale(.85)">${GLYPH.heart}</g>` +
        '<g class="spoon">' +
        `<path d="M158 36 L128 88" stroke="${INK}" stroke-width="12" stroke-linecap="round"/><path d="M158 36 L128 88" stroke="#CFD8E3" stroke-width="6" stroke-linecap="round"/>` +
        `<ellipse cx="122" cy="98" rx="15" ry="10" transform="rotate(-30 122 98)" fill="#CFD8E3" stroke="${INK}" stroke-width="4.5"/>` +
        '</g>' + fx('steam', [[72, 78, 1], [100, 70, 1], [126, 80, 1]]);
    }
  };

  const svgWrap = (inner, label) => '<svg class="art" viewBox="0 0 200 200" ' + (label ? 'role="img" aria-label="' + label + '"' : 'aria-hidden="true"') + ' focusable="false">' + inner + '</svg>';
  const charSvg = id => svgWrap(CHAR[id]());
  const itemSvg = id => svgWrap(ITEM[id]());

  function heroSvg() {
    const order = ['brother', 'mother', 'baby', 'father', 'sister'];
    const itemOf = { brother: 'guitar', mother: 'volleyball', baby: 'sleeping', father: 'piano', sister: 'tennis' };
    let s = '<svg class="art" viewBox="0 0 360 172" aria-hidden="true" focusable="false">';
    order.forEach((id, i) => {
      const x = i * 64;
      s += `<g transform="translate(${x + 22} 0) scale(.3)">${ITEM[itemOf[id]]()}</g>`;
      s += `<g transform="translate(${x} ${i === 2 ? 68 : 62}) scale(.52)">${CHAR[id]()}</g>`;
    });
    return s + '</svg>';
  }

  const ICON = {
    speaker: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 9a4 4 0 010 6M18.5 6.5a8 8 0 010 11"/></svg>',
    muted: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M17 9l5 6M22 9l-5 6"/></svg>'
  };
  const STAR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9z"/></svg>';

  /* ---------- Sound effects (made in the browser, no files) ---------- */
  let ctx = null, master = null, noiseBuf = null, muted = false;
  function ensureAudio() {
    if (muted) return null;
    try {
      if (!ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return null;
        ctx = new AC();
        master = ctx.createGain();
        master.gain.value = 0.85;
        master.connect(ctx.destination);
        const len = ctx.sampleRate;
        noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
        const d = noiseBuf.getChannelData(0);
        for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
      }
      if (ctx.state === 'suspended') ctx.resume();
      return ctx;
    } catch (e) { return null; }
  }
  function tone(freq, t0, dur, o) {
    o = o || {};
    const osc = ctx.createOscillator(), g = ctx.createGain(), peak = o.gain || 0.2, att = o.attack || 0.01;
    osc.type = o.type || 'sine';
    osc.frequency.setValueAtTime(freq, t0);
    if (o.slideTo) osc.frequency.exponentialRampToValueAtTime(o.slideTo, t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.linearRampToValueAtTime(peak, t0 + att);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g); g.connect(master);
    osc.start(t0); osc.stop(t0 + dur + 0.05);
  }
  function crunch(t0, dur, f, gain) {
    const src = ctx.createBufferSource(), fl = ctx.createBiquadFilter(), g = ctx.createGain();
    src.buffer = noiseBuf; src.loop = true;
    fl.type = 'bandpass'; fl.frequency.value = f; fl.Q.value = 1.4;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.linearRampToValueAtTime(gain, t0 + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    src.connect(fl); fl.connect(g); g.connect(master);
    src.start(t0); src.stop(t0 + dur + 0.05);
  }
  const SFX = {
    volleyball(t) { [0, 0.3, 0.56].forEach((d, i) => tone(240, t + d, 0.16, { gain: 0.34 - i * 0.07, slideTo: 100 })); },
    basketball(t) { [0, 0.2, 0.38, 0.54, 0.68].forEach((d, i) => tone(170, t + d, 0.12, { gain: 0.4 - i * 0.05, slideTo: 70 })); },
    tennis(t) { [0, 0.45, 0.8].forEach(d => { tone(950, t + d, 0.09, { type: 'triangle', gain: 0.3, slideTo: 520 }); tone(1900, t + d, 0.05, { gain: 0.08 }); }); },
    piano(t) { [261.63, 329.63, 392, 523.25].forEach((f, i) => { tone(f, t + i * 0.14, 1, { type: 'triangle', gain: 0.22 }); tone(f * 2, t + i * 0.14, 0.7, { gain: 0.05 }); }); },
    guitar(t) { [196, 246.94, 293.66, 392, 493.88].forEach((f, i) => { tone(f, t + i * 0.05, 1.2, { type: 'triangle', gain: 0.16 }); tone(f * 2, t + i * 0.05, 0.6, { gain: 0.04 }); }); },
    sleeping(t) { [523.25, 440, 349.23].forEach((f, i) => tone(f, t + i * 0.45, 1.1, { gain: 0.16, attack: 0.1 })); },
    eating(t) { [0, 0.22, 0.44].forEach(d => crunch(t + d, 0.1, 1300, 0.7)); tone(420, t + 0.7, 0.3, { gain: 0.14, slideTo: 640 }); }
  };
  function ding(t) { tone(880, t, 0.25, { type: 'triangle', gain: 0.22 }); tone(1318.5, t + 0.12, 0.4, { type: 'triangle', gain: 0.22 }); }

  /* ---------- Voice: recorded clips, kid or teacher ---------- */
  const clips = {};
  let voiceTimer = null, voiceToken = 0, voiceNow = null, voiceSet = 'kid';
  const CLIP_KEYS = ['who-likes-what', 'family-likes', 'try-again', 'not-quite'];
  PRAISE.forEach(p => CLIP_KEYS.push(p.key));
  FAMILY.forEach(f => CLIP_KEYS.push('like-' + f.id, 'cheer-' + f.id, 'ask-' + f.id));
  ACTS.forEach(a => CLIP_KEYS.push('act-' + a));
  try { const vs = localStorage.getItem('fl-voice'); if (vs === 'kid' || vs === 'teacher') voiceSet = vs; } catch (e) {}

  function clipSrc(key) {
    return (window.VOICE_DATA && window.VOICE_DATA[voiceSet + '/' + key]) || ('audio/' + voiceSet + '-' + key + '.mp3');
  }
  function getClip(key) {
    const ck = voiceSet + '/' + key;
    if (!clips[ck]) {
      try { clips[ck] = new Audio(clipSrc(key)); clips[ck].preload = 'auto'; } catch (e) { return null; }
    }
    return clips[ck];
  }
  function stopSpeech() {
    clearTimeout(voiceTimer);
    voiceToken++;
    if (voiceNow) { try { voiceNow.pause(); voiceNow.currentTime = 0; } catch (e) {} voiceNow = null; }
  }
  function playSeq(keys, token) {
    if (token !== voiceToken || !keys.length) return;
    const a = getClip(keys.shift());
    if (!a) return;
    voiceNow = a;
    a.onended = function () { setTimeout(function () { playSeq(keys, token); }, 160); };
    try { a.currentTime = 0; } catch (e) {}
    const pr = a.play();
    if (pr && pr.catch) pr.catch(function () {});
  }
  function say(keys, delay) {
    if (muted) return;
    stopSpeech();
    const token = voiceToken;
    voiceTimer = setTimeout(function () { playSeq(keys.slice(), token); }, 60 + (delay || 0));
  }

  function itemSound(id) {
    const c = ensureAudio();
    if (c && SFX[id]) SFX[id](c.currentTime + 0.05);
  }
  function fanfare() {
    const c = ensureAudio();
    if (c) { const t = c.currentTime + 0.05; [523.25, 659.25, 783.99, 1046.5, 783.99, 1046.5].forEach((f, i) => tone(f, t + i * 0.13, 0.4, { type: 'triangle', gain: 0.2 })); }
  }

  /* ---------- App ---------- */
  const $ = id => document.getElementById(id);
  const SCREENS = ['home', 'learn1', 'learn2', 'intro', 'play', 'done'];
  const state = { idx: 0, done: 0, locked: false, current: null };
  let rowTimer = null, heroTimer = null;

  function shuffle(a) {
    a = a.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function show(name) {
    SCREENS.forEach(s => { $(s).hidden = (s !== name); });
    $('backBtn').hidden = (name === 'home');
    try { window.scrollTo(0, 0); } catch (e) {}
  }
  function setMuteIcon() {
    $('muteBtn').innerHTML = muted ? ICON.muted : ICON.speaker;
    $('muteBtn').setAttribute('aria-pressed', muted ? 'true' : 'false');
    $('muteBtn').setAttribute('aria-label', muted ? 'Sound off' : 'Sound on');
  }
  function setVoiceLabel() {
    const kid = voiceSet === 'kid';
    $('voiceBtn').textContent = kid ? 'Kid voice' : 'Teacher voice';
    $('voiceBtn').setAttribute('aria-label', (kid ? 'Kid voice' : 'Teacher voice') + '. Tap to change the voice.');
  }

  function rowsHtml() {
    return FAMILY.map(f =>
      `<button class="row" data-action="row" data-id="${f.id}" aria-label="${f.pre}${f.word}.">` +
      `<span class="rc">${charSvg(f.id)}</span>` +
      `<span class="sent">${f.pre}<span class="act">${f.word}</span>.</span>` +
      `<span class="rc">${itemSvg(f.item)}</span></button>`
    ).join('');
  }
  function openLearn1() { $('rowsLearn').innerHTML = rowsHtml(); show('learn1'); say(['who-likes-what'], 200); }
  function openLearn2() {
    $('lgrid').innerHTML = ACTS.map(a =>
      `<button class="lcard" data-action="actcard" data-id="${a}" aria-label="${ACTNAME[a]}">${itemSvg(a)}<span class="word">${ACTNAME[a]}</span></button>`
    ).join('');
    show('learn2');
  }
  function openIntro() { $('rowsIntro').innerHTML = rowsHtml(); show('intro'); say(['who-likes-what'], 200); }

  function renderProgress() {
    let h = '';
    for (let i = 0; i < FAMILY.length; i++) {
      h += `<span class="pstar${i < state.done ? ' on' : ''}${i === state.idx ? ' cur' : ''}">${STAR}</span>`;
    }
    $('progress').innerHTML = h;
    $('progress').setAttribute('aria-label', 'Question ' + (state.idx + 1) + ' of ' + FAMILY.length);
  }

  function renderQuestion() {
    const f = FAMILY[state.idx];
    state.current = f; state.locked = false;
    $('nextBtn').hidden = true;
    const opts = shuffle([f.item, f.wrong]);
    $('qcard').innerHTML =
      `<div class="qhead"><p class="prompt" role="status">What does ${f.name} like to do?</p>` +
      `<button class="icon-btn" data-action="sayq" aria-label="Hear the question">${ICON.speaker}</button></div>` +
      `<div class="stage">${charSvg(f.id)}</div>` +
      '<div class="pgrid">' + opts.map(o =>
        `<button class="pcard" data-action="choice" data-id="${o}" aria-label="${ACTNAME[o]}">${itemSvg(o)}<span class="plabel">${ACTNAME[o]}</span></button>`
      ).join('') + '</div>';
    renderProgress();
    show('play');
    say(['ask-' + f.id], 250);
  }

  function winHtml(f, praise) {
    const colors = ['#FFC93C', '#3DB97A', '#FF8A5B', '#3E9BFF'];
    let sparks = '';
    for (let n = 0; n < 12; n++) {
      sparks += `<i class="spark" style="--n:${n};--a:${n * 30}deg;--d:${110 + (n % 3) * 22}px;--c:${colors[n % 4]}"></i>`;
    }
    return `<p class="prompt good" role="status">${praise.text}</p>` +
      `<div class="win go" style="--tint:${f.tint}">${sparks}` +
      `<div class="pair"><div class="pa">${charSvg(f.id)}</div><div class="pa">${itemSvg(f.item)}</div></div>` +
      `<p class="sentence">${f.pre}<span class="act">${f.word}</span>!</p></div>`;
  }

  function answer(id, btn) {
    if (state.locked) return;
    const f = state.current;
    if (id === f.item) {
      state.locked = true; state.done++;
      const praise = pick(PRAISE);
      $('qcard').innerHTML = winHtml(f, praise);
      renderProgress();
      $('nextBtn').textContent = (state.idx === FAMILY.length - 1) ? 'Finish' : 'Next';
      $('nextBtn').hidden = false;
      const c = ensureAudio();
      if (c) { const t = c.currentTime + 0.05; ding(t); }
      say(['act-' + id, praise.key, 'cheer-' + f.id], 250);
      setTimeout(function () { try { $('nextBtn').focus({ preventScroll: true }); } catch (e) {} }, 400);
    } else {
      btn.classList.add('nope'); btn.disabled = true;
      const w = pick(WRONG), pr = $('qcard').querySelector('.prompt');
      if (pr) { pr.textContent = w.text; pr.classList.add('oops'); }
      const c = ensureAudio();
      if (c) tone(330, c.currentTime + 0.02, 0.22, { gain: 0.2, slideTo: 230 });
      say(['act-' + id, w.key], 200);
    }
  }

  function finish() {
    let s = '', g = '';
    for (let i = 0; i < FAMILY.length; i++) s += `<span style="--i:${i}">${STAR}</span>`;
    $('fstars').innerHTML = s;
    $('doneTag').textContent = 'You know what the family likes!';
    FAMILY.forEach(f => {
      g += `<div class="fcell"><div class="pair"><div class="pa">${charSvg(f.id)}</div><div class="pa">${itemSvg(f.item)}</div></div>${f.name}</div>`;
    });
    $('fgrid').innerHTML = g;
    show('done');
    fanfare();
    say(['great-job'], 200);
  }

  function startQuiz() { state.idx = 0; state.done = 0; renderQuestion(); }
  function goHome() { stopSpeech(); clearTimeout(rowTimer); show('home'); }

  document.addEventListener('click', function (e) {
    const el = e.target.closest('[data-action]');
    if (!el) return;
    const a = el.getAttribute('data-action'), id = el.getAttribute('data-id');
    if (a === 'play') openIntro();
    else if (a === 'start') startQuiz();
    else if (a === 'learn') openLearn1();
    else if (a === 'learn2') openLearn2();
    else if (a === 'home') goHome();
    else if (a === 'next') { state.idx++; if (state.idx >= FAMILY.length) finish(); else renderQuestion(); }
    else if (a === 'sayq') say(['ask-' + state.current.id]);
    else if (a === 'choice') answer(id, el);
    else if (a === 'mute') { muted = !muted; if (muted) stopSpeech(); setMuteIcon(); }
    else if (a === 'voice') {
      voiceSet = voiceSet === 'kid' ? 'teacher' : 'kid';
      try { localStorage.setItem('fl-voice', voiceSet); } catch (e) {}
      setVoiceLabel();
      CLIP_KEYS.forEach(getClip);
      say(['family-likes']);
    }
    else if (a === 'row') {
      document.querySelectorAll('.row.go').forEach(r => r.classList.remove('go'));
      el.classList.add('go');
      itemSound(byId[id].item);
      say(['like-' + id], 450);
      clearTimeout(rowTimer);
      rowTimer = setTimeout(function () { el.classList.remove('go'); }, 3600);
    }
    else if (a === 'actcard') {
      document.querySelectorAll('.lcard.go').forEach(c => c.classList.remove('go'));
      el.classList.add('go');
      itemSound(id);
      say(['act-' + id], 450);
      clearTimeout(rowTimer);
      rowTimer = setTimeout(function () { el.classList.remove('go'); }, 3200);
    }
    else if (a === 'hero') {
      el.classList.add('go');
      fanfare();
      say(['family-likes'], 200);
      clearTimeout(heroTimer);
      heroTimer = setTimeout(function () { el.classList.remove('go'); }, 3200);
    }
  });

  setMuteIcon();
  setVoiceLabel();
  $('hero').innerHTML = heroSvg();
  CLIP_KEYS.forEach(getClip);
})();
