import parsePhoneNumberFromString from "libphonenumber-js";

export const formatPhoneNumber = (number: string) => {
  const formattedPhone = parsePhoneNumberFromString(
    number,
    "RU"
  )?.number.toString();

  return formattedPhone;
};
