
const Table = ({wordsList}) => {

  return (
    <div className="">
      <div className="relative overflow-x-auto shadow-lg rounded-md border border-gray-300">

        <table className="w-full text-center font-serif">
          <thead className="text-white bg-gray-800 ">
            <tr>
              <th scope="col" className="px-3 py-3"> # </th>
              <th scope="col" className="px-3 py-3"> Best Words </th>
              <th scope="col" className="px-3 py-3"> Entropy </th>
              <th scope="col" className="px-3 py-3"> Relative Probability </th>
            </tr>
          </thead>

          <tbody>
            {wordsList.map((wordEntity, index) => (
              <tr className="bg-white border-b hover:bg-gray-200" key={index}>
                <td className="px-3 py-2 text-black">{index+1}</td>
                <td className="px-3 py-2 text-black">{wordEntity[0]}</td>
                <td className="px-3 py-2 text-black font-mono">{wordEntity[1].toFixed(3)}</td>
                <td className="px-3 py-2 text-black font-mono">{wordEntity[2].toFixed(5)}</td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  )
}



export default Table;