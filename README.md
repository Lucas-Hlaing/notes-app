# Notes App

This is a simple Notes application built with React and Firebase, utilizing the Vite build tool. The app allows users to create, edit, and delete notes with a minimalist interface.

## Features

- **React for UI:** Built using React for efficient component-based development.
- **Firebase Firestore for backend:** Stores notes in a Firebase Firestore database for real-time updates across devices.
- **Markdown Support:** Notes are created using markdown, allowing rich text formatting.
- **Split View:** Utilizes a split-pane view to show both the list of notes and the editor side by side.
- **Responsive Design:** Designed with responsive styles for use on various screen sizes.

## Installation

1. Clone the repository:
   `git clone https://github.com/your-username/notes-app.git`

2. Install dependencies:
   Navigate into the project directory and install all dependencies:
   `cd notes-app`  
   `npm install`

3. Run the app:
   Start the development server with:
   `npm run dev`

## Technologies Used

- **React** (v17.0.2): The front-end library for building the user interface.
- **Firebase** (v10.13.1): Used for Firestore database and cloud functions.
- **Vite**: Fast development build tool for React projects.
- **React MDE**: Provides a Markdown editor for rich text formatting in notes.
- **CSS**: Custom styles for the layout and design of the app.

## File Structure

- **App.jsx**: Main React component rendering the application.
- **firebase.js**: Firebase configuration and Firestore setup.
- **style.css**: Custom CSS for the app’s layout and styling.

## License

This project is licensed under the MIT License.
