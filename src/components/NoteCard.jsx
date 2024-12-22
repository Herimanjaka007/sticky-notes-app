import { useRef } from "react";
import Trash from "../icons/Trash";
import { useEffect } from "react";

const NoteCard = ({ note }) => {
    const body = JSON.parse(note.body);
    const position = JSON.parse(note.position);
    const colors = JSON.parse(note.colors);
    const textareaRef = useRef(null);

    const autoGrow = (textareaRef) => {
        const {current} = textareaRef;
        current.style.height = "auto";
        current.style.height = current.scrollHeight + "px";
    };

    useEffect(()=> {
        autoGrow(textareaRef);
    });
    
    return (
        <div
            className="card"
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
