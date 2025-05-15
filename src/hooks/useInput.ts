import { useState } from "react";

type inputValidationFn = (s: string) => boolean;

export default function useInput(
  defaultValue: string,
  validationFn: inputValidationFn
) {
  const [enteredValue, setEnteredValue] = useState(defaultValue);
  const [didEdit, setDidEdit] = useState(false);

  const valueIsValid = validationFn(enteredValue);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEnteredValue(event.target.value);
    setDidEdit(false);
  }

  function handleInputBlur() {
    setDidEdit(true);
  }

  function resetInput() {
    setEnteredValue(defaultValue);
    setDidEdit(false);
  }

  const hasError = didEdit && !valueIsValid;

  return {
    value: enteredValue,
    handleInputBlur,
    handleInputChange,
    hasError,
    resetInput,
  };
}
