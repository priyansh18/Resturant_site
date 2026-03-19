import { useState, useEffect } from 'react';
import api from '../utils/api';

const Menu = () => {
  const [meals, setMeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    api.get('/api/meals').then(setMeals).catch(() => {});
    api.get('/api/meal-categories').then(setCategories).catch(() => {});
  }, []);

  const filtered = activeCategory
    ? meals.filter(m => m.category?.id === activeCategory)
    : meals;

  const placeholder = [
    { id: 1, name: 'Grilled Salmon', price: 24.99, description: 'Fresh Atlantic salmon grilled with rosemary and lemon butter sauce', preparation_time: 25, people: 1, image: '/images/dish1.jpg' },
    { id: 2, name: 'Truffle Risotto', price: 19.99, description: 'Creamy arborio rice with shaved black truffle and parmesan', preparation_time: 30, people: 2, image: '/images/dish2.jpg' },
    { id: 3, name: 'Wagyu Steak', price: 45.99, description: 'Premium A5 wagyu beef, perfectly seared with seasonal vegetables', preparation_time: 35, people: 1, image: '/images/dish3.jpg' },
    { id: 4, name: 'Lobster Bisque', price: 16.99, description: 'Rich and velvety lobster soup with a hint of brandy', preparation_time: 20, people: 1, image: '/images/dish4.jpg' },
    { id: 5, name: 'Duck Confit', price: 28.99, description: 'Slow-cooked duck leg with crispy golden skin and fig compote', preparation_time: 40, people: 1, image: '/images/dish5.jpg' },
    { id: 6, name: 'Chocolate Fondant', price: 12.99, description: 'Warm molten chocolate cake with vanilla ice cream', preparation_time: 15, people: 2, image: '/images/dish6.jpg' },
    { id: 7, name: 'Caesar Salad', price: 11.99, description: 'Crisp romaine lettuce with house-made dressing and croutons', preparation_time: 10, people: 1, image: '/images/dish1.jpg' },
    { id: 8, name: 'Seafood Platter', price: 52.99, description: 'Fresh oysters, prawns, crab and lobster on ice', preparation_time: 20, people: 2, image: '/images/dish3.jpg' },
  ];

  const items = filtered.length > 0 ? filtered : placeholder;

  return (
    <>
      <section className="page-hero">
        <div className="page-hero__overlay" />
        <div className="page-hero__content">
          <p className="section-sub">Discover</p>
          <h1>Our <span className="gold">Menu</span></h1>
        </div>
      </section>

      <section className="menu-section">
        <div className="container">
          {categories.length > 0 && (
            <div className="menu-tabs">
              <button
                className={`menu-tab ${!activeCategory ? 'menu-tab--active' : ''}`}
                onClick={() => setActiveCategory(null)}
              >All</button>
              {categories.map(c => (
                <button
                  key={c.id}
                  className={`menu-tab ${activeCategory === c.id ? 'menu-tab--active' : ''}`}
                  onClick={() => setActiveCategory(c.id)}
                >{c.name}</button>
              ))}
            </div>
          )}

          <div className="menu-grid">
            {items.map(meal => (
              <div className="menu-item" key={meal.id}>
                <div className="menu-item__img" style={{backgroundImage: meal.image ? `url(${meal.image})` : 'none'}} />
                <div className="menu-item__body">
                  <div className="menu-item__top">
                    <h3>{meal.name}</h3>
                    <span className="menu-item__dots" />
                    <span className="menu-item__price">${meal.price}</span>
                  </div>
                  <p>{meal.description}</p>
                  <div className="menu-item__meta">
                    {meal.preparation_time && <span>⏱ {meal.preparation_time} min</span>}
                    {meal.people && <span>👥 Serves {meal.people}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Menu;
