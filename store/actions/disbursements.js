export const DISBURSEMENT_PAYMENT = "DISBURSEMENT_PAYMENT";

export const disbursePayment = userPhoneNumber => {
  const apiUser = "848bbb09-26d0-4e90-8f67-b6254153f0ad";
  const apiKey = "51a3878a2f034433bad53a8df7bcaa3f";
  const subscriptionKey = "4d43909d50a046cc815858d9d2a948a2";

  return async dispatch => {
    const response = await fetch(
      `https://e-mpiya-foundation.oneziko.com/api/momo/disbursement?apiUser=${apiUser}&apiKey=${apiKey}&subscriptionKey=${subscriptionKey}&number=${userPhoneNumber}`
    );

    const resData = await response.json();
  };
};
