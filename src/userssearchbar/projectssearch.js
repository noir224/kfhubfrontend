import React, {useState} from "react";
import searchicon from '../pics/searchicon.png';
import './projectsearchbar.css'

export default function ProjectsSearch(props) {
    const [query, setQuery] = useState('');
  
    const handleChange = (event) => {
      setQuery(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      props.onSearch(query);
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <div className="searchbarcontainer1-projects">
          <input
            className="searchbar-projects"
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search..."
          />
          <button type="submit" style={{ border: 'none', outline: 'none', background: 'transparent' }}>
            <img src={searchicon} alt="Button Image" className="buttonimg-projects" />
          </button>
        </div>
      </form>
    );
  }