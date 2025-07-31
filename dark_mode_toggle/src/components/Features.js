import React from "react";

function Features() {
  const features = ["Rapide", "Sûr", "Facile à utiliser"];

  return (
    <section className="features">
      <h3>Fonctionnalités clés :</h3>
      <ul>
        {features.map((item, index) => (
          <li key={index}>✅ {item}</li>
        ))}
      </ul>
    </section>
  );
}

export default Features;
