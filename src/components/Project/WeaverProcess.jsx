import './WeaverProcess.css';

const media = '/media/weaver-process/';
const sketches = [
  ['sketch-layout.jpeg', '초기 레이아웃과 움직임 구상', '뜨개 패턴, 교차하는 바늘, 프로젝트 영역을 손으로 그려 구성했습니다. 바늘의 움직임도 스케치에 기록했습니다.'],
  ['sketch-footer.jpeg', 'Contact와 기술 스택 구상', 'Contact와 기술 스택을 배치하고, 하단 영역의 구성을 손으로 정리했습니다.'],
];
const drafts = [
  ['draft-one.png', '시안 1 · Knitting', '짙은 파란 면과 실 선으로 섹션을 연결하고, 하단에는 옷 형태로 기술 영역을 표현한 시안입니다.'],
  ['draft-two.png', '시안 2 · The Weaver', '밝은 배경 위에 바늘·실타래·옷 그래픽과 프로젝트 카드를 배치한 시안입니다. 두 시안의 좋은 요소를 취하되, 가장 깔끔하고 복잡하지 않은 방향을 최종 기준으로 삼았습니다.'],
];

export default function WeaverProcess({ onZoom }) {
  function gallery(items, className) {
    return <div className={`weaver-process-grid ${className}`}>
      {items.map(([file, title, caption]) => <figure key={file}>
        <button type="button" onClick={() => onZoom(media + file)} aria-label={`${title} 크게 보기`}>
          <img src={media + file} alt={title} loading="lazy" />
        </button>
        <figcaption><h3>{title}</h3><p>{caption}</p></figcaption>
      </figure>)}
    </div>;
  }
  return <section className="weaver-process" aria-labelledby="weaver-process-title">
    <p className="weaver-process-kicker">FROM SKETCH TO CODE</p>
    <h2 id="weaver-process-title">직접 구상하고, 화면과 코드로 연결하기</h2>
    <div className="weaver-authorship">
      <p><strong>직접 설계한 범위</strong><br />브랜딩·콘셉트·전체 구조와 정보 구성, 손스케치, 두 가지 SVG 디자인 시안.</p>
      <p><strong>AI를 활용한 범위</strong><br />사이트 구현을 위한 코드 작성 보조. 브랜딩과 전체 디자인 콘셉트는 제가 결정했습니다.</p>
    </div>
    <h3 className="weaver-stage">01 · 손으로 정리한 화면 구조</h3>
    {gallery(sketches, 'weaver-sketches')}
    <h3 className="weaver-stage">02 · 직접 제작한 두 가지 SVG 시안</h3>
    <p>아래는 Inkscape 원본의 두 화면 시안입니다. 이미지를 누르면 전체 구성을 확대해서 볼 수 있습니다.</p>
    {gallery(drafts, 'weaver-drafts')}
    <div className="weaver-selection">
      <h3>시안 선택 기준</h3>
      <p>시안 2의 단정한 구조를 기준으로 삼고, 두 시안에서 효과적인 요소를 골라 현재 화면에 반영했습니다. 결과물이 복잡해지지 않으면서도 프로젝트와 기술 정보를 읽기 쉽게 두는 것을 우선했습니다.</p>
    </div>
    <section className="weaver-motion-process" aria-labelledby="weaver-motion-title">
      <h3 className="weaver-stage" id="weaver-motion-title">03 · 인터랙션 설계 — 생각이 결과물이 되는 과정</h3>
      <p>문장을 생각의 재료로 보고, 글자가 실처럼 모여 옷이라는 결과물로 이어지는 스크롤 흐름을 구상했습니다. 뜨개질의 과정을 통해 아이디어가 프로젝트로 완성되는 과정을 표현하고자 했습니다.</p>
      <p className="weaver-scope-note">아래는 시안과 작업 기록을 바탕으로 정리한 연출 의도와 구현 내용입니다. 당시 대화의 직접 인용문은 아닙니다.</p>
      <ol className="weaver-motion-steps">
        <li><strong>문장 → 재료</strong><p>영어와 한글 문장이 각각 등장한 뒤, 글자들이 실 조각처럼 흩어져 같은 흐름으로 모이도록 구상했습니다.</p></li>
        <li><strong>축적 → 실타래</strong><p>실타래가 갑자기 생기는 대신, 앞서 이동한 재료가 모여 있었음을 발견하는 장면을 의도했습니다.</p></li>
        <li><strong>실타래 → 옷</strong><p>실을 엮은 결과가 옷이 되듯, 흩어진 생각이 하나의 형태로 완성되는 과정을 연결했습니다.</p></li>
        <li><strong>옷 → 프로젝트</strong><p>옷을 완성된 작업의 은유로 사용하고, 이어지는 프로젝트 목록에서 실제 결과물을 보여주도록 구성했습니다.</p></li>
      </ol>
      <div className="weaver-process-grid weaver-code-scope">
        <article><h4>현재 코드에 반영한 동작</h4><p>영어·한글을 글자 단위로 분리해 위치와 투명도를 스크롤에 연결했습니다. 이어서 실타래 SVG의 크기·회전·투명도를 바꾸고, 바지·티셔츠·양말을 순차적으로 나타나게 했습니다. 모바일에서는 글자가 흩어지는 거리를 줄였습니다.</p><a href="https://github.com/hoilycat/the-code-weaver-frontend/blob/ebd786b77b0ff0e26197f5332d1a62f86c7a4262/src/components/About/About.jsx" target="_blank" rel="noreferrer">인터랙션 구현 코드 보기 ↗</a></article>
        <article><h4>구상과 구현의 차이</h4><p>현재는 글자·실타래·옷을 별도 요소의 이동과 등장으로 연결합니다. 글자 모양이 실제 실로 변하거나, 실이 옷으로 연속 변형되거나, 옷이 프로젝트 카드로 변형되는 방식은 아닙니다. 프로젝트 목록은 애니메이션 다음 섹션으로 이어집니다.</p></article>
      </div>
      <p className="weaver-scope-note">연출의 방향과 화면 흐름을 정하고, 이를 구현하는 코드 작성에는 AI의 도움을 받았습니다.</p>
    </section>
    <h3 className="weaver-stage">04 · 프로젝트를 찾고 읽는 구조</h3>
    <div className="weaver-process-grid weaver-code-scope">
      <article><h3>Editorial Structure</h3><p>편집 디자인 경험을 바탕으로 프로젝트 카드와 상세 페이지를 에디토리얼 형식으로 구성했습니다. 채용담당자가 먼저 필터로 관심 영역을 좁힌 뒤, 각 프로젝트의 내용과 역할을 차례로 읽는 흐름을 의도했습니다.</p></article>
      <article><h3>Color Direction</h3><p>‘엮는다’는 콘셉트에서 뜨개질의 질감을 출발점으로 삼고, 좋아하는 파란색을 아이보리와 조합해 편집물처럼 차분한 인상을 만들었습니다. 초기에는 빨강·초록도 검토했지만, 현재의 파랑·아이보리 방향을 선택했습니다.</p></article>
    </div>
    <h3 className="weaver-stage">05 · 프론트엔드와 백엔드 구현</h3>
    <div className="weaver-process-grid weaver-code-scope">
      <article><h3>Frontend</h3><p>React 화면과 React Router의 목록·상세·관리 경로를 구성했습니다. 바늘·실타래 그래픽은 스크롤 인터랙션으로 연결하고, 프로젝트 데이터는 API 응답과 로컬 콘텐츠를 병합해 표시합니다.</p><a href="https://github.com/hoilycat/the-code-weaver-frontend" target="_blank" rel="noreferrer">프론트엔드 코드 보기 ↗</a></article>
      <article><h3>Backend</h3><p>Spring Boot와 JPA로 프로젝트 CRUD API를 구성했습니다. 다중 이미지 업로드 API는 스토리지에 파일을 저장하고 URL을 반환합니다. 관리자 로그인은 간이 구현으로, 서버 측 인증·인가 보완은 남아 있습니다.</p><a href="https://github.com/hoilycat/the-code-weaver-backend" target="_blank" rel="noreferrer">백엔드 코드 보기 ↗</a></article>
    </div>
    <p className="weaver-scope-note">이 제작 범위는 The Weaver 사이트에 한정됩니다. 다른 프로젝트의 UI/UX·개발 기여 범위는 각 프로젝트 상세의 역할 설명을 따릅니다.</p>
  </section>;
}
