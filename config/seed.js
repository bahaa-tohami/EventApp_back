import sequelize from "./database.js";
import dotenv from "dotenv";
import {User} from "../models/UserModel.js";
import {Event} from "../models/EventModel.js";
import {Participant} from "../models/GuestModel.js";
import {Notification} from "../models/NotificationModel.js";
import {Comment} from "../models/CommentModel.js";

dotenv.config();

const usersData = [
  {
    username: 'JeanDupont',
    email: 'jean.dupont@example.com',
    password_hash: 'hashed_password_jean',
    first_name: 'Jean',
    last_name: 'Dupont',
    role: 'admin',
    status: 'active'
  },
  {
    username: 'MarieCurie',
    email: 'marie.curie@example.com',
    password_hash: 'hashed_password_marie',
    first_name: 'Marie',
    last_name: 'Curie',
    role: 'user',
    status: 'active'
  },
  {
    username: 'PaulMartin',
    email: 'paul.martin@example.com',
    password_hash: 'hashed_password_paul',
    first_name: 'Paul',
    last_name: 'Martin',
    role: 'user',
    status: 'active'
  }
];

const eventsData = [
  {
    description: 'Conférence sur l\'innovation technologique.',
    date: '2024-09-15',
    time: '14:00:00',
    capacity: 100,
    is_private: false,
    created_by: 1,  // ID de JeanDupont
    title: 'Innovation Tech 2024',
    location: 'Paris, France'
  },
  {
    description: 'Atelier de physique pour les enfants.',
    date: '2024-10-20',
    time: '10:00:00',
    capacity: 30,
    is_private: true,
    created_by: 2,  // ID de MarieCurie
    title: 'Physique pour les petits',
    location: 'Lyon, France'
  },
  {
    description: 'Réunion des entrepreneurs de la région.',
    date: '2024-11-05',
    time: '09:00:00',
    capacity: 50,
    is_private: false,
    created_by: 3,  // ID de PaulMartin
    title: 'Entrepreneurs en action',
    location: 'Marseille, France'
  },
  {
    description: 'Séminaire sur la santé mentale au travail.',
    date: '2024-09-30',
    time: '13:00:00',
    capacity: 80,
    is_private: false,
    created_by: 1,  // ID de JeanDupont
    title: 'Santé mentale et travail',
    location: 'Toulouse, France'
  },
  {
    description: 'Concert de musique classique.',
    date: '2024-12-10',
    time: '19:00:00',
    capacity: 200,
    is_private: true,
    created_by: 2,  // ID de MarieCurie
    title: 'Nuit de la musique classique',
    location: 'Nice, France'
  },
  {
    description: 'Formation sur la cybersécurité.',
    date: '2024-09-25',
    time: '11:00:00',
    capacity: 40,
    is_private: false,
    created_by: 3,  // ID de PaulMartin
    title: 'Cybersécurité pour tous',
    location: 'Bordeaux, France'
  }
];

const participantsData = [
  {
    user_id: 1,  // JeanDupont
    event_id: 1, // Innovation Tech 2024
    status: 'accepted'
  },
  {
    user_id: 2,  // MarieCurie
    event_id: 1, // Innovation Tech 2024
    status: 'invited'
  },
  {
    user_id: 3,  // PaulMartin
    event_id: 2, // Physique pour les petits
    status: 'accepted'
  },
  {
    user_id: 1,  // JeanDupont
    event_id: 3, // Entrepreneurs en action
    status: 'declined'
  },
  {
    user_id: 2,  // MarieCurie
    event_id: 4, // Santé mentale et travail
    status: 'accepted'
  },
  {
    user_id: 3,  // PaulMartin
    event_id: 4, // Santé mentale et travail
    status: 'invited'
  }
];

const notificationsData = [
  {
    user_id: 1,  // JeanDupont
    event_id: 1, // Innovation Tech 2024
    message: 'Vous êtes invité à l\'événement Innovation Tech 2024.',
    type: 'invitation',
    is_read: false
  },
  {
    user_id: 2,  // MarieCurie
    event_id: 2, // Physique pour les petits
    message: 'L\'événement Physique pour les petits commence bientôt.',
    type: 'reminder',
    is_read: true
  },
  {
    user_id: 3,  // PaulMartin
    event_id: 3, // Entrepreneurs en action
    message: 'Nouveau lieu pour l\'événement Entrepreneurs en action.',
    type: 'update',
    is_read: false
  }
];

const commentsData = [
  {
    user_id: 1,  // JeanDupont
    event_id: 1, // Innovation Tech 2024
    content: 'Très bonne conférence, j\'ai appris beaucoup de choses.',
    rating: 5
  },
  {
    user_id: 2,  // MarieCurie
    event_id: 2, // Physique pour les petits
    content: 'Les enfants ont adoré l\'atelier, merci beaucoup!',
    rating: 4
  },
  {
    user_id: 3,  // PaulMartin
    event_id: 3, // Entrepreneurs en action
    content: 'Une belle occasion de réseauter avec d\'autres entrepreneurs.',
    rating: 4
  },
  {
    user_id: 1,  // JeanDupont
    event_id: 4, // Santé mentale et travail
    content: 'Un sujet très pertinent, bien traité.',
    rating: 5
  },
  {
    user_id: 2,  // MarieCurie
    event_id: 5, // Nuit de la musique classique
    content: 'Une soirée magnifique, des performances exceptionnelles.',
    rating: 5
  }
];

async function seedDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base de données réussie.');

    

     // Vérifier si la table User est vide
     const countUser = await User.count();
     if (countUser === 0) {
        await User.bulkCreate(usersData);
        console.log('Données des utilisateurs insérées.');
     }

     // Vérifier si la table Event est vide
     const countEvent = await Event.count();
     if (countEvent === 0) {
        await Event.bulkCreate(eventsData);
        console.log('Données des événements insérées.');
     }

     // Vérifier si la table Participant est vide
     const countParticipant = await Participant.count();
     if (countParticipant === 0) {
        await Participant.bulkCreate(participantsData);
        console.log('Données des participants insérées.');
     }

     // Vérifier si la table Notification est vide
     const countNotification = await Notification.count();
     if (countNotification === 0) {
        await Notification.bulkCreate(notificationsData);
        console.log('Données des notifications insérées.');
     }

     // Vérifier si la table Comment est vide
     const countComment = await Comment.count();
     if (countComment === 0) {
        await Comment.bulkCreate(commentsData);
        console.log('Données des commentaires insérées.');
     }
  } catch (error) {
    console.error('Erreur lors de l\'insertion des données :', error);
  } finally {
    console.log('Données insérées avec succès.');
  }
}

export default seedDatabase;
