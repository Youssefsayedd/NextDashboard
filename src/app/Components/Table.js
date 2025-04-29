import { useState } from 'react';
import { useSelector } from 'react-redux';

const DataTable = () => {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [filterText, setFilterText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2); 

  
  const userData = useSelector((state) => state.UserData.users);

  
  const processedData = userData.map(user => ({
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
    age: user.age,
    state: user.address.state,
    role: user.role
  }));

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'role', header: 'Role' },
    { key: 'age', header: 'Age' },
    { key: 'state', header: 'State' }
  ];

  
  const filteredData = processedData.filter(row =>
    columns.some(col => 
      String(row[col.key]).toLowerCase().includes(filterText.toLowerCase())
    )
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0;
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];
    
    if (typeof aValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
  });

  
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const currentPageData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSort = columnKey => {
    if (sortColumn === columnKey) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  };

  return (
    <div className="w-full mx-auto bg-gradient-to-br from-[#1b3a4b]/40 to-[#162736]/60 backdrop-blur-lg rounded-xl p-4 border border-white/10 shadow-[0_0_15px_rgba(124,92,255,0.15)]">
      {/* Search and page size controls */}
      <div className="mb-4 flex flex-col sm:flex-row justify-between items-center gap-4">
       
        <input
          type="text"
          placeholder="Search users..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="w-full sm:w-auto px-4 py-2 rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/40
                     focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
        />
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="w-full sm:w-auto px-4 py-2 rounded-lg border border-white/20 bg-white/10 text-white
                     focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
        >
          <option className='text-gray-800' value={2}>2 per page</option>
          <option className='text-gray-800' value={4}>4 per page</option>
          <option className='text-gray-800' value={8}>8 per page</option>
          <option className='text-gray-800' value={userData.length}>Show All</option>
        </select>
      </div>

      {/* Table container */}
      <div className="overflow-x-auto rounded-lg max-h-[400px] w-full">
        <table className="w-full min-w-[600px] md:min-w-[800px] lg:min-w-[1000px]">
          <thead className="bg-white/10 sticky top-0">
            <tr>
              {columns.map(col => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className="px-4 py-3 text-left text-sm font-semibold text-white cursor-pointer
                             hover:bg-white/20 transition-colors"
                >
                  {col.header}
                  {sortColumn === col.key && (
                    <span className="ml-2">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((row, index) => (
              <tr
                key={index}
                className="hover:bg-white/5 transition-colors border-b border-white/10"
              >
                {columns.map(col => (
                  <td key={col.key} className="px-4 py-3 text-white/80">
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        <button
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-purple-500/30 disabled:opacity-30
                     disabled:cursor-not-allowed transition-all"
        >
          Previous
        </button>
        
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-4 py-2 rounded-lg transition-all ${
              currentPage === page
                ? 'bg-white/30 text-white shadow-lg'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {page}
          </button>
        ))}
        
        <button
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-purple-500/30 disabled:opacity-30
                     disabled:cursor-not-allowed transition-all"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTable;