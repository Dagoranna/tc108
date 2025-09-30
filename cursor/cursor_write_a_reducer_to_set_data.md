# Write a reducer to set data
_Exported on 9/25/2025 at 09:25:09 GMT+3 from Cursor (1.6.45)_

---

**User**

write the reducer wich takes a data must be set and a path in state where it must be set, like this: setData("Jon Doe", "section_address.reviewed_by") 


---

**Cursor**

I'll inspect the Redux slice to add a reducer that sets a value by dotted path, creating a small helper to assign nested fields safely. Now I'll open the relevant files.

I found the Redux slice and will add a generic set-by-path reducer with a small helper, then export the action. Next, I’ll implement the edit and check for linter issues.

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

interface DateObj {
  month: number | null;
  day: number | null;
  year: number | null;
}

interface MyMainState {
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
    assessment_year: string; //TODO: switch to 2025/26
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
    phone: string; //TODO: add format "(123) 456-7890"
    mail_addr: string;
    email_addr: string; //TODO add format mail
    isHandler: boolean;
    representative_type: string;
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
    bath: number | null;
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
      date: DateObj;
      price: number | null;
      address: string;
      block_lot: string;
      total_dwelling: number | null;
    };
    sale_2: {
      date: DateObj;
      price: number | null;
      address: string;
      block_lot: string;
      total_dwelling: number | null;
    };
    sale_3: {
      date: DateObj;
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
    signer_title: string;
    date: DateObj;
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
    assessment_year: "",
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
    phone: "",
    mail_addr: "",
    email_addr: "",
    isHandler: false,
    representative_type: "",
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
    bath: null,
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
      date: {
        month: null,
        day: null,
        year: null,
      },
      price: null,
      address: "",
      block_lot: "",
      total_dwelling: null,
    },
    sale_2: {
      date: {
        month: null,
        day: null,
        year: null,
      },
      price: null,
      address: "",
      block_lot: "",
      total_dwelling: null,
    },
    sale_3: {
      date: {
        month: null,
        day: null,
        year: null,
      },
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
    signer_title: "",
    date: {
      month: null,
      day: null,
      year: null,
    },
  },
};

// Helper to set a nested value in an object using a dot-separated path
function setValueByPath<T extends Record<string, any>>(target: T, path: string, value: unknown): void {
  if (!path) return;
  const keys = path.split(".");
  let current: any = target;
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const isLast = i === keys.length - 1;
    if (isLast) {
      current[key] = value as any;
      return;
    }
    if (current[key] === undefined || current[key] === null) {
      current[key] = {};
    }
    current = current[key];
  }
}

