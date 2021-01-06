import React from "react";
import { useFormikContext } from "formik";

function SubmitButton({ title, customStyle }) {
  const { handleSubmit } = useFormikContext();

  return (
    <button onClick={handleSubmit} style={customStyle}>
      {title}
    </button>
  );
}

export default SubmitButton;
