# Movie & Series App

This React Native Expo application allows users to search for movies and TV series, providing detailed information such as season details, overviews, and more. It utilizes Expo, the TMDB API for movie and series data, Expo Router 2 for file-based routing, and React Native Reanimated for smooth animations.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- Movie and TV series search with detailed information.
- Smooth animations for enhanced user experience.
- Expo for rapid development and cross-platform compatibility.
- Expo Router 2 for file-based routing.
- Integration with TMDB API for movie and series data.

## Getting Started

Follow these steps to get the project up and running on your local development environment.

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Ronuhz/MovieApp.git
   cd MovieApp
   ```

2. Install project dependencies:

   ```bash
   yarn install
   ```

3. Create a `.env` file in the root directory with your TMDB API key:

   ```
   EXPO_PUBLIC_API_KEY=Bearer your_tmdb_api_key
   EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your clerk api key
   ```

4. Start the development server:

   ```bash
   yarn start
   ```

5. Scan the QR code with the Expo Go app on your mobile device or run it on an emulator.

## Configuration

Make sure to configure your `.env` file with the appropriate TMDB API key as mentioned in the installation steps.

## Project Structure

```
├── app/              # File-based routing root directory
├── assets/           # App assets, such as images and fonts
├── components/       # React components
├── constants/        # Constants (types, styles, etc.)
├── contexts/         # Custom contexts
├── .env.example      # Example .env file
├── .gitignore        # Git ignore rules
├── package.json      # Node.js dependencies and scripts
├── README.md         # Project documentation
└── ...               # Other project files and folders
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
