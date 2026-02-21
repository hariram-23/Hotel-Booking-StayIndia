import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [location, setLocation] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ location, minPrice, maxPrice });
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        placeholder="Search by location..."
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="input"
        style={styles.input}
      />
      <input
        type="number"
        placeholder="Min price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        className="input"
        style={styles.inputSmall}
      />
      <input
        type="number"
        placeholder="Max price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="input"
        style={styles.inputSmall}
      />
      <button type="submit" className="btn btn-primary">
        Search
      </button>
    </form>
  );
}

const styles = {
  form: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
    marginBottom: '32px'
  },
  input: {
    flex: '1 1 300px'
  },
  inputSmall: {
    flex: '0 1 120px'
  }
};
