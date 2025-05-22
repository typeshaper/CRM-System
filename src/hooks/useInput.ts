import { useState } from "react";

type inputValidationFn = (s: string) => boolean;

const useInput = (defaultValue: string, validationFn: inputValidationFn) => {
  const [enteredValue, setEnteredValue] = useState(defaultValue);
  const [didEdit, setDidEdit] = useState(false);

  const valueIsValid = validationFn(enteredValue);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredValue(event.target.value);
    setDidEdit(false);
  };

  const handleInputBlur = () => {
    setDidEdit(true);
  };

  const resetInput = () => {
    setEnteredValue(defaultValue);
    setDidEdit(false);
  };

  const hasError = didEdit && !valueIsValid;

  return {
    value: enteredValue,
    handleInputBlur,
    handleInputChange,
    hasError,
    resetInput,
  };
};

export default useInput;
