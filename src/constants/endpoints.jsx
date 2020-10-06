const ENDPOINTS = {
  index: 'http://localhost:4000/',
  signup: '/users/signup',
  login: '/users/login',
  logout: '/users/logout',
  createRoom: '/games/create',
  getRoomList: '/games',
  verifyUser: '/users/verifyUser',
  joinGame: '/games/join',
  getAllUsers: '/users',
  getFriendList: '/users/friendList',
  sendFriendRequest: '/users/sendFriendRequest',
  acceptFriendRequest: '/users/acceptFriendRequest',
  cancelFriendRequest: '/users/cancelFriendRequest',
  playAMove: '/games/playAMove',
  startGame: '/games/startGame',
  getGame: '/games/getGame',
  getCurrentGames: '/games/current',
}

export default ENDPOINTS;
