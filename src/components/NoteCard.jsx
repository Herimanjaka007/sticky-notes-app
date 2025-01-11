import { useRef } from "react";
import Trash from "../icons/Trash";
import { useEffect } from "react";
import { useState } from "react";
import Spinner from "../icons/Spinner";

import { bodyParser, setNewOffset, setZIndex } from "../utils";
import { autoGrow } from "../utils";
import { db } from "../appwrite/databases";

const NoteCard = ({ note }) => {
    const body = bodyParser(note.body);
    const colors = JSON.parse(note.colors);

    const textareaRef = useRef(null);
    const [position, setPosition] = useState(JSON.parse(note.position));

    const mouseStartPos = { x: 0, y: 0 };
    const cardRef = useRef(null);

    const [saving, setSaving] = useState(false);
    const keyUpTimer = useRef(null);

    const handleKeyUp = async () => {
        setSaving(true);

        if (keyUpTimer.current) {
            clearTimeout(keyUpTimer.current);
        }

        keyUpTimer.current = setTimeout(() => {
            saveData("body", textareaRef.current.value);
        }, 2000);
    };

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

        const newPosition = setNewOffset(cardRef.current);
        saveData("position", newPosition);
    };

    const saveData = async (key, value) => {
        const payload = { [key]: JSON.stringify(value) };
        try {
            await db.notes.update(note.$id, payload);
        } catch (error) {
            console.error(error);
        }
        setSaving(false);
    };

    useEffect(() => {
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
                style={{
                    backgroundColor: colors.colorHeader,
                }}
            >
                <Trash />
                {
                    saving && (
                        <div className="card-saving">
                        <Spinner color={colors.colorText} />
                            <span style={{ color: colors.colorText }}>Saving...</span>
                        </div>
                    )
                }

            </div>
            <div className="card-body">
                <textarea
                    onInput={() => autoGrow(textareaRef)}
                    onKeyUp={handleKeyUp}
                    ref={textareaRef}
                    style={{ color: colors.colorText }}
                    defaultValue={body}
                ></textarea>
            </div>
        </div>
    );
}

export default NoteCard;
