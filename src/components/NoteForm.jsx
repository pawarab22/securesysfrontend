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
        <div className="glass animate-fade-in" style={{ padding: '2.5rem', borderRadius: '1.5rem', marginBottom: '3rem' }}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: 600 }}>
                {currentNote ? 'Modify Your Note' : 'Draft a New Note'}
            </h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label className="form-label">Note Title</label>
                    <input 
                        type="text" 
                        className="form-input" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        placeholder="Something memorable..."
                        required 
                        maxLength={VALIDATION.TITLE_MAX_LENGTH}
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.4rem' }}>
                        <small style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 500 }}>
                            {title.length}/{VALIDATION.TITLE_MAX_LENGTH}
                        </small>
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-label">Key Content</label>
                    <textarea 
                        className="form-input" 
                        rows="5"
                        value={content} 
                        onChange={(e) => setContent(e.target.value)} 
                        placeholder="Capture your thoughts securely..."
                        style={{ resize: 'vertical', minHeight: '120px' }}
                        maxLength={VALIDATION.CONTENT_MAX_LENGTH}
                    ></textarea>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.4rem' }}>
                        <small style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 500 }}>
                            {content.length}/{VALIDATION.CONTENT_MAX_LENGTH}
                        </small>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                    {currentNote && (
                        <button type="button" className="btn btn-secondary" onClick={onCancel}>
                            Cancel Edit
                        </button>
                    )}
                    <button type="submit" className="btn btn-primary">
                        {currentNote ? 'Save Changes' : 'Create Secure Note'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NoteForm;
