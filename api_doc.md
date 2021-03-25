# Ecommerce CMS

Web for admin, to organize product and banner for the website.

## List RESTful endpoints

### POST Login

log user into the system

- ***URL***
  ```
    /login
  ```

- ***Method***
  ```
    POST
  ```

- ***Request Header***
  ```
    Not needed
  ```


- ***Request Body***
  ```
    {
      "email": "luthfi@mail.com", // string
      "password": "luthfi123, //string
    }
  ```

- ***Success Response***
  ```
    {
      "access_token": "<your access token>",
      "name": "Luthfi",
      "role": "admin"
    }
  ```

- ***Error Response***
  ```
    {
      "message": "Invalid Email or Password"
    }
  ```

### GET Products

Get all products

- ***URL***
  ```
    /products
  ```


- ***Method***
  ```
    GET
  ```

- ***Request Header***
  ```
    {
      "access_token": "<your access token>"
    }
  ```


- ***Request Body***
  ```
    Not Needed
  ```

- ***Success Response***
  ```
    [
      {
        "id": 6,
        "name": "Tissue",
        "image_url": "https://cdn.monotaro.id/media/catalog/product/cache/a93b75c01b21750ab1c37c1e1fecbffe/S/0/S000001628-3.jpg",
        "price": 10000,
        "stock": 1000,
        "createdAt": "2021-03-21T03:59:55.459Z",
        "updatedAt": "2021-03-21T04:00:58.379Z"
      }
    ]
  ```

- ***Error Response***
  ```
    {
      "message": "Internal Server Error"
    }
  ```


### POST Product

Add new Product


- ***URL***
  ```
    /products
  ```


- ***Method***
  ```
    POST
  ```

- ***Request Header***
  ```
    {
      "access_token": "<your access token>"
    }
  ```


- ***Request Body***
  ```
    {
      "name": product_test, //string
      "image_url": https://example.id/media/test.jpg, //string
      "price": 1000, //number
      "stock": 10, //number
    }
  ```

- ***Success Response***
  ```
    {
      "id": 7,
      "name": "product_test",
      "image_url": "https://example.id/media/test.jpg",
      "price": 1000,
      "stock": 10,
      "updatedAt": "2021-03-21T06:00:48.676Z",
      "createdAt": "2021-03-21T06:00:48.676Z"
    }
  ```

- ***Error Response***
  ```
  {
    "message": "Internal Server Error"
  }
  ```


### PUT Product

Update Product


- ***URL***
  ```
    /products/:id
  ```


- ***Method***
  ```
    PUT
  ```

- ***Request Header***
  ```
    {
      "access_token": "<your access token>"
    }
  ```


- ***Request Body***
  ```
    {
      "name": product_test_update, //string
      "image_url": https://example.id/media/test_updated.jpg, //string
      "price": 10000, //number
      "stock": 100, //number
    }
  ```

- ***Success Response***
  ```
    [
      1
    ]
  ```

- ***Error Response***
  ```
    [
      0
    ]
  ```


### DELETE Product

Delete Product


- ***URL***
  ```
    /products/:id
  ```


- ***Method***
  ```
    DELETE
  ```

- ***Request Header***
  ```
    {
      "access_token": "<your access token>"
    }
  ```


- ***Request Body***
  ```
    Not needed
  ```

- ***Success Response***
  ```
    {
      "msg": "Delete Success"
    }
  ```

- ***Error Response***
  ```
    {
  	  "message": "Internal Server Error"
    }
  ```

### GET Banners

Get all banners

- ***URL***
  ```
    /banners
  ```


- ***Method***
  ```
    GET
  ```

- ***Request Header***
  ```
    {
      "access_token": "<your access token>"
    }
  ```


- ***Request Body***
  ```
    Not Needed
  ```

- ***Success Response***
  ```
    [
      {
          "id": 2,
          "title": "Test",
          "status": "active",
          "image_url": "https://cdn.monotaro.id/media/catalog/product/cache/a93b75c01b21750ab1c37c1e1fecbffe/S/0/S000001628-3.jpg",
          "createdAt": "2021-03-21T04:18:22.296Z",
          "updatedAt": "2021-03-21T04:18:22.296Z"
      }
    ]
  ```

- ***Error Response***
  ```
    {
      "message": "Internal Server Error"
    }
  ```


