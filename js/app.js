// Alteryx Gallery API

//setup your Gallery
const setupGallery = function(){
  const galleryUrl = //"your_galleryapi_url";
  const galleryKey = //"your_gallery_key";
  const gallerySecret = //"your_gallery_secret";
  const gallery = new Gallery(galleryUrl, galleryKey, gallerySecret);
  return gallery;
}


//Define a function to run the workflow

let runWorkflow = function(workflowID,gallery) {
  return new Promise(function (fulfill, reject){
    gallery.executeWorkflow('your_workflow_id', {}, function(resp){
      if (resp.status == 'Queued') {
        fulfill(resp);
      } else {
        reject(resp);
      }
    });
  });
}

// Define a function to grab the status of the job

let getWorkflowStatus = function(jobId, gallery, callback) {
  gallery.getJob(jobId, function(response) {
    //get the jobID of the workflow
    callback(response);
  });
}

// Define a function to check the status of the workflow

let checkWorkflowStatus = function(jobId, gallery, callback) {
  $('#output').html('Workflow running')
  $('#output').show();
  getWorkflowStatus(jobId, gallery, function(resp){
    if (resp.status != "Queued" && resp.status != "Running") {
      callback(jobId, resp);
    } else {
      setTimeout(function () {
        checkWorkflowStatus(jobId, gallery, callback);
      }, 2000);
    }
  });
}

$(document).ready(function(){
  $('#executeWorkflow').on('click', function(){
    const gallery = setupGallery();
    const workflowID = 'your_workflow_id';
    runWorkflow(workflowID,gallery)
    .then(function responseWorkflow(resp){
      console.log('Workflow is Running');
      checkWorkflowStatus(resp.id,gallery, function(jobID, resp){
        if (resp.status == 'Completed' && resp.outputs.length > 0) {
          $('#output').html('Workflow Completed')
          console.log('Workflow Finished Running')
          const link = gallery.getOutputFileURL(jobID,resp.outputs[0].id,"Raw");
          const downloadFile = '<a href='+link+'>Download File</a>'
          $('#outputFile').html(downloadFile);
        } else if (resp.status == 'Completed' && resp.disposition == 'Error') {
          $('#output').html('Error, there is something wrong with your workflow');
        }
      })
    })
  })

});
