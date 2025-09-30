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
    date: new Date().toLocaleDateString("en-US").replace(/\//g, "."),
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
  },
});

export const { loadState, setData, setTextField, setBooleanField } =
  mainSlice.actions;

export default mainSlice.reducer;
