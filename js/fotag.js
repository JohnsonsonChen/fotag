'use strict';

// This should be your main point of entry for your app

window.addEventListener('load', function() {
    var LIST_VIEW = 'LIST_VIEW';
    var GRID_VIEW = 'GRID_VIEW';
    var RATING_CHANGE = 'RATING_CHANGE';

    console.log("loading");
    var modelModule = createModelModule();
    var viewModule = createViewModule();
    var appContainer = document.getElementById('app-container');

    console.log("finish creating mM and vM");
    console.log(modelModule);
    console.log(viewModule);
    var icView = new viewModule.ImageCollectionView();
    var storedImageCollection = modelModule.loadImageCollectionModel();
    var imgRendererFactory = new viewModule.ImageRendererFactory();
    console.log(storedImageCollection);
    var toolBar = new viewModule.Toolbar();
    // Attach the file chooser to the page. You can choose to put this elsewhere, and style as desired
    var fileChooser = new viewModule.FileChooser();
    icView.setImageCollectionModel(storedImageCollection);
    icView.setImageRendererFactory(imgRendererFactory);

    toolBar.addListener(function(toolbar, eventType, eventTime) {
        switch(eventType){
                    case GRID_VIEW:
                        icView.setToView(GRID_VIEW);
                        break;
                    case LIST_VIEW:
                        icView.setToView(LIST_VIEW);
                        break;
                    case RATING_CHANGE:
                        var rWanted = toolbar.getCurrentRatingWanted();
                        icView.ratingWanted = rWanted;
                        icView.showImages();
                        break;
                }
    });
    
    storedImageCollection.addListener(function() {
      modelModule.storeImageCollectionModel(storedImageCollection);  
    });

    fileChooser.addListener(function(fileChooser, files, eventDate) {
      _.each(
            files,
            function(file) {
                storedImageCollection.addImageModel(
                    new modelModule.ImageModel(
                        '/images/' + file.name,
                        file.lastModifiedDate,
                        '',
                        0
                    ));
            }
      );
    });

    appContainer.appendChild(toolBar.getElement());
    appContainer.appendChild(fileChooser.getElement());
    appContainer.appendChild(icView.getElement());

    // Demo that we can choose files and save to local storage. This can be replaced, later
    /*fileChooser.addListener(function(fileChooser, files, eventDate) {
        var imageCollectionModel = new modelModule.ImageCollectionModel();
        _.each(
            files,
            function(file) {
                var newDiv = document.createElement('div');
                var fileInfo = "File name: " + file.name + ", last modified: " + file.lastModifiedDate;
                newDiv.innerText = fileInfo;
                appContainer.appendChild(newDiv);
                imageCollectionModel.addImageModel(
                    new modelModule.ImageModel(
                        '/images/' + file.name,
                        file.lastModifiedDate,
                        '',
                        0
                    ));
            }
        );
        modelModule.storeImageCollectionModel(imageCollectionModel);
    });
    // Demo retrieval
    var storedImageCollection = modelModule.loadImageCollectionModel();
    var storedImageDiv = document.createElement('div');
    _.each(
        storedImageCollection.getImageModels(),
        function(imageModel) {
            var imageModelDiv = document.createElement('div');
            imageModelDiv.innerText = "ImageModel from storage: " + JSON.stringify(imageModel);
            storedImageDiv.appendChild(imageModelDiv);
        }
    );
    appContainer.appendChild(storedImageDiv);*/
});