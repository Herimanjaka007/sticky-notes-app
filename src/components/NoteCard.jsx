import { useRef } from "react";
import Trash from "../icons/Trash";
import { useEffect } from "react";
import { useState } from "react";

import { setNewOffset, setZIndex } from "../utils";
import { autoGrow } from "../utils";

const NoteCard = ({ note }) => {
    const body = JSON.parse(note.body);
    const colors = JSON.parse(note.colors);
    
    const textareaRef = useRef(null);
    const [position, setPosition] = useState(JSON.parse(note.position));

    const mouseStartPos = { x: 0, y: 0 };
    const cardRef = useRef(null);

    const mouseDown = (e) => {
        setZIndex(cardRef.current);
        mouseStartPos.x = e.clientX;
        mouseStartPos.y = e.clientY;
    
        document.addEventListener("mousemove", mouseMove);
        document.addEventListener("mouseup", mouseUp);
    };

    const mouseMove = (e) => {
        let mouseMoveDir = {
            x: mouseStartPos.x - e.clientX,
            y: mouseStartPos.y - e.clientY,
        };
    
        mouseStartPos.x = e.clientX;
        mouseStartPos.y = e.clientY;

        const newPosition = setNewOffset(cardRef.current, mouseMoveDir);
    
        setPosition(newPosition);
    };

    const mouseUp = () => {
        document.removeEventListener("mousemove", mouseMove);
        document.removeEventListener("mouseup", mouseUp);
    };

    useEffect(()=> {
        autoGrow(textareaRef);
    }, []);
    
    return (
        <div
            className="card"
            ref={cardRef}
            onMouseDown={mouseDown}
            style={{
                backgroundColor: colors.colorBody,
                left: `${position.x}px`,
                top: `${position.y}px`,
            }}>
            <div
                className="card-header"
                style={{ backgroundColor: colors.colorHeader,
                }}
            >
                <Trash />
            </div>
            <div className="card-body">
                <textarea
                    onInput={() => autoGrow(textareaRef)}
                    ref={textareaRef}
                    style={{ color: colors.colorText }}
                    defaultValue={body}
                ></textarea>
            </div>
        </div>
    );
}

export default NoteCard;
