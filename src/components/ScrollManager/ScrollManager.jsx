import { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { saveMainScroll, takeSavedScroll } from "./scrollMemory";

const HASH_OFFSET = 24;

// index.css의 html { scroll-behavior: smooth } 때문에
// behavior: "auto"로 불러도 부드럽게 날아가 버린다.
// 잠깐 인라인으로 auto를 덮어써서 "순간이동"시키고 원래대로 돌려놓는다.
const jumpTo = (top) => {
  const html = document.documentElement;
  const previous = html.style.scrollBehavior;
  html.style.scrollBehavior = "auto";
  window.scrollTo(0, Math.max(0, top));
  html.style.scrollBehavior = previous;
};

const getHashTop = (hash) => {
  if (!hash) return null;
  const target = document.getElementById(decodeURIComponent(hash.slice(1)));
  if (!target) return null;
  return target.getBoundingClientRect().top + window.scrollY - HASH_OFFSET;
};

export default function ScrollManager() {
  const { pathname, hash } = useLocation();
  const previousPathRef = useRef(null);

  // 브라우저가 알아서 스크롤을 복원하면 React가 화면을 바꾸기 전에 엉뚱한 위치로 가 버린다.
  // 복원은 우리가 직접 하고, 새로고침에도 메인 위치가 유지되도록 떠날 때 저장해 둔다.
  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const handlePageHide = () => {
      if (window.location.pathname === "/") saveMainScroll();
    };

    window.addEventListener("pagehide", handlePageHide);
    return () => window.removeEventListener("pagehide", handlePageHide);
  }, []);

  // useLayoutEffect: 새 화면이 DOM에 들어간 직후, 사용자 눈에 보이기 "전"에 실행된다.
  useLayoutEffect(() => {
    const pathChanged = previousPathRef.current !== pathname;
    previousPathRef.current = pathname;

    // 같은 페이지 안에서 해시만 바뀐 경우(상단 메뉴, 상세 페이지 탭)는 기존 동작에 맡긴다
    if (!pathChanged) return undefined;

    // 상세 페이지 등 다른 화면으로 갈 때는 맨 위에서 시작
    if (pathname !== "/") {
      jumpTo(0);
      return undefined;
    }

    // 메인으로 돌아올 때: 저장해 둔 카드 위치 > #Projects 같은 해시 > 맨 위
    const savedY = takeSavedScroll();
    const resolveTarget = () => (savedY !== null ? savedY : getHashTop(hash));

    const firstTarget = resolveTarget();
    jumpTo(firstTarget ?? 0);
    if (firstTarget === null) return undefined;

    // 폰트가 늦게 로드되면 글자 높이가 바뀌어 위치가 몇 px 어긋날 수 있어서 한 번 보정한다.
    // 그 사이 사용자가 직접 스크롤을 시작하면 보정하지 않는다.
    let cancelled = false;
    const cancel = () => {
      cancelled = true;
    };
    const userInputEvents = ["wheel", "touchstart", "keydown", "mousedown"];
    userInputEvents.forEach((type) =>
      window.addEventListener(type, cancel, { passive: true, once: true })
    );

    const correct = () => {
      if (cancelled) return;
      const target = resolveTarget();
      if (target !== null && Math.abs(window.scrollY - target) > 2) jumpTo(target);
    };

    const frameId = requestAnimationFrame(correct);
    document.fonts?.ready.then(correct);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameId);
      userInputEvents.forEach((type) => window.removeEventListener(type, cancel));
    };
  }, [pathname, hash]);

  return null;
}