const mainSlice = createSlice({
  name: "mainState",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<{ path: string; value: unknown }>) => {
      const { path, value } = action.payload;
      setValueByPath(state as unknown as Record<string, any>, path, value);
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
  setData,
  /*setLoginState, setUserEmail, setUserName*/
} = mainSlice.actions;

export default mainSlice.reducer;

```

I'll refactor the helper to use `unknown` instead of `any` to satisfy the linter, and update the reducer call accordingly. Then I'll re-run linting on the modified file.

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

interface DateObj {
  month: number | null;
  day: number | null;
  year: number | null;
}

interface MyMainState {
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
    assessment_year: string; //TODO: switch to 2025/26
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
    phone: string; //TODO: add format "(123) 456-7890"
    mail_addr: string;
    email_addr: string; //TODO add format mail
    isHandler: boolean;
    representative_type: string;
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
    bath: number | null;
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
      date: DateObj;
      price: number | null;
      address: string;
      block_lot: string;
      total_dwelling: number | null;
    };
    sale_2: {
      date: DateObj;
      price: number | null;
      address: string;
      block_lot: string;
      total_dwelling: number | null;
    };
    sale_3: {
      date: DateObj;
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
    signer_title: string;
    date: DateObj;
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
    assessment_year: "",
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
    phone: "",
    mail_addr: "",
    email_addr: "",
    isHandler: false,
    representative_type: "",
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
    bath: null,
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
      date: {
        month: null,
        day: null,
        year: null,
      },
      price: null,
      address: "",
      block_lot: "",
      total_dwelling: null,
    },
    sale_2: {
      date: {
        month: null,
        day: null,
        year: null,
      },
      price: null,
      address: "",
      block_lot: "",
      total_dwelling: null,
    },
    sale_3: {
      date: {
        month: null,
        day: null,
        year: null,
      },
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
    signer_title: "",
    date: {
      month: null,
      day: null,
      year: null,
    },
  },
};

// Helper to set a nested value in an object using a dot-separated path
function setValueByPath<T extends Record<string, unknown>>(target: T, path: string, value: unknown): void {
  if (!path) return;
  const keys = path.split(".");
  let current: Record<string, unknown> = target as unknown as Record<string, unknown>;
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const isLast = i === keys.length - 1;
    if (isLast) {
      current[key] = value;
      return;
    }
    if (current[key] === undefined || current[key] === null || typeof current[key] !== "object") {
      current[key] = {} as Record<string, unknown>;
    }
    current = current[key] as Record<string, unknown>;
  }
}

const mainSlice = createSlice({
  name: "mainState",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<{ path: string; value: unknown }>) => {
      const { path, value } = action.payload;
      setValueByPath(state as unknown as Record<string, unknown>, path, value);
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
  setData,
  /*setLoginState, setUserEmail, setUserName*/
} = mainSlice.actions;

export default mainSlice.reducer;

```

I added a generic nested setter reducer `setData` that updates by dot-separated path and created a safe helper.

- Dispatch usage: setData({ value: "Jon Doe", path: "section_address.reviewed_by" })

You can import the action from `app/store/slices/mainSlice.ts`.

- Edited: added `setValueByPath` helper and `setData` reducer; exported `setData`.
- Lint: passed with no errors.

---

**User**

undo this. Think how to  change  path format to simplify algorithm. For example, may be this one will be better setData("Jon Doe", ["section_address", "reviewed_by"]) . CHose optimal path format and make new reducer 

---

**Cursor**

I'll replace the dot-path reducer with a new `setData` that accepts a string[] path and a value, using a simplified helper. Then I'll run lint checks on the file.

```typescript
*** Begin Patch
*** Update File: app/store/slices/mainSlice.ts
@@
-// Helper to set a nested value in an object using a dot-separated path
-function setValueByPath<T extends Record<string, unknown>>(target: T, path: string, value: unknown): void {
-  if (!path) return;
-  const keys = path.split(".");
-  let current: Record<string, unknown> = target as unknown as Record<string, unknown>;
-  for (let i = 0; i < keys.length; i++) {
-    const key = keys[i];
-    const isLast = i === keys.length - 1;
-    if (isLast) {
-      current[key] = value;
-      return;
-    }
-    if (current[key] === undefined || current[key] === null || typeof current[key] !== "object") {
-      current[key] = {} as Record<string, unknown>;
-    }
-    current = current[key] as Record<string, unknown>;
-  }
-}
+// Helper to set a nested value in an object using an array path
+function setValueByPath<T extends Record<string, unknown>>(target: T, path: string[], value: unknown): void {
+  if (!Array.isArray(path) || path.length === 0) return;
+  let current: Record<string, unknown> = target as unknown as Record<string, unknown>;
+  for (let i = 0; i < path.length - 1; i++) {
+    const key = path[i];
+    const next = current[key];
+    if (typeof next !== "object" || next === null) {
+      const container: Record<string, unknown> = {};
+      current[key] = container;
+      current = container;
+    } else {
+      current = next as Record<string, unknown>;
+    }
+  }
+  const lastKey = path[path.length - 1];
+  current[lastKey] = value;
+}
@@
-  reducers: {
-    setData: (state, action: PayloadAction<{ path: string; value: unknown }>) => {
-      const { path, value } = action.payload;
-      setValueByPath(state as unknown as Record<string, unknown>, path, value);
-    },
+  reducers: {
+    setData: {
+      reducer: (
+        state,
+        action: PayloadAction<{ path: string[]; value: unknown }>
+      ) => {
+        const { path, value } = action.payload;
+        setValueByPath(state as unknown as Record<string, unknown>, path, value);
+      },
+      prepare: (value: unknown, path: string[]) => ({
+        payload: { value, path },
+      }),
+    },
*** End Patch
```

I'm going to re-open the slice to grab the current helper implementation and replace it with an array-path version, and update the reducer signature to use prepare(value, path: string[]) for ergonomic calls. Then I'll run lint checks.

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

interface DateObj {
  month: number | null;
  day: number | null;
  year: number | null;
}

interface MyMainState {
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
    assessment_year: string; //TODO: switch to 2025/26
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
    phone: string; //TODO: add format "(123) 456-7890"
    mail_addr: string;
    email_addr: string; //TODO add format mail
    isHandler: boolean;
    representative_type: string;
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
    bath: number | null;
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
      date: DateObj;
      price: number | null;
      address: string;
      block_lot: string;
      total_dwelling: number | null;
    };
    sale_2: {
      date: DateObj;
      price: number | null;
      address: string;
      block_lot: string;
      total_dwelling: number | null;
    };
    sale_3: {
      date: DateObj;
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
    signer_title: string;
    date: DateObj;
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
    assessment_year: "",
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
    phone: "",
    mail_addr: "",
    email_addr: "",
    isHandler: false,
    representative_type: "",
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
    bath: null,
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
      date: {
        month: null,
        day: null,
        year: null,
      },
      price: null,
      address: "",
      block_lot: "",
      total_dwelling: null,
    },
    sale_2: {
      date: {
        month: null,
        day: null,
        year: null,
      },
      price: null,
      address: "",
      block_lot: "",
      total_dwelling: null,
    },
    sale_3: {
      date: {
        month: null,
        day: null,
        year: null,
      },
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
    signer_title: "",
    date: {
      month: null,
      day: null,
      year: null,
    },
  },
};

