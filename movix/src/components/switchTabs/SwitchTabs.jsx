import React, { useState } from 'react';
import './SwitchTabs.scss';

const SwitchTabs = ({ data, onTabChange }) => {
  const [selectedId, setSelectedId] = useState(0);
  const [leftPosition, setLeftPosition] = useState(2);

  const activeTabHandler = (index, item) => {
    setSelectedId(index);
    setLeftPosition(index * 100 + 2);
    onTabChange(item);
  };

  return (
    <div className='tabs'>
      {data.map((item, index) => (
        <span
          className={`tab-item ${selectedId === index ? 'active' : ''}`}
          key={index}
          onClick={() => activeTabHandler(index, item)}
        >
          {item}
        </span>
      ))}
      <span className='tab-bg' style={{ left: leftPosition }}></span>
    </div>
  );
};

export default SwitchTabs;
