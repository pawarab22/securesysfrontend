import { useState, useEffect } from 'react';
import { VALIDATION } from '../constants';

const NoteForm = ({ currentNote, onSave, onCancel }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (currentNote) {
            setTitle(currentNote.title);
            setContent(currentNote.content || '');
        } else {
            setTitle('');
            setContent('');
        }
    }, [currentNote]);

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if ((title.trim() || content.trim()) && !currentNote) {
                e.preventDefault();
                e.returnValue = 'You have unsaved changes!';
            }
        };
        
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [title, content, currentNote]);

    const onSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        if (title.length > VALIDATION.TITLE_MAX_LENGTH) {
            alert(`Title must be less than ${VALIDATION.TITLE_MAX_LENGTH} characters`);
            return;
        }
        if (content.length > VALIDATION.CONTENT_MAX_LENGTH) {
            alert(`Content must be less than ${VALIDATION.CONTENT_MAX_LENGTH} characters`);
            return;
        }
        
        onSave({ 
            id: currentNote?.id, 
            title, 
            content,
            version: currentNote?.version
        });
        
        if (!currentNote) {
            setTitle('');
            setContent('');
        }
    };

    return (
        <div className="glass" style={{ padding: '2rem', borderRadius: '1rem', marginBottom: '2rem' }}>
            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>
                {currentNote ? 'Edit Note' : 'Create New Note'}
            </h2>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label className="form-label">Note Title</label>
                    <input 
                        type="text" 
                        className="form-input" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        placeholder="Enter title"
                        required 
                        maxLength={VALIDATION.TITLE_MAX_LENGTH}
                    />
                    <small style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                        {title.length}/{VALIDATION.TITLE_MAX_LENGTH}
                    </small>
                </div>
                <div className="form-group">
                    <label className="form-label">Note Content</label>
                    <textarea 
                        className="form-input" 
                        rows="4"
                        value={content} 
                        onChange={(e) => setContent(e.target.value)} 
                        placeholder="Enter note content..."
                        style={{ resize: 'vertical' }}
                        maxLength={VALIDATION.CONTENT_MAX_LENGTH}
                    ></textarea>
                    <small style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                        {content.length}/{VALIDATION.CONTENT_MAX_LENGTH}
                    </small>
                </div>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                    {currentNote && (
                        <button type="button" className="btn" onClick={onCancel} style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'var(--text-primary)' }}>
                            Cancel
                        </button>
                    )}
                    <button type="submit" className="btn btn-primary">
                        {currentNote ? 'Update Note' : 'Add Note'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NoteForm;
