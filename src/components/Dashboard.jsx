import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const navigate = useNavigate();
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        const restaurantId = localStorage.getItem('restaurantId');
        if (!restaurantId) {
            navigate('/');
        } else {
            // Fetch menu items from the API
            axios.get(`https://quickmenu.onrender.com/auth/restaurant/${restaurantId}`)
                .then((response) => {
                    setMenu(response.data.menu);
                })
                .catch((error) => {
                    console.error('Error fetching menu:', error);
                });
        }
    }, [navigate]);

    const handleCategoryChange = (event, categoryIndex) => {
        const updatedMenu = [...menu];
        updatedMenu[categoryIndex].category = event.target.value;
        setMenu(updatedMenu);
    };

    const handleItemChange = (event, categoryIndex, itemIndex) => {
        const updatedMenu = [...menu];
        updatedMenu[categoryIndex].items[itemIndex][event.target.name] = event.target.value;
        setMenu(updatedMenu);
    };

    const addCategory = () => {
        const updatedMenu = [...menu, { category: '', items: [{ name: '', cost: 0 }] }];
        setMenu(updatedMenu);
    };

    const addItem = (categoryIndex) => {
        const updatedMenu = [...menu];
        updatedMenu[categoryIndex].items.push({ name: '', cost: 0 });
        setMenu(updatedMenu);
    };

    const deleteCategory = (categoryIndex) => {
        const updatedMenu = [...menu];
        updatedMenu.splice(categoryIndex, 1);
        setMenu(updatedMenu);
    };

    const deleteItem = (categoryIndex, itemIndex) => {
        const updatedMenu = [...menu];
        updatedMenu[categoryIndex].items.splice(itemIndex, 1);
        setMenu(updatedMenu);
    };

    const saveMenu = async () => {
        console.log('Updated Menu:', menu);
        try {
            const restaurantId = localStorage.getItem('restaurantId');
            const response = await axios.post(`https://quickmenu.onrender.com/auth/update-menu/${restaurantId}`, { menu });
            if (response.status === 200) {
                console.log('Menu updated successfully');
                alert('Menu updated successfully');
            } else {
                console.log('Menu update failed');
                alert('Menu update failed');
            }
        } catch (error) {
            console.error('Error updating menu:', error);
            alert('Error updating menu:', error);
        }

    };

    const handleLogout = () => {
        localStorage.removeItem('restaurantId');
        navigate('/');
    };


    return (
        <div className="max-w-screen-md mx-auto p-4">
            <h1 className="text-2xl text-center font-bold mb-5">Dashboard</h1>
            {menu.map((category, categoryIndex) => (
                <div key={categoryIndex} className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <input
                            type="text"
                            placeholder="Category"
                            value={category.category}
                            onChange={(e) => handleCategoryChange(e, categoryIndex)}
                            className="w-1/2 py-1 px-2 border text-white rounded focus:outline-none focus:border-blue-500 bg-purple-500"
                        />
                        <button
                            onClick={() => deleteCategory(categoryIndex)}
                            className="text-red-500 hover:text-red-700 focus:outline-none"
                        >
                            <i className="fas fa-trash"></i>
                        </button>
                    </div>
                    {category.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex justify-between items-center">
                            <div className="flex">
                                <input
                                    type="text"
                                    placeholder="Item Name"
                                    name="name"
                                    value={item.name}
                                    onChange={(e) => handleItemChange(e, categoryIndex, itemIndex)}
                                    className="w-1/2 py-1 px-2 border rounded focus:outline-none focus:border-blue-500"
                                />
                                <input
                                    type="number"
                                    placeholder="Item Cost"
                                    name="cost"
                                    value={item.cost}
                                    onChange={(e) => handleItemChange(e, categoryIndex, itemIndex)}
                                    className="w-1/4 py-1 px-2 ml-2 border rounded focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <button
                                onClick={() => deleteItem(categoryIndex, itemIndex)}
                                className="text-red-500 hover:text-red-700 focus:outline-none"
                            >
                                <i className="fas fa-trash"></i> {/* Font Awesome delete icon */}
                            </button>
                        </div>
                    ))}
                    <button
                        onClick={() => addItem(categoryIndex)}
                        className="mt-2 text-blue-500 hover:text-blue-700 focus:outline-none"
                    >
                        Add Item
                    </button>
                </div>
            ))}
            <button onClick={addCategory} className="mt-4 text-blue-500 hover:text-blue-700 focus:outline-none">
                Add Category
            </button>
            <button onClick={saveMenu} className="mt-4 ml-4 bg-blue-500 text-white hover:bg-blue-700 px-4 py-2 rounded">
                Save Menu
            </button>
            <br /><br />
            <button onClick={handleLogout} className="mt-4 mx-auto bg-blue-500 text-white hover:bg-blue-700 px-4 py-2 rounded">
                Logout
            </button>
        </div>
    );
};

export default Dashboard;
