import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
Post = new Mongo.Collection('post');
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
})

Template.postList.helpers({
  posts: function(){
    return Post.find({}, {sort: {created: -1}});
  }
});
Template.postList.events({
  'click .follow-link': function(event){
    event.preventDefault();


    Meteor.call('follow', this);
  }
});

Template.postForm.events({
  'submit form': function(event){
    event.preventDefault();
    var content = document.getElementById('content').value;
    //call meteor methods
    Meteor.call('addPost', content);
    event.target.reset();
  }
});
Template.profileArea.helpers({
  following: function(){
    var user = Meteor.user();
    return user.profile.follow;
  },
  followers: function(){
    var user = Meteor.user();
    var followers = Meteor.users.find({'profile.follow': {$in: [user.username]}});
    return followers.fetch();

  }
})
