import Unsplash, { toJson } from "unsplash-js";

export { toJson };
export const unsplash = new Unsplash({
  applicationId: process.env.REACT_APP_UNSPLASH_APP_ID,
  secret: process.env.REACT_APP_UNSPLASH_SECRET,
  callbackUrl: process.env.REACT_APP_CALLBACK_URL
});
