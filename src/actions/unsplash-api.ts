let Unsplash = require('unsplash-js');

export const toJson = Unsplash.toJson;
export const unsplash = new Unsplash.default({
  applicationId: process.env.REACT_APP_UNSPLASH_APP_ID,
  secret: process.env.REACT_APP_UNSPLASH_SECRET,
  callbackUrl: process.env.REACT_APP_CALLBACK_URL
});
