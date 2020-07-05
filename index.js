const http = require("http");
const fs = require("fs");
const path = require("path");
const { endianness } = require("os");

const server = http.createServer(function (req, res) {
  // if (req.url === "/") {
  //   fs.readFile(path.join(__dirname, "/public", "index.html"), function (
  //     err,
  //     content
  //   ) {
  //     if (err) throw err;
  //     res.writeHead(200, { "content-type": "text/html" });
  //     res.end(content);
  //   });
  // }

  // if (req.url === "/api/users") {
  //   const uers = [
  //     { name: "wajeed ali", age: 29 },
  //     { name: "Jhon Deo", age: 39 },
  //   ];
  //   res.writeHead(200, { "content-type": "application/json" });
  //   res.end(JSON.stringify(uers));
  // }
  // // console.log(req.url);

  // Build file path dynamic

  const filepath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );

  // Extension of file
  const extfile = path.extname(filepath);

  let contentType = "text/html";

  switch (extfile) {
    case ".js":
      contentType = "text/JavaScript";
      break;
    case ".html":
      contentType = "text/html";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".jpg":
      contentType = "image/jpeg";
      break;
    case ".png":
      contentType = "image/png";
    default:
      break;
  }

  fs.readFile(path.join(filepath), (err, content) => {
    if (err) {
      if (err === "ENOENT") {
        fs.readFile(
          path.join(__dirname, "public", "404.html"),
          (err, content) => {
            res.writeHead(404, { "content-type": "text/html" });
            res.end(content);
          }
        );
      } else {
        res.writeHead(505, "utf8");
        res.end(`Some Server error: ${err.code}`);
      }
    } else {
      fs.readFile(path.join(filepath), (err, content) => {
        if (err) throw err;
        res.writeHead(200, { contentType });
        res.end(content);
      });
    }
  });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`server is connected on port ${PORT}`);
});
