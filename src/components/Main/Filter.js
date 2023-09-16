
const Filter = ({active, setActiveFactor, factor, setFilter }) => {
  
  const handleActive = () => {
    setActiveFactor(factor)
    setFilter(factor)
  }

  return ( 
    <button onClick={handleActive} className={`filter ${active ? 'active' : ''}`}>
      {factor}
    </button>
  );
}

export default Filter;