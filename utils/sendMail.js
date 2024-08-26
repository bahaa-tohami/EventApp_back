import nodemailer from "nodemailer";

// Configurer le transporteur Nodemailer avec Mailtrap
const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS
    }
  });

/**
 * 
 * @param {string} to 
 * @param {string} subject 
 * @param {string} text 
 * @returns {Promise<void>}
 */  
export const sendEmail = async (to, subject, text) => {
    try {
      await transport.sendMail({
        from: '"Event Management" <no-reply@eventmanagement.com>', // expéditeur
        to: to, // destinataire
        subject: subject, // sujet
        text: text, // contenu du message
      });
      console.log('E-mail envoyé avec succès à', to);
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
      throw error;
    }
    
  };
