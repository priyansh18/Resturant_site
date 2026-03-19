import { useState, useEffect } from 'react';
import api from '../utils/api';

const Chefs = () => {
  const [chefs, setChefs] = useState([]);

  useEffect(() => {
    api.get('/api/chefs').then(setChefs).catch(() => {});
  }, []);

  const items = chefs.length > 0 ? chefs : [
    { id: 1, name: 'Chef Marco Russo', subtitle: 'Head Chef & Founder', bio: 'With over 20 years of experience in Italian and French cuisine, Chef Marco brings passion and precision to every dish. Trained at Le Cordon Bleu, Paris.', image: '/images/chef1.jpg' },
    { id: 2, name: 'Chef Priya Sharma', subtitle: 'Pastry Chef', bio: 'A master of desserts and pastries, Chef Priya transforms simple ingredients into edible art. Her chocolate fondant is legendary among our guests.', image: '/images/chef2.jpg' },
    { id: 3, name: 'Chef Akira Tanaka', subtitle: 'Sous Chef', bio: 'Bringing the delicate art of Japanese cuisine to PryFry, Chef Akira specializes in fusion dishes that blend Eastern and Western flavors.', image: '/images/chef3.jpg' },
    { id: 4, name: 'Chef Elena Rodriguez', subtitle: 'Grill Master', bio: 'From perfectly seared steaks to smoky barbecue, Chef Elena knows fire like no other. Her wagyu preparation has earned multiple awards.', image: '/images/chef4.jpg' },
  ];

  return (
    <>
      <section className="page-hero">
        <div className="page-hero__overlay" />
        <div className="page-hero__content">
          <p className="section-sub">The Team</p>
          <h1>Our <span className="gold">Chefs</span></h1>
        </div>
      </section>

      <section className="chefs-section">
        <div className="container">
          <div className="chefs-detail-grid">
            {items.map(chef => (
              <div className="chef-detail-card" key={chef.id}>
                <div className="chef-detail-card__img" style={{backgroundImage: chef.image ? `url(${chef.image})` : 'none'}} />
                <div className="chef-detail-card__body">
                  <h3>{chef.name}</h3>
                  <p className="gold chef-detail-card__role">{chef.subtitle}</p>
                  <p className="chef-detail-card__bio">{chef.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Chefs;
