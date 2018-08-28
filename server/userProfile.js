Accounts.onCreateUser(function(options, user){
  //making sure that the user a profile object
  user.profile = user.profile ||{};

  //initiating follow to keep track of followers
  user.profile.follow = [];

  return user;
});
