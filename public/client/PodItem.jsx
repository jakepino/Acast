import React from 'react';

function PodItem({ podEp, setEp }) {
  return (
    <ul onClick={() => setEp(podEp)} className='pod-items'>
      <li>{podEp.name}</li>
    </ul>
  );
}

export default PodItem;
