import React from 'react';
import IntroAnimation from './components/IntroAnimation';

const Home = () => {
  return (
    <>
      <IntroAnimation />
      <div className="site-container">
        <section id="presentation-personnelle" className="dynamic-section">
          <h2 className="section-title">Je me présente</h2>
          <div className="section-content">
            <p>
              Salut, je me présente Gras-Calvet Fernand 46 ans, actuellement étudiant à l’École 42...
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
