import { useState } from "react";

export default function ErrorField({ title }: { title: string }) {
  const [show, setShow] = useState(false);

  return (
    <div
      className="relative inline-block"
      onClick={() => setShow(!show)}
      onBlur={() => setShow(false)}
      tabIndex={0}
    >
      <div className="errorField" title={title}>
        !
      </div>

      {show && (
        <div className="absolute bottom-full mb-1 px-2 py-1 bg-black text-white text-sm rounded">
          {title}
        </div>
      )}
    </div>
  );
}
