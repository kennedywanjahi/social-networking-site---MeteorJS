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
})

Template.postForm.events({
  'submit form': function(event){
    event.preventDefault();
    var content = document.getElementById('content').value;
    //call meteor methods
    Meteor.call('addPost', content);
    event.target.reset();
  }
})
