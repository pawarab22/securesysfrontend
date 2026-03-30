import { useState, useEffect } from 'react';

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

    const onSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        
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
                    />
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
                    ></textarea>
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
