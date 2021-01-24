import React from "react";
import "./App.css";

const TagsForm = props => {
  const [tags, setTags] = React.useState([]);
  const addTags = event => {
      if (event.key === "Enter" && event.target.value !== "") {
        setTags([...tags, event.target.value]);
        props.selectedTags([...tags, event.target.value]);
        event.target.value = "";
      }
  };
  return (
      <div className="tags-input">
          <ul>
              {tags.map((tag, index) => (
                  <li key={index}>
                      <span>{tag}</span>
                      <i className="material-icons"
                      ></i>
                  </li>
              ))}
          </ul>
          <input
              type="text"
              onKeyUp={event => addTags(event)}
              placeholder="Add a tag"
          />
      </div>
  );
};
export default TagsForm;
