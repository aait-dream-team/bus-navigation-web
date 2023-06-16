import configureStore from "redux-mock-store";
import {
  setMode,
  setUserType,
  setUserId,
  setToken,
} from "state/index";

const mockStore = configureStore([]);

describe("globalSlice reducers", () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  it("should handle setMode", () => {
    store.dispatch(setMode());
    const actions = store.getActions();
    const expectedPayload = { type: "global/setMode" };
    expect(actions).toEqual([expectedPayload]);
  });

  it("should handle setUserType", () => {
    const userType = "admin";
    store.dispatch(setUserType(userType));
    const actions = store.getActions();
    const expectedPayload = { type: "global/setUserType", payload: userType };
    expect(actions).toEqual([expectedPayload]);
  });

  it("should handle setUserId", () => {
    const userId = 123;
    store.dispatch(setUserId(userId));
    const actions = store.getActions();
    const expectedPayload = { type: "global/setUserId", payload: userId };
    expect(actions).toEqual([expectedPayload]);
  });

  it("should handle setToken", () => {
    const token = "abc123";
    store.dispatch(setToken(token));
    const actions = store.getActions();
    const expectedPayload = { type: "global/setToken", payload: token };
    expect(actions).toEqual([expectedPayload]);
  });
});
