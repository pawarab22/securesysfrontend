import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import NoteForm from '../components/NoteForm';
import NoteItem from '../components/NoteItem';
import api from '../api/axios';
import { v4 as uuidv4 } from 'uuid'; // for idempotency
import { AlertCircle, BookText } from 'lucide-react';
import Swal from 'sweetalert2';

const Dashboard = () => {
    const [notes, setNotes] = useState([]);
    const [currentNote, setCurrentNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchNotes = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/notes');
            setNotes(data);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to fetch notes');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotes();
        // eslint-disable-next-line
    }, []);

    const handleSaveNote = async (noteData) => {
        setError(null);
        try {
            if (noteData.id) {
                // Update
                const { data } = await api.put(`/notes/${noteData.id}`, {
                    title: noteData.title,
                    content: noteData.content,
                    version: noteData.version
                });
                setNotes(notes.map((n) => (n.id === data.id ? data : n)));
                setCurrentNote(null);
                Swal.fire({
                    icon: 'success',
                    title: 'Note Updated!',
                    text: 'Your note has been saved.',
                    showCloseButton: true,
                    showCancelButton: true,
                    cancelButtonText: 'Close',
                    confirmButtonText: 'Great'
                });
            } else {
                // Create with idempotency key
                const idempotencyKey = uuidv4();
                const { data } = await api.post('/notes', 
                    { title: noteData.title, content: noteData.content },
                    { headers: { 'Idempotency-Key': idempotencyKey } }
                );
                
                setNotes([...notes, data]);
                Swal.fire({
                    icon: 'success',
                    title: 'Note Created!',
                    text: 'Your new note has been added.',
                    showCloseButton: true,
                    showCancelButton: true,
                    cancelButtonText: 'Close',
                    confirmButtonText: 'Awesome'
                });
            }
        } catch (err) {
            const msg = err.response?.data?.error || 'Failed to save note';
            setError(msg);
            Swal.fire({
                icon: 'error',
                title: 'Save Failed',
                text: msg,
                showCloseButton: true,
                showCancelButton: true,
                cancelButtonText: 'Close',
                confirmButtonText: 'Try Again'
            });
        }
    };

    const handleDeleteNote = async (id) => {
        const result = await Swal.fire({
            title: 'Delete this note?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        });
        
        if (!result.isConfirmed) return;
        
        try {
            await api.delete(`/notes/${id}`);
            setNotes(notes.filter((n) => n.id !== id));
            Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'Your note has been deleted.',
                showCloseButton: true,
                showCancelButton: true,
                cancelButtonText: 'Close',
                confirmButtonText: 'OK'
            });
        } catch (err) {
            const msg = err.response?.data?.error || 'Failed to delete note';
            setError(msg);
            Swal.fire({
                icon: 'error',
                title: 'Delete Failed',
                text: msg,
                showCloseButton: true,
                showCancelButton: true,
                cancelButtonText: 'Close',
                confirmButtonText: 'Try Again'
            });
        }
    };

    const handleEditNote = (note) => {
        setCurrentNote(note);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEdit = () => {
        setCurrentNote(null);
    };

    return (
        <div className="animate-fade-in" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <main className="container dashboard" style={{ flexGrow: 1 }}>
                
                {error && (
                    <div className="auth-error" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
                        <AlertCircle size={20} />
                        {error}
                        <button 
                            className="btn" 
                            style={{ marginLeft: 'auto', padding: '0.2rem 0.5rem', background: 'transparent', border: '1px solid var(--danger-color)', color: 'var(--danger-color)' }}
                            onClick={() => setError(null)}
                        >
                            Dismiss
                        </button>
                    </div>
                )}

                <NoteForm 
                    currentNote={currentNote} 
                    onSave={handleSaveNote} 
                    onCancel={handleCancelEdit} 
                />

                <div className="dashboard-header">
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Your Notes</h2>
                    <span style={{ color: 'var(--text-secondary)' }}>
                        {notes.length} {notes.length === 1 ? 'Note' : 'Notes'}
                    </span>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                        Loading notes...
                    </div>
                ) : notes.length > 0 ? (
                    <div className="notes-grid">
                        {notes.map((note) => (
                            <NoteItem 
                                key={note.id} 
                                note={note} 
                                onDelete={handleDeleteNote} 
                                onEdit={handleEditNote} 
                            />
                        ))}
                    </div>
                ) : (
                    <div className="glass" style={{ textAlign: 'center', padding: '4rem 2rem', borderRadius: '1rem', color: 'var(--text-secondary)' }}>
                        <BookText size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                        <p style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>No notes found</p>
                        <p style={{ fontSize: '0.875rem' }}>Create your first note above to get started.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
