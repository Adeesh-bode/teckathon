import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Footer, Thumbnail } from '../components';
import { useData } from '../hooks';

function Quizzes() {
  const { loading, error, data } = useData('topics');
  const [shuffledData, setShuffledData] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      const quizzes = data.filter((obj) => obj.noq !== 0);
      const comingSoonQuizzes = data.filter((obj) => obj.noq === 0);

      for (let i = quizzes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [quizzes[i], quizzes[j]] = [quizzes[j], quizzes[i]];
      }

      const shuffledArray = quizzes.concat(comingSoonQuizzes);
      setShuffledData(shuffledArray);
    }
  }, [data]);

  return (
    <>
      <div className="mx-auto mb-32 flex min-h-screen w-[90%] animate-reveal flex-col items-center">
        <h1 className="page-heading">Attempt Quizzes</h1>
        <h2> Yaha categories display kara object call karke</h2>    
      </div>
      <Footer />
    </>
  );
}

export default Quizzes;
