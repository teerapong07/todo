import { NotebookIcon, SearchX } from 'lucide-react';
import { Link } from 'react-router';

const NotFound = () => {
  return (
    <div className='min-h-screen flex items-center'>
      <div className='flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center'>        
        <h3 className='text-9xl font-bold'>404</h3>
        <p className='text-base-content/70 text-3xl'>Page Not Found</p>
        <Link to='/' className='btn btn-primary'>
          Back to Home Page
        </Link>
      </div>
    </div>
  );
};
export default NotFound;
