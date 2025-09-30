import { useState } from "react";

export default function ErrorField({ title }: { title: string }) {
  const [show, setShow] = useState(false);

  return (
    <>
      <div
        className="errorField"
        title={title}
        onClick={() => setShow(!show)}
        onBlur={() => setShow(false)}
      >
        !
      </div>
      <div className="relative">
        {show && <div className="mobileHint">{title}</div>}
      </div>
    </>
  );
}
