export const DISBURSEMENT_PAYMENT = "DISBURSEMENT_PAYMENT";

export const disbursePayment = (userPhoneNumber, amountOwed) => {
  const apiUser = "28048e5b-496b-46d4-bdf2-3015b5ece648";
  const apiKey = "930e0b6f83ce4d24a1c985dac9c49e90";
  const subscriptionKey = "43a6349e869a41849bec387b29f5f16d";

  return async dispatch => {
    const response = await fetch(
      `https://e-mpiya-foundation.oneziko.com/api/momo/disbursement?apiUser=${apiUser}&apiKey=${apiKey}&subscriptionKey=${subscriptionKey}&amount=${amountOwed}&number=${userPhoneNumber}`
    );

    const resData = await response.json();
    console.log(resData, "yt");
  };
};
