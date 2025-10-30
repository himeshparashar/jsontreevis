interface SearchPanelProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
  searchResult: string;
}

export default function SearchPanel({
  searchQuery,
  onSearchChange,
  onSearch,
  searchResult,
}: SearchPanelProps) {
  return (
    <div className="mt-4">
      <label className="block text-sm font-semibold mb-2 text-gray-700">
        Search by Path:
      </label>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && onSearch()}
        placeholder="e.g., $.user.name or items[0]"
        className="w-full p-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <button
        onClick={onSearch}
        className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
      >
        🔍 Search
      </button>
      {searchResult && (
        <div
          className={`mt-2 p-2 rounded-lg text-sm text-center font-medium ${
            searchResult.includes('found!')
              ? 'bg-green-100 text-green-700 border border-green-400'
              : 'bg-yellow-100 text-yellow-700 border border-yellow-400'
          }`}
        >
          {searchResult}
        </div>
      )}
    </div>
  );
}
