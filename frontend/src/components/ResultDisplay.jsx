import React from "react";
import TreeView from "./TreeView";

function ResultDisplay({ data }) {
  return (
    <div className="results">
      
      <h2>Hierarchies</h2>

      {data.hierarchies.map((item, index) => (
        <div key={index} className="card">
          <p><strong>Root:</strong> {item.root}</p>

          {item.has_cycle ? (
            <p className="cycle">Cycle Detected 🔁</p>
          ) : (
            <>
              <p><strong>Depth:</strong> {item.depth}</p>
              <TreeView tree={item.tree} />
            </>
          )}
        </div>
      ))}

      <h2>Invalid Entries</h2>
      <p>{data.invalid_entries.join(", ") || "None"}</p>

      <h2>Duplicate Edges</h2>
      <p>{data.duplicate_edges.join(", ") || "None"}</p>

      <h2>Summary</h2>
      <p>Total Trees: {data.summary.total_trees}</p>
      <p>Total Cycles: {data.summary.total_cycles}</p>
      <p>Largest Tree Root: {data.summary.largest_tree_root}</p>
    </div>
  );
}

export default ResultDisplay;