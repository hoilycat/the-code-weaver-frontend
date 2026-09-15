import './CharacterDesign.css';

const berry = 'https://raw.githubusercontent.com/hoilycat/Focus-Mate-Berry/94a7dd8bdd42c518bcf357c52147ae5ad69e740f/berry-react/src/images/';
const coffee = 'https://raw.githubusercontent.com/hoilycat/Cof-fee-V3/230e95390444c76af103fb3d3b9fd4138385e7f1/cof-fee/src/assets/characters/';
const designs = {
  berry: {
    title: '직접 만든 요정 베리와 상태별 도트 애니메이션',
    summary: '요정 베리의 캐릭터 디자인과 상태별 도트 애니메이션을 직접 제작했습니다. 초기 성장 단계인 씨앗·새싹·작은 열매·큰 딸기는 AI 생성 이미지를 활용했습니다.',
    groups: [
      { title: '직접 제작 · 요정 베리와 상태별 애니메이션', base: berry, images: [['cheerberry.gif', '요정 베리'], ['study_berry2.gif', '공부'], ['sleepingberry.gif', '수면'], ['sickberry01.gif', '아픔'], ['turtleberry.gif', '거북목 경고']] },
      { title: 'AI 이미지 활용 · 초기 성장 단계', base: berry, images: [['seed.png', '씨앗'], ['sprout.png', '새싹'], ['small.png', '작은 열매'], ['big.png', '큰 딸기']] },
    ],
    implementation: 'React 화면에서 성장 단계와 공부·수면·경고 상태에 맞는 PNG·GIF를 선택해 표시합니다. 캐릭터 제작과 상태에 따라 이미지를 연결하는 개발 작업을 함께 담았습니다.',
    repo: 'Focus-Mate-Berry',
  },
  coffee: {
    title: '직접 그린 캐릭터 원형에서 3D 스타일로',
    summary: 'v2의 캐릭터 원형을 Inkscape로 직접 디자인했습니다. v3에서는 이 디자인을 바탕으로 Gemini를 활용해 3D 스타일 이미지를 제작했습니다. 캐릭터 원형 디자인과 AI를 활용한 표현 변환을 구분합니다.',
    groups: [
      { title: 'v2 · Inkscape로 직접 그린 원형', base: coffee, images: [['relaxbeen.png', '휴식'], ['composedbeen.png', '안정'], ['busybeen.png', '바쁨'], ['funnybeen.png', '기분 전환']] },
      { title: 'v3 · Gemini를 활용한 3D 스타일', base: coffee, images: [['zen_bean.png', '차분한 휴식'], ['hustle_bean.png', '작업 중'], ['spark_bean.png', '활력'], ['pro_bean.png', '집중'], ['coach_kong.png', 'AI 코치']] },
    ],
    implementation: '캐릭터는 장식에 그치지 않고 카페인 잔존량과 사용자 상태를 전달하는 피드백으로 사용합니다. 상태에 따라 캐릭터·배경·게이지·메시지가 함께 전환되는 흐름을 구성했습니다.',
    repo: 'Cof-fee-V3',
    brand: 'Cof/fee 로고를 직접 그리고, 앱 진입 시 로고와 캐릭터가 등장하는 스플래시 화면까지 구현했습니다. 아래 Splash Demo에서 실제 동작을 확인할 수 있습니다.',
  },
};

