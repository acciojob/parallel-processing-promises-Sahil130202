const output = document.getElementById("output");

const images = [
    { url: "https://picsum.photos/id/237/200/300" },
    { url: "https://picsum.photos/id/238/200/300" },
    { url: "https://picsum.photos/id/239/200/300" }
];

// Create loading and error elements
const loading = document.createElement("div");
loading.id = "loading";
loading.innerText = "Loading...";

const error = document.createElement("div");
error.id = "error";

output.appendChild(loading);
output.appendChild(error);


// Function to download an image
function downloadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = () => {
            resolve(img);
        };

        img.onerror = () => {
            reject(new Error("Failed to download image: " + url));
        };

        img.src = url;
    });
}


// Download all images
function downloadImages() {
    loading.innerText = "Loading...";
    error.innerText = "";
    
    Promise.all(images.map(image => downloadImage(image.url)))
        .then((downloadedImages) => {
            loading.innerText = "";

            downloadedImages.forEach(img => {
                output.appendChild(img);
            });
        })
        .catch((err) => {
            loading.innerText = "";
            error.innerText = err.message;
        });
}

downloadImages();