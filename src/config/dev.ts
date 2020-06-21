export default {
  port: process.env.PORT || 3001,
  auth: {
    saltRounds: 10,
    minute_expire: 43200, // 1 month
    minute_expire_token: 15,
  },
};
