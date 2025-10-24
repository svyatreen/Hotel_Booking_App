module.exports = function (room) {
  return {
    id: room._id,
    title: room.title,
    imageUrl: room.image_url,
    content: room.content,
    capacity: room.capacity,
    category: room.category,
    cost: room.cost,
  };
};
