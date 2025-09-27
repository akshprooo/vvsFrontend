import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

const Vote = () => {

  const [elections, setElections] = useState([]);
  const [availableElections, setAvailableElections] = useState([]);
  const [dialog, setDialog] = useState({shown:false, data:{name:'', candidates:[], id: null}});
  const [voteVal, setVoteVal] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const {user} = useUserContext();
  const navigator = useNavigate();

  const fetchElections = async () => {
    try {
      const response = await fetch('https://vvsbackend.onrender.com/elections');
      const data = await response.json();
      setElections(data);
      filterAvailableElections(data, user.votes || []);
    } catch (error) {
      console.error('Error fetching elections:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAvailableElections = (allElections, userVotes) => {
    // Get election IDs that user has already voted in
    const votedElectionIds = userVotes.map(vote => vote.electionId);
    
    // Filter out elections that user has already voted in
    const available = allElections.filter(election => 
      !votedElectionIds.includes(election.id)
    );
    
    setAvailableElections(available);
  };

  const submitVote = async () => {
    if (!voteVal) {
      alert('Please select a candidate before submitting!');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://vvsbackend.onrender.com/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          electionId: dialog.data.id,
          candidate: voteVal,
          voterId: user.vid
        })
      });

      const result = await response.json();
      
      if (response.ok) {
        alert('Vote submitted successfully!');
        setDialog({shown:false, data:{name:'', candidates:[], id: null}});
        setVoteVal('');
        
        // Add the vote to user context immediately for better UX
        const newVote = { electionId: dialog.data.id, candidate: voteVal };
        const updatedUser = {
          ...user,
          votes: [...(user.votes || []), newVote]
        };
        
        // Re-filter available elections with updated vote history
        filterAvailableElections(elections, updatedUser.votes);
        
      } else {
        alert(result.message || 'Error submitting vote. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting vote:', error);
      alert('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openVoteDialog = (election) => {
    setDialog({shown: true, data: election});
    setVoteVal('');
  };

  const closeDialog = () => {
    setDialog({shown:false, data:{name:'', candidates:[], id: null}});
    setVoteVal('');
  };

  useEffect(()=>{
    if (!user.loggedin || user.role != 'voter'){
      navigator('/login');
    }
  }, [user, navigator]);
  
  useEffect(() => {
    fetchElections();
  }, []);

  // Update available elections when user votes change
  useEffect(() => {
    if (elections.length > 0 && user.votes) {
      filterAvailableElections(elections, user.votes);
    }
  }, [user.votes, elections]);

  return (
    <div className='min-h-screen p-4'>
      <div className='bg-zinc-700 p-10 rounded-md shadow-md'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-white text-3xl'>Available Elections</h1>
          <button
            onClick={() => navigator('/dashboard')}
            className='bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700'
          >
            View Dashboard
          </button>
        </div>

        {loading ? (
          <div className='flex justify-center items-center py-12'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-white'></div>
            <span className='ml-3 text-white'>Loading elections...</span>
          </div>
        ) : availableElections.length === 0 ? (
          <div className='text-center py-12'>
            <div className='w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4'>
              <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
            </div>
            <h3 className='text-xl font-medium text-white mb-2'>All elections completed!</h3>
            <p className='text-gray-300 mb-4'>You have voted in all available elections.</p>
            <button
              onClick={() => navigator('/dashboard')}
              className='bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700'
            >
              View Your Votes
            </button>
          </div>
        ) : (
          <div className='mt-4'>
            <div className='mb-4 text-gray-300'>
              <span className='font-medium'>{availableElections.length}</span> election{availableElections.length !== 1 ? 's' : ''} available • 
              <span className='font-medium ml-1'>{(user.votes || []).length}</span> already voted
            </div>
            
            {availableElections.map((elec, idx) => (
              <div key={elec.id} className='bg-zinc-300 p-4 rounded-md mb-3 flex justify-between items-center'>
                <div className='flex-1'>
                  <span className='text-xl font-medium'>{elec.name}</span>
                  <p className='text-gray-600 text-sm mt-1'>
                    {elec.candidates.length} candidates available
                  </p>
                </div>
                <button 
                  className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors' 
                  onClick={() => openVoteDialog(elec)}
                >
                  Vote Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {dialog.shown && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-md w-11/12 md:w-1/2 lg:w-1/3'>
            <h2 className='text-2xl mb-4'>{dialog.data.name}</h2>
            <p className='text-gray-600 mb-4'>Select your preferred candidate:</p>
            <div className='flex flex-col gap-3 max-h-60 overflow-y-auto'>
              {dialog.data.candidates.map((cand, idx) => (
                <div key={idx} className='flex items-center gap-3 p-2 rounded-md hover:bg-gray-50'>
                  <input 
                    type="radio" 
                    name="candidate" 
                    id={`cand-${idx}`} 
                    className='w-5 h-5' 
                    value={cand}
                    checked={voteVal === cand}
                    onChange={(e) => setVoteVal(e.target.value)}
                  />
                  <label htmlFor={`cand-${idx}`} className='text-lg cursor-pointer flex-1'>{cand}</label>
                </div>
              ))}
            </div>
            <div className='mt-6 flex justify-end gap-3'>
              <button 
                className='bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500' 
                onClick={closeDialog}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button 
                className={`px-4 py-2 rounded-md text-white ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-green-600 hover:bg-green-700'
                }`}
                onClick={submitVote}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Vote'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Vote