import React, { useState } from "react";
import { connect } from "react-redux";
import "./ItemModal.css";
import { addItem } from "../../redux/actions/itemActions";

const ItemModal = ({ addItem }) => {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      name: name,
    };
    //Add item via addItem action
    addItem(newItem);
    setModal(false);
  };

  return (
    <div className="ItemModal">
      <div className="container">
        <button onClick={() => setModal(!modal)} className="btn btn-secondary">
          {!modal ? "Add Item" : "Close Modal"}
        </button>

        {modal ? (
          <div className="modal">
            <form onSubmit={onSubmit}>
              <p>Add To Shopping List</p>
              <label htmlFor="item">Item</label>
              <input
                name="name"
                type="text"
                placeholder="Enter Item"
                onChange={(e) => setName(e.target.value)}
              />
              <button className="btn btn-primary">Submit</button>
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  item: state.item,
});

export default connect(mapStateToProps, { addItem })(ItemModal);
