require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const fs = require('fs');

// Подключаем модели
const User = require('./models/User');
const Room = require('./models/Room');
const Booking = require('./models/Booking');

// Подключаем роли
const roles = require('./constants/roles');

// Читаем db.json
const data = JSON.parse(fs.readFileSync('../frontend/src/db.json', 'utf-8'));

async function seed() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log(' Подключение к базе установлено');

    // Очистим коллекции перед заполнением
    await User.deleteMany();
    await Room.deleteMany();
    await Booking.deleteMany();
    console.log(' Коллекции очищены');

    // Добавляем пользователей
    const users = [];
    for (const u of data.users) {
      const passwordHash = await bcrypt.hash(u.password, 10);
      const newUser = await User.create({
        login: u.login,
        password: passwordHash,
        role: u.role_id ?? roles.USER,
      });
      users.push(newUser);
    }
    console.log(` Добавлено пользователей: ${users.length}`);

    // Добавляем комнаты
    const rooms = await Room.insertMany(
      data.rooms.map((r) => ({
        title: r.title,
        image_url: r.image_url,
        content: r.content,
        capacity: r.capacity,
        category: r.category,
        cost: r.cost,
      }))
    );
    console.log(`Добавлено номеров: ${rooms.length}`);

    console.log(' Инициализация завершена успешно!');
    process.exit(0);
  } catch (err) {
    console.error(' Ошибка при инициализации:', err);
    process.exit(1);
  }
}

seed();
