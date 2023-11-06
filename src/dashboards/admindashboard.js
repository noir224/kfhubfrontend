import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.css'; // import the styles
import dots from '../pics/dots.png';
import './admindashboard.css'
import Menu from '../template/nourmenu';
import NavBar from "../template/nournavbar";
import RoundedBackgroundMain from '../template/nourRounded';
import ProjectsSearch from '../userssearchbar/projectssearch'


const Item = ({ title, description, list }) => {
  const navigate = useNavigate();
  return (
    <div className="item-projects"
      style={{
        display: 'flex',
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius: '25px',
        width: '233px',
        height: '220px',
        flexDirection: 'column'
      }}
      onClick={() => navigate(`/projects/${title}`)}
    >
      <h3>{title}</h3>
      <p>{description}</p>
      <img src={dots} alt={title} class="dots-icon" />


    </div>
  );
};

// <button onClick={() => handleEditProject(project)}>Edit</button>

const ItemsGrid = ({ items }) => {
  return (
    <div className="items-grid-projects">
      {items ? (
        items.length > 0 ? (
          items.map(item => (
            <Item
              key={item.id}
              title={item.name}
              description={item.description}
            />
          ))
        ) : (
          <p>You don't have any assigned projects</p>
        )
      ) : (
        <p>Loading projects...</p>
      )}
    </div>
  );
};


const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        let data = {
          email: localStorage.getItem('email')
        };
        const response = await axios.get(
          "http://localhost:8080/api/v1/projects/list", {
          params: { email: localStorage.getItem('email') },
          headers: {
            //'Content-Type': 'application/json',
            Authorization: localStorage.getItem('token')
          }
        });
        //

        // Set the fetched projects to state
        setProjects(response.data.data);
        //console.log(projects[0].id);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  const handleEditProject = async (projectds) => {

    try {
      const config = {
        headers: {
          Authorization: localStorage.getItem('token')
        },
      };

      // Fetch project details from backend API using Axios
      const response = await axios.get(`http://localhost:8080/api/v1/user/getByEmail?emails=${projectds.usersEmails}`, {

        headers: {
          Authorization: localStorage.getItem('token')

        }
      });
      const userss = response.data.data;
      navigate(`/editproject/${projectds.name}`, { state: { projectd: projectds, usersss: userss } });
    } catch (error) {
      console.error('Error fetching project details:', error);
    }



  };

  return (
    <div className="screen-projects">
      <NavBar />
      <div>
        <Menu />
        <RoundedBackgroundMain>
          <ProjectsSearch />
          <ItemsGrid items={projects} />
        </RoundedBackgroundMain>
      </div>

    </div>
  );
};

export default ProjectList;
