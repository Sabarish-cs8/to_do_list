import "./styles.css";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import AddItem from "./AddItem";
import SearchItem from "./SearchItem";
import apiRequest from "./apiRequest";

export default function App() {
  const API_URL = "http://localhost:3500";
  const [items, setItems] = useState([]);

  const [newItem, setNewItem] = useState("");

  const [search, setSearch] = useState("");

  const [fetchError, setfetchError] = useState(null);

  const [isloading, setisloading] = useState(true);

  useEffect(() => {
    //async try and catch method
    //JSON.parse(localStorage.getItem("todo_list"));
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Data not Received");
        const listitems = await response.json();
        setItems(listitems);
        setfetchError(null);
      } catch (err) {
        setfetchError(err.messsage);
      } finally {
        setisloading(false);
      }
    };
    setTimeout(() => {
      (async () => await fetchItems())();
    }, 2000);
  }, []);

  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const addNewItem = { id, checked: false, item };
    const listitems = [...items, addNewItem];
    setItems(listitems);
    // localStorage.setItem("todo_list", JSON.stringify(listitems));

    const postOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addNewItem),
    };
    const result = await apiRequest(API_URL, postOption);
    if (result) setfetchError(result);
  };

  const handlecheck = async (id) => {
    const listitems = items.map((item) =>
      item.id == id ? { ...item, checked: !item.checked } : item
    );
    setItems(listitems);
    //  localStorage.setItem("todo_list", JSON.stringify(listitems));

    const myItem = listitems.filter((item) => item.id == id);
    const updateOption = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checked: myItem[0].checked }),
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOption);
    if (result) setfetchError(result);
  };
  const handledelete = async (id) => {
    const listitems = items.filter((item) => item.id !== id);
    setItems(listitems);
    //  localStorage.setItem("todo_list", JSON.stringify(listitems));
    const deleteOption = { method: "DELETE" };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOption);
    if (result) setfetchError(result);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    console.log(newItem);
    addItem(newItem);
    setNewItem("");
  };

  return (
    <div className="App">
      <Header />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem search={search} setSearch={setSearch} />

      <main>
        {isloading && <p>Loading items..</p>}
        {fetchError && <p>{`Error: ${fetchError}`}</p>}
        {!isloading && fetchError && (
          <Content
            items={items.filter((item) =>
              item.item.toLowerCase().includes(search.toLowerCase())
            )}
            handlecheck={handlecheck}
            handledelete={handledelete}
          />
        )}
      </main>
      <Footer length={items.length} />
    </div>
  );
}
