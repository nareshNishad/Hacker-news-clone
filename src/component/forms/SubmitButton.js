import React from "react";
import { useFormikContext } from "formik";

function SubmitButton({ title, customStyle }) {
  const { handleSubmit } = useFormikContext();
  console.log("style", customStyle);
  return (
    <button onPress={handleSubmit} style={customStyle}>
      {title}
    </button>
  );
}

export default SubmitButton;
