var logger = require("./log")(module);
const azure = require("azure-storage");
const { BlobServiceClient } = require("@azure/storage-blob");
const AZURE_STORAGE_CONNECTION_STRING =
  process.env.AZURE_STORAGE_CONNECTION_STRING;
if (!AZURE_STORAGE_CONNECTION_STRING) {
  logger.error("Azure Storage Connection string not found");
  return;
}

const blobServiceClient = BlobServiceClient.fromConnectionString(
  AZURE_STORAGE_CONNECTION_STRING,
);

const containerClient = (containerName) => {
  return blobServiceClient.getContainerClient(containerName);
};

const azureBlobSaSUrl = async (containerName, blobName) => {
  const blobService = azure.createBlobService();
  const startDate = new Date();
  const expiryDate = new Date(startDate);
  expiryDate.setMinutes(startDate.getMinutes() + 20); // Set the duration of the token

  const sharedAccessPolicy = {
    AccessPolicy: {
      Permissions: azure.BlobUtilities.SharedAccessPermissions.READ, // Set the desired permissions
      Start: startDate,
      Expiry: expiryDate,
    },
  };

  // Generate the SAS token for the blob
  const sasToken = blobService.generateSharedAccessSignature(
    containerName,
    blobName,
    sharedAccessPolicy,
  );

  // Construct the URL with the SAS token
  const blobUrlWithSas = blobService.getUrl(containerName, blobName, sasToken);

  return blobUrlWithSas;
};
module.exports = { containerClient, azureBlobSaSUrl };
