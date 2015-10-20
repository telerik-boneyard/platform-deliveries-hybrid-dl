var sampleData = {
    SampleDataLinkDefinition: {
        "Name": "DeliveriesSampleDataConnector",
        "Title": "DeliveriesSampleDataConnector",
        "Type": 1,
        "CustomSettings": {
            "isDemo": true
        }
    },
    DeliveriesTypeDefinition: {
        "Name": "DeliveryOrder",
        "Title": "DeliveryOrder",
        "SourceTypeName": "dbo.Deliveries"
    },
    DeliveriesFieldDefinitions: [
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
    ],
    Users: [
        {
            "Username": "seth",
            "DisplayName": "Seth Paterson",
            "Password": "333333",
            "Id": "15c12370-ce1d-11e4-ba99-9326c7581970"
        },
        {
            "Username": "michael",
            "DisplayName": "Michael Taylor",
            "Password": "333333",
            "Id": "2847b900-ce1d-11e4-a9bf-71064cfba37d"
        },
        {
            "Username": "andy",
            "DisplayName": "Andy Gerald",
            "Password": "333333",
            "Id": "3352b7f0-ce1d-11e4-9d62-e777a36e39bd"
        }
    ]
};