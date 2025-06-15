import React from 'react';

const FancyButton = ({ text = 'book appointment', onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative inline-block px-8 py-5 text-sm font-bold text-black border-2 border-blue-500 uppercase tracking-wider float-right transition-all duration-300 ease-in-out bg-transparent hover:bg-indigo-600 hover:text-white"
    >
      {/* ::before mimic */}
      <span
        style={{
          content: '""',
          position: 'absolute',
          top: '50%',
          left: '1.5em',
          width: '1.5625rem',
          height: '2px',
          backgroundColor: 'rgb(98, 98, 240)',
          transform: 'translateY(-50%)',
          transition: 'background 0.3s linear, width 0.3s linear',
          zIndex: 10,
        }}
      />

      {/* Button Text */}
      <span className="block pl-8 text-left text-[1.125em] leading-[1.33333em] transition-all duration-300 ease-in-out group-hover:pl-6">
        {text}
      </span>

      {/* Top Key */}
      <span className="absolute left-[0.625rem] top-[-2px] h-[2px] w-[1.5625rem] bg-gray-200 transition-all duration-500 ease-out group-hover:left-[-2px] group-hover:w-0" />

      {/* Bottom Key 1 */}
      <span className="absolute right-[1.875rem] bottom-[-2px] h-[2px] w-[1.5625rem] bg-gray-200 transition-all duration-500 ease-out group-hover:right-0 group-hover:w-0" />

      {/* Bottom Key 2 */}
      <span className="absolute right-[0.625rem] bottom-[-2px] h-[2px] w-[0.625rem] bg-gray-200 transition-all duration-500 ease-out group-hover:right-0 group-hover:w-0" />
    </button>
  );
};

export default FancyButton;
