import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const features = [
  { icon: '🍜', title: 'Quality Cuisine', desc: 'Our dishes are crafted with passion using traditional recipes passed down through generations of master chefs.' },
  { icon: '🥬', title: 'Fresh Food', desc: 'We source only the freshest, locally-grown ingredients to ensure every bite bursts with natural flavors.' },
  { icon: '👨‍🍳', title: 'Friendly Staff', desc: 'Our warm and attentive team ensures your dining experience is nothing short of extraordinary.' },
  { icon: '📅', title: 'Easy Reservation', desc: 'Book your table in seconds with our seamless online reservation system. Your perfect evening awaits.' },
];

const Home = () => {
  const [meals, setMeals] = useState([]);
  const [chefs, setChefs] = useState([]);

  useEffect(() => {
    api.get('/api/meals').then(setMeals).catch(() => {});
    api.get('/api/chefs').then(setChefs).catch(() => {});
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero__overlay" />
        <div className="hero__content">
          <p className="hero__sub">Welcome to PryFry</p>
          <h1 className="hero__title">
            Exceptional Dining<br />
            <span className="gold">Experience</span>
          </h1>
          <p className="hero__desc">
            Where every dish tells a story and every meal becomes a cherished memory.
          </p>
          <div className="hero__btns">
            <Link to="/menu" className="btn btn--gold">View Menu</Link>
            <Link to="/book" className="btn btn--outline">Book a Table</Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="container">
          <div className="features__grid">
            {features.map((f, i) => (
              <div className="feature-card" key={i}>
                <div className="feature-card__icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="about">
        <div className="container">
          <div className="about__grid">
            <div className="about__images">
              <div className="about__img about__img--1" />
              <div className="about__img about__img--2" />
            </div>
            <div className="about__text">
              <p className="section-sub">Our Story</p>
              <h2 className="section-title">A Tradition of <span className="gold">Excellence</span></h2>
              <p>Since 2015, PryFry has been redefining the art of fine dining. Our philosophy is simple — use the finest ingredients, respect traditional cooking methods, and create dishes that spark joy.</p>
              <p>Every plate that leaves our kitchen carries the heart and soul of our culinary team, blending innovation with time-honored flavors.</p>
              <div className="about__stats">
                <div className="stat">
                  <span className="stat__num">10+</span>
                  <span className="stat__label">Years Experience</span>
                </div>
                <div className="stat">
                  <span className="stat__num">50+</span>
                  <span className="stat__label">Signature Dishes</span>
                </div>
                <div className="stat">
                  <span className="stat__num">15k+</span>
                  <span className="stat__label">Happy Guests</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Dishes */}
      <section className="popular">
        <div className="container">
          <p className="section-sub center">Our Menu</p>
          <h2 className="section-title center">Popular <span className="gold">Dishes</span></h2>
          <div className="dishes-grid">
            {(meals.length > 0 ? meals.slice(0, 6) : [
              { id: 1, name: 'Grilled Salmon', price: 24.99, description: 'Fresh Atlantic salmon with herbs', image: '/images/dish1.jpg' },
              { id: 2, name: 'Truffle Risotto', price: 19.99, description: 'Creamy arborio rice with black truffle', image: '/images/dish2.jpg' },
              { id: 3, name: 'Wagyu Steak', price: 45.99, description: 'Premium wagyu beef, perfectly seared', image: '/images/dish3.jpg' },
              { id: 4, name: 'Lobster Bisque', price: 16.99, description: 'Rich and creamy lobster soup', image: '/images/dish4.jpg' },
              { id: 5, name: 'Duck Confit', price: 28.99, description: 'Slow-cooked duck leg, crispy skin', image: '/images/dish5.jpg' },
              { id: 6, name: 'Chocolate Fondant', price: 12.99, description: 'Warm molten chocolate cake', image: '/images/dish6.jpg' },
            ]).map(meal => (
              <div className="dish-card" key={meal.id}>
                <div className="dish-card__img" style={{backgroundImage: meal.image ? `url(${meal.image})` : 'none'}} />
                <div className="dish-card__body">
                  <div className="dish-card__header">
                    <h3>{meal.name}</h3>
                    <span className="dish-card__price">${meal.price}</span>
                  </div>
                  <p>{meal.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="center mt-4">
            <Link to="/menu" className="btn btn--gold">Full Menu</Link>
          </div>
        </div>
      </section>

      {/* Chefs Preview */}
      <section className="chefs-preview">
        <div className="container">
          <p className="section-sub center">Meet Our Team</p>
          <h2 className="section-title center">Our <span className="gold">Chefs</span></h2>
          <div className="chefs-grid">
            {(chefs.length > 0 ? chefs.slice(0, 4) : [
              { id: 1, name: 'Chef Marco', subtitle: 'Head Chef', image: '/images/chef1.jpg' },
              { id: 2, name: 'Chef Priya', subtitle: 'Pastry Chef', image: '/images/chef2.jpg' },
              { id: 3, name: 'Chef Akira', subtitle: 'Sous Chef', image: '/images/chef3.jpg' },
              { id: 4, name: 'Chef Elena', subtitle: 'Grill Master', image: '/images/chef4.jpg' },
            ]).map(chef => (
              <div className="chef-card" key={chef.id}>
                <div className="chef-card__img" style={{backgroundImage: chef.image ? `url(${chef.image})` : 'none'}} />
                <div className="chef-card__info">
                  <h3>{chef.name}</h3>
                  <p className="gold">{chef.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Reservation Banner */}
      <section className="cta">
        <div className="cta__overlay" />
        <div className="cta__content">
          <p className="section-sub">Reservation</p>
          <h2>Book Your Table <span className="gold">Today</span></h2>
          <p>Experience the magic of PryFry. Reserve your spot for an unforgettable evening of exquisite flavors and warm hospitality.</p>
          <Link to="/book" className="btn btn--gold btn--lg">Make a Reservation</Link>
        </div>
      </section>
    </>
  );
};

export default Home;
