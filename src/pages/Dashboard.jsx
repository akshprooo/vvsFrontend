import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

const Dashboard = () => {
  const [voteHistory, setVoteHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { user } = useUserContext();
  const navigator = useNavigate();

  const fetchVoteHistory = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://vvsbackend.onrender.com/user/${user.vid}/votes`);
      const data = await response.json();
      
      if (response.ok) {
        setVoteHistory(data.votes);
      } else {
        setError(data.message || 'Failed to fetch vote history');
      }
    } catch (error) {
      console.error('Error fetching vote history:', error);
      setError('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user.loggedin || user.role !== 'voter') {
      navigator('/login');
      return;
    }
    
    fetchVoteHistory();
  }, [user, navigator]);

  const formatRole = (role) => {
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  return (
    <div className='min-h-screen p-4 bg-gray-50'>
      <div className='max-w-6xl mx-auto'>
        {/* User Overview Card */}
        <div className='bg-white rounded-lg shadow-md p-6 mb-6'>
          <div className='flex items-center space-x-4'>
            <div className='w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center'>
              <span className='text-white text-2xl font-bold'>
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </span>
            </div>
            <div className='flex-1'>
              <h1 className='text-3xl font-bold text-gray-800'>Welcome, {user.name}</h1>
              <p className='text-gray-600 mt-1'>
                <span className='font-medium'>Voter ID:</span> {user.vid}
              </p>
              <p className='text-gray-600'>
                <span className='font-medium'>Role:</span> {formatRole(user.role)}
              </p>
            </div>
            <div className='text-right'>
              <div className='bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium'>
                Active Voter
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
          <div className='bg-white rounded-lg shadow-md p-6'>
            <div className='flex items-center'>
              <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center'>
                <svg className='w-6 h-6 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
              </div>
              <div className='ml-4'>
                <h3 className='text-2xl font-bold text-gray-800'>{voteHistory.length}</h3>
                <p className='text-gray-600'>Elections Voted</p>
              </div>
            </div>
          </div>
          
          <div className='bg-white rounded-lg shadow-md p-6'>
            <div className='flex items-center'>
              <div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center'>
                <svg className='w-6 h-6 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                </svg>
              </div>
              <div className='ml-4'>
                <h3 className='text-2xl font-bold text-gray-800'>1</h3>
                <p className='text-gray-600'>Active Account</p>
              </div>
            </div>
          </div>
          
          <div className='bg-white rounded-lg shadow-md p-6'>
            <div className='flex items-center'>
              <div className='w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center'>
                <svg className='w-6 h-6 text-purple-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
              </div>
              <div className='ml-4'>
                <h3 className='text-2xl font-bold text-gray-800'>{formatRole(user.role)}</h3>
                <p className='text-gray-600'>Account Type</p>
              </div>
            </div>
          </div>
        </div>

        {/* Vote History Section */}
        <div className='bg-white rounded-lg shadow-md p-6'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-2xl font-bold text-gray-800'>Your Voting History</h2>
            <button
              onClick={fetchVoteHistory}
              className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors'
              disabled={loading}
            >
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>

          {loading ? (
            <div className='flex justify-center items-center py-12'>
              <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
              <span className='ml-3 text-gray-600'>Loading vote history...</span>
            </div>
          ) : error ? (
            <div className='text-center py-12'>
              <div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg className='w-8 h-8 text-red-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
              </div>
              <p className='text-red-600 font-medium'>{error}</p>
              <button
                onClick={fetchVoteHistory}
                className='mt-3 text-blue-600 hover:text-blue-800 font-medium'
              >
                Try Again
              </button>
            </div>
          ) : voteHistory.length === 0 ? (
            <div className='text-center py-12'>
              <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg className='w-8 h-8 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' />
                </svg>
              </div>
              <h3 className='text-lg font-medium text-gray-800 mb-2'>No votes cast yet</h3>
              <p className='text-gray-600 mb-4'>You haven't participated in any elections yet.</p>
              <button
                onClick={() => navigator('/vote')}
                className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors'
              >
                Go to Elections
              </button>
            </div>
          ) : (
            <div className='space-y-4'>
              {voteHistory.map((vote, index) => (
                <div key={index} className='border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors'>
                  <div className='flex items-center justify-between'>
                    <div className='flex-1'>
                      <h3 className='text-lg font-semibold text-gray-800'>{vote.electionName}</h3>
                      <p className='text-gray-600 mt-1'>
                        <span className='font-medium'>Your vote:</span> {vote.candidate}
                      </p>
                    </div>
                    <div className='text-right'>
                      <div className='bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium'>
                        Voted
                      </div>
                      <p className='text-xs text-gray-500 mt-1'>Election ID: {vote.electionId}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className='mt-6 flex flex-wrap gap-4'>
          <button
            onClick={() => navigator('/vote')}
            className='bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium'
          >
            View Available Elections
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;