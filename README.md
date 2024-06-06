# Face Recognition Authentication App

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation and Setup](#installation-and-setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [Authors](#authors)
- [License](#license)

## Project Overview

The Face Recognition Authentication App is a secure and user-friendly web application that leverages face recognition technology to authenticate users. The app provides a seamless user experience for signing up, logging in, and verifying identity using a webcam. The backend is built with Flask, while the frontend is developed using React.

## Features

- **User Registration**: Users can sign up by providing their username, email, password, and an image.
- **Face Verification**: After signing up, users can verify their identity by capturing an image using their webcam.
- **User Dashboard**: Upon successful verification, users are redirected to a personalized dashboard displaying their username and email.
- **Admin Dashboard**: Admins can view and manage user details.

## Technologies Used

### Backend

- Flask
- Flask-SQLAlchemy
- OpenCV
- SQLite

### Frontend

- React
- React Router DOM
- React Webcam
- Bootstrap

## Project Structure


## Installation and Setup

### Prerequisites

- Python 3.x
- Node.js and npm
- Git

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/ongaro09/face-recog-project.git
   cd face-recog-project
# Installation and Setup

## Prerequisites

- Python 3.x
- Node.js and npm
- Git

## Backend Setup

### Clone the repository:

```bash
git clone https://github.com/ongaro09/face-recog-project.git
cd face-recog-project

### Create and activate a virtual environment:
python3 -m venv venv
source venv/bin/activate


### Install the required Python packages:
pip install -r requirements.txt

### Set up the Flask application:

```
export FLASK_APP=run.py
flask db init
flask db migrate -m "Initial migration"
flask db upgrade

```
### Run the Flask server:

```
flask run

```