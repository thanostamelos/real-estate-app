import React from "react";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";

export const PaperComponentDraggable = React.forwardRef(function PaperComponentDraggable(
    props,
    ref
) {
    const nodeRef = React.useRef(null);

    const handleRef = (instance) => {
        nodeRef.current = instance;

        if (typeof ref === "function") ref(instance);
        else if (ref) ref.current = instance;
    };

    return (
        <Draggable
            nodeRef={nodeRef}
            handle="#draggable-dialog-title-2"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper ref={handleRef} {...props} />
        </Draggable>
    );
});