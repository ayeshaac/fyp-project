import "../styles/SearchBox.css";

function SearchBox() {
  return (
    <div className="search-box">
      <input type="text" placeholder="City (e.g. Sahiwal)" />
      <input type="text" placeholder="Vet, Clinic, Service" />
      <button>Search</button>
    </div>
  );
}

export default SearchBox;
