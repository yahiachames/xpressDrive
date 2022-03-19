import React from "react";
import {useFormikContext} from "formik";

import BasicButton from "../basic-button";

function SubmitButton({title, icon, color, style, textColor, disabled}) {
    const {handleSubmit} = useFormikContext();
    return (
        <BasicButton
            title={title}
            width={"100%"}
            color={textColor}
            onPress={handleSubmit}
            disabled={disabled}
            style={style}
        />
    );
}

export default SubmitButton;
