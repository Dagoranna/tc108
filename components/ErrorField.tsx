import { useState } from "react";

export default function ErrorField({ title }: { title: string }) {
  const [show, setShow] = useState(false);

  return (
    <div
      className="relative"
      onClick={() => setShow(!show)}
      onBlur={() => setShow(false)}
    >
      <div className="errorField" title={title}>
        !
      </div>

      {show && <div className="mobileHint">{title}</div>}
    </div>
  );
}
