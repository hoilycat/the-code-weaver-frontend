import { useEffect, useRef } from 'react';

export default function WeaverImageDialog({ src, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, []);
  return <dialog ref={ref} className="weaver-image-dialog" aria-label="제작 과정 이미지 확대" onCancel={onClose}>
    <button type="button" onClick={onClose}>닫기 ×</button>
    <img src={src} alt="The Weaver 제작 과정 원본 확대" />
  </dialog>;
}
