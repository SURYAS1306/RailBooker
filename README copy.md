# Train Ticket Booking System 🚂

A modern, scalable train ticket booking system built with React, Node.js, and PostgreSQL. This application provides a seamless experience for booking train tickets online with real-time seat availability and secure payment processing.

## Features ✨

- 🔐 User authentication and authorization
- 🎫 Real-time train search and booking
- 💳 Secure payment processing
- 📱 Responsive design for all devices
- 🎯 Real-time seat availability tracking
- 📊 Booking history and management
- 🔄 Concurrent booking handling
- 🎨 Modern and intuitive UI

## Tech Stack 🛠️

- **Frontend:**
  - React 18
  - TypeScript
  - Tailwind CSS
  - Lucide Icons
  - Vite

- **Backend:**
  - Node.js
  - PostgreSQL
  - Express.js
  - TypeScript

- **Database:**
  - PostgreSQL with MVCC for concurrency control
  - UUID for primary keys
  - Optimized indexes for performance

## Database Schema 📊

The application uses a normalized database schema (3NF) with the following main entities:
- Users
- Trains
- Stations
- Routes
- Bookings
- Passengers
- Payments

For detailed schema information, check [database-design.md](docs/database-design.md).

## Concurrency Handling 🔄

The system handles concurrent bookings through:
- PostgreSQL MVCC (Multiversion Concurrency Control)
- Optimistic locking for seat availability
- Transaction isolation levels
- Automated seat inventory management via triggers
- Deadlock prevention strategies

## Getting Started 🚀

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/train-booking-system.git
   cd train-booking-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   # Create PostgreSQL database
   createdb train_booking

   # Run database migrations
   psql train_booking < src/db/schema.sql
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

## Environment Variables 🔑

Create a `.env` file with the following variables:
```env
# Database
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=train_booking
POSTGRES_USER=your_username
POSTGRES_PASSWORD=your_password

# Server
PORT=3000
NODE_ENV=development

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=24h
```

## API Documentation 📚

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - User login

### Trains
- GET `/api/trains` - List all trains
- GET `/api/trains/search` - Search trains by criteria
- GET `/api/trains/:id` - Get train details

### Bookings
- POST `/api/bookings` - Create new booking
- GET `/api/bookings/:id` - Get booking details
- PATCH `/api/bookings/:id` - Update booking status
- GET `/api/bookings/user/:userId` - Get user's bookings

### Payments
- POST `/api/payments` - Process payment
- GET `/api/payments/:bookingId` - Get payment status

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📝

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 🙏

- Icons by [Lucide](https://lucide.dev/)
- UI components inspired by [Tailwind UI](https://tailwindui.com/)