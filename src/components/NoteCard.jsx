const NoteCard = ({note}) => {
    const body = JSON.parse(note);
    return (
        <div>
            {body}
        </div>
    );
}

export default NoteCard;
