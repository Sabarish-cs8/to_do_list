import React from "react";
import { FaTrashCan } from "react-icons/fa6";

const LineItem = ({ item, handlecheck, handledelete }) => {
  return (
    <li className="item" key={item.id}>
      <input
        type="checkbox"
        onChange={() => handlecheck(item.id)}
        checked={item.checked}
      />
      <label
        style={item.checked ? { textDecoration: "line-through" } : null}
        onDoubleClick={() => handlecheck(item.id)}
      >
        {item.item}
      </label>
      <FaTrashCan
        role="button"
        tabIndex="0"
        onClick={() => handledelete(item.id)}
        aria-label={`Delete ${item.item}`}
      />
    </li>
  );
};
export default LineItem;
