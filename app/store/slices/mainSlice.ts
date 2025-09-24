import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Borough = "Bronx" | "Brooklyn" | "Manhattan" | "Queens" | "Staten Island";
type ApplicantDescr = "Owner" | "Tenant" | "Condo" | "Other";
type CondoAuthority = "By-laws" | "Individual" | "Power-of-Attorney";
type HearingRequest = "Without" | "In-person" | "Telephone" | "Video";

interface MyMainState {
  section_address: {
    borough: Borough | null;
    block: number;
    lot: number;
    group: string;
    reviewed_by: string;
  };
  section_received_notice: {
    apportionment: boolean;
    increased_assessment: boolean;
  };
  section_1: {
    borough: Borough | null;
    block: number;
    lot: number;
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
    market_value: number;
    assessed_value: number;
  };
  section_5: {
    hearing_req: HearingRequest | null;
  };
  section_6: {
    kitchens: number;
    bath: number;
    bedrooms: number;
    other_rooms: number;
    stories: number;
    year_of_construction: number; //TODO: 4 digits
    parking: {
      indoor: number;
      outdoor: number;
    };
    last_alteration: string;
    property_descr: {
      property_is:
        | "family_1"
        | "family_2"
        | "family_3"
        | "vacant"
        | "class_one_condo"
        | "other";
      other_info: {
        resid_units: number;
        commerc_units: number;
      };
      have_basement: "no" | "yes_unfinished" | "yes_finished";
    };
  };
  section_7: {
    was_rented: boolean;
  };
  section_8: {
    a: {
      bought_after_01_05_2023: boolean;
      sellers_info: {
        name: string;
        closing_date: {
          month: number; //TODO - insert interval 1-12
          day: number; //TODO - insert interval depend from month
          year: number; //TODO - insert rule for year
        };
        price: number;
      };
    };
    b: {
      signed_for_sell: boolean;
      buyers_info: {
        name: string;
        closing_date: {
          month: number; //TODO - insert interval 1-12
          day: number; //TODO - insert interval depend from month
          year: number; //TODO - insert rule for year
        };
        price: number;
      };
    };
    c: {
      offered_for_sale: boolean;
      details: string;
    };
  };
}

const initialState: MyMainState = {};

const mainSlice = createSlice({
  name: "mainState",
  initialState,
  reducers: {
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
  /*setLoginState, setUserEmail, setUserName*/
} = mainSlice.actions;

export default mainSlice.reducer;
