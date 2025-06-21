import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import RateLimitedUI from '../components/RateLimitedUI.jsx';
import toast from 'react-hot-toast';
import NoteCard from '../components/NoteCard.jsx';
import api from '../lib/axios.js';
import NotesNotFound from '../components/NotesNotFound.jsx';
import { LoaderIcon } from 'lucide-react';

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get('/notes');

        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log('Error fetching notes');
        if (error.response.status == 429) {
          setIsRateLimited(true);
        } else {
          toast.error('Failed to load notes');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className='min-h-screen'>
      <Navbar />

      {isRateLimited && <RateLimitedUI />}

      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && (
          <div className='flex items-center justify-center'>
            <LoaderIcon className='animate-spin text-center size-10' />
          </div>
        )}

        {notes.length === 0 && !isRateLimited && !loading && <NotesNotFound />}

        {notes.length > 0 && !isRateLimited && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default HomePage;
