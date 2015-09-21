'use strict';

var expect = chai.expect;

describe('Student Unit Tests', function() {
	var modelModule;
	var imageModel;
	var imageCollectionModel;
	var nowDate = new Date();

    beforeEach(function() {
      modelModule = createModelModule();
      imageModel = new modelModule.ImageModel('/images/testa.png', nowDate, '', 0);
      imageCollectionModel = new modelModule.ImageCollectionModel();
    });

    afterEach(function() {
      modelModule = undefined;
      imageModel = undefined;
      imageCollectionModel = undefined;
    });

    it('should add a imageModel to imageCollectionModel', function() {
    	imageCollectionModel.addImageModel(imageModel);

    	expect(imageCollectionModel.imageModels[0], 'should be the same').to.be.equal(imageModel);
    	expect(imageCollectionModel.imageModels.length, 'should be 1').to.be.equal(1);
    });

    it('should add and remove listener of imageModel correctly', function() {
        var listener_fn = sinon.spy();
        var addListenerSpy = sinon.spy(imageModel, "addListener");
        var removeListenerSpy = sinon.spy(imageModel, "removeListener");

        imageModel.addListener(listener_fn);

        expect(addListenerSpy.calledWith(listener_fn), 'addListener should have been called with listener_fn.').to.be.true;
        expect(addListenerSpy.calledOnce, 'addListener should have been called once.').to.be.true;
        expect(imageModel.listeners.length, 'listeners.length should be one.').to.be.equal(1);

      
        imageModel.removeListener(listener_fn);

        expect(removeListenerSpy.calledWith(listener_fn), 'removeListener should have been called with listener_fn.').to.be.true;
        expect(removeListenerSpy.calledOnce, 'removeListener should have been called once.').to.be.true;
        expect(imageModel.listeners.length, 'listeners.length should be zero.').to.be.equal(0);

        imageModel.removeListener(listener_fn);
        expect(imageModel.listeners.length, 'listeners.length should still be zero.').to.be.equal(0);      
    });

    it('should notify listeners of imageModel when the metadata of imageModel gets changed', function() {
    	var listener_fn = sinon.spy();
    	var addListenerSpy = sinon.spy(imageModel, "addListener");

    	imageModel.addListener(listener_fn);
         
        imageModel.setRating(1);
        expect(addListenerSpy.calledOnce, 'addListener should have been called once.').to.be.true;

        imageModel.setCaption("2");
        expect(listener_fn.callCount, "should called once").to.be.equal(2);
    });

    it('should notify listeners of imageCollectionModel when a new imageModel is added or removed from imageCollectionModel', function() {
    	var listener_fn = sinon.spy();
    	var addListenerSpy = sinon.spy(imageCollectionModel, "addListener");
    	var removeListenerSpy = sinon.spy(imageCollectionModel, "removeListener");

    	imageCollectionModel.addListener(listener_fn);

        imageCollectionModel.addImageModel(imageModel);

        expect(addListenerSpy.calledOnce, 'addListener should have been called once.').to.be.true;
        expect(listener_fn.calledWith('IMAGE_ADDED_TO_COLLECTION_EVENT', imageCollectionModel, imageModel, sinon.match.any)).to.be.true;

        imageCollectionModel.removeImageModel(imageModel);

        expect(listener_fn.calledTwice, 'listener_fn should have been called once.').to.be.true;
        expect(listener_fn.calledWith('IMAGE_REMOVED_FROM_COLLECTION_EVENT', imageCollectionModel, imageModel, sinon.match.any)).to.be.true;
    });

    it('should notify listeners of imageCollectionModel when a imageModel gets changed', function() {
    	var listener_fn = sinon.spy();
    	var addListenerSpy = sinon.spy(imageCollectionModel, "addListener");

        imageCollectionModel.addListener(listener_fn);
        imageCollectionModel.addImageModel(imageModel);

        imageModel.setRating(1);
        expect(addListenerSpy.calledOnce, 'addListener should have been called once.').to.be.true;
    });

    it('should not notify any listener when the current imageModel did not change.', function() {
    	var listener_fn = sinon.spy();
        var addListenerSpy = sinon.spy(imageModel, "addListener");

        imageModel.addListener(listener_fn);        
    	imageModel.setRating(1);
    	imageModel.setRating(1);
    	imageModel.setRating(1);
        expect(addListenerSpy.calledOnce, 'addListener should have been called once.').to.be.true;
        expect(listener_fn.calledOnce, 'listener_fn should be called once').to.be.true;
    });
});
