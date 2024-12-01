// Role-User
Role.hasMany(User, {
  foreignKey: "role",
});
User.belongsTo(Role, {
  foreignKey: "role",
  as: "roles",
});
