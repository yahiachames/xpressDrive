import React from "react";
import { useFormikContext } from "formik";

import BasicButton from "../basic-button";
import { colors } from "../../constants";

function SubmitButton({ title, icon, color, style, textColor, disabled }) {
  const { handleSubmit } = useFormikContext();
  return (
    <BasicButton
      title={"LoginScreen"}
      width={"100%"}
      color={colors.primary}
      onPress={handleSubmit}
    />
  );
}

export default SubmitButton;