### POST Banner

Add new Banner


- ***URL***
  ```
    /banners
  ```


- ***Method***
  ```
    POST
  ```

- ***Request Header***
  ```
    {
      "access_token": "<your access token>"
    }
  ```


- ***Request Body***
  ```
    {
      "title": test banner, //string
      "status": active, //string
      "image_url": https://bannerexample.id/banner.jpg, //string
    }
  ```

- ***Success Response***
  ```
    {
      "id": 3,
      "title": "test banner",
      "status": "active",
      "image_url": "https://bannerexample.id/banner.jpg",
      "updatedAt": "2021-03-21T06:22:30.763Z",
      "createdAt": "2021-03-21T06:22:30.763Z"
    }
  ```

- ***Error Response***
  ```
    {
      "message": "Internal Server Error"
    }
  ```


### PUT Banner

Update Banner


- ***URL***
  ```
    /banners/:id
  ```


- ***Method***
  ```
    PUT
  ```

- ***Request Header***
  ```
    {
      "access_token": "<your access token>"
    }
  ```


- ***Request Body***
  ```
    {
      "title": banner test update, //string
      "status": disabled, //string
      "image_url": https://examplebanner.id/media/updateBanner.jpg, //string
    }
  ```

- ***Success Response***
  ```
    [
      1
    ]
  ```

- ***Error Response***
  ```
    {
      "message": "Fail update"
    }
  ```


### DELETE Banner

Delete Banner

- ***URL***
  ```
    /banners/:id
  ```


- ***Method***
  ```
    DELETE
  ```

- ***Request Header***
  ```
    {
      "access_token": "<your access token>"
    }
  ```


- ***Request Body***
  ```
    Not needed
  ```

- ***Success Response***
  ```
    {
      "msg": "Delete Success"
    }
  ```

- ***Error Response***
  ```
    {
      "message": "Internal Server Error"
    }
  ```

### GET Cart

Read All Cart

- ***URL***
  ```
    /cart
  ```


- ***Method***
  ```
    GET
  ```

- ***Request Header***
  ```
    {
      "access_token": "<your access token>"
    }
  ```


- ***Request Body***
  ```
    Not needed
  ```

- ***Success Response***
  ```
  [
    {
        "id": 1,
        "UserId": 1,
        "ProductId": 1,
        "quantity": 1,
        "totalPrice": null,
        "wishList": null,
        "createdAt": "2021-03-25T04:51:06.468Z",
        "updatedAt": "2021-03-25T04:51:06.468Z",
        "Product": {
            "id": 1,
            "name": "Puma Shoes",
            "image_url": "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/369725/01/sv01/fnd/EEA/fmt/png/PUMA-Vikky-v2-Women's-Trainers",
            "price": 400000,
            "stock": 3,
            "createdAt": "2021-03-25T04:35:11.178Z",
            "updatedAt": "2021-03-25T04:35:11.178Z"
        }
    }
  ]
  ```

- ***Error Response***
  ```
    {
      "message": "Internal Server Error"
    }
  ```


### POST Cart

Create new Cart

- ***URL***
  ```
    /cart/:prodId
  ```


- ***Method***
  ```
    POST
  ```

- ***Request Header***
  ```
    {
      "access_token": "<your access token>"
    }
  ```


- ***Request Body***
  ```
  Not Needed

  ```

- ***Success Response***
  ```
  {
    "id": 1,
    "ProductId": 1,
    "UserId": 1,
    "quantity": 1,
    "updatedAt": "2021-03-25T04:51:06.468Z",
    "createdAt": "2021-03-25T04:51:06.468Z",
    "totalPrice": null,
    "wishList": null
  }
  ```

- ***Error Response***
  ```
    {
      "message": "Internal Server Error"
    }
  ```

### DELETE Cart

Delete Cart

- ***URL***
  ```
    /cart/:id
  ```


- ***Method***
  ```
    DELETE
  ```

- ***Request Header***
  ```
    {
      "access_token": "<your access token>"
    }
  ```


- ***Request Body***
  ```
    Not Needed
  ```

- ***Success Response***
  ```
    {
      "message": "Remove from cart Success"
    }
  ```

- ***Error Response***
  ```
    {
      "message": "Internal Server Error"
    }
  ```