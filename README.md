# 📝 SurfeNotes App Challenge

This repository contains a note-taking application built as part of a coding challenge for **Surfe**. The app includes core features like saving and loading notes, as well as an @mention functionality. Additionally, it includes a login page and a theme selector for toggling between light and dark modes.

## 🚀 Features

### Core Features

- **Note-Taking**
  - A responsive text area for entering plain text notes.
  - Auto-save functionality: notes are saved automatically when typing stops.
  - Open note persist across page refreshes.
- **@Mention Support**
  - Type `@` in the text area to mention users.
  - Shows only 5 most relevant users as you type.
  - Mentions are styled uniquely for better visibility.

### Additional Features

- **Login Page**
  - Simple login screen for accessing the app.
- **Theme Selector**
  - Toggle between **light mode** and **dark mode** for an improved user experience.

## 🔧 Tech Stack

- **Frontend Framework:** React + NextJS + TypeScript
- **Styling:** Tailwind CSS
- **API Integration:** Fetch API
- **Additional Tools:** ContextAPI + CookieJS + uuid

## 🛠️ Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MateuszWasik/SurfeNotes.git
   cd SurfeNotes
   ```
2. Install dependecies:

   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

Open your browser at http://localhost:3000.

## 🌐 API Endpoints

The app interacts with a mock backend provided by Surfe:

- **POST** `https://challenge.surfe.com/SESSION/notes`
- **PUT** `https://challenge.surfe.com/SESSION/notes/{ID}`
- **GET** `https://challenge.surfe.com/SESSION/notes`
- **GET** `https://challenge.surfe.com/SESSION/notes/{ID}`
- **GET** `https://challenge.surfe.com/users`

## 📜 License

This project is open-source and available under the MIT License.