// Helper to set a nested value in an object using an array path
function setValueByPath<T extends Record<string, unknown>>(
  target: T,
  path: string[],
  value: unknown
): void {
  if (!Array.isArray(path) || path.length === 0) return;
  let current: Record<string, unknown> = target as unknown as Record<string, unknown>;
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];
    const next = current[key];
    if (typeof next !== "object" || next === null) {
      const container: Record<string, unknown> = {};
      current[key] = container;
      current = container;
    } else {
      current = next as Record<string, unknown>;
    }
  }
  const lastKey = path[path.length - 1];
  current[lastKey] = value;
}

const mainSlice = createSlice({
  name: "mainState",
  initialState,
  reducers: {
    setData: {
      reducer: (
        state,
        action: PayloadAction<{ path: string[]; value: unknown }>
      ) => {
        const { path, value } = action.payload;
        setValueByPath(state as unknown as Record<string, unknown>, path, value);
      },
      prepare: (value: unknown, path: string[]) => ({
        payload: { value, path },
      }),
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
  setData,
  /*setLoginState, setUserEmail, setUserName*/
} = mainSlice.actions;

export default mainSlice.reducer;

```

I switched to an array-based path for simplicity and ergonomics, and updated the reducer accordingly.

- New usage: setData("Jon Doe", ["section_address", "reviewed_by"])

Notes:
- The reducer now uses a `prepare(value, path)` signature, so you can call it as above.
- Helper updated to accept `string[]` paths and iteratively create missing objects.

- Edited: replaced dot-path helper with array-path helper; changed `setData` to accept `string[]` via a `prepare` callback.
- Lint: clean.

