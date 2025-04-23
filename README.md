# Gallery Image download 
Works only for gallery url images that increment the last path by 1 for the image.
```
Example
https://example.com/xa125/1.jpg 
https://example.com/xa125/2.jpg
https://example.com/xa125/3.jpg
https://example.com/xa125/4.jpg
```


# How To Use
- run `npm i`
- open any gallery image webpage >> right click on image to `Open Image in a new tab` to get the image original size >> copy the url
- Replace the `url` and `totalImages`
- run `node downloadImages.js`
