'use strict';
var everliveBaseUrl = 'http://api.everlive.com/v1/';
app.models.loading = (function() {
    var dataProvider = app.data.defaultprovider;
    
    var _showSection = function(sectionId) {
        $('#div-loading').hide();
        $('#initialize-data').hide();
        $('#initializing-data').hide();
        
        $('#' + sectionId).show();
    };
    
    var isAppIdSet = function() {
        return Config.AppId && Config.AppId.length === 16;
    };
    
    var _isMasterKeySet = function() {
        return Config.MasterKey && Config.MasterKey.length === 32;
    };
    
    var _checkDataInitialized = function() {
        dataProvider.data(Constants.Type.DeliveryOrder).count(
            null,
            function (data) {
                _showLoginPage();
            },
            function (error) {
                var masterKeySet = _isMasterKeySet();
                
                if (!masterKeySet) {
                    _showSection('error-no-master-key');
                } else {
                    _showSection('initialize-data');
                }
            }
        );
    };
    
    var _showLoginPage = function() {
        app.mobileApp.navigate('signInView/view.html');
    };
    
    var _initializeData = function() {
        _showSection('initializing-data');
        
        _createDemoDataConnector()
        .then(_createDeliveriesContentTypeFromDataLink)
        .then(_createDeliveriesFieldsFromDataLink)
        .then(_createUsers)
        .then(function() {
            _showSection('initialize-data-completed');
        })
        .catch(function(e) {
            alert('Error: ' + JSON.stringify(error));
        });
        
    };
    
    var _createDemoDataConnector = function() {
        var dataLinkDefinition = sampleData.SampleDataLinkDefinition;
        var url = everliveBaseUrl + 'Metadata/Applications/' + Config.AppId + '/DataLinks';
        
        return _ajaxRequestPromise(url, dataLinkDefinition);
    };
    
    var _createDeliveriesContentTypeFromDataLink = function(dataLinkResult) {
        var typeDefinition = sampleData.DeliveriesTypeDefinition;
        typeDefinition.DataLinkId = dataLinkResult.Id;
        var url = everliveBaseUrl + 'Metadata/Applications/' + Config.AppId + '/Types';
        return _ajaxRequestPromise(url, typeDefinition)
    };
    
    var _createDeliveriesFieldsFromDataLink = function() {
        var fields = sampleData.DeliveriesFieldDefinitions;
        var url = everliveBaseUrl + 'Metadata/Applications/' + Config.AppId + '/Types/DeliveryOrder/Fields';
        
        return _ajaxRequestPromise(url, fields);
    }
    
    var _createUsers = function() {
        var users = sampleData.Users;
        var url = everliveBaseUrl + Config.AppId + '/Users';
        return _ajaxRequestPromise(url, users);
    };
    
    var _ajaxRequestPromise = function(url, data) {
        var RSVP = Everlive._common.rsvp;
        var promise = new RSVP.Promise(function(resolve, reject) {
            $.ajax({
                method: "POST",
                url: url,
                headers: {
                    'Authorization': 'masterkey ' + Config.MasterKey,
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(data),
                success: function(createResult) {
                    resolve(createResult.Result);
                },
                error: function() {
                    resolve();
                }
            });
        });
        return promise;
    };
    
    return {
        onShow: function() {
            //Check if App Id is set
            if (!isAppIdSet()) {
                _showSection('error-no-app-id');
            } else {
                var isOnline = app.isOnline();
                if (isOnline) {
                    //If online, check if the server data is initialized
                    _checkDataInitialized();
                } else {
                    //If offline, just go to the login page
                    _showLoginPage();
                }
            }
            
        },
        initializeData: function() {
            _initializeData();
        },
        reloadApp: function() {
            location.reload();
        }
    };
})();