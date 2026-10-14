// 메인 화면에서 프로젝트 상세로 떠날 때의 스크롤 위치를 저장하는 키
const MAIN_SCROLL_KEY = "weaver:mainScrollY";

// 카드를 클릭하는 순간 호출: "지금 이 자리로 돌아오게 해줘"라는 책갈피
export const saveMainScroll = () => {
  try {
    sessionStorage.setItem(MAIN_SCROLL_KEY, String(Math.round(window.scrollY)));
  } catch {
    // 시크릿 창 등에서 저장소를 못 쓰면 해시(#Projects) 위치로 돌아감
  }
};

// 책갈피는 한 번 쓰면 버린다 (나중에 엉뚱한 때 다시 쓰이지 않도록)
export const takeSavedScroll = () => {
  try {
    const raw = sessionStorage.getItem(MAIN_SCROLL_KEY);
    sessionStorage.removeItem(MAIN_SCROLL_KEY);
    if (raw === null) return null;
    const y = Number(raw);
    return Number.isFinite(y) ? y : null;
  } catch {
    return null;
  }
};
