# Image Sauce Extract Extension

The dist folder is the extension `production build`. Replace/rename `manifest.chrome.json / manifest.firefox.json` to `manifest.json` to use in either chrome or firefox extension. 

# Local Image download 
Works only for original source image urls that increment the last path by 1 for the images.
```
Example
https://example.com/xa125/1.jpg 
https://example.com/xa125/2.jpg
https://example.com/xa125/3.jpg
https://example.com/xa125/4.jpg
```

# How To Use
- run `npm i`
- open any gallery image webpage >> right click on image to `Open Image in a new tab` or `use inspect tool` to get the image original url >> copy the url
- Replace the `url` and `totalImages` or `galleryUrl`
- run `node local/run.mjs`
