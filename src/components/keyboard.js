const keysLayout = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace'],
];


const BackspaceSVG = () => (
  <svg
    fill="#3b82f6"
    height="1.2rem"
    width="1.2rem"
    version="1.1"
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 44.18 44.18"
    xmlSpace="preserve"
    stroke="#3b82f6"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <g>
        <path d="M10.625,5.09L0,22.09l10.625,17H44.18v-34H10.625z M42.18,37.09H11.734l-9.375-15l9.375-15H42.18V37.09z"></path>
        <polygon points="18.887,30.797 26.18,23.504 33.473,30.797 34.887,29.383 27.594,22.09 34.887,14.797 33.473,13.383 26.18,20.676 18.887,13.383 17.473,14.797 24.766,22.09 17.473,29.383 "></polygon>
      </g>
    </g>
  </svg>
);

const Keyboard = ({}) => {
  const handleKeyClick = (key) => {
    var code=0;
    if(key==='Backspace') code=8;
    else if(key==='Enter') code=13;
    else code=key.charCodeAt(0)-32;

    const keydownEvent = new KeyboardEvent('keydown', { key: key, keyCode: code });
    window.dispatchEvent(keydownEvent);
  }
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg flex flex-row p-1 sm:p-3 sm:gap-2">
      <div className="">
        {keysLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center space-x-2 m-1">
            {row.map((key, keyIndex) => (
              <button
                key={keyIndex}
                onClick={() => handleKeyClick(key)}
                className="px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-base uppercase font-semibold rounded-sm sm:rounded-lg shadow-md bg-gray-700 text-blue-500 hover:bg-gray-600 focus:outline-none"
              >
                {key==='Backspace' ? <BackspaceSVG /> : key}
              </button>
            ))}
          </div>
        ))}

      </div>
      <div className="p-2"><ColorButtons /></div>
    </div>
  )
}


const ColorButtons = ({}) => {

  const handleColor = (color) => {
    const keydownEvent = new KeyboardEvent('keydown', { key: color });
    window.dispatchEvent(keydownEvent);
  }

  return(
    <div className="flex flex-col gap-2">
      <button onClick={() => handleColor('green')}><div className="p-2 sm:p-4 rounded-sm sm:rounded-md shadow-md bg-[#4ADE80] w-4 sm:w-8"></div></button>
      <button onClick={() => handleColor('yellow')}><div className="p-2 sm:p-4 rounded-sm sm:rounded-md shadow-md bg-[#FDE047] w-4 sm:w-8"></div></button>
      <button onClick={() => handleColor('gray')}><div className="p-2 sm:p-4 rounded-sm sm:rounded-md shadow-md bg-[#9CA3AF] w-4 sm:w-8"></div></button>
    </div>
  )
}

export default Keyboard;