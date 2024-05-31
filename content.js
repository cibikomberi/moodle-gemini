"use strict";

chrome.storage.sync.get(["key"]).then((result) => {
  const ui = document.createElement("p");
  ui.textContent = result.key;
  ui.style.fontSize = 0;
  ui.id = "api_key";
  document.body.appendChild(ui);
});

chrome.storage.sync.get(["model"]).then((result) => {
  const ui = document.createElement("p");
  ui.textContent = result.model;
  ui.style.fontSize = 0;
  ui.id = "model";
  document.body.appendChild(ui);
});

const script = document.createElement("script");
script.setAttribute("type", "module");
script.setAttribute("src", chrome.runtime.getURL("main_working.js"));
const head =
  document.head ||
  document.getElementsByTagName("head")[0] ||
  document.documentElement;
head.insertBefore(script, head.lastChild);

// fetch('https://raw.githubusercontent.com/cibivishnukomberi/moodle-gemini/main/updates.xml')
//   .then(response => response.text())
//   .then(xml => {
//     // Parse XML to extract update URL
//     const parser = new DOMParser();
//     const xmlDoc = parser.parseFromString(xml, 'text/xml');
//     const updateUrl = xmlDoc.getElementsByTagName('updatecheck')[0].getAttribute('codebase');

//     // Update the extension's update URL dynamically
//     chrome.runtime.setUpdateUrlData(updateUrl );
//   }).then(console.log("hi"))
//   .catch(error => {
//     console.error('Error fetching update manifest:', error);
//   });

// function initiateUpdate(updateUrl) {
//   // Fetch the updated extension package (ZIP file)
//   fetch(updateUrl)
//     .then(response => response.blob())
//     .then(zipBlob => {
//       // Extract the extension package
//       return new Promise((resolve, reject) => {
//         const zip = new JSZip();
//         zip.loadAsync(zipBlob)
//           .then(zip => {
//             // Extract files to a temporary directory
//             const tempDir = 'temp/';
//             zip.forEach((relativePath, zipEntry) => {
//               zip.extract(zipEntry, tempDir + relativePath);
//             });
//             resolve(tempDir);
//           })
//           .catch(error => {
//             reject(error);
//           });
//       });
//     })
//     .then(tempDir => {
//       // Update the extension by replacing existing files with the new ones
//       // Example: Copy files from the temporary directory to the extension directory
//       // Note: You need appropriate permissions to modify extension files.
//       // This might not be possible in some cases due to Chrome's security restrictions.
//       // You may need to consider alternative approaches.
//       chrome.runtime.getPackageDirectoryEntry(directoryEntry => {
//         const tempDirEntry = directoryEntry.getDirectory(tempDir, { create: false });
//         tempDirEntry.getFiles(files => {
//           files.forEach(file => {
//             // Copy each file from the temporary directory to the extension directory
//             file.copyTo(directoryEntry, file.name, () => {
//               // Optional: Inform the user that the extension has been updated
//               console.log('Extension updated successfully.');
//             });
//           });
//         });
//       });
//     })
//     .catch(error => {
//       console.error('Error updating extension:', error);
//     });
// }

// initiateUpdate("https://raw.githubusercontent.com/cibivishnukomberi/moodle-gemini/main/updates.xml")
