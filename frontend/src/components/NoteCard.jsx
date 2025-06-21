import { PenSquare, Trash2Icon } from 'lucide-react';
import { Link } from 'react-router';
import { formatData } from '../lib/utils.js';
import api from '../lib/axios.js';
import toast from 'react-hot-toast';

const NoteCard = ({ note,setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();

    if (!window.confirm('Are you sure you want to delete this note?')) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter(note => note._id !== id))
      toast.success('Note deleted successfully');
    } catch (error) {
      console.log('Error in handleDelete', error);
      toast.error('Failed to delete note');
    }
  };

  return (
    <div className='card bg-base-100 hover:shadow-lg transition-all duration-200'>
      <div className='card-body'>
        <h3 className='card-title text-base-content'>{note.title}</h3>
        <p className='text-base-content/70 line-clamp-3'>{note.content}</p>
        <div className='card-actions justify-between items-center mt-4'>
          <span className='text-sm text-base-content/60'>{formatData(new Date(note.createdAt))}</span>
          <div className='flex items-center gap-1'>
            <Link to={`/note/${note._id}`} className='btn btn-ghost btn-sm'><PenSquare className='size-4' /></Link>
            <button className='btn btn-ghost btn-sm text-error' onClick={(e) => handleDelete(e, note._id)}>
              <Trash2Icon className='size-4' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NoteCard;
