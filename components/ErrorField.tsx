import { useState } from "react";

export default function ErrorField({ title }: { title: string }) {
  const [show, setShow] = useState(false);

  return (
    <div
      className="errorField"
      title={title}
      tabIndex={0}
      onClick={() => setShow(!show)}
      onBlur={() => setShow(false)}
    >
      !{show && <div className="mobileHint">{title}</div>}
    </div>
  );
}
