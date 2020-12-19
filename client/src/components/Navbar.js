import React from 'react'
import RegisterModal from './auth/registerModal/RegisterModal'

const Navbar = () => {
    return (
        <div className="Navbar">
            <nav>
                <ul><li>ShoppingList</li></ul>
                <ul><li><RegisterModal /></li></ul>
            </nav>
        </div>
    )
}

export default Navbar
