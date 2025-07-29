import React, { useState } from "react";
import "./App.css";

function ContactForm() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.nom || !formData.email || !formData.message) {
      alert("Merci de remplir tous les champs.");
      return;
    }

    // Simulation d'envoi
    console.log("Message envoyé :", formData);
    setSubmitted(true);

    // Reset
    setFormData({ nom: "", email: "", message: "" });
  };

  return (
    <div className="contact-container">
      <h2>📨 Contactez-moi</h2>

      {submitted && <p className="success-message">Merci pour votre message !</p>}

      <form className="contact-form" onSubmit={handleSubmit}>
        <label>Nom</label>
        <input
          type="text"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          placeholder="Votre nom"
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Votre adresse email"
        />

        <label>Message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Votre message..."
          rows={5}
        />

        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}

export default ContactForm;
