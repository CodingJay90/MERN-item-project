import React, { useEffect, useState } from "react";
import "./ShoppingList.css";
import { connect } from 'react-redux'
import { getItems, deleteItem } from '../../redux/actions/itemActions'
import PropTypes from 'prop-types'

const ShoppingList = (props) => {

  const onDeleteClick = (id) => {
    props.deleteItem(id)
    console.log(id)
  };

  useEffect(() => {
    props.getItems()
  }, [])

  const { items } = props.item

  return (
    <div className="ShoppingList">
      <div className="container">
        {items.map(({ name, _id }) => {
          return (
            <div key={_id} className="list">
              <span>{name}</span>
              <button className="btn btn-danger" onClick={() => onDeleteClick(_id)}>
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  item: state.item
})

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);








