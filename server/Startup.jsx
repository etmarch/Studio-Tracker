

Meteor.startup(() => {

    Meteor.call('activateMailman', true);

    if (Contracts.find().count() < 1) {
        MongoConfig.setKey('lastActiveId', null);
        MongoConfig.setKey('isCurrentlyLive', false);
    }

    /* Just Sample Code Testing a background job on the server
     let saidCont = Contracts.findOne();
     Meteor.setInterval(()=>{
     Contracts.update(saidCont._id, {$inc: {currentHours: 1}});
     }, 5000);*/
});