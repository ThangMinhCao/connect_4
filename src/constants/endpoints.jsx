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
  getFriendRequests: '/users/friendRequests',
  sendFriendRequest: '/users/sendFriendRequest',
  acceptFriendRequest: '/users/acceptFriendRequest',
  cancelFriendRequest: '/users/cancelFriendRequest',
  rejectFriendRequest: '/users/rejectFriendRequest',
  unfriend: '/users/unfriend',
  playAMove: '/games/playAMove',
  startGame: '/games/startGame',
  getGame: '/games/getGame',
  getCurrentGames: '/games/current',
  getMessages: '/games/messages',
  sendMessages: '/games/sendMessage',
  getCurrentGamesInfo: '/games/currentGamesInfo'
}

export default ENDPOINTS;
