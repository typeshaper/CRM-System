export const titleValidationRules = {
  min: 2,
  max: 64,
  message: "Title must be between 2 and 64 characters long!",
  required: true,
};

export const usernameValidationRules = {
  min: 1,
  max: 60,
  pattern: /[a-zA-Zа-яА-Я]/g,
  message:
    "Username must be between 1 and 60 latin or cyrillic characters long!",
  required: true,
};

export const loginValidationRules = {
  min: 2,
  max: 60,
  pattern: /^[a-zA-Z]+$/g,
  message: "Login must be between 2 and 60 latin characters long!",
  required: true,
};

export const passwordValidationRules = {
  min: 6,
  max: 60,
  message: "Password must be between 6 and 60 characters long!",
  required: true,
};

export const emailValidationRules = {
  required: true,
  message: "Must be valid email address!",
};

export const phoneNumberValidationRules = {
  required: false,
  message: "Must be valid phone number!",
};
