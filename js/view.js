'use strict';


var removeNowView = function(el, viewName) {
    var classes = el.className.split(" ");
    el.className = _.without(classes, viewName).join(" ");
}

var enlargeImage = function(imageModel) {
    var eImage = document.getElementById("enlarge-image");
    eImage.style.display = 'block';
    var goBack = function() {
        eImage.removeEventListener(goBack);
        window.removeEventListener(goBack);
        eImage.style.display = 'none';
    }
    var img = document.getElementById('big-image');
    img.src = '.' + imageModel.getPath();
    eImage.addEventListener('click', goBack);
    window.addEventListener('keydown', goBack);
}

/**
 * A function that creates and returns all of the model classes and constants.
  */
function createViewModule() {

    var LIST_VIEW = 'LIST_VIEW';
    var GRID_VIEW = 'GRID_VIEW';
    var RATING_CHANGE = 'RATING_CHANGE';

    /**
     * An object representing a DOM element that will render the given ImageModel object.
     */
    var ImageRenderer = function(imageModel) {
        // TODO
        console.log("ImageRenderer");
        console.log(imageModel);
        var imageTemplate = document.getElementById('image-template');
        var setEle = document.importNode(imageTemplate.content,true);
        this.element = setEle.querySelector('.img');
        this.imageModel = imageModel;
        this.nowView = GRID_VIEW;
        switch(this.nowView) {
            case GRID_VIEW:
              removeNowView(this.element, 'img list');
              this.element.className = 'img grid';
              break;
            case LIST_VIEW:
              removeNowView(this.element, 'img grid');
              this.element.className = 'img list';
              break;
        }
        var imgs = this.element.querySelector('.images');
        imgs.src = '.' + this.imageModel.getPath();
        console.log("imgs.src: " + imgs.src);

        var imgCaption = this.element.querySelector('.image-caption');
        imgCaption.innerHTML = this.imageModel.getCaption();

        var imgName = this.element.querySelector('.image-name');
        imgName.innerHTML = imgs.src;

        var imgDate = this.element.querySelector('.image-date');
        var dateNow = new Date();
        var mon = dateNow.getUTCMonth() + 1;
        var day = dateNow.getUTCDate();
        var yr = dateNow.getUTCFullYear();
        imgDate.innerHTML = day + "/" + mon + "/" + yr;

        var imgRate = this.element.querySelectorAll('.image-rate');
        var nowRate = this.imageModel.getRating();
        for (var i = imgRate.length - 1; i >= 0; i--) {
          var r = 4 - i;
          if(r >= nowRate) {
            imgRate[i].style.color = "black";
            imgRate[i].innerHTML = "☆";
          }
          else {
            imgRate[i].innerHTML = "★";
            imgRate[i].style.color = "#F9D904";
          }
        }
        
        this.listenRating();
        this.listenEnlarge();
    };

    _.extend(ImageRenderer.prototype, {

        /**
         * Returns an element representing the ImageModel, which can be attached to the DOM
         * to display the ImageModel.
         */

        getElement: function() {
            // TODO
            return this.element;
        },

        /**
         * Returns the ImageModel represented by this ImageRenderer.
         */
        getImageModel: function() {
            // TODO
            return this.imageModel;
        },

        /**
         * Sets the ImageModel represented by this ImageRenderer, changing the element and its
         * contents as necessary.
         */
        setImageModel: function(imageModel) {
            // TODO
            this.imageModel = imageModel;
            switch(this.nowView) {
              case GRID_VIEW:
                removeNowView(this.element, 'img list');
                this.element.className = 'img grid';
                break;
              case LIST_VIEW:
                removeNowView(this.element, 'img grid');
                this.element.className = 'img list';
                break;
            }
            var img = this.element.querySelector('.images');
            img.src = '.' + this.imageModel.getPath();

            var imgCaption = this.element.querySelector('.image-caption');
            imgCaption.innerHTML = this.imageModel.getCaption();

            var imgName = this.element.querySelector('.image-name');
            imgNmae.innerHTML = img.src;

            var imgDate = this.element.querySelector('.image-date');
            var dateNow = new Date();
            var mon = dateNow.getUTCMonth() + 1;
            var day = dateNow.getUTCDate();
            var yr = dateNow.getUTCFullYear();
            imgDate.innerHTML = day + "/" + month + "/" + year;

            var imgRate = this.element.querySelectorAll('.image-rate');
            var nowRate = this.imageModel.getRating();
            for (var i = imgRate.length - 1; i >= 0; i--) {
              var r = 4 - i;
              if(r >= nowRate) {
                imgRate[i].style.color = "black";
                imgRate[i].innerHTML = "☆";
              }
              else {
                imgRate[i].innerHTML = "★";
                imgRate[i].style.color = "#F9D904";
              }
            }
 
           this.listenRating();
           this.listenEnlarge();
        },

        /**
         * Changes the rendering of the ImageModel to either list or grid view.
         * @param viewType A string, either LIST_VIEW or GRID_VIEW
         */
        setToView: function(viewType) {
           this.nowView = viewType;
           switch(this.nowView) {
              case GRID_VIEW:
                removeNowView(this.element, 'img list');
                this.element.className = 'img grid';
                break;
              case LIST_VIEW:
                removeNowView(this.element, 'img grid');
                this.element.className = 'img list';
                break;
            }
            var img = this.element.querySelector('.images');
            img.src = '.' + this.imageModel.getPath();

            var imgCaption = this.element.querySelector('.image-caption');
            imgCaption.innerHTML = this.imageModel.getCaption();

            var imgName = this.element.querySelector('.image-name');
            imgName.innerHTML = this.imageModel.getPath();

            var imgDate = this.element.querySelector('.image-date');
            var dateNow = new Date();
            var mon = dateNow.getUTCMonth() + 1;
            var day = dateNow.getUTCDate();
            var yr = dateNow.getUTCFullYear();
            imgDate.innerHTML = day + "/" + mon + "/" + yr;

            var imgRate = this.element.querySelectorAll('.image-rate');
            var nowRate = this.imageModel.getRating();
            for (var i = imgRate.length - 1; i >= 0; i--) {
              var r = 4 - i;
              if(r >= nowRate) {
                imgRate[i].style.color = "black";
                imgRate[i].innerHTML = "☆";
              }
              else {
                imgRate[i].innerHTML = "★";
                imgRate[i].style.color = "#F9D904";
              }
            }

            this.listenRating();
            this.listenEnlarge();
        },

        /**
         * Returns a string of either LIST_VIEW or GRID_VIEW indicating which view type it is
         * currently rendering.
         */
        getCurrentView: function() {
           return this.nowView;
        },

        listenRating: function() {
            var self = this;
            var imaRate =  self.element.querySelectorAll('.image-rate');
            var rate = 0;
            /*console.log(imaRate);*/
            var rateListen = function(rate) {
              console.log("rateListen");
              return function() {self.imageModel.setRating(rate)};
            }
            for (var i = 0; i < imaRate.length; i++) {
              /*console.log(imaRate[i]);*/
              rate = 5 - i;
              imaRate[i].addEventListener('click', rateListen(rate));
            }
        },

        listenEnlarge: function() {
            var self = this;
            var img = self.element.querySelector('.images');
            img.addEventListener('click', function() {
              console.log("clicking image");
              enlargeImage(self.imageModel);
            });
        }
    });

    /**
     * A factory is an object that creates other objects. In this case, this object will create
     * objects that fulfill the ImageRenderer class's contract defined above.
     */
    var ImageRendererFactory = function() {
    };

    _.extend(ImageRendererFactory.prototype, {

        /**
         * Creates a new ImageRenderer object for the given ImageModel
         */
        createImageRenderer: function(imageModel) {
            // TODO
            console.log("creating ImageRenderer");
            var imgRenderer = new ImageRenderer(imageModel);
            console.log(imgRenderer);
            return imgRenderer;
        }
    });

    /**
     * An object representing a DOM element that will render an ImageCollectionModel.
     * Multiple such objects can be created and added to the DOM (i.e., you shouldn't
     * assume there is only one ImageCollectionView that will ever be created).
     */
    var ImageCollectionView = function() {
        // TODO
        var collTemplate = document.getElementById('collection-template');
        var setColl = document.importNode(collTemplate.content,true);
        this.element = setColl.querySelector('.all-images');
        this.nowView = GRID_VIEW;
        this.listImg = [];
        this.imgRendererFactory = new ImageRendererFactory();
        this.ratingWanted = 0;
        this.imageCollectionModel = null;
    };

    _.extend(ImageCollectionView.prototype, {
        /**
         * Returns an element that can be attached to the DOM to display the ImageCollectionModel
         * this object represents.
         */
        getElement: function() {
            // TODO
            return this.element;
        },

        /**
         * Gets the current ImageRendererFactory being used to create new ImageRenderer objects.
         */
        getImageRendererFactory: function() {
            // TODO
            return this.imgRendererFactory;
        },

        /**
         * Sets the ImageRendererFactory to use to render ImageModels. When a *new* factory is provided,
         * the ImageCollectionView should redo its entire presentation, replacing all of the old
         * ImageRenderer objects with new ImageRenderer objects produced by the factory.
         */
        setImageRendererFactory: function(imageRendererFactory) {
            // TODO
            this.imgRendererFactory = imageRendererFactory;
            /*this.showImages();*/
        },

        /**
         * Returns the ImageCollectionModel represented by this view.
         */
        getImageCollectionModel: function() {
            // TODO
            return this.imageCollectionModel;
        },

        /**
         * Sets the ImageCollectionModel to be represented by this view. When setting the ImageCollectionModel,
         * you should properly register/unregister listeners with the model, so you will be notified of
         * any changes to the given model.
         */
        setImageCollectionModel: function(imageCollectionModel) {
            // TODO
            this.imageCollectionModel = imageCollectionModel;
            this.listenImages();
            this.showImages();
        },

        /**
         * Changes the presentation of the images to either grid view or list view.
         * @param viewType A string of either LIST_VIEW or GRID_VIEW.
         */
        setToView: function(viewType) {
            // TODO
            self = this;
            this.nowView = viewType;
            _.each(this.listImg, function(img){
                console.log("setting view to: " + viewType);
                img.setToView(self.nowView);
            });
        },

        /**
         * Returns a string of either LIST_VIEW or GRID_VIEW indicating which view type is currently
         * being rendered.
         */
        getCurrentView: function() {
            // TODO
            return this.nowView;
        },

        listenImages: function() {
            var self = this;
            this.addImage = function(){
                self.showImages();
            };
            this.imageCollectionModel.addListener(this.addImage);
        },

        refreshImages: function() {
            var self = this;
            /*this.listImg = [];*/
            _.each(this.listImg, function(imgRen){
              var ele = imgRen.getElement();
              var parNode = ele.parentNode;
              if(parNode) {
                parNode.removeChild(ele);
              }
            });
        },

        showImages: function() {
            var listImgModels = this.imageCollectionModel.getImageModels();
            console.log(this.imgRendererFactory);
            var self = this;
            this.refreshImages();  
            _.each(listImgModels, function(imgModel) {
              var nowRate = imgModel.getRating();
              var rWanted = self.ratingWanted;
              if((nowRate != 0 && rWanted != 0) ||  rWanted == 0) {
                var imgWanted = self.filterImages(nowRate,rWanted);
                if (imgWanted || rWanted == 0) { 
                  var selfFac = self.imgRendererFactory;    
                  var imageRenderer = selfFac.createImageRenderer(imgModel);
                  imageRenderer.setToView(imgModel.nowView);
                  self.listImg.push(imageRenderer);
                  self.element.appendChild(imageRenderer.getElement());
                }
               }
            });
        },

        filterImages: function(nowRate, rWanted) {
            if(nowRate >= rWanted) {
                return true;
            }
            else {
                return false;
            }

        }
    });

    /**
     * An object representing a DOM element that will render the toolbar to the screen.
     */
    var Toolbar = function() {
        this.listeners = [];
        this.init();
        this.nowView = GRID_VIEW;
        this.ratingWanted = 0;
        this.listenRating();
        this.notify = function(toolbar,eventType,eventDate){
            _.each(this.listeners,
                function(listener_fn) {
                  console.log(listener_fn);
                  listener_fn(toolbar,eventType,eventDate);
                }
                );
        }

    };

    _.extend(Toolbar.prototype, {
        init: function() {
            var self = this;
            this.fileChooserDiv = document.createElement('div');
            var fileChooserTemplate = document.getElementById('file-chooser');
            this.fileChooserDiv.appendChild(document.importNode(fileChooserTemplate.content, true));
            var fileChooserInput = this.fileChooserDiv.querySelector('.files-input');

            var tbTemplate = document.getElementById('toolbar-template');
            var tb = document.importNode(tbTemplate.content, true);
            this.element = tb.querySelector('.toolbar');
            var gView = this.element.querySelector('.grid-but');
            var lView = this.element.querySelector('.list-but');
            gView.addEventListener('click', function() {
              self.setToView(GRID_VIEW);
              gView.className = 'grid-but active';
              lView.className = 'list-but inactive';
            });
            lView.addEventListener('click', function() {
              self.setToView(LIST_VIEW);
              lView.className = 'list-but active';
              gView.className = 'grid-but inactive';
            });
        },

        /**
         * Returns an element representing the toolbar, which can be attached to the DOM.
         */
        getElement: function() {
            // TODO
            return this.element;
        },

        /**
         * Registers the given listener to be notified when the toolbar changes from one
         * view type to another.
         * @param listener_fn A function with signature (toolbar, eventType, eventDate), where
         *                    toolbar is a reference to this object, eventType is a string of
         *                    either, LIST_VIEW, GRID_VIEW, or RATING_CHANGE representing how
         *                    the toolbar has changed (specifically, the user has switched to
         *                    a list view, grid view, or changed the star rating filter).
         *                    eventDate is a Date object representing when the event occurred.
         */
        addListener: function(listener_fn) {
            // TODO
            this.listeners.push(listener_fn);
        },

        /**
         * Removes the given listener from the toolbar.
         */
        removeListener: function(listener_fn) {
            // TODO
            var index = this.listeners.indexOf(listener_fn);
            if (index !== -1) {
              this.listeners.splice(index, 1);
            }
        },

        /**
         * Sets the toolbar to either grid view or list view.
         * @param viewType A string of either LIST_VIEW or GRID_VIEW representing the desired view.
         */
        setToView: function(viewType) {
           this.nowView = viewType;
           var dateNow = new Date();
           var self = this;
           this.notify(self,viewType,dateNow);
        },

        /**
         * Returns the current view selected in the toolbar, a string that is
         * either LIST_VIEW or GRID_VIEW.
         */
        getCurrentView: function() {
           return this.nowView;
        },

        /**
         * Returns the current rating filter. A number in the range [0,5], where 0 indicates no
         * filtering should take place.
         */
        getCurrentRatingWanted: function() {
           return this.ratingWanted;
        },

        /**
         * Sets the rating filter.
         * @param rating An integer in the range [0,5], where 0 indicates no filtering should take place.
         */
        setRatingWanted: function(rating) {
            // TODO
            this.ratingWanted = rating;
            console.log("rating wanted: " + rating);
            var dateNow = new Date();
            var self = this;
            this.notify(self,RATING_CHANGE,dateNow);
            var imgRate = self.element.querySelectorAll('.toolbar-rate');
            var nowRate = self.ratingWanted;
            for (var i = imgRate.length - 1; i >= 0; i--) {
              var r = 4 - i;
              if(r >= nowRate) {
                imgRate[i].style.color = "black";
                imgRate[i].innerHTML = "☆";
              }
             else {
                imgRate[i].style.color = "#F9D904";
                imgRate[i].innerHTML = "★";
             }
            }
        },

        listenRating: function() {
            var self = this;
            var imaRate =  self.element.querySelectorAll('.toolbar-rate');
            var rate = 0;
            console.log(imaRate);
            var rateListen = function(rate) {
              return function() {self.setRatingWanted(rate)};
            }
            for (var i = 0; i < imaRate.length; i++) {
              /*console.log(imaRate[i]);*/
              rate = 5 - i;
              imaRate[i].addEventListener('click', rateListen(rate));
            }
        }
    });

    /**
     * An object that will allow the user to choose images to display.
     * @constructor
     */
    var FileChooser = function() {
        this.listeners = [];
        this._init();
    };

    _.extend(FileChooser.prototype, {
        // This code partially derived from: http://www.html5rocks.com/en/tutorials/file/dndfiles/
        _init: function() {
            var self = this;
            this.fileChooserDiv = document.createElement('div');
            this.fileChooserDiv.className = 'file-chooser-div';
            var fileChooserTemplate = document.getElementById('file-chooser');
            this.fileChooserDiv.appendChild(document.importNode(fileChooserTemplate.content, true));
            var fileChooserInput = this.fileChooserDiv.querySelector('.files-input');
            fileChooserInput.addEventListener('change', function(evt) {
                var files = evt.target.files;
                var eventDate = new Date();
                _.each(
                    self.listeners,
                    function(listener_fn) {
                        listener_fn(self, files, eventDate);
                    }
                );
            });
        },

        /**
         * Returns an element that can be added to the DOM to display the file chooser.
         */
        getElement: function() {
            return this.fileChooserDiv;
        },

        /**
         * Adds a listener to be notified when a new set of files have been chosen.
         * @param listener_fn A function with signature (fileChooser, fileList, eventDate), where
         *                    fileChooser is a reference to this object, fileList is a list of files
         *                    as returned by the File API, and eventDate is when the files were chosen.
         */
        addListener: function(listener_fn) {
            if (!_.isFunction(listener_fn)) {
                throw new Error("Invalid arguments to FileChooser.addListener: " + JSON.stringify(arguments));
            }

            this.listeners.push(listener_fn);
        },

        /**
         * Removes the given listener from this object.
         * @param listener_fn
         */
        removeListener: function(listener_fn) {
            if (!_.isFunction(listener_fn)) {
                throw new Error("Invalid arguments to FileChooser.removeListener: " + JSON.stringify(arguments));
            }
            this.listeners = _.without(this.listeners, listener_fn);
        }
    });

    // Return an object containing all of our classes and constants
    return {
        ImageRenderer: ImageRenderer,
        ImageRendererFactory: ImageRendererFactory,
        ImageCollectionView: ImageCollectionView,
        Toolbar: Toolbar,
        FileChooser: FileChooser,

        LIST_VIEW: LIST_VIEW,
        GRID_VIEW: GRID_VIEW,
        RATING_CHANGE: RATING_CHANGE
    };
}