

Meteor.startup(() => {

    Meteor.call('activateMailman', true);

    MongoConfig.setKey('lastActiveId', null);
    MongoConfig.getKey('isCurrentlyLive', false);

    /* Just Sample Code Testing a background job on the server
     let saidCont = Contracts.findOne();
     Meteor.setInterval(()=>{
     Contracts.update(saidCont._id, {$inc: {currentHours: 1}});
     }, 5000);*/
});