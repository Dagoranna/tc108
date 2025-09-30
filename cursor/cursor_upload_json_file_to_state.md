# Upload JSON file to state
_Exported on 9/29/2025 at 15:19:56 GMT+3 from Cursor (1.6.45)_

---

**User**

write utility to upload json file to state

---

**Cursor**

I'll scan the slice and utils files to see how state is structured and what actions exist, then add an action to load JSON and a utility that reads a file input and dispatches it.

I'll open `mainSlice.ts` and `mainUtils.tsx` to design the action shape and the utility hook/function together.

I'm going to add a new reducer action in `mainSlice.ts` to load the entire state from JSON, and then implement utilities in `app/utils/mainUtils.tsx` to parse a selected JSON file and dispatch this action with basic validation.

```typescript
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Borough = "Bronx" | "Brooklyn" | "Manhattan" | "Queens" | "Staten Island";
type ApplicantDescr = "Owner" | "Tenant" | "Condo" | "Other";
type CondoAuthority = "By-laws" | "Individual" | "Power-of-Attorney";
type HearingRequest = "Without" | "In-person" | "Telephone" | "Video";
type PropertyType =
  | "family_1"
  | "family_2"
  | "family_3"
  | "vacant"
  | "class_one_condo"
  | "other";
type Signer =
  | "Applicant"
  | "Fiduciary"
  | "Officer of a corporate Applicant"
  | "An officer of the condominium"
  | "General partner of Applicant"
  | "Member or manager of LLC Applicant"
  | "Agent for the Applicant";
type RepresentativeType = "Attorney" | "Other";

export const ASSESSMENT_YEAR = "2025/26";

export interface DateObj {
  month: number | null;
  day: number | null;
  year: number | null;
}

export interface MyMainState {
  section_address: {
    borough: Borough | null;
    block: number | null;
    lot: number | null;
    group: string;
    reviewed_by: string;
  };
  section_received_notice: {
    apportionment: boolean;
    increased_assessment: boolean;
  };
  section_1: {
    borough: Borough | null;
    block: number | null;
    lot: number | null;
    full_address: string;
  };
  section_2: {
    applicant_name: string;
    applicant_descr: ApplicantDescr | null;
    other_descr: string;
    condo_auth: CondoAuthority | null;
  };
  section_3: {
    name: string;
    group: string;
    phone: {
      phone_1: number | null;
      phone_2: number | null;
      phone_3: number | null;
    };
    mail_addr: string;
    email_addr: string; //TODO add format mail
    isHandler: boolean;
    representative_type: RepresentativeType | null;
    representative_type_other: string;
  };
  section_4: {
    market_value: number | null;
    assessed_value: number | null;
  };
  section_5: {
    hearing_req: HearingRequest | null;
  };
  section_6: {
    kitchens: number | null;
    baths: number | null;
    bedrooms: number | null;
    other_rooms: number | null;
    stories: number | null;
    year_of_construction: number | null; //TODO: 4 digits
    parking: {
      indoor: number | null;
      outdoor: number | null;
    };
    last_alteration: string;
    property_descr: {
      property_is: PropertyType | null;
      other_info: {
        descr: string;
        resid_units: number | null;
        commerc_units: number | null;
      };
      have_basement: "no" | "yes_unfinished" | "yes_finished" | null;
    };
  };
  section_7: {
    was_rented: boolean;
  };
  section_8: {
    a: {
      bought_after: boolean;
      sellers_info: {
        name: string;
        closing_date: DateObj;
        price: number | null;
      };
    };
    b: {
      signed_for_sell: boolean;
      buyers_info: {
        name: string;
        closing_date: DateObj;
        price: number | null;
      };
    };
    c: {
      offered_for_sale: boolean;
      details: string;
    };
    d: {
      refinanced_after: boolean;
    };
    e: {
      alteration_after: boolean;
      details: {
        what_done: string;
        start_date: DateObj;
        finish_date: DateObj;
        cost: number | null;
      };
    };
  };
  section_9: {
    value_proof_attach: boolean;
    sale_1: {
      date: string;
      price: number | null;
      address: string;
      block_lot: string;
      total_dwelling: number | null;
    };
    sale_2: {
      date: string;
      price: number | null;
      address: string;
      block_lot: string;
      total_dwelling: number | null;
    };
    sale_3: {
      date: string;
      price: number | null;
      address: string;
      block_lot: string;
      total_dwelling: number | null;
    };
  };
  section_10: {
    address: {
      borough: Borough | null;
      block: number | null;
      lot: number | null;
    };
    signer_name: string;
    signer_is: Signer | null;
    fiduciary_relationship: string;
    fiduciary_entity: string;
    officer_corporate_title: string;
    officer_condo_title: string;
    llc_signer_title: string;
    date: string;
  };
}

const initialState: MyMainState = {
  section_address: {
    borough: null,
    block: null,
    lot: null,
    group: "",
    reviewed_by: "",
  },
  section_received_notice: {
    apportionment: false,
    increased_assessment: false,
  },
  section_1: {
    borough: null,
    block: null,
    lot: null,
    full_address: "",
  },
  section_2: {
    applicant_name: "",
    applicant_descr: null,
    other_descr: "",
    condo_auth: null,
  },
  section_3: {
    name: "",
    group: "",
    phone: {
      phone_1: null,
      phone_2: null,
      phone_3: null,
    },
    mail_addr: "",
    email_addr: "",
    isHandler: false,
    representative_type: null,
    representative_type_other: "",
  },
  section_4: {
    market_value: null,
    assessed_value: null,
  },
  section_5: {
    hearing_req: null,
  },
  section_6: {
    kitchens: null,
    baths: null,
    bedrooms: null,
    other_rooms: null,
    stories: null,
    year_of_construction: null,
    parking: {
      indoor: null,
      outdoor: null,
    },
    last_alteration: "",
    property_descr: {
      property_is: null,
      other_info: {
        descr: "",
        resid_units: null,
        commerc_units: null,
      },
      have_basement: null,
    },
  },
  section_7: {
    was_rented: false,
  },
  section_8: {
    a: {
      bought_after: false,
      sellers_info: {
        name: "",
        closing_date: {
          month: null,
          day: null,
          year: null,
        },
        price: null,
      },
    },
    b: {
      signed_for_sell: false,
      buyers_info: {
        name: "",
        closing_date: {
          month: null,
          day: null,
          year: null,
        },
        price: null,
      },
    },
    c: {
      offered_for_sale: false,
      details: "",
    },
    d: {
      refinanced_after: false,
    },
    e: {
      alteration_after: false,
      details: {
        what_done: "",
        start_date: {
          month: null,
          day: null,
          year: null,
        },
        finish_date: {
          month: null,
          day: null,
          year: null,
        },
        cost: null,
      },
    },
  },
  section_9: {
    value_proof_attach: false,
    sale_1: {
      date: "",
      price: null,
      address: "",
      block_lot: "",
      total_dwelling: null,
    },
    sale_2: {
      date: "",
      price: null,
      address: "",
      block_lot: "",
      total_dwelling: null,
    },
    sale_3: {
      date: "",
      price: null,
      address: "",
      block_lot: "",
      total_dwelling: null,
    },
  },
  section_10: {
    address: {
      borough: null,
      block: null,
      lot: null,
    },
    signer_name: "",
    signer_is: null,
    fiduciary_relationship: "",
    fiduciary_entity: "",
    officer_corporate_title: "",
    officer_condo_title: "",
    llc_signer_title: "",
    date: "",
  },
};

const mainSlice = createSlice({
  name: "mainState",
  initialState,
  reducers: {
    loadState: (state, action: PayloadAction<MyMainState>) => {
      return action.payload;
    },
    setData: (
      state,
      action: PayloadAction<{ path: string; value: DateObj }>
    ) => {
      const keys = action.payload.path.split(".");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let current: any = state;

      for (let i = 0; i < keys.length - 1; i++) {
        if (typeof current[keys[i]] !== "object" || current[keys[i]] === null) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = action.payload.value;
    },
    setTextField: (
      state,
      action: PayloadAction<{ path: string; value: string }>
    ) => {
      const keys = action.payload.path.split(".");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let current: any = state;

      for (let i = 0; i < keys.length - 1; i++) {
        if (typeof current[keys[i]] !== "object" || current[keys[i]] === null) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = action.payload.value.trim();
    },
    setBooleanField: (
      state,
      action: PayloadAction<{ path: string; value: boolean }>
    ) => {
      const keys = action.payload.path.split(".");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let current: any = state;

      for (let i = 0; i < keys.length - 1; i++) {
        if (typeof current[keys[i]] !== "object" || current[keys[i]] === null) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = action.payload.value;
    },
    /*setLoginState: (state, action: PayloadAction<boolean>) => {
      state.loginState = action.payload;
    },
    setUserEmail: (state, action: PayloadAction<string>) => {
      state.userEmail = action.payload;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },*/
  },
});

export const {
  loadState,
  setData,
  setTextField,
  setBooleanField,
  /*setLoginState, setUserEmail, setUserName*/
} = mainSlice.actions;

export default mainSlice.reducer;

```

