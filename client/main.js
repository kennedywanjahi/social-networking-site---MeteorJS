import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
Post = new Mongo.Collection('post');
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
})

Template.postList.helpers({
  posts: function(){
    return Post.find();
  }
})

Template.postForm.events({
  'submit form': function(event){
    event.preventDefault();
    var content = document.getElementById('content').value;
    console.log(content);
    Post.insert({content: content, created: new Date()});
    event.target.reset();
  }
})
