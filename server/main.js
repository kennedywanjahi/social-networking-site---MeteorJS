Post = new Mongo.Collection('post');
//call meteor methods
Meteor.methods({
  addPost: function(content){
    if (!Meteor.userId()) {
      throw new Meteor.Error('not authorized', 'please sign in');
    }
    var username = Meteor.user().username;
    Post.insert({
      content: content,
      created: new Date(),
      username: username
    });
  },
  follow: function(posts){
    console.log(posts.username);
        //retrieve the current user
        var user = Meteor.user();
        if (!user) {
          throw new Meteor.Error('not authorized', 'please sign in');
        }

        //you cant follow yourself
        if (user.username != posts.username){
          //you cant follow someone twice
          if (user.profile.follow.indexOf(posts.username) == -1) {
            Meteor.users.update(
                {_id: user._id},
                {$push: {'profile.follow': posts.username}
          });
          }
        }


  }
});