```typescriptreact
import type { MyMainState } from "../store/slices/mainSlice";
import { loadState } from "../store/slices/mainSlice";
import type { AppDispatch } from "../store/store";

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
  } catch (e) {
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

```

```typescriptreact
import type { MyMainState } from "../store/slices/mainSlice";
import { loadState } from "../store/slices/mainSlice";
import type { AppDispatch } from "../store/store";

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

```

I added an action to replace the entire main state and a utility to parse and dispatch a JSON upload.

- How to use:
  - In your component, wire a file input and dispatch:
    ```tsx
    import { useDispatch } from "react-redux";
    import { uploadJsonFileAndDispatch } from "@/app/utils/mainUtils";

    const ImportButton = () => {
      const dispatch = useDispatch();
      return (
        <input
          type="file"
          accept="application/json"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            try {
              await uploadJsonFileAndDispatch(file, dispatch);
            } catch (err) {
              alert((err as Error).message);
            }
          }}
        />
      );
    };
    ```
  - Existing `downloadJson` already exports.

- Basic validation checks top-level shape and throws if invalid.

- Files touched:
  - `app/store/slices/mainSlice.ts`: added `loadState` reducer and export.
  - `app/utils/mainUtils.tsx`: added `uploadJsonFileAndDispatch(file, dispatch)`.

All tasks are complete.

```typescriptreact
    import { useDispatch } from "react-redux";
    import { uploadJsonFileAndDispatch } from "@/app/utils/mainUtils";

    const ImportButton = () => {
      const dispatch = useDispatch();
      return (
        <input
          type="file"
          accept="application/json"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            try {
              await uploadJsonFileAndDispatch(file, dispatch);
            } catch (err) {
              alert((err as Error).message);
            }
          }}
        />
      );
    };
```

