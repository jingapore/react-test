// Understanding the difference between useRef and createRef
// https://stackoverflow.com/questions/54620698/whats-the-difference-between-useref-and-createref

import React, { useRef, createRef, useState } from "react";
import ReactDOM from "react-dom";

export function RefTest() {

    const [renderIndex, setRenderIndex] = useState(1);
    const refFromUseRef = useRef();
    const refFromCreateRef = createRef();

    if (!refFromUseRef.current) {
        refFromUseRef.current = renderIndex;
    }
    if (!refFromCreateRef.current) {
        refFromCreateRef.current = renderIndex;
    }

    return (
        <div className="Ref">
            Current render index: {renderIndex}
            <br />
            First render index remembered within refFromUseRef.current:
            {refFromUseRef.current}
            <br />
            First render index unsuccessfully remembered within refFromCreateRef.current:
            {refFromCreateRef.current}
            <br />
            <button onClick={() => setRenderIndex((prev) => prev + 1)}>
                Caure re-render
            </button>
        </div>
    );
}

ReactDOM.render(
    <div>
        Hello
        <RefTest />
    </div>,
    document.getElementById('root')
);