import React, { useState, useEffect } from 'react';
import './App.css';
import TagForm from './TagForm';

function App() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState([]);
  const [expand, setExpand] = useState([]);
  const [tag, searchTag] = useState(['']);

  const selectedTags = (tags) => console.log(tags);


  useEffect(() => {
    fetch("https://www.hatchways.io/api/assessment/students")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setStudents(result.students);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  useEffect(() => {
    setFilter(
      students.filter(student => {
        return student.firstName.toLowerCase().includes(search.toLowerCase())
          || student.lastName.toLowerCase().includes(search.toLowerCase());
      })
    )
  }, [search, students]);

  useEffect(() => {
    setFilter(
      students.filter(student => {
        return student.firstName.toLowerCase().includes(tag)
          || student.lastName.toLowerCase().includes(tag);
      })
    )
  }, [tag, students]);

  const toggleExpand = (id) => {
    if (expand.includes(id)) {
      setExpand(expand.filter(studentid => studentid !== id))
    } else {
      let newExpand = [...expand]
      newExpand.push(id)
      setExpand(newExpand)
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="main">

        <ul className="list">
        <form >
            <input className="name" 
              type="text"
              placeholder="Search by name"
              id="name-input"
              onChange={e => setSearch(e.target.value)}
            />
        </form>
        
          {filter.map(student => (
            <li className="student" key={student.id}>
              <img src={student.pic} alt="student"></img>
              <div className="student-info">
                <h1>{student.firstName}  {student.lastName}</h1>
                <p>Email: {student.email}</p>
                <p>Company: {student.company}</p>
                <p>Skill: {student.skill}</p>
                <p>Average: {(student.grades.reduce((a, b) => parseInt(b) + a, 0))
                  / (student.grades.map((grade) => grade).length)}%
                </p>

                {expand.includes(student.id) ? (
                  <ul className="grades">
                    {student.grades.map((grade, index) => <li key={grade.id}>Test {index + 1}: {grade}%</li>)}
                  </ul>) : null}

                  <TagForm selectedTags={selectedTags}/>
              </div>
              <button className="expand-btn" onClick={() => toggleExpand(student.id)}>{expand.includes(student.id) ? '-' : '+'}</button>
            </li>
          ))
          }
        </ul >
      </div>
    );

  }
}

export default App;
