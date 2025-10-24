module.exports = function (booking) {
  return {
    id: booking._id,
    roomId: booking.roomId?._id || booking.roomId || null,
    userId: booking.userId?._id || booking.userId || null,
  };
};
