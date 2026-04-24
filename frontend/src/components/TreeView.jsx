import React from "react";

function TreeView({ tree }) {
  return (
    <ul>
      {Object.keys(tree).map((key) => (
        <li key={key}>
          {key}
          <TreeView tree={tree[key]} />
        </li>
      ))}
    </ul>
  );
}

export default TreeView;