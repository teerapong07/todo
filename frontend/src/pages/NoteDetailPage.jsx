import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import api from '../lib/axios.js';
import toast from 'react-hot-toast';
import { ArrowLeftIcon, Loader, LoaderIcon, Trash2Icon } from 'lucide-react';
import RateLimitedUI from '../components/RateLimitedUI.jsx';
import NotesNotFound from '../components/NotesNotFound.jsx';

function NoteDetailPage() {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setIsRateLimited(false);
        setNote(res.data);
      } catch (error) {
        console.log('Error in fetching note', error);
        if (error.response.status == 429) {
          setIsRateLimited(true);
        } else {
          toast.error('Failed to fetch the note');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success('Note deleted successfully');
      navigate('/');
    } catch (error) {
      console.log('Error in handleDelete', error);
      toast.error('Failed to delete note');
    }
  };
  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error('All fields are required');
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note);
      toast.success('Note updated successfully');
      navigate('/');
    } catch (error) {
      console.log('Error saving the note', error);
      toast.error('Failed to update note');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-slate-950 flex items-center justify-center'>
        <LoaderIcon className='animate-spin size-10' />
      </div>
    );
  }

  if (isRateLimited) {
    navigate('/');
  }

  return (
    <div className='min-h-screen bg-slate-950'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <div className='flex items-center justify-between mb-6'>
            <Link to='/' className='btn btn-ghost'>
              <ArrowLeftIcon className='h-5 w-5' />
              Back to Notes
            </Link>
            {!note && (
              <button onClick={handleDelete} className='btn btn-error btn-outline'>
                <Trash2Icon className='h-5 w-5' />
                Delete Note
              </button>
            )}
          </div>

          {!note && !isRateLimited && !loading && <NotesNotFound />}

          {note && !isRateLimited && (
            <div className='card bg-base-100'>
              <div className='card-body'>
                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Title</span>
                  </label>
                  <input type='text' className='input input-bordered' placeholder='Note Title' value={note.title} onChange={(e) => setNote({ ...note, title: e.target.value })} />
                </div>
                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Content</span>
                  </label>
                  <textarea type='text' className='textarea textarea-bordered h-32' placeholder='Write your note here...' value={note.content} onChange={(e) => setNote({ ...note, content: e.target.value })} />
                </div>
                <div className='card-actions justify-end'>
                  <button className='btn btn-primary' disabled={saving} onClick={handleSave}>
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default NoteDetailPage;