export default function CharacterDesign({ kind, onZoom }) {
  const design = designs[kind];
  return <section className="character-design" aria-labelledby="character-design-title">
    <header className="design-overview">
      <p className="character-design-kicker">DESIGN & IMPLEMENTATION</p>
      <h2 id="character-design-title">{kind === 'coffee' ? '사용자 상태를 읽히게 만드는 디자인' : design.title}</h2>
      {kind === 'coffee' && <p>상태 데이터의 화면 표현부터 캐릭터 원형, 로고와 컬러까지 — 직접 판단하고 구현한 범위입니다.</p>}
    </header>
    {kind === 'coffee' && <article className="design-chapter">
      <p className="design-chapter-label">01 · STATE UI</p>
      <h3 className="design-chapter-title">상태 데이터를 시각적 피드백으로 연결</h3>
      <h3>사용자 상태에 반응하는 화면</h3>
      <p>사용자 상태에 따라 화면이 달라지도록 구성했습니다. 카페인 잔존량과 개인 목표, 시간대로 상태를 계산하고 캐릭터·배경색·메시지에 연결했습니다. 게이지는 ‘현재 잔존량’과 ‘오늘 총 섭취량’ 선택에 맞춰 갱신됩니다.</p>
      <div className="coffee-state-grid">
        {[
          ['IDLE', '잔존량 0', '#F5E8D3', '비어 있는 게이지와 활기찬 캐릭터로 잔존량이 없는 상태를 보여줍니다.'],
          ['GOOD', '목표 대비 0% 초과~50%', '#10B981', '초록빛 배경과 편안한 캐릭터를 연결해 현재 상태를 숫자와 함께 읽을 수 있게 했습니다.'],
          ['WARNING', '목표 대비 50% 초과~80%', '#D97706', '호박색 배경과 달라진 캐릭터·메시지로 상태 변화를 알립니다.'],
          ['DANGER', '목표 대비 80% 초과', '#E05252', '붉은 배경과 바쁜 캐릭터로 주의를 환기하고, 시간대에 맞는 메시지를 함께 보여줍니다.'],
        ].map(([state, label, color, decision], index) => <figure key={state}>
          <button type="button" aria-label={`${state} 실제 화면 크게 보기`} onClick={() => onZoom(`/media/coffee-brand/state-${index}.png`)}>
            <img className="coffee-state-image" src={`/media/coffee-brand/state-${index}.png`} alt={`${state} 상태의 커피 대시보드`} loading="lazy" />
          </button>
          <figcaption><span className="coffee-state-dot" style={{ backgroundColor: color }} aria-hidden="true" /><strong>{state}</strong><br />{label}<span className="coffee-state-decision">{decision}</span></figcaption>
        </figure>)}
      </div>
      <p className="coffee-state-note">GitHub 상태별 시연에서 발췌한 실제 화면입니다. 위 구간은 기본 분기이며, 22시~다음 날 4시 전에는 잔존량 50mg 이상이면 WARNING, 100mg 이상이면 DANGER로 전환합니다. 앱의 UI 분기 기준이며 의학적 진단 기준은 아닙니다.</p>
      <a href="https://github.com/hoilycat/Cof-fee-V3/blob/230e95390444c76af103fb3d3b9fd4138385e7f1/cof-fee/src/pages/Dashboard/Dashboard.tsx" target="_blank" rel="noreferrer">상태별 화면 구현 코드 보기 ↗</a>

    </article>}
    <article className="design-chapter">
      <p className="design-chapter-label">{kind === 'coffee' ? '02' : '01'} · CHARACTER DESIGN</p>
      <h3 className="design-chapter-title">{design.title}</h3>
      <p className="design-chapter-lead">{design.summary}</p>
    {kind === 'coffee' && <div>
      <h3>Visual Direction · 에셋 선정과 화면 조정</h3>
      <p>서비스 톤에 맞는 외부 에셋을 직접 탐색·선정하고, 화면에 적용한 뒤 크기·배치·조화를 조정했습니다. 아래 캐릭터 원형은 직접 제작했으며, 3D 스타일 변환에는 Gemini를 활용했습니다.</p>
    </div>}
    {design.groups.map(group => <div key={group.title} className="character-design-group">
      <h3>{group.title}</h3>
      <div className="character-design-grid">
        {group.images.map(([file, label]) => <figure key={file}>
          <button type="button" aria-label={`${label} 캐릭터 크게 보기`} onClick={() => onZoom(group.base + file)}>
            <img src={group.base + file} alt={`${group.title} — ${label}`} loading="lazy" />
          </button>
          <figcaption>{label}</figcaption>
        </figure>)}
      </div>
    </div>)}
    <h3>화면 구현과의 연결</h3>
    <p>{design.implementation}</p>
    <a href={`https://github.com/hoilycat/${design.repo}#readme`} target="_blank" rel="noreferrer">GitHub 캐릭터 제작 설명 보기 ↗</a>

    </article>
    {kind === 'coffee' && <article className="design-chapter">
      <p className="design-chapter-label">03 · BRAND IDENTITY</p>
      <h3 className="design-chapter-title">이름의 의미를 로고와 컬러로 표현</h3>
    {design.brand && <div><h3>직접 제작한 로고와 스플래시 구현</h3><p>{design.brand}</p></div>}
    <div className="coffee-logo-process">
      <figure>
        <button type="button" aria-label="Cof/fee 로고 SVG 크게 보기" onClick={() => onZoom('/media/coffee-brand/logo.svg')}>
          <img src="/media/coffee-brand/logo.svg" alt="C에 슬래시와 쉼표를 결합한 Cof/fee 로고" loading="lazy" />
        </button>
        <figcaption>직접 그린 Cof/fee 최종 로고 SVG 시안</figcaption>
      </figure>
      <div>
        <h3>커피를 쉬어가며 마시자는 의미</h3>
        <p>커피의 첫 글자 C에 쉼표와 슬래시를 결합했습니다. 쉼표에는 잠시 쉬어가며 커피를 즐기자는 의미를, 슬래시에는 카페인 섭취를 줄이자는 의미를 담았습니다.</p>
        <p>쉼표와 슬래시가 함께 느낌표를 연상하도록 형태를 구성해, 머리가 산뜻해지는 느낌을 표현했습니다.</p>
        <p>직접 그린 SVG 로고를 앱의 스플래시 화면에 적용하고, 로고와 캐릭터가 등장하는 시작 화면을 구현했습니다.</p>
      </div>
    </div>
      <details className="coffee-design-exploration">
        <summary>로고 탐색 시안과 디자인 과정 보기</summary>
        <p>처음에는 ‘커피’라는 이름에서 떠오르는 고급스러운 분위기를 표현하고자 했습니다. 하지만 시안을 발전시키면서 이름에 담고 싶은 의미가 충분히 드러나지 않는다고 느꼈습니다. 이후 C·쉼표·슬래시를 각각의 요소로 나누어 살펴보고 다시 조합하며, 휴식과 카페인 조절의 의미를 담은 최종 로고로 발전시켰습니다.</p>
        <figure>
          <button type="button" aria-label="직접 그린 커피 로고 탐색 시안 크게 보기" onClick={() => onZoom('/media/coffee-brand/exploration.png')}>
            <img className="coffee-exploration-image" src="/media/coffee-brand/exploration.png" alt="C와 기호의 조합, 단색과 그라데이션을 탐색한 여러 로고 시안" loading="lazy" />
          </button>
          <figcaption>직접 그린 SVG 작업판의 탐색 시안 · 배치는 제작 순서를 뜻하지 않습니다.</figcaption>
        </figure>
      </details>
      <h3>직접 선정한 컬러 팔레트</h3>
      <p>서비스의 컬러 팔레트를 직접 선정하고 화면에 적용했습니다. 아래는 현재 대시보드에 사용한 주요 색상입니다.</p>
      <ul className="coffee-palette">
        {[['#5C3D2E', '라이트 모드 텍스트'], ['#F5E8D3', '다크 모드 텍스트'], ['#3A312B', '다크 모드 카드·게이지 배경'], ['#E57B3E', '강조색']].map(([color, label]) => <li key={color}>
          <span className="coffee-swatch" style={{ backgroundColor: color }} aria-hidden="true" />
          <span>{label}<br /><code>{color}</code></span>
        </li>)}
      </ul>

    </article>}
  </section>;
}
