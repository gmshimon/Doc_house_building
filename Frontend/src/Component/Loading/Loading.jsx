import React from 'react';
import { DotLoader } from 'react-spinners';

const Loading = () => {
    return (
       <div className='h-screen flex justify-center items-center'>
        <DotLoader color='#0C453C' />
      </div>
    );
};

export default Loading;