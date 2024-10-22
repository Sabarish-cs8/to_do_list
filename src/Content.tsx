import React from "react";
import ItemssList from "./ItemssList";
const Content = ({ items, handlecheck, handledelete }) => {
  return (
    <>
      {items.length ? (
        <ItemssList
          items={items}
          handlecheck={handlecheck}
          handledelete={handledelete}
        />
      ) : (
        <p>Your list is empty</p>
      )}
    </>
  );
};
export default Content;
