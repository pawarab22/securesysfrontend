import { Trash2, Edit3 } from 'lucide-react';
import DOMPurify from 'dompurify';

const NoteItem = ({ note, onDelete, onEdit }) => {
    return (
        <div className="note-card glass glass-hover animate-fade-in">
            <h3 className="note-title">{note.title}</h3>
            <div 
                className="note-content"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(note.content || 'No content provided.') }}
            ></div>
            <div className="note-actions">
                <button 
                    onClick={() => onEdit(note)} 
                    className="btn btn-secondary"
                    style={{ padding: '0.6rem', borderRadius: '0.6rem' }}
                    title="Edit Note"
                    aria-label="Edit note"
                >
                    <Edit3 size={16} />
                </button>
                <button 
                    onClick={() => onDelete(note.id)} 
                    className="btn btn-danger"
                    style={{ padding: '0.6rem', borderRadius: '0.6rem' }}
                    title="Delete Note"
                    aria-label="Delete note"
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    );
};

export default NoteItem;
