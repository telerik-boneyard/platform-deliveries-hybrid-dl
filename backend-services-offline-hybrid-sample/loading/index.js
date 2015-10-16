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
    
    var _isApiKeySet = function() {
        return Config.ApiKey && Config.ApiKey.length === 16;
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
        
        var dataLinkDefinition = {
            "Id": "3c4459e0-6846-11e5-853a-73016a741697",
            "Name": "DeliveriesSampleDataConnector",
            "Title": "DeliveriesSampleDataConnector",
            "Type": 1,
            "CustomSettings": {
                "isDemo": true
            }
        };
        var url = everliveBaseUrl + 'Metadata/Applications/' + Config.ApiKey + '/DataLinks';
        
        return _ajaxRequestPromise(url, dataLinkDefinition);
    };
    
    var _createDeliveriesContentTypeFromDataLink = function() {
        var typeDefinition = {
            "Name": "DeliveryOrder",
            "Title": "DeliveryOrder",
            "SourceTypeName": "dbo.Deliveries",
            "DataLinkId": "3c4459e0-6846-11e5-853a-73016a741697"
        };
        var url = everliveBaseUrl + 'Metadata/Applications/' + Config.ApiKey + '/Types';
        return _ajaxRequestPromise(url, typeDefinition)
    };
    
    var _createDeliveriesFieldsFromDataLink = function() {
        var fields = [
            {
                "Id":null,
                "Name":"Comments",
                "Title":"Comments",
                "SourceFieldName":"Comments",
                "DataType":1,
                "IsReadOnly":false
            },
            {
                "Id":null,
                "Name":"CreatedAt",
                "Title":"CreatedAt",
                "SourceFieldName":"CreatedAt",
                "DataType":3,
                "IsReadOnly":false
            },
            {
                "Id":null,
                "Name":"DeliveryAddressCity",
                "Title":"DeliveryAddressCity",
                "SourceFieldName":"DeliveryAddressCity",
                "DataType":1,
                "IsReadOnly":false
            },
            {
                "Id":null,
                "Name":"DeliveryAddressLine1",
                "Title":"DeliveryAddressLine1",
                "SourceFieldName":"DeliveryAddressLine1",
                "DataType":1,
                "IsReadOnly":false
            },
            {
                "Id":null,
                "Name":"DeliveryAddressLine2",
                "Title":"DeliveryAddressLine2",
                "SourceFieldName":"DeliveryAddressLine2",
                "DataType":1,
                "IsReadOnly":false
            },
            {
                "Id":null,
                "Name":"DeliveryAddressPostcode",
                "Title":"DeliveryAddressPostcode",
                "SourceFieldName":"DeliveryAddressPostcode",
                "DataType":1,
                "IsReadOnly":false
            },
            {
                "Id":null,
                "Name":"DeliveryItem",
                "Title":"DeliveryItem",
                "SourceFieldName":"DeliveryItem",
                "DataType":1,
                "IsReadOnly":false
            },
            {
                "Id":null,
                "Name":"DeliveryItemType",
                "Title":"DeliveryItemType",
                "SourceFieldName":"DeliveryItemType",
                "DataType":1,
                "IsReadOnly":false
            },
            {
                "Id":null,
                "Name":"DeliveryName",
                "Title":"DeliveryName",
                "SourceFieldName":"DeliveryName",
                "DataType":1,
                "IsReadOnly":false
            },
            {
                "Id":null,
                "Name":"ModifiedAt",
                "Title":"ModifiedAt",
                "SourceFieldName":"ModifiedAt",
                "DataType":3,
                "IsReadOnly":false
            },
            {
                "Id":null,
                "Name":"Status",
                "Title":"Status",
                "SourceFieldName":"Status",
                "DataType":2,
                "IsReadOnly":false
            }
        ];
        var url = everliveBaseUrl + 'Metadata/Applications/' + Config.ApiKey + '/Types/DeliveryOrder/Fields';
        
        return _ajaxRequestPromise(url, fields);
    }
    
    var _createUsers = function() {
        var users = sampleData.Users;
        var url = everliveBaseUrl + Config.ApiKey + '/Users';
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
                success: function() {
                    resolve();
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
            //Check if API key has been set
            var apiKeySet = _isApiKeySet();
            if (!apiKeySet) {
                _showSection('error-no-api-key');
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