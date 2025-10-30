require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const fs = require('fs');

const User = require('./models/User');
const Room = require('./models/Room');
const Booking = require('./models/Booking');
const roles = require('./constants/roles');

const data = JSON.parse(fs.readFileSync('../frontend/src/db.json', 'utf-8'));

async function seed() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION);
    console.log(' Подключение к базе установлено');

    await User.deleteMany();
    await Room.deleteMany();
    await Booking.deleteMany();

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

    console.log(' Инициализация завершена успешно');
    process.exit(0);
  } catch (err) {
    console.error(' Ошибка при инициализации:', err);
    process.exit(1);
  }
}

seed();
