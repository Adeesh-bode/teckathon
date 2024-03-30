import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Footer, Thumbnail } from '../components';
import { useData } from '../hooks';

function Learn() {
  const { loading, error, data } = useData('videos');
  const [shuffledData, setShuffledData] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      const shuffledArray = [...data];
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
      }
      setShuffledData(shuffledArray);
    }
  }, [data]);
  return (
    <>
      <div className="mx-auto mb-32 flex min-h-screen w-[90%] animate-reveal flex-col items-center">
        <h1 className="page-heading">Learn from us</h1>
        <h2>Yaha Leaderboard</h2>
      </div>
      <Footer />
    </>
  );
}

export default Learn;
