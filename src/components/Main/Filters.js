import Filter from './Filter'
import { v4 as uuidv4 } from "uuid"
import { useState } from "react"
const Filters = ({ setFilter }) => {
  const factors = ["Today", "Priority", "Done", "All"];
  const [activeFactor, setActiveFactor] = useState("All");
  return ( 
      <ul className='filters mb-1 d-flex  gap-1d25 flex-wrap justify-content-center '>
        {factors.map((factor) => (
          <li key={uuidv4()} >
            <Filter 
              active={activeFactor === factor}
              setActiveFactor={setActiveFactor}
              factor={factor} 
              setFilter={setFilter}
              />
          </li>
        ))}
      </ul>
  );
}
 
export default Filters;