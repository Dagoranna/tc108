import type { MyMainState } from "../store/slices/mainSlice";
import { loadState } from "../store/slices/mainSlice";
import type { AppDispatch } from "../store/store";
import * as actions from "../store/slices/mainSlice";

export function downloadJson(data: MyMainState, filename = "tc108.json") {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}

export async function uploadJsonFileAndDispatch(
  file: File,
  dispatch: AppDispatch
) {
  const text = await file.text();
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error("Invalid JSON file");
  }

  // Basic structural guard: ensure an object with expected top-level keys
  if (
    typeof parsed !== "object" ||
    parsed === null ||
    !("section_1" in (parsed as Record<string, unknown>)) ||
    !("section_10" in (parsed as Record<string, unknown>))
  ) {
    throw new Error("JSON does not match expected schema");
  }

  dispatch(loadState(parsed as MyMainState));
}

export function handleInput(
  e: React.ChangeEvent<HTMLInputElement>,
  dispatch: AppDispatch
) {
  const value = e.currentTarget.value;

  dispatch(
    actions.setTextField({
      path: e.currentTarget.id,
      value: value,
    })
  );
}

export function handleError(value: string, regex: RegExp) {
  return !regex.test(value);
}
